<template>
  <div class="music-list">
    <div class="back" @click="back">
        <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">

      </div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll :data="songs"  @scroll="scroll" :probe-type="probeType" :listen-scroll="listenScroll" class="list" ref="list">
      <div class="song-list-wrapper">
        <song-list :songs="songs"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script>

import Scroll from '../../components/scroll/scroll'
import SongList from "../song-list/song-list";
import {prefixStyle} from "../../common/js/dom";

const RESERVED_HEIGHT = 64
const transform = prefixStyle('transform')

export default {
  components:{
    SongList,
    Scroll
  },
  computed:{
    bgStyle() {
      return `background-image:url(${this.bgImage})`
    }
  },
  data() {
    return {
      scrollY:0
    }
  },
  props:{
    bgImage:{
      type:String,
      default: ''
    },
    title:{
      type:String,
      default:''
    },
    songs:{
      type:Array,
      default:[]
    }
  },
  created() {
    this.probeType = 3;
    this.listenScroll = true
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT
    this.$refs.list.$el.style.top = `${this.imageHeight}px`
  },
  methods:{
    back() {
      this.$router.back()
    },
    scroll(pos) {
      this.scrollY = pos.y
    }
  },
  watch:{
    scrollY(newVal) {
      let translateY = Math.max(this.minTransalteY, newVal);
      let scale = 1;
      let zIndex = 0;
      const percent = Math.abs(newVal / this.imageHeight);
      if (newVal > 0) {
        scale = 1 + percent
        zIndex = 10
      }

      this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`;

      if (newVal < this.minTransalteY) {
        zIndex = 10
        this.$refs.bgImage.style.paddingTop = 0
        this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
      } else {
        this.$refs.bgImage.style.paddingTop = `70%`
        this.$refs.bgImage.style.height = 0
      }
      this.$refs.bgImage.style[transform] = `scale(${scale})`
      this.$refs.bgImage.style.zIndex = zIndex
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"

  .music-list
    position fixed
    z-index 100
    top 0
    left 0
    bottom 0
    background white
    .back
      position absolute
      top 20px
      left 10px
      z-index 50
      .icon-back
        display block
        padding 10px
        font-size $font-size-large-x
        color black
    .title
      position absolute
      top 20px
      z-index 40
      left 10%
      width 80%
      text-align center
      color white
      font-size $font-size-large-x
    .bg-image
      position relative
      width 100%
      height 0
      padding-top 70%
      transform-origin top
      background-size cover
    .bg-layer
      position relative
      height 100%
      background white
    .list
      position fixed
      top 0
      bottom 0
      width 100%
      .song-list-wrapper
        padding 20px 30px

</style>

