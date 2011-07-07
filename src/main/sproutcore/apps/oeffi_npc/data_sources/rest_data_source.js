// ==========================================================================
// Project:   OeffiNpc.RestDataSource
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals OeffiNpc */

/** @class

  (Document Your Data Source Here)

  @extends SC.DataSource
*/
OeffiNpc.RestDataSource = SC.DataSource.extend(
/** @scope OeffiNpc.RestDataSource.prototype */ {

	fetch: function(store, query) {
		var options = {
			store: store,
			query: query,
			isQuery: YES
		};
		
		var recordType = query.get('recordType');
		if (OeffiNpc.NetworkPlan === recordType) {
			options['type'] = OeffiNpc.NetworkPlan;
			return this._getFromUri('/networkplans', options);
		} else if (OeffiNpc.NetworkPlanEntry === recordType) {
			options['type'] = OeffiNpc.NetworkPlanEntry;
			var networkPlanKey = query.parameters.networkPlanKey;
			var url = '/networkplans/' + networkPlanKey + '/_entries';
			return this._getFromUri(url, options);
		}
		
    	return NO;
	},
  
	retrieveRecord: function(store, storeKey, id) {
		SC.debug('retrieveRecord');
		var type = store.recordTypeFor(storeKey);
		var hash = store.readDataHash(storeKey);
		var url = this._urlFor(type, id, hash);
		SC.Request.getUrl(url)
				  .json()
				  .notify(this, this._didRetrieveRecord, store, storeKey)
				  .send();
		
		return YES;
	},
	
	_didRetrieveRecord: function(response, store, storeKey, type){
		SC.debug('#_didRetrieveRecord');
		if (SC.ok(response)) {
			var body = response.get('body');
			SC.debug('_didRetrieveRecord');
			store.loadRecords(type, body);
			store.dataSourceDidComplete(storeKey, body, body.key);
		} else {
			store.dataSourceDidError(storeKey);
		}
	},
	
	createRecord: function(store, storeKey) {
		SC.debug("#createRecord");
		var type = store.recordTypeFor(storeKey);
		if (OeffiNpc.NetworkPlan === type) {
			SC.debug('tried to create NetworkPlan');
			return NO;
		}
		var hash = store.readDataHash(storeKey);
		var id = store.idFor(storeKey);
		var url = this._urlFor(type, id, hash);
		var body = hash;
		SC.Request.postUrl(url)
				  .json()
				  .notify(this, this._didCreateRecord, store, storeKey, type)
				  .send(body);
		
		return YES;
	},
	
	_didCreateRecord: function(response, store, key) {
		SC.debug("#_didCreateRecord");
		if (SC.ok(response)) {
			SC.debug('invoking store#dataSourceDidComplete for ' + key);
			var body = response.get('body');
			var id = body.key;
			store.dataSourceDidComplete(key, body, id);
		} else {
			SC.debug('invoking store#dataSourceDidError for ' + key);
			store.dataSourceDidError(key);
		}
	},
	
	destroyRecord: function(store, storeKey) {
		SC.debug('#destroyRecord');
		var type = store.recordTypeFor(storeKey);
		var id = store.idFor(storeKey);
		var hash = store.readDataHash(storeKey);
		
		var url = this._urlFor(type, id, hash);
		SC.debug('delete ' + url);
		SC.Request.deleteUrl(url)
				  .json()
				  .notify(this, this._didDestroyRecord, store, storeKey)
				  .send();
		
		return YES;
	},
	
	_didDestroyRecord: function(response, store, storeKey) {
		SC.debug('#_didDestroyRecord');
		if (SC.ok(response)) {
			store.dataSourceDidDestroy(storeKey);
		} else {
			store.dataSourceDidError(storeKey);
		}
	},
	
	updateRecord: function(store, storeKey) {
		SC.debug("#updateRecord");
		var type = store.recordTypeFor(storeKey);
		var hash = store.readDataHash(storeKey);
		var id = store.idFor(storeKey);
		var body = hash;
		var url = this._urlFor(type, id, hash);
		
		SC.Request.putUrl(url)
				  .header({'Content-Type': 'application/json; charset=utf-8'})
				  .json()
				  .notify(this, this._didUpdateRecord, store, storeKey)
				  .send(body);
		
		return YES;
	},
	
	_didUpdateRecord: function(response, store, key) {
		SC.debug("#_didUpdateRecord");
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
			if (id) {
				return '/networkplanentries/%@1'.fmt(id);
			} else {
				return '/networkplans/%@1'.fmt(hash.networkPlanKey);
			}
		}
		
		if (OeffiNpc.NetworkPlan === type) {
			return '/networkplans/%@1'.fmt(id);
		}
		
		return undefined;
	},
	
	_getFromUri: function(uri, options) {
		SC.Request
			.getUrl(uri)
			.json()
			.notify(this, '_didGetQuery', options)
			.send();
			
		return YES;
	},
	
	_didGetQuery: function(response, params) {
		SC.debug('#_didGetQuery');
		var store = params.store;
		var query = params.query;
		var type = params.type;
		var deffered = params.deffered;
		
		if (SC.ok(response)) {
			var body = response.get('body');
			if (SC.isArray(body)) {
				store.loadRecords(type, body);
			} else {
				store.loadRecord(type, body);
			}
			store.dataSourceDidFetchQuery(query);
		} else {
			store.dataSourceDidErrorQuery(query, response);
		}
	}
  
});
