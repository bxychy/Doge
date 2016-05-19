$(function(){
	windows_width = $(window).width()-40;
    windows_height = $(window).height()-40;
	$("#canvas").attr("width",windows_width);
	$("#canvas").attr("height",windows_height);
	
	var _canvas=document.getElementById('canvas').getContext("2d");
	
	//arcTo
	_canvas.beginPath();
	_canvas.moveTo(10,10);
	_canvas.arcTo(200,50,200,200,200);
	
	_canvas.lineWidth=8;
	_canvas.strokeStyle="aqua";
	_canvas.stroke();
});