// ==========================================================================
// Project:   OeffiNpc.networkPlanViewController
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals OeffiNpc */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
OeffiNpc.networkPlanViewController = SC.ObjectController.create(
/** @scope OeffiNpc.networkPlanViewController.prototype */ {
	
	cursorPosition: {
		x: undefined,
		y: undefined
	},
	scrollPosition: {
		x: undefined,
		y: undefined
	},
	zoom: NO,
	zoomScale: 2.0,
	showBlackWhiteImage: NO,
	
	cursorPositionString: function() {
		var pos = this.get('cursorPosition');
		if (pos) {
			return '%@1/%@2'.fmt(pos.x, pos.y);
		}
		return undefined;
	}.property('cursorPosition'),
	
	showBlackWhiteImageDidChange: function(){
		OeffiNpc.statechart.sendEvent('showBlackWhiteImageDidChange');
	}.observes('showBlackWhiteImage')

});
