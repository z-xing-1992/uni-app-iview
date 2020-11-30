<template>
	<view class="cloudPoint-container">
		<view class="header-zhan"></view>
		<view class="state-switch">
			<u-tabs :list="list" :is-scroll="false" :current="current" @change="change" bg-color='#3E414F' active-color='#FF8833'
			 inactive-color='#BDC0D2'></u-tabs>
		</view>
		<view class="cloudPoint-list">
			<Cloud v-for='(item,index) in cloudList' :key='index' :item='item'></Cloud>
			<view class="loudPoint-zhanwei"></view>
		</view>
		<view class="backUp" @click="backUp">
			返回
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
					name: '已交付',
				}, {
					name: '未送到',
				}],
				id: "", //任务ID
				current: 0,
				cloudList: [], //今日任务集合
				centList:[],//层
			}
		},
		onLoad() {
			let that=this
			this.getcloudList()
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
			backUp() {
				uni.navigateBack({
					delta: 1
				})
			},
			getcloudList() {//获取任务团点列表
				let that = this
				let id = uni.getStorageSync('id')
				that.$request({ 
					url: '/task/getTaskDetail',
					method: 'GET',
					data: {
						taskId: id
					},
				}).then(res => {
					if (res.resultCode == 0) {
						uni.setNavigationBarTitle({
							title:res.data.waveNo+"团点列表"
						})
						that.cloudList = res.data.tDetails
						that.centList=res.data.tDetails
					}

				}).catch
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
	}

	.cloudPoint-container {
		width: 100%;
		height: 100%;
		position: relative;
	}
	.header-zhan{width: 100%;height: 80upx;}
	.state-switch {
		width: 100%;
		overflow: hidden;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
	}

	.cloudPoint-list {
		width: 100%;
		overflow: hidden;
		background: #F6F5F5;
		padding-top: 20upx;
	}

	.backUp {
		width: 100%;
		height: 90upx;
		font-size: 30upx;
		color: #fff;
		text-align: center;
		line-height: 90upx;
		background: linear-gradient(270deg, #FF8833 0%, #FAA951 100%);
		position: fixed;
		left: 0;
		bottom: 0;
	}
	.loudPoint-zhanwei{width: 100%;height:120upx ;}
</style>
