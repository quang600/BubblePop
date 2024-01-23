// Created by carolsail

import { ENUM_AUDIO_CLIP, ENUM_GAME_EVENT, ENUM_GAME_STATUS, ENUM_UI_TYPE } from "../Enum";
import AudioManager from "../manager/AudioManager";
import DataManager from "../manager/DataManager";
import EventManager from "../manager/EventManager";
import SdkManager from "../manager/SdkManager";
import ToastManager from "../manager/ToastManager";
import { StaticInstance } from "../StaticInstance";
import BaseLayer from "./Baselayer";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainLayer extends BaseLayer {

    @property(cc.Label)
    level: cc.Label = null
    @property(cc.Label)
    score: cc.Label = null
    @property(cc.Node)
    propsNode: cc.Node = null

    onEnable() { }

    protected onDisable(): void { }

    onSettingClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        StaticInstance.uiManager.setSettingStyle(1)
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.SETTING)
        DataManager.instance.status = ENUM_GAME_STATUS.UNRUNING
    }

    setLevelLabel() {
        this.level.string = `First${DataManager.instance.level}close`
    }

    setScoreLabel(score: number) {
        if (score !== 0) {
            let old: any = this.score.string
            if (DataManager.instance.combo > 1) score *= DataManager.instance.combo
            score += old * 1
            if (score > DataManager.instance.maxScore) {
                DataManager.instance.maxScore = score
                DataManager.instance.save()
                // 设置排行榜
                SdkManager.instance.setRank(score)
            }
        }
        this.score.string = `${score}`
        cc.tween(this.score.node)
            .to(0.2, { scale: 0.8 })
            .to(0.2, { scale: 1 })
            .to(0.2, { scale: 1.2 })
            .to(0.2, { scale: 1 }).start()

        DataManager.instance.point = score;
    }

    // 设置技能点数
    setPropNum() {
        this.propsNode.children.forEach((prop, index) => {
            const nums = prop.getChildByName('num')
            nums.getChildByName('label').getComponent(cc.Label).string = `${DataManager.instance.skillNums[index]}`
        })
    }

    onIceClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK2)
        StaticInstance.uiManager.setRewardStyle(0)
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.REWARD)
    }

    onBoomClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK2)
        StaticInstance.uiManager.setRewardStyle(1)
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.REWARD)
    }
}
