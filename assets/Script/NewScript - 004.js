cc.Class({
  extends: cc.Component,

  properties: {
    dieAudio:{
      default:null,
      type:cc.AudioClip
    }
  },

  onLoad: function () {
    this.enabled = false;
    cc.director.getCollisionManager().enabled = true;
    cc.director.getPhysicsManager().enabled = true;
    cc.director.preloadScene('end');
  },

  // use this for initialization
  init: function (game) {
    this.game = game;
    this.enabled = true;
  },
 
  onCollisionEnter: function (other) { 
    this.node.color = cc.Color.RED;
},

onCollisionStay: function (other) {
  this.node.color = cc.Color.RED;
},
onCollisionExit: function () {
  
  cc.audioEngine.setEffectsVolume(0.5);
  cc.audioEngine.playEffect(this.dieAudio);
  cc.director.loadScene('end');
   this.enabled = false;
  },
});
