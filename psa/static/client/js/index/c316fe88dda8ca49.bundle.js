/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/button/button.js":
/*!*****************************************!*\
  !*** ./src/components/button/button.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Button": function() { return /* binding */ Button; },
/* harmony export */   "ButtonIcon": function() { return /* binding */ ButtonIcon; },
/* harmony export */   "ButtonText": function() { return /* binding */ ButtonText; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* eslint-disable max-classes-per-file */

/**
 * @vo0doO
 * @interface(Button)
 * TODO: Observerd attr -> handleChangeAttributes
 * TODO: Sync property values in attributes and DOM
 **/

class Button extends HTMLButtonElement {
  static get observedAttributes() {
    return getRootProps(root);
  }

  static get elements() {
    return {
      ARROW: 'js-button-icon__arrow_color_gray',
      TEXT: 'js-button-text'
    };
  }

  static get events() {
    return {
      CLICK_ARROW: 'click.arrow-button',
      CLICK_TEXT_RESET: 'click.clear-button',
      CLICK_TEXT_ACCEPT: 'click.confirm-button',
      TOGGLE_TEXT_RESET: ""
    };
  }

  constructor() {
    super();
  }

  connectedCallBack() {}

  disconnectedCallBack() {}

  attributesChangedCallback(element, oldValue, newValue) {
    console.info(element, oldValue, newValue);
  }

}
class ButtonIcon extends Button {
  constructor() {
    super();
  }

}
class ButtonText extends Button {
  constructor() {
    super();
  }

}
window.customElements.define('toxin-button', Button, {
  extends: 'button'
});
window.customElements.define('button-icon', ButtonIcon, {
  extends: 'button'
});
window.customElements.define('button-text', ButtonText, {
  extends: 'button'
});

function getRootProps() {
  return ['class', 'aria-role', 'tabindex', 'hidden', 'disabled', 'value', 'innerText', 'outerText', 'accessKey', 'lang', 'title', 'translate', 'offsetHeight', 'offsetLeft', 'offsetParent', 'offsetTop', 'offsetWidth', 'form', 'formAction', 'formEnctype', 'formMethod', 'formNoValidate', 'formTarget', 'labels', 'name', 'type', 'validationMessage', 'validity', 'willValidate'];
}

/***/ }),

/***/ "./src/components/counter/counter.js":
/*!*******************************************!*\
  !*** ./src/components/counter/counter.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Counter": function() { return /* binding */ Counter; }
/* harmony export */ });
const $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

const {
  words,
  wordOfNum,
  setDisabled,
  removeDisabled,
  sleep
} = __webpack_require__(/*! ../../utils/js/index */ "./src/utils/js/index.js");

class Counter extends HTMLElement {
  static get elements() {
    return {
      ROOT: 'js-counter',
      INPUT: 'js-counter__input',
      HIDDEN: 'js-counter__input_hidden',
      INCREMENT: 'js-counter__increment-button',
      DECREMENT: 'js-counter__decrement-button'
    };
  }

  static get events() {
    return {
      CHANGE_ROOT_TITLE: 'change:counter:root.title',
      CHANGE_ROOT_VALUE: 'change:counter:root.value',
      CHANGE_INPUT_VALUE: 'change:counter:input.value',
      CLICK_INCREMENT_BUTTON: 'click.counter.increment-button',
      CLICK_DECREMENT_BUTTON: 'click.counter.decrement-button',
      CHANGE_INCREMENT_BUTTON_STATE: 'change:counter:increment-button.state',
      CHANGE_DECREMENT_BUTTON_STATE: 'change:counter:decrement-button.state'
    };
  }

  static get observedAttributes() {
    return ['value'];
  }

  constructor() {
    super();
    this.root = $(`.js-counter#${this.id}`);
    this.input = $(`.js-counter__input_hidden#${this.id}`);
    this.decrementButton = $(`.js-counter__decrement-button#${this.id}`);
    this.incrementButton = $(`.js-counter__increment-button#${this.id}`);
    this.connectedCallback = this.connectedCallback.bind(this);
    this.disconnectedCallback = this.disconnectedCallback.bind(this);
    this.inputEvents = this.inputEvents.bind(this);
    this.decrementButtonEvents = this.decrementButtonEvents.bind(this);
    this.incrementButtonEvents = this.incrementButtonEvents.bind(this);
    this.attributeChangedCallback = this.attributeChangedCallback.bind(this);
    this.handleClickButton = this.handleClickButton.bind(this);
    this.handleChangeRootValue = this.handleChangeRootValue.bind(this);
    this.handleChangeInputValue = this.handleChangeInputValue.bind(this);
    this.handleChangeButtonState = this.handleChangeButtonState.bind(this);
    this.inputObserver = new MutationObserver(this.inputObserverCallback);
  }

  connectedCallback() {
    this.inputObserve();
    this.inputEvents();
    this.decrementButtonEvents();
    this.incrementButtonEvents();
  }

  disconnectedCallback() {
    this.inputObserver.takeRecords();
    this.input.off(Counter.events.CHANGE_INPUT_VALUE);
    this.decrementButton.off(Counter.events.CHANGE_DECREMENT_BUTTON_STATE);
    this.incrementButton.off(Counter.events.CHANGE_INCREMENT_BUTTON_STATE);
    this.incrementButton.off(Counter.events.CLICK_INCREMENT_BUTTON);
    this.decrementButton.off(Counter.events.CLICK_DECREMENT_BUTTON);
  }

  attributeChangedCallback(element, oldValue, newValue) {
    const oldV = parseInt(oldValue, 10);
    const newV = parseInt(newValue, 10);

    if (oldV === newV && newV < 0) {
      return;
    }

    this.handleChangeRootValue(event, {
      value: newV,
      id: this.getAttribute('name')
    });
  }

  inputObserve() {
    // eslint-disable-next-line array-callback-return
    this.input.get().map(node => {
      this.inputObserver.observe(node, this.inputObserverConfig);
    });
  }

  get inputObserverConfig() {
    return {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: Counter.observedAttributes
    };
  }

  inputObserverCallback(mutations) {
    mutations.forEach(mutation => {
      if (mutation.type === 'attributes') {
        const {
          oldValue
        } = mutation;
        const {
          value
        } = mutation.target;

        if (value !== oldValue) {
          $(mutation.target).trigger(Counter.events.CHANGE_INPUT_VALUE, {
            value: mutation.target.value
          });
        }
      }
    });
  }

  inputEvents() {
    this.input.on({
      'change:counter:input.value': this.handleChangeInputValue
    });
  }

  incrementButtonEvents() {
    this.incrementButton.on({
      'click.counter.increment-button': this.handleClickButton,
      'change:counter:increment-button.state': this.handleChangeButtonState
    });
  }

  decrementButtonEvents() {
    this.decrementButton.on({
      'click.counter.decrement-button': this.handleClickButton,
      'change:counter:decrement-button.state': this.handleChangeButtonState
    });
  }

  handleChangeInputValue(event, data) {
    const {
      input,
      root
    } = this;

    if (event.target !== this.input.get(0)) {
      throw new Error(`Ошибка обработчика события ${event}`);
    }

    const incr = this.incrementButton;
    const decr = this.decrementButton;
    root.attr('value', data.value);
    incr.triggerHandler(Counter.events.CHANGE_INCREMENT_BUTTON_STATE, {
      input,
      incr,
      decr
    });
    decr.triggerHandler(Counter.events.CHANGE_DECREMENT_BUTTON_STATE, {
      input,
      incr,
      decr
    });
  }

  handleChangeRootValue(event, data) {
    const title = wordOfNum(data.value, words[data.id]);
    this.root.attr('title', title);
    this.root.trigger(Counter.events.CHANGE_ROOT_VALUE);
  }

  handleChangeButtonState(event, data) {
    const val = parseInt(data.input.val(), 10);
    const max = parseInt(data.input.attr('max'), 10);
    const min = parseInt(data.input.attr('min'), 10);

    if (val < max && val >= min) {
      removeDisabled(data.incr);
    }

    if (val >= max) {
      setDisabled(data.incr);
    }

    if (val > min) {
      removeDisabled(data.decr);
    }

    if (val <= min) {
      setDisabled(data.decr);
    }
  }

  async handleClickButton(event) {
    const element = event.target;
    const cl = element.className;
    const input = element.nextSibling || element.previousSibling;

    try {
      switch (cl) {
        case Counter.elements.INCREMENT:
          {
            await input.stepUp();
            await $(input).attr('value', input.value);
            Promise.resolve();
            break;
          }

        case Counter.elements.DECREMENT:
          {
            await input.stepDown();
            await $(input).attr('value', input.value);
            Promise.resolve();
            break;
          }

        default:
          {
            throw new Error(`Ошибка обработки события: ${event}`);
          }
      }
    } catch (error) {
      throw new Error(`Ошибка обработки события: ${element}, ${event.offsetX}, ${event.offsetY}`);
    }
  }

}

window.customElements.define('guests-counter', Counter);


/***/ }),

/***/ "./src/components/dropdown/dropdown.js":
/*!*********************************************!*\
  !*** ./src/components/dropdown/dropdown.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DropDown": function() { return /* binding */ DropDown; },
/* harmony export */   "DropDownWithButtons": function() { return /* binding */ DropDownWithButtons; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _button_button_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../button/button.js */ "./src/components/button/button.js");
/* harmony import */ var _counter_counter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../counter/counter */ "./src/components/counter/counter.js");
/* harmony import */ var _utils_js_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/js/index */ "./src/utils/js/index.js");





class DropDown extends HTMLElement {
  static get elements() {
    return {
      ROOT: 'js-dropdown',
      INPUT: 'js-dropdown__input',
      ITEMS: 'js-dropdown__items',
      ROOT_OPENED: `js-dropdown_opened`,
      INPUT_OPENED: `js-dropdown__input_opened`,
      ITEMS_OPENED: `js-dropdown__items_opened`
    };
  }

  static get events() {
    return {
      CLICK_INPUT: 'click.dropdown.input',
      CHANGE_ROOT_VALUE: 'change:dropdown:root:value',
      CHANGE_INPUT_VALUE: 'change:dropdown:input:value',
      TOGGLE_ROOT_OPENED: 'toggle:dropdown:root:opened',
      TOGGLE_ITEMS_OPENED: 'toggle:dropdown:items:opened',
      TOGGLE_INPUT_OPENED: 'toggle:dropdown:input:opened',
      CHANGE_ROOT_DATA_VALUE: 'change:dropdown:root:value',
      CHANGE_ROOT_PLACEHOLDER: 'change:dropdown:root:placeholder',
      CHANGE_INPUT_PLACEHOLDER: 'change:dropdown:input:placeholder'
    };
  }

  static get observedAttributes() {
    return ['value', 'class', 'aria-expanded', 'placeholder', 'data-values'];
  }

  constructor() {
    super();
    const template = document.getElementById(this.nodeName);
    const templateContent = template.content;
    this.attachShadow({
      mode: 'open'
    }).appendChild(templateContent.cloneNode(true));
    this.elements = DropDown.elements;
    this.root = jquery__WEBPACK_IMPORTED_MODULE_0___default()(`.${DropDown.elements.ROOT}#${this.id}`);
    this.items = this.root.find(`.${DropDown.elements.ITEMS}`);
    this.input = this.root.find(`.${DropDown.elements.INPUT}`);
    this.arrowButton = this.root.find(`.${_button_button_js__WEBPACK_IMPORTED_MODULE_1__.Button.elements.ARROW}`);
    this.inputEvents = this.inputEvents.bind(this);
    this.itemsEvents = this.itemsEvents.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleOpened = this.toggleOpened.bind(this);
    this.arrowButtonEvents = this.arrowButtonEvents.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.rootEvents = this.rootEvents.bind(this);
  }

  connectedCallback() {
    this.itemsEvents();
    this.inputEvents();
    this.arrowButtonEvents();
    this.rootEvents();
  }

  disconnectedCallback() {
    this.input.off('click.dropdown.input');
    this.input.off('toggle:dropdown:input:opened');
    this.items.off('toggle:dropdown:items:opened');
    this.arrowButton.off('click.arrow-button.dropdown');
    this.arrowButton.off('toggle.dropdown.arrow-button.opened');
  }

  getGuestsInputString() {
    let guests = 0;
    let babys = 0;
    const elements = this.root.find(`.${_counter_counter__WEBPACK_IMPORTED_MODULE_2__.Counter.elements.ROOT}`);
    elements.each(index => {
      const id = jquery__WEBPACK_IMPORTED_MODULE_0___default()(elements[index]).attr('name');
      let value = jquery__WEBPACK_IMPORTED_MODULE_0___default()(elements[index]).attr('value');

      if (id === "взрослые") {
        guests += parseInt(value, 10);
      }

      if (id === "дети") {
        guests += parseInt(value, 10);
      }

      if (id === "младенцы") {
        babys += parseInt(value, 10);
      }
    });

    if (guests <= 0) {
      return 'Сколько гостей';
    }

    if (guests > 0 && babys > 0) {
      const stringGuests = (0,_utils_js_index__WEBPACK_IMPORTED_MODULE_3__.wordOfNum)(guests, _utils_js_index__WEBPACK_IMPORTED_MODULE_3__.words["гости"]);
      const stringBabys = (0,_utils_js_index__WEBPACK_IMPORTED_MODULE_3__.wordOfNum)(babys, _utils_js_index__WEBPACK_IMPORTED_MODULE_3__.words["младенцы"]);
      return `${guests} ${stringGuests}, ${babys} ${stringBabys}`;
    }

    if (guests > 0 && babys <= 0) {
      const stringGuests = (0,_utils_js_index__WEBPACK_IMPORTED_MODULE_3__.wordOfNum)(guests, _utils_js_index__WEBPACK_IMPORTED_MODULE_3__.words["гости"]);
      return `${guests} ${stringGuests}`;
    }
  }

  setInputString(event) {
    let resultString = "";
    const node = event.target.nodeName;

    switch (node) {
      case 'GUESTS-COUNTER':
        resultString = this.getGuestsInputString();
        this.input.attr('value', resultString);
        break;

      default:
        break;
    }
  }

  rootEvents() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.root).on(_counter_counter__WEBPACK_IMPORTED_MODULE_2__.Counter.events.CHANGE_ROOT_VALUE, `.${_counter_counter__WEBPACK_IMPORTED_MODULE_2__.Counter.elements.ROOT}`, event => {
      const target = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.target);
      console.log(`Value: ${target.attr('value')} \n Title: ${target.attr('title')}`);
      this.setInputString(event);
    });
  }

  attributeChangedCallBack(value, oldValue, newValue) {
    console.log(`Dropdown attribute changed: \n Element: ${value} \n oldvalue ${oldValue} \n newValue ${newValue}`);
  }

  ariaExpandedToggle(elem) {
    const value = elem.attr('aria-expanded');

    switch (value) {
      case 'false':
        elem.attr('aria-expanded', 'true');
        break;

      case 'true':
        elem.attr('aria-expanded', 'false');
        break;

      case 'undefined':
        elem.attr('aria-expanded', 'true');
        break;

      default:
        break;
    }
  }

  handleClick() {
    this.items.trigger('toggle:dropdown:items:opened');
    this.input.trigger('toggle:dropdown:input:opened');
    this.arrowButton.trigger('toggle.dropdown.arrow-button.opened');
  }

  handleKeyPress(event) {
    event.preventDefault();
    const key = event.which;

    switch (key) {
      case 32:
        this.items.trigger('toggle:dropdown:items:opened');
        this.input.trigger('toggle:dropdown:input:opened');
        this.arrowButton.trigger('toggle.dropdown.arrow-button.opened');
        break;

      default:
        break;
    }
  }

  toggleOpened(event) {
    const elem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.target);
    const cls = elem.attr('class').split(' ');

    switch ((cls[1] || cls[0] || cls[1] && cls[0]).replace('_opened', '')) {
      case 'js-dropdown__items':
        elem.toggleClass('js-dropdown__items_opened');
        break;

      case 'js-dropdown__input':
        elem.toggleClass('js-dropdown__input_opened');
        this.ariaExpandedToggle(elem);
        break;

      case 'js-button-icon__arrow_color_gray':
        elem.get(0).toggleAttribute("pressed");
        break;

      default:
        break;
    }
  }

  itemsEvents() {
    this.items.on({
      'toggle:dropdown:items:opened': this.toggleOpened
    });
  }

  inputEvents() {
    this.input.on({
      keypress: this.handleKeyPress,
      'click.dropdown.input': this.handleClick,
      'toggle:dropdown:input:opened': this.toggleOpened
    });
    this.input.on('change', 'js-counter__input_hidden', function () {
      console.log('im changed');
    });
  }

  arrowButtonEvents() {
    this.arrowButton.on({
      'click.arrow-button.dropdown': this.handleClick,
      'toggle.dropdown.arrow-button.opened': this.toggleOpened
    });
  }

}

class DropDownWithButtons extends DropDown {
  static get elements() {
    return {
      ROOT: 'drop-down-with-buttons',
      FOOTER_BUTTONS: 'js-dropdown__footer-buttons',
      RESET_BUTTON: 'js-dropdown__reset-button',
      ACCEPT_BUTTON: 'js-dropdown__accept-button'
    };
  }

  static get events() {
    return {
      FOOTER_BUTTONS_INIT: 'init:dropdown:footer-buttons',
      FOOTER_BUTTONS_TOGGLE_DISABLED: 'toggle:disabled:dropdown:footer-buttons',
      RESET_BUTTON_TOGGLE_DISABLED: 'toggle:disabled:dropdown:reset-button',
      RESET_BUTTON_CLICK: 'click.dropdown:reset-button',
      ACCEPT_BUTTON_CLICK: 'click.dropdown:accept-button'
    };
  }

  constructor() {
    super();
    super.rootEvents(); // this.root = $( DropDownWithButtons.elements.ROOT )

    this.footerButtons = this.root.find(`.${DropDownWithButtons.elements.FOOTER_BUTTONS}`);
    this.resetButton = this.root.find(`.${DropDownWithButtons.elements.RESET_BUTTON}`);
    this.acceptButton = this.root.find(`.${DropDownWithButtons.elements.ACCEPT_BUTTON}`);
    this.myRootEvents = this.myRootEvents.bind(this);
    this.footerButtonsEvents = this.footerButtonsEvents.bind(this);
    this.resetButtonEvents = this.resetButtonEvents.bind(this);
    this.acceptButtonEvents = this.acceptButtonEvents.bind(this);
  }

  connectedCallback() {
    super.itemsEvents();
    super.inputEvents();
    super.arrowButtonEvents();
    this.myRootEvents();
    this.footerButtonsEvents();
    this.footerButtons.trigger(DropDownWithButtons.events.FOOTER_BUTTONS_INIT);
    this.resetButtonEvents();
    this.resetButton.trigger(DropDownWithButtons.events.RESET_BUTTON_TOGGLE_DISABLED);
    this.acceptButtonEvents();
  }

