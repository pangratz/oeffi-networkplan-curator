/*globals OeffiNpc*/
/**
	
	A mixin which adds a `recordStatusString` method to a SC.Record, and which returns
	a readable representation of a record's status. This is quite handy during developing.

*/
OeffiNpc.RecordStatusMixin = {
	
	recordStatusString: function(){
		SC.debug('test');
		return this.statusString();
	}.property('status')
	
};