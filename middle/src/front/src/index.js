var ScrelecTemplate = require("ScrelecTemplate");
var CompanyService = require("CompanyService");
var ajax = require("axios");
var Vue = require("vue");
var Router = require("vue-router");
Vue.use(Router);
var appConfig = require("./app.vue");
var routerConfig = require("./Routers/Router.js");
var router = new Router(routerConfig);
// TODO set loader
var template = null;
var user = null;
/**
Expected user :

[
          "rights" => ["CRM", "INVOICE", "DEMANDE", "CONTRACT"],
          "notificationList" => [
            ["company_id" => "foo-company-id", "content" => "FooContent", "app_id" => "foo-app"],
            ["company_id" => "baz-company-id", "content" => "BazContent", "app_id" => "baz-app"],
            ["company_id" => "nurf-company-id", "content" => "NurfContent", "app_id" => "nurf-app"],
            ["company_id" => "xorf-company-id", "content" => "XorfContent", "app_id" => "xorf-app"],
            ["company_id" => "gyn-company-id", "content" => "GynContent", "app_id" => "gyn-app"],
            ["company_id" => "foo-company-id", "content" => "fikngsjn", "app_id" => "foo-app"]
          ],
          "firstname" => "FooName",
          "name" => "FooFirstname",
          "email" => "Foo@thecodingmachine.com"
        ]
**/
/**
Expected company :
              "id" => $id,
              "name" => "Foo"
**/
ajax.get("/user/current/").then(function(d) {
  user = d.data;
  //menuSelector, headerSelector, companyService, user
  //template = new ScrelecTemplate.create("#menu", "#header", new CompanyService("/company"), user);
});

appConfig.router = router;
var app = new Vue(appConfig).$mount("#content");
