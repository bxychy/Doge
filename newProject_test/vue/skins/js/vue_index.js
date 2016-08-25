const STORAGE_KEY='todo';
var saveData={
	fetch:function(){
		return JSON.parse(window.localStorage.getItem(STORAGE_KEY)||'[]');
	},
	save:function(items){
		window.localStorage.setItem(STORAGE_KEY,JSON.stringify(items))
	},
	remove:function(items){
		window.localStorage.removeItem(STORAGE_KEY,JSON.stringify(items))
	}
};

var index=new Vue({
	el:'#index1',
	mixins: [saveData],
	data:{
		OK:false,
		index:false,
		MDZZ:'',
		items:saveData.fetch(),
		Item:'',
	},
	watch:{
	  	items:{
	  		handler:function(items){
	  			saveData.save(items);
	  		},
	  		deep:true
	  	}
	},
	methods:{
		addNew:function(){
	  		this.items.push({cnm:this.Item,isdisplay:false});
	  		this.MDZZ=this.Item;
	  		this.Item='';
	  		this.OK=true;
	  	},
	  	sendClick:function(){
	  		this.index=true;
	  	}
	}
});