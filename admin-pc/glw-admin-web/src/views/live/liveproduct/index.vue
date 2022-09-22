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
      <el-table-column prop="merchantName" label="商家" width="150" />
      <el-table-column prop="productName" label="直播商品" width="150" />
      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['glw_live_product_update','glw_live_product_delete']"
        label="操作"
        width="300px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <udOperation
            :data="scope.row"
            :permission="permission"
            style="display: inline-block"
          />
          <el-button v-permission="['glw_live_product_spec_select']" size="mini" type="primary" @click="specSelect(scope.$index, scope.row)">规格设置</el-button>
          <el-button v-permission="['glw_live_actor_commission_select']" size="mini" type="primary" @click="actorSelect(scope.$index, scope.row)">主播提成</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
    <!--表单渲染-->
    <eForm />

    <el-dialog title="主播提成列表" :visible.sync="actorListVisible">
      <el-button
        v-permission="['glw_live_actor_commission_add']"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="actorAdd"
      >
        新增
      </el-button>
      <el-table :data="resultList">
        <el-table-column property="actorName" label="主播" />
        <el-table-column property="liveProductName" label="商品" width="120" />
        <el-table-column label="类型" prop="type">
          <template slot-scope="scope">
            {{ scope.row.type === 0 ? '总金额': '按件' }}
          </template>
        </el-table-column>
        <el-table-column label="提成" prop="type">
          <template slot-scope="scope">
            {{ scope.row.type === 0 ? '比例:'+scope.row.amount+'%':'佣金:'+scope.row.amount }}
          </template>
        </el-table-column>
        <el-table-column label="创建人" prop="createdUserName" />
        <el-table-column label="创建时间" prop="createdTime" width="140" />
        <el-table-column label="修改人" prop="updatedUserName" />
        <el-table-column label="修改时间" prop="updatedTime" width="140" />
        <el-table-column label="操作" fixed="right" width="180">
          <template slot-scope="scope">
            <el-button v-permission="['glw_live_actor_commission_update']" size="mini" type="primary" plain icon="el-icon-edit" @click="actorEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button v-permission="['glw_live_actor_commission_delete']" size="mini" type="danger" plain icon="el-icon-delete" @click="actorDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog
      width="680px"
      title="主播提成设置"
      :visible.sync="actorVisible"
      append-to-body
    >
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
        <el-form-item label="主播" prop="actorId" style="display: inline-block">
          <el-select v-model="form.actorId" clearable placeholder="主播" style="width: 200px;">
            <el-option
              v-for="item in liveActorList"
              :key="item.id"
              :label="item.nickName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="类型" prop="type" style="display: inline-block">
          <el-select v-model="form.type" clearable placeholder="类型" style="width: 200px;" @change="typeChange">
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.type===0" label="比例" prop="amount" :rules="{required: true,message: '请输入总金额提成比例',trigger: 'blur'}">
          <el-input v-model.number="form.amount" placeholder="比例0-100，如10% 输入10即可(10%即为商品售出总金额的10%)" style="width:505px" />
        </el-form-item>
        <el-form-item v-if="form.type===1" label="佣金" prop="amount" :rules="{required: true,message: '请输入每件商品佣金',trigger: 'blur'}">
          <el-input v-model.number="form.amount" style="width:505px" />
        </el-form-item>
        <el-button
          v-if="adds"
          v-permission="['glw_live_actor_commission_add']"
          class="filter-item"
          type="primary"
          style="float: right;margin:0 40px 20px 0"
          @click="actorAdds('form')"
        >
          添加
        </el-button>
        <el-button
          v-if="edits"
          v-permission="['glw_live_actor_commission_update']"
          class="filter-item"
          type="primary"
          style="float: right;margin:0 40px 20px 0"
          @click="actorEdits('form')"
        >
          完成
        </el-button>
      </el-form>

    </el-dialog>

    <!--    商品规格-->
    <el-dialog title="商品规格列表" :visible.sync="specListVisible">
      <el-button
        v-permission="['glw_live_product_spec']"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="specAdd"
      >
        新增
      </el-button>
      <el-table :data="resultLists">
        <el-table-column property="specName" label="商品规格" width="120" />
        <el-table-column property="sellPrice" label="商品价格" width="120" />
        <el-table-column property="left" label="库存" width="120" />
        <el-table-column label="创建人" prop="createdUserName" />
        <el-table-column label="创建时间" prop="createdTime" width="140" />
        <el-table-column label="修改人" prop="updatedUserName" />
        <el-table-column label="修改时间" prop="updatedTime" width="140" />
        <el-table-column label="操作" fixed="right" width="180">
          <template slot-scope="scope">
            <el-button v-permission="['glw_live_product_spec_update']" size="mini" type="primary" plain icon="el-icon-edit" @click="specEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button v-permission="['glw_live_product_spec_delete']" size="mini" type="danger" plain icon="el-icon-delete" @click="specDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog
      width="680px"
      title="商品规格设置"
      :visible.sync="specVisible"
      append-to-body
    >
      <el-form ref="forms" :model="forms" :rules="ruless" size="small" label-width="100px">
        <el-form-item label="商品规格" prop="specId">
          <el-select v-model="forms.specId" clearable placeholder="商品规格" style="width: 505px;" @change="option">
            <el-option
              v-for="item in specList"
              :key="item.id"
              :label="item.productSpecs"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="售卖价格" prop="sellPrice">
          <el-input v-model.number="forms.sellPrice" style="width:505px" />
        </el-form-item>
        <el-form-item label="库存" prop="left">
          <el-input v-model.number="forms.left" style="width:505px" />
        </el-form-item>
        <el-button
          v-if="adds"
          v-permission="['glw_live_product_spec_add']"
          class="filter-item"
          type="primary"
          style="float: right;margin:0 40px 20px 0"
          @click="specAdds('forms')"
        >
          添加
        </el-button>
        <el-button
          v-if="edits"
          v-permission="['glw_live_product_spec_update']"
          class="filter-item"
          type="primary"
          style="float: right;margin:0 40px 20px 0"
          @click="specEdits('forms')"
        >
          完成
        </el-button>
      </el-form>

    </el-dialog>
  </div>
