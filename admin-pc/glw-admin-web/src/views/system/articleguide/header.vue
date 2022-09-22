<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.title" clearable size="small" placeholder="输入标题搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.languageId" clearable size="small" placeholder="语言" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in languageIdList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
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
import { getlanguageLists } from '@/api/system/language'
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
      merchantIdList: [],
      languageIdList: []
    }
  },
  created() {
    const data = {
      status: 1
    }
    const datas = {
      status: 3
    }
    getlanguageLists(data).then(res => {
      this.languageIdList = res.data
    })
    getmerchantLists(datas).then(res => {
      this.merchantIdList = res.data
    })
  }
}
</script>
