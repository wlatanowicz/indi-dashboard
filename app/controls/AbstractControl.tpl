<div class="dashboard-item" style="[%= this.getGridStyle() %]">
    <com:Placeholder ID="Status">
        <span class="dashboard-item__status-icon dashboard-item__status-icon--[%= this.getStatusClass() %]"></span>
    </com:Placeholder>
    <label class="dashboard-item__label">[%= this.Label %]</label>
    <div class="dashboard-item__content">
        <com:Content ID="InnerContent" />
    </div>
</div>
