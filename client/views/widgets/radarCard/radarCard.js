Template['radarCard'].rendered = function () {
  
};

Template['radarCard'].helpers({
  'daysLeft': function (datestring, format) {
    console.log(moment(datestring, format));
    console.log(datestring);
    console.log(moment());
    console.log();
    console.log();
    console.log();
    return  moment(datestring, format).diff( moment() , 'days');
  },
  daysPassed: function (datestring, format) {

  }
});

Template['radarCard'].events({
  'click .bar': function (e, t) {
    
  }
});