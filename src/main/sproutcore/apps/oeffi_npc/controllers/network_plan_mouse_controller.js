// ==========================================================================
// Project:   OeffiNpc.networkPlanMouseController
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals OeffiNpc */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
OeffiNpc.networkPlanMouseController = SC.ObjectController.create(
/** @scope OeffiNpc.networkPlanMouseController.prototype */ {
	
	content: {
		x: undefined,
		y: undefined
	},
	
	positionString: function(){
		return this.get('x') + '/' + this.get('y');
	}.property('x', 'y')

});
