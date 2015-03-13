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

    constructor(el: NgElement, @EventEmitter('change') onChange) {
        // This NgElement is going to change, not sure how yet. (so this is frowned upon)
        var input = el.domElement.shadowRoot.querySelector("input");
        // looks like you are taking controll oven the DOM here. Our long term plan is to have
        // a special DOM awere component which would allow you to do this. For now this is fine.
        this.widget = new kendo.ui.NumericTextBox(input);
        // You need to register on change event from the Kendo UI and forward it to the outside world.
        this.widget.addEventListener('change/keyup/????', (event) {
            // create some kind of event object. I am cheating and sending this.
            onChange(this);
        })
    }

    get value():Number {
        return this.widget.value();
    }

    set value(value) {
        this.widget.value(value);
    }
}

bootstrap(MyAppComponent);
