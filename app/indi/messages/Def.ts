import { IndiMessagePart, ComplexIndiMessage } from "@app/indi/messages/IndiMessage";

class DefText extends IndiMessagePart {
    static tagName = 'defText';
}

class DefLight extends IndiMessagePart {
    static tagName = 'defLight';
}

class DefNumber extends IndiMessagePart {
    static tagName = 'defNumber';
}

class DefSwitch extends IndiMessagePart {
    static tagName = 'defSwitch';
}

class DefMessage extends ComplexIndiMessage {
}

class DefTextVector extends DefMessage {
    static tagName = 'defTextVector';
    static oneClass = DefText;
}

class DefNumberVector extends DefMessage {
    static tagName = 'defNumberVector';
    static oneClass = DefNumber;
}

class DefSwitchVector extends DefMessage {
    static tagName = 'defSwitchVector';
    static oneClass = DefSwitch;
}

class DefLightVector extends DefMessage {
    static tagName = 'defLightVector';
    static oneClass = DefLight;
}

export { DefTextVector };
export { DefNumberVector };
export { DefSwitchVector };
export { DefLightVector };
