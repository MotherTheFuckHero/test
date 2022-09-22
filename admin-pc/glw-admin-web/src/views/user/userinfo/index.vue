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
      <el-table-column prop="userName" label="用户名称" width="150px" />
      <el-table-column prop="nickName" label="用户昵称" width="150px" />
      <el-table-column prop="phone" label="用户手机号" width="150px" />
      <el-table-column prop="userTypeDesc" label="用户类型" width="150px" />
      <el-table-column prop="sexDesc" label="性别" width="100px" />
      <el-table-column prop="wallet.wallet" label="钱包余额" width="150px" />
      <el-table-column prop="wallet.userIntegral" label="积分余额" width="150px" />
      <el-table-column prop="realName" label="真实姓名" width="100px" />
      <el-table-column prop="email" label="邮箱" width="150px" />
      <el-table-column prop="sourceDesc" label="用户来源" width="150px" />
      <el-table-column prop="unionId" label="union编号" width="150px" />

      <el-table-column label="创建人" prop="createdUserName" width="200" />
      <el-table-column label="创建时间" prop="createdTime" width="200" />
      <el-table-column label="修改人" prop="updatedUserName" width="200" />
      <el-table-column label="修改时间" prop="updatedTime" width="200" />
      <!--   编辑与删除   -->
      <el-table-column
        v-permission="['user_info_update','user_info_delete']"
        label="操作"
        width="340px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <uOperation
            :data="scope.row"
            :permission="permission"
            style="display: inline"
          />
          <el-button v-permission="['user_info_update']" size="mini" type="primary" @click="passwordEdit(scope.$index, scope.row)">重置密码</el-button>
          <el-button v-if="scope.row.userTypeList.includes(2) || scope.row.userTypeList.includes(3) ? true:false " v-permission="['user_info_update']" style="margin: 0" size="mini" type="primary" @click="userEdit(scope.$index, scope.row)">角色分配</el-button>
          <el-button v-if="scope.row.userTypeList.includes(2) ? true:false " v-permission="['user_info_update']" style="margin: 0" size="mini" type="primary" @click="companyEdit(scope.$index, scope.row)">分公司分配</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
    <!--表单渲染-->
    <eForm />
    <el-form ref="addForm" :model="addForm" :rules="rules" label-width="100px" class="demo-addForm">
      <el-dialog title="重置密码" :visible.sync="visiblepassword" width="600px">
        <el-form-item label="新密码" prop="newPassword">
          <el-input id="password" v-model="addForm.newPassword" :type="type" style="width:400px;top:0;position: absolute" />
          <a v-if="addForm.newPassword!==''" id="passwordeye" href="#" :class="newClass" @click="showinvisible($event)" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="float: right;margin-right:50px" @click="submitForm('addForm')">完成</el-button>
        </el-form-item>
      </el-dialog>
    </el-form>
    <el-form ref="addForm" :model="addForm" :rules="ruless" label-width="100px" class="demo-addForm">
      <el-dialog title="角色分配" :visible.sync="visiblerole" width="680px">
        <el-form-item label="系统" prop="systemId">
          <el-select v-model="addForm.systemId" style="width: 500px" clearable @change="sysqiehuan">
            <el-option
              v-for="item in systemIdList"
              :key="item.id"
              :label="item.systemName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="角色列表" prop="roleIdList">
          <el-select v-model="addForm.roleIdList" style="width: 500px" multiple>
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="float: right;margin-right:50px" @click="submitroleForm('addForm')">完成</el-button>
        </el-form-item>
      </el-dialog>
    </el-form>

    <el-form ref="addForm" :model="addForm" :rules="rules" label-width="100px" class="demo-addForm">
      <el-dialog title="分公司分配" :visible.sync="visiblecompanyId" width="600px">
        <el-form-item label="分公司" prop="companyIdList">
          <el-select v-model="addForm.companyIdList" style="width: 450px" multiple>
            <el-option
              v-for="item in companyIdLists"
              :key="item.id"
              :label="item.companyName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="float: right;margin-right:50px" @click="submitcompanyIdForm('addForm')">完成</el-button>
        </el-form-item>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
