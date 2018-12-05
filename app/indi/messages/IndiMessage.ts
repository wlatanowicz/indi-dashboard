class IndiMessage {
    static tagName : string = null;
    static oneClass = null;

    device : string = null;
    name : string = null;

    constructor(device, name) {
        this.device = device;
        this.name = name;
    }

    static fromXml(xml:XMLDocument) {
        return new this(
            xml.documentElement.getAttribute('device'),
            xml.documentElement.getAttribute('name')
        )
    }

    toXml() {
        let klass = <typeof IndiMessage>this.constructor;
        let el = document.createElementNS('', klass.tagName);
        if (this.device) {
            el.setAttribute('device', this.device);
        }
        if (this.name) {
            el.setAttribute('name', this.name);
        }
        return el;
    }

    toXmlString() {
        let xml = this.toXml();
        return xml.outerHTML;
    }
}

class IndiMessagePart {
    static tagName : string = null;

    name : string = null;
    value : string = null;

    constructor(name, value) {
        this.name = name;
        this.value = value;
    }

    static fromXml(xml:Element) {
        return new this(
            xml.getAttribute('name'),
            xml.innerHTML
        );
    }

    static arrayFromXml(xml:XMLDocument) {
        let res = [];
        let nodes = xml.getElementsByTagName(this.tagName);
        for (let i=0; i<nodes.length; i++) {
            let node = nodes[i];
            res.push(this.fromXml(node));
        }
        return res;
    }

    toXml() {
        let klass = <typeof IndiMessagePart>this.constructor;
        let xml = document.createElementNS('', klass.tagName)
        xml.setAttribute('name', this.name);
        xml.innerHTML = this.value;
        return xml;
    }
}

class ComplexIndiMessage extends IndiMessage {
    elements : Array<IndiMessagePart> = null;

    constructor(device, name, elements) {
        super(device, name)
        this.elements = elements;
    }

    static fromXml(xml:XMLDocument) {
        return new this(
            xml.documentElement.getAttribute('device'),
            xml.documentElement.getAttribute('name'),
            this.oneClass.arrayFromXml(xml)
        )
    }

    hasElement(name: string) {
        return this.elements.filter((el, i) => el.name == name).length > 0
    }

    getElement(name: string) {
        return this.elements.filter((el, i) => el.name == name)[0]
    }

    toXml() {
        let xml = super.toXml();
        for (let i=0; i<this.elements.length; i++) {
            xml.appendChild(this.elements[i].toXml())
        }
        return xml;
    }
}

export { IndiMessage };
export { IndiMessagePart };
export { ComplexIndiMessage };
