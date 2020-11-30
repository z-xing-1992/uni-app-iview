<template>
	<view class="task-content">
		<view class="header-zhan"></view>
		<view class="task-table">
			<u-tabs :list="list" :is-scroll="false" :current="current" @change="change" bg-color='#3E414F' active-color='#FF8833'
			 inactive-color='#BDC0D2'></u-tabs>
		</view>
		<view class="task-list">
			<view class="no-task" v-if="noTask">
				<view class="no">
					<image src="../../static/icon/kongzhuangtai.png" mode=""></image>
					<text>无任务</text>
				</view>
			</view>
			<Cloud v-if='cloudShow' v-for='(item,index) in cloudList' :key='index' :item='item'></Cloud>
			<view class="no-task" v-if="noMission">
				<view class="no">
					<image src="../../static/icon/kongzhuangtai.png" mode=""></image>
					<text>尚未提货</text>
					<text @click="takeGoods">点击去提货</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Cloud from '../../components/Cloud.vue'
	export default {
		components: {
			Cloud,
		},
		data() {
			return {
				list: [{
					name: '全部'
				}, {
					name: '待配送'
				}, {
					name: '已交付'
				}, {
					name: '未送到'
				}],
				current: 0,
				noTask: true, //没有授权的显示
				noMission: false, //授权后没有任务的显示
				cloudShow: false, //授权后有任务的显示
				cloudList:[],//今日任务集合
				centList:[],//层
			}
		},
		onLoad() {
			let that=this
		},
		onShow() {
			let that=this
			let user = uni.getStorageSync("userMessage")
			if (user) {
				that.noTask = false
			} else {				
				uni.showModal({
					title: '提示',
					content: '您还没有授权,去授权',
					showCancel:false,
					success: function(res) {
						if (res.confirm) {
							uni.switchTab({
								url:'../index/index'
							})
						} 
					}
				});
			}
			let taskID=uni.getStorageSync('taskID')
			if(taskID){
				that.cloudShow = true
				that.noMission=false											
				that.$request({ //获取任务团点
					url: '/task/getTaskDetail',
					method: 'GET',
					data: {
						taskId: taskID
					},
				}).then(res => {
					if (res.resultCode == 0) {
						if(res.data.length!=0){
							that.cloudList = res.data.tDetails
							that.centList=res.data.tDetails
							let status = that.cloudList.every( item => item.status ==='30交付完成')
							if(status==true){
								uni.showModal({
									title: '提示',
									content: '任务团点全部完成',
									showCancel:false,
									success: function(res) {
										if (res.confirm) {
											uni.removeStorageSync('taskID')
											uni.navigateTo({
												url:'../todayTask/todayTask'
											})
										} 
									}
								});
							}														
						}else{
							uni.showModal({
								title: '提示',
								content: '任务未在规定时间送达',
								showCancel:false,
								success: function(res) {
									if (res.confirm) {
										uni.removeStorageSync('taskID')
										uni.navigateTo({
											url:'../todayTask/todayTask'
										})
									} 
								}
							})			
						}
					}
				
				}).catch
				
			}else{
				that.cloudShow = false
				that.noMission=true
			}
		},
		methods: {
			change(index) {
				let that=this
				that.current = index;
				if(index==0){
					that.cloudList=that.centList
				}
				if(index==1){
					let arr=[]
					for(let i=0;i<that.centList.length;i++ ){
						if(that.centList[i].status=='20运输中'){
							arr.push(that.centList[i])
						}
					}
					that.cloudList=arr
				}
				if(index==2){
					let arr=[]
					for(let i=0;i<that.centList.length;i++ ){
						if(that.centList[i].status=='30交付完成'){
							arr.push(that.centList[i])
						}
					}
					that.cloudList=arr
				}
				if(index==3){
					let arr=[]
					for(let i=0;i<that.centList.length;i++ ){
						if(that.centList[i].status=='99放弃'){
							arr.push(that.centList[i])
						}
					}
					that.cloudList=arr
				}
			},
			takeGoods() { //去提货
				uni.navigateTo({
					url: '../todayTask/todayTask'
				})
			},
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
	}

	.task-content {
		width: 100%;
		height: 100%;
	}
	.header-zhan{
		width: 100%;
		height: 80upx;
	}
	.task-table {
		width: 100%;
		background: #3E414F;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
	}
	.task-list {
		width: 100%;
		overflow: hidden;
		padding-top: 20upx;
		position: relative;
	}

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
