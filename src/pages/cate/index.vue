<template>
  <div>
    <!-- 搜索框 -->
    <search-bar></search-bar>
  </div>
</template>

<script>
import SearchBar from '../../components/SearchBar'
export default {
  data () {
    return {
    }
  },
  components: {
    'search-bar': SearchBar
  }
}
</script>

<style scoped>
</style>
