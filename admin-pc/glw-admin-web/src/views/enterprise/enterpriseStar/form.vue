<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :before-close="crud.cancelCU"
    :visible="crud.status.cu > 0"
    :title="crud.status.title"
    width="680px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="企业" prop="enterpriseId">
        <el-select v-model="form.enterpriseId" clearable style="width: 200px">
          <el-option
            v-for="item in enterpriseList"
            :key="item.id"
            :label="item.enterpriseName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="选择商品" prop="productId">
        <el-select v-model="form.productId" clearable filterable remote placeholder="请输入商品名称关键字搜索" :remote-method="remoteMethod" style="width: 200px;">
          <template v-for="item in productList">
            <el-option
              v-if="item.title !==''"
              :key="item.id"
              :label="item.title+'('+item.title+')'"
              :value="item.id"
            />
            <el-option
              v-else-if="item.title ===''"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            />
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="选择规格" prop="specId">
        <el-select v-model="form.specId" clearable style="width: 200px">
          <el-option
            v-for="item in specList"
            :key="item.id"
            :label="item.productSpecs"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="收藏数量" prop="productNum">
        <el-input v-model="form.productNum" maxlength="32" style="width: 200px" />
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        type="text"
        @click="crud.cancelCU"
      >
        取消
      </el-button>
      <el-button
        :loading="crud.status.cu === 2"
        type="primary"
        @click="crud.submitCU"
      >
        确认
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { form } from '@crud/crud'
import { getEnterpriseList } from '@/api/enterprise/enterpriseInfo'
import { getproductLists, getproductspecLists } from '@/api/product/product'
const defaultForm = {
  id: null,
  productId: '',
  enterpriseId: '',
  productNum: '',
  specId: ''
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      enterpriseList: [],
      productList: [],
      specList: [],
      rules: {
        enterpriseId: [{ required: true, message: '请选择企业', trigger: 'change' }],
        productId: [{ required: true, message: '请选择商品', trigger: 'change' }],
        specId: [{ required: true, message: '请选择商品规格', trigger: 'change' }],
        productNum: [{ required: true, message: '请填写收藏数量', trigger: 'blur' }]
      }
    }
  },
  watch: {
    'form.productId': function(newQuestion, oldQuestion) {
      if (this.form.productId !== '') {
        const data = {
          id: this.form.productId,
          languageId: 1
        }
        getproductspecLists(data).then(res => {
          this.specList = res.data
        })
      }
    }
  },
  created() {
    // const data = {
    //   status: 1
    // }
    getEnterpriseList({}).then(res => {
      this.enterpriseList = res.data
    })
  },
  methods: {
    remoteMethod(query) {
      const data = {
        title: query
      }
      getproductLists(data).then(res => {
        this.productList = res.data
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
  .el-form-item{
    display: inline-block;
  }
</style>
<style>
  .el-dialog__body{
    padding: 40px 20px !important;
  }
  .mymap {
    width: 100%;
    height: 500px;
  }
  .amap-sug-result {
    z-index: 4000!important;
  }
  #tangram-suggestion--TANGRAM__u-main{
    z-index: 3000!important;
  }
</style>
