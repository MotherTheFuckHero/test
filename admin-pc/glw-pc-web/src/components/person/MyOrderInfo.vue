<template>
    <div class="order-container">
      <div class="order-tabs">
        <div :class="{ tabActive : i === isActive }" class="tab" v-for="(v, i) in tabList" :key="i" @click="tabClick(v, i)">{{v.label}}</div>
      </div>
      <div class="order-tabBody">
        <all-order></all-order>
      </div>
    </div>
</template>

<script>
import allOrder from './components/allOrder';
export default {
  components: {
    allOrder
  },
  name: 'MyOrderInfo',
  data () {
    return {
      isActive: 0,
      tabList: [
        {
          label:this.$t("personalCenter.Myorder"),
          value: 'allOrder'
        }
      ]
    };
  },
  methods: {
    tabClick (v, i) {
      this.isActive = i;
    }
  }
};
</script>

<style scoped>
  .order-container{
    width: 100%;
    padding: 30px;
    height: 100%;
    overflow-y: scroll;
  }
  .order-tabs{
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #E0E0E0;
  }
  .tab{
    color: #666666;
    font-size: 16px;
    font-weight: 400;
    padding-bottom: 12px;
  }
  .tab:hover{
    color: #FC405E;
    cursor: pointer;
  }
  .tabActive{
    color: #FC405E;
    font-weight: 600;
    font-size: 18px;
    border-bottom: 2px solid #FC405E;
  }
  .order-tabBody{
    width: 100%;
  }
</style>
