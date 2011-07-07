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
	
	isEditable: YES,
	destroyOnRemoval: YES,
	allowsMultipleSelection: NO,
	orderBy: 'name',
	content: [],
	
	numberOfNetworkPlanEntries: function(){
		return this.get('length') + ' entries';
	}.property('length')
	
});
