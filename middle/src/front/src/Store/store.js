
var Vue = require("vue");
var Vuex = require("vuex");
Vue.use(Vuex);
var store = new Vuex.Store({
  modules: {
    userList: require("./Modules/User/userList.js")({url: "user/list", isRest: false}),
    user: require("./Modules/User/user.js")({url: "user/", isRest: true}),
  }
});

module.exports = store;
