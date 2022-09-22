<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.deviceName" clearable size="small" placeholder="输入终端名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.companyId" clearable size="small" placeholder="分公司" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in companyIdList"
        :key="item.id"
        :label="item.companyName"
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
    <el-select v-model="query.deviceType" clearable filterable size="small" placeholder="类型" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in typeList"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="query.deviceAgreeCode" clearable filterable size="small" placeholder="设备协议" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in deviceFirmList"
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
import { getmerchantLists } from '@/api/merchant/merchant'
import { getcompanyLists } from '@/api/system/company'
import { typeLists, deviceAgreeCodeLists } from '@/api/device/merchantDevice'
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
      companyIdList: [],
      typeList: [],
      deviceFirmList: []
    }
  },
  created() {
    const datas = {
      status: 3
    }
    const data = {
    }
    getmerchantLists(datas).then(res => {
      this.merchantIdList = res.data
    })
    typeLists(data).then(res => {
      this.typeList = res.data
    })
    getcompanyLists(data).then(res => {
      this.companyIdList = res.data
    })
    deviceAgreeCodeLists(data).then(res => {
      this.deviceFirmList = res.data
    })
  }
}
</script>
