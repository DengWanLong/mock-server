
// import $ from 'jquery';
import * as MessageBox from '../common/MessageBox';

export function get(url, params, success, error) {
	//Object.assign(params, userInfo.commonQuery());
	var isToast = params.toast;
	delete params.toast;
	$.ajax({
		url: url,
		data: params,
		dataType: 'json',
		success: (data) => {
			if(data.code == 0) {
				success && success(data);
			} else {
				if(isToast !== false) {
					MessageBox.toast(data.msg);
				}
				error && error();
			}
		},
		error: (_, __, err) => {
			error && error(err);
			MessageBox.toast('网络错误，请重试');
		}
	});
}

export function post(url, params, success, error) {
	var isToast = params.toast;
	delete params.toast;
	$.ajax({
		url: url,
		type: 'POST',
		dataType: 'json',
		contentType: 'application/json;charset=UTF-8',
		data: JSON.stringify(params),
		success: (data) => {
			if(data.code == 0) {
				success && success(data);
			} else {
				if(isToast !== false) {
					MessageBox.toast(data.msg);
				}
				error && error();
			}
		},
		error: (_, __, err) => {
			error && error(err);
			MessageBox.toast('网络错误，请重试');
		}
	});
}