</template>

<script>
import crudJob, { getliveActorLists, getliveproductActorLists, productActoradd, productActoredit, productActordel, getliveproductspecLists, productspecadd, productspecedit, productspecdel } from '@/api/live/liveproduct'
import { getmultiSpec } from '@/api/product/product'
import eHeader from './header'
import eForm from './form'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'

export default {
  name: '直播商品管理',
  components: { eHeader, eForm, crudOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      title: '直播商品管理',
      url: process.env.VUE_APP_live_API + '/admin/glw_live_product/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      permission: {
        add: ['glw_live_product_add'],
        edit: ['glw_live_product_update'],
        del: ['glw_live_product_delete']
      },
      resultList: [],
      liveActorList: [],

      resultLists: [],
      specList: [],
      typeList: [
        {
          value: 0,
          name: '总金额'
        },
        {
          value: 1,
          name: '按件'
        }
      ],
      actorListVisible: false,
      actorVisible: false,

      specListVisible: false,
      specVisible: false,

      adds: false,
      edits: false,
      form: {
        id: '',
        type: '',
        amount: '',
        actorId: '',
        liveProductId: ''
      },
      forms: {
        id: '',
        liveProductId: '',
        specId: '',
        specName: '',
        sellPrice: '',
        left: ''
      },
      rules: {

        type: [
          {
            required: true,
            message: '请选择提成类型',
            trigger: 'blur'
          }
        ],
        actorId: [
          {
            required: true,
            message: '请选择主播',
            trigger: 'blur'
          }
        ]
      },
      ruless: {

        specId: [
          {
            required: true,
            message: '请选择商品规格',
            trigger: 'blur'
          }
        ],
        sellPrice: [
          {
            required: true,
            message: '请输入商品售卖价格',
            trigger: 'blur'
          }
        ],
        left: [
          {
            required: true,
            message: '请输入商品库存',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    typeChange() {
      this.form.amount = ''
    },
    actorSelect(index, row) {
      var obj = Object.assign({}, row)
      this.form.liveProductId = obj.id
      var data = {
        liveProductId: obj.id
      }
      getliveproductActorLists(data).then(res => {
        var code = res.code
        var msg = res.msg
        if (code === '0') {
          this.resultList = res.data
          this.actorListVisible = true
          const data = {}
          getliveActorLists(data).then(res => {
            this.liveActorList = res.data
          })
        } else {
          this.$message({
            message: msg,
            type: 'warning'
          })
        }
      })
    },
    actorAdd() {
      this.actorVisible = true
      this.adds = true
      this.edits = false
    },
    actorAdds(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          // 判断是否填写完整  --true
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            var data = {
              type: this.form.type,
              amount: this.form.amount,
              actorId: this.form.actorId,
              liveProductId: this.form.liveProductId
            }
            productActoradd(data).then(res => {
              var code = res.code
              var msg = res.msg
              if (code === '0') {
                this.$message({
                  message: msg,
                  type: 'success'
                })
                this.actorListVisible = false
                this.actorVisible = false
              } else {
                this.$message({
                  message: msg,
                  type: 'warning'
                })
              }
            })
          })
        }
      })
    },
    actorEdit(index, row) {
      this.adds = false
      this.edits = true
      var obj = Object.assign({}, row)
      this.form.id = obj.id
      this.form.type = obj.type
      this.form.amount = obj.amount
      this.form.actorId = obj.actorId
      this.form.liveProductId = obj.liveProductId
      this.actorVisible = true
    },
    actorEdits(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          // 判断是否填写完整  --true
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            var data = {
              type: this.form.type,
              amount: this.form.amount,
              actorId: this.form.actorId,
              liveProductId: this.form.liveProductId
            }
            const id = this.form.id
            productActoredit(id, data).then(res => {
              var code = res.code
              var msg = res.msg
              if (code === '0') {
                this.$message({
                  message: msg,
                  type: 'success'
                })
                this.actorListVisible = false
                this.actorVisible = false
              } else {
                this.$message({
                  message: msg,
                  type: 'warning'
                })
              }
            })
          })
        }
      })
    },
    actorDelete(index, row) {
      var obj = Object.assign({}, row)
      var urlId = obj.id
      this.$confirm('确认删除吗？', '提示', {}).then(() => {
        productActordel(urlId).then(res => {
          var code = res.code
          var msg = res.msg
          if (code === '0') {
            this.$message({
              message: msg,
              type: 'success'
            })
            this.actorListVisible = false
          } else {
            this.$message({
              message: msg,
              type: 'warning'
            })
          }
        })
      })
    },

    option(val) {
      for (var i = 0; i < this.specList.length; i++) {
        if (val === this.specList[i].id) {
          this.forms.specName = this.specList[i].productSpecs
        }
      }
    },
    specSelect(index, row) {
      var obj = Object.assign({}, row)
      this.forms.liveProductId = obj.id
      var ProductId = obj.productId
      var data = {
        liveProductId: obj.id
      }
      getliveproductspecLists(data).then(res => {
        var code = res.code
        var msg = res.msg
        if (code === '0') {
          this.resultLists = res.data
          this.specListVisible = true
          getmultiSpec(ProductId).then(res => {
            this.specList = res.data
          })
        } else {
          this.$message({
            message: msg,
            type: 'warning'
          })
        }
      })
    },
    specAdd() {
      this.forms.left = ''
      this.forms.specId = ''
      this.forms.sellPrice = ''
      this.specVisible = true
      this.adds = true
      this.edits = false
    },
    specAdds(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          // 判断是否填写完整  --true
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            var data = {
              left: this.forms.left,
              sellPrice: this.forms.sellPrice,
              specId: this.forms.specId,
              liveProductId: this.forms.liveProductId,
              specName: this.forms.specName
            }
            productspecadd(data).then(res => {
              var code = res.code
              var msg = res.msg
              if (code === '0') {
                this.$message({
                  message: msg,
                  type: 'success'
                })
                this.specListVisible = false
                this.specVisible = false
              } else {
                this.$message({
                  message: msg,
                  type: 'warning'
                })
              }
            })
          })
        }
      })
    },
    specEdit(index, row) {
      this.adds = false
      this.edits = true
      var obj = Object.assign({}, row)
      this.forms.id = obj.id
      this.forms.left = obj.left
      this.forms.sellPrice = obj.sellPrice
      this.forms.specId = obj.specId
      this.forms.specName = obj.specName
      this.forms.liveProductId = obj.liveProductId
      this.specVisible = true
    },
    specEdits(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          // 判断是否填写完整  --true
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            var data = {
              left: this.forms.left,
              sellPrice: this.forms.sellPrice,
              specId: this.forms.specId,
              liveProductId: this.forms.liveProductId,
              specName: this.forms.specName
            }
            const id = this.forms.id
            productspecedit(id, data).then(res => {
              var code = res.code
              var msg = res.msg
              if (code === '0') {
                this.$message({
                  message: msg,
                  type: 'success'
                })
                this.specListVisible = false
                this.specVisible = false
              } else {
                this.$message({
                  message: msg,
                  type: 'warning'
                })
              }
            })
          })
        }
      })
    },
    specDelete(index, row) {
      var obj = Object.assign({}, row)
      var urlId = obj.id
      this.$confirm('确认删除吗？', '提示', {}).then(() => {
        productspecdel(urlId).then(res => {
          var code = res.code
          var msg = res.msg
          if (code === '0') {
            this.$message({
              message: msg,
              type: 'success'
            })
            this.specListVisible = false
          } else {
            this.$message({
              message: msg,
              type: 'warning'
            })
          }
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
  ::v-deep .el-dialog__body{
    padding:30px 20px 40px !important;
  }
</style>
