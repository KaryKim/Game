
cc.Class({
    extends: cc.Component,

    properties: {
        canvas: cc.Node,

        follower: {
            default: null,
            type: cc.Node
        },
        followSpeed: 200,

      
        
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        self.moveToPos = cc.v2(0, 0);
        self.isMoving = false;



            // screen boundaries
            this.minPosX = -this.node.parent.width / 2;
        this.maxPosX = this.node.parent.width / 2;

        self.canvas.on(cc.Node.EventType.TOUCH_START, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            self.isMoving = true;
            self.moveToPos = self.follower.parent.convertToNodeSpaceAR(touchLoc);

        }, self.node);
        self.canvas.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            self.moveToPos = self.follower.parent.convertToNodeSpaceAR(touchLoc);

        }, self.node);
        self.canvas.on(cc.Node.EventType.TOUCH_END, function (event) {
            self.isMoving = false; 
       
        }, self.node);
    },

    // called every frame
    update: function (dt) {
        if (!this.isMoving) return;
        var oldPos = this.follower.position;
        // get move direction
        var direction = this.moveToPos.sub(oldPos).normalize();
        // multiply direction with distance to get new position
        var newPos = oldPos.add(direction.mul(this.followSpeed * dt));
        // set new position
        this.follower.setPosition(newPos);
        // limit player position inside screen
        if (this.node.x > this.node.parent.width / 2) {
            this.node.x = this.node.parent.width / 2;
            this.follower.followSpeed = 0;
        } else if (this.node.x < -this.node.parent.width / 2) {
            this.node.x = -this.node.parent.width / 2;
            this.follower.followSpeed = 0;;
        }
    }
});

