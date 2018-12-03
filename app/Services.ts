import ByConstructor from "@framework/DependencyInjection/Definition/ByConstructor";
import WebSocketClient from "@app/indi/WebSocketClient";
import ByValue from "@framework/DependencyInjection/Definition/ByValue";

export default {
    'connection': new ByConstructor(
        WebSocketClient,
        [
            new ByValue('ws://localhost:8001')
        ]
    )
}
