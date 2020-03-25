<template>
  <div id="app">
    <fireHeader />
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <fireFooter />
  </div>
</template>
<script>
export default {
  components: {
    fireHeader: () => import('@/components/fire-header.vue'),
    fireFooter: () => import('@/components/fire-footer.vue')
  }
}
</script>
<style lang="scss">
#app {
  padding: 60px 0 200px;
  background: #fff;
  position: relative;
  min-width: 1360px;
  min-height: 100vh;
}
</style>
