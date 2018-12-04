import { ComplexIndiMessage } from "@app/indi/messages/IndiMessage";
import { OneText, OneNumber } from "@app/indi/messages/One";

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

export { NewTextVector };
export { NewNumberVector };
