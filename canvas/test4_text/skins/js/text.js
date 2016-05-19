$(function(){
	windows_width = $(window).width()-40;
    windows_height = $(window).height()-40;
	$('#canvas').attr('width',windows_width);
	$('#canvas').attr('height',windows_height);
	
	var _canvas=document.getElementById('canvas').getContext('2d');
	_text(_canvas,60,100);
});
function _text(cxt,x,y){
//	字体
	cxt.font='bold 40px Arial';
	cxt.fillStyle='#ff8500';
	cxt.fillText('boomxakala',x,y);
//	边框字体
	cxt.strokeStyle='#ff8500';
	cxt.strokeText('boomxakala',x,y*2);
//	限制宽度字体
	cxt.fillText('boomxakala',x,y*3,100);
	cxt.strokeText('boomxakala',x,y*4,100);
//	渐变色字体
	var linearGrad=cxt.createLinearGradient(x,y*5,x*4,y*5);
	linearGrad.addColorStop(0.0,'red');
	linearGrad.addColorStop(0.2,'orange');
	linearGrad.addColorStop(0.4,'yellow');
	linearGrad.addColorStop(0.6,'green');
	linearGrad.addColorStop(0.8,'blue');
	linearGrad.addColorStop(1.0,'purple');
	cxt.fillStyle=linearGrad;
	cxt.fillText('boomxakalak',x,y*5);
//	图片背景字体
	var bgImg=new Image();
	bgImg.src='skins/img/11.jpg';
	bgImg.onload=function(){
		var patern=cxt.createPattern(bgImg,'repeat');
		cxt.fillStyle=patern;
		cxt.font='bold 100px Arial';
		cxt.fillText('boomxakala',x,y*6);
		cxt.strokeText('boomxakala',x,y*6);
	}
}
