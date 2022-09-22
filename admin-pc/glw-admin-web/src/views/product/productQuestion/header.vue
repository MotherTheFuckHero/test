<template>
  <div
    v-if="crud.props.searchToggle"
  >

    <el-select v-model="query.productId" clearable filterable size="small" placeholder="商品" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in productIdList"
        :key="item.id"
        :label="item.title"
        :value="item.id"
      />
    </el-select>
    <rrOperation />
  </div>
</template>

<script>
import { header } from '@crud/crud'
import { getproductLists } from '@/api/product/product'
import rrOperation from '@crud/RR.operation'
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
      productIdList: []
    }
  },
  created() {
    const data = {
      status: 3
    }
    getproductLists(data).then(res => {
      this.productIdList = res.data
    })
  }
}
</script>