  myRootEvents() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.root).on(DropDown.events.TOGGLE_ITEMS_OPENED, `.${DropDown.elements.ITEMS}`, event => {
      this.footerButtons.trigger(DropDownWithButtons.events.FOOTER_BUTTONS_TOGGLE_DISABLED);
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.root).on(_counter_counter__WEBPACK_IMPORTED_MODULE_2__.Counter.events.CHANGE_ROOT_VALUE, `.${_counter_counter__WEBPACK_IMPORTED_MODULE_2__.Counter.elements.ROOT}`, event => {
      this.resetButton.trigger(DropDownWithButtons.events.RESET_BUTTON_TOGGLE_DISABLED);
    });
  }

  footerButtonsEvents() {
    this.footerButtons.on(DropDownWithButtons.events.FOOTER_BUTTONS_INIT, event => {
      if (this.footerButtons.attr('disabled')) {
        return;
      }

      this.footerButtons.get(0).setAttribute("disabled", "");
    });
    this.footerButtons.on(DropDownWithButtons.events.FOOTER_BUTTONS_TOGGLE_DISABLED, event => {
      if (this.footerButtons.get(0).getAttribute('disabled') != null) {
        this.footerButtons.get(0).removeAttribute("disabled");
      } else {
        this.footerButtons.get(0).setAttribute("disabled", "");
      }
    });
  }

  resetButtonEvents() {
    this.resetButton.on(DropDownWithButtons.events.RESET_BUTTON_TOGGLE_DISABLED, event => {
      const input = this.input;
      const resetButton = this.resetButton.get(0);

      if (input.val() === 'Сколько гостей') {
        if (resetButton.getAttribute('disabled') != null) {
          return;
        }

        resetButton.setAttribute("disabled", "");
        return;
      }

      resetButton.removeAttribute("disabled");
    });
    this.resetButton.on(DropDownWithButtons.events.RESET_BUTTON_CLICK, event => {
      const counters = this.root.find(`.${_counter_counter__WEBPACK_IMPORTED_MODULE_2__.Counter.elements.HIDDEN}`);
      counters.each(function () {
        var elem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this);
        this.value = 1;
        elem.attr('value', 1);
        elem.trigger(_counter_counter__WEBPACK_IMPORTED_MODULE_2__.Counter.events.CHANGE_INPUT_VALUE, {
          value: 1
        });
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.previousSibling).trigger(_counter_counter__WEBPACK_IMPORTED_MODULE_2__.Counter.events.CLICK_DECREMENT_BUTTON);
      });
      this.resetButton.trigger(DropDownWithButtons.events.RESET_BUTTON_TOGGLE_DISABLED);
    });
  }

  acceptButtonEvents() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.acceptButton.find('button')).on(DropDownWithButtons.events.ACCEPT_BUTTON_CLICK, () => {
      this.items.trigger('toggle:dropdown:items:opened');
      this.input.trigger('toggle:dropdown:input:opened');
      this.arrowButton.trigger('toggle.dropdown.arrow-button.opened');
    });
  }

}

window.customElements.define('drop-down', DropDown);
window.customElements.define('drop-down-with-buttons', DropDownWithButtons);


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.scss */ "./src/index.scss");
/* harmony import */ var _components_dropdown_dropdown_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/dropdown/dropdown.js */ "./src/components/dropdown/dropdown.js");
/* harmony import */ var _components_counter_counter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/counter/counter.js */ "./src/components/counter/counter.js");
/* harmony import */ var _components_button_button_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/button/button.js */ "./src/components/button/button.js");





/***/ }),

/***/ "./src/utils/js/disabled.js":
/*!**********************************!*\
  !*** ./src/utils/js/disabled.js ***!
  \**********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

function getDisabled(element) {
  return $(element).attr('disabled');
}

function removeDisabled(element) {
  const disabled = getDisabled(element);

  if (disabled !== 'disabled') {
    return;
  }

  element.removeAttr('disabled');
}

function setDisabled(element) {
  const disabled = getDisabled(element);

  if (disabled === 'disabled') {
    return;
  }

  $(element).attr('disabled', '');
}

module.exports = {
  getDisabled,
  removeDisabled,
  setDisabled
};

/***/ }),

/***/ "./src/utils/js/domReady.js":
/*!**********************************!*\
  !*** ./src/utils/js/domReady.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "domReady": function() { return /* binding */ domReady; }
/* harmony export */ });
/* eslint-disable no-unused-expressions */

/* eslint-disable import/prefer-default-export */
async function domReady(fn1, fn2) {
  try {
    document.addEventListener('readystatechange', event => {
      if (event.target.readyState === 'interactive') {
        fn1;
      } else if (event.target.readyState === 'complete') {
        fn2;
      }
    });
  } catch (error) {
    throw new Error('Document not loaded');
  }
}

/***/ }),

/***/ "./src/utils/js/index.js":
/*!*******************************!*\
  !*** ./src/utils/js/index.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "domReady": function() { return /* reexport safe */ _domReady__WEBPACK_IMPORTED_MODULE_0__.domReady; },
/* harmony export */   "getDisabled": function() { return /* reexport safe */ _disabled__WEBPACK_IMPORTED_MODULE_3__.getDisabled; },
/* harmony export */   "removeDisabled": function() { return /* reexport safe */ _disabled__WEBPACK_IMPORTED_MODULE_3__.removeDisabled; },
/* harmony export */   "setDisabled": function() { return /* reexport safe */ _disabled__WEBPACK_IMPORTED_MODULE_3__.setDisabled; },
/* harmony export */   "sleep": function() { return /* reexport safe */ _sleep__WEBPACK_IMPORTED_MODULE_1__.sleep; },
/* harmony export */   "wordOfNum": function() { return /* reexport safe */ _morph__WEBPACK_IMPORTED_MODULE_2__.wordOfNum; },
/* harmony export */   "words": function() { return /* reexport safe */ _morph__WEBPACK_IMPORTED_MODULE_2__.words; }
/* harmony export */ });
/* harmony import */ var _domReady__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domReady */ "./src/utils/js/domReady.js");
/* harmony import */ var _sleep__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sleep */ "./src/utils/js/sleep.js");
/* harmony import */ var _morph__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./morph */ "./src/utils/js/morph.js");
/* harmony import */ var _disabled__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./disabled */ "./src/utils/js/disabled.js");
/* harmony import */ var _disabled__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_disabled__WEBPACK_IMPORTED_MODULE_3__);






/***/ }),

/***/ "./src/utils/js/morph.js":
/*!*******************************!*\
  !*** ./src/utils/js/morph.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "wordOfNum": function() { return /* binding */ wordOfNum; },
/* harmony export */   "words": function() { return /* binding */ words; }
/* harmony export */ });
function wordOfNum(number, words) {
  const cases = [2, 0, 1, 1, 1, 2];
  return words[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
}
const words = {
  младенцы: ['младенец', 'младенца', 'младенцев'],
  взрослые: ['гости', 'гости', 'гости'],
  дети: ['гости', 'гости', 'гости'],
  гости: ['гость', 'гостя', 'гостей'],
  спальни: ['спальня', 'спальни', 'спален'],
  комнаты: ['комната', 'комнаты', 'комнат'],
  вынные: ['ванна', 'ванны', 'ванн'],
  кровати: ['кровать', 'кровати', 'кроватей']
};

/***/ }),

/***/ "./src/utils/js/sleep.js":
/*!*******************************!*\
  !*** ./src/utils/js/sleep.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sleep": function() { return /* binding */ sleep; }
/* harmony export */ });
/* eslint-disable import/prefer-default-export */

