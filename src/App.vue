<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view/>
    </keep-alive>

  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from './components/header/m-header'
  import Tab from "./components/tab/tab";

export default {
  components: {
    Tab,
    MHeader,
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
