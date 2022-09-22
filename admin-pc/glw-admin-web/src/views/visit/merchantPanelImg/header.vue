<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-select v-model="query.merchantPanelId" clearable filterable size="small" placeholder="商家板块" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in merchantPanelIdList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    <el-input v-model="query.title" clearable size="small" placeholder="输入标题搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.languageId" clearable size="small" placeholder="语言" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in languageIdList"
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
import { getpanelLists } from '@/api/visit/merchantPanel'
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
      merchantPanelIdList: [],
      languageIdList: []
    }
  },
  created() {
    const data = {
      status: 1
    }
    getlanguageLists(data).then(res => {
      this.languageIdList = res.data
    })
      const datas = {
      }
      getpanelLists(datas).then(res => {
          this.merchantPanelIdList = res.data
      })
  }
}
</script>
