/*
 * @author WeiDongbin
 * @date Feb,14 2017
 * @addredss hefei
 */

$('#modify-psd').click(function() {__psdBomb('修改密码','modifyPsd');});	
$('#setRankBtn').click(function() {__setRankBomb();});
$('#notPassBtn').click(function() {__notPassBomb();});
$('#passBtn').click(function() {__passBomb();});
//修改密码弹框
function __psdBomb(title,formId) {
	__domShow('bombBox','mask');
	var bombBox = $('.bombBox');
	var psdCon ='<h2 class="bomb-title"><i class="icon password"></i>'+title+'<span class="fr icon close" onclick="__hideBomb(this);"></span></h2>'+
				'<form action="" method="post" id="'+formId+'">'+
					'<table class="bomb-table">'+
						'<tr>'+
							'<td>旧密码</td>'+
							'<td><input type="password" name="oldPassword" class="input-txt" data-msg="旧密码"></td>'+
						'</tr>'+
						'<tr>'+
							'<td>新密码</td>'+
							'<td><input type="password" name="newPassword" class="input-txt" data-msg="新密码"></td>'+
						'</tr>'+
						'<tr>'+
							'<td>确认新密码</td>'+
							'<td><input type="password" name="surePassword" class="input-txt" data-msg="确认新密码"></td>'+
						'</tr>'+
						'<tr>'+
							'<td>验证码</td>'+
							'<td>'+
								'<input type="text" name="code" class="input-code">'+
								'<span class="pic-code"></span>'+
							'</td>'+
						'</tr>'+
					'</table>'+
					'<div class="bomb-btnBox">'+
						'<a href="javascript:;" class="subBtn">确定修改</a>'+
					'</div>'+
				'</form>';
	bombBox.append(psdCon);
}

//设置等级弹框
function __setRankBomb() {
	__domShow('bombBox','mask');
	var bombBox = $('.bombBox');
	var setRankCon =    '<h2 class="bomb-title"><i class="icon rank"></i>设置等级<span class="fr icon close" onclick="__hideBomb(this);"></span></h2>'+
						'<form action="" method="post" id="setRank">'+
							'<div class="bomb-msg">'+
								'<h3>给广告主设置等级</h3>'+
								'<span class="rankBox" id="rankBox">'+
								    '<em class="numBox" id="numBox">'+
										'<ul class="rankNum clearfix" id="rankNum">'+
											'<li class="on">1</li>'+
											'<li>2</li>'+
											'<li>3</li>'+
											'<li>4</li>'+
											'<li>5</li>'+
											'<li>6</li>'+
											'<li>7</li>'+
											'<li>8</li>'+
											'<li>9</li>'+
											'<li>10</li>'+
											'<li>11</li>'+
											'<li>12</li>'+
											'<li>13</li>'+
											'<li>14</li>'+
											'<li>15</li>'+
											'<li>16</li>'+
											'<li>17</li>'+
											'<li>18</li>'+
											'<li>19</li>'+
											'<li>20</li>'+
											'<li>21</li>'+
											'<li>22</li>'+
											'<li>23</li>'+
											'<li>24</li>'+
											'<li>25</li>'+
											'<li>26</li>'+
											'<li>27</li>'+
											'<li>28</li>'+
											'<li>29</li>'+
											'<li>30</li>'+
										'</ul>'+
									    '<input type="hidden" name="setRank" value="1"/>'+
									'</em>'+
									'<a href="javascript:;" class="btn prev"><i class="icon"></i></a>'+
									'<a href="javascript:;" class="btn next"><i class="icon"></i></a>'+
								'</span>'+
							'</div>'+
							'<div class="bomb-btnBox"><a href="javascript:;" class="subBtn">确定</a></div>'+
				    	'</form>';  
	bombBox.append(setRankCon);
	__clickSlide('rankBox','numBox','rankNum');
}

// 设置等级点击滑动函数
function __clickSlide(obj1,obj2,obj3) {
    var rankBox  = $('#'+obj1);  //span	
    var numBox   = $('#'+obj2);  //em
	var rankNum  = $('#'+obj3);  //ul
	var length   = rankNum.find('li').length || 0;
	var margin   = rankNum.find('li').css('marginRight') || 0;
	var widthLi  = rankNum.find('li').css('width') || 0;
	var borderLi = rankNum.find('li').css('border-left-width') || 0;
	var liW      = parseInt(widthLi)+parseInt(borderLi)*2; //整个li的宽度
	var marginW  = parseInt(margin)*2;                     //整个margin的值
	var maxNum   = 17;
	var overNum  = null;   //超出数量
	var ulLeft   = null;  
	rankNum.width(liW*length+marginW*length);   //设置ul的宽

	rankBox.find('.btn').click(function() {
		var isPrev = $(this).is('.prev');
		var isNext = $(this).is('.next');
		var mSpeed = 800;
		ulLeft = parseInt(rankNum.css('left')); //获取ul的left值
		length >= maxNum ? overNum = length - maxNum : '';
		if (isPrev) {
			if (length <= maxNum) {
				__endShake('-5');
			}else{
				if (ulLeft == -Math.abs((liW+marginW)*overNum)) {
                    ulLeft = 0;
                    __endShake('-5');	
				}else{
                    ulLeft = ulLeft;
				}
				rankNum.animate({'left':-(liW+marginW)*overNum+ulLeft+'px'},mSpeed,'swing');
			}	 
		}
		if (isNext) {
			if (length <= maxNum) {
				__endShake('5');
			}else{
				if (ulLeft == 0) {
                    ulLeft = -Math.abs((liW+marginW)*overNum);
                    __endShake('5');
				}else{
                    ulLeft = ulLeft;
				}
				rankNum.animate({'left':(liW+marginW)*overNum+ulLeft+'px'},mSpeed,'swing');	
			}
		}
	});
    //末位抖动
    function __endShake(num) {
		var shakeSpeed = 100;
    	numBox.animate({'left':num+'px'},shakeSpeed,'linear', function() {
        	$(this).animate({'left':'0'},shakeSpeed);
        });	
    }
    rankNum.find('li').click(function() {
		var rank = $(this).text();
		$(this).addClass('on').siblings().removeClass('on');
		$(this).parent().siblings('input[type="hidden"]').val(rank);
	});
}

