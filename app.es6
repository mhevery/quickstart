import {NgElement, Component, Template, bootstrap} from 'angular2/angular2';
import {EventEmitter} from 'angular2/src/core/annotations/di'
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
    
    onNumberChange(value) {
      this.number = value;
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

    constructor(el: NgElement, @EventEmitter('change') fireChange:Function) {
        // We very much frown upon this, a better solution is in the works.
        var input = el.domElement.firstChild;

        this.widget = new kendo.ui.NumericTextBox(input);
        this.widget.bind('spin', function() {
          fireChange({value: this.value()});
        });
    }

    get value():Number {
        return this.widget.value();
    }

    set value(value) {
        this.widget.value(value);
    }
}

bootstrap(MyAppComponent);
