<template>
  <div class="GoodsList">
    <div class="ListBlock">
      <div class="FDirectoryBlock" v-loading="loadingF">
        <p v-for="(itemF, idxF) in goodsFDirectory" :key="idxF" :class="[curIdxF == idxF ? 'curKind' : '']" @click="changeKind(idxF, itemF.id)">{{itemF.fname}}</p>
      </div>
      <div class="SDirectoryBlock" v-loading="loadingS">
        <!-- <el-table :show-header="false"
          :data="goodsSDirectory"
          @selection-change="checkedGoodsChange"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="100">
          </el-table-column>
          <el-table-column
            prop="fname">
          </el-table-column>
        </el-table> -->
        <!-- <el-checkbox-group v-model="checkedGoods">
          <p v-for="(itemS, idxS) in goodsSDirectory" :key="idxS"><el-checkbox :label="itemS.fname" @change="checkedGoodsChange">{{itemS.fname}}</el-checkbox></p>
        </el-checkbox-group> -->
        <p v-for="(itemS, idxS) in goodsSDirectory" :key="idxS" @click="chooseGoods(itemS)">
          <span style="width:calc(90% - 20px);display:inline-block;" :class="[choosedNameList.indexOf(itemS.fname) != -1 ? 'activeChoosed' : '']">{{itemS.fname}}</span>
          <i class="el-icon-check" v-if="choosedNameList.indexOf(itemS.fname) != -1" style="width: 20px;color:#409EFF;"></i>
        </p>
      </div>
      <div class="emptyBlock"></div>
    </div>
    <el-button type="primary" class="MarginT_20" size="small" @click="backChoosedGoods">确 定</el-button>
  </div>
</template>

<script>
export default {
  name: 'GoodsList',
  props: ['choosedGoods'],
  data () {
    return {
      curIdxF: 0,
      loadingF: false,
      loadingS: false,
      goodsFDirectory: [],
      goodsSDirectory: [],
      choosedNameList: [],
      choosedCodeList: []
    }
  },
  created () {
    this.choosedNameList = this.choosedGoods.nameList
    this.choosedCodeList = this.choosedGoods.codeList
    this.getGoodsList()
  },
  methods: {
    changeKind (idx, id) {
      this.curIdxF = idx
      this.getSGoods(id)
    },
    getGoodsList () {
      this.loadingF = true
      this.send({
        name: '/typeController/list/1/1111',
        method: 'GET'
      }).then(res => {
        if (res.data.respCode === '0') {
          this.goodsFDirectory = res.data.data
          this.loadingF = false
          this.getSGoods(res.data.data[0].id)
        } else {
          this.$message({
            message: res.data.message + '！',
            type: 'error'
          })
          this.loadingF = false
        }
      }).catch((res) => {
        console.log(res)
        this.loadingF = false
      })
    },
    getSGoods (id) {
      this.loadingS = true
      this.send({
        name: '/typeController/' + id,
        method: 'GET'
      }).then(res => {
        if (res.data.respCode === '0') {
          this.goodsSDirectory = res.data.data
          this.loadingS = false
        } else {
          this.$message({
            message: res.data.message + '！',
            type: 'error'
          })
          this.loadingS = false
        }
      }).catch((res) => {
        console.log(res)
        this.loadingS = false
      })
    },
    checkedGoodsChange (value) {
      console.log(value)
    },
    chooseGoods (Goods) {
      let idx = this.choosedNameList.indexOf(Goods.fname)
      if (idx !== -1) {
        this.choosedNameList.splice(idx, 1)
        this.choosedCodeList.splice(idx, 1)
      } else {
        this.choosedNameList.push(Goods.fname)
        this.choosedCodeList.push(Goods.fcode)
      }
    },
    backChoosedGoods (Goods) {
      this.choosedNameList.map((name, idx) => {
        this.$emit('chooseGoodsName', {'fname': name, 'fcode': this.choosedCodeList[idx]})
      })
      this.$emit('closeGoodsList')
    }
  }
}
</script>

<style scoped>
.GoodsList{
  /* height: 320px; */
  text-align: center;
}
.ListBlock{
  width: calc(100% - 10px);
  height: 300px;
  position: relative;
  /* border: 1px solid #eeeeee;
  border-right: 0px solid #eeeeee; */
}
.FDirectoryBlock{
  width: 40%;
  height: 300px;
  float: left;
  overflow-y: scroll;
}
.SDirectoryBlock{
  width: calc(60% - 0px);
  height: 300px;
  position: relative;
  left: -15px;
  float: left;
  overflow-y: scroll;
  background: #fff;
}
.emptyBlock{
  width: 15px;
  height: 320px;
  position: absolute;
  top: -10px;
  right: 15px;
  overflow: hidden;
  background: #fff;
}
.FDirectoryBlock p, .SDirectoryBlock P{
  height: 40px;
  line-height: 40px;
  text-align: left;
  padding-left: 20px;
  cursor: pointer;
}
.FDirectoryBlock p{
}
.curKind{
  color: #409EFF;
  font-weight: bold;
}
.activeChoosed{
  color: #409EFF;
  font-weight: bold;
}
</style>
