<template>
  <div>
    <!-- 搜索框 -->
    <search-bar></search-bar>
    <!-- 轮播图 -->
    <swiper class="swiper"
            :indicator-dots="true"
            autoplay
            circular
            interval="3000">
      <swiper-item v-for="(item,index) in swiperData"
                   :key="index">
        <image class="swiper_img"
               :src="item.image_src"></image>
      </swiper-item>
    </swiper>
    <!-- 导航菜单栏 -->
    <div class="nav">
      <div class="nav_item"
           v-for="(item,index) in navData"
           :key="index">
        <img :src="item.image_src">
      </div>
    </div>
    <!-- 商品列表栏floorData -->
    <div class="floor"
         v-for="(item, index0) in floorData"
         :key="index0">
      <div class="floor_title">
        <img class="floor_title_img"
             :src="item.floor_title.image_src">
      </div>
      <div class="floor_content">
        <div class="floor_content_item left">
          <img class="left_pic"
               :src="item.leftData.image_src"
               alt="">
        </div>
        <div class="floor_content_item middle">
          <img class="other_pic"
               :key="index1"
               v-for="(item_middle, index1) in item.middleData"
               :src="item_middle.image_src"
               alt="">
        </div>
        <div class="floor_content_item right">
          <img class="other_pic"
               :key="index2"
               v-for="(item_right, index2) in item.rightData"
               :src="item_right.image_src"
               alt="">
        </div>
      </div>
    </div>
    <!-- 返回顶部按钮 -->
    <div class="returnTop"
         v-show="isShow"
         @click="returnTop">
      ︽
      <p>top</p>
    </div>
  </div>
</template>

<script>
import SearchBar from '../../components/SearchBar'
import request from '../../utils/request'
export default {
  data () {
    return {
      swiperData: [],
      navData: [],
      floorData: [],
      isShow: false
    }
  },
  components: {
    'search-bar': SearchBar
  },
  methods: {
    async initData () {
      const swiperRes = await request('home/swiperdata', 'GET')
      this.swiperData = swiperRes.data.message
      const navRes = await request('home/catitems', 'GET')
      this.navData = navRes.data.message
      const floorRes = await request('home/floordata', 'GET')
      let floorInitData = floorRes.data.message
      this.floorData = floorInitData.map(item => {
        item.leftData = item.product_list[0]
        item.middleData = item.product_list.slice(1, 3)
        item.rightData = item.product_list.slice(3)
        return item
      })
    },
    returnTop () {
      mpvue.pageScrollTo({
        scrollTop: 0
      })
    }
  },
  async created () {
    // 原始request请求
    /* mpvue.request({
      url: 'https://www.ehomespace.com/api/public/v1/home/swiperdata',
      method: 'GET',
      success: (res) => {
        this.swiperList = res.data.message
      }
    }) */

    // 通过promise方式.then的request请求
    // request('home/swiperdata', 'GET').then(res => { this.swiperList = res.data.message })

    // 通过async和await方式处理的request请求
    // const swiperRes = await request('home/swiperdata', 'GET')
    // this.swiperList = swiperRes.data.message
    // const navRes = await request('home/catitems', 'GET')
    // this.navList = navRes.data.message

    // 下面将数据初始化处理的代码放到methods中
    this.initData()
  },
  onPullDownRefresh () {
    this.initData()
  },
  onPageScroll (params) {
    this.isShow = params.scrollTop > 100
  }
}
</script>

<style lang="less" scoped>
@import "./main.less";
</style>
