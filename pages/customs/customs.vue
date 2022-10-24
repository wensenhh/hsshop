<template>
	<view>
		<view class="bigimg">
			<image src="/static/images/baodimg.png" mode=""></image>
		</view>
		<view class="mainbox xfbox">
			<view class="title">
				我的等级: 有效用户/本月消费额已达标
			</view>
			<view class="xfdata">
				<view>
					<view class="pricebox">
						<text>¥</text>5000.00
					</view>
					<view class="ztitle">累计消费</view>
				</view>
				<view>
					<view class="pricebox">
						<text>¥</text>5000.00
					</view>
					<view class="ztitle">累计消费</view>
				</view>
			</view>
			<view class="bdbtn">
				前往保单专区
			</view>
		</view>
		<view class="mainbox databox">
			<view class="topnavbox">
				<view>我的数据 <text>My Data</text> </view>
				<view>查看详情 <text>></text> </view>
			</view>
			<view class="bomdatabox">
				<view>我的等级 (My level):</view>
				<view>有效用户</view>
			</view>
			<view class="bomdatabox">
				<view>代理等级 (Agency lecel):</view>
				<view>非代理</view>
			</view>
			<view class="bomdatabox">
				<view>省市区代 (Regional agent):</view>
				<view>湖南省代理</view>
			</view>
			<view class="bomdatabox">
				<view>运营中心 (Operation cent):</view>
				<view>是/否</view>
			</view>
			<view class="bomdatabox">
				<view>直推/团队有效用户 (Valid use):</view>
				<view>10/100</view>
			</view>
			<view class="bomdatabox">
				<view>团队业绩 (Team performan):</view>
				<view>10100.00</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	page{
		height: auto;
		display: flex;
		flex-direction: column;
		background-color: #F7F7F7;
		padding: 0 30rpx;
	}
	.bigimg{
		width: 100%;
		height: 260rpx;
		border-radius: 30rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.mainbox{
		height: auto;
		display: flex;
		flex-direction: column;
		background-color: #ffffff;
		margin-top: 24rpx;
		padding: 32rpx 20rpx;
		border-radius: 24rpx;
	}
	.xfbox{
		.title{
			font-size: 28rpx;
			font-weight: 400;
			color: #000000;
		}
		.xfdata{
			display: flex;
			flex: 1;
			margin-top: 20rpx;
			>view{
				width: 50%;
				display: flex;
				flex-direction: column;
				height: 120rpx;
				padding: 20rpx 0 ;
				&:first-child{
					border-right: 1px solid #F5F5F5;
				}
				&:last-child{
					padding-left: 40rpx;
				}
				.pricebox{
					font-size: 40rpx;
					font-weight: 500;
					color: #FF0000;
					text{
						font-size: 22rpx;
					}
				}
				.ztitle{
					font-size: 22rpx;
					color: #999999;
					margin-top: 8rpx;
				}
			}
		}
		.bdbtn{
			width: 260rpx;
			height: 48rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #FD4D1F;
			color: #ffffff;
			border-radius: 26rpx;
			font-size: 24rpx;
			margin: 0 auto;
			margin-top: 40rpx;
		}
	}
	.databox{
		>view{
			&:last-child{
				border: none;
			}
		}
		.topnavbox{
			display: flex;
			flex: 1;
			>view{
				&:first-child{
					font-size: 36rpx;
					font-weight: 500;
					color: #000000;
					text{
						font-size: 22rpx;
						color: #999999;
						padding-left: 16rpx;
					}
				}
				&:last-child{
					margin-left: auto;
					font-size: 20rpx;
					color: #999999;
					text{
						margin-left: 10rpx;
					}
				}
			}
		}
		.bomdatabox{
			display: flex;
			flex: 1;
			border-bottom: 1px solid #F5F5F5;
			padding-bottom: 30rpx;
			padding-top: 30rpx;
			>view{
				&:first-child{
					font-size: 26rpx;
					color: #666666;
				}
				&:last-child{
					margin-left: auto;
					font-size: 26rpx;
					font-weight: 500;
					color: #000000;
				}
			}
		}
	}
</style>
