<template>
  <div>
    <!-- 轮播图 -->
    <swiper autoplay
            circular
            indicator-dots>
      <swiper-item v-for="(item, index) in detail.pics"
                   :key="index">
        <image :src="item.pics_big_url"
               class="slide-image"
               mode="aspectFill" />
      </swiper-item>
    </swiper>
    <!-- 商品基本信息 -->
    <div class="goods-info">
      <div class="goods-price">
        ￥ {{detail.goods_price}}
      </div>
      <div class="goods-title">
        <h4>{{detail.goods_name}}</h4>
        <div class="goods-star">
          <span class="iconfont icon-shoucang"></span>
          <p>分享</p>
          <button open-type='share'
                  class="share-btn">分享</button>
        </div>
      </div>
    </div>
    <!-- 商品的详细信息 -->
    <div class="goods-detail">
      <div class="goods-detail-title">
        商品详情
      </div>
      <div v-html='detail.goods_introduce'></div>
    </div>
    <!-- 底部菜单 -->
    <div class="footer">
      <button class="contact"></button>
      <div class="footer-left">
        <span class="iconfont icon-kefu"></span>
        <p>联系客服</p>
      </div>
      <navigator url="/pages/cart/main" open-type="switchTab" class="footer-left">
        <span class="iconfont icon-gouwuche"></span>
        <p>购物车</p>
      </navigator>
      <div class="footer-right"
           @click="addCart()">
        加入购物车
      </div>
      <div class="footer-right"
           @click="toBuy()">
        立即购买
      </div>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request'
export default {
  data () {
    return {
      goodID: 0,
      detail: {}
    }
  },
  methods: {
    async getGoodDetail () {
      let detailRes = await request('goods/detail', 'GET', { goods_id: this.goodID })
      this.detail = detailRes.data.message
    },
    toBuy () {
      this.addCart()
      mpvue.switchTab({
        url: '/pages/cart/main'
      })
    },
    addCart () {
      let cart = mpvue.getStorageSync('mycart') || {}
      if (cart[this.goodID]) {
        cart[this.goodID].num++
      } else {
        this.detail.num = 1
        cart[this.goodID] = this.detail
      }
      console.log(cart)
      mpvue.setStorageSync('mycart', cart)
      // 添加完成之后的提示
      mpvue.showToast({
        title: '添加成功',
        icon: 'success'
      })
    }
  },
  onLoad (params) {
    this.goodID = params.gid
    this.getGoodDetail()
  }
}
</script>

<style lang="less" scoped>
@import "./main.less";
</style>
