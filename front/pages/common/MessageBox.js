
// import $ from 'jquery';
import './MessageBox.css';
import logging from '../../plugins/logger';

const CONFIRM_TPL = `
	<div class="am-modal am-modal-confirm">
		<div class="am-modal-dialog">
			<div class="am-modal-hd title"></div>
			<div class="am-modal-bd text">
			</div>
			<div class="am-modal-footer">
				<span class="am-modal-btn ok" data-am-modal-cancel>取消</span>
				<span class="am-modal-btn cancel" data-am-modal-confirm>确定</span>
			</div>
		</div>
	</div>
`;


export function confirm(options) {
	var $confirm = $(CONFIRM_TPL).appendTo(document.body);
	var callback = options.callback;
	$confirm.find('.title').text(options.title);
	$confirm.find('.text').text(options.text);
	if(options.okclstag) {
		$confirm.find('.am-modal-btn.ok').attr('clstag', options.okclstag);
	}
	if(options.cancelclstag) {
		$confirm.find('.am-modal-btn.cancel').attr('clstag', options.cancelclstag);
	}
	if(options.oklg) {
		$confirm.find('.am-modal-btn.ok').click(function(){
			logging(options.oklg);
		});
	}
	if(options.cancellg) {
		$confirm.find('.am-modal-btn.cancel').click(function(){
			logging(options.cancellg);
		});
	}
	if(options.ok) {
		$confirm.find('.ok').text(options.ok);
	}
	if(options.cancel) {
		$confirm.find('.cancel').text(options.cancel);
	}
	$confirm.modal({
    onConfirm: function(options) {
      callback && callback(true);
			setTimeout(() => $confirm.remove(), 2000);
    },
    // closeOnConfirm: false,
    onCancel: function() {
			callback && callback(false);
			setTimeout(() => $confirm.remove(), 2000);
    }
  });
}


const TOAST_TPL = `
	<div class="am-text-default messagebox-toast"></div>
`;

export function toast(text, position=50, duration=300) {
	var $toast = $(TOAST_TPL);
	$toast.text(text);
	if(position && position < 0) {
		$toast.css({
			'bottom': (-position) + '%',
			'animation-duration': duration
		});
	} else {
		$toast.css({
			'top': (position + '%') || '50%',
			'animation-duration': duration
		});
	}
	$toast.appendTo(document.body);
	$toast.addClass('am-animation-fade');
	setTimeout(() => {
		$toast.removeClass('am-animation-fade');
	}, duration);
	setTimeout(() => {
		$toast.addClass('am-animation-fade am-animation-reverse');
	}, 1000);
	setTimeout(() => {
		$toast.remove();
	}, duration + 1000);
}
