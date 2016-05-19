$(function(){
//	获取当前元素的所以图片
	var imgz=$("#pic img").size();
	
//	每一张图片所对应的角度
	var deg=360/imgz;
	
	var ry=0,rx=0,ny=0,nx=0,play=null;
	
//	鼠标未按下时自动旋转部分
	_play=setInterval(function(){
		ry+=1;
		$("#pic").css("transform","perspective(800px)  rotatey("+ry+"deg)");
	},30);
	
//	循环所获取的图片
	$("#pic img").each(function(k){
		$(this).css("transform","rotatey("+k*deg+"deg) translatez(400px)");
		$(this).attr('ondragstart','return false');
	});
//	鼠标按下
	$(document).mousedown(function(event){
		clearInterval(_play);
		var _ex=event.clientX;
		var _ey=event.clientY;
//		选中当前,鼠标按下,为松开
		$(this).bind("mousemove",function(event){
			var ex=event.clientX;
			var ey=event.clientY;
			nx=ex-_ex;
			ny=ey-_ey;
			ry+=nx*0.2;
			rx-=ny*0.1;
			
			$("#pic").css("transform","perspective(800px) rotatex("+rx+"deg) rotatey("+ry+"deg)");
			
//			重置鼠标按下到松开之前的坐标位置
			_ex=event.clientX;
			_ey=event.clientY;
		});
//		鼠标松开按键
	}).mouseup(function(event){
//		为当前元素删除事件
		$(this).unbind("mousemove");
//		play=setInterval(function(){
//			nx*=0.95;
//			ny*=0.95;
//			ry+=nx*0.2;
//			rx-=ny*0.1;
//			if(nx<1){
//				clearInterval(play);
//			}
//			$("#pic").css("transform","perspective(800px) rotatex("+rx+"deg) rotatey("+ry+"deg)");
//		},30);
//		开启自动旋转
		_play=setInterval(function(){
			ry+=1;
			$("#pic").css("transform","perspective(800px) rotatex("+rx+"deg)  rotatey("+ry+"deg)");
		},30);
	})
});
