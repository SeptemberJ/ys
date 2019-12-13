<template>
  <div class="AddOrder">
    <section v-if="step == 1">
      <el-card class="box-card">
        <div slot="header" class="clearfix TextAlignL">
          <span class="columnTit">发货人信息</span>
          <el-image class="CursorPointer" style="width: 20px; height: 20px;float: right;" src="../../../static\images\icon\addAddr.png" fit="cover" @click="addOneFInfo"></el-image>
        </div>
        <div class="InfoList" v-for="(FaItem, FIdx) in fInfo" :key="FIdx">
          <div v-if="FIdx != 0" style="width: 100%;height: 20px;">
            <el-image class="CursorPointer" style="width: 20px; height: 20px;display:block;float: right;" src="../../../static\images\icon\moveAddr.png" fit="cover" @click="moveOneFInfo(FIdx)"></el-image>
          </div>
          <div class="faBlocksAddr">
            <el-badge :value="fInfo.length > 1 ? FIdx + 1 : ''" class="item" style="float: left;">
              <el-image class="LeftIcon" src="../../../static\images\icon\fa.png" fit="cover"></el-image>
            </el-badge>
            <div class="MiddleAddr CursorPointer" @click="changePersonInfo(0, FIdx, FaItem)">
              <p><span style="margin-right: 20px;">{{FaItem.fperson}}</span><span>{{FaItem.fphone}}</span></p>
              <p>{{FaItem.province}}{{FaItem.city}}{{FaItem.area}} {{FaItem.addr}}</p>
            </div>
            <el-image class="RightArrow CursorPointer" src="../../../static\images\icon\right-arrow.png" @click="changePersonInfo(0, FIdx, FaItem)" fit="cover"></el-image>
          </div>
          <el-divider></el-divider>
          <div class="faBlocksTime CursorPointer" @click="toChooseTime('发货', FIdx)">
            <span>装货时间</span>
            <div class="TimeBlock">{{FaItem.date}} {{FaItem.stage}} {{FaItem.time}}</div>
            <el-image class="RightArrow" src="../../../static\images\icon\right-arrow.png" fit="cover"></el-image>
          </div>
        </div>
      </el-card>
      <!-- 收货人信息 -->
      <el-card class="box-card MarginT_20">
        <div slot="header" class="clearfix TextAlignL">
          <span class="columnTit">收货人信息</span>
          <el-image class="CursorPointer" style="width: 20px; height: 20px;float: right;" src="../../../static\images\icon\addAddr.png" fit="cover" @click="addOneSInfo"></el-image>
        </div>
        <div class="InfoList" v-for="(SItem, SIdx) in sInfo" :key="SIdx">
          <div v-if="SIdx != 0" style="width: 100%;height: 20px;">
            <el-image class="CursorPointer" style="width: 20px; height: 20px;display:block;float: right;" src="../../../static\images\icon\moveAddr.png" fit="cover" @click="moveOneSInfo(SIdx)"></el-image>
          </div>
          <div class="faBlocksAddr">
            <el-badge :value="sInfo.length > 1 ? SIdx + 1 : ''" class="item" style="float: left;">
              <el-image class="LeftIcon" src="../../../static\images\icon\shou.png" fit="cover"></el-image>
            </el-badge>
            <div class="MiddleAddr CursorPointer" @click="changePersonInfo(1, SIdx, SItem)">
              <p><span style="margin-right: 20px;">{{SItem.sperson}}</span><span>{{SItem.sphone}}</span></p>
              <p>{{SItem.province}}{{SItem.city}}{{SItem.area}} {{SItem.addr}}</p>
            </div>
            <el-image class="RightArrow CursorPointer" src="../../../static\images\icon\right-arrow.png" @click="changePersonInfo(1, SIdx, SItem)" fit="cover"></el-image>
          </div>
          <el-divider></el-divider>
          <div class="faBlocksTime CursorPointer" @click="toChooseTime('收货', SIdx)">
            <span>卸货时间</span>
            <div class="TimeBlock">{{SItem.date}} {{SItem.stage}} {{SItem.time}}</div>
            <el-image class="RightArrow" src="../../../static\images\icon\right-arrow.png" fit="cover"></el-image>
          </div>
        </div>
      </el-card>
      <!-- 其他信息 -->
      <el-card class="box-card MarginT_20">
        <div slot="header" class="clearfix TextAlignL">
          <span class="columnTit">其他信息</span>
        </div>
        <div class="InfoList">
          <div class="otherInfoBlocks CursorPointer" @click="toChooseCarType">
            <span>车型车长</span>
            <div class="MiddleAddr">
              <p v-if="carLongString">{{carKind}} 车型：{{carTypeString}}</p>
              <p v-if="carLongString">车长：{{carLongString}}</p>
            </div>
            <el-image class="RightArrow" src="../../../static\images\icon\right-arrow.png" fit="cover"></el-image>
          </div>
          <el-divider></el-divider>
          <div class="otherInfoBlocks CursorPointer" @click="toWeightVolume">
            <span>重量体积</span>
            <div class="MiddleAddr">{{weightVolumeString}}</div>
            <el-image class="RightArrow" src="../../../static\images\icon\right-arrow.png" fit="cover"></el-image>
          </div>
          <el-divider></el-divider>
          <div class="otherInfoBlocks CursorPointer">
            <span>装卸次数</span>
            <div class="MiddleAddr">1装1卸</div>
            <el-image class="RightArrow" src="../../../static\images\icon\right-arrow.png" fit="cover"></el-image>
          </div>
        </div>
      </el-card>
      <!-- next step -->
      <el-button class="MarginT_20" type="primary">下一步<i class="el-icon-arrow-right el-icon--right"></i></el-button>
    </section>
    <section v-if="step == 2">
      <el-card class="box-card">
        <div slot="header" class="clearfix TextAlignL">
          <span class="columnTit">货物信息</span>
        </div>
        <div class="InfoList">
          <div class="faBlocksAddr">
            <el-image class="LeftIcon" src="../../../static\images\icon\huo.png" fit="cover"></el-image>
            <div class="MiddleAddr CursorPointer" @click="toChooseGoods">
              <p style="line-height: 50px;"><el-tag>标签一</el-tag><el-tag>标签一</el-tag></p>
            </div>
            <el-image class="RightArrow CursorPointer" src="../../../static\images\icon\right-arrow.png" @click="toChooseGoods" fit="cover"></el-image>
          </div>
          <el-divider></el-divider>
          <div class="otherInfoBlocks CursorPointer" @click="toChooseService">
            <span>需求备注</span>
            <div class="MiddleAddr">
              <p>{{serviceString.substring(2)}}</p>
              <p>{{note}}</p>
            </div>
            <el-image class="RightArrow" src="../../../static\images\icon\right-arrow.png" fit="cover"></el-image>
          </div>
          <el-divider></el-divider>
          <div class="otherInfoBlocks CursorPointer">
            <span>指派车主</span>
            <div class="MiddleAddr"></div>
            <el-image class="RightArrow" src="../../../static\images\icon\right-arrow.png" fit="cover"></el-image>
          </div>
          <el-divider></el-divider>
          <div class="otherInfoBlocks CursorPointer" @click="toChooseFee">
            <span>期望运费</span>
            <div class="MiddleAddr">{{feeString}}</div>
            <el-image class="RightArrow" src="../../../static\images\icon\right-arrow.png" fit="cover"></el-image>
          </div>
          <el-divider></el-divider>
          <div class="otherInfoBlocks CursorPointer">
            <span>购买运货险</span> <span style="padding-left:10px;">(满30减5元)</span>
            <el-switch v-model="insurance" style="float:right;margin-top:18px;"></el-switch>
          </div>
          <el-divider></el-divider>
          <div class="otherInfoBlocks CursorPointer">
            <span>存为常发货源</span>
            <el-switch v-model="saveOften" style="float:right;margin-top:18px;"></el-switch>
          </div>
        </div>
      </el-card>
      <el-button class="MarginT_20" type="primary">确认发货</el-button>
    </section>
    <!-- 选择弹窗 -->
    <!-- 发货人/收货人信息 -->
    <el-dialog class="PersonInfoForm" :title="curPersonInfoType == 0 ? '添加发货人信息' : '添加收货人信息'" :visible.sync="contractInfoDialogVisible" width="520px" center :close-on-click-modal="false">
      <!-- 发货人信息 -->
      <div class="MainBox" v-if="curPersonInfoType == 0">
        <el-form ref="formFInfo" :model="formFInfo" label-width="140px" label-position="left" size="small">
          <el-form-item label="请选择城市/区域" size="small">
            <el-select v-model="formFInfo.province" placeholder="请选择" style="width: 100px;" @change="changeProvince">
              <el-option
                v-for="item in ProvinceOptions"
                :key="item.id"
                :label="item.fname"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="formFInfo.city" placeholder="请选择" style="width: 100px;" @change="changeCity">
              <el-option
                v-for="item in CityOptions"
                :key="item.sareacode"
                :label="item.sareaname"
                :value="item.sareacode">
              </el-option>
            </el-select>
            <el-select v-model="formFInfo.area" placeholder="请选择" style="width: 100px;" @change="changeArea">
              <el-option
                v-for="item in AreaOptions"
                :key="item.id"
                :label="item.fareaname"
                :value="item.fareacode">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="装货详细地址" size="small">
            <el-input v-model="formFInfo.addr"></el-input>
          </el-form-item>
          <el-form-item label="发货人" size="small">
            <el-input v-model="formFInfo.fperson" style="width: 85%"></el-input>
            <i class="iconfont-icons ifc-iconcontacts CursorPointer" @click="chooseContact(0)" style="color:#66b1ff;font-size:30px;float:right;"></i>
          </el-form-item>
          <el-form-item label="发货人电话" size="small">
            <el-input v-model="formFInfo.fphone"></el-input>
          </el-form-item>
          <el-divider></el-divider>
          <el-form-item label="发货人和提货人相同" size="small">
            <el-switch v-model="formFInfo.ifSame" @change="sameSwitch" style="float:right;margin-top:6px;"></el-switch>
          </el-form-item>
          <el-form-item label="提货人" size="small">
            <el-input v-model="formFInfo.tperson" style="width: 85%"></el-input>
            <i class="iconfont-icons ifc-iconcontacts CursorPointer" @click="chooseContact(0)" style="color:#66b1ff;font-size:30px;float:right;"></i>
          </el-form-item>
          <el-form-item label="提货人电话" size="small">
            <el-input v-model="formFInfo.tphone"></el-input>
          </el-form-item>
          <el-form-item label="保存为常用发货人" size="small">
            <el-switch v-model="formFInfo.ifSavePerson" style="float:right;margin-top:6px;"></el-switch>
          </el-form-item>
        </el-form>
        <el-dialog
          width="650px"
          title="联系人"
          :visible.sync="contactListDialogVisible"
          append-to-body>
          <Contacts v-if="curPersonInfoType == 0 && contactListDialogVisible" ref="ContactsChild" :contractType="contractType" @backContractInfo="backContractInfo"/>
        </el-dialog>
      </div>
      <!-- 收货人信息 -->
      <div class="MainBox" v-if="curPersonInfoType == 1">
        <el-form ref="formSInfo" :model="formSInfo" label-width="140px" label-position="left" size="small">
          <el-form-item label="请选择城市/区域" size="small">
            <el-select v-model="formSInfo.province" placeholder="请选择" style="width: 100px;" @change="changeProvince">
              <el-option
                v-for="item in ProvinceOptions"
                :key="item.id"
                :label="item.fname"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="formSInfo.city" placeholder="请选择" style="width: 100px;" @change="changeCity">
              <el-option
                v-for="item in CityOptions"
                :key="item.sareacode"
                :label="item.sareaname"
                :value="item.sareacode">
              </el-option>
            </el-select>
            <el-select v-model="formSInfo.area" placeholder="请选择" style="width: 100px;" @change="changeArea">
              <el-option
                v-for="item in AreaOptions"
                :key="item.id"
                :label="item.fareaname"
                :value="item.fareacode">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收货详细地址" size="small">
            <el-input v-model="formSInfo.addr"></el-input>
          </el-form-item>
          <el-form-item label="收货人" size="small">
            <el-input v-model="formSInfo.sperson" style="width: 85%"></el-input>
            <i class="iconfont-icons ifc-iconcontacts CursorPointer" @click="chooseContact(1)" style="color:#66b1ff;font-size:30px;float:right;"></i>
          </el-form-item>
          <el-form-item label="收货人电话" size="small">
            <el-input v-model="formSInfo.sphone"></el-input>
          </el-form-item>
          <el-form-item label="固定电话" size="small">
            <el-input v-model="formSInfo.stell"></el-input>
          </el-form-item>
          <el-form-item label="保存为常用发货人" size="small">
            <el-switch v-model="formSInfo.ifSavePerson" style="float:right;margin-top:6px;"></el-switch>
          </el-form-item>
        </el-form>
        <el-dialog
          width="650px"
          title="联系人"
          :visible.sync="contactListDialogVisible"
          append-to-body>
          <Contacts v-if="curPersonInfoType == 1 && contactListDialogVisible" ref="ContactsChild" :contractType="contractType" @backContractInfo="backContractInfo"/>
        </el-dialog>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="contractInfoDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureAddFPerson">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 时间 -->
    <el-dialog title="选择时间" :visible.sync="dateTimeDialogVisible" width="450px" center :close-on-click-modal="false">
      <div>
        <el-form :model="formDateTime" :rules="ruleDateTime" ref="formDateTime" :validate-on-rule-change="false" label-position="left" label-width="100px" class="demo-ruleForm">
          <el-form-item label="日期" prop="date">
            <el-date-picker style="width: 100%;"
             v-model="formDateTime.date"
             type="date"
             placeholder="选择日期"
             value-format="yyyy-MM-dd"
             :picker-options="startDateDisabled">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="时间段" prop="stage">
            <el-select v-model="formDateTime.stage" placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in stageOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="具体时间" prop="time">
            <el-select v-model="formDateTime.time" placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in timeOptions"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dateTimeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="choosedTime('formDateTime')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 车型车长 -->
    <el-dialog class="NoTopPadding" title="选择车长车型" :visible.sync="carTypeDialogVisible" width="485px" center :close-on-click-modal="false">
      <div class="MainBox">
        <!-- 用车类型 -->
        <p class="MarginB_20">用车类型</p>
        <div>
          <el-radio-group v-model="carKind" size="small">
            <el-radio label="整车" border>整车</el-radio>
            <el-radio label="可拼车" border>可拼车</el-radio>
          </el-radio-group>
        </div>
        <!-- 车长-->
        <p class="MarginTB_20">车长(必填，最多选择3项)</p>
        <div>
          <el-checkbox-group v-model="carLong" :max="3" size="small" style="text-align:left;">
            <el-checkbox v-for="(CarLong, LongIdx) in carLongOptions" :key="LongIdx" :label="CarLong.carLength" @change="(value) => showTips(value, CarLong)" border style="width:130px;">{{CarLong.carLength}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <!-- 车型 -->
        <p class="MarginTB_20">车型(必填，最多选择3项)</p>
        <div>
          <el-checkbox-group v-model="carType" :max="3" size="small" style="text-align:left;">
            <el-checkbox v-for="(CarType, TypeIdx) in carTypeOptions" :key="TypeIdx" :label="CarType.typename" @change="(value) => changeCarType(value, CarType)" border style="width:130px;">{{CarType.typename}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="carTypeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureChoosedCar">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 重量体积 -->
    <el-dialog title="重量体积(必填一项)" :visible.sync="weightVolumeDialogVisible" width="485px" center :close-on-click-modal="false">
      <div class="MainBox">
        <el-form ref="formWeightVolume" :model="formWeightVolume" label-width="70px" label-position="left">
          <el-form-item label="重量">
            <el-input v-model="formWeightVolume.weightS" type="number" placeholder="0~999" @change="(value) => checkValue(value, 'weightS')" @input="(value) => checkValue(value, 'weightS')" style="width:140px"></el-input>
            <span style="padding: 0 10px;">——</span>
            <el-input v-model="formWeightVolume.weightE" type="number" placeholder="0~999" @change="(value) => checkValue(value, 'weightE')" @input="(value) => checkValue(value, 'weightE')" style="width:140px"></el-input>&nbsp;&nbsp;吨
          </el-form-item>
          <el-form-item label="体积">
            <el-input v-model="formWeightVolume.volumeS" type="number" placeholder="0~999" @change="(value) => checkValue(value, 'volumeS')" @input="(value) => checkValue(value, 'volumeS')" style="width:140px"></el-input>
            <span style="padding: 0 10px;">——</span>
            <el-input v-model="formWeightVolume.volumeE" type="number" placeholder="0~999" @change="(value) => checkValue(value, 'volumeE')" @input="(value) => checkValue(value, 'volumeE')" style="width:140px"></el-input>&nbsp;&nbsp;方
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="weightVolumeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureWeightVolume">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 货物名称 -->
    <el-dialog title="货物类型" :visible.sync="goodsDialogVisible" width="450px" center :close-on-click-modal="false">
      <div class="MainBox">
        <el-select style="width: 100%;"
          v-model="goodsKeyWord"
          filterable
          remote
          reserve-keyword
          placeholder="请输入您想要的货物"
          @change="chooseGoodsName"
          :remote-method="remoteMethod"
          :loading="searchLoading">
          <el-option
            v-for="item in goodsNameoptions"
            :key="item.fname"
            :label="item.fname"
            :value="item.fname">
            <span style="float: left">{{ item.fname }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.fname1 }}</span>
          </el-option>
        </el-select>
        <!-- <el-input placeholder="请输入您想要的货物" v-model="goodsKeyWord" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input> -->
        <div class="ChoosedGoods MarginTB_20">
          <el-badge value="X" type="primary" v-for="(item, idx) in choosedGoods" :key="idx" style="margin-right: 15px;">
            <el-button size="small">{{item}}</el-button>
          </el-badge>
        </div>
        <p class="MarginTB_20" style="border-left:10px solid #409EFF;padding-left:10px;"><span>热门货物类型</span><span style="float:right;">查看更多></span></p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="goodsDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureService">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 期望运费 -->
    <el-dialog title="期望运费" :visible.sync="feeDialogVisible" width="450px" center :close-on-click-modal="false">
      <div class="MainBox">
        <el-form ref="formFee" :model="formFee" label-width="80px" label-position="left">
          <el-form-item label="期望运费">
            <el-input v-model="formFee.price" type="number" placeholder="请填写运费金额">
              <template slot="append">元 / 趟</template>
            </el-input>
          </el-form-item>
          <el-form-item label="使用油卡">
            <el-input v-model="formFee.oil" type="number" placeholder="请填写油卡金额，选填">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-form>
        <p class="MarginTB_10" style="border-left:10px solid #409EFF;padding-left:10px;">使用油卡须知</p>
        <p style="font-size:12px;">1. 油卡的使用金额不得大于运费金额</p>
        <p style="font-size:12px;">2. 使用油卡的金额无法开票</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="feeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureFee">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 需求备注 -->
    <el-dialog title="需求备注" :visible.sync="serviceDialogVisible" width="450px" center :close-on-click-modal="false">
      <div class="MainBox">
        <el-input
          type="textarea"
          placeholder="请输入备注，最多50个字"
          v-model="note"
          maxlength="50"
          show-word-limit>
        </el-input>
        <p class="MarginTB_20" style="border-left:10px solid #409EFF;padding-left:10px;">服务需求</p>
        <el-checkbox-group v-model="services" size="small" style="text-align:left;">
          <el-checkbox v-for="(Service, ServiceIdx) in serviceOptions" :key="ServiceIdx" :label="Service.typename" border style="width:115px;">{{Service.typename}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="serviceDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureService">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex' // mapActions
import { formatToString, objDeepCopy } from '../../util/utils'
import Contacts from './Contact'
export default {
  name: 'AddOrder',
  // props: ['orderType'],
  data () {
    return {
      step: 2,
      searchLoading: false,
      dateTimeDialogVisible: false,
      carTypeDialogVisible: false,
      weightVolumeDialogVisible: false,
      contractInfoDialogVisible: false,
      contactListDialogVisible: false,
      goodsDialogVisible: false,
      feeDialogVisible: false,
      serviceDialogVisible: false,
      // 两个时间
      formDateTime: {
        date: '',
        stage: '',
        time: ''
      },
      startDateDisabled: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      stageOptions: [],
      timeOptions: [],
      beforeDawn: [1, 2, 3, 4, 5, 6],
      morning: [7, 8, 9, 10, 11, 12],
      afternoon: [13, 14, 15, 16, 17, 18],
      night: [19, 20, 21, 22, 23],
      curTimeIdx: null,
      curTimeType: null,
      ruleDateTime: {
        date: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        stage: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        time: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      formFInfo: {
        provinceId: '',
        province: '',
        city: '',
        cityId: '',
        areaId: '',
        area: '',
        addr: '',
        fperson: '',
        fphone: '',
        ifSame: false,
        tperson: '',
        tphone: '',
        ifSavePerson: false
      },
      formSInfo: {
        provinceId: '',
        province: '',
        city: '',
        cityId: '',
        areaId: '',
        area: '',
        addr: '',
        sperson: '',
        sphone: '',
        stell: '',
        ifSavePerson: false
      },
      contractType: null,
      curPersonInfoIdx: null,
      curPersonInfoType: null, // 0 发货 1 收货
      fInfo: [
        {
          provinceId: '',
          province: '',
          city: '',
          cityId: '',
          areaId: '',
          area: '',
          addr: '',
          fperson: '',
          fphone: '',
          ifSame: false,
          tperson: '',
          tphone: '',
          ifSavePerson: false,
          ftype: 0,
          date: '',
          stage: '',
          time: ''
        }
        // {addr: '', faddress: '', fareacode: '', fareaname: '', fmobile: '', fmobile1: '', fname: '', fname1: '', ftype: 0, date: '', stage: '', time: ''}
      ],
      sInfo: [
        {
          provinceId: '',
          province: '',
          city: '',
          cityId: '',
          areaId: '',
          area: '',
          addr: '',
          sperson: '',
          sphone: '',
          stell: '',
          ifSavePerson: false,
          ftype: 1,
          date: '',
          stage: '',
          time: ''
        }
        // {addr: '', faddress: '', fareacode: '', fareaname: '', fmobile: '', fmobile1: '', fname: '', fname1: '', ftype: 0, date: '', stage: '', time: ''}
      ],
      ProvinceOptions: [],
      CityOptions: [],
      AreaOptions: [],
      carKind: '',
      carLong: [],
      carType: [],
      carLongString: '',
      carTypeString: '',
      carLongOptions: [],
      carTypeOptions: [],
      formWeightVolume: {
        weightS: '',
        weightE: '',
        volumeS: '',
        volumeE: ''
      },
      weightVolumeString: '',
      // 货物信息
      choosedGoods: [],
      goodsKeyWord: '',
      goodsNameoptions: [],
      formFee: {price: '', oil: ''},
      feeString: '',
      note: '',
      serviceString: '',
      services: [],
      serviceOptions: [],
      insurance: false,
      saveOften: false
    }
  },
  computed: {
    ...mapState({
      userRole: state => state.userRole,
      checkStatus: state => state.checkStatus,
      userCode: state => state.userCode,
      userFdepsta: state => state.userFdepsta,
      carTypeList: state => state.carTypeList,
      carLengthList: state => state.carLengthList,
      goodsTypeList: state => state.goodsTypeList
    })
  },
  watch: {
    'formDateTime.date': function (value) {
      this.formDateTime.stage = ''
      let CurDate = new Date()
      let CurHour = CurDate.getHours()
      let CurDateSrting = formatToString(CurDate, 'Simple', '-')
      if (CurDateSrting !== value) { // 今天往后的日期
        this.stageOptions = [
          {label: '全天', value: '全天'},
          {label: '凌晨', value: '凌晨'},
          {label: '上午', value: '上午'},
          {label: '下午', value: '下午'},
          {label: '晚上', value: '晚上'}
        ]
      } else { // 今天
        if (CurHour < 1) { // 所有时间段都可以
          this.stageOptions = [
            {label: '全天', value: '全天'},
            {label: '凌晨', value: '凌晨'},
            {label: '上午', value: '上午'},
            {label: '下午', value: '下午'},
            {label: '晚上', value: '晚上'}
          ]
        } else if (CurHour >= 1 && CurHour < 6) {
          this.stageOptions = [
            {label: '凌晨', value: '凌晨'},
            {label: '上午', value: '上午'},
            {label: '下午', value: '下午'},
            {label: '晚上', value: '晚上'}
          ]
        } else if (CurHour >= 6 && CurHour < 12) {
          this.stageOptions = [
            {label: '上午', value: '上午'},
            {label: '下午', value: '下午'},
            {label: '晚上', value: '晚上'}
          ]
        } else if (CurHour >= 12 && CurHour < 18) {
          this.stageOptions = [
            {label: '下午', value: '下午'},
            {label: '晚上', value: '晚上'}
          ]
        } else {
          this.stageOptions = [
            {label: '晚上', value: '晚上'}
          ]
        }
      }
    },
    'formDateTime.stage': function (value) {
      this.formDateTime.time = ''
      let CurDate = new Date()
      let CurHour = CurDate.getHours()
      let CurDateSrting = formatToString(CurDate, 'Simple', '-')
      if (CurDateSrting !== this.formDateTime.date) { // 今天往后的日期
        switch (value) {
          case '全天':
            this.timeOptions = ['都可以']
            break
          case '凌晨':
            this.timeOptions = ['都可以', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00']
            break
          case '上午':
            this.timeOptions = ['都可以', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00']
            break
          case '下午':
            this.timeOptions = ['都可以', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']
            break
          case '晚上':
            this.timeOptions = ['都可以', '19:00', '20:00', '21:00', '22:00', '23:00']
            break
        }
      } else { // 今天
        switch (value) {
          case '全天':
            this.timeOptions = ['都可以']
            break
          case '凌晨':
            this.timeOptions = []
            if (CurHour < 1) {
              this.timeOptions.push('都可以')
              this.beforeDawn.map(item => {
                this.timeOptions.push((item < 10 ? '0' + item : item) + ':00')
              })
            } else {
              this.beforeDawn.map(item => {
                if (item > CurHour) {
                  this.timeOptions.push((item < 10 ? '0' + item : item) + ':00')
                }
              })
            }
            break
          case '上午':
            this.timeOptions = []
            if (CurHour < 7) {
              this.timeOptions.push('都可以')
              this.morning.map(item => {
                this.timeOptions.push((item < 10 ? '0' + item : item) + ':00')
              })
            } else {
              this.morning.map(item => {
                if (item > CurHour) {
                  this.timeOptions.push((item < 10 ? '0' + item : item) + ':00')
                }
              })
            }
            break
          case '下午':
            this.timeOptions = []
            if (CurHour < 13) {
              this.timeOptions.push('都可以')
              this.afternoon.map(item => {
                this.timeOptions.push((item < 10 ? '0' + item : item) + ':00')
              })
            } else {
              this.afternoon.map(item => {
                if (item > CurHour) {
                  this.timeOptions.push((item < 10 ? '0' + item : item) + ':00')
                }
              })
            }
            break
          case '晚上':
            this.timeOptions = []
            if (CurHour < 19) {
              this.timeOptions.push('都可以')
              this.night.map(item => {
                this.timeOptions.push((item < 10 ? '0' + item : item) + ':00')
              })
            } else {
              this.night.map(item => {
                if (item > CurHour) {
                  this.timeOptions.push((item < 10 ? '0' + item : item) + ':00')
                }
              })
            }
            break
          default:
            console.log(value)
        }
      }
    },
    dateTimeDialogVisible: function (value) {
      if (!value) {
        this.$refs['formDateTime'].resetFields()
      }
    },
    contractInfoDialogVisible: function (value) {
      if (value) {
        this.getProvince()
      }
    },
    // 发货人
    'formFInfo.province': function (value) {
      if (value) {
        this.formFInfo.city = ''
        this.formFInfo.area = ''
        this.AreaOptions = []
        this.getCity(0)
      }
    },
    'formFInfo.city': function (value) {
      if (value) {
        this.formFInfo.area = ''
        this.getArea(0)
      }
    },
    'formFInfo.fperson': function (value) {
      if (this.formFInfo.ifSame) {
        this.formFInfo.tperson = value
      }
    },
    'formFInfo.fphone': function (value) {
      if (this.formFInfo.ifSame) {
        this.formFInfo.tphone = value
      }
    },
    'formFInfo.tperson': function (value) {
      if (value !== this.formFInfo.fperson) {
        this.formFInfo.ifSame = false
      }
    },
    'formFInfo.tphone': function (value) {
      if (value !== this.formFInfo.fphone) {
        this.formFInfo.ifSame = false
      }
    },
    // 收货人
    'formSInfo.province': function (value) {
      if (value) {
        this.formSInfo.city = ''
        this.formSInfo.area = ''
        this.AreaOptions = []
        this.getCity(1)
      }
    },
    'formSInfo.city': function (value) {
      if (value) {
        this.formSInfo.area = ''
        this.getArea(1)
      }
    }
  },
  created () {
  },
  components: {
    Contacts
  },
  methods: {
    addOneFInfo () {
      this.fInfo.push({
        provinceId: '',
        province: '',
        city: '',
        cityId: '',
        areaId: '',
        area: '',
        addr: '',
        fperson: '',
        fphone: '',
        ifSame: false,
        tperson: '',
        tphone: '',
        ifSavePerson: false,
        ftype: 0,
        date: '',
        stage: '',
        time: ''
      })
    },
    moveOneFInfo (idx) {
      this.fInfo.splice(idx, 1)
    },
    addOneSInfo () {
      this.sInfo.push({
        provinceId: '',
        province: '',
        city: '',
        cityId: '',
        areaId: '',
        area: '',
        addr: '',
        sperson: '',
        sphone: '',
        stell: '',
        ifSavePerson: false,
        ftype: 1,
        date: '',
        stage: '',
        time: ''
      })
    },
    moveOneSInfo (idx) {
      this.sInfo.splice(idx, 1)
    },
    changePersonInfo (type, idx, row) {
      let rowInfo = objDeepCopy(row)
      if (type === 0) {
        this.formFInfo = row
        setTimeout(() => {
          this.formFInfo.city = rowInfo.city
          this.formFInfo.cityId = rowInfo.cityId
        }, 10)
        setTimeout(() => {
          this.formFInfo.area = rowInfo.area
          this.formFInfo.areaId = rowInfo.areaId
        }, 20)
      } else {
        this.formSInfo = row
        setTimeout(() => {
          this.formSInfo.city = rowInfo.city
          this.formSInfo.cityId = rowInfo.cityId
        }, 10)
        setTimeout(() => {
          this.formSInfo.area = rowInfo.area
          this.formSInfo.areaId = rowInfo.areaId
        }, 20)
      }
      this.curPersonInfoIdx = idx
      this.curPersonInfoType = type
      this.contractInfoDialogVisible = true
    },
    changeProvince (id) {
      this.ProvinceOptions.find(Province => {
        if (Province.id === id) {
          if (this.curPersonInfoType === 0) {
            this.formFInfo.province = Province.fname
            this.formFInfo.provinceId = Province.id
          } else {
            this.formSInfo.province = Province.fname
            this.formSInfo.provinceId = Province.id
          }
        }
      })
    },
    changeCity (id) {
      this.CityOptions.find(City => {
        if (City.sareacode === id) {
          if (this.curPersonInfoType === 0) {
            this.formFInfo.city = City.sareaname
            this.formFInfo.cityId = City.sareacode
          } else {
            this.formSInfo.city = City.sareaname
            this.formSInfo.cityId = City.sareacode
          }
        }
      })
    },
    changeArea (id) {
      this.AreaOptions.find(Area => {
        if (Area.fareacode === id) {
          if (this.curPersonInfoType === 0) {
            this.formFInfo.area = Area.fareaname
            this.formFInfo.areaId = Area.fareacode
          } else {
            this.formSInfo.area = Area.fareaname
            this.formSInfo.areaId = Area.fareacode
          }
        }
      })
    },
    chooseContact (type) {
      this.contractType = type
      this.contactListDialogVisible = true
      setTimeout(() => { this.$refs.ContactsChild.getContract() }, 10)
    },
    // 填充返回选择的联系人
    backContractInfo (type, personInfo) {
      this.formFInfo.ifSame = false
      // 0 发货人 1 提货人 2 发货人且提货人 3 收货人
      switch (type) {
        case 0:
          this.formFInfo.fperson = personInfo.fname
          this.formFInfo.fphone = personInfo.fmobile
          this.formFInfo.addr = personInfo.faddress
          this.formFInfo.province = personInfo.pareaname
          this.formFInfo.provinceId = personInfo.pareacode
          setTimeout(() => {
            this.formFInfo.city = personInfo.sareaname
            this.formFInfo.cityId = personInfo.sareacode
          }, 10)
          setTimeout(() => {
            this.formFInfo.area = personInfo.fareaname
            this.formFInfo.areaId = personInfo.fareacode
          }, 20)
          break
        case 1:
          this.formFInfo.tperson = personInfo.fname
          this.formFInfo.tphone = personInfo.fmobile
          break
        case 2:
          this.formFInfo.fperson = personInfo.fname
          this.formFInfo.fphone = personInfo.fmobile
          this.formFInfo.addr = personInfo.faddress
          this.formFInfo.tperson = personInfo.fname
          this.formFInfo.tphone = personInfo.fmobile
          this.formFInfo.province = personInfo.pareaname
          this.formFInfo.provinceId = personInfo.pareacode
          setTimeout(() => {
            this.formFInfo.city = personInfo.sareaname
            this.formFInfo.cityId = personInfo.sareacode
          }, 10)
          setTimeout(() => {
            this.formFInfo.area = personInfo.fareaname
            this.formFInfo.areaId = personInfo.fareacode
          }, 20)
          break
        case 3:
          this.formSInfo.sperson = personInfo.fname
          this.formSInfo.sphone = personInfo.fmobile
          this.formSInfo.stell = personInfo.fmobile1
          this.formSInfo.addr = personInfo.faddress
          this.formSInfo.province = personInfo.pareaname
          this.formSInfo.provinceId = personInfo.pareacode
          setTimeout(() => {
            this.formSInfo.city = personInfo.sareaname
            this.formSInfo.cityId = personInfo.sareacode
          }, 10)
          setTimeout(() => {
            this.formSInfo.area = personInfo.fareaname
            this.formSInfo.areaId = personInfo.fareacode
          }, 20)
          break
      }
      this.contactListDialogVisible = false
    },
    sameSwitch (value) {
      if (value) {
        this.formFInfo.tperson = this.formFInfo.fperson
        this.formFInfo.tphone = this.formFInfo.fphone
      }
    },
    sureAddFPerson () {
      switch (this.curPersonInfoType) {
        case 0:
          this.fInfo[this.curPersonInfoIdx] = this.formFInfo
          this.contractInfoDialogVisible = false
          break
        case 1:
          this.sInfo[this.curPersonInfoIdx] = this.formSInfo
          this.contractInfoDialogVisible = false
          break
      }
    },
    toChooseTime (type, timeIdx) {
      this.dateTimeDialogVisible = true
      this.curTimeIdx = timeIdx
      this.curTimeType = type
    },
    choosedTime (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证时间是否有效
          let Time = ''
          if (this.formDateTime.time === '都可以') {
            switch (this.formDateTime.stage) {
              case '全天':
                Time = '00:00'
                break
              case '凌晨':
                Time = '01:00'
                break
              case '上午':
                Time = '07:00'
                break
              case '下午':
                Time = '13:00'
                break
              case '晚上':
                Time = '19:00'
                break
            }
          } else {
            Time = this.formDateTime.time
          }
          let choosedTime = this.formDateTime.date + ' ' + Time + ':59'
          let formatString = choosedTime.replace(/-/g, '/')
          let choosedTimeStamp = (new Date(formatString)).getTime()
          let curTimeStamp = (new Date()).getTime()
          if (choosedTimeStamp <= curTimeStamp) {
            this.$message({
              message: '不能选择已过去的时间，请重新选择！',
              type: 'warning'
            })
            this.$refs['formDateTime'].resetFields()
            this.stageOptions = []
            this.timeOptions = []
          } else {
            // 满足则返回填充页面
            switch (this.curTimeType) {
              case '发货':
                this.fInfo[this.curTimeIdx].date = this.formDateTime.date
                this.fInfo[this.curTimeIdx].stage = this.formDateTime.stage
                this.fInfo[this.curTimeIdx].time = this.formDateTime.time
                break
              case '收货':
                this.sInfo[this.curTimeIdx].date = this.formDateTime.date
                this.sInfo[this.curTimeIdx].stage = this.formDateTime.stage
                this.sInfo[this.curTimeIdx].time = this.formDateTime.time
                break
            }
            this.$refs['formDateTime'].resetFields()
            this.stageOptions = []
            this.timeOptions = []
            this.dateTimeDialogVisible = false
          }
        } else {
          this.$message({
            message: '请将信息填写完整！',
            type: 'warning'
          })
          return false
        }
      })
    },
    toChooseCarType () {
      this.carTypeDialogVisible = true
      this.getCarLong()
      this.getCarType()
    },
    toWeightVolume () {
      this.weightVolumeDialogVisible = true
    },
    checkValue (val, pro) {
      if (val > 999) {
        this.formWeightVolume[pro] = 999
      }
    },
    sureWeightVolume () {
      if (!this.formWeightVolume.weightS && !this.formWeightVolume.weightE && !this.formWeightVolume.volumeS && !this.formWeightVolume.volumeE) {
        this.$message({
          message: '重量和体积必填一项！',
          type: 'warning'
        })
        return false
      }
      // 最大最小值验证
      if ((this.formWeightVolume.weightS <= this.formWeightVolume.weightE) && this.formWeightVolume.weightS > 0) {
        this.$message({
          message: '最大和最小重量相同，只需填写最小值！',
          type: 'warning'
        })
        return false
      }
      if ((this.formWeightVolume.volumeS <= this.formWeightVolume.volumeE) && this.formWeightVolume.volumeS > 0) {
        this.$message({
          message: '最大和最小体积相同，只需填写最小值！',
          type: 'warning'
        })
        return false
      }
      // 格式化显示
      let weightString = ''
      let volumeString = ''
      if (this.formWeightVolume.weightS && this.formWeightVolume.weightE) {
        weightString = this.formWeightVolume.weightS + '-' + this.formWeightVolume.weightE
      } else {
        weightString = this.formWeightVolume.weightS || this.formWeightVolume.weightE
      }
      if (this.formWeightVolume.volumeS && this.formWeightVolume.volumeE) {
        volumeString = this.formWeightVolume.volumeS + '-' + this.formWeightVolume.volumeE
      } else {
        volumeString = this.formWeightVolume.volumeS || this.formWeightVolume.volumeE
      }
      if (weightString !== '' && volumeString !== '') {
        this.weightVolumeString = weightString + '吨' + ' | ' + volumeString + '方'
      } else {
        this.weightVolumeString = (weightString ? weightString + '吨' : '') + (volumeString ? volumeString + '方' : '')
      }
      this.weightVolumeDialogVisible = false
    },
    // 确定车型车长
    sureChoosedCar () {
      if (this.carKind && this.carLong.length > 0 && this.carType.length > 0) {
        let carLongString = ''
        let carTypeString = ''
        this.carLong.map(item => {
          carLongString = carLongString + '/' + item
        })
        this.carType.map(item => {
          carTypeString = carTypeString + '/' + item
        })
        this.carLongString = carLongString.substring(1)
        this.carTypeString = carTypeString.substring(1)
        this.carTypeDialogVisible = false
      }
    },
    getCarType () {
      this.send({
        name: '/typeController/tstype/2c90b4bf6c1ccde9016c1cdb2c4f000a',
        method: 'GET'
      }).then(res => {
        if (res.data.respCode === '0') {
          this.carTypeOptions = res.data.data
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
    getCarLong () {
      this.send({
        name: '/zCarLengthController/list',
        method: 'GET'
      }).then(res => {
        if (res.data.respCode === '0') {
          this.carLongOptions = res.data.data
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
    // 点击车长显示详情
    showTips (val, CarLong) {
      // 判断是否含有不限车长
      if (val && CarLong.carLength === '不限车长') {
        this.carLong = ['不限车长']
      }
      // 选择具体车长后将不限车长移除
      if (val && CarLong.carLength !== '不限车长' && this.carLong.indexOf('不限车长') !== -1) {
        this.carLong.splice(this.carLong.indexOf('不限车长'), 1)
      }
      // 获取tips
      if (val && CarLong.carLength !== '不限车长') {
        this.send({
          name: '/zCarLengthController/' + CarLong.id,
          method: 'GET'
        }).then(res => {
          if (res.data.respCode === '0') {
            let CarInfo = res.data.data
            this.$message.closeAll()
            this.$message('车长' + CarInfo.carLength + ',约有' + CarInfo.loadVolume + ',可装货约' + CarInfo.loadWeight)
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
    },
    changeCarType (val, CarType) {
      // 判断是否含有不限车长
      if (val && CarType.typename === '不限车型') {
        this.carType = ['不限车型']
      }
      // 选择具体车长后将不限车长移除
      if (val && CarType.typename !== '不限车型' && this.carType.indexOf('不限车型') !== -1) {
        this.carType.splice(this.carType.indexOf('不限车型'), 1)
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
        name: '/tokens/regionSelect?pid=' + (type === 0 ? this.formFInfo.provinceId : this.formSInfo.provinceId) + '&ftype=0&fname=' + (type === 0 ? this.formFInfo.province : this.formSInfo.province),
        method: 'GET'
      }).then(res => {
        if (res.data.respCode === '0') {
          this.CityOptions = res.data.data
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
    getArea (type) {
      this.send({
        name: '/tokens/regionSelect?pid=' + (type === 0 ? this.formFInfo.cityId : this.formSInfo.cityId) + '&ftype=1&fname=' + (type === 0 ? this.formFInfo.city : this.formSInfo.city),
        method: 'GET'
      }).then(res => {
        if (res.data.respCode === '0') {
          this.AreaOptions = res.data.data
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
    // 添加货物信息
    toChooseGoods () {
      this.goodsDialogVisible = true
    },
    remoteMethod (query) {
      if (query !== '') {
        this.searchLoading = true
        this.send({
          name: '/typeController/getTypeName?fname=' + query,
          method: 'GET'
        }).then(res => {
          if (res.data.respCode === '0') {
            this.goodsNameoptions = res.data.data
            this.searchLoading = false
          } else {
            this.$message({
              message: res.data.message + '！',
              type: 'error'
            })
            this.searchLoading = false
          }
        }).catch((res) => {
          console.log(res)
        })
      } else {
        this.goodsNameoptions = []
      }
    },
    chooseGoodsName (value) {
      if (this.choosedGoods.indexOf(value) === -1) {
        this.choosedGoods.push(value)
      } else {
        this.$message({
          message: '已选择该货物，不可重复选择！',
          type: 'warning'
        })
      }
    },
    search () {
    },
    toChooseFee () {
      this.feeDialogVisible = true
    },
    sureFee () {
      if (!this.formFee.price) {
        this.$message({
          message: '运费不能为空！',
          type: 'warning'
        })
        return false
      }
      if (this.formFee.price < this.formFee.oil) {
        this.$message({
          message: '油卡费用不能大于运费！',
          type: 'warning'
        })
        return false
      }
      this.feeDialogVisible = false
      if (!this.formFee.oil) {
        this.feeString = '期望运费：' + this.formFee.price + '元'
      } else {
        this.feeString = '期望运费：' + this.formFee.price + '元 / 其中油卡：' + this.formFee.price + '元'
      }
    },
    toChooseService () {
      this.getService()
      this.serviceDialogVisible = true
    },
    // 获取服务需求
    getService () {
      this.send({
        name: '/typeController/tstype/2c90b4576e634e80016e637fb54a0003',
        method: 'GET'
      }).then(res => {
        if (res.data.respCode === '0') {
          this.serviceOptions = res.data.data
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
    sureService () {
      this.serviceString = ''
      this.services.map(item => {
        this.serviceString += ' | ' + item
      })
      this.serviceDialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.AddOrder{
  margin: 20px 20px 60px 20px;
  .columnTit{
    font-size: 14px;
    font-weight: bold;
  }
  .InfoList{
    &:not(:last-of-type){
      border-bottom: 6px solid #efefef;
    }
    margin-bottom: 15px;
    .faBlocksAddr{
      height: 50px;
      font-size: 14px;
      .LeftIcon{
        width: 50px;
        height: 50px;
        float: left;
      }
      .MiddleAddr{
        width: calc(100% - 100px);
        height: 50px;
        float: left;
        text-align: right;
        p{
          line-height: 25px;
        }
      }
      .RightArrow{
        width: 25px;
        height: 25px;
        margin-top: 12.5px;
        float: right;
      }
    }
    .faBlocksTime{
      height: 25px;
      line-height: 25px;
      margin-bottom: 10px;
      font-size: 14px;
      span{
        float: left;
      }
      .TimeBlock{
        width: calc(100% - 100px);
        float: left;
        text-align: right;
      }
      .RightArrow{
        width: 25px;
        height: 25px;
        float: right;
      }
    }
    .otherInfoBlocks{
      height: 50px;
      line-height: 50px;
      margin-bottom: 10px;
      font-size: 14px;
      span{
        float: left;
      }
      .MiddleAddr{
        width: calc(100% - 100px);
        height: 50px;
        float: left;
        text-align: right;
        p{
          line-height: 25px;
        }
      }
      .faBlocksTime{
        height: 25px;
        line-height: 25px;
        margin-bottom: 10px;
        font-size: 14px;
      }
      .RightArrow{
        width: 25px;
        height: 25px;
        margin-top: 12px;
        float: right;
      }
    }
  }
}
</style>