//通过弹框
function __passBomb() {
	__domShow('bombBox','mask');
	var bombBox = $('.bombBox');
	var passCon ='<h2 class="bomb-title"><i class="icon pass"></i>通过<span class="fr icon close" onclick="__hideBomb(this);"></span></h2>'+
				'<form action="" method="post" id="pass">'+
					'<div class="bomb-msg">确定要使此用户通过吗？</div>'+
					'<div class="bomb-btnBox">'+
						'<a href="javascript:;" class="subBtn bgc" onclick="__hideBomb(this);">取消</a>'+
						'<a href="javascript:;" class="subBtn">确定</a>'+
					'</div>'
				'</form>';
    bombBox.append(passCon);
}

// 不通过弹框
function __notPassBomb() {
	__domShow('bombBox','mask');
	var bombBox = $('.bombBox');
	var notpassCon ='<h2 class="bomb-title"><i class="icon notpass"></i>不通过<span class="fr icon close" onclick="__hideBomb(this);"></span></h2>'+
					'<form action="" method="post" id="notpass">'+
						'<div class="bomb-msg">确定要使此用户不通过吗？</div>'+
						'<div class="bomb-btnBox">'+
							'<a href="javascript:;" class="subBtn bgc" onclick="__hideBomb(this);">取消</a>'+
							'<a href="javascript:;" class="subBtn">确定</a>'+
						'</div>'+
					'</form>';
    bombBox.append(notpassCon);
}

// dom展示
function __domShow(dom1,dom2) {
	$('.'+dom1).show();
	$('.'+dom2).show();
}

//时间拾取器
function __PickerDate(id) {
	var picker = new Pikaday({
		field: document.getElementById(id),
        //field: $(id)[0],      //有jquery库的情况下使用,ie不兼容
        firstDay: 1,
        minDate: new Date('2000-01-01'),
        maxDate: new Date('2030-12-31'),
        yearRange: [2000,2030]
    });
}

// 设置
function __setFun() {
 	var speed = 300;
	$('.topIcon li:last').hover(function() {
		$(this).find('.trangle').fadeIn(speed);
		$(this).find('.setCon').slideDown(speed);
	}, function() {
		$(this).find('.setCon').slideUp(speed,function () {
			$(this).siblings('.trangle').fadeOut(speed);
		});
	});
}

// 弹框、遮罩消失
function __hideBomb(dom) {
	var isFalert = $(dom).parent().parent().is('.bombBox');
	var isSalert = $(dom).parent().parent().is('.secondAlert');
	var isClose  = $(dom).is('.close');
	var isSubbtn = $(dom).is('.subBtn');

	if ((isFalert && isClose) || isSubbtn) {
		$('.mask').hide();
	    $('.bombBox').hide().html('');
	}
	if (isSalert && isClose) {
		$('.bomb-mask').hide();
	    $('.secondAlert').hide().html('');
	}		
}

// 表格偶数行变色
function __changeColor() {
	$('.tableBody tbody tr:odd').addClass('odd');
}

// 复选框函数
function __checkedFun() {
	var checkbox = $('input[type="checkbox"]');
	var checkAll = $('input[name="checkAll"]');
	var checkitem = $('input[name="checkItem"]'),allLength = checkitem.length;
	checkbox.each(function(index,ele) {
		$(ele).click(function() {
			var checkLength = $('input[name="checkItem"]:checked').length;
		    if ($(this).attr('name') == 'checkAll'){
                    if ($(this).is(':checked')) {
                   	    checkitem.prop('checked',true);  //全选,不建议使用attr
                        __addColor(checkitem);
                    }else{
                        checkitem.removeProp('checked'); //取消全选
                        __addColor(checkitem);
                    }
		    }else{
		    	if (checkLength == allLength){
                    checkAll.prop('checked',true);
		    	} else{
                    checkAll.prop('checked',false);
		    	}
		    	__addColor($(this));
		    }
		});
	});
}
function __addColor(dom) {
	if (dom.is(':checked')) {
		dom.parents('tr').addClass('cur');
	} else{
		dom.parents('tr').removeClass('cur');
	}
}

// 开关函数
function __switchFun(dom) {
	$('.'+dom).click(function() {
		if ($(this).hasClass('toggle')) {
			$(this).removeClass('on toggle').addClass('off');
			$(this).siblings('input[type="hidden"]').val('off');
		}else{
			$(this).removeClass('off').addClass('on toggle');
			$(this).siblings('input[type="hidden"]').val('on');
		}
	});
}
