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
	
	selectedNetworkPlan: function(storeKey) {
		var id = OeffiNpc.store.idFor(storeKey);
		SC.debug('selected networkPlan with storeKey %@1 and id %@2'.fmt(storeKey, id));
		var entry = OeffiNpc.store.find(OeffiNpc.NetworkPlanEntry, id);
		
		var selSet = SC.SelectionSet.create().addObject(entry);
		OeffiNpc.networkPlanEntriesController.set('selection', selSet);
	},
	
	movedNetworkPlanEntry: function(storeKey, point) {
		var id = OeffiNpc.store.idFor(storeKey);
		SC.debug('movedNetworkPlanEntry networkPlan with storeKey %@1 and id %@2 to %@3'.fmt(storeKey, id, point));
		var entry = OeffiNpc.store.find(OeffiNpc.NetworkPlanEntry, id);
		if (entry) {
			entry.set('x', point.x);
			entry.set('y', point.y);
		}
	},
	
	clickedOnNetworkPlan: function(point) {
		var networkPlanId = OeffiNpc.networkPlanController.get('id');
		var newEntry = OeffiNpc.store.createRecord(OeffiNpc.NetworkPlanEntry, {
			name: 'new entry',
			stationId: '',
			networkPlanKey: networkPlanId,
			x: point.x,
			y: point.y
		});
		
		var selSet = SC.SelectionSet.create().addObject(newEntry); 
		OeffiNpc.networkPlanEntriesController.set('selection', selSet);
	},
	
	networkEntrySelected: function(){
		var x = OeffiNpc.networkPlanEntryController.get('x');
		var y = OeffiNpc.networkPlanEntryController.get('y');
		OeffiNpc.networkPlanViewController.set('scrollPosition', {
			x: x,
			y: y
		});
	},
	
	addEntry: function(){
		var networkPlanId = OeffiNpc.networkPlanController.get('id');
		var newEntry = OeffiNpc.store.createRecord(OeffiNpc.NetworkPlanEntry, {
			name: 'new entry',
			stationId: '',
			networkPlanKey: networkPlanId
		});
		
		SC.debug('id === "%@1"'.fmt(newEntry.get('id')));
		
		var selSet = SC.SelectionSet.create().addObject(newEntry); 
		OeffiNpc.networkPlanEntriesController.set('selection', selSet);
	},
	
	removeEntry: function(){
		OeffiNpc.networkPlanEntryController.destroy();
	}
	
});
