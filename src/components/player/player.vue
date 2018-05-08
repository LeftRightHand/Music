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
        <div class="middle-l" ref="middleL">
          <div class="cd-wrapper" ref="cdWrapper">
            <div class="cd">
              <img class="image" :src="currentSong.image">
            </div>
          </div>
        </div>
      </div>
      <div class="mini-player" v-show="!fullScreen"></div>
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
    background black

  .back
    position absolute
    top 20
    left 6px
    z-index 50

  .icon-back
    display block
    padding 10px
    transform rotate(-90deg)
    color $color-text
    font-size $font-size-large-x
  .title
    width 70%
    margin 0 auto
    line-height 40px
    text-align center
    color $color-text
    no-wrap()
    font-size: $font-size-large
  .subtitle
    line-height: 20px
    text-align: center
    font-size: $font-size-medium
    color: $color-text
</style>
