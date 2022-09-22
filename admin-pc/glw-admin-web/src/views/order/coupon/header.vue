<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.name" clearable size="small" placeholder="优惠券名称" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-input v-model="query.tag" clearable size="small" placeholder="标签" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.type" clearable size="small" placeholder="类型" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in typeList"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="query.systemId" clearable size="small" placeholder="系统" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in systemIdList"
        :key="item.id"
        :label="item.systemName"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="query.scopeType" clearable size="small" placeholder="限制类型" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in scopeTypeList"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="query.status" clearable size="small" placeholder="状态" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in statusList"
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
import { getsystemLists } from '@/api/system/sys'
import { coupontypesLists, coupontypeLists, couponstatusLists } from '@/api/order/coupon'
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
      systemIdList: [],
      scopeTypeList: [],
      statusList: []
    }
  },
  created() {
    const data = {
      status: 1
    }
    coupontypesLists(data).then(res => {
      this.typeList = res.data
    })
    getsystemLists(data).then(res => {
      this.systemIdList = res.data
    })
    coupontypeLists(data).then(res => {
      this.scopeTypeList = res.data
    })
    couponstatusLists(data).then(res => {
      this.statusList = res.data
    })
  }
}
</script>
