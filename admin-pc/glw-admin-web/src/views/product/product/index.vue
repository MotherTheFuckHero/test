<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <eHeader :permission="permission" />
      <crudOperation :permission="permission" />
    </div>
    <!--表格渲染-->
    <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
      <el-table-column prop="id" label="编号" width="100" />
      <el-table-column prop="companyName" label="分公司" width="150px" />
      <el-table-column prop="title" label="商品标题" width="150px" />
      <el-table-column prop="productTypeDesc" label="商品类型" width="80px" />
      <el-table-column prop="statusDesc" label="状态" width="80px" />
      <el-table-column prop="merchantName" label="商家" width="150px" />
      <el-table-column prop="catName" label="分类" width="150px" />
      <el-table-column label="费用类型" prop="costTypeDesc" width="100" />
      <el-table-column prop="proportion" label="比例" width="80px" />
      <el-table-column prop="unit" label="单位" width="80px" />
      <el-table-column label="是否多规格" prop="multiSpec" width="80">
        <template slot-scope="scope">
          {{ scope.row.multiSpec === true ? '是': '否' }}
        </template>
      </el-table-column>
      <el-table-column prop="auditOpinion" label="审核意见" width="150px" />
      <el-table-column prop="auditUserName" label="审核人" width="150px" />
      <el-table-column prop="keyword" label="关键字" width="150px" />
      <el-table-column prop="sellPoint" label="商品卖点" :show-overflow-tooltip="true" width="150px" />
      <el-table-column prop="availableDates" label="可用日期" width="150px" />
      <el-table-column prop="cityName" label="城市" width="150px" />
      <el-table-column label="是否跨境" prop="crossBorder" width="100">
        <template slot-scope="scope">
          {{ scope.row.crossBorder === true ? '是': '否' }}
        </template>
      </el-table-column>
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['product_update','product_delete']"
        label="操作"
        width="380px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <udOperation
            v-if="scope.row.productType !==8"
            :data="scope.row"
            :permission="permission"
            style="display: inline-block"
          />
          <el-button v-show="scope.row.status === 3 ? false:true " style="margin: 0 !important;" size="mini" class="filter-item" type="danger" @click="examineEdit(scope.$index, scope.row)">审核</el-button>
          <el-button v-show="scope.row.status === 3 ? true:false " style="margin: 0 !important;" size="mini" class="filter-item" type="danger" @click="takeEdit(scope.$index, scope.row)">下架</el-button>
          <el-button v-permission="['product_update']" style="margin: 0 !important;" size="mini" class="filter-item" type="primary" @click="Editimg(scope.$index, scope.row)">轮播图</el-button>
          <el-dropdown size="mini" split-button type="primary">
            语言操作
            <el-dropdown-menu slot="dropdown" style="text-align: center">
              <el-dropdown-item>
                <el-button v-permission="['product_desc_update']" style="margin: 2px 0" size="mini" class="filter-item" type="primary" @click="productDesc(scope.$index, scope.row)">基本信息语言管理</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button v-permission="['product_spec_update']" style="margin: 2px 0" class="filter-item" type="primary" @click="productspecDesc(scope.$index, scope.row)">规格信息语言管理</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <el-form ref="addForm" :model="addForm" :rules="rules" label-width="100px" class="demo-addForm">
      <el-dialog title="商品审核" :visible.sync="dialogFormVisible" width="600px">
        <el-form-item label="审核结果" prop="status">
          <el-radio-group v-model="addForm.status">
            <el-radio class="radio" :label="3">审核通过</el-radio>
            <el-radio class="radio" :label="4">审核不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核意见" prop="auditOpinion">
          <el-input v-model="addForm.auditOpinion" type="textarea" style="width: 400px;" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForms('addForm')">完成</el-button>
        </el-form-item>
      </el-dialog>
    </el-form>
    <el-dialog title="商品轮播图" :visible.sync="dialogFormimgVisible" width="1250px">
      <!--单规格-->
      <div v-if="multiSpec===false">
        <el-form ref="addForm" :model="addForm" :rules="rules" label-width="120px" class="demo-addForm">
          <el-form-item :label="'规格：'+specName">
            <el-upload
              action="/"
              :http-request="fileAdd"
              :limit="6"
              :file-list="imgList"
              :on-exceed="handleExceed"
              list-type="picture-card"
              accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
              :on-remove="handleRemove"
              multiple
            >
              <em class="el-icon-plus" />
            </el-upload>
          </el-form-item>
        </el-form>
        <el-button style="float: right;margin-right: 25px" type="primary" @click="editImg">完成</el-button>
      </div>
      <!--多规格-->
      <div v-else-if="multiSpec===true" style="padding-bottom:30px ">
        <el-row v-for="(item,index) in imgList" :key="index">
          <p>{{ item.specs }}</p>
          <el-upload
            ref="upload"
            action="/"
            :http-request="fileguigeAdd"
            :data="{'index':index}"
            :limit="6"
            :file-list="item.productImgguigeList"
            :on-exceed="handleguigeExceed"
            list-type="picture-card"
            accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
            :on-remove="handleguigeRemove"
          >
            <em class="el-icon-plus" />
          </el-upload>
        </el-row>
        <el-button style="float: right;margin-right: 25px" type="primary" @click="editImgs">完成</el-button>
      </div>
    </el-dialog>
    <!--分页组件-->
    <pagination />
    <!--表单渲染-->
    <eForm />
    <el-dialog v-if="productDescVisible" title="商品基本信息语言" :visible.sync="productDescVisible" :close-on-click-modal="false" :before-close="handleClose" width="1000px">
      <indexs />
    </el-dialog>
    <el-dialog v-if="productspecDescVisible" title="商品规格信息语言" :visible.sync="productspecDescVisible" :close-on-click-modal="false" :before-close="handleClose" width="1000px">
      <indexss />
    </el-dialog>
  </div>
