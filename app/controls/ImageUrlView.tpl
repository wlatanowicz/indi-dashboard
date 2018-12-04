<div class="value">
    <com:SwitchView>
        <com:Case Condition="[%= this.Enabled %]">
            <img style="max-width: 100%; max-height: 100%;" src="[%= SourceTemplateControl.DisplayValue %]" />
        </com:Case>
        <com:Case>
            N/A
        </com:Case>
    </com:SwitchView>
</div>
