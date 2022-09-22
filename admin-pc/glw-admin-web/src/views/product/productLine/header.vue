<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.id" clearable size="small" type="number" placeholder="输入商品编号搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-input v-model="query.title" clearable size="small" placeholder="输入商品标题搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.cityId" clearable filterable size="small" placeholder="所在城市" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in parentIdList"
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
    <el-select v-model="query.companyId" clearable size="small" placeholder="分公司" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in companyIdList"
        :key="item.id"
        :label="item.companyName"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="query.multiSpec" clearable filterable size="small" placeholder="是否多规格" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in multiSpecList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="query.status" clearable filterable size="small" placeholder="状态" class="filter-item" @change="crud.toQuery">
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
import { companycityLists } from '@/api/system/city'
import { getmerchantLists } from '@/api/merchant/merchant'
import { ProductstatusList } from '@/api/product/product'
import { getcompanyLists } from '@/api/system/company'
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
      parentIdList: [],
      merchantIdList: [],
      catIdList: [],
      statusList: [],
      productTypeList: [],
      companyIdList: [],
      multiSpecList: [
        {
          value: true,
          label: '是'
        },
        {
          value: false,
          label: '否'
        }
      ]
    }
  },
  created() {
    const data = {
      status: 1
    }
    companycityLists(data).then(res => {
      this.parentIdList = res.data
    })
    getcompanyLists(data).then(res => {
      this.companyIdList = res.data
    })
    ProductstatusList(data).then(res => {
      this.statusList = res.data
    })
    const datas = {
      status: 3
    }
    getmerchantLists(datas).then(res => {
      this.merchantIdList = res.data
    })
  }
}
</script>
