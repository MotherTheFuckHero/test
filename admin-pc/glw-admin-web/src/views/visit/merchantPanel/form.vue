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
      <el-form-item label="系统" prop="systemId">
        <el-select v-model="form.systemId" clearable style="width: 200px;">
          <el-option
            v-for="item in systemIdList"
            :key="item.id"
            :label="item.systemName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
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
      <el-form-item label="商家" prop="merchantId">
        <el-select v-model="form.merchantId" clearable filterable style="width: 200px;" placeholder="商家">
          <el-option
            v-for="item in merchantIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="form.type" clearable style="width: 200px;" placeholder="类型">
          <el-option
            v-for="item in paneltypeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.type===2" label="父板块" prop="parentId">
        <el-select v-model="form.parentId" clearable style="width: 200px;" placeholder="父板块">
          <el-option
            v-for="item in parentIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="样式" v-if="form.type===2 || form.type===8" prop="style">
        <el-select v-model="form.style" clearable style="width: 200px;"  placeholder="样式">
          <el-option
            v-for="item in panelstyleList"
            :key="item.dataCode"
            :label="item.dataValue"
            :value="item.dataCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="板块名称" prop="name">
        <el-input v-model="form.name" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="子标题" prop="subtitle">
        <el-input v-model="form.subtitle" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="显示数量" prop="limitNum">
        <el-input v-model="form.limitNum" maxlength="32" type="number" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="排序" prop="sortNo">
        <el-input v-model="form.sortNo" maxlength="32" type="number" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status" clearable style="width: 200px;" placeholder="状态">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.type===2 || form.type===8 || form.type===6" label="板块Logo" prop="icon" style="display:block">
        <el-upload
          v-model="form.icon"
          action="/"
          :http-request="fileAdd"
          :limit="1"
          :file-list="form.fileList"
          :on-exceed="handleExceed"
          list-type="picture-card"
          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
          :on-remove="handleRemove"
          value-key="form.icon"
          multiple
        >
          <em class="el-icon-plus" />
        </el-upload>
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
import { paneltypeList, panelstyleList } from '@/api/panel/panel'
import {getpanelLists } from '@/api/visit/merchantPanel'
import { getcompanyLists } from '@/api/system/company'
import { getmerchantLists } from '@/api/merchant/merchant'
import { sysfileAdds } from '@/api/upload'
import { getsystemLists } from '@/api/system/sys'
import CRUD from '@crud/crud'
const defaultForm = {
  id: null,
  systemId: 12,
  name: '',
  icon: '',
  subtitle: '',
  sortNo: 100,
  // position:"",
  parentId: '',
  companyId: '',
  merchantId: '',
  status: 1,
  type: '',
  style: "",
  limitNum: 0,
  fileList: []
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      systemIdList: [],
      companyIdList: [],
      paneltypeList: [],
      parentIdList: [],
      merchantIdList: [],
      panelstyleList: [],
      statusList: [ // 状态列表
        {
          value: 1,
          label: '显示'
        },
        {
          value: 2,
          label: '隐藏'
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
        name: [
          {
            required: true,
            message: '请输入板块名称',
            trigger: 'blur'
          }
        ],
        sortNo: [
          {
            required: true,
            message: '请输入排序编号',
            trigger: 'blur'
          }
        ],
        companyId: [
          {
            required: true,
            message: '请选择公司',
            trigger: 'blur'
          }
        ],
      merchantId: [
          {
            required: true,
            message: '请选择商家',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '请选择板块类型',
            trigger: 'blur'
          }
        ],
        limitNum: [
          {
            required: true,
            message: '请输入数量限制',
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
  watch: {
    'form.companyId': function(newQuestion, oldQuestion) {
      if (this.form.companyId !== '') {
        const data = {
          type: 2,
          systemId: this.form.systemId,
          companyId: this.form.companyId
        }
        getpanelLists(data).then(res => {
          this.parentIdList = []
          this.parentIdList = res.data
        })
          const datas = {
              systemId: this.form.systemId,
              companyId: this.form.companyId
          }
          getmerchantLists(datas).then(res => {
          this.merchantIdList = []
          this.merchantIdList = res.data
        })
      }
    },
  },
  created() {
    const data = {
      status: 1
    }
    getsystemLists(data).then(res => {
      this.systemIdList = res.data
    })
    getcompanyLists(data).then(res => {
      this.companyIdList = res.data
    })
    paneltypeList(data).then(res => {
      this.paneltypeList = res.data
    })
    getpanelLists(data).then(res => {
      this.parentIdList = res.data
    })
    panelstyleList(data).then(res => {
      this.panelstyleList = res.data
    })
  },
  methods: {
    // // 新增与编辑前做的操作
    [CRUD.HOOK.beforeSubmit](crud, form) {
        if (crud.form.parentId === '') {
        crud.form.parentId = 0
      }
    },
    // 图片提交
    handleRemove(file, fileList) {
      this.form.fileList = fileList
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`)
      this.form.fileList = fileList
    },
    // 选择文件
    fileAdd(fileList) {
      const myfile = fileList
      const file = myfile.file
      var formData = new FormData()
      formData.append('file', file)
      var _this = this
      sysfileAdds(formData).then(res => {
        var code = res.code
        var msg = res.msg
        if (code === '0') {
          _this.form.fileList.push({
            'name': res.data.fileName,
            'key': res.data.key,
            'size': res.data.size,
            'url': res.data.url
          })
          _this.form.icon = res.data.key
        } else {
          _this.$message({
            message: msg,
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
