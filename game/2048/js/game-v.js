/**
 * @fileOverview 2048
 * @authors @Bubblings
 */

;(function (win) {
    var gridSize = 80;
    var gridGap = 15;
    var box = document.getElementById('box');

    /**
     * 初始化背景格子
     */
    function initGrid () {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                var grid = document.createElement('div');
                var pos = getPos(i, j);
                grid.className = 'grid grid-' + i + '-' + j;
                grid.style.top = pos.top + 'px';
                grid.style.left = pos.left + 'px';
                box.appendChild(grid);
            }
        }
    }

    /**
     * 根据坐标获取位置
     */
    function getPos(i, j) {
        return {
            top: gridSize * i + gridGap * (i+1),
            left: gridSize * j + gridGap * (j+1)
        };
    }

    /**
     * 根据nums更新视图
     */
    function updateView(nums) {
        var oldNumbers = getByClass('number', box);
        for (var i = oldNumbers.length - 1; i >= 0; i--) {
            box.removeChild(oldNumbers[i]);
        }
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                var num = nums[i][j];
                if (num !==0 ) {
                    var number = document.createElement('div');
                    var pos = getPos(i, j);
                    number.className = 'number number-' + i + '-' + j + ' value-' + num;
                    number.innerHTML = num;
                    number.style.top = pos.top + 'px';
                    number.style.left = pos.left + 'px';
                    box.appendChild(number);
                }
            }
        }
    }

    /**
     * 更新分数
     */
    function updateScore(score) {
        var ele = getByClass('current')[0];
        ele.innerHTML = score;
    }

    function updateBestScore(score) {
        var ele = getByClass('best')[0];
        ele.innerHTML = score;
    }


    /**
     * 根据坐标生成新的数字
     */
    function newNumber(i, j, num) {
        var number = document.createElement('div');
        var pos = getPos(i, j);
        number.className = 'number number-' + i + '-' + j + ' value-' + num;
        number.innerHTML = num;
        number.style.top = pos.top + 40 + 'px';
        number.style.left = pos.left + 40 + 'px';
        number.style.width = 0;
        number.style.height = 0;
        box.appendChild(number);
        
        animate(number, {
            width: 80,
            height: 80,
            top: pos.top,
            left: pos.left
        }, {time: 100});
    }

    /**
     * 移动动画效果
     */
    function moveAnimate(fromX, fromY, toX, toY) {
        var ele = getByClass('number-'+fromX+'-'+fromY, box)[0];
        var pos = getPos(toX, toY);
        animate(ele, {
            top: pos.top,
            left: pos.left
        }, {time: 200});
    }

    win.game = win.game || {};
    win.game.view = {
        initGrid: initGrid,
        updateView: updateView,
        updateScore: updateScore,
        updateBestScore: updateBestScore,
        newNumber: newNumber,
        moveAnimate: moveAnimate
    };
})(window);