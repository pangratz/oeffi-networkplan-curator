// ==========================================================================
// Project:   OeffiNpc.networkPlanEntriesController
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals OeffiNpc */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
OeffiNpc.networkPlanEntriesController = SC.ArrayController.create(
/** @scope OeffiNpc.networkPlanEntriesController.prototype */ {
	
	allowsMultipleSelection: NO,
	contentBinding: 'OeffiNpc.networkPlanController.entries'
	
});
