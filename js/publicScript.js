/**
 * Created by kenan on 2015/12/25.
 */

var winWidth = 0;
var winHeight = 0;
//触屏应用
var nowPage = 1;
var maxPage = 6;
var prePage = 1;
var isAnimation = false;

window.onload = function (){
	//checkWindowSize();
	/*document.addEventListener("touchmove",function(event){
		event.preventDefault();
	},false);*/
	document.addEventListener("touchmove",function(event){
		event.preventDefault(); },false);
	//上下滑动翻页
	$(document).swipeUp(function(){
		next();
	});
	$(document).swipeDown(function(){
		prev();
	});
	//按键盘上下键翻页
	$(window).keydown(
			function(event){
				turnPage(event.keyCode);
			}
	);
	checkWindowSize();
};
window.onresize = function (){
	checkWindowSize();
};
function $1(id){
	return document.getElementById(id);
}
//检测窗口大小
function checkWindowSize(){
	getWindowSize();
	if(winWidth > winHeight){
		//横屏
		$1("toolTip").style.display = 'block';
		//设置loading的尺寸
		$1("loading").style.width = winWidth*0.6+'px';
		$1("loading").style.height = winHeight*0.6+'px';
		//调整loading的位置
		$1("loading").style.top = (winHeight - winHeight*0.6)/2+'px';
		$1("loading").style.left = (winWidth - winHeight*0.6)/2+'px';
	}
	else{//竖屏
		$1("toolTip").style.display = 'none';
		//设置loading的尺寸
		$1("loading").style.width = winWidth*0.6+'px';
		$1("loading").style.height = winWidth*0.6+'px';
		//调整loading的位置
		$1("loading").style.top = (winHeight - winWidth*0.6)/2+'px';
		$1("loading").style.left = (winWidth - winWidth*0.6)/2+'px';
	}
}
//获取窗口大小
function getWindowSize(){
	// 获取窗口宽度
	if (window.innerWidth)//chrome firefox safari opera
		winWidth = window.innerWidth;
	else if ((document.body) && (document.body.clientWidth))//兼容IE
		winWidth = document.body.clientWidth;
	// 获取窗口高度
	if (window.innerHeight)
		winHeight = window.innerHeight;
	else if ((document.body) && (document.body.clientHeight))
		winHeight = document.body.clientHeight;

	// 通过深入Document内部对body进行检测，获取窗口大小
	if (document.documentElement  && document.documentElement.clientHeight && document.documentElement.clientWidth)
	{
		winHeight = document.documentElement.clientHeight;
		winWidth = document.documentElement.clientWidth;
	}
}
//键盘上下键翻页
function turnPage(){
	if(keyCode==38){
		prev();
	}else if(keyCode==40){
		next();
	}
}
//向下翻页
function next(){
	if(isAnimation==false){
		prePage = nowPage;
		if(nowPage == maxPage){
			nowPage = 1;
		}else{
			nowPage++;
		}
		goToPage("down");
	}
}
//向上翻页
function prev(){
	if (isAnimation==false){
		prePage = nowPage;
		if(nowPage == 1){
			nowPage = maxPage;
		}else{
			nowPage--;
		}
		goToPage("up");
	}
}
//翻页方法
function goToPage(state){
	var nextpageCss = '.page'+nowPage;
	var prepageCss = '.page'+prePage;
	var outCss,inCss;
	if(state == 'down'){
		outCss = 'page-moveToBottombox';
		inCss = 'page-moveFromTopbox'
	}else if(state == 'up'){
		outCss = 'page-moveToTopbox';
		inCss = 'page-moveFromBottombox'
	}
	isAnimation=true;
	$(nextpageCss).removeClass("hide");
	$(prepageCss).addClass(outCss);
	$(nextpageCss).addClass(inCss);

	setTimeout(function(){
		$(prepageCss).removeClass(outCss);
		$(prepageCss).removeClass("page-current");
		$(prepageCss).addClass("hide");
		$(prepageCss).find("img").addClass("hide");

		$(nextpageCss).addClass('page-current');
		$(nextpageCss).removeClass(inCss);
		$(nextpageCss).find("img").removeClass("hide");
		isAnimation=false;
	},600);
}

