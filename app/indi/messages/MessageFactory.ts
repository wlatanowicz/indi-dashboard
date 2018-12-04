import { SetTextVector, SetNumberVector, SetLightVector, SetSwitchVector } from "@app/indi/messages/Set";

export default class MessageFactory {
    supportedMessages = [
        SetTextVector,
        SetNumberVector,
        SetLightVector,
        SetSwitchVector,
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
        return this.messageClassByTagName(xml.documentElement.tagName).fromXml(xml)
    }
}
