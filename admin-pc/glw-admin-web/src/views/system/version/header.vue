<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-select v-model="query.updateType" clearable size="small" placeholder="更新类型" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in updateTypeList"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="query.type" clearable size="small" placeholder="类型" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in typeList"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="query.status" clearable size="small" placeholder="状态" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in statusList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <rrOperation />
  </div>
</template>

<script>
import { header } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import { typeLists, UpdateTypeLists } from '@/api/system/version'
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
      updateTypeList: [],
      statusList: [
        {
          value: 1,
          label: '上架'
        },
        {
          value: 2,
          label: '下架'
        }
      ]
    }
  },
  created() {
    const data = {
      status: 1
    }
    typeLists(data).then(res => {
      this.typeList = res.data
    })
    UpdateTypeLists(data).then(res => {
      this.updateTypeList = res.data
    })
  }
}
</script>
