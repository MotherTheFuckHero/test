<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="采购下单" name="first">
        <purchase-order />
      </el-tab-pane>
      <el-tab-pane label="采购单" name="third">
        <order-review ref="orderReview" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import purchaseOrder from './compoents/purchaseOrder'
import orderReview from './compoents/orderReview'
export default {
  name: '采购进货',
  components: {
    purchaseOrder: purchaseOrder,
    orderReview: orderReview
  },
  data() {
    return {
      activeName: 'first'
    }
  },

  methods: {
    handleClick(tab, event) {
      if (tab.label === '采购单') {
        this.$refs.orderReview.getReview(10, 1)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
  .el-form-item{
    display: inline-block;
  }
</style>
