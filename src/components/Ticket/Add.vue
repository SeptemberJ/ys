<template>
  <div class="AddTicket">
    <el-row class="AddMain">
      <el-col :span="6" class="TextAlignL MarginB_20 ColorRed Bold">
        <span style="margin-right: 10px;padding-left: 10px;">税率： </span>
        <!-- <el-select v-model="rateIdx" placeholder="税率" size="mini" style="width: 100px;">
          <el-option
            v-for="(rate, idx) in rateList"
            :key="idx"
            :label="rate.name"
            :value="rate.code">
          </el-option>
        </el-select> -->
        <span style="padding-left: 5px;">9 %</span>
      </el-col>
      <el-col :span="6" class="TextAlignL MarginB_20 ColorRed Bold">
        <span style="margin-right: 10px;padding-left: 10px;">税率折扣： </span>
        <span style="padding-left: 5px;">{{userFrate}} %</span>
      </el-col>
      <el-col :span="6" class="TextAlignL MarginB_20 ColorRed Bold">
        <span style="margin-right: 10px;padding-left: 10px;">手续费： </span>
        <span style="padding-left: 5px;">¥ {{serviceCharge}}</span>
      </el-col>
      <el-col :span="24">
        <el-row class="TextAlignL PaddingL_10 MarginB_10 ColorRed Bold">
          <el-col :span="6">可开票总金额： ¥ {{sumPrice.toFixed(2)}}</el-col>
          <el-col :span="6">税额： ¥ {{sumTax.toFixed(2)}}</el-col>
          <el-col :span="7">税后金额： ¥ {{(sumPrice - sumTax).toFixed(2)}}</el-col>
          <el-col :span="5">结算税额： ¥ {{(sumTax + serviceCharge).toFixed(2)}}</el-col>
        </el-row>
      </el-col>
      <el-col :span="24">
        <el-table
          v-loading="loading"
          ref="tableSelectedList"
          @select="selectSingle"
          @select-all="selectAll"
          @selection-change="handleSelectionChange"
          :data="orderList"
          height="300"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="orderno"
            label="订单号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="ffee"
            label="总运费(¥)"
            width="100">
          </el-table-column>
          <el-table-column
            prop="foilcard"
            label="油卡金额(¥)"
            width="100">
          </el-table-column>
          <el-table-column
            prop="kpfee"
            label="可开票金额(¥)"
            width="120">
          </el-table-column>
          <el-table-column
            prop="faddtime"
            label="下单时间"
            width="150">
          </el-table-column>
          <el-table-column
            prop="goodsname"
            label="货物名称"
            width="100">
          </el-table-column>
          <el-table-column
            prop="cartype"
            label="车型"
            width="180">
          </el-table-column>
          <el-table-column
            prop="th"
            label="发货地"
            width="150">
          </el-table-column>
          <el-table-column
            prop="xh"
            label="收货地"
            width="150">
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" class="MarginTB_20 TextAlignR" v-if="orderList.length > 0">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="sum">
        </el-pagination>
      </el-col>
      <el-col :span="24" class="TextAlignC MarginT_40">
        <el-button type="primary" :loading="ifLoading" @click="submit">确认开票</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import {objDeepCopy} from '../../util/utils'
