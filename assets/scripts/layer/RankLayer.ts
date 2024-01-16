// Created by carolsail 

import { ENUM_AUDIO_CLIP } from "../Enum";
import BaseLayer from "./Baselayer";
import AudioManager from "../manager/AudioManager";
import SdkManager from "../manager/SdkManager";
import DataManager from "../manager/DataManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RankLayer extends BaseLayer {

    @property(cc.Node)
    debug: cc.Node = null

    onEnable(){
        SdkManager.instance.showInterstitialAd()

        if(DataManager.instance.rankDebug){
            if(this.debug) {
                this.debug.active = true
                this.fadeIn(this.node.getChildByName('style'))
            }
        }else{
            // 读取排行榜数据
            SdkManager.instance.getRank()
        }
    }
    
    onCloseClick(e: any){
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        this.hide()
    }
}
