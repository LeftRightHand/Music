<template>
  <div class="music-list">
    <div class="back">
        <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">

      </div>
    </div>
    <scroll></scroll>
  </div>
</template>

<script>

import Scroll from '../../components/scroll/scroll'

export default {
  components:{
      Scroll
  },
  computed:{
    bgStyle() {
      return `background-image:url(${this.bgImage})`
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
    .title
      position absolute
      top 10px
      z-index 40
      left 10%
      width 80%
      text-align center
    .bg-image
      position relative
      width 100%
      height 0
      padding-top 70%
      transform-origin top
      background-size cover
</style>

