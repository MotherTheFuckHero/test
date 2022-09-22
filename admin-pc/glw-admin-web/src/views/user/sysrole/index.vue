<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-input v-model="query.roleName" size="small" clearable placeholder="输入名称或者描述搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <!--        <date-range-picker v-model="query.createdTime" class="date-item" />-->
        <rrOperation />
      </div>
      <crudOperation :permission="permission" />
    </div>
    <el-row :gutter="15">
      <!--角色管理-->
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="17" style="margin-bottom: 10px">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span class="role-span">角色列表</span>
          </div>
          <el-table ref="table" v-loading="crud.loading" highlight-current-row style="width: 100%;" :data="crud.data" @selection-change="crud.selectionChangeHandler" @current-change="handleCurrentChange">
            <!--            <el-table-column :selectable="checkboxT" type="selection" width="55" />-->
            <el-table-column prop="roleName" label="名称" />
            <el-table-column prop="roleCode" label="编码" />
            <el-table-column prop="roleTypeDesc" label="角色类型" />
            <el-table-column prop="dataScopeDesc" label="数据权限" />
            <el-table-column :show-overflow-tooltip="true" width="135px" prop="createdTime" label="创建日期">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.createdTime) }}</span>
              </template>
            </el-table-column>
            <el-table-column v-permission="['sys_role_update','sys_role_delete']" label="操作" width="130px" align="center" fixed="right">
              <template slot-scope="scope">
                <udOperation
                  :data="scope.row"
                  :permission="permission"
                />
              </template>
            </el-table-column>
          </el-table>
          <!--分页组件-->
          <pagination />
        </el-card>
      </el-col>
      <!-- 菜单授权 -->
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="7">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <el-tooltip class="item" effect="dark" content="选择指定角色分配菜单" placement="top">
              <span class="role-span">菜单分配</span>
            </el-tooltip>
            <el-button
              v-permission="['sys_role_resource_update']"
              :disabled="!showButton"
              :loading="menuLoading"
              icon="el-icon-check"
              size="mini"
              style="float: right; padding: 6px 9px"
              type="primary"
              @click="saveMenu"
            >保存</el-button>
          </div>
          <el-tree
            ref="menu"
            :data="menus"
            :default-checked-keys="menuIds"
            :props="defaultProps"
            node-key="id"
            show-checkbox
            :check-strictly="strictlys"
            @node-click="menuChange"
            @check-change="menuChanges"
          />
        </el-card>
      </el-col>
    </el-row>
    <eForm />
  </div>
</template>

<script>
import crudRoles from '@/api/user/sysrole'
import eForm from './form'
import { getMenusByPid } from '@/api/user/sysresource'
import CRUD, { presenter, header, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'
export default {
  name: '角色列表',
  components: { pagination, crudOperation, eForm, rrOperation, udOperation },
  cruds() {
    return CRUD({ title: '角色', url: 'admin/sys_role/page_list', crudMethod: { ...crudRoles }})
  },
  mixins: [presenter(), header(), crud()],
  data() {
    return {
      defaultProps: { children: 'children', label: 'resourceName', isLeaf: 'leaf' },
      currentId: 0, menuLoading: false, showButton: false, strictlys: true,
      menus: [], menuIds: [], resourceIds: [],

      permission: {
        add: ['sys_role_add'],
        edit: ['sys_role_update'],
        del: ['sys_role_delete']
      }
    }
  },
  created() {
    const id = 0
    const data = {
      systemId: ''
    }
    getMenusByPid(id, data).then(res => {
      this.menus = res.data
    })
  },
  methods: {
    // 触发单选
    handleCurrentChange(val) {
      if (val) {
        console.log(val)
        const _this = this
        _this.showButton = true
        _this.strictlys = true
        // 清空菜单的选中
        this.$refs.menu.setCheckedKeys([])
        // const tree = this.$refs.menu
        // for (var i = 0; i < tree.$children.length; i++) {
        //   tree.$children[i].expanded = false
        // }
        this.menus = []
        const id = 0
        const data = {
          systemId: val.systemId
        }
        getMenusByPid(id, data).then(res => {
          this.menus = res.data
        })
        // 保存当前的角色id
        this.currentId = val.id
        // 初始化默认选中的key
        crudRoles.getRoleResource(this.currentId).then(res => {
          const resList = []
          for (let i = 0; i < res.data.length; i++) {
            _this.menuIds = []
            resList.push(res.data[i].resourceId)
          }
          _this.menuIds = resList
        })
      }
    },
    menuChange(menu) {
      this.strictlys = false
      // 判断是否在 menuIds 中，如果存在则删除，否则添加
      const index = this.menuIds.indexOf(menu.id)
      if (index !== -1) {
        this.menuIds.splice(index, 1)
      } else {
        this.menuIds.push(menu.id)
      }
    },
    menuChanges(menu) {
      this.strictlys = false
    },
    // 保存菜单
    saveMenu() {
      this.menuLoading = true
      const roleId = this.currentId
      /* 未选择全部子菜单时获取父菜单id*/
      const fuId = this.$refs.menu.getHalfCheckedKeys()
      /* 全部菜单id*/
      const homeId = this.$refs.menu.getCheckedKeys()
      const data = {
        resourceIds: homeId.concat(fuId)
      }
      crudRoles.editRoleResource(roleId, data).then(() => {
        this.crud.notify('保存成功', CRUD.NOTIFICATION_TYPE.SUCCESS)
        this.menuLoading = false
        this.strictlys = true
        this.$refs.menu.setCheckedKeys([])
        const tree = this.$refs.menu
        for (var i = 0; i < tree.$children.length; i++) {
          tree.$children[i].expanded = false
        }
        this.resourceIds = []
        setTimeout(() => {
          location.reload()
        }, 1000)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .role-span {
    font-weight: bold;color: #303133;
    font-size: 15px;
  }

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
  ::v-deep .vue-treeselect__multi-value{
    margin-bottom: 0;
  }
  ::v-deep .vue-treeselect__multi-value-item{
    border: 0;
    padding: 0;
  }
</style>
<style>
  .vue-treeselect--single .vue-treeselect__input{
    display: none;
  }
  .el-tree-node__content>.el-tree-node__expand-icon{
    display: none !important;
  }
</style>
