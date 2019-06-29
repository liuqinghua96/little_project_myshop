<template>
  <div class="search">
    <navigator url="/pages/search/main">
      <icon type="search"></icon>
      <span>搜索</span>
    </navigator>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
// 搜索框
.search {
  border: 10rpx solid #e10601;
  text-align: center;
  color: #666;
  icon {
    vertical-align: middle;
  }
}
</style>

