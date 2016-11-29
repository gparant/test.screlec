
module.exports = {
  routes:  [
    {
      path: "user/list",
      name: "user/list",
      component: require("_components/User/userGrid.vue"),
    },
    {
      path: "user",
      name: "user",
      component: require("_components/User/user.vue"),
    }
  ]
};
