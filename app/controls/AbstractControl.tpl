<div class="dashboard-item [%= this.getItemClass() %]" style="[%= this.getGridStyle() %]">
    <com:PlaceHolder ID="Status">
        <span class="dashboard-item__status-icon dashboard-item__status-icon--[%= this.getStatusClass() %]"></span>
    </com:PlaceHolder>
    <label class="dashboard-item__label">[%= this.Label %]</label>
    <div class="dashboard-item__content">
        <com:Content ID="InnerContent" />
    </div>
</div>
