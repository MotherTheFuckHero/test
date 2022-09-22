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
      <el-form-item label="广告状态" prop="status">
        <el-select v-model="form.status" clearable style="width: 200px;" placeholder="广告状态">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="排序" prop="sortIndex">
        <el-input v-model="form.sortIndex" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="关联地址" prop="link">
        <el-input v-model="form.link" maxlength="128" style="width: 502px;" />
      </el-form-item>
      <!--      <el-form-item label="关联商品" prop="productId">-->
      <!--        <el-select v-model="form.productId" clearable filterable style="width: 200px;" placeholder="关联商品" @change="productIdchange">-->
      <!--          <el-option-->
      <!--            v-for="item in productList"-->
      <!--            :key="item.id"-->
      <!--            :label="item.title"-->
      <!--            :value="item.id"-->
      <!--          />-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="选择规格" prop="productSpecId">-->
      <!--        <el-select v-model="form.productSpecId" clearable filterable style="width: 200px;" placeholder="选择规格">-->
      <!--          <el-option-->
      <!--            v-for="item in specIdList"-->
      <!--            :key="item.id"-->
      <!--            :label="item.productSpecs"-->
      <!--            :value="item.id"-->
      <!--          />-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <el-form-item label="广告图片" prop="cover" style="display: block">
        <el-upload
          v-model="form.cover"
          action="/"
          :http-request="fileAdd"
          :limit="1"
          :file-list="form.fileadvertPicKeyList"
          :on-exceed="handleExceed"
          list-type="picture-card"
          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
          :on-remove="handleRemove"
          value-key="form.cover"
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
import { sysfileAdd } from '@/api/upload'
// import { getproductLists, getproductspecLists } from '@/api/product/product'
const defaultForm = {
  id: null,
  // productId: '',
  // productSpecId: '',
  cover: '',
  status: '',
  sortIndex: 1,
  link: '',
  fileadvertPicKeyList: []
}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      // productList: [],
      // specIdList: [],
      statusList: [
        {
          value: 1,
          name: '使用'
        }, {
          value: 0,
          name: '不使用'
        }
      ],
      rules: {
        status: [
          { required: true, message: '请选择广告状态', trigger: 'blur' }
        ],
        cover: [
          { required: true, message: '请选择广告图片', trigger: 'blur' }
        ],
        link: [
          { required: true, message: '请输入关联地址', trigger: 'blur' }
        ]
        // productId: [
        //   { required: true, message: '请选择关联商品', trigger: 'blur' }
        // ],
        // productSpecId: [
        //   { required: true, message: '请选择商品规格', trigger: 'blur' }
        // ]
      }
    }
  },
  // watch: {
  //   'form.productId': function(newQuestion, oldQuestion) {
  //     if (this.form.productId !== '') {
  //       const data = {
  //         productId: this.form.productId
  //       }
  //       getproductspecLists(data).then(res => {
  //         this.specIdList = res.data
  //       })
  //     }
  //   }
  // },
  // created() {
  //   const datas = {
  //     status: 3
  //   }
  //   getproductLists(datas).then(res => {
  //     this.productList = res.data
  //   })
  // },
  methods: {
    // productIdchange() {
    //   this.form.productSpecId = ''
    // },
    // 图片提交
    handleRemove(file, fileList) {
      this.form.fileadvertPicKeyList = fileList
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`)
      this.form.fileadvertPicKeyList = fileList
    },
    // 选择文件
    fileAdd(fileList) {
      const myfile = fileList
      const file = myfile.file
      var formData = new FormData()
      formData.append('file', file)
      var _this = this
      sysfileAdd(formData).then(res => {
        var code = res.code
        var msg = res.msg
        if (code === '0') {
          _this.form.fileadvertPicKeyList.push({
            'name': res.data.fileName,
            'key': res.data.key,
            'size': res.data.size,
            'url': res.data.url
          })
          _this.form.cover = res.data.url
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
