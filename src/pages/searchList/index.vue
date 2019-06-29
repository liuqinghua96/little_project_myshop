<template>
  <div>
    {{keyword}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      keyword: ''
    }
  },
  onLoad (params) {
    this.keyword = params.keyword
  }
}
</script>
