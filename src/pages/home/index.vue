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
  created () {
    /* mpvue.request({
      url: 'https://www.ehomespace.com/api/public/v1/home/swiperdata',
      method: 'GET',
      success: (res) => {
        this.swiperList = res.data.message
      }
    }) */
    request('home/swiperdata', 'GET').then(res => { this.swiperList = res.data.message })
    /* mpvue.request({
      url: 'https://www.ehomespace.com/api/public/v1/home/catitems',
      method: 'GET',
      success: (res) => {
        this.navList = res.data.message
      }
    }) */
    request('home/catitems', 'GET').then(res => { this.navList = res.data.message })
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
