<template>
  <div
    v-if="crud.props.searchToggle"
  >

    <el-input v-model="query.tableName" clearable size="small" placeholder="输入桌子名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.merchantId" clearable filterable size="small" placeholder="商家" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in merchantIdList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    <rrOperation />
  </div>
</template>

<script>
import { header } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import { getmerchantLists } from '@/api/merchant/merchant'
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
      merchantIdList: []
    }
  },
  created() {
    const datas = {
      status: 3,
      bizType: 3
    }
    getmerchantLists(datas).then(res => {
      this.merchantIdList = res.data
    })
  }
}
</script>
