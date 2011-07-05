// ==========================================================================
// Project:   OeffiNpc.RestDataSource
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals OeffiNpc */

/** @class

  (Document Your Data Source Here)

  @extends SC.DataSource
*/
OeffiNpc.NETWORK_PLANS_QUERY = SC.Query.create({
	recordType: OeffiNpc.NetworkPlan,
	orderBy: 'networkId ASC'
});

OeffiNpc.RestDataSource = SC.DataSource.extend(
/** @scope OeffiNpc.RestDataSource.prototype */ {

	fetch: function(store, query) {
		var options = {
			store: store,
			query: query,
			isQuery: YES
		};
		
		if (query === OeffiNpc.NETWORK_PLANS_QUERY) {
			options['type'] = OeffiNpc.NetworkPlan;
			return this._getFromUri('/networkplan', options);
		}
		
		var type = query.get('type');
		if (type && type === 'getNetworkPlan') {
			options['type'] = OeffiNpc.NetworkPlan;
			var url = '/networkplan/' + query.get('networkId');
			return this._getFromUri(url, options);
		}
		
    	return NO;
	},
  
	retrieveRecord: function(store, storeKey) {
		SC.debug('retrieveRecord');
		this._getFromUri(store.idFor(storeKey), {
			storeKey: storeKey,
			store: store,
			type: store.recordTypeFor(storeKey)
		});
		return YES;
	},
	
	createRecord: function(store, storeKey) {
		var type = store.recordTypeFor(storeKey);
		var hash = store.readDataHash(storeKey);
		var id = store.idFor(storeKey);
		var url = this._urlFor(type, id, hash);
		var body = hash;
		
		SC.Request.postUrl(url)
				  .json()
				  .notify(this, this._didCreateRecord, store, storeKey)
				  .send(body);
		
		return YES;
	},
	
	_didCreateRecord: function(response, store, key) {
		if (SC.ok(response)) {
			SC.debug('invoking store#dataSourceDidComplete for ' + key);
			store.dataSourceDidComplete(key);
		} else {
			SC.debug('invoking store#dataSourceDidError for ' + key);
			store.dataSourceDidError(key);
		}
	},
	
	updateRecord: function(store, storeKey) {
		var type = store.recordTypeFor(storeKey);
		if (type !== OeffiNpc.NetworkPlanEntry) {
			return NO;
		}
		var hash = store.readDataHash(storeKey);
		var id = store.idFor(storeKey);
		var body = hash;
		SC.debug(hash);
		var url = '/networkplan/%@1/%@2'.fmt(hash.networkId, hash.stationId);
		
		SC.Request.putUrl(url)
				  .json()
				  .notify(this, this._didUpdateRecord, store, storeKey)
				  .send(body);
		
		return YES;
	},
	
	_didUpdateRecord: function(response, store, key) {
		if (SC.ok(response)) {
			SC.debug('invoking store#dataSourceDidComplete for ' + key);
			store.dataSourceDidComplete(key);
		} else {
			SC.debug('invoking store#dataSourceDidError for ' + key);
			store.dataSourceDidError(key);
		}
	},
	
	_urlFor: function(type, id, hash) {
		if (OeffiNpc.NetworkPlanEntry === type) {
			return '/networkplan/%@1'.fmt(hash.networkId);
		}
		
		if (OeffiNpc.NetworkPlan === type) {
			return '/networkplan/%@1'.ftm(id);
		}
		
		return undefined;
	},
	
	_getFromUri: function(uri, options) {
		SC.debug('invoking uri: ' + uri);
		SC.Request
			.getUrl(uri)
			.header({'Accept': 'application/json'})
			.json()
			.notify(this, '_didGetQuery', options)
			.send();
			
		return YES;
	},
	
	_didGetQuery: function(response, params) {
		var store = params.store;
		var query = params.query;
		var type = params.type;
		var deffered = params.deffered;
		
		if (SC.ok(response)) {
			var body = response.get('body');
			store.loadRecords(type, SC.isArray(body) ? body : [body]);
			store.dataSourceDidFetchQuery(query);
		} else {
			store.dataSourceDidErrorQuery(query, response);
		}
	}
  
});
