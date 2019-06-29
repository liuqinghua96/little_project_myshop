<template>
  <!-- 分类页 -->
  <div>
    <!-- 搜索框 -->
    <search-bar></search-bar>
    <!-- 分类列表主体 -->
    <div class="content">
      <!-- 左侧列表部分 -->
      <div class="left">
        <div @click="changeTab(item.cat_id)" :class="{'menu-item': true, 'active': currentId===item.cat_id}" v-for="item in cateData" :key="item.cat_id">
          {{item.cat_name}}
        </div>
      </div>
      <!-- 右侧商标展示部分 -->
      <div class="right">
        <div class="brand-item" v-for="item in rightData" :key="item.cat_id">
          <div class="brand-title">{{item.cat_name}}</div>
          <div class="brand-list">
            <div class="brand" v-for="(info, i) in item.children" :key="i">
              <img :src="info.cat_icon">
              <p>{{info.cat_name}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from '../../components/SearchBar'
import request from '../../utils/request'
export default {
  data () {
    return {
      cateData: [],
      currentId: 1
    }
  },
  computed: {
    rightData () {
      let data = this.cateData.filter(item => {
        return item.cat_id === this.currentId
      })
      return data.length > 0 ? data[0].children : []
    }
  },
  components: {
    'search-bar': SearchBar
  },
  methods: {
    async getInitData () {
      let cateRes = await request('categories', 'GET')
      this.cateData = cateRes.data.message
    },
    changeTab (id) {
      this.currentId = id
    }
  },
  created () {
    this.getInitData()
  }
}
</script>

<style lang="less" scoped>
  @import './main.less';
</style>

