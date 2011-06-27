/*globals OeffiNpc*/

OeffiNpc.ShowNetworkPlansState = SC.State.extend({
	
	networkPlanSelected: function() {
		var networkId = OeffiNpc.networkPlanController.get('networkId');
		if (networkId) {
			SC.debug('new network selected ' + networkId);
			var query = SC.Query.local(OeffiNpc.NetworkPlan, {
				type: 'getNetworkPlan',
				networkId: networkId
			});
			OeffiNpc.store.find(query);
		}
	}
	
});