var EventEmitter=require('events').EventEmitter;
var life=new EventEmitter();
function mdsb(zzez){
	console.log('妈的智障儿子:'+zzez);
}
life.on('mdzz',mdsb);
life.on('mdzz',function(zzez){
	console.log('妈的SB儿子:'+zzez);
});
life.on('mdzz',function(zzez){
	console.log('妈的脑残儿子:'+zzez);
});

life.on('mdnc',function(zzne){
	console.log('妈的sb:'+zzne);
});

life.setMaxListeners(99);
life.removeListener('mdzz',mdsb);
life.removeAllListeners('mdzz');
console.log(life.listeners('mdzz').length);
console.log(EventEmitter.listenerCount(life,'mdzz'));

var man=life.emit('mdzz','zzez');
var woman=life.emit('mdnc','zzne');
var hentai=life.emit('mdbt','hentai');
