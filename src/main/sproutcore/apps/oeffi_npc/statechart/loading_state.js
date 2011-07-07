/*globals OeffiNpc*/

OeffiNpc.LoadingState = SC.State.extend({
	
	enterState: function() {
		var query = SC.Query.local(OeffiNpc.NetworkPlan, {
			// orderBy: 'networkId ASC'
		});
		var networkPlans = OeffiNpc.store.find(query);
		OeffiNpc.networkPlansController.set('content', networkPlans);
		
		this.gotoState('showNetworkPlans');
	}
	
});