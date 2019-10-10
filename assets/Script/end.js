// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
const game = require('game');
const ball = require('ball');
var com = require('Common');
cc.Class({
    extends: cc.Component,

    properties: {
        btn: {
            default: null,
            type: cc.Node

        },
        ScoreDisplay: {
            default: null,
            type: cc.Label
        },
        gameoverAudio: {
            default: null,
            type: cc.AudioClip
        
        }
    },
    
  init: function (game) {
    this.game = game;
  },
  reuse(game) {
    this.init(game);
  },
    
    onLoad: function () {
        cc.director.preloadScene('ready');
        var scaleTo = cc.scaleTo(0.98, 0.98);
        var reverse = cc.scaleTo(0.98, 1);
        var seq = cc.sequence(scaleTo, reverse);
        var repeat = cc.repeatForever(seq);
        this.btn.runAction(repeat);
        cc.audioEngine.setEffectsVolume(0.3);
        cc.audioEngine.playMusic(this.gameoverAudio);
        this.btn.on("touchstart", function () {
            cc.director.loadScene('ready');
        });
        this.ScoreDisplay.string= com.data;
    },
});

