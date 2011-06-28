/*globals OeffiNpc*/

OeffiNpc.mainPage = SC.Page.design({
	
	mainPane: SC.MainPane.design({
		
		childViews: 'topView entriesView entryView'.w(),
		layout: {left: 0, right: 0, top: 0, bottom: 0},
		
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
		
		entriesView: SC.ListView.design({
			layout: {left: 10, width: 200, top: 36, bottom: 0},
			showAlternatingRows: YES,
			contentBinding: 'OeffiNpc.networkPlanEntriesController.arrangedObjects',
			selectionBinding: 'OeffiNpc.networkPlanEntryController.content',
			contentValueKey: 'name'
		}),
		
		entryView: SC.View.design({
			layout: {left: 220, top: 36, right: 10, bottom: 0},
			childViews: 'contentView imageView'.w(),
			
			contentView: SC.TemplateView.create({
				layout: {left: 10, width: 150, top: 0, bottom: 0},
				templateName: 'entry',
				entryBinding: 'OeffiNpc.networkPlanEntryController'
			}),
			
			imageView: SC.ScrollView.design({
				layout: {left: 150, top: 0, right: 0, bottom: 0},
				contentView: SC.ImageView.design({
					valueBinding: 'OeffiNpc.networkPlanController.imageUrl',
					layout: {width: 1114, height: 1618}
				}),
				
				mouseEntered: function(evt) {
					var that = this;
					var listener = function(evt) {
						that.mouseMoved(evt);
					};
					this.set('listener', listener);
					SC.Event.add(evt.target, 'mousemove', listener);
				},
				
				mouseExited: function(evt) {
					var listener = this.get('listener');
					this.set('listener', undefined);
					SC.Event.remove(evt.target, 'mousemove', listener);
				},
				
				mouseMoved: function(evt) {
					var pointOnCanvas = this.getImageCoords(evt);
					// SC.debug('mouse moved on image @ ' + pointOnCanvas.x + '/' + pointOnCanvas.y);
					
					var canvas = this.get('canvas');
					if (!canvas) {
						this.set('canvas', evt.srcElement);
						canvas = evt.srcElement;
					}
					
					var ctx = canvas.getContext('2d');
					var origImage = this.get('origImage');
					if (!origImage) {
						origImage = {};
						this.set('origImage', origImage);
					} else {
						// replace current canvas with original
						// ctx.drawImage(origImage, 0, 0);
					}
					
					// SC.debug(ctx);
					
					ctx.fillStyle = "rgb(200,0,0)";
					ctx.fillRect(pointOnCanvas.x-2, pointOnCanvas.y-2, 5, 5);
					
					// draw the magnifier
					// ctx.drawImage(canvas, pointOnCanvas.x-10, pointOnCanvas.y-10, 21, 21, pointOnCanvas.x-20, pointOnCanvas.y-20, 41, 41);
				},
				
				mouseDown: function() {
					return YES;
				},

				mouseUp: function(evt) {
					
					var point = this.getImageCoords(evt);
					
					SC.debug( 'cliked image @ ' + point.x + '/' + point.y );
					
					OeffiNpc.networkPlanEntryController.set('x', point.x);
					OeffiNpc.networkPlanEntryController.set('y', point.y);
				},
				
				getImageCoords: function(evt) {
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
					
					return point;
				}
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