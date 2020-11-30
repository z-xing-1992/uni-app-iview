<template>
	<view class="today-task-container">
		<view class="header-zhan"></view>
		<view class="search-screening">
			<view class="search">
				<image src="../../static/icon/search.png" mode=""></image>
				<input type="search" v-model="value" placeholder="输入任务ID进行搜索" @confirm='check'/>
			</view>
			<!-- <view class="screening" @click="poupShow=true">
				<text>筛选</text>
				<image src="../../static/icon/filter.png" mode=""></image>
			</view> -->
			<view class="screening" >
				<text>筛选</text>
				<image src="../../static/icon/filter.png" mode=""></image>
			</view>
		</view>
		<view class="taskList">
			<view class="no-task" v-if="noTask">
				<view class="no">
					<image src="../../static/icon/kongzhuangtai.png" mode=""></image>
					<text>无历史任务</text>
				</view>
			</view>
			<HistoryMission v-if='show' v-for='(item,index) in historyTaskList' :key='index' :item='item'></HistoryMission>
		</view>
		<!-- <view class="Poup">
			<u-popup v-model="poupShow" mode="bottom" border-radius="24" :closeable="true"> 
				<view class="screening-poup">
					<view class="screening-title">
						<text>筛选</text>
					</view>
					<view class="delivery">
						<view class="delivery-title">
							<text>提货状态</text>
						</view>
						<view class="delivery-list">
							<text :class="pick==0?'Active':'Actove'" @click="Pick(0)">全部</text>
							<text :class="pick==1?'Active':'Actove'"  @click="Pick(1)">正常</text>
							<text :class="pick==2?'Active':'Actove'" @click="Pick(2)">异常</text>
						</view>
					</view>
					<view class="delivery">
						<view class="delivery-title">
							<text>完成度</text>
						</view>
						<view class="delivery-list">
							<text :class="success==0?'Active':'Actove'" @click="Success(0)">全部</text>
							<text :class="success==1?'Active':'Actove'" @click="Success(1)">全部完成</text>
							<text :class="success==2?'Active':'Actove'" @click="Success(2)">部分完成</text>
						</view>
					</view>
				</view>
				<view class="select">
					<text @click="selectType(0)">清除筛选</text>
					<text @click="selectType(1)">确定筛选</text>
				</view>
			</u-popup>
		</view> -->
	</view>	
</template>

<script>
	import HistoryMission  from "../../components/HistoryMission.vue"
	import request from '../../until/request.js'
	export default {
		components:{
			HistoryMission,
		},
		data() {
			return {
				poupShow:false,//筛选弹窗
				pick:0,//筛选提货状态用
				success:0,//筛选完成度用
				noTask:true,//没有历史任务
				show:false,//有历史任务显示
				value:'',//搜索的内容
				form:{
					pagination:{
						'size':8,
						'page':0,
					},
					query:{
						'task.driverInfo':'',
						"task.expectedArriveTime": {
						   "op": "between",
						   "value": [new Date().toISOString().slice(0, 10)+" "+"00:00:00", new Date().toISOString().slice(0, 10)+" "+"22:00:00"]
						},
					},
					sort:{
						'direction':'DESC'
					}
				},
				historyTaskList:[],//今日任务集合
				isTrue:false, //正在加载中
				isTTrue:false, //到底了
			}
		},
		onLoad() {
			let that=this
			this.lastMonthDate()
			uni.getSystemInfo({
				success: (res) => {
					if (res.model.indexOf('iPhone X') != -1 || res.model.indexOf("iPhone XR") != -1 || res.model.indexOf(
							"iPhone XS Max") != -1) {
						that.fit = true
					} else {
						that.fit = false;
					}
				}
			})
		},
		methods: {
			Pick(index){ //筛选切换提货状态样式
				this.pick=index
			},
			Success(index){ //筛选切换完成度样式
				this.success=index
			},
			selectType(index){ //清除或者确定筛选
				if(index==0){
					this.pick=0
					this.success=0				
				}
				if(index==1){ //传值进行请求接口
					
					
					
					
				}
			},
			lastMonthDate(){  //获取过去3个月的时间 请求获取获取过去三个月的任务
			     var Nowdate = new Date();
			     var vYear = Nowdate.getFullYear();
			     var vMon = Nowdate.getMonth() -1;
				 var vDay = Nowdate.getDate();
			 　　//每个月的最后一天日期（为了使用月份便于查找，数组第一位设为0）
			     var daysInMonth = new Array(0,31,28,31,30,31,30,31,31,30,31,30,31);
			    if(vMon==1){
			         vYear = Nowdate.getFullYear()-1;
			         vMon = 12;
			     }else{
			         vMon = vMon -1;
			    }
			 　　//若是闰年，二月最后一天是29号
			    if(vYear%4==0&&vYear%100!= 0||vYear%400==0){
			        daysInMonth[2]= 29;
			     }
			    if(daysInMonth[vMon] < vDay){
			        vDay = daysInMonth[vMon];
			     }
			     if(vDay<10){
			         vDay="0"+vDay;
			     }
			     if(vMon<10){
			        vMon="0"+vMon;
			     }
			     var date =vYear+"-"+ vMon +"-"+vDay;
				 let that=this
				 let userMessage=uni.getStorageSync('userMessage')
				 that.form.query["task.driverInfo"]=userMessage.phone	
				 that.form.query['task.expectedArriveTime'].value=[date+' '+'22:00:00' ,new Date().toISOString().slice(0, 10)+" "+"00:00:00"]
				 if(that.isTrue)return;
				 if(that.isTTrue)return ;
				 that.isTrue=true;
				 that.$request({
				 	url: '/task/getTaskList',
				 	method: 'POST',
				 	data:that.form,
				 }).then(res => {
				 	console.log(res)
				 	that.isTrue=false;
				 	if(res.resultCode==0){
						if(res.data.length>0){
							that.noTask=false
							that.show=true
						}
				 		that.form.pagination.page++; //每触底一次 page +1
				 		that.historyTaskList=that.historyTaskList.concat(res.data) //将数据拼接在一起
				 		that.isTTrue = res.data.length < that.form.pagination.size;
				 	}
				 }).catch(erro => {})	
				 
			 },
			 check(){ //搜索框按下搜索
				let that=this
				that.form={
					pagination:{
						'size':8,
						'page':0,
					},
					query:{
						'task.driverInfo':'',
						"task.expectedArriveTime": {
						   "op": "between",
						   "value": [new Date().toISOString().slice(0, 10)+" "+"00:00:00", new Date().toISOString().slice(0, 10)+" "+"22:00:00"]
						},
						'taskId':that.value
					},
					sort:{
						'direction':'DESC'
					}
				},
				that.historyTaskList=[],//今日任务集合
				that.isTrue=false, //正在加载中
				that.isTTrue=false, //到底了
				that.noTask=true
				that.show=false
				this.lastMonthDate()
			 },
		},
		onReachBottom(){ //触底发生加载
		    if(!this.isTTrue){
				this.lastMonthDate()
			}
		},
	}
