// Created by carolsail 

import { random } from "./Utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Fall extends cc.Component {

    speed: number = 0
    dir: number = 0

    init(pos: cc.Vec2){
        this.node.setPosition(pos)
        this.speed = Math.max(5, Math.random() * 8)
        this.dir = Math.random()
        this.node.scale = Math.max(0.9, Math.random())
        // 缓动动画
        let xx = 5 + Math.random() * 150
        if (Math.random() > 0.5) xx *= -1
        const yy = 50 + Math.random() * 150
        const f_time = 0.3 + Math.random() * 0.4
        const act_0 = cc.delayTime(Math.random() * 0.05)
        const act_1 = cc.moveBy(f_time , 0, yy).easing(cc.easeCubicActionOut())//越来越慢
        const act_2 = cc.moveBy(f_time , 0, -yy+10-Math.random() * 40).easing(cc.easeCubicActionIn())//越来越块
        const act_3 = cc.callFunc(()=>{
            this.node.removeFromParent()
        })
        const end = cc.sequence(act_0, act_1, act_2, act_3)
        cc.tween(this.node).then(end).start()
    }

    update (dt: number) {
        if(this.dir > 0.5){
            //向右移动
            this.node.x += this.speed
        }else{
            //向左移动
            this.node.x -= this.speed
        }
        this.node.angle += this.speed
    }
}
