<template>
    <scroll :data="data" class="listview">
      <ul>
        <li v-for="group in data" class="list-group">
          <h2 class="list-group-title">{{group.title}}</h2>
          <ul>
            <li v-for="item in group.items" class="list-group-itme">
              <img v-lazy="item.avatar" class="avatar">
              <span class="name">{{item.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </scroll>
</template>

<script>

  import Scroll from "../scroll/scroll";

    export default {
      components: {Scroll},
      name: "listview",
      props:{
        data:{
          type:Array,
          default:[]
        }
      },
      computed:{

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

</style>
