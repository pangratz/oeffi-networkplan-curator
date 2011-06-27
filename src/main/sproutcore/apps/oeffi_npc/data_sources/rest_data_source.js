// ==========================================================================
// Project:   OeffiNpc.RestDataSource
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals OeffiNpc */

/** @class

  (Document Your Data Source Here)

  @extends SC.DataSource
*/
OeffiNpc.NETWORK_PLANS_QUERY = SC.Query.local(OeffiNpc.NetworkPlan, {
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
	
	_getFromUri: function(uri, options) {
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
			store.loadRecords(type, response.get('body'));
			store.dataSourceDidFetchQuery(query);
		} else {
			SC.debug(response.get('errorObject'));
			store.dataSourceDidErrorQuery(query, response);
		}
	}
  
});
