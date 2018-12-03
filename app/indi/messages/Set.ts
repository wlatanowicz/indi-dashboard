import { IndiMessage, IndiMessagePart, ComplexIndiMessage } from "@app/indi/messages/IndiMessage";
import { OneText, OneLight, OneNumber, OneSwitch } from "@app/indi/messages/One";

class SetMessage extends ComplexIndiMessage {
    state : string = null;

    constructor(device, name, state, elements) {
        super(device, name, elements);
        this.state = state;
    }

    static fromXml(xml:XMLDocument) {
        return new this(
            xml.documentElement.getAttribute('device'),
            xml.documentElement.getAttribute('name'),
            xml.documentElement.getAttribute('state'),
            this.oneClass.arrayFromXml(xml)
        )
    }

    hasElement(name: string) {
        return this.elements.filter((el, i) => el.name == name).length > 0
    }

    getElement(name: string) {
        return this.elements.filter((el, i) => el.name == name)[0]
    }
}

class SetTextVector extends SetMessage {
    static tagName = 'setTextVector';
    static oneClass = OneText;
}

class SetLightVector extends SetMessage {
    static tagName = 'setLightVector';
    static oneClass = OneLight;
}

class SetNumberVector extends SetMessage {
    static tagName = 'setNumberVector';
    static oneClass = OneNumber;
}

class SetSwitchVector extends SetMessage {
    static tagName = 'setSwitchVector';
    static oneClass = OneSwitch;
}

export { SetMessage };
export { SetTextVector };
export { SetLightVector };
export { SetNumberVector };
export { SetSwitchVector };
