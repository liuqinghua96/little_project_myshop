<template>
  <div>
    <div class="search">
      <div class="search-content">
        <div class="search-input">
          <icon type='search'
                size='16' />
          <input @confirm='handleConfirm'
                 @input='handleInput'
                 v-model='keyword'
                 placeholder="请输入关键字" />
        </div>
        <button class="cancel"
                v-if='keyword'
                @click="deleteKeyword">取消</button>
        <div class="search-modal"
             v-show="keyword">
          <div :key='item.goods_id'
               v-for='item in resultList'
               class="search-item">{{item.goods_name}}</div>
        </div>
      </div>
    </div>
    <div class="history">
      <h4>搜索历史</h4>
      <icon @click='clearHandle'
            type='clear'
            size='16' />
    </div>
    <div class="history-list">
      <div :key='index'
           v-for='(item, index) in keywordHistory'
           class="history-item">
        <navigator :url="'/pages/searchList/main?keyword=' + item">{{item}}</navigator>
      </div>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request'
export default {
  data () {
    return {
      keyword: '',
      resultList: [],
      timer: null,
      keywordHistory: mpvue.getStorageSync('history') || []
    }
  },
  methods: {
    deleteKeyword () {
      this.keyword = ''
    },
    handleInput () {
      // 函数防抖，限制请求次数
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        let resultRes = await request('goods/qsearch', 'GET', { query: this.keyword })
        this.resultList = resultRes.data.message
      }, 1000)
    },
    handleConfirm () {
      this.keywordHistory.unshift(this.keyword)
      this.keywordHistory = [...new Set(this.keywordHistory)]
      mpvue.setStorageSync('history', this.keywordHistory)
      mpvue.navigateTo({
        url: '/pages/searchList/main?keyword=' + this.keyword
      })
    },
    clearHandle () {
      mpvue.clearStorage()
      this.keywordHistory = []
    }
  }
}
</script>
<style lang="less" scoped>
@import "./main.less";
</style>