/* eslint-disable no-promise-executor-return */
async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunktoxin"] = self["webpackChunktoxin"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["vendors-node_modules_intern_browser_intern_js-node_modules_jquery_dist_jquery_js"], function() { return __webpack_require__("./node_modules/intern/browser/intern.js"); })
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_intern_browser_intern_js-node_modules_jquery_dist_jquery_js"], function() { return __webpack_require__("./src/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvaW5kZXgvYzMxNmZlODhkZGE4Y2E0OS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTyxNQUFNQyxNQUFOLFNBQXFCQyxpQkFBckIsQ0FBdUM7RUFDaEIsV0FBbEJDLGtCQUFrQixHQUFHO0lBQy9CLE9BQU9DLFlBQVksQ0FBRUMsSUFBRixDQUFuQjtFQUNBOztFQUVrQixXQUFSQyxRQUFRLEdBQUk7SUFDdEIsT0FBTztNQUNOQyxLQUFLLEVBQUUsa0NBREQ7TUFFTkMsSUFBSSxFQUFFO0lBRkEsQ0FBUDtFQUlBOztFQUVnQixXQUFOQyxNQUFNLEdBQUc7SUFDbkIsT0FBTztNQUNOQyxXQUFXLEVBQUUsb0JBRFA7TUFFTkMsZ0JBQWdCLEVBQUUsb0JBRlo7TUFHTkMsaUJBQWlCLEVBQUUsc0JBSGI7TUFJTkMsaUJBQWlCLEVBQUU7SUFKYixDQUFQO0VBTUE7O0VBRURDLFdBQVcsR0FBRztJQUNiO0VBQ0E7O0VBRURDLGlCQUFpQixHQUFJLENBQ3BCOztFQUVEQyxvQkFBb0IsR0FBRyxDQUV0Qjs7RUFFREMseUJBQXlCLENBQUNDLE9BQUQsRUFBVUMsUUFBVixFQUFvQkMsUUFBcEIsRUFBOEI7SUFDdERDLE9BQU8sQ0FBQ0MsSUFBUixDQUFjSixPQUFkLEVBQXVCQyxRQUF2QixFQUFpQ0MsUUFBakM7RUFDQTs7QUFsQzRDO0FBc0N2QyxNQUFNRyxVQUFOLFNBQXlCdEIsTUFBekIsQ0FBZ0M7RUFDdENhLFdBQVcsR0FBRztJQUNiO0VBQ0E7O0FBSHFDO0FBTWhDLE1BQU1VLFVBQU4sU0FBeUJ2QixNQUF6QixDQUFnQztFQUN0Q2EsV0FBVyxHQUFJO0lBQ2Q7RUFDQTs7QUFIcUM7QUFNdkNXLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsTUFBdEIsQ0FBOEIsY0FBOUIsRUFBOEMxQixNQUE5QyxFQUFzRDtFQUFFMkIsT0FBTyxFQUFFO0FBQVgsQ0FBdEQ7QUFDQUgsTUFBTSxDQUFDQyxjQUFQLENBQXNCQyxNQUF0QixDQUE4QixhQUE5QixFQUE2Q0osVUFBN0MsRUFBeUQ7RUFBRUssT0FBTyxFQUFFO0FBQVgsQ0FBekQ7QUFDQUgsTUFBTSxDQUFDQyxjQUFQLENBQXNCQyxNQUF0QixDQUE4QixhQUE5QixFQUE2Q0gsVUFBN0MsRUFBeUQ7RUFBRUksT0FBTyxFQUFFO0FBQVgsQ0FBekQ7O0FBRUEsU0FBU3hCLFlBQVQsR0FBeUI7RUFDeEIsT0FBTyxDQUNOLE9BRE0sRUFFTixXQUZNLEVBR04sVUFITSxFQUlOLFFBSk0sRUFLTixVQUxNLEVBTU4sT0FOTSxFQU9OLFdBUE0sRUFRTixXQVJNLEVBU04sV0FUTSxFQVVOLE1BVk0sRUFXTixPQVhNLEVBWU4sV0FaTSxFQWFOLGNBYk0sRUFjTixZQWRNLEVBZU4sY0FmTSxFQWdCTixXQWhCTSxFQWlCTixhQWpCTSxFQWtCTixNQWxCTSxFQW1CTixZQW5CTSxFQW9CTixhQXBCTSxFQXFCTixZQXJCTSxFQXNCTixnQkF0Qk0sRUF1Qk4sWUF2Qk0sRUF3Qk4sUUF4Qk0sRUF5Qk4sTUF6Qk0sRUEwQk4sTUExQk0sRUEyQk4sbUJBM0JNLEVBNEJOLFVBNUJNLEVBNkJOLGNBN0JNLENBQVA7QUErQkE7Ozs7Ozs7Ozs7Ozs7OztBQ2hHRCxNQUFNSixDQUFDLEdBQUc2QixtQkFBTyxDQUFFLG9EQUFGLENBQWpCOztBQUNBLE1BQU07RUFBRUMsS0FBRjtFQUFTQyxTQUFUO0VBQW9CQyxXQUFwQjtFQUFpQ0MsY0FBakM7RUFBaURDO0FBQWpELElBQTJETCxtQkFBTyxDQUFFLHFEQUFGLENBQXhFOztBQUdBLE1BQU1NLE9BQU4sU0FBc0JDLFdBQXRCLENBQWtDO0VBQ2QsV0FBUjlCLFFBQVEsR0FBSTtJQUN0QixPQUFPO01BQ04rQixJQUFJLEVBQUUsWUFEQTtNQUVOQyxLQUFLLEVBQUUsbUJBRkQ7TUFHTkMsTUFBTSxFQUFFLDBCQUhGO01BSU5DLFNBQVMsRUFBRSw4QkFKTDtNQUtOQyxTQUFTLEVBQUU7SUFMTCxDQUFQO0VBT0E7O0VBRWdCLFdBQU5oQyxNQUFNLEdBQUc7SUFDbkIsT0FBTztNQUNOaUMsaUJBQWlCLEVBQUUsMkJBRGI7TUFFTkMsaUJBQWlCLEVBQUUsMkJBRmI7TUFHTkMsa0JBQWtCLEVBQUUsNEJBSGQ7TUFJTkMsc0JBQXNCLEVBQUUsZ0NBSmxCO01BS05DLHNCQUFzQixFQUFFLGdDQUxsQjtNQU1OQyw2QkFBNkIsRUFBRSx1Q0FOekI7TUFPTkMsNkJBQTZCLEVBQUU7SUFQekIsQ0FBUDtFQVNBOztFQUU0QixXQUFsQjdDLGtCQUFrQixHQUFHO0lBQy9CLE9BQU8sQ0FBQyxPQUFELENBQVA7RUFDQTs7RUFFRFcsV0FBVyxHQUFHO0lBQ2I7SUFFQSxLQUFLVCxJQUFMLEdBQVlMLENBQUMsQ0FBRSxlQUFjLEtBQUtpRCxFQUFHLEVBQXhCLENBQWI7SUFDQSxLQUFLQyxLQUFMLEdBQWFsRCxDQUFDLENBQUUsNkJBQTRCLEtBQUtpRCxFQUFHLEVBQXRDLENBQWQ7SUFDQSxLQUFLRSxlQUFMLEdBQXVCbkQsQ0FBQyxDQUFFLGlDQUFnQyxLQUFLaUQsRUFBRyxFQUExQyxDQUF4QjtJQUNBLEtBQUtHLGVBQUwsR0FBdUJwRCxDQUFDLENBQUUsaUNBQWdDLEtBQUtpRCxFQUFHLEVBQTFDLENBQXhCO0lBRUEsS0FBS0ksaUJBQUwsR0FBeUIsS0FBS0EsaUJBQUwsQ0FBdUJDLElBQXZCLENBQTRCLElBQTVCLENBQXpCO0lBQ0EsS0FBS0Msb0JBQUwsR0FBNEIsS0FBS0Esb0JBQUwsQ0FBMEJELElBQTFCLENBQStCLElBQS9CLENBQTVCO0lBRUEsS0FBS0UsV0FBTCxHQUFtQixLQUFLQSxXQUFMLENBQWlCRixJQUFqQixDQUFzQixJQUF0QixDQUFuQjtJQUNBLEtBQUtHLHFCQUFMLEdBQTZCLEtBQUtBLHFCQUFMLENBQTJCSCxJQUEzQixDQUFnQyxJQUFoQyxDQUE3QjtJQUNBLEtBQUtJLHFCQUFMLEdBQTZCLEtBQUtBLHFCQUFMLENBQTJCSixJQUEzQixDQUFnQyxJQUFoQyxDQUE3QjtJQUVBLEtBQUtLLHdCQUFMLEdBQWdDLEtBQUtBLHdCQUFMLENBQThCTCxJQUE5QixDQUFtQyxJQUFuQyxDQUFoQztJQUNBLEtBQUtNLGlCQUFMLEdBQXlCLEtBQUtBLGlCQUFMLENBQXVCTixJQUF2QixDQUE0QixJQUE1QixDQUF6QjtJQUNBLEtBQUtPLHFCQUFMLEdBQTZCLEtBQUtBLHFCQUFMLENBQTJCUCxJQUEzQixDQUFnQyxJQUFoQyxDQUE3QjtJQUNBLEtBQUtRLHNCQUFMLEdBQThCLEtBQUtBLHNCQUFMLENBQTRCUixJQUE1QixDQUFpQyxJQUFqQyxDQUE5QjtJQUNBLEtBQUtTLHVCQUFMLEdBQStCLEtBQUtBLHVCQUFMLENBQTZCVCxJQUE3QixDQUFrQyxJQUFsQyxDQUEvQjtJQUNBLEtBQUtVLGFBQUwsR0FBcUIsSUFBSUMsZ0JBQUosQ0FBcUIsS0FBS0MscUJBQTFCLENBQXJCO0VBQ0E7O0VBRURiLGlCQUFpQixHQUFHO0lBQ25CLEtBQUtjLFlBQUw7SUFDQSxLQUFLWCxXQUFMO0lBQ0EsS0FBS0MscUJBQUw7SUFDQSxLQUFLQyxxQkFBTDtFQUNBOztFQUVESCxvQkFBb0IsR0FBRztJQUN0QixLQUFLUyxhQUFMLENBQW1CSSxXQUFuQjtJQUNBLEtBQUtsQixLQUFMLENBQVdtQixHQUFYLENBQWdCbEMsT0FBTyxDQUFDMUIsTUFBUixDQUFlbUMsa0JBQS9CO0lBQ0EsS0FBS08sZUFBTCxDQUFxQmtCLEdBQXJCLENBQTBCbEMsT0FBTyxDQUFDMUIsTUFBUixDQUFldUMsNkJBQXpDO0lBQ0EsS0FBS0ksZUFBTCxDQUFxQmlCLEdBQXJCLENBQTBCbEMsT0FBTyxDQUFDMUIsTUFBUixDQUFlc0MsNkJBQXpDO0lBQ0EsS0FBS0ssZUFBTCxDQUFxQmlCLEdBQXJCLENBQTBCbEMsT0FBTyxDQUFDMUIsTUFBUixDQUFlb0Msc0JBQXpDO0lBQ0EsS0FBS00sZUFBTCxDQUFxQmtCLEdBQXJCLENBQTBCbEMsT0FBTyxDQUFDMUIsTUFBUixDQUFlcUMsc0JBQXpDO0VBQ0E7O0VBRURhLHdCQUF3QixDQUFHekMsT0FBSCxFQUFZQyxRQUFaLEVBQXNCQyxRQUF0QixFQUFpQztJQUN4RCxNQUFNa0QsSUFBSSxHQUFHQyxRQUFRLENBQUNwRCxRQUFELEVBQVcsRUFBWCxDQUFyQjtJQUNBLE1BQU1xRCxJQUFJLEdBQUdELFFBQVEsQ0FBQ25ELFFBQUQsRUFBVyxFQUFYLENBQXJCOztJQUVBLElBQUlrRCxJQUFJLEtBQUtFLElBQVQsSUFBaUJBLElBQUksR0FBRyxDQUE1QixFQUErQjtNQUM5QjtJQUNBOztJQUVELEtBQUtYLHFCQUFMLENBQTRCWSxLQUE1QixFQUFtQztNQUFFQyxLQUFLLEVBQUVGLElBQVQ7TUFBZXZCLEVBQUUsRUFBRSxLQUFLMEIsWUFBTCxDQUFrQixNQUFsQjtJQUFuQixDQUFuQztFQUNBOztFQUVEUixZQUFZLEdBQUc7SUFDZDtJQUNBLEtBQUtqQixLQUFMLENBQVcwQixHQUFYLEdBQWlCQyxHQUFqQixDQUFzQkMsSUFBRCxJQUFVO01BQzlCLEtBQUtkLGFBQUwsQ0FBbUJlLE9BQW5CLENBQTJCRCxJQUEzQixFQUFpQyxLQUFLRSxtQkFBdEM7SUFDQSxDQUZEO0VBR0E7O0VBRXNCLElBQW5CQSxtQkFBbUIsR0FBSTtJQUMxQixPQUFPO01BQ05DLFVBQVUsRUFBRSxJQUROO01BRU5DLGlCQUFpQixFQUFFLElBRmI7TUFHTkMsZUFBZSxFQUFFaEQsT0FBTyxDQUFDaEM7SUFIbkIsQ0FBUDtFQUtBOztFQUVEK0QscUJBQXFCLENBQUdrQixTQUFILEVBQWU7SUFDbkNBLFNBQVMsQ0FBQ0MsT0FBVixDQUFtQkMsUUFBRCxJQUFjO01BQy9CLElBQUlBLFFBQVEsQ0FBQ0MsSUFBVCxLQUFrQixZQUF0QixFQUFvQztRQUNuQyxNQUFNO1VBQUVwRTtRQUFGLElBQWVtRSxRQUFyQjtRQUNBLE1BQU07VUFBRVo7UUFBRixJQUFZWSxRQUFRLENBQUNFLE1BQTNCOztRQUNBLElBQUlkLEtBQUssS0FBS3ZELFFBQWQsRUFBd0I7VUFDdkJuQixDQUFDLENBQUVzRixRQUFRLENBQUNFLE1BQVgsQ0FBRCxDQUFxQkMsT0FBckIsQ0FBOEJ0RCxPQUFPLENBQUMxQixNQUFSLENBQWVtQyxrQkFBN0MsRUFBaUU7WUFBRThCLEtBQUssRUFBRVksUUFBUSxDQUFDRSxNQUFULENBQWdCZDtVQUF6QixDQUFqRTtRQUNBO01BQ0Q7SUFDRCxDQVJEO0VBU0E7O0VBRURsQixXQUFXLEdBQUc7SUFDYixLQUFLTixLQUFMLENBQVd3QyxFQUFYLENBQWM7TUFDYiw4QkFBOEIsS0FBSzVCO0lBRHRCLENBQWQ7RUFHQTs7RUFFREoscUJBQXFCLEdBQUc7SUFDdkIsS0FBS04sZUFBTCxDQUFxQnNDLEVBQXJCLENBQXdCO01BQ3ZCLGtDQUFrQyxLQUFLOUIsaUJBRGhCO01BRXZCLHlDQUF5QyxLQUFLRztJQUZ2QixDQUF4QjtFQUlBOztFQUVETixxQkFBcUIsR0FBRztJQUN2QixLQUFLTixlQUFMLENBQXFCdUMsRUFBckIsQ0FBd0I7TUFDdkIsa0NBQWtDLEtBQUs5QixpQkFEaEI7TUFFdkIseUNBQXlDLEtBQUtHO0lBRnZCLENBQXhCO0VBSUE7O0VBRURELHNCQUFzQixDQUFHVyxLQUFILEVBQVVrQixJQUFWLEVBQWlCO0lBQ3RDLE1BQU07TUFBRXpDLEtBQUY7TUFBUzdDO0lBQVQsSUFBa0IsSUFBeEI7O0lBQ0EsSUFBSW9FLEtBQUssQ0FBQ2UsTUFBTixLQUFpQixLQUFLdEMsS0FBTCxDQUFXMEIsR0FBWCxDQUFnQixDQUFoQixDQUFyQixFQUEyQztNQUMxQyxNQUFNLElBQUlnQixLQUFKLENBQVcsOEJBQTZCbkIsS0FBTSxFQUE5QyxDQUFOO0lBQ0E7O0lBRUQsTUFBTW9CLElBQUksR0FBRyxLQUFLekMsZUFBbEI7SUFDQSxNQUFNMEMsSUFBSSxHQUFHLEtBQUszQyxlQUFsQjtJQUVBOUMsSUFBSSxDQUFDMEYsSUFBTCxDQUFXLE9BQVgsRUFBb0JKLElBQUksQ0FBQ2pCLEtBQXpCO0lBRUFtQixJQUFJLENBQUNHLGNBQUwsQ0FBcUI3RCxPQUFPLENBQUMxQixNQUFSLENBQWVzQyw2QkFBcEMsRUFBbUU7TUFDbEVHLEtBRGtFO01BRWxFMkMsSUFGa0U7TUFHbEVDO0lBSGtFLENBQW5FO0lBTUFBLElBQUksQ0FBQ0UsY0FBTCxDQUFxQjdELE9BQU8sQ0FBQzFCLE1BQVIsQ0FBZXVDLDZCQUFwQyxFQUFtRTtNQUNsRUUsS0FEa0U7TUFFbEUyQyxJQUZrRTtNQUdsRUM7SUFIa0UsQ0FBbkU7RUFLQTs7RUFFRGpDLHFCQUFxQixDQUFHWSxLQUFILEVBQVVrQixJQUFWLEVBQWlCO0lBQ3JDLE1BQU1NLEtBQUssR0FBR2xFLFNBQVMsQ0FBQzRELElBQUksQ0FBQ2pCLEtBQU4sRUFBYTVDLEtBQUssQ0FBQzZELElBQUksQ0FBQzFDLEVBQU4sQ0FBbEIsQ0FBdkI7SUFDQSxLQUFLNUMsSUFBTCxDQUFVMEYsSUFBVixDQUFnQixPQUFoQixFQUF5QkUsS0FBekI7SUFDQSxLQUFLNUYsSUFBTCxDQUFVb0YsT0FBVixDQUFtQnRELE9BQU8sQ0FBQzFCLE1BQVIsQ0FBZWtDLGlCQUFsQztFQUNBOztFQUVEb0IsdUJBQXVCLENBQUdVLEtBQUgsRUFBVWtCLElBQVYsRUFBaUI7SUFDdkMsTUFBTU8sR0FBRyxHQUFHM0IsUUFBUSxDQUFDb0IsSUFBSSxDQUFDekMsS0FBTCxDQUFXZ0QsR0FBWCxFQUFELEVBQW1CLEVBQW5CLENBQXBCO0lBQ0EsTUFBTUMsR0FBRyxHQUFHNUIsUUFBUSxDQUFDb0IsSUFBSSxDQUFDekMsS0FBTCxDQUFXNkMsSUFBWCxDQUFnQixLQUFoQixDQUFELEVBQXlCLEVBQXpCLENBQXBCO0lBQ0EsTUFBTUssR0FBRyxHQUFHN0IsUUFBUSxDQUFDb0IsSUFBSSxDQUFDekMsS0FBTCxDQUFXNkMsSUFBWCxDQUFnQixLQUFoQixDQUFELEVBQXlCLEVBQXpCLENBQXBCOztJQUVBLElBQUlHLEdBQUcsR0FBR0MsR0FBTixJQUFhRCxHQUFHLElBQUlFLEdBQXhCLEVBQTZCO01BQzVCbkUsY0FBYyxDQUFDMEQsSUFBSSxDQUFDRSxJQUFOLENBQWQ7SUFDQTs7SUFFRCxJQUFJSyxHQUFHLElBQUlDLEdBQVgsRUFBZ0I7TUFDZm5FLFdBQVcsQ0FBQzJELElBQUksQ0FBQ0UsSUFBTixDQUFYO0lBQ0E7O0lBRUQsSUFBSUssR0FBRyxHQUFHRSxHQUFWLEVBQWU7TUFDZG5FLGNBQWMsQ0FBQzBELElBQUksQ0FBQ0csSUFBTixDQUFkO0lBQ0E7O0lBRUQsSUFBSUksR0FBRyxJQUFJRSxHQUFYLEVBQWdCO01BQ2ZwRSxXQUFXLENBQUMyRCxJQUFJLENBQUNHLElBQU4sQ0FBWDtJQUNBO0VBQ0Q7O0VBRXNCLE1BQWpCbEMsaUJBQWlCLENBQUdhLEtBQUgsRUFBVztJQUNqQyxNQUFNdkQsT0FBTyxHQUFHdUQsS0FBSyxDQUFDZSxNQUF0QjtJQUNBLE1BQU1hLEVBQUUsR0FBR25GLE9BQU8sQ0FBQ29GLFNBQW5CO0lBQ0EsTUFBTXBELEtBQUssR0FBR2hDLE9BQU8sQ0FBQ3FGLFdBQVIsSUFBdUJyRixPQUFPLENBQUNzRixlQUE3Qzs7SUFFQSxJQUFJO01BQ0gsUUFBUUgsRUFBUjtRQUNDLEtBQUtsRSxPQUFPLENBQUM3QixRQUFSLENBQWlCa0MsU0FBdEI7VUFBaUM7WUFDaEMsTUFBTVUsS0FBSyxDQUFDdUQsTUFBTixFQUFOO1lBQ0EsTUFBTXpHLENBQUMsQ0FBRWtELEtBQUYsQ0FBRCxDQUFXNkMsSUFBWCxDQUFpQixPQUFqQixFQUEwQjdDLEtBQUssQ0FBQ3dCLEtBQWhDLENBQU47WUFDQWdDLE9BQU8sQ0FBQ0MsT0FBUjtZQUNBO1VBQ0E7O1FBRUQsS0FBS3hFLE9BQU8sQ0FBQzdCLFFBQVIsQ0FBaUJtQyxTQUF0QjtVQUFpQztZQUNoQyxNQUFNUyxLQUFLLENBQUMwRCxRQUFOLEVBQU47WUFDQSxNQUFNNUcsQ0FBQyxDQUFFa0QsS0FBRixDQUFELENBQVc2QyxJQUFYLENBQWlCLE9BQWpCLEVBQTBCN0MsS0FBSyxDQUFDd0IsS0FBaEMsQ0FBTjtZQUNBZ0MsT0FBTyxDQUFDQyxPQUFSO1lBQ0E7VUFDQTs7UUFFRDtVQUFTO1lBQ1IsTUFBTSxJQUFJZixLQUFKLENBQVksNkJBQTRCbkIsS0FBTSxFQUE5QyxDQUFOO1VBQ0E7TUFqQkY7SUFtQkEsQ0FwQkQsQ0FvQkUsT0FBT29DLEtBQVAsRUFBYztNQUNmLE1BQU0sSUFBSWpCLEtBQUosQ0FBWSw2QkFBNEIxRSxPQUFRLEtBQUl1RCxLQUFLLENBQUNxQyxPQUFRLEtBQUlyQyxLQUFLLENBQUNzQyxPQUFRLEVBQXBGLENBQU47SUFDQTtFQUNEOztBQTVNZ0M7O0FBK01sQ3RGLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsTUFBdEIsQ0FBOEIsZ0JBQTlCLEVBQWdEUSxPQUFoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25OQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNNkUsUUFBTixTQUF1QjVFLFdBQXZCLENBQW1DO0VBQ2YsV0FBUjlCLFFBQVEsR0FBSTtJQUN0QixPQUFPO01BQ04rQixJQUFJLEVBQUUsYUFEQTtNQUVOQyxLQUFLLEVBQUUsb0JBRkQ7TUFHTjJFLEtBQUssRUFBRSxvQkFIRDtNQUlOQyxXQUFXLEVBQUcsb0JBSlI7TUFLTkMsWUFBWSxFQUFHLDJCQUxUO01BTU5DLFlBQVksRUFBRztJQU5ULENBQVA7RUFRQTs7RUFFZ0IsV0FBTjNHLE1BQU0sR0FBSTtJQUNwQixPQUFPO01BQ040RyxXQUFXLEVBQUUsc0JBRFA7TUFFTjFFLGlCQUFpQixFQUFFLDRCQUZiO01BR05DLGtCQUFrQixFQUFFLDZCQUhkO01BSU4wRSxrQkFBa0IsRUFBRSw2QkFKZDtNQUtOQyxtQkFBbUIsRUFBRSw4QkFMZjtNQU1OQyxtQkFBbUIsRUFBRSw4QkFOZjtNQU9OQyxzQkFBc0IsRUFBRSw0QkFQbEI7TUFRTkMsdUJBQXVCLEVBQUUsa0NBUm5CO01BU05DLHdCQUF3QixFQUFFO0lBVHBCLENBQVA7RUFXQTs7RUFFNEIsV0FBbEJ4SCxrQkFBa0IsR0FBSTtJQUNoQyxPQUFPLENBQUUsT0FBRixFQUFXLE9BQVgsRUFBb0IsZUFBcEIsRUFBcUMsYUFBckMsRUFBb0QsYUFBcEQsQ0FBUDtFQUNBOztFQUVEVyxXQUFXLEdBQUk7SUFDZDtJQUVBLE1BQU04RyxRQUFRLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF5QixLQUFLQyxRQUE5QixDQUFqQjtJQUNBLE1BQU1DLGVBQWUsR0FBR0osUUFBUSxDQUFDSyxPQUFqQztJQUNBLEtBQUtDLFlBQUwsQ0FBbUI7TUFBRUMsSUFBSSxFQUFFO0lBQVIsQ0FBbkIsRUFBc0NDLFdBQXRDLENBQW1ESixlQUFlLENBQUNLLFNBQWhCLENBQTJCLElBQTNCLENBQW5EO0lBQ0EsS0FBSy9ILFFBQUwsR0FBZ0IwRyxRQUFRLENBQUMxRyxRQUF6QjtJQUNBLEtBQUtELElBQUwsR0FBWUwsNkNBQUMsQ0FBRyxJQUFJZ0gsUUFBUSxDQUFDMUcsUUFBVCxDQUFrQitCLElBQU0sSUFBRyxLQUFLWSxFQUFHLEVBQTFDLENBQWI7SUFDQSxLQUFLcUYsS0FBTCxHQUFhLEtBQUtqSSxJQUFMLENBQVVrSSxJQUFWLENBQWlCLElBQUl2QixRQUFRLENBQUMxRyxRQUFULENBQWtCMkcsS0FBTyxFQUE5QyxDQUFiO0lBQ0EsS0FBSy9ELEtBQUwsR0FBYSxLQUFLN0MsSUFBTCxDQUFVa0ksSUFBVixDQUFpQixJQUFJdkIsUUFBUSxDQUFDMUcsUUFBVCxDQUFrQmdDLEtBQU8sRUFBOUMsQ0FBYjtJQUNBLEtBQUtrRyxXQUFMLEdBQW1CLEtBQUtuSSxJQUFMLENBQVVrSSxJQUFWLENBQWlCLElBQUl0SSxvRUFBdUIsRUFBNUMsQ0FBbkI7SUFDQSxLQUFLdUQsV0FBTCxHQUFtQixLQUFLQSxXQUFMLENBQWlCRixJQUFqQixDQUF1QixJQUF2QixDQUFuQjtJQUNBLEtBQUttRixXQUFMLEdBQW1CLEtBQUtBLFdBQUwsQ0FBaUJuRixJQUFqQixDQUF1QixJQUF2QixDQUFuQjtJQUNBLEtBQUtvRixXQUFMLEdBQW1CLEtBQUtBLFdBQUwsQ0FBaUJwRixJQUFqQixDQUF1QixJQUF2QixDQUFuQjtJQUNBLEtBQUtxRixZQUFMLEdBQW9CLEtBQUtBLFlBQUwsQ0FBa0JyRixJQUFsQixDQUF3QixJQUF4QixDQUFwQjtJQUNBLEtBQUtzRixpQkFBTCxHQUF5QixLQUFLQSxpQkFBTCxDQUF1QnRGLElBQXZCLENBQTZCLElBQTdCLENBQXpCO0lBQ0EsS0FBS3VGLGNBQUwsR0FBc0IsS0FBS0EsY0FBTCxDQUFvQnZGLElBQXBCLENBQTBCLElBQTFCLENBQXRCO0lBQ0EsS0FBS3dGLFVBQUwsR0FBa0IsS0FBS0EsVUFBTCxDQUFnQnhGLElBQWhCLENBQXNCLElBQXRCLENBQWxCO0VBQ0E7O0VBRURELGlCQUFpQixHQUFJO0lBQ3BCLEtBQUtvRixXQUFMO0lBQ0EsS0FBS2pGLFdBQUw7SUFDQSxLQUFLb0YsaUJBQUw7SUFDQSxLQUFLRSxVQUFMO0VBQ0E7O0VBRUR2RixvQkFBb0IsR0FBSTtJQUN2QixLQUFLTCxLQUFMLENBQVdtQixHQUFYLENBQWdCLHNCQUFoQjtJQUNBLEtBQUtuQixLQUFMLENBQVdtQixHQUFYLENBQWdCLDhCQUFoQjtJQUNBLEtBQUtpRSxLQUFMLENBQVdqRSxHQUFYLENBQWdCLDhCQUFoQjtJQUNBLEtBQUttRSxXQUFMLENBQWlCbkUsR0FBakIsQ0FBc0IsNkJBQXRCO0lBQ0EsS0FBS21FLFdBQUwsQ0FBaUJuRSxHQUFqQixDQUFzQixxQ0FBdEI7RUFDQTs7RUFFRDBFLG9CQUFvQixHQUFJO0lBQ3ZCLElBQUlDLE1BQU0sR0FBRyxDQUFiO0lBQ0EsSUFBSUMsS0FBSyxHQUFHLENBQVo7SUFDQSxNQUFNM0ksUUFBUSxHQUFHLEtBQUtELElBQUwsQ0FBVWtJLElBQVYsQ0FBaUIsSUFBSXBHLG1FQUF1QixFQUE1QyxDQUFqQjtJQUNBN0IsUUFBUSxDQUFDNEksSUFBVCxDQUFpQkMsS0FBRixJQUFhO01BQzNCLE1BQU1sRyxFQUFFLEdBQUdqRCw2Q0FBQyxDQUFFTSxRQUFRLENBQUU2SSxLQUFGLENBQVYsQ0FBRCxDQUF1QnBELElBQXZCLENBQTZCLE1BQTdCLENBQVg7TUFDQSxJQUFJckIsS0FBSyxHQUFHMUUsNkNBQUMsQ0FBRU0sUUFBUSxDQUFFNkksS0FBRixDQUFWLENBQUQsQ0FBdUJwRCxJQUF2QixDQUE2QixPQUE3QixDQUFaOztNQUNBLElBQUs5QyxFQUFFLEtBQUssVUFBWixFQUF5QjtRQUN4QitGLE1BQU0sSUFBSXpFLFFBQVEsQ0FBRUcsS0FBRixFQUFTLEVBQVQsQ0FBbEI7TUFDQTs7TUFDRCxJQUFLekIsRUFBRSxLQUFLLE1BQVosRUFBcUI7UUFDcEIrRixNQUFNLElBQUl6RSxRQUFRLENBQUVHLEtBQUYsRUFBUyxFQUFULENBQWxCO01BQ0E7O01BQ0QsSUFBS3pCLEVBQUUsS0FBSyxVQUFaLEVBQXlCO1FBQ3hCZ0csS0FBSyxJQUFJMUUsUUFBUSxDQUFFRyxLQUFGLEVBQVMsRUFBVCxDQUFqQjtNQUNBO0lBQ0QsQ0FaRDs7SUFhQSxJQUFLc0UsTUFBTSxJQUFJLENBQWYsRUFBbUI7TUFDbEIsT0FBTyxnQkFBUDtJQUNBOztJQUNELElBQUtBLE1BQU0sR0FBRyxDQUFULElBQWNDLEtBQUssR0FBRyxDQUEzQixFQUErQjtNQUM5QixNQUFNRyxZQUFZLEdBQUdySCwwREFBUyxDQUFFaUgsTUFBRixFQUFVbEgsMkRBQVYsQ0FBOUI7TUFDQSxNQUFNdUgsV0FBVyxHQUFHdEgsMERBQVMsQ0FBRWtILEtBQUYsRUFBU25ILDhEQUFULENBQTdCO01BQ0EsT0FBUSxHQUFHa0gsTUFBUSxJQUFJSSxZQUFjLEtBQUtILEtBQU8sSUFBSUksV0FBYSxFQUFsRTtJQUNBOztJQUNELElBQUtMLE1BQU0sR0FBRyxDQUFULElBQWNDLEtBQUssSUFBSSxDQUE1QixFQUFnQztNQUMvQixNQUFNRyxZQUFZLEdBQUdySCwwREFBUyxDQUFFaUgsTUFBRixFQUFVbEgsMkRBQVYsQ0FBOUI7TUFDQSxPQUFRLEdBQUdrSCxNQUFRLElBQUlJLFlBQWMsRUFBckM7SUFDQTtFQUNEOztFQUVERSxjQUFjLENBQUc3RSxLQUFILEVBQVc7SUFDeEIsSUFBSThFLFlBQVksR0FBRyxFQUFuQjtJQUNBLE1BQU16RSxJQUFJLEdBQUdMLEtBQUssQ0FBQ2UsTUFBTixDQUFhdUMsUUFBMUI7O0lBQ0EsUUFBU2pELElBQVQ7TUFDQyxLQUFLLGdCQUFMO1FBQ0N5RSxZQUFZLEdBQUcsS0FBS1Isb0JBQUwsRUFBZjtRQUNBLEtBQUs3RixLQUFMLENBQVc2QyxJQUFYLENBQWlCLE9BQWpCLEVBQTBCd0QsWUFBMUI7UUFDQTs7TUFDRDtRQUNDO0lBTkY7RUFRQTs7RUFFRFQsVUFBVSxHQUFJO0lBQ2I5SSw2Q0FBQyxDQUFFLEtBQUtLLElBQVAsQ0FBRCxDQUFlcUYsRUFBZixDQUNDdkQsOEVBREQsRUFFRSxJQUFJQSxtRUFBdUIsRUFGN0IsRUFHR3NDLEtBQUYsSUFBYTtNQUNaLE1BQU1lLE1BQU0sR0FBR3hGLDZDQUFDLENBQUV5RSxLQUFLLENBQUNlLE1BQVIsQ0FBaEI7TUFDQW5FLE9BQU8sQ0FBQ21JLEdBQVIsQ0FBYyxVQUFVaEUsTUFBTSxDQUFDTyxJQUFQLENBQWEsT0FBYixDQUF3QixjQUFjUCxNQUFNLENBQUNPLElBQVAsQ0FBYSxPQUFiLENBQXdCLEVBQXRGO01BQ0EsS0FBS3VELGNBQUwsQ0FBcUI3RSxLQUFyQjtJQUNBLENBUEY7RUFTQTs7RUFFRGdGLHdCQUF3QixDQUFHL0UsS0FBSCxFQUFVdkQsUUFBVixFQUFvQkMsUUFBcEIsRUFBK0I7SUFDdERDLE9BQU8sQ0FBQ21JLEdBQVIsQ0FBYywyQ0FBMkM5RSxLQUFPLGdCQUFnQnZELFFBQVUsZ0JBQWdCQyxRQUFVLEVBQXBIO0VBQ0E7O0VBRURzSSxrQkFBa0IsQ0FBR0MsSUFBSCxFQUFVO0lBQzNCLE1BQU1qRixLQUFLLEdBQUdpRixJQUFJLENBQUM1RCxJQUFMLENBQVcsZUFBWCxDQUFkOztJQUNBLFFBQVNyQixLQUFUO01BQ0MsS0FBSyxPQUFMO1FBQ0NpRixJQUFJLENBQUM1RCxJQUFMLENBQVcsZUFBWCxFQUE0QixNQUE1QjtRQUNBOztNQUNELEtBQUssTUFBTDtRQUNDNEQsSUFBSSxDQUFDNUQsSUFBTCxDQUFXLGVBQVgsRUFBNEIsT0FBNUI7UUFDQTs7TUFDRCxLQUFLLFdBQUw7UUFDQzRELElBQUksQ0FBQzVELElBQUwsQ0FBVyxlQUFYLEVBQTRCLE1BQTVCO1FBQ0E7O01BQ0Q7UUFDQztJQVhGO0VBYUE7O0VBRUQyQyxXQUFXLEdBQUk7SUFDZCxLQUFLSixLQUFMLENBQVc3QyxPQUFYLENBQW9CLDhCQUFwQjtJQUNBLEtBQUt2QyxLQUFMLENBQVd1QyxPQUFYLENBQW9CLDhCQUFwQjtJQUNBLEtBQUsrQyxXQUFMLENBQWlCL0MsT0FBakIsQ0FBMEIscUNBQTFCO0VBQ0E7O0VBRURvRCxjQUFjLENBQUdwRSxLQUFILEVBQVc7SUFDeEJBLEtBQUssQ0FBQ21GLGNBQU47SUFFQSxNQUFNQyxHQUFHLEdBQUdwRixLQUFLLENBQUNxRixLQUFsQjs7SUFDQSxRQUFTRCxHQUFUO01BQ0MsS0FBSyxFQUFMO1FBQ0MsS0FBS3ZCLEtBQUwsQ0FBVzdDLE9BQVgsQ0FBb0IsOEJBQXBCO1FBQ0EsS0FBS3ZDLEtBQUwsQ0FBV3VDLE9BQVgsQ0FBb0IsOEJBQXBCO1FBQ0EsS0FBSytDLFdBQUwsQ0FBaUIvQyxPQUFqQixDQUEwQixxQ0FBMUI7UUFDQTs7TUFDRDtRQUNDO0lBUEY7RUFTQTs7RUFFRGtELFlBQVksQ0FBR2xFLEtBQUgsRUFBVztJQUN0QixNQUFNa0YsSUFBSSxHQUFHM0osNkNBQUMsQ0FBRXlFLEtBQUssQ0FBQ2UsTUFBUixDQUFkO0lBQ0EsTUFBTXVFLEdBQUcsR0FBR0osSUFBSSxDQUFDNUQsSUFBTCxDQUFXLE9BQVgsRUFBcUJpRSxLQUFyQixDQUE0QixHQUE1QixDQUFaOztJQUNBLFFBQVMsQ0FBSUQsR0FBRyxDQUFFLENBQUYsQ0FBSCxJQUFZQSxHQUFHLENBQUUsQ0FBRixDQUFqQixJQUE4QkEsR0FBRyxDQUFFLENBQUYsQ0FBSCxJQUFZQSxHQUFHLENBQUUsQ0FBRixDQUEvQyxFQUF5REUsT0FBekQsQ0FBa0UsU0FBbEUsRUFBNkUsRUFBN0UsQ0FBVDtNQUNDLEtBQUssb0JBQUw7UUFDQ04sSUFBSSxDQUFDTyxXQUFMLENBQWtCLDJCQUFsQjtRQUNBOztNQUNELEtBQUssb0JBQUw7UUFDQ1AsSUFBSSxDQUFDTyxXQUFMLENBQWtCLDJCQUFsQjtRQUNBLEtBQUtSLGtCQUFMLENBQXlCQyxJQUF6QjtRQUNBOztNQUNELEtBQUssa0NBQUw7UUFDQ0EsSUFBSSxDQUFDL0UsR0FBTCxDQUFVLENBQVYsRUFBY3VGLGVBQWQsQ0FBK0IsU0FBL0I7UUFDQTs7TUFDRDtRQUNDO0lBWkY7RUFjQTs7RUFFRDFCLFdBQVcsR0FBSTtJQUNkLEtBQUtILEtBQUwsQ0FBVzVDLEVBQVgsQ0FBZTtNQUNkLGdDQUFnQyxLQUFLaUQ7SUFEdkIsQ0FBZjtFQUdBOztFQUVEbkYsV0FBVyxHQUFJO0lBQ2QsS0FBS04sS0FBTCxDQUFXd0MsRUFBWCxDQUFlO01BQ2QwRSxRQUFRLEVBQUUsS0FBS3ZCLGNBREQ7TUFFZCx3QkFBd0IsS0FBS0gsV0FGZjtNQUdkLGdDQUFnQyxLQUFLQztJQUh2QixDQUFmO0lBS0EsS0FBS3pGLEtBQUwsQ0FBV3dDLEVBQVgsQ0FBZSxRQUFmLEVBQXlCLDBCQUF6QixFQUFxRCxZQUFZO01BQUVyRSxPQUFPLENBQUNtSSxHQUFSLENBQWEsWUFBYjtJQUE2QixDQUFoRztFQUNBOztFQUVEWixpQkFBaUIsR0FBSTtJQUNwQixLQUFLSixXQUFMLENBQWlCOUMsRUFBakIsQ0FBcUI7TUFDcEIsK0JBQStCLEtBQUtnRCxXQURoQjtNQUVwQix1Q0FBdUMsS0FBS0M7SUFGeEIsQ0FBckI7RUFJQTs7QUExTWlDOztBQTZNbkMsTUFBTTBCLG1CQUFOLFNBQWtDckQsUUFBbEMsQ0FBMkM7RUFFdkIsV0FBUjFHLFFBQVEsR0FBSTtJQUN0QixPQUFPO01BQ04rQixJQUFJLEVBQUUsd0JBREE7TUFFTmlJLGNBQWMsRUFBRSw2QkFGVjtNQUdOQyxZQUFZLEVBQUUsMkJBSFI7TUFJTkMsYUFBYSxFQUFFO0lBSlQsQ0FBUDtFQU1BOztFQUVnQixXQUFOL0osTUFBTSxHQUFJO0lBQ3BCLE9BQU87TUFDTmdLLG1CQUFtQixFQUFFLDhCQURmO01BRU5DLDhCQUE4QixFQUFFLHlDQUYxQjtNQUdOQyw0QkFBNEIsRUFBRSx1Q0FIeEI7TUFJTkMsa0JBQWtCLEVBQUUsNkJBSmQ7TUFLTkMsbUJBQW1CLEVBQUU7SUFMZixDQUFQO0VBT0E7O0VBRUQvSixXQUFXLEdBQUk7SUFDZDtJQUNBLE1BQU1nSSxVQUFOLEdBRmMsQ0FHZDs7SUFDQSxLQUFLZ0MsYUFBTCxHQUFxQixLQUFLekssSUFBTCxDQUFVa0ksSUFBVixDQUFpQixJQUFJOEIsbUJBQW1CLENBQUMvSixRQUFwQixDQUE2QmdLLGNBQWdCLEVBQWxFLENBQXJCO0lBQ0EsS0FBS1MsV0FBTCxHQUFtQixLQUFLMUssSUFBTCxDQUFVa0ksSUFBVixDQUFpQixJQUFJOEIsbUJBQW1CLENBQUMvSixRQUFwQixDQUE2QmlLLFlBQWMsRUFBaEUsQ0FBbkI7SUFDQSxLQUFLUyxZQUFMLEdBQW9CLEtBQUszSyxJQUFMLENBQVVrSSxJQUFWLENBQWlCLElBQUk4QixtQkFBbUIsQ0FBQy9KLFFBQXBCLENBQTZCa0ssYUFBZSxFQUFqRSxDQUFwQjtJQUNBLEtBQUtTLFlBQUwsR0FBb0IsS0FBS0EsWUFBTCxDQUFrQjNILElBQWxCLENBQXdCLElBQXhCLENBQXBCO0lBQ0EsS0FBSzRILG1CQUFMLEdBQTJCLEtBQUtBLG1CQUFMLENBQXlCNUgsSUFBekIsQ0FBK0IsSUFBL0IsQ0FBM0I7SUFDQSxLQUFLNkgsaUJBQUwsR0FBeUIsS0FBS0EsaUJBQUwsQ0FBdUI3SCxJQUF2QixDQUE2QixJQUE3QixDQUF6QjtJQUNBLEtBQUs4SCxrQkFBTCxHQUEwQixLQUFLQSxrQkFBTCxDQUF3QjlILElBQXhCLENBQTZCLElBQTdCLENBQTFCO0VBQ0E7O0VBRURELGlCQUFpQixHQUFJO0lBQ3BCLE1BQU1vRixXQUFOO0lBQ0EsTUFBTWpGLFdBQU47SUFDQSxNQUFNb0YsaUJBQU47SUFDQSxLQUFLcUMsWUFBTDtJQUNBLEtBQUtDLG1CQUFMO0lBQ0EsS0FBS0osYUFBTCxDQUFtQnJGLE9BQW5CLENBQTRCNEUsbUJBQW1CLENBQUM1SixNQUFwQixDQUEyQmdLLG1CQUF2RDtJQUNBLEtBQUtVLGlCQUFMO0lBQ0EsS0FBS0osV0FBTCxDQUFpQnRGLE9BQWpCLENBQTBCNEUsbUJBQW1CLENBQUM1SixNQUFwQixDQUEyQmtLLDRCQUFyRDtJQUNBLEtBQUtTLGtCQUFMO0VBQ0E7O0VBRURILFlBQVksR0FBSTtJQUNmakwsNkNBQUMsQ0FBRSxLQUFLSyxJQUFQLENBQUQsQ0FBZXFGLEVBQWYsQ0FDQ3NCLFFBQVEsQ0FBQ3ZHLE1BQVQsQ0FBZ0I4RyxtQkFEakIsRUFFRSxJQUFJUCxRQUFRLENBQUMxRyxRQUFULENBQWtCMkcsS0FBTyxFQUYvQixFQUdHeEMsS0FBRixJQUFhO01BQ1osS0FBS3FHLGFBQUwsQ0FBbUJyRixPQUFuQixDQUE0QjRFLG1CQUFtQixDQUFDNUosTUFBcEIsQ0FBMkJpSyw4QkFBdkQ7SUFDQSxDQUxGO0lBUUExSyw2Q0FBQyxDQUFFLEtBQUtLLElBQVAsQ0FBRCxDQUFlcUYsRUFBZixDQUNDdkQsOEVBREQsRUFFRSxJQUFJQSxtRUFBdUIsRUFGN0IsRUFHR3NDLEtBQUYsSUFBYTtNQUNaLEtBQUtzRyxXQUFMLENBQWlCdEYsT0FBakIsQ0FBMEI0RSxtQkFBbUIsQ0FBQzVKLE1BQXBCLENBQTJCa0ssNEJBQXJEO0lBQ0EsQ0FMRjtFQU9BOztFQUVETyxtQkFBbUIsR0FBSTtJQUN0QixLQUFLSixhQUFMLENBQW1CcEYsRUFBbkIsQ0FDQzJFLG1CQUFtQixDQUFDNUosTUFBcEIsQ0FBMkJnSyxtQkFENUIsRUFFR2hHLEtBQUYsSUFBYTtNQUNaLElBQUssS0FBS3FHLGFBQUwsQ0FBbUIvRSxJQUFuQixDQUF5QixVQUF6QixDQUFMLEVBQTZDO1FBQzVDO01BQ0E7O01BQ0QsS0FBSytFLGFBQUwsQ0FBbUJsRyxHQUFuQixDQUF3QixDQUF4QixFQUE0QnlHLFlBQTVCLENBQTBDLFVBQTFDLEVBQXNELEVBQXREO0lBQ0EsQ0FQRjtJQVVBLEtBQUtQLGFBQUwsQ0FBbUJwRixFQUFuQixDQUNDMkUsbUJBQW1CLENBQUM1SixNQUFwQixDQUEyQmlLLDhCQUQ1QixFQUVHakcsS0FBRixJQUFhO01BQ1osSUFBSyxLQUFLcUcsYUFBTCxDQUFtQmxHLEdBQW5CLENBQXdCLENBQXhCLEVBQTRCRCxZQUE1QixDQUEwQyxVQUExQyxLQUEwRCxJQUEvRCxFQUFzRTtRQUNyRSxLQUFLbUcsYUFBTCxDQUFtQmxHLEdBQW5CLENBQXdCLENBQXhCLEVBQTRCMEcsZUFBNUIsQ0FBNkMsVUFBN0M7TUFDQSxDQUZELE1BR0s7UUFDSixLQUFLUixhQUFMLENBQW1CbEcsR0FBbkIsQ0FBd0IsQ0FBeEIsRUFBNEJ5RyxZQUE1QixDQUEwQyxVQUExQyxFQUFzRCxFQUF0RDtNQUNBO0lBQ0QsQ0FURjtFQVdBOztFQUVERixpQkFBaUIsR0FBSTtJQUNwQixLQUFLSixXQUFMLENBQWlCckYsRUFBakIsQ0FDQzJFLG1CQUFtQixDQUFDNUosTUFBcEIsQ0FBMkJrSyw0QkFENUIsRUFFR2xHLEtBQUYsSUFBYTtNQUNaLE1BQU12QixLQUFLLEdBQUcsS0FBS0EsS0FBbkI7TUFDQSxNQUFNNkgsV0FBVyxHQUFHLEtBQUtBLFdBQUwsQ0FBaUJuRyxHQUFqQixDQUFxQixDQUFyQixDQUFwQjs7TUFDQSxJQUFLMUIsS0FBSyxDQUFDZ0QsR0FBTixPQUFnQixnQkFBckIsRUFBd0M7UUFDdkMsSUFBSzZFLFdBQVcsQ0FBQ3BHLFlBQVosQ0FBMEIsVUFBMUIsS0FBMEMsSUFBL0MsRUFBc0Q7VUFDckQ7UUFDQTs7UUFDRG9HLFdBQVcsQ0FBQ00sWUFBWixDQUEwQixVQUExQixFQUFzQyxFQUF0QztRQUNBO01BQ0E7O01BQ0ROLFdBQVcsQ0FBQ08sZUFBWixDQUE2QixVQUE3QjtJQUNBLENBYkY7SUFnQkEsS0FBS1AsV0FBTCxDQUFpQnJGLEVBQWpCLENBQ0MyRSxtQkFBbUIsQ0FBQzVKLE1BQXBCLENBQTJCbUssa0JBRDVCLEVBRUduRyxLQUFGLElBQWE7TUFDWixNQUFNOEcsUUFBUSxHQUFHLEtBQUtsTCxJQUFMLENBQVVrSSxJQUFWLENBQWdCLElBQUdwRyxxRUFBd0IsRUFBM0MsQ0FBakI7TUFDQW9KLFFBQVEsQ0FBQ3JDLElBQVQsQ0FBYyxZQUFVO1FBQ3ZCLElBQUlTLElBQUksR0FBRzNKLDZDQUFDLENBQUMsSUFBRCxDQUFaO1FBQ0EsS0FBSzBFLEtBQUwsR0FBYSxDQUFiO1FBQ0FpRixJQUFJLENBQUM1RCxJQUFMLENBQVcsT0FBWCxFQUFvQixDQUFwQjtRQUNBNEQsSUFBSSxDQUFDbEUsT0FBTCxDQUFjdEQsK0VBQWQsRUFBaUQ7VUFBRXVDLEtBQUssRUFBRTtRQUFULENBQWpEO1FBQ0ExRSw2Q0FBQyxDQUFDLEtBQUt3RyxlQUFOLENBQUQsQ0FBd0JmLE9BQXhCLENBQWdDdEQsbUZBQWhDO01BQ0EsQ0FORDtNQU9BLEtBQUs0SSxXQUFMLENBQWlCdEYsT0FBakIsQ0FBeUI0RSxtQkFBbUIsQ0FBQzVKLE1BQXBCLENBQTJCa0ssNEJBQXBEO0lBQ0EsQ0FaRjtFQWNBOztFQUVEUyxrQkFBa0IsR0FBSTtJQUNyQnBMLDZDQUFDLENBQUMsS0FBS2dMLFlBQUwsQ0FBa0J6QyxJQUFsQixDQUF1QixRQUF2QixDQUFELENBQUQsQ0FBb0M3QyxFQUFwQyxDQUNDMkUsbUJBQW1CLENBQUM1SixNQUFwQixDQUEyQm9LLG1CQUQ1QixFQUVDLE1BQUk7TUFDSCxLQUFLdkMsS0FBTCxDQUFXN0MsT0FBWCxDQUFvQiw4QkFBcEI7TUFDQSxLQUFLdkMsS0FBTCxDQUFXdUMsT0FBWCxDQUFvQiw4QkFBcEI7TUFDQSxLQUFLK0MsV0FBTCxDQUFpQi9DLE9BQWpCLENBQTBCLHFDQUExQjtJQUNBLENBTkY7RUFRQTs7QUFsSXlDOztBQXNJM0NoRSxNQUFNLENBQUNDLGNBQVAsQ0FBc0JDLE1BQXRCLENBQThCLFdBQTlCLEVBQTJDcUYsUUFBM0M7QUFDQXZGLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsTUFBdEIsQ0FBOEIsd0JBQTlCLEVBQXdEMEksbUJBQXhEOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3pWQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDRkEsTUFBTXJLLENBQUMsR0FBRzZCLG1CQUFPLENBQUUsb0RBQUYsQ0FBakI7O0FBRUEsU0FBUzJKLFdBQVQsQ0FBdUJ0SyxPQUF2QixFQUFpQztFQUNoQyxPQUFPbEIsQ0FBQyxDQUFDa0IsT0FBRCxDQUFELENBQVc2RSxJQUFYLENBQWdCLFVBQWhCLENBQVA7QUFDQTs7QUFFRCxTQUFTOUQsY0FBVCxDQUEwQmYsT0FBMUIsRUFBb0M7RUFDbkMsTUFBTXVLLFFBQVEsR0FBR0QsV0FBVyxDQUFDdEssT0FBRCxDQUE1Qjs7RUFDQSxJQUFJdUssUUFBUSxLQUFLLFVBQWpCLEVBQTZCO0lBQzVCO0VBQ0E7O0VBQ0R2SyxPQUFPLENBQUN3SyxVQUFSLENBQW1CLFVBQW5CO0FBQ0E7O0FBRUQsU0FBUzFKLFdBQVQsQ0FBdUJkLE9BQXZCLEVBQWlDO0VBQ2hDLE1BQU11SyxRQUFRLEdBQUdELFdBQVcsQ0FBQ3RLLE9BQUQsQ0FBNUI7O0VBQ0EsSUFBSXVLLFFBQVEsS0FBSyxVQUFqQixFQUE2QjtJQUM1QjtFQUNBOztFQUNEekwsQ0FBQyxDQUFDa0IsT0FBRCxDQUFELENBQVc2RSxJQUFYLENBQWdCLFVBQWhCLEVBQTRCLEVBQTVCO0FBQ0E7O0FBRUQ0RixNQUFNLENBQUNDLE9BQVAsR0FBaUI7RUFBRUosV0FBRjtFQUFldkosY0FBZjtFQUErQkQ7QUFBL0IsQ0FBakI7Ozs7Ozs7Ozs7Ozs7OztBQ3RCQTs7QUFDQTtBQUNPLGVBQWU2SixRQUFmLENBQTBCQyxHQUExQixFQUErQkMsR0FBL0IsRUFBcUM7RUFDM0MsSUFBSTtJQUNIbEUsUUFBUSxDQUFDbUUsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQStDdkgsS0FBRCxJQUFXO01BQ3hELElBQUlBLEtBQUssQ0FBQ2UsTUFBTixDQUFheUcsVUFBYixLQUE0QixhQUFoQyxFQUErQztRQUM5Q0gsR0FBRztNQUNILENBRkQsTUFFTyxJQUFJckgsS0FBSyxDQUFDZSxNQUFOLENBQWF5RyxVQUFiLEtBQTRCLFVBQWhDLEVBQTRDO1FBQ2xERixHQUFHO01BQ0g7SUFDRCxDQU5EO0VBT0EsQ0FSRCxDQVFFLE9BQU9sRixLQUFQLEVBQWM7SUFDZixNQUFNLElBQUlqQixLQUFKLENBQVUscUJBQVYsQ0FBTjtFQUNBO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZEQ7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSE8sU0FBUzdELFNBQVQsQ0FBbUJtSyxNQUFuQixFQUEyQnBLLEtBQTNCLEVBQWtDO0VBQ3hDLE1BQU1xSyxLQUFLLEdBQUcsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixDQUFkO0VBQ0EsT0FBT3JLLEtBQUssQ0FBRW9LLE1BQU0sR0FBRyxHQUFULEdBQWUsQ0FBZixJQUFvQkEsTUFBTSxHQUFHLEdBQVQsR0FBZSxFQUFwQyxHQUEwQyxDQUExQyxHQUE4Q0MsS0FBSyxDQUFFRCxNQUFNLEdBQUcsRUFBVCxHQUFjLENBQWYsR0FBb0JBLE1BQU0sR0FBRyxFQUE3QixHQUFrQyxDQUFuQyxDQUFwRCxDQUFaO0FBQ0E7QUFFTSxNQUFNcEssS0FBSyxHQUFHO0VBQ3BCc0ssUUFBUSxFQUFFLENBQUMsVUFBRCxFQUFhLFVBQWIsRUFBeUIsV0FBekIsQ0FEVTtFQUVwQkMsUUFBUSxFQUFFLENBQUMsT0FBRCxFQUFVLE9BQVYsRUFBbUIsT0FBbkIsQ0FGVTtFQUdwQkMsSUFBSSxFQUFFLENBQUMsT0FBRCxFQUFVLE9BQVYsRUFBbUIsT0FBbkIsQ0FIYztFQUlwQkMsS0FBSyxFQUFFLENBQUMsT0FBRCxFQUFVLE9BQVYsRUFBbUIsUUFBbkIsQ0FKYTtFQUtwQkMsT0FBTyxFQUFFLENBQUMsU0FBRCxFQUFZLFNBQVosRUFBdUIsUUFBdkIsQ0FMVztFQU1wQkMsT0FBTyxFQUFFLENBQUMsU0FBRCxFQUFZLFNBQVosRUFBdUIsUUFBdkIsQ0FOVztFQU9wQkMsTUFBTSxFQUFFLENBQUMsT0FBRCxFQUFVLE9BQVYsRUFBbUIsTUFBbkIsQ0FQWTtFQVFwQkMsT0FBTyxFQUFFLENBQUMsU0FBRCxFQUFZLFNBQVosRUFBdUIsVUFBdkI7QUFSVyxDQUFkOzs7Ozs7Ozs7Ozs7Ozs7QUNMUDs7QUFDQTtBQUNBLGVBQWV6SyxLQUFmLENBQXFCMEssRUFBckIsRUFBeUI7RUFDeEIsT0FBTyxJQUFJbEcsT0FBSixDQUFhQyxPQUFELElBQWFrRyxVQUFVLENBQUNsRyxPQUFELEVBQVVpRyxFQUFWLENBQW5DLENBQVA7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNKRDs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSwrQkFBK0Isd0NBQXdDO1dBQ3ZFO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUJBQWlCLHFCQUFxQjtXQUN0QztXQUNBO1dBQ0E7V0FDQTtXQUNBLGtCQUFrQixxQkFBcUI7V0FDdkMsb0hBQW9ILGlEQUFpRDtXQUNySztXQUNBLEtBQUs7V0FDTDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDN0JBO1dBQ0E7V0FDQTtXQUNBLGVBQWUsNEJBQTRCO1dBQzNDLGVBQWU7V0FDZixpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEEsOENBQThDOzs7OztXQ0E5QztXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBLDhDQUE4Qzs7V0FFOUM7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxtQ0FBbUM7V0FDcEU7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRWxEQTtVQUNBO1VBQ0E7VUFDQSxvSUFBb0ksd0VBQXdFO1VBQzVNLDhKQUE4SiwrQ0FBK0M7VUFDN00iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b3hpbi8uL3NyYy9jb21wb25lbnRzL2J1dHRvbi9idXR0b24uanMiLCJ3ZWJwYWNrOi8vdG94aW4vLi9zcmMvY29tcG9uZW50cy9jb3VudGVyL2NvdW50ZXIuanMiLCJ3ZWJwYWNrOi8vdG94aW4vLi9zcmMvY29tcG9uZW50cy9kcm9wZG93bi9kcm9wZG93bi5qcyIsIndlYnBhY2s6Ly90b3hpbi8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b3hpbi8uL3NyYy91dGlscy9qcy9kaXNhYmxlZC5qcyIsIndlYnBhY2s6Ly90b3hpbi8uL3NyYy91dGlscy9qcy9kb21SZWFkeS5qcyIsIndlYnBhY2s6Ly90b3hpbi8uL3NyYy91dGlscy9qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b3hpbi8uL3NyYy91dGlscy9qcy9tb3JwaC5qcyIsIndlYnBhY2s6Ly90b3hpbi8uL3NyYy91dGlscy9qcy9zbGVlcC5qcyIsIndlYnBhY2s6Ly90b3hpbi8uL3NyYy9pbmRleC5zY3NzPzFhNGYiLCJ3ZWJwYWNrOi8vdG94aW4vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG94aW4vd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly90b3hpbi93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90b3hpbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG94aW4vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b3hpbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RveGluL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL3RveGluL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG94aW4vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3RveGluL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtY2xhc3Nlcy1wZXItZmlsZSAqL1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuLyoqXG4gKiBAdm8wZG9PXG4gKiBAaW50ZXJmYWNlKEJ1dHRvbilcbiAqIFRPRE86IE9ic2VydmVyZCBhdHRyIC0+IGhhbmRsZUNoYW5nZUF0dHJpYnV0ZXNcbiAqIFRPRE86IFN5bmMgcHJvcGVydHkgdmFsdWVzIGluIGF0dHJpYnV0ZXMgYW5kIERPTVxuICoqL1xuXG5leHBvcnQgY2xhc3MgQnV0dG9uIGV4dGVuZHMgSFRNTEJ1dHRvbkVsZW1lbnQge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gZ2V0Um9vdFByb3BzKCByb290ICk7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IGVsZW1lbnRzICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0QVJST1c6ICdqcy1idXR0b24taWNvbl9fYXJyb3dfY29sb3JfZ3JheScsXG5cdFx0XHRURVhUOiAnanMtYnV0dG9uLXRleHQnLFxuXHRcdH07XG5cdH1cblxuXHRzdGF0aWMgZ2V0IGV2ZW50cygpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Q0xJQ0tfQVJST1c6ICdjbGljay5hcnJvdy1idXR0b24nLFxuXHRcdFx0Q0xJQ0tfVEVYVF9SRVNFVDogJ2NsaWNrLmNsZWFyLWJ1dHRvbicsXG5cdFx0XHRDTElDS19URVhUX0FDQ0VQVDogJ2NsaWNrLmNvbmZpcm0tYnV0dG9uJyxcblx0XHRcdFRPR0dMRV9URVhUX1JFU0VUOiBcIlwiLCBcblx0XHR9O1xuXHR9XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdGNvbm5lY3RlZENhbGxCYWNrICgpIHtcblx0fVxuXG5cdGRpc2Nvbm5lY3RlZENhbGxCYWNrKCkge1xuXG5cdH1cblxuXHRhdHRyaWJ1dGVzQ2hhbmdlZENhbGxiYWNrKGVsZW1lbnQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuXHRcdGNvbnNvbGUuaW5mbyggZWxlbWVudCwgb2xkVmFsdWUsIG5ld1ZhbHVlICk7XG5cdH1cblxufVxuXG5leHBvcnQgY2xhc3MgQnV0dG9uSWNvbiBleHRlbmRzIEJ1dHRvbiB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIEJ1dHRvblRleHQgZXh0ZW5kcyBCdXR0b24ge1xuXHRjb25zdHJ1Y3RvciAoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxufVxuXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCAndG94aW4tYnV0dG9uJywgQnV0dG9uLCB7IGV4dGVuZHM6ICdidXR0b24nIH0gKTtcbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoICdidXR0b24taWNvbicsIEJ1dHRvbkljb24sIHsgZXh0ZW5kczogJ2J1dHRvbicgfSApO1xud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSggJ2J1dHRvbi10ZXh0JywgQnV0dG9uVGV4dCwgeyBleHRlbmRzOiAnYnV0dG9uJyB9ICk7XG5cbmZ1bmN0aW9uIGdldFJvb3RQcm9wcyAoKSB7XG5cdHJldHVybiBbXG5cdFx0J2NsYXNzJyxcblx0XHQnYXJpYS1yb2xlJyxcblx0XHQndGFiaW5kZXgnLFxuXHRcdCdoaWRkZW4nLFxuXHRcdCdkaXNhYmxlZCcsXG5cdFx0J3ZhbHVlJyxcblx0XHQnaW5uZXJUZXh0Jyxcblx0XHQnb3V0ZXJUZXh0Jyxcblx0XHQnYWNjZXNzS2V5Jyxcblx0XHQnbGFuZycsXG5cdFx0J3RpdGxlJyxcblx0XHQndHJhbnNsYXRlJyxcblx0XHQnb2Zmc2V0SGVpZ2h0Jyxcblx0XHQnb2Zmc2V0TGVmdCcsXG5cdFx0J29mZnNldFBhcmVudCcsXG5cdFx0J29mZnNldFRvcCcsXG5cdFx0J29mZnNldFdpZHRoJyxcblx0XHQnZm9ybScsXG5cdFx0J2Zvcm1BY3Rpb24nLFxuXHRcdCdmb3JtRW5jdHlwZScsXG5cdFx0J2Zvcm1NZXRob2QnLFxuXHRcdCdmb3JtTm9WYWxpZGF0ZScsXG5cdFx0J2Zvcm1UYXJnZXQnLFxuXHRcdCdsYWJlbHMnLFxuXHRcdCduYW1lJyxcblx0XHQndHlwZScsXG5cdFx0J3ZhbGlkYXRpb25NZXNzYWdlJyxcblx0XHQndmFsaWRpdHknLFxuXHRcdCd3aWxsVmFsaWRhdGUnLFxuXHRdO1xufVxuIiwiY29uc3QgJCA9IHJlcXVpcmUoICdqcXVlcnknICk7XG5jb25zdCB7IHdvcmRzLCB3b3JkT2ZOdW0sIHNldERpc2FibGVkLCByZW1vdmVEaXNhYmxlZCwgc2xlZXAgfSA9IHJlcXVpcmUoICcuLi8uLi91dGlscy9qcy9pbmRleCcgKTtcblxuXG5jbGFzcyBDb3VudGVyIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXHRzdGF0aWMgZ2V0IGVsZW1lbnRzICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Uk9PVDogJ2pzLWNvdW50ZXInLFxuXHRcdFx0SU5QVVQ6ICdqcy1jb3VudGVyX19pbnB1dCcsXG5cdFx0XHRISURERU46ICdqcy1jb3VudGVyX19pbnB1dF9oaWRkZW4nLFxuXHRcdFx0SU5DUkVNRU5UOiAnanMtY291bnRlcl9faW5jcmVtZW50LWJ1dHRvbicsXG5cdFx0XHRERUNSRU1FTlQ6ICdqcy1jb3VudGVyX19kZWNyZW1lbnQtYnV0dG9uJyxcblx0XHR9O1xuXHR9XG5cblx0c3RhdGljIGdldCBldmVudHMoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdENIQU5HRV9ST09UX1RJVExFOiAnY2hhbmdlOmNvdW50ZXI6cm9vdC50aXRsZScsXG5cdFx0XHRDSEFOR0VfUk9PVF9WQUxVRTogJ2NoYW5nZTpjb3VudGVyOnJvb3QudmFsdWUnLFxuXHRcdFx0Q0hBTkdFX0lOUFVUX1ZBTFVFOiAnY2hhbmdlOmNvdW50ZXI6aW5wdXQudmFsdWUnLFxuXHRcdFx0Q0xJQ0tfSU5DUkVNRU5UX0JVVFRPTjogJ2NsaWNrLmNvdW50ZXIuaW5jcmVtZW50LWJ1dHRvbicsXG5cdFx0XHRDTElDS19ERUNSRU1FTlRfQlVUVE9OOiAnY2xpY2suY291bnRlci5kZWNyZW1lbnQtYnV0dG9uJyxcblx0XHRcdENIQU5HRV9JTkNSRU1FTlRfQlVUVE9OX1NUQVRFOiAnY2hhbmdlOmNvdW50ZXI6aW5jcmVtZW50LWJ1dHRvbi5zdGF0ZScsXG5cdFx0XHRDSEFOR0VfREVDUkVNRU5UX0JVVFRPTl9TVEFURTogJ2NoYW5nZTpjb3VudGVyOmRlY3JlbWVudC1idXR0b24uc3RhdGUnXG5cdFx0fTtcblx0fVxuXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBbJ3ZhbHVlJ107XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5yb290ID0gJChgLmpzLWNvdW50ZXIjJHt0aGlzLmlkfWApO1xuXHRcdHRoaXMuaW5wdXQgPSAkKGAuanMtY291bnRlcl9faW5wdXRfaGlkZGVuIyR7dGhpcy5pZH1gKTtcblx0XHR0aGlzLmRlY3JlbWVudEJ1dHRvbiA9ICQoYC5qcy1jb3VudGVyX19kZWNyZW1lbnQtYnV0dG9uIyR7dGhpcy5pZH1gKTtcblx0XHR0aGlzLmluY3JlbWVudEJ1dHRvbiA9ICQoYC5qcy1jb3VudGVyX19pbmNyZW1lbnQtYnV0dG9uIyR7dGhpcy5pZH1gKTtcblxuXHRcdHRoaXMuY29ubmVjdGVkQ2FsbGJhY2sgPSB0aGlzLmNvbm5lY3RlZENhbGxiYWNrLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5kaXNjb25uZWN0ZWRDYWxsYmFjayA9IHRoaXMuZGlzY29ubmVjdGVkQ2FsbGJhY2suYmluZCh0aGlzKTtcblxuXHRcdHRoaXMuaW5wdXRFdmVudHMgPSB0aGlzLmlucHV0RXZlbnRzLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5kZWNyZW1lbnRCdXR0b25FdmVudHMgPSB0aGlzLmRlY3JlbWVudEJ1dHRvbkV2ZW50cy5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuaW5jcmVtZW50QnV0dG9uRXZlbnRzID0gdGhpcy5pbmNyZW1lbnRCdXR0b25FdmVudHMuYmluZCh0aGlzKTtcblxuXHRcdHRoaXMuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrID0gdGhpcy5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2suYmluZCh0aGlzKTtcblx0XHR0aGlzLmhhbmRsZUNsaWNrQnV0dG9uID0gdGhpcy5oYW5kbGVDbGlja0J1dHRvbi5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuaGFuZGxlQ2hhbmdlUm9vdFZhbHVlID0gdGhpcy5oYW5kbGVDaGFuZ2VSb290VmFsdWUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmhhbmRsZUNoYW5nZUlucHV0VmFsdWUgPSB0aGlzLmhhbmRsZUNoYW5nZUlucHV0VmFsdWUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmhhbmRsZUNoYW5nZUJ1dHRvblN0YXRlID0gdGhpcy5oYW5kbGVDaGFuZ2VCdXR0b25TdGF0ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuaW5wdXRPYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKHRoaXMuaW5wdXRPYnNlcnZlckNhbGxiYWNrKTtcblx0fVxuXG5cdGNvbm5lY3RlZENhbGxiYWNrKCkge1xuXHRcdHRoaXMuaW5wdXRPYnNlcnZlKCk7XG5cdFx0dGhpcy5pbnB1dEV2ZW50cygpO1xuXHRcdHRoaXMuZGVjcmVtZW50QnV0dG9uRXZlbnRzKCk7XG5cdFx0dGhpcy5pbmNyZW1lbnRCdXR0b25FdmVudHMoKTtcblx0fVxuXG5cdGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuXHRcdHRoaXMuaW5wdXRPYnNlcnZlci50YWtlUmVjb3JkcygpO1xuXHRcdHRoaXMuaW5wdXQub2ZmKCBDb3VudGVyLmV2ZW50cy5DSEFOR0VfSU5QVVRfVkFMVUUgKTtcblx0XHR0aGlzLmRlY3JlbWVudEJ1dHRvbi5vZmYoIENvdW50ZXIuZXZlbnRzLkNIQU5HRV9ERUNSRU1FTlRfQlVUVE9OX1NUQVRFICk7XG5cdFx0dGhpcy5pbmNyZW1lbnRCdXR0b24ub2ZmKCBDb3VudGVyLmV2ZW50cy5DSEFOR0VfSU5DUkVNRU5UX0JVVFRPTl9TVEFURSApO1xuXHRcdHRoaXMuaW5jcmVtZW50QnV0dG9uLm9mZiggQ291bnRlci5ldmVudHMuQ0xJQ0tfSU5DUkVNRU5UX0JVVFRPTiApO1xuXHRcdHRoaXMuZGVjcmVtZW50QnV0dG9uLm9mZiggQ291bnRlci5ldmVudHMuQ0xJQ0tfREVDUkVNRU5UX0JVVFRPTiApO1xuXHR9XG5cblx0YXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrICggZWxlbWVudCwgb2xkVmFsdWUsIG5ld1ZhbHVlICkge1xuXHRcdGNvbnN0IG9sZFYgPSBwYXJzZUludChvbGRWYWx1ZSwgMTApO1xuXHRcdGNvbnN0IG5ld1YgPSBwYXJzZUludChuZXdWYWx1ZSwgMTApO1xuXG5cdFx0aWYgKG9sZFYgPT09IG5ld1YgJiYgbmV3ViA8IDApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR0aGlzLmhhbmRsZUNoYW5nZVJvb3RWYWx1ZSggZXZlbnQsIHsgdmFsdWU6IG5ld1YsIGlkOiB0aGlzLmdldEF0dHJpYnV0ZSgnbmFtZScpIH0gKTtcblx0fVxuXG5cdGlucHV0T2JzZXJ2ZSgpIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgYXJyYXktY2FsbGJhY2stcmV0dXJuXG5cdFx0dGhpcy5pbnB1dC5nZXQoKS5tYXAoKG5vZGUpID0+IHtcblx0XHRcdHRoaXMuaW5wdXRPYnNlcnZlci5vYnNlcnZlKG5vZGUsIHRoaXMuaW5wdXRPYnNlcnZlckNvbmZpZyk7XG5cdFx0fSk7XG5cdH1cblxuXHRnZXQgaW5wdXRPYnNlcnZlckNvbmZpZyAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGF0dHJpYnV0ZXM6IHRydWUsXG5cdFx0XHRhdHRyaWJ1dGVPbGRWYWx1ZTogdHJ1ZSxcblx0XHRcdGF0dHJpYnV0ZUZpbHRlcjogQ291bnRlci5vYnNlcnZlZEF0dHJpYnV0ZXNcblx0XHR9O1xuXHR9XG5cblx0aW5wdXRPYnNlcnZlckNhbGxiYWNrICggbXV0YXRpb25zICkge1xuXHRcdG11dGF0aW9ucy5mb3JFYWNoKChtdXRhdGlvbikgPT4ge1xuXHRcdFx0aWYgKG11dGF0aW9uLnR5cGUgPT09ICdhdHRyaWJ1dGVzJykge1xuXHRcdFx0XHRjb25zdCB7IG9sZFZhbHVlIH0gPSBtdXRhdGlvbjtcblx0XHRcdFx0Y29uc3QgeyB2YWx1ZSB9ID0gbXV0YXRpb24udGFyZ2V0O1xuXHRcdFx0XHRpZiAodmFsdWUgIT09IG9sZFZhbHVlKSB7XG5cdFx0XHRcdFx0JCggbXV0YXRpb24udGFyZ2V0ICkudHJpZ2dlciggQ291bnRlci5ldmVudHMuQ0hBTkdFX0lOUFVUX1ZBTFVFLCB7IHZhbHVlOiBtdXRhdGlvbi50YXJnZXQudmFsdWUgfSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRpbnB1dEV2ZW50cygpIHtcblx0XHR0aGlzLmlucHV0Lm9uKHtcblx0XHRcdCdjaGFuZ2U6Y291bnRlcjppbnB1dC52YWx1ZSc6IHRoaXMuaGFuZGxlQ2hhbmdlSW5wdXRWYWx1ZVxuXHRcdH0pO1xuXHR9XG5cblx0aW5jcmVtZW50QnV0dG9uRXZlbnRzKCkge1xuXHRcdHRoaXMuaW5jcmVtZW50QnV0dG9uLm9uKHtcblx0XHRcdCdjbGljay5jb3VudGVyLmluY3JlbWVudC1idXR0b24nOiB0aGlzLmhhbmRsZUNsaWNrQnV0dG9uLFxuXHRcdFx0J2NoYW5nZTpjb3VudGVyOmluY3JlbWVudC1idXR0b24uc3RhdGUnOiB0aGlzLmhhbmRsZUNoYW5nZUJ1dHRvblN0YXRlXG5cdFx0fSk7XG5cdH1cblxuXHRkZWNyZW1lbnRCdXR0b25FdmVudHMoKSB7XG5cdFx0dGhpcy5kZWNyZW1lbnRCdXR0b24ub24oe1xuXHRcdFx0J2NsaWNrLmNvdW50ZXIuZGVjcmVtZW50LWJ1dHRvbic6IHRoaXMuaGFuZGxlQ2xpY2tCdXR0b24sXG5cdFx0XHQnY2hhbmdlOmNvdW50ZXI6ZGVjcmVtZW50LWJ1dHRvbi5zdGF0ZSc6IHRoaXMuaGFuZGxlQ2hhbmdlQnV0dG9uU3RhdGVcblx0XHR9KTtcblx0fVxuXG5cdGhhbmRsZUNoYW5nZUlucHV0VmFsdWUgKCBldmVudCwgZGF0YSApIHtcblx0XHRjb25zdCB7IGlucHV0LCByb290IH0gPSB0aGlzO1xuXHRcdGlmKCBldmVudC50YXJnZXQgIT09IHRoaXMuaW5wdXQuZ2V0KCAwICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYNCe0YjQuNCx0LrQsCDQvtCx0YDQsNCx0L7RgtGH0LjQutCwINGB0L7QsdGL0YLQuNGPICR7ZXZlbnR9YCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgaW5jciA9IHRoaXMuaW5jcmVtZW50QnV0dG9uO1xuXHRcdGNvbnN0IGRlY3IgPSB0aGlzLmRlY3JlbWVudEJ1dHRvbjtcblxuXHRcdHJvb3QuYXR0ciggJ3ZhbHVlJywgZGF0YS52YWx1ZSApXG5cblx0XHRpbmNyLnRyaWdnZXJIYW5kbGVyKCBDb3VudGVyLmV2ZW50cy5DSEFOR0VfSU5DUkVNRU5UX0JVVFRPTl9TVEFURSwge1xuXHRcdFx0aW5wdXQsXG5cdFx0XHRpbmNyLFxuXHRcdFx0ZGVjclxuXHRcdH0pO1xuXG5cdFx0ZGVjci50cmlnZ2VySGFuZGxlciggQ291bnRlci5ldmVudHMuQ0hBTkdFX0RFQ1JFTUVOVF9CVVRUT05fU1RBVEUsIHtcblx0XHRcdGlucHV0LFxuXHRcdFx0aW5jcixcblx0XHRcdGRlY3Jcblx0XHR9KTtcblx0fVxuXG5cdGhhbmRsZUNoYW5nZVJvb3RWYWx1ZSAoIGV2ZW50LCBkYXRhICkge1xuXHRcdGNvbnN0IHRpdGxlID0gd29yZE9mTnVtKGRhdGEudmFsdWUsIHdvcmRzW2RhdGEuaWRdKTtcblx0XHR0aGlzLnJvb3QuYXR0ciggJ3RpdGxlJywgdGl0bGUgKTtcblx0XHR0aGlzLnJvb3QudHJpZ2dlciggQ291bnRlci5ldmVudHMuQ0hBTkdFX1JPT1RfVkFMVUUgKVxuXHR9XG5cblx0aGFuZGxlQ2hhbmdlQnV0dG9uU3RhdGUgKCBldmVudCwgZGF0YSApIHtcblx0XHRjb25zdCB2YWwgPSBwYXJzZUludChkYXRhLmlucHV0LnZhbCgpLCAxMCk7XG5cdFx0Y29uc3QgbWF4ID0gcGFyc2VJbnQoZGF0YS5pbnB1dC5hdHRyKCdtYXgnKSwgMTApO1xuXHRcdGNvbnN0IG1pbiA9IHBhcnNlSW50KGRhdGEuaW5wdXQuYXR0cignbWluJyksIDEwKTtcblxuXHRcdGlmICh2YWwgPCBtYXggJiYgdmFsID49IG1pbikge1xuXHRcdFx0cmVtb3ZlRGlzYWJsZWQoZGF0YS5pbmNyKTtcblx0XHR9XG5cblx0XHRpZiAodmFsID49IG1heCkge1xuXHRcdFx0c2V0RGlzYWJsZWQoZGF0YS5pbmNyKTtcblx0XHR9XG5cblx0XHRpZiAodmFsID4gbWluKSB7XG5cdFx0XHRyZW1vdmVEaXNhYmxlZChkYXRhLmRlY3IpO1xuXHRcdH1cblxuXHRcdGlmICh2YWwgPD0gbWluKSB7XG5cdFx0XHRzZXREaXNhYmxlZChkYXRhLmRlY3IpO1xuXHRcdH1cblx0fVxuXG5cdGFzeW5jIGhhbmRsZUNsaWNrQnV0dG9uICggZXZlbnQgKSB7XG5cdFx0Y29uc3QgZWxlbWVudCA9IGV2ZW50LnRhcmdldDtcblx0XHRjb25zdCBjbCA9IGVsZW1lbnQuY2xhc3NOYW1lO1xuXHRcdGNvbnN0IGlucHV0ID0gZWxlbWVudC5uZXh0U2libGluZyB8fCBlbGVtZW50LnByZXZpb3VzU2libGluZztcblxuXHRcdHRyeSB7XG5cdFx0XHRzd2l0Y2ggKGNsKSB7XG5cdFx0XHRcdGNhc2UgQ291bnRlci5lbGVtZW50cy5JTkNSRU1FTlQ6IHtcblx0XHRcdFx0XHRhd2FpdCBpbnB1dC5zdGVwVXAoKTtcblx0XHRcdFx0XHRhd2FpdCAkKCBpbnB1dCApLmF0dHIoICd2YWx1ZScsIGlucHV0LnZhbHVlICk7XG5cdFx0XHRcdFx0UHJvbWlzZS5yZXNvbHZlKCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjYXNlIENvdW50ZXIuZWxlbWVudHMuREVDUkVNRU5UOiB7XG5cdFx0XHRcdFx0YXdhaXQgaW5wdXQuc3RlcERvd24oKTtcblx0XHRcdFx0XHRhd2FpdCAkKCBpbnB1dCApLmF0dHIoICd2YWx1ZScsIGlucHV0LnZhbHVlICk7XG5cdFx0XHRcdFx0UHJvbWlzZS5yZXNvbHZlKCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCBg0J7RiNC40LHQutCwINC+0LHRgNCw0LHQvtGC0LrQuCDRgdC+0LHRi9GC0LjRjzogJHtldmVudH1gICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCBg0J7RiNC40LHQutCwINC+0LHRgNCw0LHQvtGC0LrQuCDRgdC+0LHRi9GC0LjRjzogJHtlbGVtZW50fSwgJHtldmVudC5vZmZzZXRYfSwgJHtldmVudC5vZmZzZXRZfWAgKTtcblx0XHR9XG5cdH1cbn1cblxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSggJ2d1ZXN0cy1jb3VudGVyJywgQ291bnRlciApO1xuZXhwb3J0IHsgQ291bnRlciB9OyIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSdcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4uL2J1dHRvbi9idXR0b24uanMnXG5pbXBvcnQgeyBDb3VudGVyIH0gZnJvbSAnLi4vY291bnRlci9jb3VudGVyJ1xuaW1wb3J0IHsgd29yZHMsIHdvcmRPZk51bSB9IGZyb20gJy4uLy4uL3V0aWxzL2pzL2luZGV4J1xuXG5jbGFzcyBEcm9wRG93biBleHRlbmRzIEhUTUxFbGVtZW50IHtcblx0c3RhdGljIGdldCBlbGVtZW50cyAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdFJPT1Q6ICdqcy1kcm9wZG93bicsXG5cdFx0XHRJTlBVVDogJ2pzLWRyb3Bkb3duX19pbnB1dCcsXG5cdFx0XHRJVEVNUzogJ2pzLWRyb3Bkb3duX19pdGVtcycsXG5cdFx0XHRST09UX09QRU5FRDogYGpzLWRyb3Bkb3duX29wZW5lZGAsXG5cdFx0XHRJTlBVVF9PUEVORUQ6IGBqcy1kcm9wZG93bl9faW5wdXRfb3BlbmVkYCxcblx0XHRcdElURU1TX09QRU5FRDogYGpzLWRyb3Bkb3duX19pdGVtc19vcGVuZWRgLFxuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBnZXQgZXZlbnRzICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Q0xJQ0tfSU5QVVQ6ICdjbGljay5kcm9wZG93bi5pbnB1dCcsXG5cdFx0XHRDSEFOR0VfUk9PVF9WQUxVRTogJ2NoYW5nZTpkcm9wZG93bjpyb290OnZhbHVlJyxcblx0XHRcdENIQU5HRV9JTlBVVF9WQUxVRTogJ2NoYW5nZTpkcm9wZG93bjppbnB1dDp2YWx1ZScsXG5cdFx0XHRUT0dHTEVfUk9PVF9PUEVORUQ6ICd0b2dnbGU6ZHJvcGRvd246cm9vdDpvcGVuZWQnLFxuXHRcdFx0VE9HR0xFX0lURU1TX09QRU5FRDogJ3RvZ2dsZTpkcm9wZG93bjppdGVtczpvcGVuZWQnLFxuXHRcdFx0VE9HR0xFX0lOUFVUX09QRU5FRDogJ3RvZ2dsZTpkcm9wZG93bjppbnB1dDpvcGVuZWQnLFxuXHRcdFx0Q0hBTkdFX1JPT1RfREFUQV9WQUxVRTogJ2NoYW5nZTpkcm9wZG93bjpyb290OnZhbHVlJyxcblx0XHRcdENIQU5HRV9ST09UX1BMQUNFSE9MREVSOiAnY2hhbmdlOmRyb3Bkb3duOnJvb3Q6cGxhY2Vob2xkZXInLFxuXHRcdFx0Q0hBTkdFX0lOUFVUX1BMQUNFSE9MREVSOiAnY2hhbmdlOmRyb3Bkb3duOmlucHV0OnBsYWNlaG9sZGVyJyxcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcyAoKSB7XG5cdFx0cmV0dXJuIFsgJ3ZhbHVlJywgJ2NsYXNzJywgJ2FyaWEtZXhwYW5kZWQnLCAncGxhY2Vob2xkZXInLCAnZGF0YS12YWx1ZXMnIF1cblx0fVxuXG5cdGNvbnN0cnVjdG9yICgpIHtcblx0XHRzdXBlcigpXG5cblx0XHRjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCB0aGlzLm5vZGVOYW1lIClcblx0XHRjb25zdCB0ZW1wbGF0ZUNvbnRlbnQgPSB0ZW1wbGF0ZS5jb250ZW50XG5cdFx0dGhpcy5hdHRhY2hTaGFkb3coIHsgbW9kZTogJ29wZW4nIH0gKS5hcHBlbmRDaGlsZCggdGVtcGxhdGVDb250ZW50LmNsb25lTm9kZSggdHJ1ZSApIClcblx0XHR0aGlzLmVsZW1lbnRzID0gRHJvcERvd24uZWxlbWVudHNcblx0XHR0aGlzLnJvb3QgPSAkKCBgLiR7IERyb3BEb3duLmVsZW1lbnRzLlJPT1QgfSMke3RoaXMuaWR9YCApXG5cdFx0dGhpcy5pdGVtcyA9IHRoaXMucm9vdC5maW5kKCBgLiR7IERyb3BEb3duLmVsZW1lbnRzLklURU1TIH1gIClcblx0XHR0aGlzLmlucHV0ID0gdGhpcy5yb290LmZpbmQoIGAuJHsgRHJvcERvd24uZWxlbWVudHMuSU5QVVQgfWAgKVxuXHRcdHRoaXMuYXJyb3dCdXR0b24gPSB0aGlzLnJvb3QuZmluZCggYC4keyBCdXR0b24uZWxlbWVudHMuQVJST1cgfWAgKVxuXHRcdHRoaXMuaW5wdXRFdmVudHMgPSB0aGlzLmlucHV0RXZlbnRzLmJpbmQoIHRoaXMgKVxuXHRcdHRoaXMuaXRlbXNFdmVudHMgPSB0aGlzLml0ZW1zRXZlbnRzLmJpbmQoIHRoaXMgKVxuXHRcdHRoaXMuaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrLmJpbmQoIHRoaXMgKVxuXHRcdHRoaXMudG9nZ2xlT3BlbmVkID0gdGhpcy50b2dnbGVPcGVuZWQuYmluZCggdGhpcyApXG5cdFx0dGhpcy5hcnJvd0J1dHRvbkV2ZW50cyA9IHRoaXMuYXJyb3dCdXR0b25FdmVudHMuYmluZCggdGhpcyApXG5cdFx0dGhpcy5oYW5kbGVLZXlQcmVzcyA9IHRoaXMuaGFuZGxlS2V5UHJlc3MuYmluZCggdGhpcyApXG5cdFx0dGhpcy5yb290RXZlbnRzID0gdGhpcy5yb290RXZlbnRzLmJpbmQoIHRoaXMgKVxuXHR9XG5cblx0Y29ubmVjdGVkQ2FsbGJhY2sgKCkge1xuXHRcdHRoaXMuaXRlbXNFdmVudHMoKVxuXHRcdHRoaXMuaW5wdXRFdmVudHMoKVxuXHRcdHRoaXMuYXJyb3dCdXR0b25FdmVudHMoKVxuXHRcdHRoaXMucm9vdEV2ZW50cygpXG5cdH1cblxuXHRkaXNjb25uZWN0ZWRDYWxsYmFjayAoKSB7XG5cdFx0dGhpcy5pbnB1dC5vZmYoICdjbGljay5kcm9wZG93bi5pbnB1dCcgKVxuXHRcdHRoaXMuaW5wdXQub2ZmKCAndG9nZ2xlOmRyb3Bkb3duOmlucHV0Om9wZW5lZCcgKVxuXHRcdHRoaXMuaXRlbXMub2ZmKCAndG9nZ2xlOmRyb3Bkb3duOml0ZW1zOm9wZW5lZCcgKVxuXHRcdHRoaXMuYXJyb3dCdXR0b24ub2ZmKCAnY2xpY2suYXJyb3ctYnV0dG9uLmRyb3Bkb3duJyApXG5cdFx0dGhpcy5hcnJvd0J1dHRvbi5vZmYoICd0b2dnbGUuZHJvcGRvd24uYXJyb3ctYnV0dG9uLm9wZW5lZCcgKVxuXHR9XG5cblx0Z2V0R3Vlc3RzSW5wdXRTdHJpbmcgKCkge1xuXHRcdGxldCBndWVzdHMgPSAwXG5cdFx0bGV0IGJhYnlzID0gMFxuXHRcdGNvbnN0IGVsZW1lbnRzID0gdGhpcy5yb290LmZpbmQoIGAuJHsgQ291bnRlci5lbGVtZW50cy5ST09UIH1gIClcblx0XHRlbGVtZW50cy5lYWNoKCAoIGluZGV4ICkgPT4ge1xuXHRcdFx0Y29uc3QgaWQgPSAkKCBlbGVtZW50c1sgaW5kZXggXSApLmF0dHIoICduYW1lJyApXG5cdFx0XHRsZXQgdmFsdWUgPSAkKCBlbGVtZW50c1sgaW5kZXggXSApLmF0dHIoICd2YWx1ZScgKVxuXHRcdFx0aWYgKCBpZCA9PT0gXCLQstC30YDQvtGB0LvRi9C1XCIgKSB7XG5cdFx0XHRcdGd1ZXN0cyArPSBwYXJzZUludCggdmFsdWUsIDEwIClcblx0XHRcdH1cblx0XHRcdGlmICggaWQgPT09IFwi0LTQtdGC0LhcIiApIHtcblx0XHRcdFx0Z3Vlc3RzICs9IHBhcnNlSW50KCB2YWx1ZSwgMTAgKVxuXHRcdFx0fVxuXHRcdFx0aWYgKCBpZCA9PT0gXCLQvNC70LDQtNC10L3RhtGLXCIgKSB7XG5cdFx0XHRcdGJhYnlzICs9IHBhcnNlSW50KCB2YWx1ZSwgMTAgKVxuXHRcdFx0fVxuXHRcdH0gKVxuXHRcdGlmICggZ3Vlc3RzIDw9IDAgKSB7XG5cdFx0XHRyZXR1cm4gJ9Ch0LrQvtC70YzQutC+INCz0L7RgdGC0LXQuSdcblx0XHR9XG5cdFx0aWYgKCBndWVzdHMgPiAwICYmIGJhYnlzID4gMCApIHtcblx0XHRcdGNvbnN0IHN0cmluZ0d1ZXN0cyA9IHdvcmRPZk51bSggZ3Vlc3RzLCB3b3Jkc1sgJ9Cz0L7RgdGC0LgnIF0gKVxuXHRcdFx0Y29uc3Qgc3RyaW5nQmFieXMgPSB3b3JkT2ZOdW0oIGJhYnlzLCB3b3Jkc1sgJ9C80LvQsNC00LXQvdGG0YsnIF0gKVxuXHRcdFx0cmV0dXJuIGAkeyBndWVzdHMgfSAkeyBzdHJpbmdHdWVzdHMgfSwgJHsgYmFieXMgfSAkeyBzdHJpbmdCYWJ5cyB9YFxuXHRcdH1cblx0XHRpZiAoIGd1ZXN0cyA+IDAgJiYgYmFieXMgPD0gMCApIHtcblx0XHRcdGNvbnN0IHN0cmluZ0d1ZXN0cyA9IHdvcmRPZk51bSggZ3Vlc3RzLCB3b3Jkc1sgJ9Cz0L7RgdGC0LgnIF0gKVxuXHRcdFx0cmV0dXJuIGAkeyBndWVzdHMgfSAkeyBzdHJpbmdHdWVzdHMgfWBcblx0XHR9XG5cdH1cblxuXHRzZXRJbnB1dFN0cmluZyAoIGV2ZW50ICkge1xuXHRcdGxldCByZXN1bHRTdHJpbmcgPSBcIlwiXG5cdFx0Y29uc3Qgbm9kZSA9IGV2ZW50LnRhcmdldC5ub2RlTmFtZVxuXHRcdHN3aXRjaCAoIG5vZGUgKSB7XG5cdFx0XHRjYXNlICdHVUVTVFMtQ09VTlRFUic6XG5cdFx0XHRcdHJlc3VsdFN0cmluZyA9IHRoaXMuZ2V0R3Vlc3RzSW5wdXRTdHJpbmcoKVxuXHRcdFx0XHR0aGlzLmlucHV0LmF0dHIoICd2YWx1ZScsIHJlc3VsdFN0cmluZyApXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRicmVha1xuXHRcdH1cblx0fVxuXG5cdHJvb3RFdmVudHMgKCkge1xuXHRcdCQoIHRoaXMucm9vdCApLm9uKFxuXHRcdFx0Q291bnRlci5ldmVudHMuQ0hBTkdFX1JPT1RfVkFMVUUsXG5cdFx0XHRgLiR7IENvdW50ZXIuZWxlbWVudHMuUk9PVCB9YCxcblx0XHRcdCggZXZlbnQgKSA9PiB7XG5cdFx0XHRcdGNvbnN0IHRhcmdldCA9ICQoIGV2ZW50LnRhcmdldCApXG5cdFx0XHRcdGNvbnNvbGUubG9nKCBgVmFsdWU6ICR7IHRhcmdldC5hdHRyKCAndmFsdWUnICkgfSBcXG4gVGl0bGU6ICR7IHRhcmdldC5hdHRyKCAndGl0bGUnICkgfWAgKVxuXHRcdFx0XHR0aGlzLnNldElucHV0U3RyaW5nKCBldmVudCApXG5cdFx0XHR9XG5cdFx0KVxuXHR9XG5cblx0YXR0cmlidXRlQ2hhbmdlZENhbGxCYWNrICggdmFsdWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSApIHtcblx0XHRjb25zb2xlLmxvZyggYERyb3Bkb3duIGF0dHJpYnV0ZSBjaGFuZ2VkOiBcXG4gRWxlbWVudDogJHsgdmFsdWUgfSBcXG4gb2xkdmFsdWUgJHsgb2xkVmFsdWUgfSBcXG4gbmV3VmFsdWUgJHsgbmV3VmFsdWUgfWAgKVxuXHR9XG5cblx0YXJpYUV4cGFuZGVkVG9nZ2xlICggZWxlbSApIHtcblx0XHRjb25zdCB2YWx1ZSA9IGVsZW0uYXR0ciggJ2FyaWEtZXhwYW5kZWQnIClcblx0XHRzd2l0Y2ggKCB2YWx1ZSApIHtcblx0XHRcdGNhc2UgJ2ZhbHNlJzpcblx0XHRcdFx0ZWxlbS5hdHRyKCAnYXJpYS1leHBhbmRlZCcsICd0cnVlJyApXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICd0cnVlJzpcblx0XHRcdFx0ZWxlbS5hdHRyKCAnYXJpYS1leHBhbmRlZCcsICdmYWxzZScgKVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAndW5kZWZpbmVkJzpcblx0XHRcdFx0ZWxlbS5hdHRyKCAnYXJpYS1leHBhbmRlZCcsICd0cnVlJyApXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRicmVha1xuXHRcdH1cblx0fVxuXG5cdGhhbmRsZUNsaWNrICgpIHtcblx0XHR0aGlzLml0ZW1zLnRyaWdnZXIoICd0b2dnbGU6ZHJvcGRvd246aXRlbXM6b3BlbmVkJyApXG5cdFx0dGhpcy5pbnB1dC50cmlnZ2VyKCAndG9nZ2xlOmRyb3Bkb3duOmlucHV0Om9wZW5lZCcgKVxuXHRcdHRoaXMuYXJyb3dCdXR0b24udHJpZ2dlciggJ3RvZ2dsZS5kcm9wZG93bi5hcnJvdy1idXR0b24ub3BlbmVkJyApXG5cdH1cblxuXHRoYW5kbGVLZXlQcmVzcyAoIGV2ZW50ICkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuXHRcdGNvbnN0IGtleSA9IGV2ZW50LndoaWNoXG5cdFx0c3dpdGNoICgga2V5ICkge1xuXHRcdFx0Y2FzZSAzMjpcblx0XHRcdFx0dGhpcy5pdGVtcy50cmlnZ2VyKCAndG9nZ2xlOmRyb3Bkb3duOml0ZW1zOm9wZW5lZCcgKVxuXHRcdFx0XHR0aGlzLmlucHV0LnRyaWdnZXIoICd0b2dnbGU6ZHJvcGRvd246aW5wdXQ6b3BlbmVkJyApXG5cdFx0XHRcdHRoaXMuYXJyb3dCdXR0b24udHJpZ2dlciggJ3RvZ2dsZS5kcm9wZG93bi5hcnJvdy1idXR0b24ub3BlbmVkJyApXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRicmVha1xuXHRcdH1cblx0fVxuXG5cdHRvZ2dsZU9wZW5lZCAoIGV2ZW50ICkge1xuXHRcdGNvbnN0IGVsZW0gPSAkKCBldmVudC50YXJnZXQgKVxuXHRcdGNvbnN0IGNscyA9IGVsZW0uYXR0ciggJ2NsYXNzJyApLnNwbGl0KCAnICcgKVxuXHRcdHN3aXRjaCAoICggKCBjbHNbIDEgXSB8fCBjbHNbIDAgXSApIHx8ICggY2xzWyAxIF0gJiYgY2xzWyAwIF0gKSApLnJlcGxhY2UoICdfb3BlbmVkJywgJycgKSApIHtcblx0XHRcdGNhc2UgJ2pzLWRyb3Bkb3duX19pdGVtcyc6XG5cdFx0XHRcdGVsZW0udG9nZ2xlQ2xhc3MoICdqcy1kcm9wZG93bl9faXRlbXNfb3BlbmVkJyApXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICdqcy1kcm9wZG93bl9faW5wdXQnOlxuXHRcdFx0XHRlbGVtLnRvZ2dsZUNsYXNzKCAnanMtZHJvcGRvd25fX2lucHV0X29wZW5lZCcgKVxuXHRcdFx0XHR0aGlzLmFyaWFFeHBhbmRlZFRvZ2dsZSggZWxlbSApXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICdqcy1idXR0b24taWNvbl9fYXJyb3dfY29sb3JfZ3JheSc6XG5cdFx0XHRcdGVsZW0uZ2V0KCAwICkudG9nZ2xlQXR0cmlidXRlKCBcInByZXNzZWRcIiApXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRicmVha1xuXHRcdH1cblx0fVxuXG5cdGl0ZW1zRXZlbnRzICgpIHtcblx0XHR0aGlzLml0ZW1zLm9uKCB7XG5cdFx0XHQndG9nZ2xlOmRyb3Bkb3duOml0ZW1zOm9wZW5lZCc6IHRoaXMudG9nZ2xlT3BlbmVkXG5cdFx0fSApXG5cdH1cblxuXHRpbnB1dEV2ZW50cyAoKSB7XG5cdFx0dGhpcy5pbnB1dC5vbigge1xuXHRcdFx0a2V5cHJlc3M6IHRoaXMuaGFuZGxlS2V5UHJlc3MsXG5cdFx0XHQnY2xpY2suZHJvcGRvd24uaW5wdXQnOiB0aGlzLmhhbmRsZUNsaWNrLFxuXHRcdFx0J3RvZ2dsZTpkcm9wZG93bjppbnB1dDpvcGVuZWQnOiB0aGlzLnRvZ2dsZU9wZW5lZCxcblx0XHR9IClcblx0XHR0aGlzLmlucHV0Lm9uKCAnY2hhbmdlJywgJ2pzLWNvdW50ZXJfX2lucHV0X2hpZGRlbicsIGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2coICdpbSBjaGFuZ2VkJyApIH0gKVxuXHR9XG5cblx0YXJyb3dCdXR0b25FdmVudHMgKCkge1xuXHRcdHRoaXMuYXJyb3dCdXR0b24ub24oIHtcblx0XHRcdCdjbGljay5hcnJvdy1idXR0b24uZHJvcGRvd24nOiB0aGlzLmhhbmRsZUNsaWNrLFxuXHRcdFx0J3RvZ2dsZS5kcm9wZG93bi5hcnJvdy1idXR0b24ub3BlbmVkJzogdGhpcy50b2dnbGVPcGVuZWRcblx0XHR9IClcblx0fVxufVxuXG5jbGFzcyBEcm9wRG93bldpdGhCdXR0b25zIGV4dGVuZHMgRHJvcERvd24ge1xuXG5cdHN0YXRpYyBnZXQgZWxlbWVudHMgKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRST09UOiAnZHJvcC1kb3duLXdpdGgtYnV0dG9ucycsXG5cdFx0XHRGT09URVJfQlVUVE9OUzogJ2pzLWRyb3Bkb3duX19mb290ZXItYnV0dG9ucycsXG5cdFx0XHRSRVNFVF9CVVRUT046ICdqcy1kcm9wZG93bl9fcmVzZXQtYnV0dG9uJyxcblx0XHRcdEFDQ0VQVF9CVVRUT046ICdqcy1kcm9wZG93bl9fYWNjZXB0LWJ1dHRvbidcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgZ2V0IGV2ZW50cyAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdEZPT1RFUl9CVVRUT05TX0lOSVQ6ICdpbml0OmRyb3Bkb3duOmZvb3Rlci1idXR0b25zJyxcblx0XHRcdEZPT1RFUl9CVVRUT05TX1RPR0dMRV9ESVNBQkxFRDogJ3RvZ2dsZTpkaXNhYmxlZDpkcm9wZG93bjpmb290ZXItYnV0dG9ucycsXG5cdFx0XHRSRVNFVF9CVVRUT05fVE9HR0xFX0RJU0FCTEVEOiAndG9nZ2xlOmRpc2FibGVkOmRyb3Bkb3duOnJlc2V0LWJ1dHRvbicsXG5cdFx0XHRSRVNFVF9CVVRUT05fQ0xJQ0s6ICdjbGljay5kcm9wZG93bjpyZXNldC1idXR0b24nLFxuXHRcdFx0QUNDRVBUX0JVVFRPTl9DTElDSzogJ2NsaWNrLmRyb3Bkb3duOmFjY2VwdC1idXR0b24nLFxuXHRcdH1cblx0fVxuXG5cdGNvbnN0cnVjdG9yICgpIHtcblx0XHRzdXBlcigpXG5cdFx0c3VwZXIucm9vdEV2ZW50cygpXG5cdFx0Ly8gdGhpcy5yb290ID0gJCggRHJvcERvd25XaXRoQnV0dG9ucy5lbGVtZW50cy5ST09UIClcblx0XHR0aGlzLmZvb3RlckJ1dHRvbnMgPSB0aGlzLnJvb3QuZmluZCggYC4keyBEcm9wRG93bldpdGhCdXR0b25zLmVsZW1lbnRzLkZPT1RFUl9CVVRUT05TIH1gIClcblx0XHR0aGlzLnJlc2V0QnV0dG9uID0gdGhpcy5yb290LmZpbmQoIGAuJHsgRHJvcERvd25XaXRoQnV0dG9ucy5lbGVtZW50cy5SRVNFVF9CVVRUT04gfWAgKVxuXHRcdHRoaXMuYWNjZXB0QnV0dG9uID0gdGhpcy5yb290LmZpbmQoIGAuJHsgRHJvcERvd25XaXRoQnV0dG9ucy5lbGVtZW50cy5BQ0NFUFRfQlVUVE9OIH1gIClcblx0XHR0aGlzLm15Um9vdEV2ZW50cyA9IHRoaXMubXlSb290RXZlbnRzLmJpbmQoIHRoaXMgKVxuXHRcdHRoaXMuZm9vdGVyQnV0dG9uc0V2ZW50cyA9IHRoaXMuZm9vdGVyQnV0dG9uc0V2ZW50cy5iaW5kKCB0aGlzIClcblx0XHR0aGlzLnJlc2V0QnV0dG9uRXZlbnRzID0gdGhpcy5yZXNldEJ1dHRvbkV2ZW50cy5iaW5kKCB0aGlzIClcblx0XHR0aGlzLmFjY2VwdEJ1dHRvbkV2ZW50cyA9IHRoaXMuYWNjZXB0QnV0dG9uRXZlbnRzLmJpbmQodGhpcyk7XG5cdH1cblxuXHRjb25uZWN0ZWRDYWxsYmFjayAoKSB7XG5cdFx0c3VwZXIuaXRlbXNFdmVudHMoKVxuXHRcdHN1cGVyLmlucHV0RXZlbnRzKClcblx0XHRzdXBlci5hcnJvd0J1dHRvbkV2ZW50cygpXG5cdFx0dGhpcy5teVJvb3RFdmVudHMoKVxuXHRcdHRoaXMuZm9vdGVyQnV0dG9uc0V2ZW50cygpXG5cdFx0dGhpcy5mb290ZXJCdXR0b25zLnRyaWdnZXIoIERyb3BEb3duV2l0aEJ1dHRvbnMuZXZlbnRzLkZPT1RFUl9CVVRUT05TX0lOSVQgKVxuXHRcdHRoaXMucmVzZXRCdXR0b25FdmVudHMoKVxuXHRcdHRoaXMucmVzZXRCdXR0b24udHJpZ2dlciggRHJvcERvd25XaXRoQnV0dG9ucy5ldmVudHMuUkVTRVRfQlVUVE9OX1RPR0dMRV9ESVNBQkxFRCApXG5cdFx0dGhpcy5hY2NlcHRCdXR0b25FdmVudHMoKTtcblx0fVxuXG5cdG15Um9vdEV2ZW50cyAoKSB7XG5cdFx0JCggdGhpcy5yb290ICkub24oXG5cdFx0XHREcm9wRG93bi5ldmVudHMuVE9HR0xFX0lURU1TX09QRU5FRCxcblx0XHRcdGAuJHsgRHJvcERvd24uZWxlbWVudHMuSVRFTVMgfWAsXG5cdFx0XHQoIGV2ZW50ICkgPT4ge1xuXHRcdFx0XHR0aGlzLmZvb3RlckJ1dHRvbnMudHJpZ2dlciggRHJvcERvd25XaXRoQnV0dG9ucy5ldmVudHMuRk9PVEVSX0JVVFRPTlNfVE9HR0xFX0RJU0FCTEVEIClcblx0XHRcdH1cblx0XHQpXG5cblx0XHQkKCB0aGlzLnJvb3QgKS5vbihcblx0XHRcdENvdW50ZXIuZXZlbnRzLkNIQU5HRV9ST09UX1ZBTFVFLFxuXHRcdFx0YC4keyBDb3VudGVyLmVsZW1lbnRzLlJPT1QgfWAsXG5cdFx0XHQoIGV2ZW50ICkgPT4ge1xuXHRcdFx0XHR0aGlzLnJlc2V0QnV0dG9uLnRyaWdnZXIoIERyb3BEb3duV2l0aEJ1dHRvbnMuZXZlbnRzLlJFU0VUX0JVVFRPTl9UT0dHTEVfRElTQUJMRUQgKVxuXHRcdFx0fVxuXHRcdClcblx0fVxuXG5cdGZvb3RlckJ1dHRvbnNFdmVudHMgKCkge1xuXHRcdHRoaXMuZm9vdGVyQnV0dG9ucy5vbihcblx0XHRcdERyb3BEb3duV2l0aEJ1dHRvbnMuZXZlbnRzLkZPT1RFUl9CVVRUT05TX0lOSVQsXG5cdFx0XHQoIGV2ZW50ICkgPT4ge1xuXHRcdFx0XHRpZiAoIHRoaXMuZm9vdGVyQnV0dG9ucy5hdHRyKCAnZGlzYWJsZWQnICkgKSB7XG5cdFx0XHRcdFx0cmV0dXJuXG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5mb290ZXJCdXR0b25zLmdldCggMCApLnNldEF0dHJpYnV0ZSggXCJkaXNhYmxlZFwiLCBcIlwiIClcblx0XHRcdH1cblx0XHQpXG5cblx0XHR0aGlzLmZvb3RlckJ1dHRvbnMub24oXG5cdFx0XHREcm9wRG93bldpdGhCdXR0b25zLmV2ZW50cy5GT09URVJfQlVUVE9OU19UT0dHTEVfRElTQUJMRUQsXG5cdFx0XHQoIGV2ZW50ICkgPT4ge1xuXHRcdFx0XHRpZiAoIHRoaXMuZm9vdGVyQnV0dG9ucy5nZXQoIDAgKS5nZXRBdHRyaWJ1dGUoICdkaXNhYmxlZCcgKSAhPSBudWxsICkge1xuXHRcdFx0XHRcdHRoaXMuZm9vdGVyQnV0dG9ucy5nZXQoIDAgKS5yZW1vdmVBdHRyaWJ1dGUoIFwiZGlzYWJsZWRcIiApXG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5mb290ZXJCdXR0b25zLmdldCggMCApLnNldEF0dHJpYnV0ZSggXCJkaXNhYmxlZFwiLCBcIlwiIClcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdClcblx0fVxuXG5cdHJlc2V0QnV0dG9uRXZlbnRzICgpIHtcblx0XHR0aGlzLnJlc2V0QnV0dG9uLm9uKFxuXHRcdFx0RHJvcERvd25XaXRoQnV0dG9ucy5ldmVudHMuUkVTRVRfQlVUVE9OX1RPR0dMRV9ESVNBQkxFRCxcblx0XHRcdCggZXZlbnQgKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGlucHV0ID0gdGhpcy5pbnB1dFxuXHRcdFx0XHRjb25zdCByZXNldEJ1dHRvbiA9IHRoaXMucmVzZXRCdXR0b24uZ2V0KDApXG5cdFx0XHRcdGlmICggaW5wdXQudmFsKCkgPT09ICfQodC60L7Qu9GM0LrQviDQs9C+0YHRgtC10LknICkge1xuXHRcdFx0XHRcdGlmICggcmVzZXRCdXR0b24uZ2V0QXR0cmlidXRlKCAnZGlzYWJsZWQnICkgIT0gbnVsbCApIHtcblx0XHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXNldEJ1dHRvbi5zZXRBdHRyaWJ1dGUoIFwiZGlzYWJsZWRcIiwgXCJcIiApXG5cdFx0XHRcdFx0cmV0dXJuXG5cdFx0XHRcdH1cblx0XHRcdFx0cmVzZXRCdXR0b24ucmVtb3ZlQXR0cmlidXRlKCBcImRpc2FibGVkXCIgKVxuXHRcdFx0fVxuXHRcdClcblxuXHRcdHRoaXMucmVzZXRCdXR0b24ub24oXG5cdFx0XHREcm9wRG93bldpdGhCdXR0b25zLmV2ZW50cy5SRVNFVF9CVVRUT05fQ0xJQ0ssXG5cdFx0XHQoIGV2ZW50ICkgPT4ge1xuXHRcdFx0XHRjb25zdCBjb3VudGVycyA9IHRoaXMucm9vdC5maW5kKGAuJHtDb3VudGVyLmVsZW1lbnRzLkhJRERFTn1gKTtcblx0XHRcdFx0Y291bnRlcnMuZWFjaChmdW5jdGlvbigpe1xuXHRcdFx0XHRcdHZhciBlbGVtID0gJCh0aGlzKTtcblx0XHRcdFx0XHR0aGlzLnZhbHVlID0gMTtcblx0XHRcdFx0XHRlbGVtLmF0dHIoICd2YWx1ZScsIDEgKTtcblx0XHRcdFx0XHRlbGVtLnRyaWdnZXIoIENvdW50ZXIuZXZlbnRzLkNIQU5HRV9JTlBVVF9WQUxVRSwgeyB2YWx1ZTogMSB9ICk7XG5cdFx0XHRcdFx0JCh0aGlzLnByZXZpb3VzU2libGluZykudHJpZ2dlcihDb3VudGVyLmV2ZW50cy5DTElDS19ERUNSRU1FTlRfQlVUVE9OKVxuXHRcdFx0XHR9KVxuXHRcdFx0XHR0aGlzLnJlc2V0QnV0dG9uLnRyaWdnZXIoRHJvcERvd25XaXRoQnV0dG9ucy5ldmVudHMuUkVTRVRfQlVUVE9OX1RPR0dMRV9ESVNBQkxFRClcblx0XHRcdH1cblx0XHQpXG5cdH1cblxuXHRhY2NlcHRCdXR0b25FdmVudHMgKCkge1xuXHRcdCQodGhpcy5hY2NlcHRCdXR0b24uZmluZCgnYnV0dG9uJykpLm9uKFxuXHRcdFx0RHJvcERvd25XaXRoQnV0dG9ucy5ldmVudHMuQUNDRVBUX0JVVFRPTl9DTElDSyxcblx0XHRcdCgpPT57XG5cdFx0XHRcdHRoaXMuaXRlbXMudHJpZ2dlciggJ3RvZ2dsZTpkcm9wZG93bjppdGVtczpvcGVuZWQnIClcblx0XHRcdFx0dGhpcy5pbnB1dC50cmlnZ2VyKCAndG9nZ2xlOmRyb3Bkb3duOmlucHV0Om9wZW5lZCcgKVxuXHRcdFx0XHR0aGlzLmFycm93QnV0dG9uLnRyaWdnZXIoICd0b2dnbGUuZHJvcGRvd24uYXJyb3ctYnV0dG9uLm9wZW5lZCcgKVxuXHRcdFx0fVxuXHRcdClcblx0fVxuXG59XG5cbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoICdkcm9wLWRvd24nLCBEcm9wRG93biApXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCAnZHJvcC1kb3duLXdpdGgtYnV0dG9ucycsIERyb3BEb3duV2l0aEJ1dHRvbnMgKVxuZXhwb3J0IHsgRHJvcERvd24sIERyb3BEb3duV2l0aEJ1dHRvbnMgfSIsImltcG9ydCBcIi4vaW5kZXguc2Nzc1wiO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvZHJvcGRvd24vZHJvcGRvd24uanMnO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvY291bnRlci9jb3VudGVyLmpzJztcbmltcG9ydCAnLi9jb21wb25lbnRzL2J1dHRvbi9idXR0b24uanMnO1xuXG4iLCJjb25zdCAkID0gcmVxdWlyZSggJ2pxdWVyeScgKTtcblxuZnVuY3Rpb24gZ2V0RGlzYWJsZWQgKCBlbGVtZW50ICkge1xuXHRyZXR1cm4gJChlbGVtZW50KS5hdHRyKCdkaXNhYmxlZCcpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVEaXNhYmxlZCAoIGVsZW1lbnQgKSB7XG5cdGNvbnN0IGRpc2FibGVkID0gZ2V0RGlzYWJsZWQoZWxlbWVudCk7XG5cdGlmIChkaXNhYmxlZCAhPT0gJ2Rpc2FibGVkJykge1xuXHRcdHJldHVybjtcblx0fVxuXHRlbGVtZW50LnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG59XG5cbmZ1bmN0aW9uIHNldERpc2FibGVkICggZWxlbWVudCApIHtcblx0Y29uc3QgZGlzYWJsZWQgPSBnZXREaXNhYmxlZChlbGVtZW50KTtcblx0aWYgKGRpc2FibGVkID09PSAnZGlzYWJsZWQnKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdCQoZWxlbWVudCkuYXR0cignZGlzYWJsZWQnLCAnJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBnZXREaXNhYmxlZCwgcmVtb3ZlRGlzYWJsZWQsIHNldERpc2FibGVkIH07IiwiLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWV4cHJlc3Npb25zICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZG9tUmVhZHkgKCBmbjEsIGZuMiApIHtcblx0dHJ5IHtcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdyZWFkeXN0YXRlY2hhbmdlJywgKGV2ZW50KSA9PiB7XG5cdFx0XHRpZiAoZXZlbnQudGFyZ2V0LnJlYWR5U3RhdGUgPT09ICdpbnRlcmFjdGl2ZScpIHtcblx0XHRcdFx0Zm4xO1xuXHRcdFx0fSBlbHNlIGlmIChldmVudC50YXJnZXQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuXHRcdFx0XHRmbjI7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdEb2N1bWVudCBub3QgbG9hZGVkJyk7XG5cdH1cbn0iLCJpbXBvcnQgeyBkb21SZWFkeSB9IGZyb20gJy4vZG9tUmVhZHknO1xuaW1wb3J0IHsgc2xlZXAgfSBmcm9tICcuL3NsZWVwJztcbmltcG9ydCB7IHdvcmRPZk51bSwgd29yZHMgfSBmcm9tICcuL21vcnBoJztcbmltcG9ydCB7IGdldERpc2FibGVkLCBzZXREaXNhYmxlZCwgcmVtb3ZlRGlzYWJsZWQgfSBmcm9tICcuL2Rpc2FibGVkJztcblxuZXhwb3J0IHtcblx0ZG9tUmVhZHksIHNsZWVwLCB3b3JkT2ZOdW0sIHdvcmRzLCBnZXREaXNhYmxlZCwgc2V0RGlzYWJsZWQsIHJlbW92ZURpc2FibGVkXG59O1xuIiwiZXhwb3J0IGZ1bmN0aW9uIHdvcmRPZk51bShudW1iZXIsIHdvcmRzKSB7XG5cdGNvbnN0IGNhc2VzID0gWzIsIDAsIDEsIDEsIDEsIDJdO1xuXHRyZXR1cm4gd29yZHNbKG51bWJlciAlIDEwMCA+IDQgJiYgbnVtYmVyICUgMTAwIDwgMjApID8gMiA6IGNhc2VzWyhudW1iZXIgJSAxMCA8IDUpID8gbnVtYmVyICUgMTAgOiA1XV07XG59XG5cbmV4cG9ydCBjb25zdCB3b3JkcyA9IHtcblx00LzQu9Cw0LTQtdC90YbRizogWyfQvNC70LDQtNC10L3QtdGGJywgJ9C80LvQsNC00LXQvdGG0LAnLCAn0LzQu9Cw0LTQtdC90YbQtdCyJ10sXG5cdNCy0LfRgNC+0YHQu9GL0LU6IFsn0LPQvtGB0YLQuCcsICfQs9C+0YHRgtC4JywgJ9Cz0L7RgdGC0LgnXSxcblx00LTQtdGC0Lg6IFsn0LPQvtGB0YLQuCcsICfQs9C+0YHRgtC4JywgJ9Cz0L7RgdGC0LgnXSxcblx00LPQvtGB0YLQuDogWyfQs9C+0YHRgtGMJywgJ9Cz0L7RgdGC0Y8nLCAn0LPQvtGB0YLQtdC5J10sXG5cdNGB0L/QsNC70YzQvdC4OiBbJ9GB0L/QsNC70YzQvdGPJywgJ9GB0L/QsNC70YzQvdC4JywgJ9GB0L/QsNC70LXQvSddLFxuXHTQutC+0LzQvdCw0YLRizogWyfQutC+0LzQvdCw0YLQsCcsICfQutC+0LzQvdCw0YLRiycsICfQutC+0LzQvdCw0YInXSxcblx00LLRi9C90L3Ri9C1OiBbJ9Cy0LDQvdC90LAnLCAn0LLQsNC90L3RiycsICfQstCw0L3QvSddLFxuXHTQutGA0L7QstCw0YLQuDogWyfQutGA0L7QstCw0YLRjCcsICfQutGA0L7QstCw0YLQuCcsICfQutGA0L7QstCw0YLQtdC5J10sXG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvbWlzZS1leGVjdXRvci1yZXR1cm4gKi9cbmFzeW5jIGZ1bmN0aW9uIHNsZWVwKG1zKSB7XG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xufVxuXG5leHBvcnQgeyBzbGVlcCB9O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IGZ1bmN0aW9uKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgY2h1bmtJZHMgPSBkZWZlcnJlZFtpXVswXTtcblx0XHR2YXIgZm4gPSBkZWZlcnJlZFtpXVsxXTtcblx0XHR2YXIgcHJpb3JpdHkgPSBkZWZlcnJlZFtpXVsyXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoZnVuY3Rpb24oa2V5KSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSk7IH0pKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiaW5kZXhcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSBmdW5jdGlvbihjaHVua0lkKSB7IHJldHVybiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDA7IH07XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gZnVuY3Rpb24ocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpIHtcblx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcblx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcblx0dmFyIHJ1bnRpbWUgPSBkYXRhWzJdO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoZnVuY3Rpb24oaWQpIHsgcmV0dXJuIGluc3RhbGxlZENodW5rc1tpZF0gIT09IDA7IH0pKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua3RveGluXCJdID0gc2VsZltcIndlYnBhY2tDaHVua3RveGluXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxuX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfaW50ZXJuX2Jyb3dzZXJfaW50ZXJuX2pzLW5vZGVfbW9kdWxlc19qcXVlcnlfZGlzdF9qcXVlcnlfanNcIl0sIGZ1bmN0aW9uKCkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vbm9kZV9tb2R1bGVzL2ludGVybi9icm93c2VyL2ludGVybi5qc1wiKTsgfSlcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfaW50ZXJuX2Jyb3dzZXJfaW50ZXJuX2pzLW5vZGVfbW9kdWxlc19qcXVlcnlfZGlzdF9qcXVlcnlfanNcIl0sIGZ1bmN0aW9uKCkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpOyB9KVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6WyIkIiwiQnV0dG9uIiwiSFRNTEJ1dHRvbkVsZW1lbnQiLCJvYnNlcnZlZEF0dHJpYnV0ZXMiLCJnZXRSb290UHJvcHMiLCJyb290IiwiZWxlbWVudHMiLCJBUlJPVyIsIlRFWFQiLCJldmVudHMiLCJDTElDS19BUlJPVyIsIkNMSUNLX1RFWFRfUkVTRVQiLCJDTElDS19URVhUX0FDQ0VQVCIsIlRPR0dMRV9URVhUX1JFU0VUIiwiY29uc3RydWN0b3IiLCJjb25uZWN0ZWRDYWxsQmFjayIsImRpc2Nvbm5lY3RlZENhbGxCYWNrIiwiYXR0cmlidXRlc0NoYW5nZWRDYWxsYmFjayIsImVsZW1lbnQiLCJvbGRWYWx1ZSIsIm5ld1ZhbHVlIiwiY29uc29sZSIsImluZm8iLCJCdXR0b25JY29uIiwiQnV0dG9uVGV4dCIsIndpbmRvdyIsImN1c3RvbUVsZW1lbnRzIiwiZGVmaW5lIiwiZXh0ZW5kcyIsInJlcXVpcmUiLCJ3b3JkcyIsIndvcmRPZk51bSIsInNldERpc2FibGVkIiwicmVtb3ZlRGlzYWJsZWQiLCJzbGVlcCIsIkNvdW50ZXIiLCJIVE1MRWxlbWVudCIsIlJPT1QiLCJJTlBVVCIsIkhJRERFTiIsIklOQ1JFTUVOVCIsIkRFQ1JFTUVOVCIsIkNIQU5HRV9ST09UX1RJVExFIiwiQ0hBTkdFX1JPT1RfVkFMVUUiLCJDSEFOR0VfSU5QVVRfVkFMVUUiLCJDTElDS19JTkNSRU1FTlRfQlVUVE9OIiwiQ0xJQ0tfREVDUkVNRU5UX0JVVFRPTiIsIkNIQU5HRV9JTkNSRU1FTlRfQlVUVE9OX1NUQVRFIiwiQ0hBTkdFX0RFQ1JFTUVOVF9CVVRUT05fU1RBVEUiLCJpZCIsImlucHV0IiwiZGVjcmVtZW50QnV0dG9uIiwiaW5jcmVtZW50QnV0dG9uIiwiY29ubmVjdGVkQ2FsbGJhY2siLCJiaW5kIiwiZGlzY29ubmVjdGVkQ2FsbGJhY2siLCJpbnB1dEV2ZW50cyIsImRlY3JlbWVudEJ1dHRvbkV2ZW50cyIsImluY3JlbWVudEJ1dHRvbkV2ZW50cyIsImF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayIsImhhbmRsZUNsaWNrQnV0dG9uIiwiaGFuZGxlQ2hhbmdlUm9vdFZhbHVlIiwiaGFuZGxlQ2hhbmdlSW5wdXRWYWx1ZSIsImhhbmRsZUNoYW5nZUJ1dHRvblN0YXRlIiwiaW5wdXRPYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJpbnB1dE9ic2VydmVyQ2FsbGJhY2siLCJpbnB1dE9ic2VydmUiLCJ0YWtlUmVjb3JkcyIsIm9mZiIsIm9sZFYiLCJwYXJzZUludCIsIm5ld1YiLCJldmVudCIsInZhbHVlIiwiZ2V0QXR0cmlidXRlIiwiZ2V0IiwibWFwIiwibm9kZSIsIm9ic2VydmUiLCJpbnB1dE9ic2VydmVyQ29uZmlnIiwiYXR0cmlidXRlcyIsImF0dHJpYnV0ZU9sZFZhbHVlIiwiYXR0cmlidXRlRmlsdGVyIiwibXV0YXRpb25zIiwiZm9yRWFjaCIsIm11dGF0aW9uIiwidHlwZSIsInRhcmdldCIsInRyaWdnZXIiLCJvbiIsImRhdGEiLCJFcnJvciIsImluY3IiLCJkZWNyIiwiYXR0ciIsInRyaWdnZXJIYW5kbGVyIiwidGl0bGUiLCJ2YWwiLCJtYXgiLCJtaW4iLCJjbCIsImNsYXNzTmFtZSIsIm5leHRTaWJsaW5nIiwicHJldmlvdXNTaWJsaW5nIiwic3RlcFVwIiwiUHJvbWlzZSIsInJlc29sdmUiLCJzdGVwRG93biIsImVycm9yIiwib2Zmc2V0WCIsIm9mZnNldFkiLCJEcm9wRG93biIsIklURU1TIiwiUk9PVF9PUEVORUQiLCJJTlBVVF9PUEVORUQiLCJJVEVNU19PUEVORUQiLCJDTElDS19JTlBVVCIsIlRPR0dMRV9ST09UX09QRU5FRCIsIlRPR0dMRV9JVEVNU19PUEVORUQiLCJUT0dHTEVfSU5QVVRfT1BFTkVEIiwiQ0hBTkdFX1JPT1RfREFUQV9WQUxVRSIsIkNIQU5HRV9ST09UX1BMQUNFSE9MREVSIiwiQ0hBTkdFX0lOUFVUX1BMQUNFSE9MREVSIiwidGVtcGxhdGUiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwibm9kZU5hbWUiLCJ0ZW1wbGF0ZUNvbnRlbnQiLCJjb250ZW50IiwiYXR0YWNoU2hhZG93IiwibW9kZSIsImFwcGVuZENoaWxkIiwiY2xvbmVOb2RlIiwiaXRlbXMiLCJmaW5kIiwiYXJyb3dCdXR0b24iLCJpdGVtc0V2ZW50cyIsImhhbmRsZUNsaWNrIiwidG9nZ2xlT3BlbmVkIiwiYXJyb3dCdXR0b25FdmVudHMiLCJoYW5kbGVLZXlQcmVzcyIsInJvb3RFdmVudHMiLCJnZXRHdWVzdHNJbnB1dFN0cmluZyIsImd1ZXN0cyIsImJhYnlzIiwiZWFjaCIsImluZGV4Iiwic3RyaW5nR3Vlc3RzIiwic3RyaW5nQmFieXMiLCJzZXRJbnB1dFN0cmluZyIsInJlc3VsdFN0cmluZyIsImxvZyIsImF0dHJpYnV0ZUNoYW5nZWRDYWxsQmFjayIsImFyaWFFeHBhbmRlZFRvZ2dsZSIsImVsZW0iLCJwcmV2ZW50RGVmYXVsdCIsImtleSIsIndoaWNoIiwiY2xzIiwic3BsaXQiLCJyZXBsYWNlIiwidG9nZ2xlQ2xhc3MiLCJ0b2dnbGVBdHRyaWJ1dGUiLCJrZXlwcmVzcyIsIkRyb3BEb3duV2l0aEJ1dHRvbnMiLCJGT09URVJfQlVUVE9OUyIsIlJFU0VUX0JVVFRPTiIsIkFDQ0VQVF9CVVRUT04iLCJGT09URVJfQlVUVE9OU19JTklUIiwiRk9PVEVSX0JVVFRPTlNfVE9HR0xFX0RJU0FCTEVEIiwiUkVTRVRfQlVUVE9OX1RPR0dMRV9ESVNBQkxFRCIsIlJFU0VUX0JVVFRPTl9DTElDSyIsIkFDQ0VQVF9CVVRUT05fQ0xJQ0siLCJmb290ZXJCdXR0b25zIiwicmVzZXRCdXR0b24iLCJhY2NlcHRCdXR0b24iLCJteVJvb3RFdmVudHMiLCJmb290ZXJCdXR0b25zRXZlbnRzIiwicmVzZXRCdXR0b25FdmVudHMiLCJhY2NlcHRCdXR0b25FdmVudHMiLCJzZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJjb3VudGVycyIsImdldERpc2FibGVkIiwiZGlzYWJsZWQiLCJyZW1vdmVBdHRyIiwibW9kdWxlIiwiZXhwb3J0cyIsImRvbVJlYWR5IiwiZm4xIiwiZm4yIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlYWR5U3RhdGUiLCJudW1iZXIiLCJjYXNlcyIsItC80LvQsNC00LXQvdGG0YsiLCLQstC30YDQvtGB0LvRi9C1Iiwi0LTQtdGC0LgiLCLQs9C+0YHRgtC4Iiwi0YHQv9Cw0LvRjNC90LgiLCLQutC+0LzQvdCw0YLRiyIsItCy0YvQvdC90YvQtSIsItC60YDQvtCy0LDRgtC4IiwibXMiLCJzZXRUaW1lb3V0Il0sInNvdXJjZVJvb3QiOiIifQ==