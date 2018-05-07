<template>
    <scroll :data="data"
            @scroll="scroll"
            class="listview"
            ref="listview"
            :listen-scroll="listenScroll"
            :probe-type="probeType">
      <ul>
        <li v-for="group in data" class="list-group" ref="listGroup">
          <h2 class="list-group-title">{{group.title}}</h2>
          <ul>
            <li @click="selectItem(item)" v-for="item in group.items" class="list-group-itme">
              <img v-lazy="item.avatar" class="avatar">
              <span class="name">{{item.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove" @touchend.stop>
        <ul>
          <li v-for="(item, index) in shortcutList" :data-index="index" class="item" :class="{'current':currentIndex===index}">
            {{item}}
          </li>
        </ul>
      </div>
      <div class="list-fixed" ref="fixed" v-show="fixedTitle">
        <div class="fixed-title">{{fixedTitle}}</div>
      </div>
      <div v-show="!data.length" class="loading-container">
        <loading></loading>
      </div>
    </scroll>
</template>

<script>

  import Scroll from "../scroll/scroll";
  import {getData} from "../../common/js/dom";
  import Loading from "../loading/loading";

  const TILTLE_HEIGHT = 30
  const AHCHOR_HEIGHT = 18

    export default {
      components: {
        Loading,
        Scroll,
      },
      name: "listview",
      props:{
        data:{
          type:Array,
          default:[]
        }
      },
      data(){
        return {
          scrollY: -1,
          currentIndex:0,
          diff:-1
        }
      },
      created() {
        this.probeType = 3;
        this.touch = {};
        this.listHeight = [];
        this.listenScroll = true
      },
      watch:{
        data() {
          setTimeout(()=>{
            this._calculateHeight()
          },20)
        },
        scrollY(newY) {
          const listHeight = this.listHeight;
          if (newY > 0) {
            this.currentIndex = 0
            return
          }
          for (let i = 0; i < listHeight.length - 1; i++) {
            let heigth1 = listHeight[i];
            let height2 = listHeight[i+1];
            if (-newY >= heigth1 && -newY < height2) {
              this.currentIndex = i;
              this.diff = height2 + newY;
              return
            }
          }
          this.currentIndex = listHeight.length
        },
        diff(newVal) {
          let fixedTop = (newVal > 0 && newVal < TILTLE_HEIGHT) ? newVal - TILTLE_HEIGHT : 0
          if (this.fixedTop === fixedTop) {
            return
          }
          this.fixedTop = fixedTop
          this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
        }
      },
      computed:{
        shortcutList() {
          return this.data.map((group)=>{
            return group.title.substr(0,1)
          })
        },
        fixedTitle() {
          if (this.scrollY > 0) {
            return ''
          }
          return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ""
        }
      },
      methods:{
        selectItem(item) {
          this.$emit('select', item)
        },
        onShortcutTouchStart(e) {
          let anchorIndex = getData(e.target, 'index');
          let firstTouch = e.touches[0];
          this.touch.y1 = firstTouch.pageY;
          this.touch.anchorIndex = anchorIndex;
          this._scrollTo(anchorIndex)
        },
        onShortcutTouchMove(e) {
          let firstTouch = e.touches[0];
          this.touch.y2 = firstTouch.pageY;
          let delta = (this.touch.y2 - this.touch.y1) / AHCHOR_HEIGHT | 0
          let anchorIndex = parseInt(this.touch.anchorIndex) + delta;
          this._scrollTo(anchorIndex)
        },
        refresh() {
          this.$refs.listview.refresh()
        },
        scroll(pos) {
          this.scrollY = pos.y
        },
        _scrollTo(index) {
          // if (!index && index !== 0) {
          //   return
          // }
          // if (index < 0) {
          //   index = 0
          // } else if (index > this.listHeight.length - 2) {
          //   index = this.listHeight.length - 2
          // }
          this.scrollY = -this.listHeight[index];
          this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
        },
        _calculateHeight() {
          this.listHeight = [];
          const list = this.$refs.listGroup;
          let height = 0;
          this.listHeight.push(height);
          for (let i = 0; i < list.length; i++) {
            let item = list[i];
            height += item.clientHeight;
            this.listHeight.push(height);
            console.log(height)
          }
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"

  .listview
    position relative
    width 100%
    height 100%
    overflow hidden
    .list-group
      padding-bottom 30px
      .list-group-title
        height 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-itme
        display flex
        align-items center
        padding 20px 0 0 30px
        .avatar
          width 50px
          height 50px
          border-radius 50%
        .name
          margin-left 20px
    .list-shortcut
      position absolute
      z-index 30
      right 0
      top 50%
      transform translateY(-50%)
      width:20px
      padding 2px 0
      text-align center
      background $color-background-d
      font-family Helvetica
      .item
        padding 3px
        line-height 1
        color $color-text-l
        font-size $font-size-small
        &.current
          color $color-background
    .list-fixed
      position absolute
      top 0
      left 0
      width 100%
      .fixed-title
        height 30px
        line-height 30px
        padding-left 20px
        font-size $font-size-small
        color $color-text-l
        background $color-highlight-background
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
