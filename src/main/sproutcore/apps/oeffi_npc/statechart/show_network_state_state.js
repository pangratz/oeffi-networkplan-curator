/*globals OeffiNpc*/

OeffiNpc.ShowNetworkPlanState = SC.State.extend({
	
	enterState: function(){
		this.set('pane', OeffiNpc.getPath('mainPage.mainPane').append());
	},
	
	exitState: function(){
		this.get('pane').remove();
	},
	
	backToNetworkPlans: function(){
		this.gotoState('showNetworkPlans');
	},
	
	addEntry: function(){
		var newEntry = OeffiNpc.store.createRecord(OeffiNpc.NetworkPlanEntry, {
			networkPlan: OeffiNpc.networkPlanController.get('networkdId'),
			name: 'new entry'
		});
		OeffiNpc.networkPlanEntriesController.addObject(newEntry);
	}
	
});
