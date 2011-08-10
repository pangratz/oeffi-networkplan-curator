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
		var value = this.get('value');		
		var paper = this.contentView.get('paper');
		paper.setSize(2338,1653);
		var img = paper.image(value,0,0,2338,1653);
		img.dblclick(function(event){
			SC.debug(event);
			OeffiNpc.statechart.sendEvent('clickedOnNetworkPlan', {
				x: event.pageX,
				y: event.pageY
			});
		});
		this.contentView.set('layout', {
			width: 2338,
			height: 1653
		});
	}.observes('value'),
	
	contentView: SC.View.design({
		
		didAppendToDocument: function(){
			var paper = new Raphael(this.get('layerId'), 0, 0);
			
			this.set('paper', paper);
			this.set('layout', {width: 0, height: 0});
		},
		
		highlightPoint: function(point){
			var paper = this.get('paper');
			
			var c = paper.circle(point.x, point.y, 30).attr({fill: 'red'});
			c.animate({r: 5}, 1000);
		}
		
	})
	
});
