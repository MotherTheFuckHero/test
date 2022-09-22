<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="采购退货" name="first">
        <purchase-return />
      </el-tab-pane>
      <el-tab-pane label="退货单" name="second">
        <order-return ref="orderReturn" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import purchaseReturn from './compoents/purchaseReturn'
import orderReturn from './compoents/orderReturn'
export default {
  name: '采购退货',
  components: {
    purchaseReturn: purchaseReturn,
    orderReturn: orderReturn
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      if (tab.label === '退货单') {
        this.$refs.orderReturn.getReturn(10, 1)
      }
    }
  }
}
</script>

<style scoped>

</style>
