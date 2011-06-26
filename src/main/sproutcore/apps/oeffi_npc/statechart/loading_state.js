/*globals OeffiNpc*/

OeffiNpc.LoadingState = SC.State.extend({
	
	enterState: function(){
		// this.set('pane', SC.TemplatePane.append({ templateName: 'oeffi_npc' }));
		OeffiNpc.getPath('mainPage.mainPane').append();
		
		var networkPlans = OeffiNpc.store.find(OeffiNpc.NETWORK_PLANS_QUERY);
		OeffiNpc.networkPlansController.set('content', networkPlans);
		
		// OeffiNpc.networkPlansController.set('selection', [linzNetwork]);
		// OeffiNpc.networkPlanEntriesController.set('selection', [linzNetwork.get('entries').objectAt(0)]);
		
		this.gotoState('showNetworkPlans');
	}
	
});