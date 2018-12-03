import { ElementAbstractControl } from "@app/controls/AbstractControl";
import template from "./SingleValueView.tpl"
import { IndiMessage } from "@app/indi/messages/IndiMessage";
import { SetMessage } from "@app/indi/messages/Set";

export default class SingleValueView extends ElementAbstractControl {
    template = template;
    _DisplayValue = null;

    set DisplayValue(value: any)
    {
        this._DisplayValue = value;
    }

    get DisplayValue(): any
    {
        return this.converters.string(this._DisplayValue);
    }    

    onSetReceived(message:SetMessage) {
        this.DisplayValue = message.getElement(this.Element).value;
        this.render()
    }
}
