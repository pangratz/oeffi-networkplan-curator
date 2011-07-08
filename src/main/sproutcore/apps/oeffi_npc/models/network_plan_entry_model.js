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
sc_require('models/record_status_mixin');

OeffiNpc.NetworkPlanEntry = SC.Record.extend(OeffiNpc.RecordStatusMixin,
/** @scope OeffiNpc.NetworkPlanEntry.prototype */ {
	
	primaryKey: 'key',
	stationId: SC.Record.attr(String),
	name: SC.Record.attr(String),
	x: SC.Record.attr(Number),
	y: SC.Record.attr(Number),
	networkPlanKey: SC.Record.attr(String)

});
