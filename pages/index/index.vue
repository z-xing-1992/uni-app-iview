<template>
	<view class="content">
		<view class="topBox">	              
				<view :style="{height: statusBarHeight+ 'px'}"></view>	              
				<view class="biaoyiji" :style="{height: barHeight+ 'px'}">
					<view class="location" @click="getAddress()">
						<image src="../../static/icon/positioning.png" mode=""></image>
						<text>{{address}}</text>
					</view>
					<view class="header-title">
						<text>首页</text>
					</view>
				</view>
		</view>
		<view class="user">
			<view class="userInfo">
				<view class="userInfo-msg">
					<image :src="src" mode=""></image>
					<text v-if="nameShow">{{userInfor.name}}</text>
					<button class="sys_btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" v-if="btnShow">请授权</button>
				</view>
				<view class="current-task">
					<text class="current">当前任务</text>
					<text class="nocurrent" v-if='notask'>无任务</text>
					<text class="nocurrent" v-if='haveTask'>ID：{{taskID}}</text>
					<view class="pickGoods" v-if="pickGoodsShow" @click="goTask">
						<text>去提货</text>
						<image src="../../static/icon/arrow-right-yello.png" mode=""></image>
					</view>
					<view class="pickGoods" v-if="particulars" @click="goTotaskdetal">
						<text>明细</text>
						<image src="../../static/icon/arrow-right-yello.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="tabType">
				<view>
					<text>{{num.all?num.all:0}}</text>
					<text>全部团点</text>
				</view>
				<view>
					<text>{{num.remaining?num.remaining:0}}</text>
					<text>剩余团点</text>
				</view>
				<view>
					<text>{{num.complete?num.complete:0}}</text>
					<text>已完成</text>
				</view>
			</view>
		</view>
		<view class="task" v-if="taskShow"> 
			<view class="today-task" @click="linkToTast(0)">
				<image src="../../static/icon/today.png" mode="" class="todayLogo"></image>
				<text>今日任务</text>
				<image src="../../static/icon/arrow-right.png" mode="" class="arrowRight"></image>
			</view>
			<view class="history-task" @click="linkToTast(1)">
				<image src="../../static/icon/history.png" mode="" class="historyLogo"></image>
				<text>历史任务</text>
				<image src="../../static/icon/arrow-right.png" mode="" class="arrowRight"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../until/request.js'
	import QQMapWX from '../../until/qqmap-wx-jssdk.min.js'  
	export default {
		data() {
			return {
				src: require('../../static/userLogo.png'),
				list: [
					'寒雨连江夜入吴',
					'平明送客楚山孤',
					'洛阳亲友如相问',
					'一片冰心在玉壶'
				],
				form: {
					openid: '',
					encryptedData: '',
					iv: '',
				},
				userInfor: '', //司机信息
				btnShow: true, //授权按钮的显示影藏
				nameShow: false, //名字的显示影藏
				taskShow: false, //今日任务和历史任务选择的影藏
				pickGoodsShow: false, //去提货显示影藏
				particulars: false, //明细显示影藏
				notask:true,//无任务显示影藏
				haveTask:false,//有任务显示
				taskID:'',//任务ID
				address:'点击授权定位',
				num:{
					all:'',
					remaining:'',
					complete:''
				},
				statusBarHeight:'',
				barHeight:'',
			}
		},
		onLoad() {
			this.getOppenid()
			let that = this
			let user = uni.getStorageSync('userMessage')
			if (user) {
				that.btnShow = false
				that.nameShow = true
				that.taskShow = true
				that.pickGoodsShow = true
				that.userInfor = user
			}else{
				that.btnShow = true
				that.nameShow = false
				that.taskShow = false
				that.pickGoodsShow = false
				that.userInfor = ''
			}
			uni.getSystemInfo({
				success: (res) => {
					that.statusBarHeight = res.statusBarHeight
					// #ifdef MP-WEIXIN
							let menu = wx.getMenuButtonBoundingClientRect();
					  
							that.barHeight = menu.bottom + menu.top - res.statusBarHeight * 2;
					// #endif
				}
			})
		},
		onShow() {
			let that=this			
			let user = uni.getStorageSync('userMessage')
			if (!user) {
				that.btnShow = true
				that.nameShow = false
				that.taskShow = false
				that.pickGoodsShow = false
				that.userInfor = ''
			}else{
				that.getNumber()
			}
		},
		methods: {
			linkToTast(index) { //跳到今日任务
				if (index == 0) {
					uni.navigateTo({
						url: '../todayTask/todayTask'
					})
				}
				if (index == 1) {
					uni.navigateTo({
						url: '../historyTask/historyTask'
					})
				}
			},
			goTask(){ //去提货
				uni.navigateTo({
					url: '../todayTask/todayTask'
				})
			},
			getOppenid() { //获取oppenid
				let that = this
				uni.login({
					success: function(res) {
						that.$request({
							url: '/login/getWxAuth',
							method: 'POST',
							data: {
								jsCode: res.code
							},
						}).then(result => {
							if (result.resultCode == 0) {
								that.form.openid = result.data.openid
							}
						}).catch(erro => {

						})
					}
				});
			},
			getPhoneNumber(e) { //获取微信手机授权登录
				let that = this
				if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {

				} else {
					that.form.encryptedData = e.detail.encryptedData
					that.form.iv = e.detail.iv
					that.$request({
						url: '/login/login',
						method: 'POST',
						data: that.form
					}).then(res => {
						if (res.resultCode == 0) {
							if (Object.keys(res.data).length == 0) {
									uni.showModal({
									    title: '提示',
									    content: '用户未注册',
										showCancel:false,
									    success: function (result) {
									        if (result.confirm) {
									           
									        } 
									    }
									});
							} else {
								that.userInfor = res.data
								uni.setStorage({ //缓存司机信息
									key: 'userMessage',
									data: res.data
								})
								that.btnShow = false;
								that.nameShow = true;
								that.taskShow = true;
								that.pickGoodsShow = true
								that.getNumber()
							}
						}
					}).catch(erro => {

					})
				}

			},
			getAddress(){
				let that=this
				uni.getLocation({
					type:'gcj02',//
					success:function(res){
						let qqmapsdk = new QQMapWX({
						  key: 'DLLBZ-BC3W4-RENUP-DGTBF-WDWJ3-5AFRW'
						});
						const latitude=res.latitude
						const longitude=res.longitude
						qqmapsdk.reverseGeocoder({
							location:{
								latitude: latitude,
								longitude: longitude
							},
							success(res){
								that.address=res.result.ad_info.city+' '+res.result.ad_info.district
								uni.openLocation({
									 latitude: latitude,
									 longitude: longitude,
									 name:res.result.address,
									 address:res.result.formatted_addresses.recommend,
									 success: function () {
									}
								})
							}
						})		
					}
				})
			},
			goTotaskdetal(){ //点击明细跳到任务详情页
				uni.navigateTo({
					url:'../taskDetail/taskDetail'
				})
			},
			getNumber(){  //获取任务完成数量
				let that=this
				let id=uni.getStorageSync('taskID')
				if(id){
					that.taskID=id
					that.notask=false
					that.haveTask=true
					that.pickGoodsShow=false
					that.particulars=true
					that.$request({  //获取任务详情
						url: '/task/getTaskDetail',
						method: 'GET',
						data:{
							taskId:id
						},
					}).then(res => {
						if(res.resultCode==0){
							that.num.all=res.data.tDetails.length
							let count=0
							for(let i=0;i<res.data.tDetails.length;i++){
								if(res.data.tDetails[i].status=='30交付完成'){
									count++
								}
							}
							that.num.complete=count
							that.num.remaining=res.data.tDetails.length-count
							if(count==res.data.tDetails.length){
								uni.removeStorageSync('taskID')
							}
						}
					}).catch(erro => {})	
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
	}
	.content {
		width: 100%;
		height: 100%;
	}
	.sys_btn {
		padding: 0;
		width: 150upx;
		display: block;
		float: left;
		line-height: 100upx;
		text-align: center;
		font-size: 30upx;
		background: #3E414F;
		border: none;
		outline: none;
		color: #fff;
	}

	.sys_btn::after {
		border: none;
	}
	.topBox{width: 100%;background:  #3E414F}	
	.location{
		float: left;
		margin-left:24upx;
		height: 100%;
		line-height: 88upx;
	}
	.location image{width:28upx ;height: 33upx;display: block;float: left;margin-top: 30upx;}
	.location text{display: block;float: left;font-size: 26upx;color: #fff;}
	.header-title {
		float: left;
		font-size: 30upx;
		color: #fff;
		font-family: PingFang SC;
		margin-left:140upx;
		height: 100%;
		line-height: 88upx;
	}
	.user {
		width: 100%;
		height: 338upx;
		background: #3E414F;
		padding-top: 55upx;
	}

	.userInfo {
		width: 100%;
		height: 110upx;
	}

	.userInfo-msg {
		float: left;
		width: 50%;
		height: 100%;
	}

	.userInfo-msg image {
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
		float: left;
		display: block;
		margin-left: 30upx;
	}

	.userInfo-msg text {
		display: block;
		float: left;
		line-height: 100upx;
		color: #fff;
		font-size: 30upx;
		margin-left: 21upx;
	}

	.current-task {
		float: right;
		position: relative;
		width: 50%;
		height: 100%;
		background: rgba(80, 83, 95, 0.6);
		border-radius: 8px 0px 0px 8px;
	}

	.pickGoods {
		position: absolute;
		top: 30upx;
		right: 10upx;
		font-size: 30upx;
	}

	.pickGoods text {
		color: #FF8833;
		display: block;
		float: left;
	}

	.pickGoods image {
		display: block;
		float: right;
		width: 11upx;
		height: 18upx;
		margin: 13upx 0 0 10upx;
	}

	.current-task text {
		display: block;
	}

	.current {
		font-size: 26upx;
		color: #BDC0D2;
		margin: 10upx 0 13upx 22upx;
	}

	.nocurrent {
		font-size: 30upx;
		color: #fff;
		margin-left: 22upx;
	}

	.tabType {
		width: 100%;
		overflow: hidden;
		display: flex;
		justify-content: space-evenly;
		margin-top: 60upx;
	}

	.tabType view {
		width: 30%;
	}

	.tabType view text {
		display: block;
	}

	.tabType view text:nth-of-type(1) {
		font-size: 42upx;
		color: #FEFEFE;
		text-align: center;
	}

	.tabType view text:nth-of-type(2) {
		font-size: 28upx;
		color: #BDC0D2;
		text-align: center;
	}

	.task {
		width: 100%;
		overflow: hidden;
		padding: 0 50upx;
	}

	.today-task,
	.history-task {
		width: 100%;
		height: 80upx;
		line-height: 80upx;
	}

	.today-task {
		margin: 30upx 0 30upx 0;
	}

	.today-task text,
	.history-task text {
		display: block;
		float: left;
		font-size: 30upx;
		color: #3E414F;
	}

	.todayLogo {
		width: 30upx;
		height: 30upx;
		display: block;
		float: left;
		margin-top: 26upx;
		margin-right: 13upx;
	}

	.historyLogo {
		display: block;
		float: left;
		width: 28upx;
		height: 30upx;
		margin-top: 26upx;
		margin-right: 13upx;
	}

	.arrowRight {
		width: 16upx;
		height: 26upx;
		float: right;
		margin-top: 30upx;
	}
</style>
