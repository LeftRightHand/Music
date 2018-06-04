<template>
    <scroll ref="suggest" class="suggest" :data="result">
      <ul class="suggest-list">
        <li class="suggest-item" v-for="item in result">
          <div class="name">
            <p class="text" v-html="getDisplayName(item)"></p>
          </div>
        </li>
      </ul>
    </scroll>
</template>

<script>
    import Scroll from "../scroll/scroll";
    import {search} from "../../api/search";
    import {ERR_OK} from "../../api/config";
    import {createSong} from "../../common/js/song";

    const TYPE_SINGER = 'singer';
    const perpage = 20

    export default {
      components: {Scroll},
      name: "suggest",
      props: {
        showSinger: {
          type: Boolean,
          default: true
        },
        query: {
          type: String,
          default: ''
        }
      },
      data() {
        return {
          page: 1,
          pullup: true,
          result: []
        }
      },
      methods: {
        refresh() {
          this.$refs.suggest.refresh()
        },
        search() {
          this.page = 1;
          this.hasMore = true;
          search(this.query, this.page, this.showSinger, perpage).then((res)=>{
            console.log(this.query);
            if (res.code === ERR_OK) {
              this.result = this.result.concat(this._genResult(res.data))
              console.log(this.result)
            }
          })
        },
        getDisplayName(item) {
          if (item.type === TYPE_SINGER) {
            return item.singername
          } else {
            return `${item.name}-${item.singer}`
          }
        },
        _genResult(data) {
          let ret = []
          if (data.zhida && data.zhida.singerid) {
            ret.push({...data.zhida, ...{type: TYPE_SINGER}})
          }
          if (data.song) {
            ret = ret.concat(this._normalizeSongs(data.song.list))
          }
          return ret
        },
        _normalizeSongs(list) {
          let ret = []
          list.forEach((musicData)=>{
            if (musicData.songid && musicData.albummid) {
              ret.push(createSong(musicData))
            }
          });
          return ret
        }
      },
      watch: {
        query(value) {
          this.search(value)
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"

  .suggest
    height 100%
    overflow hidden
    .suggest-list
      padding 0 30px
      .suggest-item
        display flex
        align-items center
        padding-bottom 20px
      .name
        flex 1
        font-size: $font-size-medium
        overflow: hidden
</style>
