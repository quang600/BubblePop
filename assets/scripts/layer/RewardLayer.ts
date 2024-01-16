// Created by carolsail 

import { ENUM_AUDIO_CLIP, ENUM_GAME_EVENT, ENUM_GAME_STATUS, ENUM_UI_TYPE } from "../Enum";
import AudioManager from "../manager/AudioManager";
import DataManager from "../manager/DataManager";
import EventManager from "../manager/EventManager";
import SdkManager from "../manager/SdkManager";
import ToastManager from "../manager/ToastManager";
import { StaticInstance } from "../StaticInstance";
import BaseLayer from "./Baselayer";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RewardLayer extends BaseLayer {

    @property(cc.Node)
    styleNode: cc.Node = null
 
    onCloseClick(e: any){
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        this.hide()
    }

    setStyle(i: number){
        this.styleNode.children.forEach((style, index)=>{
            style.active = i === index
        })
        const style: cc.Node = this.styleNode.children[i]
        this.fadeIn(style)
    }

    onIceSkillClick(){
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        if(DataManager.instance.skillNums[0] <= 0){
            ToastManager.instance.show('技能点不足, 请先获取', {gravity: 'BOTTOM', bg_color: cc.color(226, 69, 109, 255)})
            return
        }
        this.hide()
        EventManager.instance.emit(ENUM_GAME_EVENT.ITEM_ICE_START)
    }

    onIcelRewardClick(){
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        SdkManager.instance.showVideoAd(()=>{
            DataManager.instance.skillNums[0] += 1
            DataManager.instance.save()
            StaticInstance.uiManager.setMainPropNum()
            ToastManager.instance.show('已发放技能点', {gravity: 'BOTTOM', bg_color: cc.color(102, 202, 28, 255)})
        }, ()=>{
            ToastManager.instance.show('视频播放中断', {gravity: 'BOTTOM', bg_color: cc.color(226, 69, 109, 255)})
        })
    }

    onBoomSkillClick(){
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        if(DataManager.instance.skillNums[1] <= 0){
            ToastManager.instance.show('技能点不足, 请先获取', {gravity: 'BOTTOM', bg_color: cc.color(226, 69, 109, 255)})
            return
        }
        this.hide()
        EventManager.instance.emit(ENUM_GAME_EVENT.ITEM_BOOM)
    }

    onBoomRewardClick(){
        AudioManager.instance.playSound(ENUM_AUDIO_CLIP.CLICK)
        SdkManager.instance.showVideoAd(()=>{
            DataManager.instance.skillNums[1] += 1
            DataManager.instance.save()
            StaticInstance.uiManager.setMainPropNum()
            ToastManager.instance.show('已发放技能点', {gravity: 'BOTTOM', bg_color: cc.color(102, 202, 28, 255)})
        }, ()=>{
            ToastManager.instance.show('视频播放中断', {gravity: 'BOTTOM', bg_color: cc.color(226, 69, 109, 255)})
        })
    }
}
