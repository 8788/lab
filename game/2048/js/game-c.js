/**
 * @fileOverview 2048
 * @authors @Bubblings
 */

;(function (win) {

    function init() {
        game.model.initModel();
        game.view.initGrid();
        game.model.newNumber(game.view.newNumber);
        game.model.newNumber(game.view.newNumber);
        game.model.updateBestScore(game.view.updateBestScore);
    }

    addEvent(document, 'keyup', function (event) {
        switch (event.keyCode) {
            case 37: // 左
                if (game.model.canMoveLeft()) {
                    game.model.moveLeft(game.view.moveAnimate);
                    setTimeout(function () {
                        game.model.newNumber(game.view.newNumber);
                    }, 250);
                }
                break;
            case 38: // 上
                if (game.model.canMoveTop()) {
                    game.model.moveTop(game.view.moveAnimate);
                    setTimeout(function () {
                        game.model.newNumber(game.view.newNumber);
                    }, 250);
                }
                break;
            case 39: // 右
                if (game.model.canMoveRight()) {
                    game.model.moveRight(game.view.moveAnimate);
                    setTimeout(function () {
                        game.model.newNumber(game.view.newNumber);
                    }, 250);
                }
                break;
            case 40: // 下
                if (game.model.canMoveBottom()) {
                    game.model.moveBottom(game.view.moveAnimate);
                    setTimeout(function () {
                        game.model.newNumber(game.view.newNumber);
                    }, 250);
                }
                break;
        }

        if (/37|38|39|40/g.test(event.keyCode)) {
            setTimeout(function () {
                game.model.updateModel(game.view.updateView);
            }, 220);
            setTimeout(function () {
                if(game.model.isGameOver()) {
                    game.model.updateBestScore(game.view.updateBestScore);
                    alert('game over');
                }
            }, 400);
        }
    });

    win.game = win.game || {};
    win.game.control = {
        init: init
    };
})(window);