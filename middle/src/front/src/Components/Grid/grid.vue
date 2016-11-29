<template>
  <div>
    <div v-show="!loading">
      <filter-list/>

      <div class="g-row table-row">
        <div v-once v-for="h in header" class="g-element text" >
            {{h}}
        </div>
      </div>
      <element-list v-if="extraData" :initial-list="extraData"   @clicked-item="clickedItem">
      </element-list>
      <element-list :initial-list="list"  @clicked-item="clickedItem"/>
      <page-list :query="initialQuery" :total="total" @change-query="fetchData"/>
    </div>
    <div v-show="loading">
      Chargement des données...
    </div>
  </div>
</template>

<style lang="less" >
/**
* Many Thanks to Vasan Subramanian
**/

@text-width: 180px;
@num-width: 80px;

// Main container: initialize the flex, direction is row
.table-row {
  display: flex;           display: -webkit-flex;
  flex-direction: row;     -webkit-flex-direction: row;
  flex-grow: 0;            -webkit-flex-grow: 0;
  flex-wrap: wrap;         -webkit-flex-wrap: wrap;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
}

// Text based cells: grow, truncate and show ellipsis when there is not enough space
.text {
  flex-grow: 1;            -webkit-flex-grow: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-right: 20px;
}

// Fix the minimum width of the leaf level cells
.text {
  width: @text-width;
}

.num {
  width: @num-width;
}

.table-row {
  border-bottom: 2px solid #e0e0e0;
  border-collapse: collapse;
  padding-top: 5px;
}

.table-row.header {
  background-color: #FFEEDB;
  font-weight: bold;
  padding-top: 8px;
  padding-bottom: 8px;
}

</style>

<script>
var DataProvider = require("../../Services/DataProvider.js");
var Vue = require("vue");
module.exports = {
    name: "g-grid",
    props: {
      header: {
        type: Array,
        required: true
      },
      initialQuery: {
          type: Object,
          required: false,
          default: function() {
            return { offset: 0,
              limit: 10 };
          }
      },
      extraData: {
        type: Array
      },
      list: {
        type: Array,
        default: () => ([])
      },
      total: {
        type: Number,
        default: () => 0
      }
    },
    data: () => ({ }),
    components: {
      "filter-list": require("./filter.vue"),
      "page-list": require("./pageList.vue"),
      "element-list": require("./elementList.vue")
    },
    methods: {
      fetchData: function(query) {
        this.$emit("change-query", query);
      },
      clickedItem: function(itm) {
        this.$emit("clicked-item", itm);
      }
    },
  };
</script>
