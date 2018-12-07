import { ComplexIndiMessage } from "@app/indi/messages/IndiMessage";
import { OneText, OneNumber, OneSwitch } from "@app/indi/messages/One";

class NewMessage extends ComplexIndiMessage {
}

class NewTextVector extends NewMessage {
    static tagName = 'newTextVector';
    static oneClass = OneText;
}

class NewNumberVector extends NewMessage {
    static tagName = 'newNumberVector';
    static oneClass = OneNumber;
}

class NewSwitchVector extends NewMessage {
    static tagName = 'newSwitchVector';
    static oneClass = OneSwitch;
}

export { NewTextVector };
export { NewNumberVector };
export { NewSwitchVector };
