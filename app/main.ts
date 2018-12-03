import IndiPanel from "@app/IndiPanel";
import ServiceContainer from "@framework/DependencyInjection/ServiceContainer";
import services from "@app/Services"

ServiceContainer.batchDefine(services)

ServiceContainer.get('connection').connect()

var c = new IndiPanel();
c.Placeholder = 'container';
c.render();

