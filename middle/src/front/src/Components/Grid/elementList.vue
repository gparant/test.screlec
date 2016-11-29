<template>

  <div v-if="list" class="g-list">
    <div v-for="item in initialList" class="g-row table-row" @click="clickedItem(item)">
        <div  v-for="(col, k) in item" :class="'g-element-'+normalizeClass(k)" v-if="k != 'original'" class="g-element text">
          {{col}}
        </div>
    </div>
  </div>
</template>

<style lang="less">

</style>

<script>
  module.exports = {
    name: "g-element-list",
    props: {
      initialList: {
        type: Array,
        required: true
      }
    },
    data: () => ({}),
    computed: {
        list: function() {
          var list = [];
          for (var i = 0, l = this.initialList.length ; i < l; i++) {
              var itm = this.initialList[i];
              list.push(this.flatObject(itm));
          }
          return list;
        }
    },
    methods: {
      // Empty object / array/ string are ignored
      flatObject: function(obj) {
        var result = {};
        return (function recurse(cur, keyInResult) {
          // 1 We can only iterate over object/array.... If it is a integer / string we must stock it in the result
            if (Object(cur) !== cur && cur) {
                result[keyInResult] = cur;
            } else if (Array.isArray(cur)) {
              // 2 If it is a array, we must call ourselve and changing the key in the result. It call itselve until it get a integer or a string (@see 1)
                 for(var i=0, l=cur.length; i<l; i++)
                     recurse(cur[i], keyInResult + "[" + i + "]");
            } else {
              // 3 If it is a object, we must call ourselve and changing the key in the result. It call itselve until it get a integer or a string (@see 1)
                for (var p in cur) {
                    recurse(cur[p], keyInResult ? keyInResult+"."+p : p);
                }
            }
        })(obj, "");
      },
      normalizeClass: function(str) {
        return str.replace(/[^a-zA-Z1-9-_]/g, "");
      },
      clickedItem: function(item) {
        if (!item) {
          return;
        }
        this.$emit("clicked-item", item)
      }
    },
  };
</script>
