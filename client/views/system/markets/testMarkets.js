import {CurrentData} from '/imports/api/collections'
import {_session} from '/imports/api/client/utils/base'
const ROWS_SHORT = 20
const markets = require("/imports/api/vwap/marketsList").xchangeMarkets
const fiats = require("/imports/api/vwap/marketsList").fiats
const flatten = require("/imports/api/elastic/traverseAggregations").flatten
const collections = require("/imports/api/vwap/collections")
const selectors = require("/imports/api/vwap/selectors")
const feedsCurrent = collections.feedsCurrent
const feedsVwapCurrent = collections.feedsVwapCurrent


import {default as weightedPriceNative} from '/imports/api/vwap/weightedPriceNative'



// return name of currently picked fiat. as it s given by xchange
// todo: move to imports
function _fiat(){
  const fiat = _session.get('fiat');
  if (fiat==='') return 'Bitcoin';
  return fiat;
}

// return token of currently picked fiat. see `fiatSelector` template
// todo: move to imports
function _fiatToken(){
  const fiat = _session.get('fiat');
  if (fiat==="") return `BTC`;
  //todo exploit chg
  if (fiat==="Euro") return 'EUR';
  if (fiat==="US Dollar") return 'USD';
}

Template['testMarkets'].helpers({
  rows: function(){
    const system = this.system;
    const selector = selectors.pairsById
    const count = feedsCurrent.find(selector).count();

    let ret = feedsCurrent.find(selector, {
      sort: {"volume.btc": -1},
      limit: Template.instance().showAll.get() ? 1000 : ROWS_SHORT
    })
    return ret;
  },
  marketUrlByApiUrl: (apiUrl) => {
    const market = markets[apiUrl];
    return market && market.url || ''
  },
  marketNameByApiUrl: (apiUrl) => {
    const market = markets[apiUrl];
    return market && market.name || apiUrl
  },
  tokenById: function(_id) {
    const sys = CurrentData.findOne({_id: _id}, {fields: {token: 1}});
    return sys && sys.token && sys.token.symbol || _id
  },
  pricePairFiat: function(){
    let ret = this.last && this.last.btc / weightedPriceNative("Bitcoin", _fiat());
    if (Template.instance().data.system !== this.quote)
      ret /= weightedPriceNative(this.base, this.quote);
    return ret;

  },
  volumePairFiat: function() {
    return this.volume.btc/weightedPriceNative("Bitcoin", _fiat());
  },
  updateTime: function (timestamp){
    return moment(timestamp).fromNow(true)
  }
})
