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
      <el-form-item label="商品单位" prop="unit">
        <el-input v-model="form.unit" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="商品库存" prop="productSpecStock.stockCount" style="display: inline-block" :rules="[{ required: true, message: '请输入库存数量', trigger: 'blur' }]">
        <el-input v-model="form.productSpecStock.stockCount" type="number" onkeyup="value=value.replace(/[^0-9]/ig,'')" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />
      </el-form-item>
      <el-form-item label="限购数量" prop="limitNum" style="display: inline-block" :rules="[{ required: true, message: '请输入限购数量', trigger: 'blur' }]">
        <el-input v-model="form.limitNum" type="number" onkeyup="value=value.replace(/[^0-9]/ig,'')" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />
      </el-form-item>
      <el-form-item label="最低购买" prop="minNum" style="display: inline-block" :rules="[{ required: true, message: '请输入最低购买', trigger: 'blur' }]">
        <el-input v-model="form.minNum" type="number" onkeyup="value=value.replace(/[^0-9]/ig,'')" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />
      </el-form-item>
      <el-form-item label="建议零售价" prop="retailPrice" style="display: inline-block" :rules="[{ required: true, message: '请输入建议零售价', trigger: 'blur' }]">
        <el-input v-model="form.retailPrice" type="number" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />
      </el-form-item>
      <el-form-item label="门店价格" prop="storePrice" style="display: inline-block" :rules="[{ required: true, message: '请输入门店价格', trigger: 'blur' }]">
        <el-input v-model="form.storePrice" type="number" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />
      </el-form-item>
      <el-form-item label="平台价" prop="platFormPrice" style="display: inline-block" :rules="[{ required: true, message: '请输入平台价', trigger: 'blur' }]">
        <el-input v-model="form.platFormPrice" type="number" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />
      </el-form-item>
      <el-form-item label="折扣价" prop="discountPrice" style="display: inline-block" :rules="[{ required: true, message: '请输入折扣价', trigger: 'blur' }]">
        <el-input v-model="form.discountPrice" type="number" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />
      </el-form-item>
      <el-form-item label="会员价" prop="vipPrice" style="display: inline-block" :rules="[{ required: true, message: '请输入会员价', trigger: 'blur' }]">
        <el-input v-model="form.vipPrice" type="number" maxlength="32" style="width: 200px;" @mousewheel.native.prevent />
      </el-form-item>
      <el-form-item label="用户类型" prop="userType">
        <el-select v-model="form.userType" clearable style="width: 200px;">
          <el-option
            v-for="item in userTypeLists"
            :key="item.value"
            :label="item.name"
            :value="item.value"
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
import { usertypeLists } from '@/api/user/userinfo'
const defaultForm = {
  id: null,
  merchantName: '',
  productName: '',
  productSpecs: '',
  limitNum: '',
  minNum: '',
  platFormPrice: '',
  retailPrice: '',
  storePrice: '',
  vipPrice: '',
  unit: '',
  userType: 1,
  productSpecStock: ''
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      userTypeLists: [],
      rules: {
        unit: [
          { required: true, message: '请输入商品单位', trigger: 'blur' }
        ],
        userType: [
          { required: true, message: '请选择用户类型', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    const data = {
      status: 1
    }
    usertypeLists(data).then(res => {
      this.userTypeLists = res.data
    })
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
