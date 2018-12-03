import { IndiMessagePart } from "@app/indi/messages/IndiMessage";

class OneText extends IndiMessagePart {
    static tagName = 'oneText';
}

class OneLight extends IndiMessagePart {
    static tagName = 'oneLight';
}

class OneNumber extends IndiMessagePart {
    static tagName = 'oneNumber';
}

class OneSwitch extends IndiMessagePart {
    static tagName = 'oneSwitch';
}

export { OneText };
export { OneLight };
export { OneNumber };
export { OneSwitch };
