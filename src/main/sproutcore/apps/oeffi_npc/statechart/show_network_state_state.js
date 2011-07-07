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
		var networkPlanId = OeffiNpc.networkPlanController.get('_id');
		var newEntry = OeffiNpc.store.createRecord(OeffiNpc.NetworkPlanEntry, {
			name: 'new entry',
			networkPlanKey: networkPlanId
		});
	},
	
	removeEntry: function(){
		OeffiNpc.networkPlanEntryController.destroy();
	},
	
	zPressed: function(){
		var zoom = OeffiNpc.networkPlanViewController.get('zoom');
		OeffiNpc.networkPlanViewController.set('zoom', !zoom);
	},
	
	numberPressed: function(nr) {
		var scale = nr * 0.5;
		OeffiNpc.networkPlanViewController.set('zoomScale', scale);
	}
	
});
