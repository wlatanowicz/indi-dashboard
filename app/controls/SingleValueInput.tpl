<div class="value">
    <com:TextBox ID="Input" on:Focus=".inputFocused" on:Blur=".inputBlurred" Disabled="[%= !this.Enabled %]" />
    <com:PlaceHolder ID="Controls" Visible="[%= !this.updateInput %]">
        <com:Button Text="✓" on:Click=".saveClicked" />
        <com:Button Text="𐄂" on:Click=".cancelClicked" />
    </com:PlaceHolder>
</div>
