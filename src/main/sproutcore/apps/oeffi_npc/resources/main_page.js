/*globals OeffiNpc*/

OeffiNpc.mainPage = SC.Page.design({
	
	mainPane: SC.MainPane.design({
		
		childViews: 'topView entriesView entryView magnifierView'.w(),
		layout: {left: 0, right: 0, top: 0, bottom: 0},
		
		keyUp: function(evt) {
			if (evt.keyCode == 90) {
				OeffiNpc.statechart.sendEvent('zPressed');
				return YES;
			}
			
			if (evt.keyCode >= 49 && evt.keyCode <= 57) {
				OeffiNpc.statechart.sendEvent('numberPressed', (evt.keyCode - 48));
				return YES;
			}
			
			return NO;
		},
		
		topView: SC.View.design({
			layout: {top: 0, left: 0, right: 0, height: 36},
			childViews: 'backButton labelView'.w(),
			
			backButton: SC.ButtonView.design({
				layout: {left: 10, width: 50},
				title: 'back',
				target: 'OeffiNpc.statechart',
				action: 'backToNetworkPlans'
			}),
			
			labelView: SC.LabelView.design({
				layout: {left: 70, right: 10},
				valueBinding: 'OeffiNpc.networkPlanController.networkId'
			})
			
		}),
		
		magnifierView: SC.ScrollView.design({
			layout: {left: 10, width: 200, bottom: 10, height: 200},
			contentView: OeffiNpc.MagnifierView.design({
				valueBinding: 'OeffiNpc.networkPlanController.imageUrl',
				positionBinding: 'OeffiNpc.networkPlanViewController.cursorPosition'
			})
		}),
		
		entriesView: SC.View.design({
			layout: {left: 10, width: 200, top: 36, bottom: 220},
			childViews: 'list buttons'.w(),
			
			list: SC.ScrollView.design({
				layout: {top: 0, bottom: 36, left: 0, right: 0},
				contentView: SC.ListView.design({
					showAlternatingRows: YES,
					contentBinding: 'OeffiNpc.networkPlanEntriesController.arrangedObjects',
					selectionBinding: 'OeffiNpc.networkPlanEntryController.content',
					contentValueKey: 'name'
				})
			}),
			
			buttons: SC.View.design({
				childViews: 'removeBtn addBtn'.w(),
				layout: {bottom: 0, height: 36, left: 0, right: 0},
				
				removeBtn: SC.ButtonView.design({
					layout: {bottom: 0, right: 30, width: 18},
					title: '-'
				}),

				addBtn: SC.ButtonView.design({
					layout: {bottom: 0, right: 10, width: 18},
					title: '+',
					target: 'OeffiNpc.statechart',
					action: 'addEntry'
				})
			})
		}),
		
		entryView: SC.View.design({
			layout: {left: 220, top: 36, right: 10, bottom: 0},
			childViews: 'contentView imageView bottomView'.w(),
			
			contentView: SC.TemplateView.create({
				layout: {left: 10, width: 150, top: 0, bottom: 0},
				templateName: 'entry',
				entryBinding: 'OeffiNpc.networkPlanEntryController'
			}),
			
			bottomView: SC.View.design({
				childViews: 'label zoom'.w(),
				layout: {left: 150, bottom: 0, height: 36, right: 0},
				
				label: SC.LabelView.design({
					layout: {width: 100, left: 0},
					valueBinding: 'OeffiNpc.networkPlanViewController.cursorPositionString'
				}),
				
				zoom: SC.CheckboxView.design({
					layout: {left: 110},
					valueBinding: 'OeffiNpc.networkPlanViewController.zoom'
				})
			}),
			
			imageView: OeffiNpc.NetworkPlanView.design({
				layout: {left: 150, top: 0, right: 0, bottom: 36},
				cursorPositionBinding: 'OeffiNpc.networkPlanViewController.cursorPosition',
				valueBinding: 'OeffiNpc.networkPlanController.imageUrl',
				zoomBinding: 'OeffiNpc.networkPlanViewController.zoom',
				zoomScaleBinding: 'OeffiNpc.networkPlanViewController.zoomScale'
			})
		})
		
	}),
	
	listNetworkPlansPane: SC.Pane.design({
		childViews: 'networkPlanList'.w(),
		
		networkPlanList: SC.ListView.design({
			layout: {centerX: 0, centerY: 0, width: 250, height: 300},
			showAlternatingRows: YES,
			contentBinding: 'OeffiNpc.networkPlansController.arrangedObjects',
			selectionBinding: 'OeffiNpc.networkPlanController.content',
			contentValueKey: 'networkId',
			target: 'OeffiNpc.statechart',
			action: 'networkPlanSelected',
			actOnSelect: YES
		})
	})
	
});