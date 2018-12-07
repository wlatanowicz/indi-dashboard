import { IndiMessagePart, ComplexIndiMessage } from "@app/indi/messages/IndiMessage";
import { NewTextVector, NewNumberVector, NewSwitchVector } from "@app/indi/messages/New";

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
    static newClass = null;
}

class DefTextVector extends DefMessage {
    static tagName = 'defTextVector';
    static oneClass = DefText;
    static newClass = NewTextVector;
}

class DefNumberVector extends DefMessage {
    static tagName = 'defNumberVector';
    static oneClass = DefNumber;
    static newClass = NewNumberVector;
}

class DefSwitchVector extends DefMessage {
    static tagName = 'defSwitchVector';
    static oneClass = DefSwitch;
    static newClass = NewSwitchVector;
}

class DefLightVector extends DefMessage {
    static tagName = 'defLightVector';
    static oneClass = DefLight;
}

export { DefMessage };
export { DefTextVector };
export { DefNumberVector };
export { DefSwitchVector };
export { DefLightVector };