export default {
  name: 'AddTicket',
  data () {
    return {
      loading: false,
      ifLoading: false,
      sumPrice: 0,
      sumTax: 0,
      // sumTaxL: 0,
      rateIdx: '0',
      serviceCharge: 2, // 手续费
      rateList: [{code: '0', name: '9'}],
      orderList: [],
      // choosedOrder: [],
      invoiceentry: [],
      currentPage: 1,
      pageSize: 10,
      sum: 0,
      // addTableOrder: [],
      selectedAllList: [],
      selectedUniqueSignList: []
    }
  },
  computed: {
    ...mapState({
      userId: state => state.userId,
      userCode: state => state.userCode,
      userFrate: state => state.userFrate,
      userBalance: state => state.userBalance
    })
  },
  created () {
    this.getOrderList()
    // this.getRateList()
  },
  watch: {
    sumPrice: function (newVal) {
      this.sumTax = newVal * (this.rateList[this.rateIdx].name) / 100
    },
    rateIdx: function (newVal) {
      this.sumTax = this.sumPrice * (this.rateList[newVal].name) / 100
    }
  },
  methods: {
    // 单独勾选切换
    selectSingle (selection, row) {
      if (row.checked) { // 取消勾选
        let temp = objDeepCopy(this.selectedAllList)
        temp.map((item, idx) => {
          if (item.id === row.id) {
            this.orderList[row.idx].checked = false
            this.selectedAllList.splice(idx, 1)
            let index = this.selectedUniqueSignList.indexOf(row.id)
            if (index > -1) {
              this.selectedUniqueSignList.splice(index, 1)
            }
          }
        })
      } else { // 加入勾选
        // 再次检查重复
        let index = this.selectedUniqueSignList.indexOf(row.id)
        if (index === -1) {
          row.checked = true
          this.selectedUniqueSignList.push(row.id)
          this.selectedAllList.push(row)
        }
      }
    },
    selectAll (selection) {
      if (selection.length === 0) { // 本页全部取消勾选
        this.orderList.map(order => {
          this.selectSingle([], order)
        })
      } else { // 本页全部加入勾选
        this.orderList.map(order => {
          if (!order.checked) {
            this.selectSingle([], order)
          }
        })
      }
    },
    handleSelectionChange () {
      this.invoiceentry = []
      this.sumPrice = 0
      // this.sumTaxL = 0
      this.selectedAllList.map(item => {
        this.sumPrice += Number(item.kpfee)
        // this.sumTaxL += item.ftax
        this.invoiceentry.push({
          famount: 1,
          fid: '',
          fmodel: '',
          fmoney: item.kpfee - item.ftax,
          fname: '运费',
          forderid: item.id,
          forderno: item.order_no,
          fprice: item.kpfee - item.ftax,
          frate: this.rateList[this.rateIdx].name,
          ftaxmoney: item.ftax,
          ftax1: item.kpfee + this.serviceCharge, // 结算税额
          funit: '次',
          id: ''
        })
      })
    },
    async handleCurrentChange () {
      let curList = await this.getOrderList()
      if (this.selectedAllList.length > 0) {
        this.selectedAllList.map((itemS) => {
          curList.map((item, idx) => {
            if (item.id === itemS.id) {
              this.$refs.tableSelectedList.toggleRowSelection(curList[idx], true)
              this.orderList[idx].checked = true
            }
          })
        })
      }
    },
    // 开票
    submit () {
      if (this.selectedAllList.length === 0) {
        this.$message({
          message: '请选择需要开票的订单！',
          type: 'warning'
        })
        return false
      }
      // 超出账户余额
      if (this.userBalance < (this.sumTax + this.serviceCharge)) {
        this.$message({
          message: '对不起，您的开票申请所产生的税额和手续费总额超出了账户余额！',
          type: 'warning'
        })
        return false
      }
      let DATA = {
        fbillno: '',
        fbuyerid: this.userId,
        fdate: '',
        fexpress: '',
        fexpressno: '',
        ftaxrate: this.rateList[this.rateIdx].name,
        fee: this.serviceCharge,
        ftax: this.sumTax,
        ftotal: this.sumPrice,
        fmoney: this.sumPrice - this.sumTax,
        ftax1: this.sumTax + this.serviceCharge, // 结算税额
        fujian: '',
        id: '',
        fsaleid: '',
        fstatus: '',
        invoiceentryList: this.invoiceentry
      }
      // console.log(DATA)
      // 提交开票申请
      this.send({
        name: '/invoiceController',
        method: 'POST',
        data: DATA
      }).then(res => {
        if (res.data.respCode === '0') {
          this.$message({
            message: '开票申请成功！',
            type: 'success'
          })
          this.ifLoading = false
          this.selectedAllList = []
          this.selectedUniqueSignList = []
          this.invoiceentryList = []
          this.$emit('ToggleDialogAdd')
          this.$emit('FreshList')
        } else {
          this.$message({
            message: res.data.message + '！',
            type: 'error'
          })
          this.ifLoading = false
        }
      }).catch((res) => {
        console.log(res)
        this.ifLoading = false
      })
    },
    // 税率
    getRateList () {
      this.send({
        name: '/invoiceController/rate',
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this.rateList = res.data.data
        } else {
          this.$message({
            message: res.data.message + '！',
            type: 'error'
          })
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    // 获取未开票订单
    getOrderList () {
      return new Promise((resolve, reject) => {
        this.loading = true
        this.send({
          name: '/invoiceController/inVoiceList/' + this.currentPage + '/' + this.pageSize + '/' + this.userId,
          method: 'GET',
          data: {
          }
        }).then(res => {
          if (res.data.respCode === '0') {
            this.orderList = res.data.data.map((item, idx) => {
              item.idx = idx
              item.checked = false
              return item
            })
            this.sum = res.data.size
            this.loading = false
            resolve(this.orderList)
          } else {
            this.$message({
              message: res.data.message + '！',
              type: 'error'
            })
            this.loading = false
            resolve([])
          }
        }).catch((res) => {
          console.log(res)
          this.loading = false
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.AddTicket{
  background: #fff;
  padding: 0 20px;
}
</style>
