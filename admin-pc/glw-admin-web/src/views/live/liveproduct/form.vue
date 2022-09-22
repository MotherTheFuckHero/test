<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :before-close="crud.cancelCU"
    :visible="crud.status.cu > 0"
    :title="crud.status.title"
    width="650px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="关联商家" prop="merchantId">
        <el-select v-model="form.merchantId" clearable filterable style="width: 480px;" placeholder="关联商家" @change="productIdchange">
          <el-option
            v-for="item in merchantIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="关联商品" prop="productId">
        <el-select v-model="form.productId" clearable filterable style="width: 480px;" placeholder="关联商品">
          <el-option
            v-for="item in productList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          />
        </el-select>
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
import { getproductLists } from '@/api/product/product'
import { getmerchantLists } from '@/api/merchant/merchant'
const defaultForm = {
  id: null,
  productId: '',
  merchantId: ''
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      productList: [],
      merchantIdList: [],
      rules: {
        productId: [
          { required: true, message: '请选择关联商品', trigger: 'blur' }
        ],
        merchantId: [
          { required: true, message: '请选择关联商家', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'form.merchantId': function(newQuestion, oldQuestion) {
      if (this.form.merchantId !== '') {
        const data = {
          status: 3,
          merchantId: this.form.merchantId
        }
        getproductLists(data).then(res => {
          this.productList = res.data
        })
      }
    }
  },
  created() {
    const datas = {
      status: 3
    }
    getmerchantLists(datas).then(res => {
      this.merchantIdList = res.data
    })
  },
  methods: {
    productIdchange() {
      this.form.productId = ''
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
