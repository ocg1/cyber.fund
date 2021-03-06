var ns = CF.CurrentData.calculatables;
var helpers = ns.lib.helpers;
var params = ns.lib.params;


var print = CF.Utils.logger.print;
ns.lib.calcs.calcCS = function calcCS(system) {
  var state = helpers._getState(system);
  var type = helpers._getType(system);
  // convert from links to 1/0
  var withTag = system.calculatable.nLinksWithTag;
  var withType = system.calculatable.nLinksWithType;

  if (!withTag) {
    console.log("CS calculation: no links calculated for %s", system._id);
    return undefined;
  }
  // see `/server/calculables/lib/params.js: Line 156`
  var linkWeights = params.linkWeightsCS(state, type);
  var scoreWeight = helpers.linksScoreWeight;
  try {
    var flags = {

              // can use withType here as well
      site: scoreWeight (withType['website'], linkWeights.site),
      community: scoreWeight(withType['forum'], linkWeights.community),
      updates: scoreWeight(withType['_update_'], linkWeights.updates),
      code: scoreWeight((withType['github'] + withType['bitbucket']), linkWeights.code),
      science: scoreWeight(withType['paper'], linkWeights.science),
      knowledge: scoreWeight(withType['wiki'], linkWeights.knoweledge),
      buy: scoreWeight(withType['exchange'], linkWeights.buy),
      hold: scoreWeight(withType['wallet'], linkWeights.hold),
      analyze: scoreWeight( withType['explorer'], linkWeights.analyze),
      earn: scoreWeight( withType['earn'], linkWeights.earn)

      // ToDo - dapp: scoreWeight(??? ,linkWeights.dapp)
    }
  } catch (e) {
    console.log(type);
    throw(e)
  }

  var basic = "stub";
  var extended = "stub"; // see https://docs.google.com/spreadsheets/d/1YkrIitYD6FS2a4IEmBlfwAuCMgMwIKgU5JMHQzsfg-k/edit#gid=755429566&vpid=A1

  var keys = params.CSkeys;

  var v = {};

  if (type && state) {
    v = params.weightsCS[type] || {};
    v = v[state] || {}
  }
  var sum = helpers.convolution(keys, v, flags);

  return {
    details: flags,
    sum: sum,
    weights: v,
    tip: type,
    state: state
  }
};
