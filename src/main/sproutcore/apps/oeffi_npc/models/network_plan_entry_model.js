// ==========================================================================
// Project:   OeffiNpc.NetworkPlanEntry
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals OeffiNpc */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
OeffiNpc.NetworkPlanEntry = SC.Record.extend(
/** @scope OeffiNpc.NetworkPlanEntry.prototype */ {
	
	primaryKey: 'stationId',
	stationId: SC.Record.attr(Number),
	name: SC.Record.attr(String),
	x: SC.Record.attr(Number),
	y: SC.Record.attr(Number),
	networkPlan: SC.Record.toOne('OeffiNpc.NetworkPlan', {isMaster: NO})

});
