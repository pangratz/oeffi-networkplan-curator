// ==========================================================================
// Project:   OeffiNpc.ImageView
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals OeffiNpc */

/** @class

  (Document Your View Here)
*/
OeffiNpc.ImageViewMixin = {
	
	_imageChanged: function(){
		var image = this.get('image');
		if (image) {
			var layout = {
				width: image.width,
				height: image.height
			};
			this.set('layout', layout);
		}
	}.observes('image')
	
};
