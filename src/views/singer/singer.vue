<template>
  <div class="singer">
    <list-view @select="selectSinger" :data="singers"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>

  import {getSingerList} from "../../api/singer";
  import {ERR_OK} from "../../api/config";
  import Singer from "../../common/js/singer";
  import ListView from "../../components/listview/listview";
  import {mapMutations} from 'vuex'

  const HOT_SINGER_LEN = 10;
  const HOT_NAME = '热门';

  export default {
    components: {ListView},
    name: "singer",
      data(){
          return {
            singers:[]
          }
      },
      created() {
        this._getSingerList()
      },
      methods: {
        selectSinger(singer) {
          this.$router.push({
            path:`/singer/${singer.id}`
          })
          this.setSinger(singer)
        },
        _getSingerList() {
          getSingerList().then((res)=>{
            if (res.code === ERR_OK) {
              this.singers = this._normalizeSinger(res.data.list);
            }
          })
        },
        _normalizeSinger(list) {
          let map = {
            hot:{
              title:HOT_NAME,
              items:[]
            }
          };
          list.forEach((item, index)=>{
            if (index < HOT_SINGER_LEN) {
              map.hot.items.push(new Singer({
                name:item.Fsinger_name,
                mid:item.Fsinger_mid,
                id:item.Fsinger_id
              }))
            }
            const key = item.Findex;
            if (!map[key]) {
              map[key] = {
                title:key,
                items:[]
              }
            }
            map[key].items.push(new Singer({
              name:item.Fsinger_name,
              mid:item.Fsinger_mid,
              id:item.Fsinger_id
            }))
          });
          let ret =[];
          let hot =[];
          for (let key in map) {
            let val = map[key];
            if (val.title.match(/[a-zA-Z]/)) {
              ret.push(val)
            } else if (val.title === HOT_NAME) {
              hot.push(val)
            }
          }
          ret.sort((a,b)=>{
            return a.title.charCodeAt(0)-b.title.charCodeAt(0)
          });
          console.log(hot)
          return hot.concat(ret)
        },
        ...mapMutations({
          setSinger:'SET_SINGER'
        })
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .singer
      position fixed
      top 94px
      bottom 0
      width 100%
</style>
