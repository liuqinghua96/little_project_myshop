<template>
  <div>
    <div class="search">
      <icon type="search"></icon>
      <span>搜索</span>
    </div>
    <swiper class="swiper"
            :indicator-dots="true"
            autoplay
            circular
            interval="3000">
      <swiper-item v-for="(item,index) in swiperList"
                   :key="index">
        <image class="swiper_img"
               :src="item.image_src"></image>
      </swiper-item>
    </swiper>
    <div class="nav">
      <div class="nav_item"
           v-for="(item,index) in navList"
           :key="index">
        <img :src="item.image_src">
      </div>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request'
export default {
  data () {
    return {
      swiperList: [],
      navList: []
    }
  },
  methods: {
    async initData () {
      const swiperRes = await request('home/swiperdata', 'GET')
      this.swiperList = swiperRes.data.message
      const navRes = await request('home/catitems', 'GET')
      this.navList = navRes.data.message
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
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.search {
  border: 10rpx solid #e10601;
  text-align: center;
  color: #666;
}
.search icon {
  vertical-align: middle;
}
.swiper .swiper_img {
  width: 750rpx;
  height: 360rpx;
}
.nav {
  display: flex;
}
.nav .nav_item {
  flex: 1;
  text-align: center;
}
.nav .nav_item img {
  width: 100rpx;
  height: 110rpx;
  margin: 10rpx;
}
</style>
