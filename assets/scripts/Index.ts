import { SCREEN_H } from './manager/DataManager';
// Created by carolsail

import { StaticInstance } from './StaticInstance';
import { ENUM_RESOURCE_TYPE, ENUM_UI_TYPE } from './Enum';
import AudioManager from "./manager/AudioManager";
import DataManager from './manager/DataManager';
import ResourceManager from "./manager/ResourceManager";
import SdkManager from './manager/SdkManager';

const {ccclass, property} = cc._decorator;

@ccclass
export default class Index extends cc.Component {

    onLoad() {
        DataManager.instance.loadingRate = 0
        // 物理碰撞系统
        cc.director.getPhysicsManager().enabled = true
        // cc.director.getPhysicsManager().debugDrawFlags = 1
    }

    async start(){
        // 加载资源
        await ResourceManager.instance.loadRes(ENUM_RESOURCE_TYPE.AUDIO, 0.6)
        await ResourceManager.instance.loadRes(ENUM_RESOURCE_TYPE.PREFAB, 0.4)
        // await ResourceManager.instance.loadRes(ENUM_RESOURCE_TYPE.SPRITE)
        // 加载ui
        StaticInstance.uiManager.init()
        // 设置场景尺寸
        DataManager.instance.setStageSize()
        // 读档
        DataManager.instance.restore()
        // 播放音乐
        AudioManager.instance.playMusic()
        // 加载sdk
        SdkManager.instance.passiveShare()
        SdkManager.instance.getRank()
        SdkManager.instance.initBannerAd()
        SdkManager.instance.initInterstitialAd()
        SdkManager.instance.initVideoAd()
        // 操作ui
        StaticInstance.uiManager.toggle(ENUM_UI_TYPE.MENU)
    }
}
