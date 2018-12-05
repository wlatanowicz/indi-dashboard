import MessageFactory from "@app/indi/messages/MessageFactory";
import EventResponderInterface from "@framework/EventResponderInterface";
import EventResponder from "@framework/EventResponder";
import { GetProperties } from "@app/indi/messages/Get";
import { IndiMessage } from "@app/indi/messages/IndiMessage";

export default class WebSocketClient implements EventResponderInterface {
    url: string = null;
    socket: WebSocket = null;

    private _event = null;

    get event():EventResponder
    {
        if (this._event === null) {
            this._event = new EventResponder(this, ['Receive']);
        }
        return this._event;
    }

    constructor(url: string){
        this.url = url
    }

    connect(){
        this.socket = new WebSocket(this.url);
        this.socket.onmessage = this.messageReceived.bind(this);
        this.socket.onopen = this.handshake.bind(this);
    }

    handshake(e: MessageEvent){
        let msg = new GetProperties();
        this.messageSend(msg);
    }

    messageReceived(e: MessageEvent){
        let parser = new DOMParser();
        let xml = parser.parseFromString(e.data, 'application/xml');
        let mf = new MessageFactory();
        let msg = mf.messageFromXml(xml);
        if (msg) {
            this.event.trigger('Receive', {'Message': msg});
        } else {
            console.warn('Unprocessable message: ' + e.data);
        }
    }

    messageSend(msg: IndiMessage){
        this.socket.send(msg.toXmlString());
    }
}
