<template> 
	<!-- 今日任务 -->
	<view class="TodaysMission-item" @click="linkInto">
		<view class="item-top">
			<view class="taskID">
				<text style="color: #777777;">任务ID：</text>
				<text style="color: #3E414F;font-weight: bold;">{{item.id}}</text>
			</view>
			<view class="line-road">
				<text style="color: #777777;">线路：</text>
				<text style="color: #3E414F;font-weight: bold;">{{item.routeCode}}</text>
			</view>
		</view>
		<view class="item-centre">
			<view class="taskID" style="margin-top: 5upx;">
				<text style="color: #777777;">团点数量：</text>
				<text style="color: #3E414F;font-weight: bold;">{{item.tDetails.length}}</text>
			</view>
			<view class="detail">
				<text>明细</text>
				<image src="../static/icon/arrow-right-white.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="progress">
			<view style="width: 50%;margin: 20upx 0 30upx 0;float: left;">
				<u-line-progress :percent="pocent" :show-percent="false" active-color='#FF8833' inactive-color='#F7E4D6'></u-line-progress>
			</view>
			<text class="complete">完成度{{pocent}}%</text>
		</view>
		<view class="item-bottom">
			<view class="state">
				<text style="color: #777777;">状态：</text>
				<text style="font-weight: bold;color: #3BBCA3;" v-if="item.flag==1">正常</text>
				<text style="font-weight: bold;color: #FF5959;" v-if="item.flag==0">异常</text>
			</view>
			<view class="progress-detail">
				<text style="color: #777777;">进度：</text>
				<text style="font-weight: bold;color: #FF5959;" v-if="item.status=='00创建'">创建</text>
				<text style="font-weight: bold;color: #3BBCA3;" v-if="item.status=='20运输中'">运输中</text>
				<text style="font-weight: bold;color: #3BBCA3;" v-if="item.status=='90完成'">完成</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			 item: Object,
			 required: true
		},
		data() {
			return {
				pocent:0,//完成度百分比
			};
		},
		created() {
			let arr=this.item.tDetails
			let count=0
			for(let i = 0; i < arr.length; i++){
				if(arr[i].status=='30交付完成'){
					count++
				}
			}
			this.pocent=parseInt((count/arr.length)*100)
		},
		methods:{
			linkInto(){ //跳转到任务详情
			let that=this
				uni.setStorage({ //缓存该任务ID
					key:'id',
					data:that.item.id
				})
				uni.navigateTo({
					url:'../taskDetail/taskDetail'
				})
			},
		}
	}
</script>

<style>
	.TodaysMission-item{width: 702upx;overflow: hidden;background: #FFFFFF;box-shadow: 0px 0px 16px 0px rgba(62, 65, 79, 0.3);
	border-radius: 8px;margin: 20upx auto 20upx;padding: 0 0 0 27upx;position: relative;}
	.TodaysMission-item text{display: inline-block;font-size: 26upx;}
	.item-top,.item-centre,.item-bottom{display: flex;justify-content: space-between;}
	.item-top{margin-top: 26upx;width: 100%;}
	.item-centre{margin-top: 20upx;width: 100%;}
	.progress{width: 650upx;border-bottom: 1upx solid #EDEDED;overflow: hidden;}
	.item-bottom{margin:20upx 0 26upx 0;width: 100%;}
	.line-road{margin-right: 225upx;}
	.progress-detail{margin-right: 215upx;}
	.detail {position: relative;}
	.detail text{width: 142upx;height: 48upx;background: #FF8833;border-radius: 8upx 0px 0px 8upx;line-height: 48upx;text-indent: 1em;font-size: 30upx;color: #fff;}
	.detail image{width: 11upx;height: 18upx;float: right;position: absolute;right: 30upx;top: 18upx;}
	.complete{float: left;display: inline-block;margin:20upx 0 0 10upx;font-size: 26upx;color: #3E414F;}
</style>
