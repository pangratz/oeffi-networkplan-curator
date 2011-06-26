/*globals OeffiNpc*/

OeffiNpc.mainPage = SC.Page.design({
	
	mainPane: SC.MainPane.design({
		
		childViews: 'topView mainView entriesView entryView'.w(),
		
		topView: SC.ToolbarView.design({
			layout: {top: 0, left: 0, right: 0, height: 36},
			childViews: 'labelView'.w(),
			anchorLocation: SC.ANCHOR_TOP,
			
			labelView: SC.LabelView.design({
				layout: {left: 10, right: 10},
				valueBinding: 'OeffiNpc.networkPlanController.networkId'
			})
			
		}),
		
		mainView: SC.ListView.design({
			layout: {top: 36, left: 50, width: 300},
			showAlternatingRows: YES,
			contentBinding: 'OeffiNpc.networkPlansController',
			selectionBinding: 'OeffiNpc.networkPlanController.content',
			contentValueKey: 'networkId'
		}),
		
		entriesView: SC.ListView.design({
			layout: {left: 400, width: 200, top: 36},
			showAlternatingRows: YES,
			contentBinding: 'OeffiNpc.networkPlanEntriesController',
			selectionBinding: 'OeffiNpc.networkPlanEntryController.content',
			contentValueKey: 'name'
		}),
		
		entryView: SC.View.design({
			layout: {left: 650, top: 36, right: 0, height: 200},
			childViews: 'contentView'.w(),
			
			contentView: SC.TemplateView.create({
				templateName: 'entry',
				entryBinding: 'OeffiNpc.networkPlanEntryController'
			})
		})
		
	})
	
});