<template>
  <div class="AddOrder">
    <el-card class="box-card">
      <div slot="header" class="clearfix TextAlignL">
        <span class="columnTit">发货人信息</span>
        <el-image style="width: 20px; height: 20px;float: right;" src="../../../static\images\icon\addAddr.png" fit="cover" @click="addOneFInfo"></el-image>
      </div>
      <div class="InfoList" v-for="(FaItem, FIdx) in fInfo" :key="FIdx">
        <div class="faBlocksAddr">
          <el-badge :value="fInfo.length > 1 ? FIdx + 1 : ''" class="item" style="float: left;">
            <el-image class="LeftIcon" src="../../../static\images\icon\fa.png" fit="cover"></el-image>
          </el-badge>
          <div class="MiddleAddr CursorPointer" @click="changePersonInfo(0, FIdx)">
            <p><span style="margin-right: 20px;">{{FaItem.fname}}</span><span>{{FaItem.fmobile}}</span></p>
            <p>{{FaItem.addr}} {{FaItem.faddress}}</p>
          </div>
          <el-image class="RightArrow CursorPointer" src="../../../static\images\icon\right-arrow.png" @click="changePersonInfo(0, FIdx)" fit="cover"></el-image>
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
        <el-image style="width: 20px; height: 20px;float: right;" src="../../../static\images\icon\addAddr.png" fit="cover"></el-image>
      </div>
      <div class="InfoList" v-for="(SItem, SIdx) in sInfo" :key="SIdx">
        <div class="faBlocksAddr">
          <el-badge :value="sInfo.length > 1 ? SIdx + 1 : ''" class="item" style="float: left;">
            <el-image class="LeftIcon" src="../../../static\images\icon\shou.png" fit="cover"></el-image>
          </el-badge>
          <div class="MiddleAddr CursorPointer">
            <p><span style="margin-right: 20px;">{{SItem.person}}</span><span>{{SItem.phone}}</span></p>
            <p>{{SItem.addr}}</p>
          </div>
          <el-image class="RightArrow CursorPointer" src="../../../static\images\icon\right-arrow.png" fit="cover"></el-image>
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
    <!-- 选择弹窗 -->
    <!-- 发货人信息 -->
    <el-dialog class="PersonInfoForm" title="添加发货人信息" :visible.sync="fInfoDialogVisible" width="520px" center :close-on-click-modal="false">
      <div class="MainBox">
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
          <Contacts v-if="contactListDialogVisible" ref="ContactsChild" :contractType="contractType" @backContractInfo="backContractInfo"/>
        </el-dialog>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="fInfoDialogVisible = false">取 消</el-button>
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
  </div>
</template>

<script>
import { mapState } from 'vuex' // mapActions
import { formatToString } from '../../util/utils'
import Contacts from './Contact'
export default {
  name: 'AddOrder',
  // props: ['orderType'],
  data () {
    return {
      dateTimeDialogVisible: false,
      carTypeDialogVisible: false,
      weightVolumeDialogVisible: false,
      fInfoDialogVisible: false,
      contactListDialogVisible: false,
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
      contractType: null,
      curPersonInfoIdx: null,
      curPersonInfoType: null, // 0 发货 1 收获
      fInfo: [
        {addr: '', faddress: '', fareacode: '', fareaname: '', fmobile: '', fmobile1: '', fname: '', fname1: '', ftype: 0, date: '', stage: '', time: ''}
      ],
      sInfo: [
        {person: '汪琪2', phone: '13888886666', addr: '上海市宝山区城银路555弄6号楼2楼', date: '2019-10-15', stage: '上午', time: '都可以'}
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
      weightVolumeString: ''
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
    fInfoDialogVisible: function (value) {
      if (value) {
        this.getProvince()
      }
    },
    'formFInfo.province': function (value) {
      if (value) {
        this.formFInfo.city = ''
        this.formFInfo.area = ''
        this.AreaOptions = []
        this.getCity()
      }
    },
    'formFInfo.city': function (value) {
      if (value) {
        this.formFInfo.area = ''
        this.getArea()
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
        addr: '',
        faddress: '',
        fareacode: '',
        fareaname: '',
        fmobile: '',
        fmobile1: '',
        fname: '',
        fname1: '',
        ftype: 0,
        date: '',
        stage: '',
        time: ''
      })
    },
    changePersonInfo (type, idx) {
      this.curPersonInfoIdx = idx
      this.curPersonInfoType = type
      this.fInfoDialogVisible = true
    },
    changeProvince (id) {
      this.ProvinceOptions.find(Province => {
        if (Province.id === id) {
          this.formFInfo.province = Province.fname
          this.formFInfo.provinceId = Province.id
        }
      })
    },
    changeCity (id) {
      this.CityOptions.find(City => {
        if (City.sareacode === id) {
          this.formFInfo.city = City.sareaname
          this.formFInfo.cityId = City.sareacode
        }
      })
    },
    changeArea (id) {
      this.AreaOptions.find(Area => {
        if (Area.fareacode === id) {
          this.formFInfo.area = Area.fareaname
          this.formFInfo.areaId = Area.fareacode
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
      // 0 发货人 1 提货人 2 发货人且提货人
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
          this.fInfo[this.curPersonInfoIdx].addr = this.formFInfo.province + this.formFInfo.city + this.formFInfo.area
          this.fInfo[this.curPersonInfoIdx].faddress = this.formFInfo.addr
          this.fInfo[this.curPersonInfoIdx].fareacode = this.formFInfo.areaId
          this.fInfo[this.curPersonInfoIdx].fareaname = this.formFInfo.area
          this.fInfo[this.curPersonInfoIdx].fmobile = this.formFInfo.fphone
          this.fInfo[this.curPersonInfoIdx].fmobile1 = this.formFInfo.tphone
          this.fInfo[this.curPersonInfoIdx].fname = this.formFInfo.fperson
          this.fInfo[this.curPersonInfoIdx].fname1 = this.formFInfo.tperson
          this.fInfoDialogVisible = false
          break
        case 1:
          this.sInfo[this.curPersonInfoIdx] = this.formFInfo
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
    getCity () {
      this.send({
        name: '/tokens/regionSelect?pid=' + this.formFInfo.provinceId + '&ftype=0&fname=' + this.formFInfo.province,
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
    getArea () {
      this.send({
        name: '/tokens/regionSelect?pid=' + this.formFInfo.provinceId + '&ftype=1&fname=' + this.formFInfo.city,
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
