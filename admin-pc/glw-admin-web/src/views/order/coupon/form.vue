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
      <el-form-item label="优惠券名称" prop="name">
        <el-input v-model="form.name" maxlength="32" style="width:200px;" />
      </el-form-item>
      <el-form-item label="优惠券介绍" prop="desc">
        <el-input v-model="form.desc" maxlength="64" style="width:200px;" />
      </el-form-item>
      <el-form-item label="优惠券标签" prop="tag">
        <el-input v-model="form.tag" maxlength="64" style="width:200px;" />
      </el-form-item>
      <el-form-item label="优惠券类型" prop="type">
        <el-select v-model="form.type" clearable style="width:200px;">
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="所属系统" prop="systemId">
        <el-select v-model="form.systemId" clearable style="width: 200px;" placeholder="所属系统">
          <el-option
            v-for="item in systemIdList"
            :key="item.id"
            :label="item.systemName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.type===3" label="优惠券兑换码" prop="code" :rules="[{ required: true, message: '请输入优惠券兑换码', trigger: 'blur' }, { pattern: /^[0-9a-zA-Z]+$/, message: '请输入符合规范的优惠券兑换码' }]">
        <el-form>
          <el-input v-model="form.code" style="width:200px;" placeholder="请输入优惠券兑换码" />
        </el-form>
      </el-form-item>
      <el-form-item label="库存" prop="stockCount">
        <el-input v-model="form.stockCount" maxlength="3" type="number" style="width:200px;" />
      </el-form-item>
      <el-form-item label="优惠金额(￥)" prop="discount">
        <el-input v-model="form.discount" maxlength="3" type="number" style="width:200px;" />
      </el-form-item>
      <el-form-item label="最低金额(￥)" prop="min">
        <el-input v-model="form.min" maxlength="3" type="number" style="width:200px;" placeholder="最低使用金额(￥)" />
      </el-form-item>
      <el-form-item label="数量限制" prop="limitCount">
        <el-input v-model="form.limitCount" maxlength="5" type="number" style="width:200px;" />
      </el-form-item>
      <el-form-item label="结算费率" prop="couponRate">
        <el-input v-model="form.couponRate" placeholder="结算费率0-1之间，如0.2" type="number" style="width:200px;" />
      </el-form-item>
      <el-form-item label="领取时间" prop="startTime">
        <el-date-picker
          v-model="form.startTime"
          style="width:200px;"
          type="datetime"
          placeholder="选择领取时间"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="结束领取时间" prop="endTime">
        <el-date-picker
          v-model="form.endTime"
          style="width:200px;"
          type="datetime"
          placeholder="选择结束领取时间"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="有效时间类型" prop="timeType">
        <el-select v-model="form.timeType" clearable style="width:200px;">
          <el-option
            v-for="item in timeTypeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.timeType===1" label="有效时长(天)" prop="days" :rules="[{ required: true, message: '请输入优惠券有效时长', trigger: 'blur' }]">
        <el-input v-model="form.days" maxlength="3" type="number" style="width:200px;" placeholder="优惠券有效时长(天)" />
      </el-form-item>
      <el-form-item v-if="form.timeType===2" label="开始使用时间" prop="startUseTime" :rules="[{ required: true, message: '请选择优惠券开始使用时间', trigger: 'blur' }]">
        <el-date-picker
          v-model="form.startUseTime"
          type="datetime"
          style="width:200px;"
          placeholder="优惠券开始使用时间"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
      <el-form-item v-if="form.timeType===2" label="结束使用时间" prop="endUseTime" :rules="[{ required: true, message: '请选择优惠券结束使用时间', trigger: 'blur' }]">
        <el-date-picker
          v-model="form.endUseTime"
          type="datetime"
          style="width:200px;"
          placeholder="优惠券结束使用时间"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status" clearable style="width:200px;">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="范围类型" prop="scopeType">
        <el-select v-model="form.scopeType" clearable style="width:200px;" @change="scopeTypechange">
          <el-option
            v-for="item in scopeTypeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="折扣使用" prop="isOverlayUse">
        <el-radio-group v-model="form.isOverlayUse" style="width: 200px;">
          <el-radio class="radio" :label="true">是</el-radio>
          <el-radio class="radio" :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.scopeType===3" label="商家" prop="scopeValueIdList" :rules="[{ required: true, message: '请选择优惠券使用商家' }]">
        <el-select v-model="form.scopeValueIdList" multiple filterable clearable style="width:524px;">
          <el-option
            v-for="item in merchantList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.scopeType===4" label="商品" prop="scopeValueIdList" :rules="[{ required: true, message: '请选择优惠券使用商品' }]">
        <el-select v-model="form.scopeValueIdList" multiple filterable clearable style="width:524px;">
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
import { coupontypesLists, coupontypeLists, couponstatusLists, TimetypeLists } from '@/api/order/coupon'
import { getmerchantLists } from '@/api/merchant/merchant'
import { getproductLists } from '@/api/product/product'
import { getsystemLists } from '@/api/system/sys'
const defaultForm = {
  id: null,
  name: '',
  desc: '',
  tag: '',
  type: '',
  code: '',
  scopeType: '',
  discount: '',
  isOverlayUse: true,
  limitCount: 1,
  min: '',
  days: '',
  status: '',
  stockCount: '',
  couponRate: '',
  systemId: '',
  timeType: '',
  startTime: '',
  endTime: '',
  startUseTime: '',
  endUseTime: '',
  scopeValueIdList: []
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      typeList: [],
      systemIdList: [],
      scopeTypeList: [],
      statusList: [],
      timeTypeList: [],
      merchantList: [],
      productList: [],
      rules: {
        name: [
          {
            required: true,
            message: '请输入优惠券名称',
            trigger: 'blur'
          }
        ],
        limitCount: [
          {
            required: true,
            message: '请输入数量限制',
            trigger: 'blur'
          }
        ],
        couponRate: [
          {
            required: true,
            message: '请输入商家结算费率',
            trigger: 'blur'
          }
        ],
        systemId: [
          {
            required: true,
            message: '请选择所属系统',
            trigger: 'blur'
          }
        ],
        startTime: [
          {
            required: true,
            message: '请选择开始领取时间',
            trigger: 'blur'
          }
        ],
        endTime: [
          {
            required: true,
            message: '请选择结束领取时间',
            trigger: 'blur'
          }
        ],
        desc: [
          {
            required: true,
            message: '请输入优惠券介绍',
            trigger: 'blur'
          }
        ],
        tag: [
          {
            required: true,
            message: '请输入优惠券标签',
            trigger: 'blur'
          }
        ],
        scopeType: [
          {
            required: true,
            message: '请输入范围类型',
            trigger: 'blur'
          }
        ],
        discount: [
          {
            required: true,
            message: '请输入折扣',
            trigger: 'blur'
          }
        ],
        min: [
          {
            required: true,
            message: '请输入最小使用金额',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '请输入类型',
            trigger: 'blur'
          }
        ],
        stockCount: [
          {
            required: true,
            message: '请输入货物计数',
            trigger: 'blur'
          }
        ],
        timeType: [
          {
            required: true,
            message: '请输入时间类型',
            trigger: 'blur'
          }
        ],
        status: [
          {
            required: true,
            message: '请选择状态',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    const data = {
      status: 1
    }
    getsystemLists(data).then(res => {
      this.systemIdList = res.data
    })
    coupontypesLists(data).then(res => {
      this.typeList = res.data
    })
    coupontypeLists(data).then(res => {
      this.scopeTypeList = res.data
    })
    couponstatusLists(data).then(res => {
      this.statusList = res.data
    })
    TimetypeLists(data).then(res => {
      this.timeTypeList = res.data
    })
    const datas = {
      status: 3
    }
    getmerchantLists(datas).then(res => {
      this.merchantList = res.data
    })
    getproductLists(datas).then(res => {
      this.productList = res.data
    })
  },
  methods: {
    scopeTypechange() {
      this.form.valueIdList = []
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
