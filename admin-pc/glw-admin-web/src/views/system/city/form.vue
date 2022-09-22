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
      <el-form-item label="城市名称" prop="name">
        <el-input v-model="form.name" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="城市简称" prop="shortName">
        <el-input v-model="form.shortName" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="城市拼音" prop="pinyin">
        <el-input v-model="form.pinyin" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="城市邮编" prop="zipCode">
        <el-input v-model="form.zipCode" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="城市区号" prop="cityCode">
        <el-input v-model="form.cityCode" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="城市状态" prop="status">
        <el-select v-model="form.status" clearable style="width: 200px;" placeholder="城市状态">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="城市级别" prop="levelType">
        <el-select v-model="form.levelType" clearable style="width: 200px;" placeholder="城市级别">
          <el-option
            v-for="item in levelTypeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="城市父级" prop="parentId">
        <el-select v-model="form.parentId" clearable filterable style="width: 200px;" placeholder="城市父级">
          <el-option value="100000" label="父级为空" />
          <el-option
            v-for="item in parentIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="经度" prop="lon">
        <el-input v-model="form.lon" type="number" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="纬度" prop="lat">
        <el-input v-model="form.lat" type="number" maxlength="32" style="width: 200px;" />
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
import { getcityLists, citytypeLists } from '@/api/system/city'
const defaultForm = {
  id: null,
  name: '',
  shortName: '',
  parentId: '',
  cityCode: '',
  zipCode: '',
  pinyin: '',
  levelType: '',
  status: '',
  lon: '',
  lat: ''
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      parentIdList: [],
      levelTypeList: [],
      statusList: [
        {
          value: 1,
          name: '显示'
        },
        {
          value: 2,
          name: '隐藏'
        }
      ],
      rules: {
        name: [
          {
            required: true,
            message: '请输入城市名称',
            trigger: 'blur'
          }
        ],
        shortName: [
          {
            required: true,
            message: '请输入城市简称',
            trigger: 'blur'
          }
        ],
        parentId: [
          {
            required: true,
            message: '请选择城市父级',
            trigger: 'blur'
          }
        ],
        cityCode: [
          {
            required: true,
            message: '请输入城市编码',
            trigger: 'blur'
          },
          { pattern: /^[0-9a-zA-Z]+$/, message: '请输入正确的城市编码' }
        ],
        zipCode: [
          {
            required: true,
            message: '请输入城市邮编',
            trigger: 'blur'
          },
          { pattern: /^[0-9]+$/, message: '请输入正确的城市邮编' }
        ],
        pinyin: [
          {
            required: true,
            message: '请输入城市拼音',
            trigger: 'blur'
          },
          { pattern: /^[a-zA-Z]+$/, message: '请输入正确的城市拼音' }
        ],
        levelType: [
          {
            required: true,
            message: '请选择城市类型',
            trigger: 'blur'
          }
        ],
        status: [
          {
            required: true,
            message: '请选择城市状态',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    const data = {}
    citytypeLists(data).then(res => {
      this.levelTypeList = res.data
    })
    getcityLists(data).then(res => {
      this.parentIdList = res.data
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
