<template>
  <div class="users">
   <Header></Header>
   <Userlist v-if="isRouterAlive"></Userlist>
  </div>
</template>

<script>
import Header from './components/Header'
import Userlist from './components/Userlist'
export default {
  name: 'Users',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    Header, Userlist
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>

</style>
