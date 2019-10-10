const arrow = require('arrow');
const player = require('player');
const ScoreFX = require('ScoreFX');
var com = require('Common');
cc.Class({
    extends: cc.Component,

    properties: {
        arrowPrefab: {
            default: null,
            type: cc.Prefab
        },
        player: {
            default: null,
            type: cc.Node
        },
        ballPrefab: {
            default: null,
            type: cc.Prefab
        },  
        scoreFXPrefab: {
            default: null,
            type: cc.Prefab
        },
        scoreAudio: {
            default: null,
            type: cc.AudioClip
        },
        bgAudio:{
            default:null,
            type:cc.AudioClip
        }
    },

    onLoad: function () {
        this.timer = 0;
        this.score=0;
        this.enabled = false;
        this.resetScore();
        this.scorePool = new cc.NodePool('ScoreFX');
        this.arrowPool = new cc.NodePool('arrow');
        this.ballPool = new cc.NodePool('ball');

        //安卓返回键退出
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (event) => {
            if (event.keyCode === cc.KEY.back) {
                cc.director.end();
            }
        });
        this.physicsManager = cc.director.getPhysicsManager();
        cc.director.getPhysicsManager().enabled = true;
        this.spawnNewball();
        cc.audioEngine.setEffectsVolume(0.3);
        cc.audioEngine.playMusic(this.bgAudio,true);
        this.schedule(function () {
            this.spawnNewArrow();
        }, 2);
    },

    onStartGame: function () {

        this.enabled = true;
        this.spawnNewball();
        this.resetScore();
        cc.log('555888');
    },
    spawnNewball: function () {
        var newball = null;
        if (this.ballPool.size() > 0) {
            newball = this.ballPool.get(this);
        } else {
            newball = cc.instantiate(this.ballPrefab);
        }
        this.node.addChild(newball);
        newball.setPosition(this.getNewballPosition());
        newball.getComponent(cc.RigidBody).linearVelocity = cc.v2(500, 500);
        newball.getComponent('ball').init(this);
        this.startTimer();
    },
    despawnball(ball) {
        this.ballPool.put(ball);
        this.spawnNewball();
    },
    getNewballPosition: function () {
        var randX = (Math.random() - 0.5) * 2;
        var randY = Math.random() * 100;
        return cc.v2(randX, randY);
    },
    startTimer: function () {
        this.timer = 0;
    },
    gainScore: function (pos) {
        this.score += 1;
        com.data=this.score;
        var fx = this.spawnScoreFX();
        this.node.addChild(fx.node);
        fx.node.setPosition(pos);
        fx.play();
        cc.audioEngine.setEffectsVolume(0.2);
        cc.audioEngine.playEffect(this.scoreAudio, false);
    },
    resetScore: function () {
        this.score = 0;
        com.data=this.score;
    },
    spawnScoreFX: function () {
        var fx; 
        if (this.scorePool.size() > 0) {
            fx = this.scorePool.get(); 
            return fx.getComponent('ScoreFX');  
        } else {
            fx = cc.instantiate(this.scoreFXPrefab).getComponent('ScoreFX');
            fx.init(this);   
        return fx;  
        } 
    },
 
    despawnScoreFX (scoreFX) {
        this.scorePool.put(scoreFX);
    },
    spawnNewArrow: function () {
        var newArrow = null;
        if (this.arrowPool.size() > 0) {
            newArrow = this.arrowPool.get(this); 
        } else {
            newArrow = cc.instantiate(this.arrowPrefab);
        }
        this.node.addChild(newArrow);
        newArrow.setPosition(this.getNewarrowPosition());
        //var f1 = cc.sequence(cc.moveBy(0.5, 200, 0), cc.moveBy(0.5, -200, 0));
        var f1 = cc.moveTo(Math.random() * 5 + 0.5, cc.v2(0, -this.node.height / 2 - 50));
        var finish = cc.callFunc(newArrow.removeFromParent, newArrow);
        var seq = cc.sequence(f1, finish);
        newArrow.runAction(seq);
        newArrow.getComponent('arrow').init(this);
    },
    getNewarrowPosition: function () {
        var randX = Math.random() * 400 - 200;
        var randY = this.node.height / 2 + 100;
        return cc.v2(randX, randY);
    },

    despawnArrow(arrow) {
        this.arrowPool.put(arrow);
        this.spawnNewArrow();
    },
    start: function () {
        cc.director.getCollisionManager().enabled = true;
    },
    init() {
        this.physicsManager.enabled = true;
    },
    startGame: function () {
        this.init();
    },

    pauseGame() {
        this.physicsManager.enabled = false;
    },

    resumeGame() {
        this.physicsManager.enabled = true;
    },

    stopGame() {
        this.physicsManager.enabled = false;

    },

});

