<template>
  <div class="Order">
    <el-row v-if="!showDetail && !showMap" style="background: #fff;padding: 20px;">
      <el-col :span="24" class="BgWhite MarginT_10">
        <el-form :inline="true" :model="formCondition" label-position="left" label-width="80px" class="demo-form-inline searchForm" style="text-align:left;">
          <el-row>
            <el-col :span="12">
              <el-form-item label="发货地" size="small">
                <el-select v-model="formCondition.fprovince" placeholder="请选择省" style="width: 120px;" @change="(id) => changeProvince(id, 0)">
                  <el-option
                    v-for="item in ProvinceOptions"
                    :key="item.id"
                    :label="item.fname"
                    :value="item.id">
                  </el-option>
                </el-select>
                <el-select v-model="formCondition.fcity" placeholder="请选择市" style="width: 120px;" @change="(id) => changeCity(id, 0)">
                  <el-option
                    v-for="item in CityOptions_F"
                    :key="item.sareacode"
                    :label="item.sareaname"
                    :value="item.sareacode">
                  </el-option>
                </el-select>
                <el-select v-model="formCondition.farea" placeholder="请选择区" style="width: 120px;" @change="(id) => changeArea(id, 0)">
                  <el-option
                    v-for="item in AreaOptions_F"
                    :key="item.id"
                    :label="item.fareaname"
                    :value="item.fareacode">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="收货地" size="small">
                <el-select v-model="formCondition.sprovince" placeholder="请选择省" style="width: 120px;" @change="(id) => changeProvince(id, 1)">
                  <el-option
                    v-for="item in ProvinceOptions"
                    :key="item.id"
                    :label="item.fname"
                    :value="item.id">
                  </el-option>
                </el-select>
                <el-select v-model="formCondition.scity" placeholder="请选择市" style="width: 120px;" @change="(id) => changeCity(id, 1)">
                  <el-option
                    v-for="item in CityOptions_S"
                    :key="item.sareacode"
                    :label="item.sareaname"
                    :value="item.sareacode">
                  </el-option>
                </el-select>
                <el-select v-model="formCondition.sarea" placeholder="请选择区" style="width: 120px;" @change="(id) => changeArea(id, 1)">
                  <el-option
                    v-for="item in AreaOptions_S"
                    :key="item.id"
                    :label="item.fareaname"
                    :value="item.fareacode">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="19">
              <el-form-item label="发货日期" size="small">
                <el-select v-model="formCondition.fdate" placeholder="请选择" style="width: 120px;">
                  <el-option
                    v-for="item in fdateOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            <!-- </el-col>
            <el-col :span="6"> -->
              <el-form-item label="是否常发货源" size="small" label-width="100px">
                <el-select v-model="formCondition.iscf" placeholder="请选择" style="width: 120px;">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
              </el-form-item>
            <!-- </el-col>
            <el-col :span="6"> -->
              <el-form-item label="订单状态" size="small">
                <el-select v-model="formCondition.fstatus" placeholder="请选择" style="width: 100px;">
                  <el-option
                    v-for="item in fstatusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5" class="TextAlignR">
              <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
              <el-button size="small" icon="el-icon-refresh" @click="reset">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <el-col :span="24" style="width: 100%;height: 10px; border-bottom: 1px dashed #ccc;">
      </el-col>
      <!-- <el-col :span="24"  class="MarginT_20 TextAlignR">
        <el-button type="success" size="mini" icon="el-icon-printer" @click="exportExcell">导出</el-button>
      </el-col> -->
      <el-col :span="24"  class="MarginB_20">
        <el-table
          id="rebateSetTable"
          ref="multipleTable"
          :data="orderList"
          v-loading="loading"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <!-- <el-table-column
            type="selection"
            width="55">
          </el-table-column> -->
          <el-table-column
            prop="orderno"
            label="订单号"
            width="180"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop='fstatusTxt'
            label="订单状态"
            width="100">
          </el-table-column>
          <el-table-column
            prop='faddtime'
            label="下单时间"
            width="160">
          </el-table-column>
          <el-table-column
            prop="cfd"
            label="发货地"
            width="170"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="mdd"
            label="收货地"
            width="170"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="goodsname"
            label="货物"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <!-- <el-button
                size="mini"
                type="danger"
                :disabled="scope.row.fstatus != 0"
                @click="handleCancel(scope.$index, scope.row)">取消
              </el-button>
              <el-button
                size="mini"
                type="warning"
                :disabled="scope.row.fstatus != 0"
                @click="getOfferList(scope.$index, scope.row)">报价
              </el-button>
              <el-button
                size="mini"
                type="info"
                :disabled="scope.row.fstatus != 1"
                @click="signAgreement(scope.$index, scope.row)">签署协议
              </el-button> -->
              <el-button
                size="mini"
                type="primary"
                @click="toDetail(scope.row)">详情
              </el-button>
              <!-- <el-button
                size="mini"
                type="success"
                :disabled="scope.row.fstatus == 0 || scope.row.fstatus == 1 || scope.row.fstatus == 2"
                @click="viewingPath(scope.$index, scope.row)">轨迹
              </el-button> -->
            </template>
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
    </el-row>
    <OrderDetail v-if="showDetail && !showMap" :curOrderId="curOrderId"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import OrderDetail from './OrderDetail.vue'
