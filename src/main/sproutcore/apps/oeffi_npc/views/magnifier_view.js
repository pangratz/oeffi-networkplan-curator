// ==========================================================================
// Project:   OeffiNpc.MagnifierView
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals OeffiNpc */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
OeffiNpc.MagnifierView = SC.ImageView.extend(OeffiNpc.ImageViewMixin,
/** @scope OeffiNpc.MagnifierView.prototype */ {
	
	positionChanged: function(){
		var pos = this.get('position');
		if (pos) {
			this.get('parentView').get('parentView').scrollTo(2*pos.x - 100, 2*pos.y - 100);
		}
	}.observes('position')
	
});
