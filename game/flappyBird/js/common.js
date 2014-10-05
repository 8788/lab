/**
 * @fileOverview 2048
 * @authors @Bubblings
 */

/* getByClass() */
function getByClass(cls, p){
    p = p || document;
    if(p.getElementsByClassName){
        return p.getElementsByClassName(cls);
    }else{
        var res = [];
        var re = new RegExp('(^|\\s+)' + cls + '($|\\s+)', 'i');
        var ele = p.getElementsByTagName('*');
        for(var i = 0; i < ele.length; i++){
            if(re.test(ele[i].className)){
                res.push(ele[i]);
            }
        }
        return res;
    }
}

/* getStyle */
function getStyle(ele, attr) {
    return ele.currentStyle ? ele.currentStyle[attr] : getComputedStyle(ele, false)[attr];
}

/* addEvent */
function addEvent(ele, type, fn) {
    if (ele.addEventListener) {
        ele.addEventListener(type, fn, false);
    } else {
        ele.attachEvent('on'+type, function () {
            fn && fn.call(ele, event);  // 纠正this指向，同时将事件对象传入
        });
    }
}

/* trim */
if (!"".trim) {
    String.prototype.trim = function () {
        return this.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, '');
    };
}

/* hasClass */
function hasClass(ele, cls) {
    var reg = new RegExp('(^|\\s)' + cls + '(\\s|$)', 'i');
    return reg.test(ele.className);
}

/* addClass */
function addClass(ele, cls){
    if (!hasClass(ele, cls)) {
        ele.className = (ele.className + ' ' + cls).trim();
    }
}

/* removeClass */
function removeClass(ele, cls) {
    var reg = new RegExp('(^|\\s+)' + cls + '(\\s+|$)', 'i');
    if (hasClass(ele, cls)) {
        ele.className = ele.className.replace(reg, '');
    }
}

/* 动画 */
function animate(ele, json, opts) {
    var opts = opts || {};
    opts.time = opts.time || 800;
    opts.type = opts.type || 'buffer';

    var count = Math.round(opts.time/30);
    var start = {};
    var dis = {};
    var n = 0;

    for (var attr in json) {  
        if (attr === 'opacity') {
            start[attr] = parseInt(getStyle(ele, attr)*100);
        } else {
            start[attr] = parseInt(getStyle(ele, attr));
        }
        dis[attr] = json[attr] - start[attr];
    }

    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        n++;
        var cur;
        for (var attr in json) {
            switch(opts.type) {
                case 'linear': 
                    cur = start[attr] + dis[attr] * n /count;
                    break;
                case 'buffer':
                    var a = 1 - n / count;
                    cur = start[attr] + dis[attr] * (1 - a * a * a);
                    break;
            }
            if (attr === 'opacity') {
                ele.style.filter = 'alpha(opacity' + cur + ')';
                ele.style.opacity = cur/100;
            } else {
                ele.style[attr] = cur + 'px';
            }
        }

        if (n === count) {
            clearInterval(ele.timer);
            opts.end && opts.end();
        }
    }, 30);
}