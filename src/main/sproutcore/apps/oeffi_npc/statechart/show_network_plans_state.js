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
		var _id = OeffiNpc.networkPlanController.get('_id');
		if (networkId) {
			SC.debug('new network selected ' + networkId + '  = ' + _id);
			var query = SC.Query.local(OeffiNpc.NetworkPlan, {
				type: 'getNetworkPlan',
				networkPlanId: _id
			});
			OeffiNpc.store.find(query);
			
			this.gotoState('showNetworkPlan');
		}
	}
	
});