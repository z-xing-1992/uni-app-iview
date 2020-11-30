<template>
	<view class="today-task-container">
		<view class="advertising">
			<image src="../../static/icon/error-warning.png" mode=""></image>
			<text>只允许执行一个任务,任务完成前不可以领取第二个任务</text>
		</view>
		<view class="taskList">	
			<view class="task-item" v-for='(item,index) in todayTaskList' :key='index'>
				<TodaysMission :item="item"></TodaysMission>
				<view class="zhezhao" v-if="!item.currentStatus" @click="zhezhaoLink(item.id)">
					<text>已有其他任务在执行</text>
					<text>查看明细</text>
				</view>
			</view>
		</view>
	</view>	
</template>

<script>
	import request from '../../until/request.js'
	import TodaysMission  from "../../components/TodaysMission.vue"
	export default {
		components:{
			TodaysMission,
		},
		data() {
			return {
				form:{
					pagination:{
						'size':8,
						'page':0,
					},
					query:{
						'task.driverInfo':'',
						"task.expectedArriveTime": {
						   "op": "between",							
							 "value": [
								new Date((Math.round((new Date().getTime()-24*60*60*1000)/1000+8*60*60))* 1000).toISOString().slice(0, 10)+" "+"22:00:00"
								,
								new Date((Math.round((new Date().getTime())/1000+8*60*60))* 1000).toISOString().slice(0, 10)+" "+"22:00:00"
								]
						}
					},
					sort:[
						{
						   "property": "task.status",
						   "direction":"ASC"	
						},
						{
							'direction':'ASC',
							'property':'task.expectedArriveTime',						
						}
					]					
				},
				todayTaskList:[],//今日任务集合
				isTrue:false, //正在加载中
				isTTrue:false, //到底了
			}
		},
		onLoad() {													
			let that=this
			this.gettaskList()
		},
		methods: {
			gettaskList(){ //获取任务列表
				let that=this
				let userMessage=uni.getStorageSync('userMessage')
				that.form.query["task.driverInfo"]=userMessage.phone				
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
						that.form.pagination.page++; //每触底一次 page +1
						that.todayTaskList=that.todayTaskList.concat(res.data) //将数据拼接在一起	
						that.isTTrue = res.data.length < that.form.pagination.size;
//---------------------------------------------------------------------------------------------------------------
						
						//初始化设置true
						that.todayTaskList.map((item)=>{
						    item.status == '00创建'? item.currentStatus = true: item.currentStatus = false							
						    return {
						        ...item
						    }
						})												
						// console.log(that.todayTaskList)
						// //刷新变化
						let currentIndex = null
						that.todayTaskList.map((item,index)=>{
						    if(item.status=='20运输中'){
						    //找到变化的索引位置index
						        currentIndex = index
						        return
						    }
						})
						console.log(currentIndex)
						if(currentIndex !=null){
						    //重新遍历
							that.todayTaskList.map((item,index)=>{
				
								if(currentIndex == index){
									//找到，反向
									item.currentStatus =true
									return
								}
								item.currentStatus= false
							})
							
						}				
//--------------------------------------------------------------------------------------------------						
	
						
						console.log(that.todayTaskList)
													
						
						
					}
				}).catch(erro => {})	
			},
			zhezhaoLink(id){ //点击遮罩跳到详情
				uni.setStorage({ //缓存该任务ID
					key:'id',
					data:id
				})
				uni.navigateTo({
					url:'../taskDetail/taskDetail?operate='+"0"
				})
			}
		},
		onReachBottom(){ //触底发生加载
		    if(!this.isTTrue){
				this.gettaskList()
			}
		},
		onPullDownRefresh(){
			this.form={
				pagination:{
					'size':8,
					'page':0,
				},
				query:{
					'task.driverInfo':'',
					"task.expectedArriveTime": {
					   "op": "between",
						"value": [
							new Date((Math.round((new Date().getTime()-24*60*60*1000)/1000+8*60*60))* 1000).toISOString().slice(0, 10)+" "+"22:00:00"
							,
							new Date((Math.round((new Date().getTime())/1000+8*60*60))* 1000).toISOString().slice(0, 10)+" "+"22:00:00"
							]
					}
				},
				sort:[
					{
					   "property": "task.status",
					   "direction":"ASC"	
					},
					{
						'direction':'ASC',
						'property':'task.expectedArriveTime',						
					}
				]						
			},
			this.todayTaskList=[]//今日任务集合
			this.isTrue=false //正在加载中
			this.isTTrue=false//到底了
			this.gettaskList()
		   setTimeout(function () {
		        uni.stopPullDownRefresh();
		   }, 2000);
		 },
	}
</script>

<style>
	page{width: 100%;height: 100%;}
	.today-task-container{width: 100%;height: 100%;}
	.advertising{width: 100%;height: 68upx;background: #5C5E67;line-height: 68upx;}
	.advertising image{display: block;float: left;width: 30upx;height: 30upx;margin: 19upx 11upx 19upx 24upx;}
	.advertising text{display: inline-block;font-size: 26upx;color: #fff;}
	.taskList{width: 100%;overflow: hidden;position: relative;}
	.zhezhao{
		background:rgba(120,122,131,0.7) ;width: 100%;height: 305upx;position: absolute;top: 20upx;left: 0;
		border-radius: 8upx;
		z-index: 999;
	}
	.zhezhao text{display: block;width: 100%;text-align: center;}
	.zhezhao text:nth-of-type(1){font-size: 34upx;color: #FFFFFF;margin-top: 67upx ;}
	.zhezhao text:nth-of-type(2){font-size: 30upx;color: #fff;margin-top: 50upx;text-decoration:underline;}
	.task-item{width:702upx;overflow: hidden;margin: 0 auto;position: relative;}
</style>
