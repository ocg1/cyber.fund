import hourly from '/imports/api/server/metrics/cmc-hourly'
import daily from '/imports/api/server/metrics/cmc-daily'
import {Meteor} from 'meteor/meteor'

SyncedCron.add({
	name: "averaging 5m cmc data to hourly",
	schedule: function(parser) {
		return parser.cron("1 * * * *", false);
	},
	job: function() {
		hourly.writeHourlyDataFrom5mData(new Date(new Date().valueOf() - 1000 * 60 * 20 ))
	}
})
SyncedCron.add({
	name: "averaging hourly cmc data to daily",
	schedule: function(parser) {
		return parser.cron("5 0 * * *", false);
	},
	job: function() {
		daily.writeDailyDataFromHourlyData(new Date(new Date().valueOf() - 1000 * 60 * 60 * 9 ))
	}
})

/* to remove soon.
Meteor.startup(function(){ //only to be run once.
	const timestamp_min = 1488026402 * 1000
	const hour = 3600 * 1000
	let date_iterator = new Date().valueOf() - hour
	hourly.writeHourlyDataFrom5mData(new Date(date_iterator))
	let interval = Meteor.setInterval(function(){
		date_iterator -= hour;
		if (date_iterator > timestamp_min)
			hourly.writeHourlyDataFrom5mData(new Date(date_iterator))
		else {
			Meteor.clearInterval(interval)
			console.log("DONE WITH HOURLIES")
		}
	}, 3*60000)
})
*/
