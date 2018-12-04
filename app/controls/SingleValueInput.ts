import { ElementAbstractControl } from "@app/controls/AbstractControl";
import template from "./SingleValueInput.tpl"
import { IndiMessage } from "@app/indi/messages/IndiMessage";
import { SetMessage } from "@app/indi/messages/Set";
import { NewTextVector, NewNumberVector } from "@app/indi/messages/New";
import { OneText, OneNumber } from "@app/indi/messages/One";

export default class SingleValueView extends ElementAbstractControl {
    template = template;
    _DisplayValue = null;

    private updateInput: boolean = true;

    set DisplayValue(value: any) {
        this._DisplayValue = value;
        if (this.updateInput) {
            this.$('Input').Text = this.DisplayValue;
        }
    }

    get DisplayValue(): any {
        return this.converters.string(this._DisplayValue);
    }

    onSetReceived(message:SetMessage) {
        this.DisplayValue = message.getElement(this.Element).value;
    }

    inputFocused(sender, param) {
        this.updateInput = false;
        this.$('Controls').render();
    }

    inputBlurred(sender, param) {
        if (this.$('Input').Text == this.DisplayValue) {
            this.cancelClicked(sender, param);
        }
    }

    cancelClicked(sender, param) {
        this.updateInput = true;
        this.$('Input').Text = this.DisplayValue;
        this.$('Controls').render();
    }

    saveClicked(sender, param) {
        let newValue = this.$('Input').Text;

        let msg = new NewNumberVector(
            this.Device,
            this.Vector,
            [
                new OneNumber(this.Element, newValue)
            ]
        );
        this.getConnection().messageSend(msg);

        this.updateInput = true;
        this.$('Input').Text = '⌛';
        this.$('Controls').render();
    }
}
