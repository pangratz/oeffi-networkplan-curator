/*globals OeffiNpc*/

OeffiNpc.LoadingState = SC.State.extend({
	
	enterState: function() {
		var networkPlans = OeffiNpc.store.find(OeffiNpc.NETWORK_PLANS_QUERY);
		OeffiNpc.networkPlansController.set('content', networkPlans);
		
		this.gotoState('showNetworkPlans');
	}
	
});