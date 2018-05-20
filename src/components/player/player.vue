<template>
    <div class="player" v-show="playList.length>0">
      <transition name="normal"
                  @enter="enter"
                  @after-enter="afterEnter"
                  @leave="leave"
                  @after-leave="afterLeave">
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
                <div class="cd" :class="cdCls">
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
                <!--<div class="icon i-left">-->
                  <!--<i class="icon-sequence"></i>-->
                <!--</div>-->
                <div class="icon i-left" :class="disableCls">
                  <i class="icon-prev"></i>
                </div>
                <div class="icon i-center" :class="disableCls">
                  <i :class="playIcon" @click="togglePlaying"></i>
                </div>
                <div class="icon i-right" :class="disableCls">
                  <i class="icon-next"></i>
                </div>
                <div class="icon i-right">
                  <i class="icon"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <transition name="mini">
        <div class="mini-player" v-show="!fullScreen" @click="open">
          <div class="icon">
            <img :class="cdCls" width="40" height="40" :src="currentSong.image">
          </div>
          <div class="text">
            <h2 class="name" v-html="currentSong.name"></h2>
            <p class="desc" v-html="currentSong.singer"></p>
          </div>
          <div class="control">
            <i @click.stop="togglePlaying" class="icon-mini" :class="miniIcon"></i>
          </div>
          <div class="control">
            <i class="icon-playlist"></i>
          </div>
        </div>
      </transition>
      <audio ref="audio" :src="currentSong.url" @play="ready"></audio>
    </div>
</template>

<script>

  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import animations from 'create-keyframe-animation'
  import {prefixStyle} from "../../common/js/dom";

  const transform = prefixStyle('transform');

    export default {
      name: "player",
      data() {
        return {
          songReady: false,
        }
      },
      computed: {
        cdCls() {
          return this.playing ? 'play' : 'play pause'
        },
        playIcon() {
          return this.playing ? 'icon-pause' : 'icon-play'
        },
        miniIcon() {
          return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
        },
        disableCls() {
          return this.songReady ? '' : 'disable'
        },
        ...mapGetters([
          'currentIndex',
          'fullScreen',
          'playing',
          'playList',
          'currentSong'
        ])
      },
      methods: {
        togglePlaying() {
          this.setPlayingState(!this.playing)
        },
        open() {
          this.setFullScreen(true)
        },
        back() {
          this.setFullScreen(false)
        },
        enter(el, done) {
          const {x, y, scale} = this._getPosAndScale();
          let animation = {
            0: {
              transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
            },
            60: {
              transform: `translate3d(0,0,0) scale(1.1)`
            },
            100: {
              transform: `translate3d(0,0,0) scale(1)`
            }
          }

          animations.registerAnimation({
            name: 'move',
            animation,
            presets: {
              duration: 400,
              easing: 'linear'
            }
          })

          animations.runAnimation(this.$refs.cdWrapper, 'move', done)
        },
        afterEnter() {
          animations.unregisterAnimation('move');
          this.$refs.cdWrapper.style.animation = ''
        },
        leave(el, done) {
          this.$refs.cdWrapper.style.transition = 'all 0.4s';
          const {x, y, scale} = this._getPosAndScale();
          this.$refs.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`;
          this.$refs.cdWrapper.addEventListener('transitionend', done)
        },
        afterLeave() {
          this.$refs.cdWrapper.style.transition = '';
          this.$refs.cdWrapper.style[transform] = ''
        },
        ready() {

        },
        _getPosAndScale() {
          const targetWidth = 40;
          const paddingLeft = 40;
          const paddingBottom = 30;
          const paddingTop = 80;
          const width = window.innerWidth * 0.8;
          const scale = targetWidth / width;
          const x = -(window.innerWidth / 2 - paddingLeft);
          const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
          return {
            x,
            y,
            scale
          }
        },
        ...mapMutations({
          setFullScreen: 'SET_FULL_SCREEN',
          setPlayingState:'SET_PLAYING_STATE'
        }),
        ...mapActions({

        }),
      },
      watch: {
        playing(newPlaying) {
          const audio = this.$refs.audio;
          this.$nextTick(()=>{
            newPlaying ? audio.play() : audio.pause()
          })
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"

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
    padding-bottom 10px
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
      &.play
        animation rotate 20s linear infinite
      &.pause
        animation-play-state paused
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
    .operators
      display flex
      align-items center
      justify-content center
      margin-left auto
      margin-right auto
      .icon
        flex 1
        color: white
        display inline-block
        margin-left 10px
        margin-right 10px
        i
         font-size 35px
      .i-left
        text-align right
      .i-center
        text-align center
      .i-right
        text-align left

  &.normal-enter-active, &.normal-leave-active
    transition: all 0.4s
    .top, .bottom
      transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
  &.normal-enter, &.normal-leave-to
    opacity: 0
    .top
      transform: translate3d(0, -100px, 0)
    .bottom
      transform: translate3d(0, 100px, 0)

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
    .icon
      flex 0 0 40px
      width 40px
      padding 0 10px 0 20px
      img
        border-radius 50%
        &.play
          animation: rotate 10s linear infinite
        &.pause
          animation-play-state: paused
    .text
      display flex
      flex-direction column
      justify-content center
      flex 1
      line-height 20px
      overflow hidden
      .name
        margin-bottom 2px
        no-wrap()
        font-size: $font-size-medium
      .desc
        no-wrap()
        font-size: $font-size-small
    .control
      flex 0 0 30px
      width 30px
      padding 0 10px
      .icon-play-mini, .icon-pause-mini, .icon-playlist
        font-size: 30px

  @keyframes rotate
    0%
      transform rotate(0)
    100%
      transform rotate(360deg)

</style>
