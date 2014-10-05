/**
 * @name    mylab.js
 * @date    2013-08-16 14:22:19
 * @version 1.0
 */

/* getByClass() */
function getByClass(oParent, sClass){
    if(oParent.getElementsByClassName){
        return oParent.getElementsByClassName(sClass);
    }else{
		var aRes = [];
		var re = new RegExp('(^|\\s)' + sClass + '($|\\s)', 'i');
		var aEle = oParent.getElementsByTagName('*');
		for(var i = 0; i < aEle.length; i++){
		    if(re.test(aEle[i].className)){
		        aRes.push(aEle[i]);
		    }
		}
		return aRes;
    }
}

/* get or set css */
function css(obj, attr, value){
	if(arguments.length === 2){
		return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
	}else{
		obj.style[attr] = value;
	}
}

if(typeof String.prototype.trim === 'undefined'){
    String.prototype.trim = function(){
        return this.replace(/^\s*|\s*$/g, '');
    };
}

function addClass(obj, sClass){
	removeClass(obj, sClass);
	obj.className += ' ' + sClass;
}

function removeClass(obj, sClass){
	var re = new RegExp('(^|\\s)' + sClass + '($|\\s)', 'gi');
	obj.className = obj.className.replace(re, '');
}

/* getNextSibling */
function getNextSibling(obj){
	return obj.nextElementSibling ? obj.nextElementSibling : obj.nextSibling;
}

/* getPreviousSibling */
function getPreviousSibling(obj){
	return obj.previousElementSibling ? obj.previousElementSibling : obj.previousSibling;
}

/* getFirstChild */
function getFirstChild(obj){
	return obj.firstElementChild ? obj.firstElementChild : obj.firstChild;
}

/* getLastChild */
function getLastChild(obj){
	return obj.lastElementChild ? obj.lastElementChild : obj.lastChild;
}

/* move */
function move(obj, json, fnEnd){
	clearInterval(obj.timer);

	obj.timer = setInterval(function(){
		var canStop = true;	// 是否可以停止定时器
		for(var attr in json){

			/* 获取当前值 */
			var cur = 0;
			if(attr == 'opacity'){
				cur = Math.round(css(obj, 'opacity') * 100);
			}else{
				cur = parseInt(css(obj, attr)) || 0;	// 若未设置，则赋值为0
			}

			if(cur != json[attr]){
				canStop = false;
			}

			/* 计算速度 */
			var speed = (json[attr] - cur)/6;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

			/* 运动 */
			if(attr == 'opacity'){
				obj.style.opacity = (cur + speed)/100;
				obj.style.filter = 'alpha(opacity = ' + (cur + speed) + ')';
			}else{
				obj.style[attr] = (cur + speed) + 'px';
			}
		}

		if(canStop){ // 都到达目标值，结束定时器
			clearInterval(obj.timer);
			if(fnEnd){ fnEnd();}
		}
	}, 30);
}