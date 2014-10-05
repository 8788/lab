/**
 * @fileOverview 
 * @authors Your Name (you@example.org)
 */

window.onload = function () {
	var scroll = document.getElementById('scroll');
	var scrollPage = new Scroll(scroll);
	scrollPage.init();
};

function Scroll(parent) {
	this.isScroll = false;
	this.page = getByClass('page', parent);
}

Scroll.prototype = {
	constructor: Scroll,
	init: function () {
		this.setHeight();
		this.bindEvent();
	},
	setHeight: function () {
		var clientH = document.documentElement.clientHeight;
		document.body.style.height = clientH + 'px';
		for (var i = 0, len = this.page.length; i < len; i++) {
			this.page[i].style.height = clientH + 'px';
		}
	},
	bindEvent: function () {
		addEvent(document, 'scroll', function (e) {
			if (!this.isScroll) {
				
			}
		});
	}
};


/**
 * getByClass
 */
function getByClass(cls, parent) {
	parent = parent || document;
	if (parent.getElementsByClassName) {
		return parent.getElementsByClassName(cls);
	} else {
		var res = [];
		var reg = new RegExp('(^|\\s)' + cls + '($|\\s)', 'i');
		var ele = parent.getElementsByTagName('*');
		for (var i = 0, len = ele.length; i < len; i++) {
			if (reg.test(ele[i].className)) {
				res.push(ele[i]);
			}
		}
		return res;
	}
}

/**
 * addEvent
 */
function addEvent(ele, type, callback) {
	if (ele.addEventListener) {
		ele.addEventListener(type, callback);
	} else {
		ele.attachEvent('on'+type, function() {
			callback.call(ele, event);
		});
	}
}