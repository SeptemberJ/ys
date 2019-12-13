<template>
  <div class="Contact">
    <el-table
      :data="contractList"
      style="width: 100%">
      <el-table-column
        prop="fname"
        label="姓名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="fmobile"
        label="手机号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="addr"
        label="地址"
        width="150">
      </el-table-column>
      <el-table-column label="设置为">
        <template slot-scope="scope">
          <el-button v-if="contractType == 0" type="text" size="mini" @click="setRole(0, scope.row)">发货人</el-button>
          <el-button v-if="contractType == 0" type="text" size="mini" @click="setRole(1, scope.row)">提货人</el-button>
          <el-button v-if="contractType == 0" type="text" size="mini" @click="setRole(2, scope.row)">发货人且提货人</el-button>
          <el-button v-if="contractType == 1" type="text" size="mini" @click="setRole(3, scope.row)">收货人</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="MarginT_10"
      @current-change="getContract"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="sum">
    </el-pagination>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Contact',
  props: ['contractType'],
  data () {
    return {
      contractList: [],
      currentPage: 1,
      pageSize: 5,
      sum: 0
    }
  },
  computed: {
    ...mapState({
      userId: state => state.userId
    })
  },
  methods: {
    setRole (type, info) {
      this.$emit('backContractInfo', type, info)
    },
    getContract () {
      this.send({
        name: '/contactController/list1/' + this.currentPage + '/' + this.pageSize + '?id=' + this.userId + '&type=' + this.contractType,
        method: 'GET'
      }).then(res => {
        if (res.data.respCode === '0') {
          this.contractList = res.data.data.map(item => {
            item.addr = item.pareaname + item.sareaname + item.fareaname + item.faddress
            return item
          })
          this.sum = res.data.size
        } else {
          this.$message({
            message: res.data.message + '！',
            type: 'error'
          })
        }
      }).catch((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
.Contact{
  text-align: center;
}
</style>
