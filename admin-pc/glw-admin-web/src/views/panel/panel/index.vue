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
      <el-table-column prop="companyName" label="分公司" width="100px" />
      <el-table-column prop="name" label="板块名称" width="100px" />
      <el-table-column label="板块图标" prop="iconUrl" width="150">
        <template slot-scope="scope">
          <a v-show="scope.row.iconUrl === null ? false: true " :href="scope.row.iconUrl"><img alt="" :src="scope.row.iconUrl" width="40" height="40"></a>
        </template>
      </el-table-column>
      <el-table-column prop="styleName" label="样式" width="100px" />
      <el-table-column prop="statusDesc" label="状态" width="100px" />
      <el-table-column prop="sortNo" label="排序" width="100px" />
      <el-table-column prop="limitNum" label="板块显示数量" width="150px" />
      <el-table-column prop="typeDesc" label="类型" width="100px" />
      <el-table-column prop="systemName" label="系统名称" width="150px" />
      <el-table-column prop="parentName" label="父板块" width="150px" />
      <el-table-column prop="languageName" label="语言" width="100px" />
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['panel_update','panel_delete']"
        label="操作"
        width="320px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <udOperation
            :data="scope.row"
            :permission="permission"
            style="display: inline-block"
          />
          <el-button v-if="scope.row.type===2" v-permission="['panel_update']" size="mini" type="primary" @click="panelProductedit(scope.$index, scope.row)">商品类型限制</el-button>
          <el-button v-permission="['panel_desc_select']" style="display: inline-block;margin: 0px !important;" size="mini" type="primary" @click="panelDesc(scope.row)">语言管理</el-button>

        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
    <!--表单渲染-->
    <eForm />
    <el-dialog v-if="panelDescVisible" title="分公司语言" :visible.sync="panelDescVisible" :close-on-click-modal="false" :before-close="handleClose" width="1000px">
      <indexs />
    </el-dialog>
    <el-form ref="addForm" :model="addForm" :rules="rules" label-width="100px" class="demo-addForm">
      <el-dialog title="商品类型限制" :visible.sync="dialogFormVisible" width="600px">
        <el-form-item label="商品类型" prop="productTypeList">
          <el-select v-model="addForm.productTypeList" multiple clearable style="width: 450px;">
            <el-option
              v-for="item in productTypeLists"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="float: right" @click="submitForms('addForm')">完成</el-button>
        </el-form-item>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
import crudJob, { getproductpanel, productpaneledit } from '@/api/panel/panel'
import eHeader from './header'
import eForm from './form'
import indexs from './desc/index'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'
import { ProductTypeList } from '@/api/product/product'
export default {
  name: '板块列表',
  components: { eHeader, eForm, crudOperation, pagination, udOperation, indexs },
  cruds() {
    return CRUD({
      title: '板块管理',
      url: 'admin/panel/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      dialogFormVisible: false,
      panelDescVisible: false,
      productTypeLists: [],
      permission: {
        add: ['panel_add'],
        edit: ['panel_update'],
        del: ['panel_delete']
      },
      addForm: {
        id: '',
        productTypeList: []
      },
      rules: {
        // productTypeList: [
        //     {
        //         required: true,
        //         message: '请选择限制商品类型',
        //         trigger: 'blur'
        //     }
        // ]
      }
    }
  },
  methods: {
    panelDesc(row) {
      var obj = Object.assign({}, row)
      localStorage.setItem('panelId', JSON.stringify(obj.id))
      this.panelDescVisible = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    panelProductedit(index, row) {
      var obj = Object.assign({}, row)
      this.addForm.id = obj.id
      this.dialogFormVisible = true
      const data = {
        status: 1
      }
      ProductTypeList(data).then(res => {
        this.productTypeLists = res.data
      })
      const newproductTypeList = []
      getproductpanel(this.addForm.id).then(res => {
        for (var i = 0; i < res.data.length; i++) {
          newproductTypeList.push(res.data[i].productType)
        }
        this.addForm.productTypeList = newproductTypeList
      })
    },
    // 状态审核
    submitForms(addForm) {
      this.$refs[addForm].validate(valid => {
        if (valid) {
          // 判断是否填写完整  --true
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            var urlId = this.addForm.id
            var data = {
              productTypeList: this.addForm.productTypeList
            }
            var _this = this
            productpaneledit(urlId, data)
              .then(
                function(response) {
                  var code = response.code
                  var msg = response.msg
                  if (code === '0') {
                    _this.$message({
                      message: msg,
                      type: 'success'
                    })
                    _this.dialogFormVisible = false
                    _this.crud.refresh()
                  } else {
                    this.$message({
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
