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
	
	_entries: [],
	
	_start: function () {
	    // storing original coordinates
	    this.ox = this.attr("cx");
	    this.oy = this.attr("cy");
		this.attr({
			cursor: 'none',
			opacity: 0.5
		});
	},
	
	_move: function (dx, dy) {
	    // move will be called with dx and dy
	    this.attr({
			cx: this.ox + dx,
			cy: this.oy + dy,
			cursor: "none"
		});
	},
	
	_up: function () {
		this.attr({
			cursor: "default",
			opacity: 1.0
		});
		
		var point = {
			x: this.attr('cx'),
			y: this.attr('cy')
		};
		OeffiNpc.statechart.sendEvent('movedNetworkPlanEntry', this._storeKey, point);
	},
	
	_createPoint: function(paper, entry) {
		var stationId = entry.get('stationId');
		var gradient = stationId ? 'r darkgreen-green' : 'r darkred-red';
		var x = entry.get('x');
		var y = entry.get('y');
		var storeKey = entry.get('storeKey');
		
		SC.debug('creating circle for storeKey %@1'.fmt(storeKey));
		
		var attrs = {
			fill: gradient
		};
		var cross = paper.circle(x,y, 7).attr(attrs);
		cross._storeKey = storeKey;
		cross.drag(this._move, this._start, this._up);
		cross.hover(function (event) {
			this.attr({cursor: "move"});
		});		
		
		cross.click(function(event) {
			OeffiNpc.statechart.sendEvent('selectedNetworkPlan', storeKey);
		});
		
		return cross;
	},
	
	contentLengthDidChange: function() {
		var content = this.get('content');
		this.set('length', content ? content.get('length') : 0);
	},
	
	reload: function(indexes) {
		SC.debug('reload %@1'.fmt(indexes));
	},
	
	nowShowing: function() {
		return SC.IndexSet.create(0, this.get('length')).freeze();
	}.property('length').cacheable(),
	
	_cv_nowShowingDidChange: function() {
		this.updateContentRangeObserver();
	}.observes('nowShowing'),
	
	_valueChanged: function(sender, key, value, rev){
		// SC.debug('_valueChanged: %@1 %@2 %@3 %@4'.fmt(sender, key, value, rev));
		SC.debug('value %@1 of item with id {%@2} changed'.fmt(key, sender.get('key')));
		
		var circle = this._entries[sender.get('storeKey')];
		if (circle) {
			circle.attr({
				cx: sender.get('x'),
				cy: sender.get('y'),
				fill: sender.get('stationId') ? 'r darkgreen-green' : 'r darkred-red'
			});
		}
	},
	
	updateContentRangeObserver: function() {
		SC.debug('updateContentRangeObserver');

		var nowShowing = this.get('nowShowing');
		var observer = this._cv_contentRangeObserver;
		var content = this.get('content');
		
		if (!content) {
			SC.debug('updateRangeObserver --> no content');
			return;
		}
		
		var that = this;
		var paper = this.contentView.get('paper');
		content.forEach(function(item, index, enumerable){
			item.addObserver('name', that, '_valueChanged');
			item.addObserver('stationId', that, '_valueChanged');
			item.addObserver('x', that, '_valueChanged');
			item.addObserver('y', that, '_valueChanged');
			
			if (!that._entries[item.get('storeKey')]) {
				that._entries[item.get('storeKey')] = that._createPoint(paper, item);
			}
		});
		
		if (observer) {
			SC.debug('updateRangeObserver --> updateRangeObserver');
			content.updateRangeObserver(observer, nowShowing);
		} else {
			SC.debug('updateRangeObserver --> addRangeObserver');
			var func = this.contentRangeDidChange;
			observer = content.addRangeObserver(nowShowing, this, func, null);
			this._cv_contentRangeObserver = observer;
		}
	},
	
	contentRangeDidChange: function(content, object, key, indexes) {
		SC.debug('contentRangeDidChange %@1 %@2 %@3 %@4'.fmt(content, object, key, indexes));
		if (!object && key === '[]') {
			this.reload(indexes); // note: if indexes == null, reloads all
		} else {
			this.contentPropertyDidChange(object, key, indexes);
		}
	},
	
	removeContentRangeObserver: function() {
		var content = this.get('content');
		var observer = this._cv_contentRangeObserver;
		
		if (observer) {
			if (content) {
				content.removeRangeObserver(observer);
			}
			this._cv_contentRangeObserver = null;
		}
	},
	
	contentPropertyDidChange: function(target, key, indexes) {
		SC.debug('contentPropertyDidChange: %@1 %@2 %@3'.fmt(target, key, indexes));
	},
	
	_contentDidChange: function() {
		SC.debug('_contentDidChange');
		
		var content = this.get('content');
		var lfunc = this.contentLengthDidChange;
		
		if (content === this._content) {
			return;
		}
		
		// cleanup old content
		this.removeContentRangeObserver();
		if (this._content) {
			this._content.removeObserver('length', this, lfunc);
		}
		
		// cache
		this._content = content;
		
		// add new observers - range observer will be added lazily
		if (content) {
			content.addObserver('length', this, lfunc);
		}
		
		// notify all items changed
		this.contentLengthDidChange();
		this.contentRangeDidChange(content, null, '[]', null);		
	}.observes('content'),
	
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
