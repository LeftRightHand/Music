<template>
    <div class="m-header">
      <h1 class="text">Sup Music</h1>
    </div>
</template>

<script>
    export default {
        name: "m-header"
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/variable.styl"
.m-header
  position: relative
  height: 50px
  vertical-align: center
  .text
    display: inline-block
    line-height: 50px
    margin-left: 20px
    font-size: 26px
    color: $color-background
</style>
