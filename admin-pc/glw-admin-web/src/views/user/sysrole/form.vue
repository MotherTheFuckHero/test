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
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName" maxlength="32" style="width:200px;" />
      </el-form-item>
      <el-form-item label="角色编码" prop="roleCode">
        <el-input v-model="form.roleCode" maxlength="32" style="width: 200px;" />
      </el-form-item>
      <el-form-item label="所属系统" prop="systemId">
        <el-select v-model="form.systemId" clearable style="width: 200px;" placeholder="所属系统">
          <el-option
            v-for="item in systemIdList"
            :key="item.id"
            :label="item.systemName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="角色类型" prop="roleType">
        <el-select v-model="form.roleType" clearable style="width: 200px;" placeholder="角色类型">
          <el-option
            v-for="item in roleTypeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="数据范围" prop="dataScope">
        <el-select v-model="form.dataScope" style="width: 200px" placeholder="请选择数据范围">
          <el-option
            v-for="item in dateScopes"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.dataScope === 3" label="数据权限" :rules="[{ required: true, message: '请选择数据权限', trigger: 'blur' }]" prop="companyIds">
        <el-select v-model="form.companyIds" multiple style="width: 200px" placeholder="请选择数据权限">
          <el-option
            v-for="item in companyList"
            :key="item.id"
            :label="item.companyName"
            :value="item.id"
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
import { getcompanyLists } from '@/api/system/company'
import { roletypeLists, getDataScope } from '@/api/user/sysrole'
const defaultForm = {
  id: null,
  systemId: '',
  roleName: '',
  roleCode: '',
  roleType: '',
  companyIds: [],
  dataScope: 1

}
export default {
  mixins: [form(defaultForm)],
  data() {
    return {
      roleTypeList: [],
      systemIdList: [],
      dateScopes: [],
      companyList: [],
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleCode: [
          { required: true, message: '请输入角色编码', trigger: 'blur' },
          { pattern: /^[0-9a-zA-Z_]+$/, message: '请输入正确的角色编码' }
        ],
        systemId: [
          {
            required: true,
            message: '请选择系统',
            trigger: 'blur'
          }
        ],
        roleType: [
          {
            required: true,
            message: '请选择角色类型',
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
    roletypeLists(data).then(res => {
      this.roleTypeList = res.data
    })
    getDataScope(data).then(res => {
      this.dateScopes = res.data
    })
    getcompanyLists(data).then(res => {
      this.companyList = res.data
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
