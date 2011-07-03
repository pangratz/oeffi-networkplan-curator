// ==========================================================================
// Project:   OeffiNpc.ImageView
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals OeffiNpc */

/** @class

  (Document Your View Here)
*/
OeffiNpc.ImageViewMixin = {
	
	scale: 1.0,
	
	_imageChanged: function(){
		var image = this.get('image');
		if (image) {
			var layout = {
				width: this.scale * image.width,
				height: this.scale * image.height
			};
			this.set('layout', layout);
		}
	}.observes('image')
	
};
