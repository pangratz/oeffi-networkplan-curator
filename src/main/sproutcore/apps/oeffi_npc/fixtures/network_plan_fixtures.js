// ==========================================================================
// Project:   OeffiNpc.NetworkPlan Fixtures
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals OeffiNpc */

sc_require('models/network_plan_model');

OeffiNpc.NetworkPlan.FIXTURES = [
	
	{
		guid: 'linz',
		networkId: 'linz',
		planId: 'linz',
		imageUrl: 'http://oeffi.schildbach.de/plans/linz.png',
		entries: ['schumpeterstrasse', 'taubenmarkt']
	},
	
	{
		guid: 'innsbruck',
		networkId: 'innsbruck',
		planId: 'innsbruck',
		imageUrl: 'http://oeffi.schildbach.de/plans/linz.png',
		entries: ['landesmuseum', 'innsbruck_hauptbahnhof']
	}

];
