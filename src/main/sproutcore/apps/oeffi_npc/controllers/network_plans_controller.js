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
	
	allowsMultipleSelection: NO,
	
	numberOfNetworkPlans: function(){
		var content = this.get('content');
		if (content) {
			return content.get('length') + ' network plans';
		}
		
		return '0 network plans';
	}.property('content')
	
}) ;
