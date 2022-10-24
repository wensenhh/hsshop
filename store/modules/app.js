// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------

import {getUserInfo,computeUser} from "../../api/user.js";
import {
	LOGIN_STATUS,
	UID,
	PLATFORM
} from '../../config/cache';
import Cache from '../../utils/cache';
import {USER_INFO} from '../../config/cache';

const state = {
	token: Cache.get(LOGIN_STATUS) || '',
	backgroundColor: "#fff",
	userInfo: Cache.get(USER_INFO)?JSON.parse(Cache.get(USER_INFO)):null,
	uid: Cache.get(UID) || null,
	homeActive: false,
	chatUrl: Cache.get('chatUrl') || '',
	systemPlatform: Cache.get(PLATFORM)?Cache.get(PLATFORM):'',
	productType: Cache.get('productType') || ''
};

const mutations = {
	LOGIN(state, opt) {
		state.token = opt.token;
		Cache.set(LOGIN_STATUS, opt.token);
	},
	SETUID(state,val){                                                
		state.uid = val;
		Cache.set(UID, val);
	},
	UPDATE_LOGIN(state, token) {
		state.token = token;
	},
	LOGOUT(state) {
		state.token = undefined;
		state.uid = undefined
		Cache.clear(LOGIN_STATUS);
		Cache.clear(UID);
		Cache.clear(USER_INFO);
	},
	BACKGROUND_COLOR(state, color) {
		state.color = color;
		document.body.style.backgroundColor = color;
	},
	UPDATE_USERINFO(state, userInfo) {
		state.userInfo = userInfo;
		Cache.set(USER_INFO, userInfo);
	},
	OPEN_HOME(state) {
		state.homeActive = true;
	},
	CLOSE_HOME(state) {
		state.homeActive = false;
	},
	SET_CHATURL(state, chatUrl){
		state.chatUrl = chatUrl;
	},
	// AuthorizeType(state, authorizeType){
	// 	state.authorizeType = authorizeType;
	// },
	SYSTEM_PLATFORM(state, systemPlatform){
		state.systemPlatform = systemPlatform;
		Cache.set(PLATFORM, systemPlatform);
	},
	//更新useInfo数据
	changInfo(state, payload) {
		state.userInfo[payload.amount1] = payload.amount2;
		Cache.set(USER_INFO, state.userInfo);
	},
	//商品类型，用于区分视频号商品与一般商品
	PRODUCT_TYPE(state, productType) {
		state.productType = productType;
		Cache.set('productType', productType);
	}
};

const actions = {
	USERINFO({
		state,
		commit
	}, force) {
		return new Promise(reslove => {
			getUserInfo().then(res => {
				commit("UPDATE_USERINFO", res.data);
				reslove(res.data);
			});
		}).catch(() => {
		
		});
		// debugger
		// if (state.userInfo !== null && !force)
		// 	return Promise.resolve(state.userInfo);
		// else
		// 	return new Promise(reslove => {
		// 		getUserInfo().then(res => {
		// 			commit("UPDATE_USERINFO", res.data);
		// 			reslove(res.data);
		// 		});
		// 	}).catch(() => {

		// 	});
	}
};

export default {
	state,
	mutations,
	actions
};
