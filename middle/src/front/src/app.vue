<template>
  <div id="content" class="content-wrapper">
    <keep-alive>
      <router-view>
      </router-view>
    </keep-alive>
  </div>
</template>

<style lang="less">
.content-wrapper {
  position: fixed;
  left: 260px;
  width: 800px;
}
</style>

<script>

var Router = require("vue-router");
var appConfig = require("./app.vue");
var routerConfig = require("./Routers/Router.js");
var router = new Router(routerConfig);
var store = require("./Store/store.js");
module.exports = {store, router};
</script>
