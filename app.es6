import {NgElement, Component, Template, bootstrap} from 'angular2/angular2';
import 'kendo-ui-core';

// Annotation section
@Component({
    selector: 'my-app'
})
@Template({
    url: 'app.html',
    directives: [
        NumericTextBox
    ]
})
// Component controller
class MyAppComponent {
    constructor() {
        this.number = 42;
    }
}

@Component({
    selector: 'kendo-numeric',
    bind: {
        value: "value"
    }
})
@Template({
    inline: '<input>'
})
class NumericTextBox {
    widget: kendo.ui.NumericTextBox;

    constructor(el: NgElement) {
        var input = el.domElement.shadowRoot.querySelector("input");

        this.widget = new kendo.ui.NumericTextBox(input);
    }

    get value():Number {
        return this.widget.value();
    }

    set value(value) {
        this.widget.value(value);
    }
}

bootstrap(MyAppComponent);
