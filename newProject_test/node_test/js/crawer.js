var http=require('http');
var Promise=require('bluebird');
var cheerio=require('cheerio');
//var _url='http://www.baidu.com/';
//var _url='http://www.imooc.com/learn/348';
var baseUrl='http://www.imooc.com/learn/';
var videoIds=[75,348,197];

function filterChapters(_html){
	var $=cheerio.load(_html);
	var chapters=$('.chapter');
	var title=$('.hd h2').text();
//	var _number=$('span.js-learn-num').text();
//	console.log('_number',title);
//	courseData={
//		title:title,
//		number:number,
//		videos:[{
//			chapterTitle:'',
//			videos:[
//				title:'',
//				id:''
//			]
//		}]
//	}
	var courseData={
		title:title,
//		_number:_number,
		videos:[]
	};
	chapters.each(function(item){
		var chapter=$(this);
		var chapterTitle=chapter.find('strong').text();
		var videos=chapter.find('.video').children('li');
		var chapterData={
			chapterTitle:chapterTitle,
			videos:[]
		}
		videos.each(function(item){
			var video=$(this).find('.J-media-item');
			var videoTitle=video.text().replace(/\s+/g,"")+'\n';
//			console.log('video',videoTitle.replace(/\s+/g,""));
			var id=video.parent().attr('data-media-id');
			chapterData.videos.push({
				title:videoTitle,
				id:id
			});
		});
		courseData.videos.push(chapterData);
	});
	return courseData;
}
function printCourseInfo(coursesData){
	coursesData.forEach(function(courseData){
		console.log(courseData.title+'\n');
	});
	coursesData.forEach(function(courseData){
		console.log('####'+courseData.title+'\n');
		courseData.videos.forEach(function(item){
			var chapterTitle=item.chapterTitle;
			console.log(chapterTitle+'\n');
			item.videos.forEach(function(video){
				console.log('id:['+video.id+']'+video.title);
			});
		});
	});
}

function getPageAsync(url){
	return new Promise(function(resolve,reject){
		console.log('正在爬取',url);
		http.get(url,function(res){
			var _html='';
			res.on('data',function(data){
				_html+=data;
			});
			res.on('end',function(){
				resolve(_html);
//				var courseData=filterChapters(_html);
//				printCourseInfo(courseData);
			});
		}).on('error',function(e){
			reject(e);
			console.log('获取百度数据错误');
		});
	})
}

var fetchCourseArray=[];

videoIds.forEach(function(id){
//	console.log(id);
	fetchCourseArray.push(getPageAsync(baseUrl+id));
})

Promise.all(fetchCourseArray).then(function(pages){
	var coursesData=[];
	pages.forEach(function(html){
		var courses=filterChapters(html);
		coursesData.push(courses);
	})
	coursesData.sort(function(a,b){
		return a._number<b._number;
	})
	printCourseInfo(coursesData);
});

