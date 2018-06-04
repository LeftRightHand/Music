<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input ref="query" v-model="query" class="box" :placeholder="placeholder">
    <i @click="clear" v-show="query" class="icon-dismiss"></i>
  </div>
</template>

<script>

  import {debounce} from "../../common/js/util";

  export default {
      name: "search-box",
      props: {
        placeholder : {
          type: String,
          default: '搜索歌曲、歌手'
        }
      },
      data() {
        return {
          query: ''
        }
      },
      methods: {
        clear() {
          this.query = ''
        },
        setQuery(query) {
          this.query = query
        }
      },
      created() {
        this.$watch('query', debounce((newQuery)=>{
          this.$emit('query', newQuery)
        }, 200))
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"

  .search-box
    display flex
    align-items center
    box-sizing border-box
    width 100%
    padding 0 6px
    height 40px
    border-radius 6px
    .icon-search
      font-size 24px
      color #000
    .box
      outline none
      border 0
      flex 1
      margin 0 5px
      &::placeholder
        color $font-size-medium
    .icon-dismiss
      font-size 16px
      color $color-dialog-background
</style>
