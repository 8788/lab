/**
 * @fileOverview 2048
 * @authors @Bubblings
 */

;(function (win) {
    var score = 0;
    var nums = new Array();
    var enabled = new Array();

    /**
     * 初始化数据
     */
    function initModel() {
        for (var i = 0; i < 4; i++) {
            nums[i] = new Array();
            enabled[i] = new Array();
            for (var j = 0; j < 4; j++) {
                nums[i][j] = 0;
                enabled[i][j] = true;
            }
        }
    }

    /**
     * 更新数据状态
     */
    function updateModel(cb) {
        // reset enabled status
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                enabled[i][j] = true;
            }
        }

        cb && cb(nums);
    }

    /**
     * 随机生成一个新的数字
     */
    function newNumber (cb) {
        var num = Math.random() > 0.4 ? 2 : 4;  // 2的概率稍大
        var arr = [];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (nums[i][j] === 0) {
                    arr.push([i,j]);
                }
            }
        }
        var len = arr.length;
        if (len === 0) {
            return;
        }
        var random = parseInt(Math.random() * len, 10);
        var x = arr[random][0];
        var y = arr[random][1];

        nums[x][y] = num;
        cb && cb(x, y, num);
    }

    /**
     * 是否可以像左移
     */
    function canMoveLeft() {
        for (var i = 0; i < 4; i++) {
            for (var j = 1; j < 4; j++) {
                if (nums[i][j] !== 0) {
                    if (nums[i][j-1] === 0 || nums[i][j-1] === nums[i][j]) {
                        return true;
                    }
                }

            }
        }
        return false;
    }

    /**
     * 是否可以向上移动
     */
    function canMoveTop() {
        for (var i = 1; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (nums[i][j] !== 0) {
                    if (nums[i-1][j] === 0 || nums[i-1][j] === nums[i][j]) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    /**
     * 是否可以向右移动
     */
    function canMoveRight() {
        for (var i = 0; i < 4; i++) {
            for (var j = 2; j >= 0; j--) {
                if (nums[i][j] !== 0) {
                    if (nums[i][j+1] === 0 || nums[i][j+1] === nums[i][j]) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    /**
     * 是否可以向下移动
     */
    function canMoveBottom () {
        for (var i = 2; i >= 0; i--) {
            for (var j = 0; j < 4; j++) {
                if (nums[i][j] !== 0) {
                    if (nums[i+1][j] === 0 || nums[i+1][j] === nums[i][j]) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    /**
     * 向左移动
     */
    function moveLeft(cb) {
        for (var i = 0; i < 4; i++) {
            for (var j = 1; j < 4; j++) {
                if (nums[i][j] !== 0) {
                    for (var k = 0; k < j; k++) {
                        if (isXBlocked(i, k, j)) {
                            continue;   // 有阻塞，接着循环
                        }

                        if (nums[i][k] === 0 || nums[i][k] === nums[i][j]) {
                            moveOrMerge(i, j, i, k, cb);
                            break;
                        }
                    }
                }
            }
        }
    }

    /**
     * 向上移动
     */
    function moveTop(cb) {
        for (var i = 1; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (nums[i][j] !== 0) {
                    for (var k = 0; k < i; k++) {
                        if (isYBlocked(j, k, i)) {
                            continue;   // 有阻塞，接着循环
                        }

                        if (nums[k][j] === 0 || nums[k][j] === nums[i][j]) {
                            moveOrMerge(i, j, k, j, cb);
                            break;
                        }
                    }
                }
            }
        }
    }

    /**
     * 向右移动
     */
    function moveRight(cb) {
        for (var i = 0; i < 4; i++) {
            for (var j = 2; j >= 0; j--) {
                if (nums[i][j] !== 0) {
                    for (var k = 3; k > j; k--) {
                        if (isXBlocked(i, j, k)) {
                            continue;   // 有阻塞，接着循环
                        }

                        if (nums[i][k] === 0 || nums[i][k] === nums[i][j]) {
                            moveOrMerge(i, j, i, k, cb);
                            break;
                        }
                    }
                }
            }
        }
    }

    /**
     * 向下移动
     */
    function moveBottom(cb) {
        for (var i = 2; i >= 0; i--) {
            for (var j = 0; j < 4; j++) {
                if (nums[i][j] !== 0) {
                    for (var k = 3; k > i; k--) {
                        if (isYBlocked(j, i, k)) {
                            continue;   // 有阻塞，接着循环
                        }

                        if (nums[k][j] === 0 || nums[k][j] === nums[i][j]) {
                            moveOrMerge(i, j, k, j, cb);
                            break;
                        }
                    }
                }
            }
        }
    }


    /**
     * 通用移动/合并操作
     * @param  {Number} i 原始位置x坐标
     * @param  {Number} j 原始位置y坐标
     * @param  {Number} m 目标位置x坐标
     * @param  {Number} n 目标位置y坐标
     * @param  {Function} cb 回调
     */
    function moveOrMerge(i, j, m, n, cb) {
        if (nums[m][n] === 0) { // 移动
            nums[m][n] = nums[i][j];
        } else { // 合并相加
            nums[m][n] += nums[i][j];
            score += nums[m][n];
            game.view.updateScore(score);
            enabled[m][n] = false;  // 合并一次后，状态切换至不可用，等待updateModel
        }
        nums[i][j] = 0;
        cb && cb(i, j, m, n);
    }

    /**
     * 判断x轴方向是否被阻塞
     * @param  {Number}    row    第几行
     * @param  {Number}    from 列的起始位置
     * @param  {Number}    to   列的结束位置
     * @return {Boolean}   true: 被阻塞，false: 没被阻塞
     */
    function isXBlocked(row, from, to) {
        for (var j = from + 1; j < to; j++) {     // +1很重要，从from的下一列计算
            if (nums[row][j] !== 0) {
                return true;
            }
        }
        return false;
    }

    /**
     * 判断y轴方向是否被阻塞
     * @param  {Number}    col  第几列
     * @param  {Number}    from 行的起始位置
     * @param  {Number}    to   行的结束位置
     * @return {Boolean}   true: 被阻塞，false: 没被阻塞
     */
    function isYBlocked(col, from, to) {
        for (var i = from + 1; i < to; i++) {
            if (nums[i][col] !== 0) {
                return true;
            }
        }
        return false;
    }

    /**
     * 判断游戏是否结束
     */
    function isGameOver() {
        if (canMoveLeft() || canMoveTop() || canMoveRight() || canMoveBottom()) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * updateBestScore
     */
    function updateBestScore(cb) {
        var oldScore = localStorage.getItem('bestScore') || 0;
        if (score === 0) {  // 初始化bestScore
            cb && cb(oldScore);
        } else if (score > oldScore) {  // gameover
            localStorage.setItem('bestScore', score);
            cb && cb(score);
        }
    }

    win.game = win.game || {};
    win.game.model = {
        initModel: initModel,
        updateModel: updateModel,
        newNumber: newNumber,
        canMoveLeft: canMoveLeft,
        canMoveTop: canMoveTop,
        canMoveRight: canMoveRight,
        canMoveBottom: canMoveBottom,
        moveLeft: moveLeft,
        moveTop: moveTop,
        moveRight: moveRight,
        moveBottom: moveBottom,
        isGameOver: isGameOver,
        updateBestScore: updateBestScore
    };
})(window);