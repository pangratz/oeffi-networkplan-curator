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
		imageWidth: 1114,
		imageHeight: 1618,
		entries: ['schumpeterstrasse', 'taubenmarkt']
	},
	
	{
		guid: 'bonn',
		networkId: 'bonn',
		planId: 'bonn',
		imageUrl: 'http://oeffi.schildbach.de/plans/bonn_schnellverkehr.png',
		imageWidth: 2338,
		imageHeight: 1653,
		entries: ['landesmuseum', 'innsbruck_hauptbahnhof']
	}

];
