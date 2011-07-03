/*globals OeffiNpc*/

OeffiNpc.statechart = SC.Statechart.create({
	
	trace: YES,
	initialState: 'loading',
	
	loading: SC.State.plugin('OeffiNpc.LoadingState'),
	showNetworkPlans: SC.State.plugin('OeffiNpc.ShowNetworkPlansState'),
	showNetworkPlan: SC.State.plugin('OeffiNpc.ShowNetworkPlanState')
	
});