// import transportAgreement from '../transportAgreement.vue'
export default {
  name: 'Order',
  data () {
    return {
      loading: false,
      showMap: false,
      currentPage: 1,
      pageSize: 15,
      sum: 0,
      curOrderId: '',
      formCondition: {
        fprovince: '',
        fcity: '',
        farea: '',
        fprovinceId: '',
        fcityId: '',
        fareaId: '',
        sprovince: '',
        scity: '',
        sarea: '',
        sprovinceId: '',
        scityId: '',
        sareaId: '',
        fdate: '',
        fstatus: '',
        iscf: ''
      },
      ProvinceOptions: [],
      CityOptions_F: [],
      AreaOptions_F: [],
      CityOptions_S: [],
      AreaOptions_S: [],
      fdateOptions: [
        {label: '今天', value: 0},
        {label: '近3天', value: 1},
        {label: '近一周', value: 2},
        {label: '近一个月', value: 3}
      ],
      fstatusOptions: [
        {label: '发货中', value: 0},
        {label: '历史发货', value: 1}
      ],
      orderList: []
    }
  },
  computed: {
    ...mapState({
      userRole: state => state.userRole,
      showDetail: state => state.showDetail,
      // checkStatus: state => state.checkStatus,
      userCode: state => state.userCode
      // carTypeList: state => state.carTypeList,
      // goodsTypeList: state => state.goodsTypeList
    })
  },
  created () {
    this.getOrderList()
    this.getProvince()
  },
  components: {
    OrderDetail
    // transportAgreement
    // Map,
  },
  watch: {
    showDetail: function (value) {
      if (!value) {
        this.getOrderList()
      }
    },
    'formCondition.fprovince': function (value) {
      if (value) {
        this.formCondition.fcity = ''
        this.formCondition.farea = ''
        this.AreaOptions_F = []
        this.getCity(0)
      }
    },
    'formCondition.fcity': function (value) {
      if (value) {
        this.formCondition.farea = ''
        this.getArea(0)
      }
    },
    'formCondition.sprovince': function (value) {
      if (value) {
        this.formCondition.scity = ''
        this.formCondition.sarea = ''
        this.AreaOptions_S = []
        this.getCity(1)
      }
    },
    'formCondition.scity': function (value) {
      if (value) {
        this.formCondition.sarea = ''
        this.getArea(1)
      }
    }
  },
  methods: {
    ...mapActions([
      'changeShowDetail',
      'changeShowMap',
      'changeSearchOrderId'
    ]),
    reset () {
      this.formCondition = {
        fprovince: '',
        fcity: '',
        farea: '',
        fprovinceId: '',
        fcityId: '',
        fareaId: '',
        sprovince: '',
        scity: '',
        sarea: '',
        sprovinceId: '',
        scityId: '',
        sareaId: '',
        fdate: '',
        fstatus: '',
        iscf: ''
      }
      this.CityOptions_F = []
      this.AreaOptions_F = []
      this.CityOptions_S = []
      this.AreaOptions_S = []
      this.getOrderList()
    },
    search () {
      this.currentPage = 1
      this.getOrderList()
    },
    toDetail (row) {
      this.changeShowDetail(true)
      this.curOrderId = row.id
    },
    handleSelectionChange () {},
    handleCurrentChange () {
      this.getOrderList()
    },
    getOrderList (farea, sarea) {
      this.loading = true
      this.send({
        name: '/zOrderController/list/' + this.currentPage + '/' + this.pageSize + '?mainid=' + this.userCode + '&fstatus=' + this.formCondition.fstatus + '&iscf=' + this.formCondition.iscf + '&fdate=' + this.formCondition.fdate + '&fh=' + this.formCondition.fareaId + '&sh=' + this.formCondition.sareaId,
        method: 'GET',
        data: {}
      }).then(res => {
        if (res.data.respCode === '0') {
          this.sum = res.data.size
          // this.orderList = res.data.data
          this.orderList = res.data.data.map(order => {
            switch (order.fstatus) {
              case '0':
                order.fstatusTxt = '下单'
                return order
              case '1':
                order.fstatusTxt = '接单'
                return order
              case '2':
                order.fstatusTxt = '货主确认协议'
                return order
              case '3':
                order.fstatusTxt = '已签署'
                return order
              case '4':
                order.fstatusTxt = '运输'
                return order
              case '5':
                order.fstatusTxt = '签收'
                return order
              case '6':
                order.fstatusTxt = '货主确认'
                return order
              case '7':
                order.fstatusTxt = '已取消'
                return order
              case '8':
                order.fstatusTxt = '待支付'
                return order
              case '9':
                order.fstatusTxt = '结单'
                return order
              case '10':
                order.fstatusTxt = '已评价'
                return order
              case '11':
                order.fstatusTxt = '已评价'
                return order
              case 'A':
                order.fstatusTxt = '支付完押金'
                return order
              case 'B':
                order.fstatusTxt = '货主支付运费'
                return order
              case 'C':
                order.fstatusTxt = '回单上传'
                return order
              case 'D':
                order.fstatusTxt = '删除'
                return order
            }
          })
        } else {
          this.$message({
            message: res.data.message + '！',
            type: 'error'
          })
        }
        this.loading = false
      }).catch((res) => {
        console.log(res)
        this.loading = false
      })
    },
    exportExcell () {
      if (this.selectedOrder.length === 0) {
        this.$message({
          message: '请至少选择一条需要导出的记录！',
          type: 'warning'
        })
        return false
      }
      require.ensure([], () => {
        const { exportJsonToExcel } = require('../../vendor/Export2Excel.js')
        const tHeader = ['订单号', '订单状态', '货物类型', '发货人', '手机号', '发货地', '街道', '发货人', '手机号', '收货地', '街道', '车型', '装货日期', '开具发票', '报价(¥)']
        const filterVal = ['order_no', 'fstatusTxt', 'goods_name', 'fh_name', 'fh_telephone', 'origin', 'fh_address', 'sh_name', 'sh_telephone', 'destination', 'sh_address', 'carType', 'zhTime', 'isFapiao', 'ffee']
        const data = this.formatJson(filterVal, this.selectedOrder)
        exportJsonToExcel(tHeader, data, '订单')
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    changeProvince (id, type) {
      this.ProvinceOptions.find(Province => {
        if (Province.id === id) {
          if (type === 0) {
            this.formCondition.fprovince = Province.fname
            this.formCondition.fprovinceId = Province.id
          } else {
            this.formCondition.sprovince = Province.fname
            this.formCondition.sprovinceId = Province.id
          }
        }
      })
    },
    changeCity (id, type) {
      if (type === 0) {
        this.CityOptions_F.find(City => {
          if (City.sareacode === id) {
            this.formCondition.fcity = City.sareaname
            this.formCondition.fcityId = City.sareacode
          }
        })
      } else {
        this.CityOptions_S.find(City => {
          if (City.sareacode === id) {
            this.formCondition.scity = City.sareaname
            this.formCondition.scityId = City.sareacode
          }
        })
      }
    },
    changeArea (id, type) {
      if (type === 0) {
        this.AreaOptions_F.find(Area => {
          if (Area.fareacode === id) {
            this.formCondition.farea = Area.fareaname
            this.formCondition.fareaId = Area.fareacode
          }
        })
      } else {
        this.AreaOptions_S.find(Area => {
          if (Area.fareacode === id) {
            this.formCondition.sarea = Area.fareaname
            this.formCondition.sareaId = Area.fareacode
          }
        })
      }
    },
    getProvince () {
      this.send({
        name: '/tokens/regionSelect?pid=100000',
        method: 'GET'
      }).then(res => {
        if (res.data.respCode === '0') {
          this.ProvinceOptions = res.data.data
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
    getCity (type) {
      this.send({
        name: '/tokens/regionSelect?pid=' + (type === 0 ? this.formCondition.fprovinceId : this.formCondition.sprovinceId) + '&ftype=0&fname=' + (type === 0 ? this.formCondition.fprovince : this.formCondition.sprovince),
        method: 'GET'
      }).then(res => {
        if (res.data.respCode === '0') {
          if (type === 0) {
            this.CityOptions_F = res.data.data
          } else {
            this.CityOptions_S = res.data.data
          }
        } else {
          this.$message({
            message: res.data.message + '！111',
            type: 'error'
          })
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    getArea (type) {
      this.send({
        name: '/tokens/regionSelect?pid=' + (type === 0 ? this.formCondition.fcityId : this.formCondition.scityId) + '&ftype=1&fname=' + (type === 0 ? this.formCondition.fcity : this.formCondition.scity),
        method: 'GET'
      }).then(res => {
        if (res.data.respCode === '0') {
          if (type === 0) {
            this.AreaOptions_F = res.data.data
          } else {
            this.AreaOptions_S = res.data.data
          }
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

<style lang="less" scoped>
.Order{
  margin: 20px 20px 60px 20px;
}
</style>
