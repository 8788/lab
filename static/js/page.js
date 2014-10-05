/**
 * @fileOverview lab common
 * @author @Bubblings
 */
(function () {

    /**
     * getByClass
     */
    function getByClass(cls, p){
        p = p || document;
        if (p.getElementsByClassName) {
            return p.getElementsByClassName(cls);
        } else {
            var res = [];
            var re = new RegExp('(^|\\s+)' + cls + '($|\\s+)', 'i');
            var ele = p.getElementsByTagName('*');
            for (var i = 0; i < ele.length; i++) {
                if(re.test(ele[i].className)) {
                    res.push(ele[i]);
                }
            }
            return res;
        }
    }

    /**
     * addEvent
     */
    function addEvent(ele, type, fn) {
        if (ele.addEventListener) {
            ele.addEventListener(type, fn, false);
        } else {
            ele.attachEvent('on'+type, function () {
                fn && fn.call(ele, event);  // 纠正this指向，同时将事件对象传入
            });
        }
    }

    // 不在iframe中时显示导航
    if (top == self) {
        var topBar = document.createElement('div');
        topBar.className = 'top-bar';
        topBar.innerHTML = '' + 
            '<a class="home" target="_blank" href="/">博客首页</a>' +
            '<a class="lab" target="_blank" href="/lab">前端实验室</a>' +
            '<a class="lab" target="_blank" href="/guessbook/">留言板</a>' +
            '<a class="lab" target="_blank" href="http://weibo.com/607768123">微博</a>' +
            '<span class="top-bar-close" title="关闭"></span>';
        document.body.appendChild(topBar);
        topBar.onclick = function () {
            topBar.style.display = 'none';
        };

        var container = getByClass('container')[0];
        if (container) {
            container.style.paddingTop = '30px';
        }
    }

})();
