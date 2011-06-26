/*globals OeffiNpc*/

OeffiNpc.LoadingState = SC.State.extend({
	
	enterState: function(){
		// this.set('pane', SC.TemplatePane.append({ templateName: 'oeffi_npc' }));
		OeffiNpc.getPath('mainPage.mainPane').append();
		
		var query = SC.Query.local(OeffiNpc.NetworkPlan);
		var networkPlans = OeffiNpc.store.find(query);
		OeffiNpc.networkPlansController.set('content', networkPlans);
		
		var linzNetwork = networkPlans.objectAt(0);
		// OeffiNpc.networkPlansController.set('selection', [linzNetwork]);
		// OeffiNpc.networkPlanEntriesController.set('selection', [linzNetwork.get('entries').objectAt(0)]);
		
		this.gotoState('showNetworkPlans');
	}
	
});