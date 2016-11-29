<template>
  <div v-if="lastPage">
    <div v-on:click="clickPage" ref="list">
      <span v-for="page in lastPage" :data-page="page" :class="page == currentPage ? 'g-active' : ''">{{page}}</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .g-active {
    color:red;
    font-weight: bold;
  }
</style>

<script>
//<span :v-for="page in lastPage" :data-page="page">{{page}}</span>
function getParent(el, limit, selector) {
  if(el.matches && el.matches(selector) ||
    el.webkitMatchesSelector && el.webkitMatchesSelector(selector) ||
    el.mozMatchesSelector && el.mozMatchesSelector(selector) ||
    el.msMatchesSelector && el.msMatchesSelector(selector)) {
    return el;
  }
  if(el === limit) {
    return null;
  }
  if(element.parentNode) {
    return getParent(el.parentNode, limit, selector);
  }
  return null; // not the element nor its parents
}

  module.exports = {
    name: "g-page-list",
    props: {
      query: {
        type: Object,
        required: true
      },
      total: {
        type: Number,
        required: true
      }
    },
    data: () => ({}),
    computed: {
      currentOffset: function() {
        if (typeof(this.query) === "object"  && typeof(this.query.offset) !== "undefined") {
          var offset = parseInt(this.query.offset);
          return offset < 0  ? 0 : offset;
        }
        return 0;
      },
      currentLimit: function() {
        if (typeof(this.query) === "object"  && typeof(this.query.limit) !== "undefined") {
          var limit = parseInt(this.query.limit);
          return limit < 0  ? 0 : limit;
        }
        return 0;
      },
      currentPage: function() {
          return Math.floor(this.currentOffset / this.currentLimit) + 1; // Pagination start at 1
      },
      lastPage: function() {
        return Math.floor(this.total / this.currentLimit) + 1;// Pagination start at 1
      }
    },
    methods: {
      clickPage: function(e) {
        var el = getParent(e.target, this.$refs.list, "[data-page]");
        if (el) {
          e.preventDefault();
          e.stopPropagation();
          var page = el.dataset ? el.dataset.page : el.getAttribute("data-page");
          var offset = (page - 1) * this.query.limit;
          this.$emit("change-query", Object.assign({}, this.query, {offset}));
        }
      }
    },
  };
</script>
