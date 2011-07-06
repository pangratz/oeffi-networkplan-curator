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
	
	primaryKey: '_id',
	stationId: SC.Record.attr(String),
	name: SC.Record.attr(String),
	x: SC.Record.attr(Number),
	y: SC.Record.attr(Number),
	networkPlanKey: SC.Record.toOne('OeffiNpc.NetworkPlan', {isMaster: NO, inverse: 'entries'})

});
