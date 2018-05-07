<template>
  <div class="music-list">
    <div class="back" @click="back">
        <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStype" ref="bgImage">
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
    bgStype() {
      return `backgroup-image(${this.bgImage})`
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
  
</style>

