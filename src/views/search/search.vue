<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div class="shortcut-wrapper" v-show="!query">
        <div class="shortcut">
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li @click="addQuery(item.k)" class="item" v-for="item in hotKey">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
        </div>
    </div>
    <div class="search-result" v-show="query">
      <suggest :query="query"></suggest>
    </div>
  </div>
</template>

<script>
    import SearchBox from "../../components/search-box/search-box";
    import {getHotKey} from "../../api/search";
    import {ERR_OK} from "../../api/config";
    import Scroll from "../../components/scroll/scroll";
    import Suggest from "../../components/suggest/suggest";

    export default {
      components: {
        Suggest,
        Scroll,
        SearchBox},
      name: "search",
      data() {
        return {
          hotKey: [],
          query: ''
        }
      },
      methods: {
        onQueryChange(query) {
          this.query = query
        },
        _getHotKey() {
          getHotKey().then((res)=>{
            if (res.code === ERR_OK) {
              this.hotKey = res.data.hotkey.slice(0, 10)
            }
          })
        },
        addQuery(query) {
          this.$refs.searchBox.setQuery(query)
        },
      },
      created() {
        this._getHotKey()
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"

  .search
    .shortcut-wrapper
      position fixed
      top 144px
      bottom 0
      width 100%
      .shortcut
        height 100%
        overflow hidden
        .hot-key
          margin 0 20px 20px 20px
          .title
            margin-bottom 20px
            font-size $font-size-medium
            color #666666
          .item
            display inline-block
            padding 5px 10px
            margin 0 10px 10px 0
            font-size: $font-size-small
            background #666666
            color #ffffff
            opacity 0.8
            border-radius 5px
</style>
