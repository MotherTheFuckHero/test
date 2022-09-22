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
      <el-form-item label="分公司" prop="companyId">
        <el-select v-model="form.companyId" clearable style="width: 200px;" placeholder="分公司">
          <el-option
            v-for="item in companyIdList"
            :key="item.id"
            :label="item.companyName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="终端名称" prop="deviceName">
        <el-input v-model="form.deviceName" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="类型" prop="deviceType">
        <el-select v-model="form.deviceType" clearable style="width: 200px;" placeholder="类型">
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="终端编号" prop="deviceCode">
        <el-input v-model="form.deviceCode" maxlength="64" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="商家" prop="merchantId">
        <el-select v-model="form.merchantId" clearable filterable placeholder="商家" style="width: 200px;" @change="merchantIdchange($event)">
          <el-option
            v-for="item in merchantIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="设备厂商" prop="deviceFirm">
        <el-input v-model="form.deviceFirm" style="width:200px;" />
      </el-form-item>
      <el-form-item label="设备协议" prop="deviceAgreeCode">
        <el-select v-model="form.deviceAgreeCode" clearable style="width: 200px;" placeholder="类型">
          <el-option
            v-for="item in deviceFirmList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.deviceType===1 ||form.deviceType===2" label="商品" prop="productId">
        <el-select v-model="form.productId" clearable filterable placeholder="商品" style="width: 200px;">
          <el-option
            v-for="item in productIdList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.deviceType===1" label="进出类型" prop="turnover">
        <el-select v-model="form.turnover" clearable style="width: 200px;" placeholder="进出类型">
          <el-option
            v-for="item in turnoverList"
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
import { getmerchantLists } from '@/api/merchant/merchant'
import { getcompanyLists } from '@/api/system/company'
import { getproductLists } from '@/api/product/product'
import { typeLists, deviceAgreeCodeLists, TurnoverEnumLists } from '@/api/device/merchantDevice'
const defaultForm = {
  id: null,
  deviceName: '',
  deviceCode: '',
  companyId: '',
  deviceAgreeCode: '',
  merchantId: '',
  productId: '',
  merchantName: '',
  onlineStatus: 1,
  turnover: 0,
  deviceFirm: '',
  signTime: '',
  lastHeartbeatTime: '',
  deviceType: ''
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      companyIdList: [],
      merchantIdList: [],
      productIdList: [],
      typeList: [],
      turnoverList: [],
      deviceFirmList: [],
      rules: {
        companyId: [
          { required: true, message: '请选择公司', trigger: 'blur' }
        ],
        deviceName: [
          { required: true, message: '请输入终端名称', trigger: 'blur' }
        ],
        deviceCode: [
          { required: true, message: '请输入终端编号', trigger: 'blur' }
        ],
        deviceAgreeCode: [
          { required: true, message: '请选择设备协议', trigger: 'blur' }
        ],
        merchantId: [
          { required: true, message: '请选择商家', trigger: 'blur' }
        ],
        productId: [
          { required: true, message: '请选择商品', trigger: 'blur' }
        ],
        deviceFirm: [
          { required: true, message: '请输入设备厂商', trigger: 'blur' }
        ],
        deviceType: [
          { required: true, message: '请选择设备类型', trigger: 'blur' }
        ],
        turnover: [
          { required: true, message: '请选择进出类型', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'form.merchantId': function() {
      if (this.form.merchantId !== '') {
        const data = {
          merchantId: this.form.merchantId,
          status: 3
        }
        getproductLists(data).then(res => {
          this.productIdList = res.data
        })
      }
    }
  },
  created() {
    const datas = {
      status: 3,
      bizType: 2
    }
    const data = {
    }
    getmerchantLists(datas).then(res => {
      this.merchantIdList = res.data
    })
    getcompanyLists(data).then(res => {
      this.companyIdList = res.data
    })
    typeLists(data).then(res => {
      this.typeList = res.data
    })
    deviceAgreeCodeLists(data).then(res => {
      this.deviceFirmList = res.data
    })
    TurnoverEnumLists(data).then(res => {
      this.turnoverList = res.data
    })
  },
  methods: {
    merchantIdchange(val) {
      this.form.productId = ''
      const datas = {
        status: 3,
        id: val
      }
      getmerchantLists(datas).then(res => {
        if (res.code === '0') {
          this.form.merchantName = res.data[0].name
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          })
        }
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
