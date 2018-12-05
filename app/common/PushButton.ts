import Button from "@framework/WebControls/FormControls/Button";
import EventResponder from "@framework/EventResponder";

export default class PushButton extends Button {
    private _pbevent = null;
    get event():EventResponder
    {
        if (this._pbevent === null) {
            this._pbevent = new EventResponder(this, ['Push', 'Release'])
        }
        return this._pbevent;
    }

    createMainElement()
    {
        var d = super.createMainElement();

        var t = document.createTextNode( this.Text );
        d.appendChild( t );
        this._renderedTextNode = t;

        this.event.registerTriggerElement( d, 'touchstart', 'Push' );
        this.event.registerTriggerElement( d, 'mousedown', 'Push' );

        this.event.registerTriggerElement( d, 'touchend', 'Release' );
        this.event.registerTriggerElement( d, 'touchcancel', 'Release' );
        this.event.registerTriggerElement( d, 'mouseup', 'Release' );

        return d;
    }
}
