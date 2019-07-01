<template>
  <div>
    <!-- 地址信息的展示 -->
    <div class="cart-top"
         v-if="address">
      <div class="receive">
        <div class="name">收货人: {{address.userName}}</div>
        <div class="phonen-number">{{address.telNumber}}</div>
      </div>
      <div class="address">收货地址: {{fullAddress}}</div>
      <img src="../../../static/images/cart_border@2x.png"
           class="address-bar"
           mode="aspectFill">
    </div>
    <!-- 新增收货人信息 -->
    <div class="add_addresss"
         @click="getAddress()"
         v-else>
      <text>新增收货人</text>
      <span></span>
    </div>
    <div class="list-title">优家生活馆</div>
    <!-- 商品列表信息 -->
    <div class="ware-list">
      <div class="ware-item"
           v-for="(value, name) in cart"
           :key="value.goods_id">
        <!-- 左侧按钮checkbox -->
        <div class="choice-button" @click="isChecked(value.goods_id)">
          <icon :color="value.checked?'red':'#ccc'"
                type='success'
                size='18' />
        </div>
        <!-- 右侧商品信息 -->
        <div class="ware-content">
          <!-- 左侧图片 -->
          <navigator class='ware-image'>
            <img :src="value.goods_small_logo"
                 mode="aspectFill" />
          </navigator>
          <!-- 右侧商品信息 -->
          <div class="ware-info">
            <!-- 商品名称 -->
            <navigator class='ware-title'>
              {{value.goods_name}}
            </navigator>
            <!-- 商品价格和数量变更 -->
            <div class="ware-info-btm">
              <!-- 商品价格 -->
              <div class="ware-price">
                <span>￥</span>
                {{value.goods_price}}
              </div>
              <!-- 数量变更 -->
              <div class="calculate">
                <div class="rect">-</div>
                <div class="number">{{value.num}}</div>
                <div class="rect">+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部菜单布局 -->
    <div class="cart-total">
      <!-- 左侧CheckBox -->
      <div class="total-button">
        <icon color='#eee'
              type='success'
              size='18' />全选
      </div>
      <!-- 中间的价格 -->
      <div class="total-center">
        <div class="total-price">合计：
          <text class="colorRed">
            <text>￥</text>{{sumPrice}}
          </text>
        </div>
        <div class="price-tips">包含运费</div>
      </div>
      <!-- 右侧结算按钮 -->
      <div class="accounts">
        结算
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      address: null,
      cart: {},
      sumPrice: 0
    }
  },
  computed: {
    fullAddress () {
      if (!this.address) {
        return ''
      }
      let { provinceName, cityName, countyName, detailInfo } = this.address
      return `${provinceName} ${cityName} ${countyName} ${detailInfo}`
    }
  },
  methods: {
    getAddress () {
      let that = this
      mpvue.chooseAddress({
        success (res) {
          that.address = res
        }
      })
    },
    isChecked (gid) {
      // 实现对象的深拷贝操作
      let newCart = JSON.parse(JSON.stringify(this.cart))
      newCart[gid].checked = !newCart[gid].checked
      this.cart = newCart
      console.log(this.cart)
    }
  },
  onShow () {
    this.cart = wx.getStorageSync('mycart')
  }
}
</script>

<style lang="less" scoped>
@import "./main.less";
</style>