</script>

<style>
	page{width: 100%;height: 100%;}
	.today-task-container{width: 100%;height: 100%;}
	.header-zhan{width: 100%;height: 118upx;}
	.search-screening{width: 100%;overflow: hidden;background:#3E414F;position: fixed;left: 0;top: 0;z-index: 999;}
	.search{float: left;position: relative;}
	.search image{width: 31upx;height: 31upx;position: absolute;top: 50upx;left: 40upx;}
	.search input{width: 520upx;height: 68upx;border-radius: 34upx;background: #5C5E67;margin: 30upx 0 20upx 24upx;
	padding: 0 0 0 60upx;color: #D4D3D3;}
	.screening{float: right;font-size: 26upx;color: #fff;height: 68upx;margin-top: 30upx;margin-right: 24upx;line-height: 68upx;}
	.screening text{display: inline-block;}
	.screening image{width: 28upx;height: 27upx;display: block;float: right;margin: 20upx 0 0 10upx;}	
	.taskList{width: 100%;overflow: hidden;position: relative;}
	.Poup{width: 100%;overflow: hidden;}
	.screening-poup{width: 100%;overflow: hidden;border-bottom: 1upx solid #E7E7E7;padding: 0 0 0 52upx;}
	.screening-title{margin-top: 51upx;font-size:36upx ;color: #3E414F;font-weight: bold;margin-bottom: 74upx;}
	.delivery-title{font-size:30upx ;color: #3E414F;margin-bottom: 30upx;}
	.delivery-list{display: flex;justify-content: space-evenly;}
	.delivery-list text{display: inline-block;width:200upx ;height: 66upx;text-align: center;line-height: 66upx;
	font-size:26upx ;border-radius: 8upx;margin-bottom: 40upx;}
	.select{width: 100%;overflow: hidden;}
	.select text{display: inline-block;height: 90upx;line-height: 90upx;text-align: center;font-size: 30upx;}
	.select text:nth-of-type(1){width: 251upx;border: 2upx solid #C5C9D1;border-radius: 8upx;margin: 30upx 30upx 30upx 51upx;}
	.select text:nth-of-type(2){width: 368upx;margin: 30upx 0;background: linear-gradient(270deg, #FF8833 0%, #FAA951 100%);border-radius: 8upx;color: #fff;}
	.Active{background: #FFF3EA;border: 2upx solid #FF8833;border-radius: 8upx;color: #FF8833;}
	.Actove{background: #F5F7FA;border-radius: 8upx;color:#3E414F;}
	.no-task {
		width: 100%;
		height: calc(100vh - 250upx);
	}
	
	.no {
		position: absolute;
		left: 211upx;
		top: 237upx;
		margin: auto;
		width: 329upx;
		overflow: hidden;
	}
	
	.no image {
		width: 329upx;
		height: 288upx;
		display: block;
	}
	
	.no text:nth-of-type(1) {
		display: block;
		width: 100%;
		overflow: hidden;
		font-size: 38upx;
		color: #666666;
		text-align: center;
		margin-top: 46upx;
	}
	
	.no text:nth-of-type(2) {
		display: block;
		width: 100%;
		overflow: hidden;
		font-size: 42upx;
		color: #FF8833;
		text-align: center;
		margin-top: 26upx;
		text-decoration: underline
	}
</style>
