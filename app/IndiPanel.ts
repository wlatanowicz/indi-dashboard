import TemplateControl from "@framework/TemplateControl";
import template from "@app/IndiPanel.tpl";

export default class IndiPanel extends TemplateControl {

	template = template;

	buttonClicked(sender, param){
		console.log(this);
		sender.Text = 'Hello world!';
	}
}
