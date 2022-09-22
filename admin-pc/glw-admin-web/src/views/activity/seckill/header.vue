<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-select v-model="query.merchantId" clearable filterable size="small" placeholder="商家" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in merchantIdList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="query.productId" clearable filterable size="small" placeholder="商品" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in productIdList"
        :key="item.id"
        :label="item.title"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="query.type" clearable filterable size="small" placeholder="场次" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in TypeList"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      />
    </el-select>
    <rrOperation />
  </div>
</template>

<script>
import { header } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import { getproductLists } from '@/api/product/product'
import { getmerchantLists } from '@/api/merchant/merchant'
import { getseckillType } from '@/api/activity/seckill'
export default {
  components: { rrOperation },
  mixins: [header()],
  props: {
    permission: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      merchantIdList: [],
      TypeList: [],
      productIdList: []
    }
  },
  created() {
    const datas = {
      status: 3
    }
    getmerchantLists(datas).then(res => {
      this.merchantIdList = res.data
    })
    getproductLists(datas).then(res => {
      this.productIdList = res.data
    })
    getseckillType(datas).then(res => {
      this.TypeList = res.data
    })
  }
}
</script>
