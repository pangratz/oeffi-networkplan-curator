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
	
	createRecord: function(store, storeKey, params) {
		SC.debug('createRecord with storeKey: ' + storeKey);
		return NO;
	},
	
	updateRecord: function(store, storeKey, params) {
		SC.debug('updateRecord with storeKey: ' + storeKey);
		return NO;
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
