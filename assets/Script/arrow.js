const player = require('player');
cc.Class({
  extends: cc.Component,

  properties: {
  
  },

  onLoad: function () {
    this.enabled = false;
    cc.director.getCollisionManager().enabled = true;
    cc.director.getPhysicsManager().enabled = true;

  },
  init: function (game) {
    this.game = game;
    this.enabled = true;
  },

  reuse(game) {
    this.init(game);
  },
 
  onCollisionEnter: function (other) {
    this.node.color = cc.Color.BLUE;
},

onCollisionStay: function (other) {
  this.node.color = cc.Color.BLUE;

},

onCollisionExit: function () {
   
  },
});
