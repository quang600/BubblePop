// Created by carolsail 

import { ENUM_AUDIO_CLIP, ENUM_GAME_EVENT } from "../Enum";
import AudioManager from "../manager/AudioManager";
import DataManager from "../manager/DataManager";
import EventManager from "../manager/EventManager";
import BaseLayer from "./Baselayer";

const {ccclass, property} = cc._decorator;

@ccclass
export default class IceEffectLayer extends BaseLayer {

    onEnable(){
        this.unscheduleAllCallbacks()
        this.scheduleOnce(()=>{
            EventManager.instance.emit(ENUM_GAME_EVENT.ITEM_ICE_END)
        }, DataManager.instance.iceTime)
    }
}
