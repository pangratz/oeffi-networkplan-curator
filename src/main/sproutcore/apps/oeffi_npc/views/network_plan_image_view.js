// ==========================================================================
// Project:   OeffiNpc.NetworkPlanImageView
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals OeffiNpc */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
OeffiNpc.NetworkPlanImageView = SC.ImageView.extend(
/** @scope OeffiNpc.NetworkPlanImageView.prototype */ {
	
	cursorPositionString: function() {
		var pos = this.get('cursorPosition');
		if (pos) {
			return pos.x + '/' + pos.y;
		}
		return '';
	}.property('cursorPosition'),
	
	mouseEntered: function(evt) {
		var that = this;
		var listener = function(evt) {
			that.mouseMoved(evt);
		};
		this.set('listener', listener);
		SC.Event.add(evt.target, 'mousemove', listener);
	},
	
	mouseExited: function(evt) {
		var listener = this.get('listener');
		this.set('listener', undefined);
		SC.Event.remove(evt.target, 'mousemove', listener);
	},
	
	mouseMoved: function(evt) {		
		var pointOnCanvas = this.get('parentView').get('parentView').getImageCoords(evt);
		this.set('cursorPosition', pointOnCanvas);
		
		var zoom = YES;
		if (!zoom) {
			return;
		}
		
		var canvas = this.get('canvas');
		if (!canvas) {
			this.set('canvas', evt.srcElement);
			canvas = evt.srcElement;
		}
		
		var width = canvas.width;
		var height = canvas.height;
		
		if (pointOnCanvas.x >= (width - 30) || pointOnCanvas.x <= 30) {
			return;
		}
		if (pointOnCanvas.y >= (height - 30) || pointOnCanvas.y <= 30) {
			return;
		}
		
		
		var ctx = canvas.getContext('2d');
		var image = this.get('image');
		var prev = this.get('prev');
		if (prev) {
			ctx.drawImage(image, prev.x-30, prev.y-30, 61, 61, prev.x-30, prev.y-30, 61, 61);
		}
		
		ctx.drawImage(canvas, pointOnCanvas.x-5, pointOnCanvas.y-5, 11, 11, pointOnCanvas.x-30, pointOnCanvas.y-30, 61, 61);
		ctx.beginPath();
		ctx.strokeStyle = 'red';
		ctx.moveTo(pointOnCanvas.x, pointOnCanvas.y-20);
		ctx.lineTo(pointOnCanvas.x, pointOnCanvas.y+20);
		ctx.moveTo(pointOnCanvas.x-20, pointOnCanvas.y);
		ctx.lineTo(pointOnCanvas.x+20, pointOnCanvas.y);
		ctx.stroke();
		
		this.set('prev', {
			x: pointOnCanvas.x,
			y: pointOnCanvas.y
		});
	}
	
});
