<template>
	<view class="t-td" :style="{ 'border-width': thBorder + 'px','border-color':borderColor ,'font-size':fontSize+'px' ,'color':color,'justify-content':tdAlignCpd}"
	:class="{'red':redTrue,'green':greenTrue,'blue':blueTrue}">
		<slot ></slot>
	</view>
</template>

<script>
	// :class="{'red':colorstyle=='BW'||'bw','green':colorstyle=='CW'||'cw','blue':colorstyle=='LC'||'lc'}">
	export default {
		props: {
			align: String,
			colorstyle:String,
			require:true
		},
		data() {
			return {
				thBorder: '1',
				borderColor: '#d0dee5',
				fontSize: '14',
				color: '#555c60',
				tdAlign: 'center',
				redTrue:false,
				greenTrue:false,
				blueTrue:false
			};
		},
		inject: ['table', 'tr'],

		created() {
			if(this.colorstyle=='BW'||this.colorstyle=='bw')this.redTrue=!this.redTrue
			if(this.colorstyle=='CW'||this.colorstyle=='cw')this.greenTrue=!this.greenTrue
			if(this.colorstyle=='LC'||this.colorstyle=='lc')this.blueTrue=!this.blueTrue
			this.thBorder = this.table.border;
			this.borderColor = this.table.borderColor;
			this.fontSize = this.tr.fontSize;
			this.color = this.tr.color;
			if (this.align) {
				this.tdAlign = this.align;
			} else {
				this.tdAlign = this.tr.align
			}
		},
		computed: {
			tdAlignCpd() {
				let nameAlign = '';
				switch (this.tdAlign) {
					case 'left':
						nameAlign = 'flex-start'
						break;
					case 'center':
						nameAlign = 'center'
						break;
					case 'right':
						nameAlign = 'flex-end'
						break;
					default:
						nameAlign = 'center'
						break;
				}
				return nameAlign
			}
		}
	};
</script>

<style>
	.t-td {
		flex: 1;
		display: flex;
		align-items: center;
		width: 100%;
		padding: 14upx;
		border-top: 1px #d0dee5 solid;
		border-left: 1px #d0dee5 solid;
		text-align: center;
		color: #555c60;
		font-size: 28upx;

	}
	.red{
		background: #FF5959;
		flex: 1;
		display: flex;
		align-items: center;
		width: 100%;
		padding: 14upx;
		border-top: 1px #d0dee5 solid;
		border-left: 1px #d0dee5 solid;
		text-align: center;
		color: #fff;
		font-size: 28upx;
	}
	.green{
		background: #06BD7D;
		flex: 1;
		display: flex;
		align-items: center;
		width: 100%;
		padding: 14upx;
		border-top: 1px #d0dee5 solid;
		border-left: 1px #d0dee5 solid;
		text-align: center;
		color: #fff;
		font-size: 28upx;
	}
	.blue{
		background: #4868FB;
		flex: 1;
		display: flex;
		align-items: center;
		width: 100%;
		padding: 14upx;
		border-top: 1px #d0dee5 solid;
		border-left: 1px #d0dee5 solid;
		text-align: center;
		color: #fff;
		font-size: 28upx;
	}
</style>
