/**
* @fileOverview 
* @authors @Bubblings
*/

var setting = {
	data: {
		simpleData: {
			enable: true
		}
	}
};

var zNodes =[
	{
		name: "project", open: true,
		children: [
			{name: "博客主题(旧)", url: "project/wordpress/index.html"}
		]
	},

	{
		name: "game", open: true,
		children: [
			{name: "js版2048游戏", url: "game/2048/index.html"}
		]
	},

	{
		name: "tools", open: true,
		children: [
			{name: "html转javascript", url: "tools/html2js.html"},
			{name: "图片转base64工具", url: "tools/img2base64.html"}
		]
	},

	{
		name: "css3", open: true,
		children: [
			{name:"border-radius", url:"css3/border-radius.html"},
			{name:"rgba", url:"css3/rgba.html"},
			{name:"text-shadow", url:"css3/text-shadow.html"},
			{name:"box-shadow", url:"css3/box-shadow.html"},
			{name:"linear-gradient", url:"css3/linear-gradient.html"},
			{name:"transform", url:"css3/transform.html"},
			{name:"transition", url:"css3/transition.html"},
			{name:"animation", url:"css3/animation.html"},
			{
				name:"demo", open: true,
				children: [
					{name:"css3绘制android logo", url:"css3/demo-android.html"},
					{name:"css3绘制时钟", url:"css3/demo-clock.html"},
					{name:"纯css3手风琴效果", url:"css3/demo-accordion.html"},
				]
			}			
		]
	},

	{
		name: "css", open: true,
		children: [
			{name:"图片垂直居中", url:"css/vertically-center-image.html"},
			{name:"css两列布局", url:"css/layout.html"},
			{name:"css三列布局", url:"css/three-col-layout.html"},
		]
	},

	{
		name: "javascript", open: true,
		children: [
			{name:"可拖拽改变大小对话框", url:"javascript/drag-change-size.html"},
			{name:"拖拽交换图片位置", url:"javascript/drag-photo.html"},
			{name:"手风琴效果-焦点图", url:"javascript/accordion-slide.html"},
			{name:"碎片效果-焦点图", url:"javascript/random-hide-slide.html"},
			{name:"面向对象-焦点图", url:"javascript/oop-focus.html"},
			{name:"模拟滚动条", url:"javascript/scroll.html"},
			{name:"简单选项卡", url:"javascript/tabs.html"},
			{name:"简易计算器", url:"javascript/calculator.html"},
			{name:"简单搜索功能", url:"javascript/search.html"},
			{name:"简单排序功能", url:"javascript/sort.html"},
			{name:"自定义浏览器右键菜单", url:"javascript/contextmenu.html"},
			{name:"取模运算实现无缝滚动", url:"javascript/image-roll.html"},
			{name:"简单星星评分功能", url:"javascript/star-rating.html"},
			{name:"简单日历组件", url:"javascript/calendar.html"}
		]
	},

	{
		name: "jquery", open: false,
		children: [
			{name:"选项卡插件myTabs", url:"jquery/myTabs.html"},
			{name:"轮播图插件mySlide", url:"jquery/mySlide.html"},
			{name:"placeholder插件", url:"jquery/myPlaceholder.html"},
		]
	}
];

$(function(){
	$.fn.zTree.init($("#nav-tree"), setting, zNodes);
	if(window.location.hash){
		$('.iframe').attr('src', window.location.hash.replace('_', '/').substring('1') + '.html');
	}
	$('.nav').delegate('#nav-tree li li a', 'click', function(e){
		var url = $(this).attr('href');
		$('.iframe').attr('src', url);
		e.preventDefault();
		var b = window.location.href;
		var urlHash = url.substring(url.indexOf('lab'),url.indexOf('.htm')).replace('lab/','');
		window.location.href = b.substring(0, b.indexOf('#')) + '#' + urlHash.replace('/', '_');
	});
	
	
	setTimeout(function(){
		$('.tips').slideUp();
	},4000);

	$('.close-aside').toggle(function(){
		$('.main').addClass('main-noaside');
		$('.aside').addClass('noaside').find('.nav').hide();
		$('.close-aside').addClass('open-aside');
	}, function(){
		$('.main').removeClass('main-noaside');
		$('.aside').removeClass('noaside').find('.nav').show();
		$('.close-aside').removeClass('open-aside');
	});

	if(!$.browser.msie){
		setTimeout(function(){
			animateLogo();
		},500);
	}

	$('.iframe').focus(); // iframe获取焦点
});

function animateLogo(){
	$('.animation-logo p').eq(0).addClass('txt-1');
	setTimeout(function(){
		$('.animation-logo p').eq(0).removeClass('txt-1');
	},3000);
	setTimeout(function(){
		animateLogo();
	},4000);
}