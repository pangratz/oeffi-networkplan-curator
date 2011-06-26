// ==========================================================================
// Project:   OeffiNpc.NetworkPlan
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals OeffiNpc */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
OeffiNpc.NetworkPlan = SC.Record.extend(
/** @scope OeffiNpc.NetworkPlan.prototype */ {
	
	primaryKey: 'networkId',
	networkId: SC.Record.attr(String),
	planId: SC.Record.attr(String),
	imageUrl: SC.Record.attr(String),
	entries: SC.Record.toMany('OeffiNpc.NetworkPlanEntry', {isMaster: YES, nested: YES})

}) ;
