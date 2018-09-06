<template>
  <div class="userlist">
    <div class="searchBox">
      <div class="searchBoxLeft">
        <div class="box" >
          <span>姓名：</span>
          <el-input class="searchText" v-model="name" clearable></el-input>
        </div>
        <div class="box">
          <el-button @click="handleSearch" type="primary" class="searchBtn">查询</el-button>
        </div>
      </div>
        <div class="box" style="align-self:flex-end;">
          <el-button  @click="dialogFormVisible = true" type="primary" class="addhBtn">新增用户</el-button>
        </div>
    </div>

      <div class="tableBox">
        <div class="table" ref="table">
         <el-table
           :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
           stripe
           style="width: 100%">
           <el-table-column
             label-class-name="gray"
             prop="name"
             label="姓名"
             align="center">
           </el-table-column>
           <el-table-column
             label-class-name="gray"
             prop="phone"
             label="电话"
             align="center">
           </el-table-column>
           <el-table-column
             label-class-name="gray"
             prop="email"
             label="邮箱"
             align="center">
           </el-table-column>
           <el-table-column
             class-name="blue"
             label-class-name="gray"
             prop="channel_type"
             label="操作"
             align="center">
              <template slot-scope="scope">
               <span @click="handleShowModify(scope.row)">修改</span>
               <span>|</span>
               <span @click="handleShowDel(scope.row)">删除</span>
            </template>
           </el-table-column>
         </el-table>
        </div>
        <div class="pagination" v-show="showPagination">
          <el-pagination
             @current-change="handleCurrentChange"
             :current-page="currentPage"
             :page-size="pagesize"
             layout="total, prev, pager, next, jumper"
             :total="tableData.length">
         </el-pagination>
        </div>

        <!-- 增加框 -->
        <el-dialog title="增加用户" :visible.sync="dialogFormVisible" width="500px">
          <el-form :model="form">
            <el-form-item label="姓名：" :label-width="formLabelWidth">
              <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话：" :label-width="formLabelWidth">
              <el-input v-model="form.phone" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" :label-width="formLabelWidth">
              <el-input v-model="form.mail" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleAddUser">确 定</el-button>
          </div>
        </el-dialog>

        <!-- 修改框 -->
        <el-dialog title="修改用户" :visible.sync="modDialog" width="500px">
          <el-form :model="modForm">
            <el-form-item label="姓名：" :label-width="formLabelWidth">
              <el-input v-model="modForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话：" :label-width="formLabelWidth">
              <el-input v-model="modForm.phone" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" :label-width="formLabelWidth">
              <el-input v-model="modForm.mail" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="modDialog = false">取 消</el-button>
            <el-button type="primary" @click="handleModUser">确 定</el-button>
          </div>
        </el-dialog>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Userlist',
  inject: ['reload'],
  data () {
    return {
      name: '',
      tableData: [],
      total: 0,
      currentPage: 1,
      pagesize: 10,
      dialogFormVisible: false,
      form: {
        name: '',
        phone: '',
        mail: ''
      },
      modDialog: false,
      modForm: {
        name: '',
        phone: '',
        mail: ''
      },
      id: '',
      delId: '',
      formLabelWidth: '80px'
    }
  },
  computed: {
    showPagination () {
      if (this.tableData.length) {
        return this.tableData.length > 0
      } else {
        return false
      }
    }
  },
  mounted () {
    this.getUserlist()
  },
  methods: {
    getUserlist (name) {
      let data = {}
      if (name !== '') {
        data = {
          name: name
        }
      }
      axios.get('/api/users', {
        params: data
      }).then((res) => {
        this.tableData = res.data
      }).catch((err) => { console.log(err) })
    },
    addUser (name, phone, mail) {
      axios.post('/api/users', {
        phone: phone,
        name: name,
        mail: mail
      })
        .then((res) => {
          console.log(res)
        })
        .catch(function (err) { console.log(err) })
    },
    updateUser (id, name, phone, mail) {
      axios.put('/api/users/' + id, {
        phone: phone,
        name: name,
        mail: mail
      })
        .then((res) => {
          console.log(res)
        })
        .catch(function (err) { console.log(err) })
    },
    deleteUser (id) {
      axios.delete('/api/users/' + id)
        .then((res) => {
          console.log(res)
        })
        .catch(function (err) { console.log(err) })
    },
    handleSearch () {
      this.getUserlist(this.name)
    },
    handleCurrentChange: function (currentPage) {
      // console.log(currentPage)
      this.currentPage = currentPage
      this.getUserInfo(currentPage, this.name, this.phone)
    },
    handleShowModify (data) {
      console.log(data)
      this.modForm.name = data.name
      this.modForm.phone = data.phone
      this.modForm.mail = data.mail
      this.id = data.id
      console.log(this.id)
      this.modDialog = true
    },
    handleShowDel (data) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteUser(data.id)
        this.reload()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleModify () {
      if (this.modRole.length > 1) {
        this.modRole = this.roles.filter(v => v.role_name === this.modRole)[0].role_id
      }
      console.log(this.modRole)
      this.updateUser(this.userId, this.modName, this.modPhone, this.modRole)
    },
    handleAddUser () {
      this.addUser(this.form.name, this.form.phone, this.form.mail)
      this.dialogFormVisible = false
      this.reload()
    },
    handleModUser () {
      this.updateUser(this.id, this.modForm.name, this.modForm.phone, this.modForm.mail)
      this.modDialog = false
      this.reload()
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.userlist
  width 1140px
  margin 20px auto 0
  .searchBox
    display flex
    flex-direction: row
    flex-wrap nowrap
    justify-content: space-between
    align-items: flex-start
    margin-bottom 20px
    .searchBoxLeft
      display flex
      flex-direction: row
      flex-wrap nowrap
      justify-content: flex-start
      align-items: flex-start
      .box
        display flex
        line-height 40px
        height 40px
        font-family $zwFont
        font-size 16px
        margin-bottom 10px
        .searchBtn
          padding 12px 55px
        .typeWid
          width 140px
        .searchText
          width 140px
          margin-right 20px
    .addhBtn
      padding 12px 41px
.pagination
  margin-left 400px
  margin-top 20px
.userlist >>> .blue
  color #409eff
  cursor pointer
.userlist >>> .gray
  color #333
</style>
