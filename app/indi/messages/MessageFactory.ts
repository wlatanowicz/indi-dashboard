import { SetTextVector } from "@app/indi/messages/Set";

export default class MessageFactory {
    supportedMessages = [
        SetTextVector,
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
