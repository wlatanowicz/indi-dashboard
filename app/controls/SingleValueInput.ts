import { ElementAbstractControl } from "@app/controls/AbstractControl";
import template from "./SingleValueInput.tpl"
import { IndiMessage } from "@app/indi/messages/IndiMessage";
import { SetMessage } from "@app/indi/messages/Set";
import { NewTextVector, NewNumberVector } from "@app/indi/messages/New";
import { OneText, OneNumber } from "@app/indi/messages/One";
import { DefMessage } from "@app/indi/messages/Def";

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

    getControlsClass() {
        return 'single_value_input__controls' + (this.updateInput
            ? '--inactive'
            : '--active');
    }

    saveClicked(sender, param) {
        let newValue = this.$('Input').Text;

        let newClass = (<typeof DefMessage>this.defMessage.constructor).newClass;

        let msg = new newClass(
            this.Device,
            this.Vector,
            [
                new newClass.oneClass(this.Element, newValue)
            ]
        );

        this.$('Input').Text = '⌛';
        this.updateInput = true;
        this.getConnection().messageSend(msg);
        this.$('Controls').render();
    }
}
