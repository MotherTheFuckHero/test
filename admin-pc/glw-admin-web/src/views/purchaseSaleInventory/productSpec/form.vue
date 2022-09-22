<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :before-close="crud.cancelCU"
    :visible="crud.status.cu > 0"
    :title="crud.status.title"
    width="980px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="商家名称" prop="merchantName">
        <el-input v-model="form.merchantName" maxlength="32" disabled="disabled" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="商品名称" prop="productName">
        <el-input v-model="form.productName" maxlength="32" disabled="disabled" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="商品规格" prop="productSpecs">
        <el-input v-model="form.productSpecs" maxlength="32" disabled="disabled" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="商品库存" prop="productSpecStock.stockCount" style="display: inline-block" :rules="[{ required: true, message: '请输入库存数量', trigger: 'blur' }]">
        <el-input v-model="form.productSpecStock.stockCount" type="number" disabled onkeyup="value=value.replace(/[^0-9]/ig,'')" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />
      </el-form-item>
      <el-form-item label="虚拟库存" prop="productSpecStock.stockCount" style="display: inline-block" :rules="[{ required: true, message: '请输入虚拟库存数量', trigger: 'blur' }]">
        <el-input v-model="form.productSpecStock.stockFictitiousCount" type="number" onkeyup="value=value.replace(/[^0-9]/ig,'')" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />
      </el-form-item>
      <el-form-item label="预警库存" prop="productSpecStock.stockCount" style="display: inline-block" :rules="[{ required: true, message: '请输入预警库存数量', trigger: 'blur' }]">
        <el-input v-model="form.productSpecStock.stockLimitCount" type="number" onkeyup="value=value.replace(/[^0-9]/ig,'')" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />
      </el-form-item>
      <!--      <el-form-item label="购买数量" prop="productSpecStock.stockCount" style="display: inline-block" :rules="[{ required: true, message: '请输入预警库存数量', trigger: 'blur' }]">-->
      <!--        <el-input v-model="form.productSpecStock.saleCount" type="number" onkeyup="value=value.replace(/[^0-9]/ig,'')" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />-->
      <!--      </el-form-item>-->
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
const defaultForm = {
  id: null,
  merchantName: '',
  productName: '',
  productSpecs: '',
  productSpecStock: {
    stockCount: '',
    stockFictitiousCount: '',
    stockLimitCount: ''
    // saleCount: ''
  }
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      rules: {
        systemName: [
          { required: true, message: '请输入系统名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
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
