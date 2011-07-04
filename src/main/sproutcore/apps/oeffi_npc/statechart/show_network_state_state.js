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
	
	clickedOnNetworkPlan: function(point) {
		OeffiNpc.networkPlanEntryController.set('x', point.x);
		OeffiNpc.networkPlanEntryController.set('y', point.y);
	},
	
	addEntry: function(){
		var newEntry = OeffiNpc.store.createRecord(OeffiNpc.NetworkPlanEntry, {
			networkPlan: OeffiNpc.networkPlanController.get('networkdId'),
			name: 'new entry'
		});
		OeffiNpc.networkPlanEntriesController.addObject(newEntry);
	},
	
	zPressed: function(){
		var zoom = OeffiNpc.networkPlanMouseController.get('zoom');
		OeffiNpc.networkPlanMouseController.set('zoom', !zoom);
	},
	
	numberPressed: function(nr) {
		var scale = nr * 0.5;
		OeffiNpc.networkPlanMouseController.set('zoomScale', scale);
	}
	
});
