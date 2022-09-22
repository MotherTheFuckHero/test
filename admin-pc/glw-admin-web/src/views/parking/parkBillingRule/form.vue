<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :before-close="crud.cancelCU"
    :visible="crud.status.cu > 0"
    :title="crud.status.title"
    width="700px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="120px">

      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" maxlength="32" style="width: 520px;" />
      </el-form-item>
      <el-form-item label="商家名称" prop="merchantId">
        <el-select v-model="form.merchantId" clearable filterable style="width: 520px;" placeholder="商家名称">
          <el-option
            v-for="item in merchantIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="付费类型" prop="type">
        <el-select v-model="form.type" clearable filterable style="width: 200px;" placeholder="付费类型">
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="车位车型" prop="carModel">
        <el-select v-model="form.carModel" clearable style="width: 200px;" placeholder="车位车型">
          <el-option
            v-for="item in carModelList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.type===1" label="单位时长(分钟)" prop="unitTime">
        <el-input v-model.number="form.unitTime" type="number" style="width: 520px;" />
      </el-form-item>
      <el-form-item label="计费价格" prop="unitPrice">
        <el-input v-model.number="form.unitPrice" type="number" style="width: 520px;" />
      </el-form-item>
      <el-form-item label="开始时间" prop="beginTime">
        <el-time-picker
          v-model="form.beginTime"
          placeholder="选择计费开始时间"
          style="width: 200px;"
          value-format="HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime">
        <el-time-picker
          v-model="form.endTime"
          placeholder="选择计费结束时间"
          style="width: 200px;"
          value-format="HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="超时计费类型" prop="parkBillingOutTimeRule.outTimeType" :rules="[{ required: true, message: '请选择超时计费类型', trigger: 'blur' }]">
        <el-select v-model="form.parkBillingOutTimeRule.outTimeType" clearable style="width: 200px;" placeholder="超时计费类型">
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="超时计费" prop="parkBillingOutTimeRule.outTimeValue" :rules="[{ required: true, message: '请输入超时计费', trigger: 'blur' }]">
        <el-input v-model.number="form.parkBillingOutTimeRule.outTimeValue" type="number" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="超时最小值" prop="parkBillingOutTimeRule.outTimeCountMin" :rules="[{ required: true, message: '请输入超时最小值', trigger: 'blur' }]">
        <el-input v-model.number="form.parkBillingOutTimeRule.outTimeCountMin" type="number" style="width: 200px;" placeholder="分钟" />
      </el-form-item>
      <el-form-item label="超时最大值" prop="parkBillingOutTimeRule.outTimeCountMax" :rules="[{ required: true, message: '请输入超时最大值', trigger: 'blur' }]">
        <el-input v-model.number="form.parkBillingOutTimeRule.outTimeCountMax" type="number" style="width: 200px;" placeholder="分钟" />
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
import { RuleTypeLists, OutTimeLists } from '@/api/parking/parkBillingRule'
import { CarModelLists } from '@/api/parking/parkStall'
import { getmerchantLists } from '@/api/merchant/merchant'
const defaultForm = {
  id: null,
  title: '',
  merchantId: '',
  type: '',
  carModel: '',
  unitTime: '',
  unitPrice: '',
  beginTime: '',
  endTime: '',
  parkBillingOutTimeRule: {
    outTimeType: '',
    outTimeValue: '',
    outTimeCountMax: '',
    outTimeCountMin: ''
  }

}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      carModelList: [],
      typeList: [],
      typeLists: [],
      merchantIdList: [],
      rules: {
        merchantId: [
          { required: true, message: '请选择商家', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择计费类型', trigger: 'blur' }
        ],
        carModel: [
          { required: true, message: '请选择车型', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        unitTime: [
          { required: true, message: '请输入计费单位', trigger: 'blur' }
        ],
        unitPrice: [
          { required: true, message: '请输入计费价格', trigger: 'blur' }
        ],
        beginTime: [
          { required: true, message: '请选择计费开始时间', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '请选择计费结束时间', trigger: 'blur' }
        ],
        outTimeType: [
          { required: true, message: '请选择超时计费类型', trigger: 'blur' }
        ],
        outTimeValue: [
          { required: true, message: '请输入超时计费金额', trigger: 'blur' }
        ],
        outTimeCountMin: [
          { required: true, message: '请输入超时最小值（分钟）', trigger: 'blur' }
        ],
        outTimeCountMax: [
          { required: true, message: '请输入超时最大值（分钟）', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'form.type': function() {
      if (this.form.type !== '') {
        if (this.form.type === 2) {
          this.form.unitTime = 1
        }
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
    const data = {
    }
    RuleTypeLists(data).then(res => {
      this.typeList = res.data
    })
    OutTimeLists(data).then(res => {
      this.typeLists = res.data
    })
    CarModelLists(data).then(res => {
      this.carModelList = res.data
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
