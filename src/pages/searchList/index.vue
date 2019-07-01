<template>
  <div>
    <!-- 顶部搜索条 -->
    <div class="search">
      <div class="search-input">
        <icon type="search" size="16" color="#999"/>
        {{keyword}}
      </div>
    </div>
    <!-- tab栏 -->
    <div class="tabs">
      <div :key="index" :class="{'active': currentIndex===index, 'tab-item': true}" v-for="(item, index) in tabs">
        {{item}}
      </div>
    </div>
    <!-- 商品列表 -->
    <div class="goods_list">
      <navigator class="goods-item" :key="item.goods_id" v-for="item in listData">
        <img :src="item.goods_small_logo">
        <div class="goods-right">
          <h4>{{item.goods_name}}</h4>
          <div class="price">
            <span>￥</span> {{item.goods_price}}
          </div>
        </div>
      </navigator>
    </div>
    <!-- 没有更多数据了 -->
    <div class="more" v-if="!haveMore">没有更多数据了</div>
  </div>
</template>

<script>
import request from '../../utils/request'
export default {
  data () {
    return {
      keyword: '',
      currentIndex: 0,
      // tab栏内容显示
      tabs: ['综合', '销量', '价格'],
      // 列表数据
      listData: [],
      // 分页页码：为了记录当前显示了多少商品
      pagenum: 1,
      // 每页展示的数据条数
      pagesize: 20,
      total: 0,
      // 是否还有更多数据
      haveMore: true,
      // 当前次请求是否加载完成
      isLoadingup: true
    }
  },
  methods: {
    async getListData () {
      if (!this.haveMore) {
        return
      }
      // 节流，在上一次请求完成时才允许进行下一次请求
      if (!this.isLoadingup) {
        return
      }
      this.isLoadingup = false
      let listRes = await request('goods/search', 'GET', {
        query: this.keyword,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      })
      this.listData = [...this.listData, ...listRes.data.message.goods]
      this.total = listRes.data.message.total
      if (this.listData.length >= this.total) {
        this.haveMore = false
      }
      this.pagenum++
      this.isLoadingup = true
    }
  },
  onLoad (params) {
    this.keyword = params.keyword
    this.getListData()
  },
  onReachBottom () {
    // 触底加载更多
    this.getListData()
  }
}
</script>

<style lang="less" scoped>
  @import "./main.less";
</style>
