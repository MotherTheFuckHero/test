<template>
  <div class="home">
    <div style="width:65%;margin: 0 auto;padding: 20px 0;overflow-y: hidden;">
      <div style="margin: 20px 0">
        <h1>过来玩平台网店经营者相关资质信息</h1>
        <h3>根据相关法律法规要求，经营者相关资质信息公示如下:</h3>
      </div>
      <img style="width: 100%;" :src="data.license"/>
      <img style="width: 100%;" :src="data.foodQua"/>
    </div>
  </div>
</template>

<script>
import { getmerchantInfo } from '../api/merchant';
export default {
  name: 'qualifications',
  components: {
  },
  data () {
    return {
      data: {},
    };
  },
  created () {
    this.getmerchant();
  },
  methods: {
    // 商家详情
    getmerchant () {
      var merchantId = this.$router.history.current.query.merchantId
      getmerchantInfo(merchantId).then(res => {
        this.data = res.data;
      });
    },
  }
};
</script>

<style scoped>
.home{
  width: 100%;
}
</style>
