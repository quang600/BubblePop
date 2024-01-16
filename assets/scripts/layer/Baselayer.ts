// Created by carolsail

const {ccclass, property} = cc._decorator;

@ccclass
export default class BaseLayer extends cc.Component {

    private speed: number = 0.3

    show() {
        this.node.active = true;
    }

    hide() {
        this.node.active = false
    }

    // 弹进动画
    fadeIn(node: cc.Node){
        node.setScale(1.5);
        node.opacity = 0;
        let cbFadeIn = cc.callFunc(()=>{}, this);
        let actionFadeIn = cc.sequence(cc.spawn(cc.fadeTo(this.speed, 255), cc.scaleTo(this.speed, 1.0)), cbFadeIn);
        cc.tween(node).then(actionFadeIn).start()
    }
}
