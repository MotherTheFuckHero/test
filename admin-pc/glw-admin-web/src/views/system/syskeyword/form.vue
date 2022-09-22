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
      <el-form-item label="系统" prop="systemId">
        <el-select v-model="form.systemId" clearable style="width: 200px;" placeholder="系统">
          <el-option
            v-for="item in systemIdList"
            :key="item.id"
            :label="item.systemName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="语言" prop="languageId">
        <el-select v-model="form.languageId" clearable style="width: 200px;" placeholder="语言">
          <el-option
            v-for="item in languageIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="关键字" prop="keyword">
        <el-input v-model="form.keyword" maxlength="25" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="链接地址" prop="url">
        <el-input v-model="form.url" maxlength="255" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="是否热门" prop="isHot">
        <el-select v-model="form.isHot" clearable placeholder="是否热门" style="width: 200px;">
          <el-option
            v-for="item in isHotList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否默认" prop="isDefault">
        <el-select v-model="form.isDefault" clearable placeholder="是否默认" style="width: 200px;">
          <el-option
            v-for="item in isDefaultList"
            :key="item.value"
            :label="item.label"
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
import { getsystemLists } from '@/api/system/sys'
import { getlanguageLists } from '@/api/system/language'
const defaultForm = {
  id: null,
  systemId: '',
  languageId: '',
  keyword: '',
  url: '',
  isHot: '',
  isDefault: '',
  sortNo: 1
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      systemIdList: [],
      languageIdList: [],
      isHotList: [
        {
          value: true,
          label: '是'
        },
        {
          value: false,
          label: '否'
        }
      ],
      isDefaultList: [
        {
          value: true,
          label: '是'
        },
        {
          value: false,
          label: '否'
        }
      ],
      rules: {

        systemId: [
          {
            required: true,
            message: '请选择系统',
            trigger: 'blur'
          }
        ],
        languageId: [
          {
            required: true,
            message: '请选择语言',
            trigger: 'blur'
          }
        ],
        keyword: [
          {
            required: true,
            message: '请输入系统关键字',
            trigger: 'blur'
          }
        ],
        url: [
          {
            required: true,
            message: '请输入关键字链接地址',
            trigger: 'blur'
          }
        ],
        isHot: [
          {
            required: true,
            message: '请选择是否热门',
            trigger: 'blur'
          }
        ],
        isDefault: [
          {
            required: true,
            message: '请选择是否默认',
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
    getlanguageLists(data).then(res => {
      this.languageIdList = res.data
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
