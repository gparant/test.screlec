var namespace = "user/list/";
var DataProvider = require("_services/DataProvider.js");
//new DataProvider({url: "user/list", isRest: false});
module.exports = function(config) {

  var dataProvider = new DataProvider(config);

  return {
    state: {
    },
    actions: {
      [namespace + "get"]: function (context, payload){
        // Should return a promise
      },
    }
  };
}
