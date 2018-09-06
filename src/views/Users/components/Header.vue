<template>
  <div class="wrapper">
    <div class="inner_wrapper">
      <div class="logo">User-Management-System</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.wrapper
  border-bottom 1px solid #e1e1e1
  .inner_wrapper
    width 1140px
    height 50px
    line-height 50px
    margin 0 auto
    .logo
      color #409eff
      font-size 24px
</style>
