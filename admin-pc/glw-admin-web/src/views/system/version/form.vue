<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :before-close="crud.cancelCU"
    :visible="crud.status.cu > 0"
    :title="crud.status.title"
    width="680px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="110px">
      <el-form-item label="更新类型" prop="updateType">
        <el-select v-model="form.updateType" clearable style="width: 200px;" placeholder="更新类型">
          <el-option
            v-for="item in updateTypeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="form.type" clearable style="width: 200px;" placeholder="类型">
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
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
      <el-form-item label="版本号" prop="version">
        <el-input v-model="form.version" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="允许最低版本" prop="minVersion">
        <el-input v-model="form.minVersion" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="更新描述" prop="versionDesc">
        <el-input v-model="form.versionDesc" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="安装包地址" prop="packageKey">
        <el-input v-model="form.packageUrl" disabled maxlength="32" style="width: 514px;" />
      </el-form-item>
      <div>
        <el-form-item label="系统文件">
          <el-upload
            class="upload-demo"
            action="/"
            :http-request="fileAdd"
            :limit="1"
            :file-list="form.fileversionList"
            :on-preview="handlePreview"
            :on-exceed="handleExceed"
            :on-remove="handleRemove"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip" />
          </el-upload>
        </el-form-item>
      </div>
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
import { typeLists, UpdateTypeLists,getsts } from '@/api/system/version'
import { sysfileAdd } from '@/api/upload'
import OSS from 'ali-oss'
const defaultForm = {
  id: null,
  type: '',
  version: '',
  minVersion: '',
  updateType: '',
  packageKey: '',
  packageUrl: '',
  versionDesc: '',
  status: 1,
  fileversionList: []
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      accessData:{},
      typeList: [],
      updateTypeList: [],
      statusList: [
        {
          value: 1,
          label: '上架'
        },
        {
          value: 2,
          label: '下架'
        }
      ],
      rules: {

        type: [
          {
            required: true,
            message: '请选择类型',
            trigger: 'blur'
          }
        ],
        status: [
          {
            required: true,
            message: '请选择状态',
            trigger: 'blur'
          }
        ],
        updateType: [
          {
            required: true,
            message: '请选择更新类型',
            trigger: 'blur'
          }
        ],
        version: [
          {
            required: true,
            message: '请输入版本号',
            trigger: 'blur'
          },
          { pattern: /^([1-9]\d|[1-9])(.([1-9]\d|\d)){2}$/, message: '请输入正确的版本号如1.0.1' }
        ],
        minVersion: [
          {
            required: true,
            message: '请输入最低允许版本',
            trigger: 'blur'
          },
          { pattern: /^([1-9]\d|[1-9])(.([1-9]\d|\d)){2}$/, message: '请输入正确的版本号如1.0.1' }
        ],
        packageKey: [
          {
            required: true,
            message: '请选择安装包',
            trigger: 'blur'
          }
        ],
        versionDesc: [
          {
            required: true,
            message: '请输入更新描述',
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
    typeLists(data).then(res => {
      this.typeList = res.data
    })
    UpdateTypeLists(data).then(res => {
      this.updateTypeList = res.data
    })
      getsts({}).then(res=>{
          this.accessData=res.data
      })
  },
  methods: {
    // 图片提交
    handleRemove(file, fileList) {
      this.form.fileversionList = fileList
    },
    handlePreview(file, fileList) {
      this.form.fileversionList = fileList
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`)
      this.form.fileversionList = fileList
    },
    // 选择文件
    fileAdd(file) {
        const client = new OSS({
            region: 'oss-cn-beijing',
            accessKeyId: this.accessData.accessKeyId,
            accessKeySecret: this.accessData.accessKeySecret,
            stsToken: this.accessData.securityToken,
            bucket: 'glw-public'
        })
        const fileName ='/app/'+file.file.name
        client.put(fileName, file.file).then(res=>{
            if(res.url){
              this.form.fileversionList.push({
                  'name': fileName,
                  'key':fileName,
                  'size': res.res.size,
                  'url': res.url
                })
              this.form.packageKey = fileName
              this.form.packageUrl = res.url
            }else{
                this.$message.error('文件上传失败')
            }
        }).catch(err=>{
            console.log(err)
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
  .el-upload-list__item-name{
    width: 400px !important;
  }
</style>
