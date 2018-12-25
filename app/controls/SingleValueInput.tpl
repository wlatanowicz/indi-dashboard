<div class="single_value_input">
    <com:TextBox ID="Input" on:Focus=".inputFocused" on:Blur=".inputBlurred" />
    <com:Panel ID="Controls" CssClass="[%= this.getControlsClass() %]">
        <com:Button Text="✓" on:Click=".saveClicked" />
        <com:Button Text="𐄂" on:Click=".cancelClicked" />
    </com:Panel>
</div>
