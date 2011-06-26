// ==========================================================================
// Project:   OeffiNpc.NetworkplanEntry Fixtures
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals OeffiNpc */

sc_require('models/network_plan_entry_model');

OeffiNpc.NetworkPlanEntry.FIXTURES = [

	{
		guid: 'schumpeterstrasse',
		stationId: 491115,
		name: 'Linz/Donau Schumpeterstrasse',
		x: 200,
		y: 50,
		networkPlan: 'linz'
	},
	
	{
		guid: 'taubenmarkt',
		stationId: 491106,
		name: 'Linz/Donau Taubenmarkt',
		x: 50,
		y: 150,
		networkPlan: 'linz'
	},
	
	{
		guid: 'landesmuseum',
		stationId: 123,
		name: 'Innsbruck Landesmuseum',
		x: 40,
		y: 50,
		networkPlan: 'innsbruck'
	},
	
	{
		guid: 'innsbruck_hauptbahnhof',
		stationId: 456,
		name: 'Innsbruck Hauptbahnhof',
		x: 10,
		y: 15,
		networkPlan: 'innsbruck'
	}

];
