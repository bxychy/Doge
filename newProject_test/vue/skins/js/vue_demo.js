var _demo=new Vue({
  el: '#demo',
  data: {
  	ok:true,
    message: 'MDZZ!',
    docs:[
    	{txt:'mdzz'},
    	{txt:'mdzz要上天'},
    	{txt:'mdzz和太阳肩并肩'}
    ],
    Paragraph:[
    	{par:'par1'},
    	{par:'par2'},
    	{par:'par3'}
    ]
  }
})
var demo=document.getElementById('demo');
var _f=_demo.docs[0].txt.split('').reverse().join('');
demo.addEventListener('click',function(){
//	console.log(_demo.ok,_demo.docs[0].txt.split('').reverse().join(''));
	_demo.ok==true?_demo.ok=false:_demo.ok=true;
	_demo.docs[0].txt==_f?_demo.docs[0].txt='mdzz':_demo.docs[0].txt=_f;
});