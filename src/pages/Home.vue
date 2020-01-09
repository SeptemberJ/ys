<template>
  <div class="HomePage">
    <el-row>
      <el-col :span="24">
        <el-row style="background: #65c294;">
          <el-col :span="3" class="siderMenu">
            <el-menu :unique-opened="true"
              :default-active="siderIdx"
              background-color="#65c294"
              text-color="#fff"
              class="el-menu-vertical-demo"
              @select="changeSideMenu">
              <el-submenu index="1">
                <template slot="title">
                  <i class="iconfont-icons ifc-iconorder" style="color:#fff;"></i>
                  <span>订单管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1">订单列表</el-menu-item>
                  <el-menu-item index="1-2">订单新增</el-menu-item>
                  <!-- <el-menu-item index="1-7">车辆查询</el-menu-item> -->
                </el-menu-item-group>
              </el-submenu>
              <!-- 企业货主才有开票 -->
              <el-menu-item index="4">
                <i class="iconfont-icons ifc-iconticket" style="color:#fff;"></i>
                <span slot="title">开票管理</span>
              </el-menu-item>
              <el-menu-item index="2">
                <i class="iconfont-icons ifc-iconusers" style="color:#fff;"></i>
                <span slot="title">用户管理</span>
              </el-menu-item>
              <el-submenu index="3">
                <template slot="title">
                  <i class="iconfont-icons ifc-iconuser" style="color:#fff;"></i>
                  <span>个人中心</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="3-1">账户信息</el-menu-item>
                  <!-- <el-menu-item index="3-2">密码修改</el-menu-item> -->
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
          <el-col :span="21" class="mainContent">
            <!-- 面包屑 -->
            <div class="moduleTit">
              <el-breadcrumb separator="/">
                <!-- 订单管理导航 -->
                <el-breadcrumb-item v-if="siderIdx == '1' || siderIdx == '1-1' || siderIdx == '1-2' || siderIdx == '1-3' || siderIdx == '1-4' || siderIdx == '1-6' || siderIdx == '1-5'">订单管理</el-breadcrumb-item>
                <el-breadcrumb-item v-if="siderIdx == '1-1'"><span @click="backOrderList" class="CursorPointer">订单列表</span></el-breadcrumb-item>
                <el-breadcrumb-item v-if="siderIdx == '1-1' && showDetail"><span>订单详情</span></el-breadcrumb-item>
                <el-breadcrumb-item v-if="siderIdx == '1-2'"><span>订单新增</span></el-breadcrumb-item>
                <el-breadcrumb-item v-if="siderIdx == '1-7'">车辆查询</el-breadcrumb-item>
                <el-breadcrumb-item v-if="siderIdx == '1-5'">实况查询</el-breadcrumb-item>
                <el-breadcrumb-item v-if="siderIdx == '1-4'"><span @click="backOrderList" class="CursorPointer">指定接单</span></el-breadcrumb-item>
                <el-breadcrumb-item v-if="siderIdx == '1-6'"><span @click="backOrderList" class="CursorPointer">未指定接单</span></el-breadcrumb-item>
                <el-breadcrumb-item v-if="siderIdx == '1-3' && (userRole == 1 || userRole == 4)"><span @click="backOrderList" class="CursorPointer">订单查询</span></el-breadcrumb-item>
                <el-breadcrumb-item v-if="ifSJOrderSearch && siderIdx == '1-3' && (userRole == 1 || userRole == 4)"><span @click="backSjList" class="CursorPointer">司机订单列表</span></el-breadcrumb-item>
                <!-- 开票管理导航 -->
                <el-breadcrumb-item v-if="siderIdx == '4'">开票管理</el-breadcrumb-item>
                <!-- 用户管理导航 -->
                <el-breadcrumb-item v-if="siderIdx == '2'">用户管理</el-breadcrumb-item>
                <!-- 个人中心导航 -->
                <el-breadcrumb-item v-if="siderIdx == '3' || siderIdx == '3-1' || siderIdx == '3-2'">个人中心</el-breadcrumb-item>
                <el-breadcrumb-item v-if="siderIdx == '3-1'">账户信息</el-breadcrumb-item>
                <!-- <el-breadcrumb-item v-if="siderIdx == '3-2'">密码修改</el-breadcrumb-item> -->
              </el-breadcrumb>
            </div>
            <!-- mainContent -->
            <section>
              <!-- <Order v-if="siderIdx == '1-1'"/>
              <AddOrder v-if="siderIdx == '1-2'"/>
              <OrderC v-if="siderIdx == '1-3'"/>
              <Receipt v-if="siderIdx == '1-4'"/>
              <Receipt v-if="siderIdx == '1-6'"/>
              <Map v-if="siderIdx == '1-5'"/>
              <Ticket v-if="siderIdx == '4'"/>
              <User v-if="siderIdx == '2'"/>
              <Safe v-if="siderIdx == '3-2'"/>
              <CarSearch v-if="siderIdx == '1-7'"/> -->
              <AddOrder v-if="siderIdx == '1-2'"/>
              <Order v-if="siderIdx == '1-1'"/>
              <Ticket v-if="siderIdx == '4'"/>
              <User v-if="siderIdx == '2'"/>
              <Center v-if="siderIdx == '3-1'"/>
            </section>
            <div class="CopyrightBar">
              ©2019 上海旺策尔信息科技有限公司  版权所有
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Order from '../components/Order/Order.vue'
// import Receipt from '../components/OrderC/Receipt.vue'
// import Map from '../components/Map/Map.vue'
// import OrderC from '../components/OrderC/Order.vue'
import AddOrder from '../components/Order/AddOrder.vue'
import Ticket from '../components/Ticket/Ticket.vue'
import Center from '../components/Center.vue'
import User from '../components/User.vue'
// import Safe from '../components/Safe.vue'
// import CarSearch from '../components/CarSearch.vue'
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  components: {
    Center,
    User,
    Order,
    AddOrder,
    Ticket
    // Receipt,
    // Map,
    // OrderC,
    // Center,
    // Safe,
    // CarSearch
  },
  computed: {
    ...mapState({
      locationIdx: state => state.locationIdx,
      siderIdx: state => state.siderIdx,
      addOrderType: state => state.addOrderType,
      showDetail: state => state.showDetail,
      showMap: state => state.showMap,
      ifSJOrderSearch: state => state.ifSJOrderSearch,
      userRole: state => state.userRole
    })
  },
  methods: {
    ...mapActions([
      'changeSiderIdx',
      'changeAddOrderType',
      'changeShowDetail',
      'changeShowMap',
      'changeIfSJOrderSearch'
    ]),
    // 返回订单列表
    backOrderList () {
      this.changeShowDetail(false)
      this.changeShowMap(false)
      this.changeIfSJOrderSearch(false)
    },
    // 返回订单查询司机列表
    backSjList () {
      this.changeIfSJOrderSearch(true)
      this.changeShowDetail(false)
      this.changeShowMap(false)
    },
    // 侧边菜单
    changeSideMenu (index, keyPath) {
      let levelCount = keyPath.length
      if (levelCount > 1) {
        this.changeSiderIdx(keyPath[levelCount - 1])
        this.changeIfSJOrderSearch(false)
        this.changeShowDetail(false)
        this.changeShowMap(false)
      } else {
        this.changeSiderIdx(keyPath[0])
        this.changeIfSJOrderSearch(false)
        this.changeShowDetail(false)
        this.changeShowMap(false)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.HomePage{
  position: relative;
  width: 100%;
  display: block;
  .siderMenu{
    position: relative;
    left: 0;
    top: 0;
    overflow: hidden;
  }
  .mainContent{
    position: relative !important;
    min-height: 850px;
    background: #f0f2f5;
    border-left: solid 1px #e6e6e6;
    .moduleTit{
      width: 100%;
      height: 50px;
      background: #fff;
      border-bottom: 1px solid #e8e8e8;
    }
    .CopyrightBar{
      width: 100%;
      height: 40px;
      background: #f0f2f5;
      line-height: 40px;
      position: absolute;
      left: 0;
      bottom: 0px;
      text-align: center;
      color: #999;
      font-size: 12px;
    }
  }
}
.el-breadcrumb{
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
}
</style>
