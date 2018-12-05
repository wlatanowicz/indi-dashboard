<div class="focuser_joystick">
    <com:PushButton Text="⬆︎" on:Push=".movePressed" on:Release=".moveReleased" CustomData="[%= this.UP %]" />
    <com:PlaceHolder ID="Display">
        <div>[%= this.DisplayValue %]</div>
        <div>Target: [%= this.TargetValue %]</div>
    </com:PlaceHolder>
    <com:PushButton Text="⬇︎" on:Push=".movePressed" on:Release=".moveReleased" CustomData="[%= this.DOWN %]" />
    <com:TextBox ID="Step" Attributes.type="range" Attributes.min="1" Attributes.max="100" />
</div>
