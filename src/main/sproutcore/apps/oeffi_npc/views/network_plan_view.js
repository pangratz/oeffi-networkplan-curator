// ==========================================================================
// Project:   OeffiNpc.NetworkPlanView
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals OeffiNpc Raphael */

/** @class

  (Document Your View Here)

  @extends SC.ScrollView
*/
OeffiNpc.NetworkPlanView = SC.ScrollView.extend({
	
	scrollPositionDidChange: function(){
		var scrollPosition = this.get('scrollPosition');
		var frame = this.get('frame');
		this.scrollTo(scrollPosition.x - (frame.width / 2.0), scrollPosition.y - (frame.height / 2.0));
		this.contentView.highlightPoint(scrollPosition);
	}.observes('scrollPosition'),
	
	valueDidChange: function(){
		var networkPlanImage = this.get('networkPlanImage');
		if (networkPlanImage) {
			networkPlanImage.remove();
		}
		
		var value = this.get('value');		
		var paper = this.contentView.get('paper');
		var width = this.get('imageWidth');
		var height = this.get('imageHeight');
		
		paper.setSize(width, height);
		var img = paper.image(value,0,0,width,height);
		this.set('networkPlanImage', img);
		
		var that = this;
		img.dblclick(function(event){
			OeffiNpc.statechart.sendEvent('clickedOnNetworkPlan', that.getImageCoords(event));
		});
		img.mousemove(function(event){
			that.set('cursorPosition', that.getImageCoords(event));
		});
		this.contentView.set('layout', {
			width: width,
			height: height
		});
		
		this.set('layerNeedsUpdate', YES);
	}.observes('value'),
	
	getImageCoords: function(evt) {
		var point = {
			x: evt.pageX,
			y: evt.pageY
		};
		
		var newFrame = this.convertFrameFromView(point, null);
		point.x = newFrame.x;
		point.y = newFrame.y;
		
		var offset = {
			x: Math.floor(this.get('horizontalScrollOffset') * this.get('scale')),
			y: Math.floor(this.get('verticalScrollOffset') * this.get('scale'))
		};
		
		point.x += offset.x;
		point.y += offset.y;
		
		return point;
	},
	
	contentView: SC.View.design({
		
		didAppendToDocument: function(){
			if (!this.get('paper')) {
				var paper = new Raphael(this.get('layerId'), 0, 0);
				this.set('paper', paper);
				this.set('layout', {width: 0, height: 0});
			}
		},
		
		highlightPoint: function(point){
			var paper = this.get('paper');
			
			var c = paper.circle(point.x, point.y, 30).attr({fill: 'red'});
			c.animate({r: 0}, 500, function(){
				c.remove();
			});
		}
		
	})
	
});
