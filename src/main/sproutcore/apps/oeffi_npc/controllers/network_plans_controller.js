// ==========================================================================
// Project:   OeffiNpc.networkPlansController
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals OeffiNpc */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
OeffiNpc.networkPlansController = SC.ArrayController.create(
/** @scope OeffiNpc.networkPlansController.prototype */ {
	
	content: [],
	allowsMultipleSelection: YES,
	
	numberOfNetworkPlans: function(){
		return this.get('length') + ' network plans';
	}.property('length')
	
});
