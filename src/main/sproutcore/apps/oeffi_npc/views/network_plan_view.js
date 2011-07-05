// ==========================================================================
// Project:   OeffiNpc.NetworkPlanView
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals OeffiNpc */

/** @class

  (Document Your View Here)

  @extends SC.ScrollView
*/
OeffiNpc.NetworkPlanView = SC.ScrollView.extend({
	
	valueChanged: function(){
		this.contentView.set('value', this.get('value'));
	}.observes('value'),
	
	zoomChanged: function() {
		this.contentView.set('zoom', this.get('zoom'));
	}.observes('zoom'),
	
	zoomScaleChanged: function(){
		this.contentView.set('zoomScale', this.get('zoomScale'));
	}.observes('zoomScale'),
	
	contentView: SC.ImageView.design(OeffiNpc.ImageViewMixin, {
		
		from: 20,
		to: 60,
		cursorPosition: undefined,
		prev: undefined,
		
		mouseMoved: function(evt) {
			this.set('mouseMoveEvent', evt);
		},
        
		mouseMovedEventChanged: function(){
			var evt = this.get('mouseMoveEvent');
			var pointOnCanvas = this.get('parentView').get('parentView').getImageCoords(evt);
			this.set('cursorPosition', pointOnCanvas);
			if (this.get('zoom') === YES) {
				this.repaint();
			}
		}.observes('mouseMoveEvent'),
		
		zoomPropertiesChanged: function(){
			this.repaint();
		}.observes('zoom', 'zoomScale'),
        
		_resetPreviousZoom: function(canvas) {
			var ctx = canvas.getContext('2d');
			var image = this.get('image');
			var prev = this.get('prev');
			if (prev) {
				try {
					ctx.drawImage(image, Math.max(0, prev.x-this.to), Math.max(0, prev.y-this.to), 2*this.to+1, 2*this.to+1, prev.x-this.to, prev.y-this.to, 2*this.to+1, 2*this.to+1);
				} catch (err) {
					// silent
				}
			}
		},
        
		_drawNewZoom: function(canvas){
			var ctx = canvas.getContext('2d');
			var pointOnCanvas = this.get('cursorPosition');
        
			if (pointOnCanvas) {
				ctx.save();
        
				ctx.beginPath();
				ctx.arc(pointOnCanvas.x, pointOnCanvas.y, this.to, 0, Math.PI*2, false);
				ctx.clip();
				var w = this.to/this.zoomScale;
				ctx.drawImage(canvas, pointOnCanvas.x-w, pointOnCanvas.y-w, 2*w, 2*w, pointOnCanvas.x-this.to, pointOnCanvas.y-this.to, 2*this.to, 2*this.to);
        
				this._drawCrosshair(ctx, pointOnCanvas.x, pointOnCanvas.y);
				this._drawMagnifierCircle(ctx, pointOnCanvas.x, pointOnCanvas.y);
        
				ctx.restore();
			}
        
			this.set('prev', {
				x: pointOnCanvas.x,
				y: pointOnCanvas.y
			});
		},
        
		_drawMagnifierCircle: function(ctx, x, y){
			ctx.save();
			ctx.strokeStyle = 'black';
			ctx.lineWidth = 3;
			ctx.beginPath();
			ctx.arc(x, y, this.to-1, 0, Math.PI*2, false);
			ctx.stroke();
			ctx.restore();
		},
        
		_drawCrosshair: function(ctx, x, y) {
			ctx.save();
			ctx.beginPath();
			ctx.strokeStyle = 'red';
			ctx.moveTo(x, y-this.to);
			ctx.lineTo(x, y+this.to);
			ctx.moveTo(x-this.to, y);
			ctx.lineTo(x+this.to, y);
			ctx.stroke();
        
			ctx.restore();
		},
        
		repaint: function(){
			var evt = this.get('mouseMoveEvent');
			if (!evt){
				return;
			}
        
			var canvas = this.get('canvas');
			if (!canvas) {
				this.set('canvas', evt.srcElement);
				canvas = evt.srcElement;
			}
        
			var pointOnCanvas = this.get('cursorPosition');
			var width = canvas.width;
			var height = canvas.height;
        
			if (pointOnCanvas.x >= (width - this.to) || pointOnCanvas.x <= this.to) {
				return;
			}
			if (pointOnCanvas.y >= (height - this.to) || pointOnCanvas.y <= this.to) {
				return;
			}
        
			this._resetPreviousZoom(canvas);
			if (this.get('zoom') == YES) {
				this._drawNewZoom(canvas);
			}
		},
        
		cursorPositionString: function() {
			var pos = this.get('cursorPosition');
			if (pos) {
				return pos.x + '/' + pos.y;
			}
			return undefined;
		}.property('cursorPosition')
	}),

	mouseDown: function() {
		return YES;
	},
	
	mouseUp: function(evt) {
		var point = this.getImageCoords(evt);
		SC.debug( 'cliked image @ ' + point.x + '/' + point.y );
		OeffiNpc.statechart.sendEvent('clickedOnNetworkPlan', point);
	},
	
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
	}
});
