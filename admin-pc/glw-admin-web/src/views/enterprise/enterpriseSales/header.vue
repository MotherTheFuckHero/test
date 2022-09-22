<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-select v-model="query.merchantId" clearable filterable size="small" placeholder="选择商户搜索" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in merchantIdList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    <el-input v-model="query.userId" clearable size="small" placeholder="输入用户编号搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
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
        getmerchantLists({status:3}).then(res => {
            this.merchantIdList = res.data
        })
    },
}
</script>
