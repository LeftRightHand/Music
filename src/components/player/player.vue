<template>
    <div class="player" v-show="playList.length>0">
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image">
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.singer"></h2>
        </div>
        <div class="middle">
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd">
                <img class="image" :src="currentSong.image">
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l"></span>
            <div class="progress-bar-wrapper">

            </div>
            <span class="time time-r"></span>
          </div>
          <div class="operators">
            <div>
              <div class="icon i-left">
                <i></i>
              </div>
              <div class="icon i-center">
                <i class="icon-prev"></i>
              </div>
              <div class="icon i-right">
                <i class="icon-next"></i>
              </div>
              <div class="icon i-right">
                <i class="icon"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mini-player" v-show="!fullScreen">
        <div class="icon">
          <img width="40" height="40" :src="currentSong.image">
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control"></div>
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </div>
</template>

<script>

  import {mapGetters, mapMutations, mapActions} from 'vuex'

    export default {
      name: "player",
      computed: {
        ...mapGetters([
          'currentIndex',
          'fullScreen',
          'playing',
          'playList',
          'currentSong'
        ])
      },
      methods: {
        back() {
          this.setFullScreen(false)
        },
        ...mapMutations({
          setFullScreen: 'SET_FULL_SCREEN'
        }),
        ...mapActions({

        })
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"

  .normal-player
    position fixed
    left 0
    right 0
    top 0
    bottom 0
    background $color-background

  .background
    position absolute
    left 0
    top 0
    width 100%
    height 100%
    z-index -1
    opacity 0.6
    filter: blur(20px)

  .mini-player
    display flex
    align-items center
    position fixed
    left 0
    bottom 0
    width 100%
    height 60px
    background white
    border 1px solid rgba(0,0,0,0.1)
  .back
    position absolute
    top 20
    left 6px
    z-index 50

  .icon-back
    display block
    padding 20px
    transform rotate(-90deg)
    color $color-text
    font-size $font-size-large-x
  .title
    width 70%
    top 20
    margin 0 auto
    line-height 60px
    text-align center
    color $color-text
    no-wrap()
    font-size: $font-size-large
  .subtitle
    line-height: 10px
    text-align: center
    font-size: $font-size-medium
    color: $color-text

  .middle
    position fixed
    width 100%
    top  100px
    bottom 170px
    white-space nowrap
    font-size 0
  .middle-l
    display inline-block
    vertical-align top
    position relative
    width 100%
    height 0
    padding-top 80%
  .cd-wrapper
    position absolute
    left 10%
    top 0
    width 80%
    height 100%
    .cd
      width 100%
      height 100%
      box-sizing border-box
      border 10px solid rgba(255, 255, 255, 0.1)
      border-radius: 50%
    .image
      position absolute
      left 0
      top 0
      width 100%
      height 100%
      border-radius 50%

  .bottom
    position absolute
    bottom 50px
    width 100%
  .dor-wrapper
    text-align center
    font-size 0
    .dot
      display inline-block
      vertical-align middle
      margin 0 4px
      width 8px
      height 8px
      border-radius 50%
      background white

</style>
