// Created by carolsail

import DataManager from "./manager/DataManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Bubble extends cc.Component {

    // 初始化
    init(pos: cc.Vec2){
        this.node.setPosition(pos)
    }

    onDelete(pos: cc.Vec2): void{
        DataManager.instance.bubbles[pos.x][pos.y] = undefined
        this.node.removeFromParent()
    }

    // onBeginContact(contact, selfCollider, otherCollider) {
    //     console.log(contact, selfCollider)
    // }
}
