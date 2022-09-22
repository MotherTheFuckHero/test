<template>
  <div style="  background-color: #ffffff;">
    <div class="container">
      <router-link to="/">
        <img alt="" :src="logo" style="width: 69px;margin-bottom: -58px;"/>
      </router-link>
        <Input v-model="sreachData"  size="large" class="sreach" @on-change="input_src" :placeholder='this.$t("nav.search")'>
          <Button slot="append" icon="ios-search" style="height: 34px !important;" @click="sreach"></Button>
        </Input>
<!--      <Tag v-for="(item, index) in promotionTags" :key="index" closable  @on-close="closeTags(index)"><span @click="selectTags(index)">{{item}}</span></Tag>-->
      <i-button style="float: right;margin: -43px 120px 0 0;" icon="ios-cart" type="success" shape="circle" @click="goShopCar">{{this.$t("nav.shoppingCart")}}</i-button>
      <div style="clear:both;"></div>
    </div>
  </div>
</template>

<script>
import logos from '../images/glw-logo.png';
export default {
  name: 'Search',
  data () {
    return {
      sreachData: '',
      logo: logos,
      excludeRoutes: ['ShopCar']
      // promotionTags: ['买2免1', '领200神券', '199减100', '母婴5折抢', '充100送20']
    };
  },
  methods: {
    // closeTags (index) {
    //   this.promotionTags.splice(index, 1);
    // },
    // selectTags (index) {
    //   this.sreachData = this.promotionTags[index];
    // },
    input_src (e) {
      this.$emit('input', e.data);
    },
    sreach () {
      this.$router.push({path: '/sectorDetails'});
    },
    goShopCar () {
      this.$router.push({path: '/shopCar'});
    }
  }
};
</script>

<style scoped>
.container {
  padding: 15px 0;
  margin: 0px auto;
  width:1010px;
}
.sreach {
  width: 50%;
  margin: 10px auto;
}
</style>
