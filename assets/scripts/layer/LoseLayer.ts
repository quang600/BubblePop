// Created by carolsail

import { ENUM_AUDIO_CLIP, ENUM_GAME_EVENT, ENUM_UI_TYPE } from "../Enum";
import { StaticInstance } from './../StaticInstance';
import AudioManager from "../manager/AudioManager";
import BaseLayer from "./Baselayer";
import EventManager from "../manager/EventManager";
import SdkManager from "../manager/SdkManager";
import DataManager from "../manager/DataManager";
import GameManager from "../manager/GameManager";
import HttpManager from "../manager/HTTPManager";
import ToastManager from "../manager/ToastManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoseLayer extends BaseLayer {

    point: number = 0;

    protected onEnable(): void {
        const panel = this.node.getChildByName('style').getChildByName('panel')
        if (panel) this.fadeIn(panel)
    }

    onRestartClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.LOSE, false)
        EventManager.instance.emit(ENUM_GAME_EVENT.GAME_START)
    }

    onShareClick() {
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        SdkManager.instance.activeShare()
    }

    onBuyClick() {
        DataManager.instance.revival = true;

        StaticInstance.gameManager.onBubbleIncrease();

        HttpManager.sendHttpPostRequest("REVIVE", "packagerevive150pointgameid100");
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        SdkManager.instance.showVideoAd(() => {
            DataManager.instance.skillNums[1] += 1
            DataManager.instance.save()
            StaticInstance.uiManager.setMainPropNum()
            // ToastManager.instance.show('Skills point for distributed', { gravity: 'BOTTOM', bg_color: cc.color(102, 202, 28, 255) })
        }, () => {
            // ToastManager.instance.show('Video playback interruption', { gravity: 'BOTTOM', bg_color: cc.color(226, 69, 109, 255) })
        })
        this.close();
        DataManager.instance.revival = false;

        ToastManager.instance.show(DataManager.instance.msgPortal, { gravity: 'BOTTOM', bg_color: cc.color(226, 69, 109, 255) })
        return

    }

    close() {
        this.hide();

    }
}
