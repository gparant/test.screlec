module.exports = {
    data: () => (
      {initialQuery: {limit: 10, offset: 0, dataList: []}}
    ),
    computed: {
      list: function()  {
          var res = [];
          for (var i =0,
            list = this.dataList,
             l = list.length, itm = list[i];
             i < l;
             i++, itm= list[i]) {
            res.push(itm.dataForList);
          }
          return res;
      }
    },
    methods: {
      changeQueryHandler: function(q) {
        // Must be implemented by component using this mixin
        this.initialQuery = q;
      }
    },
    watch: {
      "$route.query": function(nv, ov) {
        if (typeof(nv) === "object" && Object.keys(nv).length !== 0) {
            this.changeQueryHandler(this.$route.query).then(() => {
              this.initialQuery = this.$route.query;
            });
        }
      }
    },
    created: function() {
      if (typeof(this.$route.query) === "object" && Object.keys(this.$route.query).length !== 0) {
        //this.initialQuery = this.$route.query;
        this.changeQueryHandler(this.$route.query);
      }
      else {
        this.$router.push({query: this.initialQuery});
      }
    }
}
