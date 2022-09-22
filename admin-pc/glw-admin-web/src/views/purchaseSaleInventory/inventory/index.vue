<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="盘点下单" name="first">
        <addInventory ref="addInventory" />
      </el-tab-pane>
      <el-tab-pane label="盘点单" name="second">
        <inventoryDetail ref="inventoryDetail" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import inventoryDetail from './compoents/inventoryDetail'
import addInventory from './compoents/addInventory'
export default {
  name: '盘点管理',
  components: { inventoryDetail, addInventory },
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      if (tab.label === '盘点单') {
        this.$refs.inventoryDetail.getInventory(10, 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
