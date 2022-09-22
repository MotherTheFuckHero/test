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
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="form.name" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="父分类" prop="parentId">
        <el-select v-model="form.parentId" clearable style="width: 200px;">
          <el-option
            v-for="item in parentIdList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="关键字" prop="keyword">
        <el-input v-model="form.keyword" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="排序" prop="sortNo">
        <el-input v-model="form.sortNo" maxlength="32" type="number" style="width: 200px;" @mousewheel.native.prevent />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status" clearable style="width: 200px;" placeholder="状态">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否推荐" prop="isRecommend">
        <el-radio-group v-model="form.isRecommend" style="width: 200px;">
          <el-radio class="radio" :label="true">是</el-radio>
          <el-radio class="radio" :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否企业显示" prop="isEnterprise">
        <el-radio-group v-model="form.isEnterprise" style="width: 200px;">
          <el-radio class="radio" :label="1">是</el-radio>
          <el-radio class="radio" :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="分类图标" prop="icon" style="display: block">
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
import { sysfileAdds } from '@/api/upload'
import CRUD from '@crud/crud'
import { divideGet } from '@/api/product/category'
const defaultForm = {
  id: null,
  parentId: 0,
  name: '',
  languageId: 1,
  keyword: '',
  sortNo: 1,
  level: 1,
  isRecommend: false,
  isEnterprise: 0,
  status: 1,
  remark: '',
  icon: '',
  fileList: []
}

export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      parentIdList: [],
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
            message: '请输入分类名称',
            trigger: 'blur'
          }
        ],
        keyword: [
          {
            required: true,
            message: '请输入关键字',
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
        isRecommend: [
          {
            required: true,
            message: '请选择是否推荐',
            trigger: 'blur'
          }
        ],
        status: [
          {
            required: true,
            message: '请选择是否显示',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    divideGet().then(res => {
      for (var i = 0; i < res.data.length; i++) {
        var pamers = {
          'name': res.data[i].name,
          'id': res.data[i].id
        }
        this.parentIdList.push(pamers)
        // for (var s = 0; s < res.data[i].children.length; s++) {
        //   var childrens = {
        //     'name': res.data[i].children[s].name,
        //     'id': res.data[i].children[s].id
        //   }
        //   this.parentIdList.push(childrens)
        //   for (var ss = 0; ss < res.data[i].children[s].children.length; ss++) {
        //     var childrenss = {
        //       'name': res.data[i].children[s].children[ss].name,
        //       'id': res.data[i].children[s].children[ss].id
        //     }
        //     this.parentIdList.push(childrenss)
        //   }
        // }
      }
    })
  },
  methods: {
    // 新增与编辑提交前做的操作
    [CRUD.HOOK.beforeSubmit](crud, form) {
      if (this.form.parentId === '') {
        this.form.parentId = 0
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
