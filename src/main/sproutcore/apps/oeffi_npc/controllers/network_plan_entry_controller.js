// ==========================================================================
// Project:   OeffiNpc.networkPlanEntryController
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals OeffiNpc */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
OeffiNpc.networkPlanEntryController = SC.ObjectController.create(
/** @scope OeffiNpc.networkPlanEntryController.prototype */ {
	
	networkEntryDidChange: function(){
		OeffiNpc.statechart.sendEvent('networkEntrySelected');
	}.observes('content')
	
});
