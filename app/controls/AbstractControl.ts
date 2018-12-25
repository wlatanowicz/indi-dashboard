import TemplateControl from "@framework/TemplateControl";
import ServiceContainer from "@framework/DependencyInjection/ServiceContainer";
import WebSocketClient from "@app/indi/WebSocketClient";
import { SetMessage } from "@app/indi/messages/Set";
import { IndiMessage } from "@app/indi/messages/IndiMessage";
import Exception from "@framework/Exception";
import baseTemplate from "./AbstractControl.tpl"
import { DelProperty } from "@app/indi/messages/Del";
import { DefMessage } from "@app/indi/messages/Def";

class AbstractControl extends TemplateControl {
    private baseTemplate = baseTemplate;

    private _Connection = 'connection';
    private _Row = null;
    private _Column = null;
    private _Rows = 1;
    private _Columns = 1;

    public Status: string;
    public Label: string;

    defMessage: DefMessage = null;

    get Enabled(): boolean {
        return this.defMessage !== null;
    }

    set Connection(value: any)
    {
        this._Connection = value;
    }

    get Connection(): any
    {
        return this.converters.string(this._Connection);
    }
    
    set Row(value: any)
    {
        this._Row = value;
    }

    get Row(): any
    {
        return this.converters.int(this._Row);
    }

    set Column(value: any)
    {
        this._Column = value;
    }

    get Column(): any
    {
        return this.converters.int(this._Column);
    }

    set Rows(value: any)
    {
        this._Rows = value;
    }

    get Rows(): any
    {
        return this.converters.int(this._Rows);
    }

    set Columns(value: any)
    {
        this._Columns = value;
    }

    get Columns(): any
    {
        return this.converters.int(this._Columns);
    }

    constructor() {
        super();
        this.attachToConnection();
    }

    getConnection(): WebSocketClient {
        return ServiceContainer.get(this.Connection);
    }

    attachToConnection() {
        this.getConnection().event.attach('Receive', this.onMessageReceived.bind(this));
    }

    onMessageReceived(sender, param) {
        let msg = param['Message'];
        if (this.checkIfMessageApplies(msg)) {
            if (msg instanceof DefMessage) {
                this.enable(msg);
                this.onDefReceived(msg);
            }
            if (msg instanceof SetMessage) {
                this.updateStatus(msg);
                this.onSetReceived(msg);
            }
            if (msg instanceof DelProperty) {
                this.disable();
                this.onDelReceived(msg);
            }
        }
    }

    updateStatus(msg) {
        let newStatus = msg.state;
        if (this.Status != newStatus) {
            this.Status = newStatus;
            this.$('Status').render();
        }
    }

    enable(msg) {
        if (!this.Enabled) {
            this.defMessage = msg;
            this.render();
        }
    }

    disable() {
        if (this.Enabled) {
            this.defMessage = null;
            this.Status = 'idle';
            this.render();
        }
    }

    checkIfMessageApplies(message:IndiMessage) {
        return true;
    }

    onDefReceived(message:DefMessage) {

    }

    onSetReceived(message:SetMessage) {

    }

    onDelReceived(message:DelProperty) {

    }

    createChildControls() {
        if (this.template === null) {
            throw new Exception('Template not loaded');
        }
        this.baseTemplate.call(this, this, this);
        let content = this.findInnerContentControl('InnerContent')
        this.template.call(content, this, this);
    }

    findInnerContentControl( id ){
        if( this._childControlsHash[ id ]
            && this._childControlsHash[ id ].ID == id ){
            return this._childControlsHash[ id ];
        }
        for (let i=0; i<this._childControls.length; i++ ){
            let ctrl = this._childControls[i].findChildControlByID( id );
            if( ctrl != null ){
                return ctrl;
            }
        }
        return null;
    }

    getGridStyle() {
        let style = ''
        if (this.Column) {
            style += 'grid-column-start: ' + this.Column + ';';
        }
        if (this.Row) {
            style += 'grid-row-start: ' + this.Row + ';';
        }
        style += 'grid-column-end: span ' + this.Columns + ';';
        style += 'grid-row-end: span ' + this.Rows + ';';
        return style;
    }

    getItemClass() {
        let css = '';
        css += 'dashboard-item' + (this.Enabled
            ? '--enabled'
            : '--disabled');
        return css;
    }

    getStatusClass() {
        let status = this.Status ? this.Status.toLowerCase() : null;
        switch (status) {
            case 'ok':
            case 'busy':
            case 'alert':
                return status;
            case 'idle':
            default:
                return 'idle';
        }
    }
}

class ElementAbstractControl extends AbstractControl {
    private _Device = null;
    private _Vector = null;
    private _Element = null;

    set Device(value: any)
    {
        this._Device = value;
    }

    get Device(): any
    {
        return this.converters.string(this._Device);
    }

    set Vector(value: any)
    {
        this._Vector = value;
    }

    get Vector(): any
    {
        return this.converters.string(this._Vector);
    }
    
    set Element(value: any)
    {
        this._Element = value;
    }

    get Element(): any
    {
        return this.converters.string(this._Element);
    }
    
    checkIfMessageApplies(message:SetMessage) {
        return message.device == this.Device
            && message.name == this.Vector
            && (message instanceof DelProperty || message.hasElement(this.Element))
    }
}

export { AbstractControl };
export { ElementAbstractControl };
