var namespace = "user/";
var DataProvider = require("_services/DataProvider.js");
//new DataProvider({url: "user/list", isRest: false});
module.exports = function(config) {

  var dataProvider = new DataProvider(config);
  var getFuncName = (n) => (namespace + n);
  return {
    state: {
      newElementList: [] // You should add the submited data here
    },
    mutations: {
    },
    actions: {
      [namespace + "get"]: function (context, payload){
        // Should return a promise With data
        // Helpers can be found in ./Services
      },
      [namespace + "put"]: function(context, payload) {
        // Should submit to the backend and return a promise
      }
    }
  };
}