</template>

<script>
import crudJob, { examinePut, getimgList, editimgList } from '@/api/product/product'
import eHeader from './header'
import eForm from './form'
import indexs from './desc/index'
import indexss from './specdesc/index'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'
import { sysfileAdds } from '@/api/upload'
export default {
  name: '商品列表',
  components: { eHeader, eForm, crudOperation, pagination, udOperation, indexs,indexss },
  cruds() {
    return CRUD({
      title: '商品管理',
      url: 'admin/product/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      productDescVisible: false,
      productspecDescVisible: false,
      imgList: [],
      productImgguigeList: [],
      specList: [],
      addForm: {
        id: '',
        status: 3,
        auditOpinion: ''
      },
      productSpecUserGradeListVisible: false,
      rules: {
        status: [
          {
            required: true,
            message: '请选择审核结果',
            trigger: 'blur'
          }
        ],
        auditOpinion: [
          {
            required: true,
            message: '请输入审核意见',
            trigger: 'blur'
          }
        ]
      },
      dialogFormVisible: false,
      dialogFormimgVisible: false,
      multiSpec: false,
      specName: '',
      permission: {
        add: ['product_add'],
        edit: ['product_update'],
        del: ['product_delete']
      }
    }
  },
  methods: {
    productDesc(index, row) {
      var obj = Object.assign({}, row)
      localStorage.setItem('productId', JSON.stringify(obj.id))
      this.productDescVisible = true
    },
    productspecDesc(index, row) {
      var obj = Object.assign({}, row)
      localStorage.setItem('productId', JSON.stringify(obj.id))
      this.productspecDescVisible = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 下架
    takeEdit(index, row) {
      var obj = Object.assign({}, row)
      this.addForm.id = obj.id
      var urlId = this.addForm.id
      var _this = this
      var data = {
        status: 5,
        auditOpinion: '审核下架'
      }
      this.$confirm('确认下架此商品吗？', '提示', {}).then(() => {
        examinePut(urlId, data)
          .then(
            function(response) {
              var code = response.code
              var msg = response.msg
              if (code === '0') {
                _this.$message({
                  message: '下架成功',
                  type: 'success'
                })
                _this.crud.refresh()
              } else {
                _this.$message({
                  message: msg,
                  type: 'warning'
                })
              }
            })
      })
    },

    // 审核
    examineEdit(index, row) {
      this.dialogFormVisible = !this.dialogFormVisible
      var obj = Object.assign({}, row)
      this.addForm.id = obj.id
    },
    // 状态审核
    submitForms(addForm) {
      this.$refs[addForm].validate(valid => {
        if (valid) {
          // 判断是否填写完整  --true
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            var urlId = this.addForm.id
            var data = {
              status: this.addForm.status,
              auditOpinion: this.addForm.auditOpinion
            }
            var _this = this
            examinePut(urlId, data)
              .then(
                function(response) {
                  var code = response.code
                  var msg = response.msg
                  if (code === '0') {
                    _this.$message({
                      message: '审核完成',
                      type: 'success'
                    })
                    _this.dialogFormVisible = false
                    _this.crud.refresh()
                    _this.addForm.status = ''
                    _this.addForm.auditOpinion = ''
                  } else {
                    _this.$message({
                      message: msg,
                      type: 'warning'
                    })
                  }
                })
          })
        } else {
          return false
        }
      })
    },
    /* 轮播图查询*/
    Editimg(index, row) {
      var obj = Object.assign({}, row)
      this.multiSpec = obj.multiSpec
      this.addForm.id = obj.id
      getimgList(this.addForm.id).then(res => {
        this.specList = res.data
        this.dialogFormimgVisible = true
        if (this.multiSpec === false) {
          this.specName = res.data[0].specs
          this.imgList = []
          for (var d = 0; d < res.data.length; d++) {
            this.imgList.push({
              'key': res.data[d].image,
              'url': res.data[d].imageUrl,
              'status': res.data[d].status,
              'id': res.data[d].id,
              'specId': res.data[d].specId,
              'specs': res.data[d].specs,
              'productId': res.data[d].productId,
              'languageId': res.data[d].languageId,
              'defaultShow': res.data[d].defaultShow,
              'sortNo': res.data[d].sortNo
            })
          }
        } else if (this.multiSpec === true) {
          this.imgList = []
          var arr = []
          var newArr = []
          var neWArr = []
          for (var i = 0; i < res.data.length; i++) {
            arr.push(res.data[i].specId)
            for (var s in arr) {
              if (newArr.indexOf(arr[s]) === -1) {
                newArr.push(arr[s])
                neWArr.push({ 'specId': arr[s], 'productImgguigeList': [], 'specs': '', 'productId': '', 'languageId': '', 'defaultShow': '', 'sortNo': '', 'status': '' })
              }
            }
            for (var n = 0; n < newArr.length; n++) {
              if (newArr[n] === res.data[i].specId) {
                neWArr[n].specs = res.data[i].specs
                neWArr[n].productId = res.data[i].productId
                neWArr[n].languageId = res.data[i].languageId
                neWArr[n].defaultShow = res.data[i].defaultShow
                neWArr[n].sortNo = res.data[i].sortNo
                neWArr[n].status = res.data[i].status
                neWArr[n].productImgguigeList.push({
                  'id': res.data[i].id,
                  'specId': res.data[i].specId,
                  'specs': res.data[i].specs,
                  'productId': res.data[i].productId,
                  'languageId': res.data[i].languageId,
                  'defaultShow': res.data[i].defaultShow,
                  'sortNo': res.data[i].sortNo,
                  'status': res.data[i].status,
                  'url': res.data[i].imageUrl,
                  'key': res.data[i].image
                })
              }
            }
            this.imgList = neWArr
          }
        }
      })
    },

    /* 轮播图修改*/
    editImg() {
      const data = this.imgList
      editimgList(this.addForm.id, data).then(res => {
        var code = res.code
        var msg = res.msg
        if (code === '0') {
          this.$message({
            message: msg,
            type: 'success'
          })
          this.dialogFormimgVisible = false
          this.crud.refresh()
        } else {
          this.$message({
            message: msg,
            type: 'warning'
          })
        }
      })
    },
    // 图片提交
    handleRemove(file, fileList) {
      this.imgList = fileList
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 6 个文件`)
      this.imgList = fileList
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
          _this.imgList.push({
            'name': res.data.fileName,
            'image': res.data.key,
            'size': res.data.size,
            'url': res.data.url,
            'status': this.specList[0].status,
            'specId': this.specList[0].specId,
            'productId': this.specList[0].productId,
            'languageId': this.specList[0].languageId,
            'defaultShow': this.specList[0].defaultShow,
            'sortNo': this.specList[0].sortNo
          })
        } else {
          _this.$message({
            message: msg,
            type: 'warning'
          })
        }
      })
    },
    // 多规格商品轮播图删除
    handleguigeRemove(file, productImgList, index) {
      this.productImgguigeList.splice(file, 1)
    },
    handleguigeExceed(files, productImgList) {
      this.$message.warning(`当前限制选择 6 个文件`)
      this.productImgguigeList = productImgList
    },

    // 多规格商品轮播图添加
    fileguigeAdd(productImgList) {
      const myfile = productImgList
      const file = myfile.file
      var formData = new FormData()
      formData.append('file', file)
      var _this = this
      var specId = ''
      var defaultShow = ''
      var sortNo = ''
      var languageId = ''
      var status = ''
      var newimgList = []
      sysfileAdds(formData)
        .then(
          function(response) {
            for (var i = 0; i < _this.imgList.length; i++) {
              const index = myfile.data.index
              specId = _this.imgList[index].specId
              defaultShow = _this.imgList[index].defaultShow
              sortNo = _this.imgList[index].sortNo
              languageId = _this.imgList[index].languageId
              status = _this.imgList[index].status
              newimgList = _this.imgList[index]
            }
            var params = {
              'languageId': languageId,
              'status': status,
              'sortNo': sortNo,
              'defaultShow': defaultShow,
              'specId': specId,
              'image': response.data.key,
              'url': response.data.url
            }
            newimgList.productImgguigeList.push(params)
          })
    },
    /* 多规格轮播图修改*/
    editImgs() {
      var newimgLis = []
      for (var i = 0; i < this.imgList.length; i++) {
        for (var s = 0; s < this.imgList[i].productImgguigeList.length; s++) {
          newimgLis.push(this.imgList[i].productImgguigeList[s])
        }
      }
      const data = newimgLis
      editimgList(this.addForm.id, data).then(res => {
        var code = res.code
        var msg = res.msg
        if (code === '0') {
          this.$message({
            message: msg,
            type: 'success'
          })
          this.dialogFormimgVisible = false
          this.crud.refresh()
        } else {
          this.$message({
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
