<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.userId" clearable size="small" placeholder="输入用户编号搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.favoriteType" clearable size="small" placeholder="收藏类型" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in favoriteTypeList"
        :key="item.value"
        :label="item.name"
        :value="item.value"
      />
    </el-select>
    <el-select v-if="merchants" v-model="query.valueId" clearable filterable size="small" placeholder="请输入店铺的关键字搜索" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in merchantList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    <el-select v-if="products" v-model="query.valueId" clearable filterable size="small" placeholder="请输入商品的关键字搜索" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in productList"
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
import rrOperation from '@crud/RR.operation'
import { favoritetypeList } from '@/api/user/userinfo'
import { getmerchantLists } from '@/api/merchant/merchant'
import { getproductLists } from '@/api/product/product'
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
      merchants: false,
      products: false,
      favoriteTypeList: [],
      merchantList: [],
      productList: []
    }
  },
  watch: {
    'query.favoriteType': function(newQuestion, oldQuestion) {
      if (this.query.favoriteType === 1) {
        this.merchants = true
        this.products = false
      } else if (this.query.favoriteType === 2) {
        this.merchants = false
        this.products = true
      } else {
        this.merchants = false
        this.products = false
        this.query.valueId = ''
      }
    }
  },
  created() {
    const data = {
      status: 1
    }
    const datas = {
      status: 3
    }
    favoritetypeList(data).then(res => {
      this.favoriteTypeList = res.data
    })
    getmerchantLists(datas).then(res => {
      this.merchantList = res.data
    })
    getproductLists(datas).then(res => {
      this.productList = res.data
    })
  }
}
</script>
