<div class="value">
    <com:SwitchView>
        <com:Case Condition="[%= this.Enabled %]">
            [%= SourceTemplateControl.DisplayValue %]
        </com:Case>
        <com:Case>
            N/A
        </com:Case>
    </com:SwitchView>
</div>