import crudJob, { userpassword } from '@/api/user/userinfo'
import { rolePut, getsysroleLists, getuserrole } from '@/api/user/sysrole'
import { getsystemLists } from '@/api/system/sys'
import { getcompanyLists } from '@/api/system/company'
import { companyGet, companyPut } from '@/api/user/userinfo'
import eHeader from './header'
import eForm from './form'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import uOperation from '@crud/U.operation'
export default {
  name: '用户列表',
  components: { eHeader, eForm, crudOperation, pagination, uOperation },
  cruds() {
    return CRUD({
      title: '用户管理',
      url: 'admin/user_info/page_list',
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  data() {
    return {
      id: '',
      newClass: 'invisible',
      type: 'password',
      visiblepassword: false,
      visiblerole: false,
      visiblecompanyId: false,
      systemIdList: [],
      companyIdLists: [],
      roleList: [],
      roleIdList: [],
      addForm: {
        newPassword: '',
        systemId: '',
        userName: '',
        roleIdList: [],
        companyIdList: []
      },
      rules: {
        newPassword: [
          {
            required: true,
            message: '请输入新密码',
            trigger: 'blur'
          },
          { pattern: /^[0-9a-zA-Z.]+$/, message: '请输入正确的用户密码' }
        ]
      },
      ruless: {
        systemId: [
          {
            required: true,
            message: '请选择系统',
            trigger: 'blur'
          }
        ],
        roleIdList: [
          {
            required: true,
            message: '请选择角色',
            trigger: 'blur'
          }
        ]
      },
      permission: {
        add: ['user_info_add'],
        edit: ['user_info_update'],
        del: ['user_info_delete']
      }
    }
  },
  watch: {
    'addForm.systemId': function(newQuestion, oldQuestion) {
      var _this = this
      const datas = {
        status: 1,
        systemId: _this.addForm.systemId
      }
      getsysroleLists(datas)
        .then(
          function(response) {
            _this.roleList = response.data
            _this.addForm.roleIdList = []
            for (var i = 0; i < _this.roleIdList.length; i++) {
              if (_this.addForm.systemId === _this.roleIdList[i].systemId) {
                _this.addForm.roleIdList.push(_this.roleIdList[i].roleId)
              }
            }
          })
    }
  },
  methods: {
    passwordEdit(index, row) {
      var obj = Object.assign({}, row)
      this.id = obj.id
      this.visiblepassword = true
    },
    submitForm(addForm) {
      this.$refs[addForm].validate(valid => {
        if (valid) {
          // 判断是否填写完整  --true
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            var data = {
              userId: this.id,
              newPassword: this.$md5(this.addForm.newPassword)
            }
            var id = this.id
            userpassword(id, data)
              .then(
                function(response) {
                  var code = response.code
                  var msg = response.msg
                  if (code === '0') {
                    this.$message({
                      message: msg,
                      type: 'success'
                    })
                    this.addForm.newPassword = ''
                    this.visiblepassword = false
                  } else {
                    this.$message({
                      message: msg,
                      type: 'warning'
                    })
                  }
                }.bind(this)
              )
          })
        }
      })
    },
    sysqiehuan() {
      this.addForm.roleIdList = []
    },
    companyEdit(index, row) {
      var obj = Object.assign({}, row)
      this.id = obj.id
      this.addForm.userName = obj.userName
      this.visiblecompanyId = true
      const data = {
        status: 1
      }
      getcompanyLists(data).then(res => {
        this.companyIdLists = res.data
      })
      this.addForm.companyIdList = []
      companyGet(this.id).then(res => {
        for (var i = 0; i < res.data.length; i++) {
          this.addForm.companyIdList.push(res.data[i].companyId)
        }
      })
    },
    submitcompanyIdForm(addForm) {
      this.$refs[addForm].validate(valid => {
        if (valid) {
          // 判断是否填写完整  --true
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            var data = {
              id: this.id,
              userName: this.addForm.userName,
              systemId: this.addForm.systemId,
              companyIdList: this.addForm.companyIdList
            }
            var id = this.id
            companyPut(id, data)
              .then(
                function(response) {
                  var code = response.code
                  var msg = response.msg
                  if (code === '0') {
                    this.$message({
                      message: msg,
                      type: 'success'
                    })
                    this.addForm.companyIdList = []
                    this.visiblecompanyId = false
                  } else {
                    this.$message({
                      message: msg,
                      type: 'warning'
                    })
                  }
                }.bind(this)
              )
          })
        }
      })
    },
    userEdit(index, row) {
      var obj = Object.assign({}, row)
      this.id = obj.id
      this.addForm.userName = obj.userName
      this.addForm.systemId = ''
      this.roleIdList = []
      this.addForm.roleIdList = []
      getuserrole(this.id).then(res => {
        const newdata = res.data
        if (newdata.length > 0) {
          this.addForm.systemId = res.data[0].systemId
          this.addForm.roleIdList = []
          this.roleIdList = res.data
        } else {
          this.addForm.systemId = ''
          this.addForm.roleIdList = []
        }
      })
      this.visiblerole = true
      const data = {
        status: 1
      }
      getsystemLists(data).then(res => {
        this.systemIdList = res.data
      })
    },
    submitroleForm(addForm) {
      this.$refs[addForm].validate(valid => {
        if (valid) {
          // 判断是否填写完整  --true
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            var data = {
              id: this.id,
              userName: this.addForm.userName,
              systemId: this.addForm.systemId,
              roleIdList: this.addForm.roleIdList
            }
            var id = this.id
            rolePut(id, data)
              .then(
                function(response) {
                  var code = response.code
                  var msg = response.msg
                  if (code === '0') {
                    this.$message({
                      message: msg,
                      type: 'success'
                    })
                    this.addForm.systemId = ''
                    this.addForm.roleIdList = []
                    this.roleIdList = []
                    this.visiblerole = false
                  } else {
                    this.$message({
                      message: msg,
                      type: 'warning'
                    })
                  }
                }.bind(this)
              )
          })
        }
      })
    },
    showinvisible(e) {
      var s = e.currentTarget.getAttributeNode('class').value
      if (s === 'invisible') {
        this.newClass = 'invisibles'
        this.type = ''
      } else {
        this.newClass = 'invisible'
        this.type = 'password'
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
  .invisible {
    background-image: url(../../../assets/images/hide.png);
    background-size: 100% 100%;
    position: absolute;
    top:0;
    right: 20px;
    display: inline-block;
    height: 32px;
    width:32px;
    opacity: 0.7;
  }
  .invisibles {
    background-image: url(../../../assets/images/show.png);
    background-size: 100% 100%;
    position: absolute;
    top:0;
    right: 20px;
    display: inline-block;
    height: 32px;
    width:32px;
    opacity: 0.7;
  }
</style>
