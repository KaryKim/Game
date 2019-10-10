const game = require('game');
cc.Class({
  extends: cc.Component,

  properties: {
    radius: 0,
  },

  init: function (game) {
    this.game = game;
    this.enabled = true;
    this.node.opacity = 255;
  },
  reuse(game) {
    this.init(game);
  },
  getPlayerDistance: function () {
    //根据 player 节点位置判断距离
    var playerPos = this.game.player.getPosition();
    // 根据两点位置计算两点之间距离
    var dist = this.node.position.sub(playerPos).mag();
    return dist;
  },
  Picked: function () {
    var pos = this.node.getPosition();
    this.game.gainScore(pos);
    this.node.destroy();
    this.game.spawnNewball();
  },

  update: function (dt) {
    if (this.getPlayerDistance() < this.radius) {
      //调用收集行为
      this.Picked();
      return;
    }
    var opacityRatio = 1 - this.game.timer /7;

    var minOpacity = 50;
    this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
    if (this.game.timer > 7) {
      this.gameOver();
      this.enabled = false;
      return;
    }
    this.game.timer += dt;
  },
  gameOver: function () {
    cc.audioEngine.stopMusic();
    cc.director.loadScene('end');
  },
  onLoad: function () {
    this.enabled = false;
    cc.director.getCollisionManager().enabled = true;
    cc.director.getPhysicsManager().enabled = true;
    this.timer = 0;
    cc.director.preloadScene('end');
  },

  onCollisionEnter: function (other) {
  },
  onCollisionStay: function (other) {
  },

  onCollisionExit: function () {
  },
});
