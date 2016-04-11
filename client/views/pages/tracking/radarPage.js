Template['radarPage'].onCreated(function() {
  var self = this;
  self.subscribe('crowdsalesAndProjectsList');
  //self.subscribe('crowdsalesList');
  //self.subscribe('projectsList');
});

function _crowdsale() {
  return CurrentData.find(CF.CurrentData.selectors.crowdsales());
}

function _project() {
  return CurrentData.find(CF.CurrentData.selectors.projects());
}

function _crowdsalePast() {
  return CurrentData.find({
    $and: [CF.CurrentData.selectors.crowdsales(), {
      'crowdsales.end_date': {
        $lt: new Date()
      }
    }]
  }, {
    sort: {
      'crowdsales.end_date': -1
    }
  })
}

function _crowdsaleUpcoming() {
  return CurrentData.find({
    $and: [CF.CurrentData.selectors.crowdsales(), {
      'crowdsales.start_date': {
        $gt: new Date()
      }
    }]
  }, {sort: {
    'crowdsales.start_date': 1
  }})
}

function _crowdsaleActive() {
  return CurrentData.find({
    $and: [CF.CurrentData.selectors.crowdsales(), {
      'crowdsales.end_date': {
        $gt: new Date()
      }
    }, {
      'crowdsales.start_date': {
        $lt: new Date()
      }
    }]
  })
}

Template['radarPage'].helpers({
  crowdsale: function() { return _crowdsale() },
  crowdsalePast: function() { return _crowdsalePast() },
  crowdsaleUpcoming: function() { return _crowdsaleUpcoming() },
  crowdsaleActive: function() { return _crowdsaleActive(); },
  project: function() { return _project() },
  nothing: function() { return !( _project().count() + _crowdsale().count() ) },

  isActiveCrowdsale: function() {
    return this.crowdsales && this.crowdsales.start_date < new Date() &&
      this.crowdsales.end_date > new Date()
  },
  isUpcomingCrowdsale: function() {
    return this.crowdsales && this.crowdsales.start_date > new Date()
  },
  isPastCrowdsale: function() {
    return this.crowdsales && this.crowdsales.end_date < new Date()
  }
});
Template['radarPage'].events({});
