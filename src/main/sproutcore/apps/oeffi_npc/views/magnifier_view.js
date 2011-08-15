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
	
	scale: 2.0,
	
	positionChanged: function(){
		var pos = this.get('position');
		if (pos) {
			var scrollView = this.get('parentView').get('parentView');
			var parentLayout = scrollView.get('layout');
			var scrollTo = {
				x: this.scale * pos.x - (parentLayout.width / 2),
				y: this.scale * pos.y - (parentLayout.height / 2)
			};
			scrollView.scrollTo(scrollTo);
		}
	}.observes('position')
	
});
