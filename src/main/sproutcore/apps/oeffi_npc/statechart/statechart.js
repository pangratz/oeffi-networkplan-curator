/*globals OeffiNpc*/

OeffiNpc.statechart = SC.Statechart.create({
	
	trace: YES,
	initialState: 'loading',
	
	loading: SC.State.plugin('OeffiNpc.LoadingState'),
	showNetworkPlans: SC.State.plugin('OeffiNpc.ShowNetworkPlansState'),
	editNetworkPlan: SC.State.plugin('OeffiNpc.EditNetworkPlanState')
	
});