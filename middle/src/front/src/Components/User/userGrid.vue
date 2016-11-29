<template>
  <div>
    <div>
      <div>
        Utilisateurs
      </div>
    </div>
    <g-grid :list="list" :total="total" :initialQuery="initialQuery" @change-query="updateRoute" :header.once="header"  @clicked-item="selectUser"/>
  </div>
</template>

<style lang="less">
</style>

<script>
// This mixin regroup basic functionnality of the grid:
var mixin = require("_components/Grid/mixin.js");
  module.exports = {
    mixins: [mixin],
    props: {
    },
    data: () => ( {
        header: ["Name", "Firstname", "Email"],
        dataList: [],
        total: 0,
        initialQuery: {limit: 10, offset:0}
    }),
    computed: {

      newUserList: function() {
        // Should return the value contained in the store's module
      },
      list: function()  {
        // Should return the list displayed
      }
    },
    components: {
      "g-grid":  require("_components/Grid/grid.vue")
    },
    methods: {
      selectUser: function(itm) {
        // Triggered when a item in the list is clicked
      },
      // Triggered on route change (Cf mixin )
      changeQueryHandler: function(query) {
      // Triggered when a child is trying to change the query (@see the mixin's watcher)
      },
      updateRoute: function(query) {
        // Triggered when a child is trying to change the query
      },
    }
  };
</script>
