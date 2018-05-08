<template>
    <div class="song-list">
      <ul>
        <li class="item" v-for="(song, index) in songs">
          <div class="content">
            <h2 class="name">{{song.name}}</h2>
            <p class="desc">{{getDesc(song)}}</p>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "song-list",
      props:{
          songs:{
            type:Array,
            default:[]
          }
      },
      methods:{
        getDesc(song) {
          return `${song.singer}·${song.album}`
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"

  .item
    display flex
    align-items center
    box-sizing border-box
    height 64px
    .content
      flex 1
      line-height 20px
      overflow hidden
      .name
        no-wrap()
      .desc
        no-wrap()
        margin-top 4px
        color gray
        font-size $font-size-small
</style>
