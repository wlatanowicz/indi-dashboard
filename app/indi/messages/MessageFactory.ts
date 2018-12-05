import { SetTextVector, SetNumberVector, SetLightVector, SetSwitchVector } from "@app/indi/messages/Set";
import { DefLightVector, DefNumberVector, DefTextVector, DefSwitchVector } from "@app/indi/messages/Def";
import { DelProperty } from "@app/indi/messages/Del";

export default class MessageFactory {
    supportedMessages = [
        SetTextVector,
        SetNumberVector,
        SetLightVector,
        SetSwitchVector,

        DefLightVector,
        DefNumberVector,
        DefTextVector,
        DefSwitchVector,

        //DelProperty,
    ]

    messageClassByTagName(tagName: string) {
        for(let i=0; i<this.supportedMessages.length; i++) {
            if (this.supportedMessages[i].tagName == tagName) {
                return this.supportedMessages[i];
            }
        }
        return null;
    }

    messageFromXml(xml: XMLDocument) {
        let tagName = xml.documentElement.tagName;
        let klass = this.messageClassByTagName(tagName)
        if (klass) {
            return klass.fromXml(xml)
        } else {
            console.warn('Unknown message type: ' + tagName);
            return null;
        }
    }
}
