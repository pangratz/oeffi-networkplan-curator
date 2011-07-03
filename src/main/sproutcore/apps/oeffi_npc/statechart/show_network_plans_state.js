/*globals OeffiNpc*/

OeffiNpc.ShowNetworkPlansState = SC.State.extend({
	
	enterState: function(){
		this.set('pane', OeffiNpc.getPath('mainPage.listNetworkPlansPane').append());
	},
	
	exitState: function(){
		this.get('pane').remove();
	},
	
	networkPlanSelected: function() {
		var networkId = OeffiNpc.networkPlanController.get('networkId');
		if (networkId) {
			SC.debug('new network selected ' + networkId);
			var query = SC.Query.local(OeffiNpc.NetworkPlan, {
				type: 'getNetworkPlan',
				networkId: networkId
			});
			OeffiNpc.store.find(query);
			
			this.gotoState('showNetworkPlan');
		}
	}
	
});