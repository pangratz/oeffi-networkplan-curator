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
	
	doubleClick: function(evt) {
		var point = this.getImageCoords(evt);
		OeffiNpc.statechart.sendEvent('clickedOnNetworkPlan', point);
	},
	
	mouseMoved: function(evt) {
		this.set('mouseMoveEvent', evt);
		this.contentView.set('mouseMoveEvent', evt);
	},
    
	mouseMoveEventChanged: function(){
		var evt = this.get('mouseMoveEvent');
		var cursorPosition = this.getImageCoords(evt);
		this.set('cursorPosition', cursorPosition);
		this.contentView.set('cursorPosition', cursorPosition);
	}.observes('mouseMoveEvent'),
	
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
	
	contentView: SC.ImageView.design(OeffiNpc.ImageViewMixin, {
		
		from: 20,
		to: 60,
		cursorPosition: undefined,
		prev: undefined,
		
		cursorPositionChanged: function(){
			if (this.get('zoom') === YES) {
				this.repaint();
			}
		}.observes('cursorPosition'),
		
		zoomPropertiesChanged: function(){
			this.repaint();
		}.observes('zoom', 'zoomScale'),
		
		mouseEntered: function(evt) {
			this.set('canvas', evt.srcElement);
		},

		mouseExited: function(evt) {
			this.set('canvas', undefined);
		},
		
		repaint: function(){
			var canvas = this.get('canvas');
			if (!canvas) {
				SC.debug('#repaint :: no canvas available');
				return;
			}
			
			var cursorPosition = this.get('cursorPosition');
			var width = canvas.width;
			var height = canvas.height;
        
			this._resetPreviousZoom(canvas);
			if (this.get('zoom') == YES) {
				this._drawNewZoom(canvas);
			}
		},
        
		_resetPreviousZoom: function(canvas) {
			var ctx = canvas.getContext('2d');
			var image = this.get('image');
			var prev = this.get('prev');
			if (prev) {
				try {
					var pos = this._calculateMagnifierPosition(canvas, prev);
					ctx.drawImage(image,
						pos.x-this.to,
						pos.y-this.to,
						2*this.to,
						2*this.to,
						pos.x-this.to,
						pos.y-this.to,
						2*this.to,
						2*this.to);
						
				} catch (err) {
					// silent
				}
			}
		},
		
		_calculateMagnifierPosition: function(canvas, pos) {
			var x = Math.min(Math.max(this.to, pos.x), canvas.width - this.to);
			var y = Math.min(Math.max(this.to, pos.y), canvas.height - this.to);
			return {
				x: x,
				y: y,
				topLeft: {
					x: x - this.to,
					y: y - this.to
				},
				width: 2*this.to,
				height: 2*this.to
			};
		},
		
		_calculateMagnifierRect: function(canvas, center, magnifierPos, srcWidth, targetWidth) {
			var src = {
				x: Math.max(center.x - srcWidth, 0),
				y: Math.max(center.y - srcWidth, 0),
				width: 2*srcWidth,
				height: 2*srcWidth
			};
			var target = {
				x: Math.max(center.x - targetWidth, 0),
				y: Math.max(center.y - targetWidth, 0),
				width: 2*targetWidth,
				height: 2*targetWidth
			};
			
			src.width = Math.min(src.width, (canvas.width - src.x));
			src.height = Math.min(src.height, (canvas.height - src.y));
			
			target.width = Math.min(target.width, (canvas.width - target.x));
			target.height = Math.min(target.height, (canvas.height - target.y));
			
			target.x = target.x + (magnifierPos.x - center.x);
			target.y = target.y + (magnifierPos.y - center.y);
			
			return {
				src: src,
				target: target
			};
		},
        
		_drawNewZoom: function(canvas){
			var ctx = canvas.getContext('2d');
			var cursorPosition = this.get('cursorPosition');
			var image = this.get('image');
			var magnifierPos = this._calculateMagnifierPosition(canvas, cursorPosition);
			
			ctx.save();
            
			ctx.beginPath();
			ctx.arc(magnifierPos.x, magnifierPos.y, this.to, 0, Math.PI*2, false);
			ctx.clip();
			
			ctx.fillStyle = 'white';
			ctx.fillRect(magnifierPos.topLeft.x, magnifierPos.topLeft.y, magnifierPos.width, magnifierPos.height);
			
			var w = this.to/this.zoomScale;
			var magnifierRect = this._calculateMagnifierRect(canvas, cursorPosition, magnifierPos, w, this.to);
			ctx.drawImage(image,
				magnifierRect.src.x,
				magnifierRect.src.y,
				magnifierRect.src.width,
				magnifierRect.src.height,
				magnifierRect.target.x,
				magnifierRect.target.y,
				magnifierRect.target.width,
				magnifierRect.target.height);
            
			this._drawCrosshair(ctx, magnifierPos);
			this._drawMagnifierCircle(ctx, magnifierPos);
            
			ctx.restore();
        
			this.set('prev', {
				x: magnifierPos.x,
				y: magnifierPos.y
			});
		},
        
		_drawMagnifierCircle: function(ctx, center){
			ctx.save();
			ctx.strokeStyle = 'black';
			ctx.lineWidth = 3.0;
			ctx.beginPath();
			ctx.arc(center.x, center.y, this.to, 0, Math.PI*2, false);
			ctx.stroke();
			ctx.restore();
		},
        
		_drawCrosshair: function(ctx, center) {
			ctx.save();
			ctx.beginPath();
			ctx.strokeStyle = 'red';
			ctx.lineWidth = 1.0;
			ctx.moveTo(center.x, center.y-this.to);
			ctx.lineTo(center.x, center.y+this.to);
			ctx.moveTo(center.x-this.to, center.y);
			ctx.lineTo(center.x+this.to, center.y);
			ctx.stroke();
        
			ctx.restore();
		}
	})
});
