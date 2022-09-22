<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.name" clearable size="small" placeholder="输入模板名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.postageIncl" clearable size="small" placeholder="是否包邮" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in postageInclList"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="query.type" clearable size="small" placeholder="模板类型" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in typeList"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="query.valuationModel" clearable size="small" placeholder="计价方式" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in valuationModelList"
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
import { postagetemplateModelLists, postagetemplatetypeLists } from '@/api/product/postagetemplate'
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
      typeList: [],
      valuationModelList: [],
      postageInclList: [
        {
          value: true,
          name: '是'
        },
        {
          value: false,
          name: '否'
        }
      ]
    }
  },
  created() {
    const data = {
      status: 1
    }
    postagetemplateModelLists(data).then(res => {
      this.valuationModelList = res.data
    })
    postagetemplatetypeLists(data).then(res => {
      this.typeList = res.data
    })
  }
}
</script>
