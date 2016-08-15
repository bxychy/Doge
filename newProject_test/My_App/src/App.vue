<template>
  <div id="app">
    <img class="logo" src="./assets/logo.png">
    <h1 v-text="txt" v-on:click="unclick()"></h1>
    <ul>
			<li v-for="item in items" v-bind:class="{display:item.isdisplay}" v-on:click="doclick($index,item)">
			 	{{ item.cnm }}
			</li>
    </ul>
  </div>
</template>

<script>
export default {
  data:function(){
  	return{
  		txt:'mdzz',
  		items:[
  			{cnm:'mdzz',isdisplay:false},
    		{cnm:'mdzz要上天',isdisplay:false},
    		{cnm:'mdzz和太阳肩并肩',isdisplay:false}
  		]
  	}
  },
  methods:{
  	doclick:function(num,item){
  		console.log(num,item.isdisplay);
  		item.isdisplay=!item.isdisplay;
  	},
  	unclick:function(){
  		
  		var _items=this.items.length;
  		for(var i=0;i<_items;i++){
  			console.log(this.items[i].isdisplay);
  			this.items[i].isdisplay=false;
  		}
  	}
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  color: #2c3e50;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
.display{display:none;}
</style>
