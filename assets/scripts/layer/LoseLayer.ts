// Created by carolsail

import { ENUM_AUDIO_CLIP, ENUM_GAME_EVENT, ENUM_UI_TYPE } from "../Enum";
import { StaticInstance } from './../StaticInstance';
import AudioManager from "../manager/AudioManager";
import BaseLayer from "./Baselayer";
import EventManager from "../manager/EventManager";
import SdkManager from "../manager/SdkManager";
import DataManager from "../manager/DataManager";
import GameManager from "../manager/GameManager";
// import HttpManager from "../manager/HTTPManager";
import ToastManager from "../manager/ToastManager";
import CGManager from "../manager/CGManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoseLayer extends BaseLayer {

    point: number = 0;

    protected onLoad(): void {
        EventManager.instance.on(ENUM_GAME_EVENT.PURCHASE_RESPONSE, this.onPurchaseResponse, this)
    }

    onPurchaseResponse(data) {
        console.log("data message revival", data.message);

        ToastManager.instance.show(data.message, { gravity: 'BOTTOM', bg_color: cc.color(226, 69, 109, 255) })
        if (data.code == 200) {
            DataManager.instance.revival = true;
            StaticInstance.gameManager.onBubbleIncrease();
            DataManager.instance.save()
            StaticInstance.uiManager.setMainPropNum()
            this.close();
        }
        DataManager.instance.revival = false;
    }

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
        CGManager.Instance.purchaseItem("packagerevive150pointgameid100", () => {
            // HttpManager.sendHttpPostRequest("REVIVE", "packagerevive150pointgameid100");
            // AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
            // SdkManager.instance.showVideoAd(() => {
            //     // DataManager.instance.skillNums[1] += 1
            //     DataManager.instance.save()
            //     StaticInstance.uiManager.setMainPropNum()
            //     // ToastManager.instance.show('Skills point for distributed', { gravity: 'BOTTOM', bg_color: cc.color(102, 202, 28, 255) })
            // }, () => {
            //     // ToastManager.instance.show('Video playback interruption', { gravity: 'BOTTOM', bg_color: cc.color(226, 69, 109, 255) })
            // })

            // ToastManager.instance.show(DataManager.instance.msgPortal, { gravity: 'BOTTOM', bg_color: cc.color(226, 69, 109, 255) })
            return
        })

    }

    close() {
        this.hide();

    }
}
