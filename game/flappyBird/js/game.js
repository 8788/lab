/**
 * @fileOverview flappy bird
 * @authors @Bubblings
 */

function Game(ele) {
	this.ele = ele;
}

Game.prototype = {
	constructor: Game,

	init: function () {
		this.rollLawn();	// 草坪滚动
	},

	rollLawn: function () {
		var lawn = document.getElementById('lawn');
		var width = parseInt(getStyle(lawn, 'width'), 10);
		var speed = 5;
		setInterval(function () {
			if (lawn.offsetLeft < -width/2) {
				lawn.style.left = 0;
			}
			lawn.style.left = lawn.offsetLeft - speed + 'px';
			console.log(lawn.offsetLeft)
		}, 30);
	}
};