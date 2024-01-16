// Created by carolsail 

import DataManager from "../manager/DataManager";
import BaseLayer from "./Baselayer";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ComboLayer extends BaseLayer {

    @property(cc.Label)
    label: cc.Label = null

    setCombo(){
        this.unscheduleAllCallbacks()
        this.label.string = `Combo x ${DataManager.instance.combo}`
        this.show()
        this.scheduleOnce(()=>{
            this.hide()
        }, 1)
    }
}
