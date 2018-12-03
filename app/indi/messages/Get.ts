import { IndiMessage } from "@app/indi/messages/IndiMessage";

class GetProperties extends IndiMessage {
    static tagName = 'getProperties';

    version: string = '1.0';

    constructor(device=null, name=null, version=null) {
        super(device, name);
        if (version) {
            this.version = version;
        }
    }

    toXml() {
        let xml = super.toXml();
        xml.setAttribute('version', this.version);
        return xml;
    }
}

export { GetProperties };
