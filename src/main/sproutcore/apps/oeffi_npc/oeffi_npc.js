// ==========================================================================
// Project:   OeffiNpc
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals OeffiNpc */

OeffiNpc = SC.Application.create({
	store: SC.Store.create().from('OeffiNpc.FixturesDataSource')
});

SC.ready(function() {
	OeffiNpc.statechart.initStatechart();
});
