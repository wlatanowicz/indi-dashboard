import SingleValueView from "@app/controls/SingleValueView";

export default class DateTimeView extends SingleValueView {
    formatDisplayValue(value: string) {
        if (value.indexOf('T') > 0){
            return value.split('T')[0] + '\n' + value.split('T')[1].split('.')[0];
        }
        return value;
    }
}
