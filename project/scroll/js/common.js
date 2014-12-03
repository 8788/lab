/**
 * @fileOverview 
 * @authors Your Name (you@example.org)
 */

window.onload = function () {
    var scroll = document.getElementById('scroll');
    var FullScrollPage = new FullScroll(scroll);
    FullScrollPage.init();
};

;(function (window, document) {

    if (!String.prototype.trim) {
        String.prototype.trim = function () {
            return this.replace(/^[\s\uFEFF\xa0\u3000\u00A0]+|[\s\uFEFF\xa0\u3000\u00A0]+$/g, '');
        };
    }    

    // Utility Methods
    var util = {
        getStyle: function (ele, attr) {
            return ele.currentStyle ? ele.currentStyle[attr] : getComputedStyle(ele, false)[attr];
        },
        getByClass: function (cls, parent) {
            parent = parent || document;
            if (parent.getElementsByClassName) {
                return parent.getElementsByClassName(cls);
            }
            var reg = new RegExp('(^|\\s)' + cls + '($|\\s)', 'i');
            var res = [];
            var nodes = parent.getElementsByTagName('*');
            for (var i = 0, len = nodes.length; i < len; i++) {
                if (reg.test(nodes[i].className)) {
                    res.push(nodes[i]);
                }
            }
            return res;
        },
        addEvent: function (ele, type, callback) {
            if (ele.addEventListener) {
                ele.addEventListener(type, callback, false);
            } else if (ele.attachEvent) {
                ele.attachEvent('on' + type, function () {
                    callback.call(ele, event);
                });
            } else {
                ele['on'+type] = function (ev) {
                    var oEvent = ev || event;
                    callback(oEvent);
                };
            }
        },
        hasClass: function (ele, cls) {
            if (ele.classList) {
                return ele.classList.contains(cls);
            } else {
                var reg = new RegExp('(^|\\s)' + cls + '($|\\s)', 'i');
                return reg.test(ele.className);
            }
        },
        addClass: function (ele, cls) {
            if (!util.hasClass(ele, cls)) {
                if (ele.classList) {
                    ele.classList.add(cls);
                } else {
                    ele.className = (ele.className.trim() + ' ' + cls).trim();
                }
            }
        },
        removeClass: function (ele, cls) {
            if (util.hasClass(ele, cls)) {
                if (ele.classList) {
                    ele.classList.remove(cls);
                } else {
                    var reg = new RegExp('(^|\\s+)'+ cls + '($|\\s+)', 'ig');
                    ele.className = ele.className.replace(reg, ' ').trim();
                }
            }
        },
        animate: function (ele, json, opts) {
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
    };
    


    function FullScroll (parent) {
        this.isFullScroll = false;
        this.page = util.getByClass('section', parent);
    }

    FullScroll.prototype = {
        constructor: FullScroll,
        init: function () {
            this.setHeight();
            this.bindEvent();
        },
        setHeight: function () {
            var clientH = document.documentElement.clientHeight;
            this.clientHeight = clientH;
            document.body.style.height = clientH + 'px';
            for (var i = 0, len = this.page.length; i < len; i++) {
                this.page[i].style.height = clientH + 'px';
            }
        },
        bindEvent: function () {
            var that = this;
            util.addEvent(document, 'scroll', function (e) {
                if (!this.isFullScroll) {
                    this.isFullScroll = true;
                    console.log(document.body.scrollTop, document.documentElement.scrollTop);
                    document.body.scrollTop =   Math.ceil(document.body.scrollTop/that.clientHeight) * that.clientHeight;
                    console.log(document.body.scrollTop);

                    this.isFullScroll = false;
                }
            });
        }
    };

    window.FullScroll = FullScroll;

})(window, document);

