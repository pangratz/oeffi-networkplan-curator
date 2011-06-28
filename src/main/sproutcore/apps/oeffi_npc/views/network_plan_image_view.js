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
	
	zoom: NO,
	cursorPosition: undefined,
	prev: undefined,
	
	drawZoom: function(){
		var evt = this.get('mouseMoveEvent');
		if (!evt){
			return;
		}
		
		var pointOnCanvas = this.get('parentView').get('parentView').getImageCoords(evt);
		this.set('cursorPosition', pointOnCanvas);
		
		if (!this.get('zoom') && SC.ok(this.get('prev'))) {
			SC.debug('reset view from zoomed state to not zoomed state');
			this.set('prev', 'nix');
			return;
		}
		
		var from = 20;
		var to = 60;
		
		var canvas = this.get('canvas');
		if (!canvas) {
			this.set('canvas', evt.srcElement);
			canvas = evt.srcElement;
		}
		
		var width = canvas.width;
		var height = canvas.height;
		
		if (pointOnCanvas.x >= (width - to) || pointOnCanvas.x <= to) {
			return;
		}
		if (pointOnCanvas.y >= (height - to) || pointOnCanvas.y <= to) {
			return;
		}
		
		var ctx = canvas.getContext('2d');
		var image = this.get('image');
		var prev = this.get('prev');
		if (prev) {
			try {
				ctx.drawImage(image, Math.max(0, prev.x-to), Math.max(0, prev.y-to), 2*to+1, 2*to+1, prev.x-to, prev.y-to, 2*to+1, 2*to+1);
			} catch (err) {
				// silent
			}
		}
		
		if (prev) {
			ctx.save();
			ctx.beginPath();
			ctx.arc(prev.x, prev.y, to, 0, Math.PI*2, true);
			ctx.clip();
			ctx.drawImage(canvas, pointOnCanvas.x-from, pointOnCanvas.y-from, 2*from+1, 2*from+1, pointOnCanvas.x-to-1, pointOnCanvas.y-to-1, 2*to-1, 2*to-1);
			ctx.restore();
			
			ctx.save();
			// ctx.strokeStyle = 'green';
			ctx.arc(prev.x, prev.y, to-10, 0, Math.PI*2, true);
			// ctx.stroke();
			ctx.restore();
		}
		
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
	}.observes('zoom', 'mouseMoveEvent'),
	
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
		this.set('mouseMoveEvent', evt);
	}
	
});
