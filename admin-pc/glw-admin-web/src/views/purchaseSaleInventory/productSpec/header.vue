<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-select
      class="filter-item"
      size="small"
      v-model="query.merchantId"
      clearable
      filterable
      remote
      reserve-keyword
      placeholder="商家"
      :remote-method="merchantRemoteMethod"
      :loading="merchantRemoteLoading"
      @change="getMerchantId"
    >
      <el-option
        v-for="item in merchantList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="query.warehouseId" clearable filterable size="small" placeholder="仓库" class="filter-item" @change="crud.toQuery" @focus="getWarehouse">
      <el-option
        v-for="item in warehouseIdLists"
        :key="item.id"
        :label="item.warehouseName"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="query.productId" clearable filterable size="small" placeholder="商品" class="filter-item" @change="crud.toQuery" @focus="getSelectProduct">
      <el-option
        v-for="item in productIdList"
        :key="item.id"
        :label="item.title"
        :value="item.id"
      />
    </el-select>
    <el-select v-model="query.catId" clearable filterable size="small" placeholder="分类" class="filter-item" @change="crud.toQuery">
      <el-option
        v-for="item in catIdList"
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
import { getproductLists } from '@/api/product/product'
import { divideGet } from '@/api/product/category'
import { getWareHouseInfoListss } from '@/api/purchaseSaleInventory/warehouseManage'
import { getmerchantLists } from '@/api/purchaseSaleInventory/warehouseManage'
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
      useMerchantId: '',
      merchantRemoteLoading: false,
      afterMerchantList: [],
      merchantList: [],
      catIdList: [],
      productIdList: [],
      statusList: [],
      warehouseIdLists: []
    }
  },
  created() {
    divideGet().then(res => {
      for (var i = 0; i < res.data.length; i++) {
        var pamers = {
          'name': res.data[i].name,
          'id': res.data[i].id
        }
        this.catIdList.push(pamers)
        for (var s = 0; s < res.data[i].children.length; s++) {
          var childrens = {
            'name': res.data[i].children[s].name,
            'id': res.data[i].children[s].id
          }
          this.catIdList.push(childrens)
          for (var ss = 0; ss < res.data[i].children[s].children.length; ss++) {
            var childrenss = {
              'name': res.data[i].children[s].children[ss].name,
              'id': res.data[i].children[s].children[ss].id
            }
            this.catIdList.push(childrenss)
          }
        }
      }
    })
  },
    mounted() {
        this.initData()
    },
    methods: {
        getMerchantId(value){
            this.useMerchantId = value
        },
        getWarehouse(){
            if (this.useMerchantId){
                getWareHouseInfoListss({useMerchantId:this.useMerchantId}).then(res => {
                    this.warehouseIdLists = res.data
                })
            }else{
                this.$message.warning('请先选择商家')
            }
        },
        getSelectProduct(){
            if (this.useMerchantId){
                const datas = {
                    status: 3,
                    merchantId: this.useMerchantId
                }
                getproductLists(datas).then(res => {
                    this.productIdList = res.data
                })
            }else{
                this.$message.warning('请先选择商家')
            }
        },
        // 得到使用仓库商家的列表
        initData() {
            // 远程搜索机构
            let allOrds = []
            getmerchantLists({ status: 3 }).then(res => {
                if (res.code === '0') {
                    allOrds = res.data
                    this.afterMerchantList = allOrds.map(item => {
                        return { value: item.id, label: item.name }
                    })
                } else {
                    this.$notify({
                        title: '警告',
                        message: res.msg,
                        type: 'warning'
                    })
                }
            })
        },
        // 使用仓库的商家远程搜索
        merchantRemoteMethod(query) {
            if (query !== '') {
                this.merchantRemoteLoading = true
                setTimeout(() => {
                    this.merchantRemoteLoading = false
                    this.merchantList = this.afterMerchantList.filter(item => {
                        return item.label.indexOf(query) > -1
                    })
                }, 200)
            } else {
                this.merchantList = []
            }
        },
    }
}
</script>
