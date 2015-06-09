var helpers = {
  eq: function
    (value1, value2) {
    return value1 === value2;
  },
  neq: function (v1, v2) {
    return v1 !== v2;
  },
  gt: function (value1, value2) {
    return value1 > value2;
  },
  lt: function (value1, value2) {
    return value1 < value2;
  },
  lte: function (value1, value2) {
    return value1 <= value2;
  },
  gte: function (value1, value2) {
    return value1 >= value2;
  },
  and: function (value1, value2) {
    return value1 && value2;
  },
  contains: function (list, value) {
    return _.contains(list, value);
  },
  slice: function (list, start, end) {
    list = list || [];

    return list.slice(start, end);
  },
  keyValue: function (context) {
    return _.map(context, function (value, key) {
      return {
        key: key,
        value: value
      };
    });
  },
  sum: function (value1, value2) {
    return value1 + value2;
  },

  session: function (key) {
    return Session.get(key);
  },

  concat: function (value1, value2) {
    return value1.toString() + value2.toString();
  },
  values_of: function (arr) {
    if (typeof arr == "object") {
      return array = $.map(arr, function (value, index) {
        return [value];
      });
    }
    return arr;
  },

  log: function (value) {
    console.log(value);
  },

  absoluteUrl: function () {
    return Meteor.absoluteUrl();
  },

  randomOf: function (from, to) {
    return from + Math.floor(Math.random() * (to - from + 1));
  },
  readableNumbers: function (input) {
    while (/(\d+)(\d{3})/.test(input.toString())) {
      input = input.toString().replace(/(\d+)(\d{3})/, "$1" + "," + "$2");
    }
    return input;
  }
};

_.each(helpers, function (helper, key) {
  UI.registerHelper(key, helper);
});
/**
 * Created by angelo on 6/9/15.
 */
