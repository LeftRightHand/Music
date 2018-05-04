<template>
    <div ref="wrapper">
      <slot></slot>
    </div>
</template>

<script>
  import BScorll from 'better-scroll'

    export default {
      name: "scroll",
      props:{
        probeType:{
          type:Number,
          default:1
        },
        click:{
          type:Boolean,
          default:true
        },
        listenScroll:{
          type:Boolean,
          default:false
        },
        data:{
          type:Array,
          default:null
        },
        pullup: {
          type: Boolean,
          default: false
        },
        beforeScroll: {
          type: Boolean,
          default: false
        },
        refreshDelay: {
          type: Number,
          default: 20
        }
      },
      mounted() {
        setTimeout(()=>{
          this._initScroll()
        }, 20)
      },
      methods: {
        _initScroll() {
          if (!this.$refs.wrapper) {
            return
          }
          this.scroll = new BScorll(this.$refs.wrapper, {
            probeType:this.probeType,
            click:this.click
          })
        },
        disable() {
          this.scroll && this.scroll.disable()
        },
        enable() {
          this.scroll && this.scroll.enable()
        },
        refresh() {
          this.scroll && this.scroll.refresh()
        },
      },
      watch:{
        data() {
          setTimeout(()=>{
            this.refresh()
          }, this.refreshDelay)
        }
      }
    }
</script>

<style scoped>

</style>
