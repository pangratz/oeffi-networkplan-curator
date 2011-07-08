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
	
	showBlackWhiteImageDidChange: function(){
		var showBlackWhite = OeffiNpc.networkPlanViewController.get('showBlackWhiteImage');
		var imageUrl = OeffiNpc.networkPlanController.get('imageUrl');
		if (showBlackWhite) {
			imageUrl = imageUrl.replace('.png','_bw.png');
		} else {
			imageUrl = imageUrl.replace('_bw.png','.png');
		}
		OeffiNpc.networkPlanController.set('imageUrl', imageUrl);
	},
	
	addEntry: function(){
		var networkPlanId = OeffiNpc.networkPlanController.get('id');
		var newEntry = OeffiNpc.store.createRecord(OeffiNpc.NetworkPlanEntry, {
			name: 'new entry',
			stationId: '',
			networkPlanKey: networkPlanId
		});
	},
	
	removeEntry: function(){
		OeffiNpc.networkPlanEntryController.destroy();
	},
	
	iPressed: function(){
		var showBlackAndWhite = !OeffiNpc.networkPlanViewController.get('showBlackWhiteImage');
		OeffiNpc.networkPlanViewController.set('showBlackWhiteImage', showBlackAndWhite);
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
