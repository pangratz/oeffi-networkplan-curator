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
		
		mainView: SC.ScrollView.design({
			layout: {top: 36, left: 50, width: 300},
			contentView: SC.ListView.design({
				showAlternatingRows: YES,
				contentBinding: 'OeffiNpc.networkPlansController.arrangedObjects',
				selectionBinding: 'OeffiNpc.networkPlanController.content',
				contentValueKey: 'networkId',
				target: 'OeffiNpc.statechart',
				action: 'networkPlanSelected',
				actOnSelect: YES
			})
		}),
			
		entriesView: SC.ListView.design({
			layout: {left: 400, width: 200, top: 36, bottom: 0},
			showAlternatingRows: YES,
			contentBinding: 'OeffiNpc.networkPlanEntriesController.arrangedObjects',
			selectionBinding: 'OeffiNpc.networkPlanEntryController.content',
			contentValueKey: 'name'
		}),
		
		entryView: SC.View.design({
			layout: {left: 650, top: 36, right: 0, bottom: 0},
			childViews: 'contentView imageView'.w(),
			
			contentView: SC.TemplateView.create({
				layout: {left: 10, top: 20, right: 10, height: 100},
				templateName: 'entry',
				entryBinding: 'OeffiNpc.networkPlanEntryController'
			}),
			
			imageView: SC.ScrollView.design({
				layout: {left: 10, top: 120, right: 0, bottom: 0},
				contentView: SC.ImageView.design({
					valueBinding: 'OeffiNpc.networkPlanController.imageUrl',
					layout: {width: 1114, height: 1618}
				}),
				
				mouseDown: function() {
					return YES;
				},

				mouseUp: function(evt) {
					
					var point = {
						x: event.pageX,
						y: event.pageY
					};
					
					var newFrame = this.convertFrameFromView(point, null);
					point.x = newFrame.x;
					point.y = newFrame.y;
					
					var offset = {
						x: Math.floor(this.get('horizontalScrollOffset') * this.get('scale')),
						y: Math.floor(this.get('verticalScrollOffset') * this.get('scale'))
					};
					
					point.x += offset.x;
					point.y += offset.y;
					
					SC.debug( 'cliked image @ ' + point.x + '/' + point.y );
					
					OeffiNpc.networkPlanEntryController.set('x', point.x);
					OeffiNpc.networkPlanEntryController.set('y', point.y);
				}
			})
		})
		
	})
	
});