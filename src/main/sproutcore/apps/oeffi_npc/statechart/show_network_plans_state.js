/*globals OeffiNpc*/

OeffiNpc.ShowNetworkPlansState = SC.State.extend({
	
	enterState: function(){
		this.set('pane', OeffiNpc.getPath('mainPage.listNetworkPlansPane').append());
	},
	
	exitState: function(){
		this.get('pane').remove();
	},
	
	networkPlanSelected: function() {
		var _id = OeffiNpc.networkPlanController.get('_id');
		if (_id) {
			var query = SC.Query.local(OeffiNpc.NetworkPlanEntry, {
				type: 'getNetworkPlanEntries',
				conditions: "networkPlanKey = '" + _id + "'",
				parameters: {
					networkPlanKey: _id
				}
			});
			var entries = OeffiNpc.store.find(query);
			OeffiNpc.networkPlanEntriesController.set('content', entries);
			
			this.gotoState('showNetworkPlan');
		}
	}
	
});