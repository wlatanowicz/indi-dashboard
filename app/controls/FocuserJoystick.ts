import { ElementAbstractControl } from "@app/controls/AbstractControl";
import template from "./FocuserJoystick.tpl"
import { SetMessage } from "@app/indi/messages/Set";
import { NewNumberVector } from "@app/indi/messages/New";
import { OneNumber } from "@app/indi/messages/One";
import TouchSideMenu from "@framework/WebControls/Mobile/TouchSideMenu";

export default class FocuserJoystick extends ElementAbstractControl {
    template = template;
    _DisplayValue = null;
    _TargetValue = null;

    moveInterval = null;
    moveDirection = null;

    UP = 'up';
    DOWN = 'down';

    set DisplayValue(value: any) {
        this._DisplayValue = value;
    }

    get DisplayValue(): any {
        return this.converters.int(this._DisplayValue);
    }

    set TargetValue(value: any) {
        this._TargetValue = value;
    }

    get TargetValue(): any {
        return this._TargetValue !== null
            ? this.converters.int(this._TargetValue)
            : null;
    }

    onSetReceived(message:SetMessage) {
        this.DisplayValue = message.getElement(this.Element).value;
        if (this.TargetValue !== null && this.DisplayValue == this.TargetValue) {
            this.TargetValue = null;
        }
        this.$('Display').render()
    }
    
    moveIntervalFunc() {
        let targetValue = this.TargetValue !== null
            ? this.TargetValue
            : this.DisplayValue;

        let step = this.converters.int(this.$('Step').Value);

        if (this.moveDirection == this.UP) {
            targetValue += step;
        }

        if (this.moveDirection == this.DOWN) {
            targetValue -= step;
        }

        this.TargetValue = targetValue;
        this.$('Display').render();

        let msg = new NewNumberVector(
            this.Device,
            this.Vector,
            [
                new OneNumber(this.Element, this.TargetValue)
            ]
        );

        this.getConnection().messageSend(msg);
    }

    movePressed(sender, param) {
        this.moveDirection = sender.CustomData;
        if (!this.moveInterval) {
            this.moveIntervalFunc()
            this.moveInterval = setInterval(this.moveIntervalFunc.bind(this), 100);
        }
    }

    moveReleased(sender, param) {
        if (this.moveInterval) {
            clearInterval(this.moveInterval);
            this.moveInterval = null;
        }
    }
}