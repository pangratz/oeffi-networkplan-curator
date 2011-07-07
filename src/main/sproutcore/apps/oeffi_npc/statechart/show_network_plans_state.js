/*globals OeffiNpc*/

OeffiNpc.ShowNetworkPlansState = SC.State.extend({
	
	enterState: function(){
		this.set('pane', OeffiNpc.getPath('mainPage.listNetworkPlansPane').append());
	},
	
	exitState: function(){
		this.get('pane').remove();
	},
	
	networkPlanSelected: function() {
		var key = OeffiNpc.networkPlanController.get('id');
		if (key) {
			var query = SC.Query.local(OeffiNpc.NetworkPlanEntry, {
				orderBy: 'name',
				conditions: "networkPlanKey = '" + key + "'",
				parameters: {
					networkPlanKey: key
				}
			});
			var entries = OeffiNpc.store.find(query);
			OeffiNpc.networkPlanEntriesController.set('content', entries);
			
			this.gotoState('showNetworkPlan');
		}
	}
	
});