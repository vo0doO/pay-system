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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1653536195336
      var cssReload = __webpack_require__(/*! ../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

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
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
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
/******/ 	/* webpack/runtime/get css chunk filename */
/******/ 	!function() {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.k = function(chunkId) {
/******/ 			// return url for filenames based on template
/******/ 			return "js/" + chunkId + "/" + {}[chunkId] + ".bundle.css";
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	!function() {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = function(chunkId) {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".bundle-update.js";
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	!function() {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = function(chunkId) {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	!function() {
/******/ 		__webpack_require__.hmrF = function() { return "index." + __webpack_require__.h() + ".hot-update.json"; };
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	!function() {
/******/ 		__webpack_require__.h = function() { return "352894cdbe5b6e86"; }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	!function() {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "toxin:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = function(url, done, key, chunkId) {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = function(prev, event) {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach(function(fn) { return fn(event); });
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
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
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	!function() {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises = 0;
/******/ 		var blockingPromisesWaiting = [];
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		// eslint-disable-next-line no-unused-vars
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId) {
/******/ 				return trackBlockingPromise(require.e(chunkId));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results);
/******/ 		}
/******/ 		
/******/ 		function unblock() {
/******/ 			if (--blockingPromises === 0) {
/******/ 				setStatus("ready").then(function () {
/******/ 					if (blockingPromises === 0) {
/******/ 						var list = blockingPromisesWaiting;
/******/ 						blockingPromisesWaiting = [];
/******/ 						for (var i = 0; i < list.length; i++) {
/******/ 							list[i]();
/******/ 						}
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 				/* fallthrough */
/******/ 				case "prepare":
/******/ 					blockingPromises++;
/******/ 					promise.then(unblock, unblock);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises === 0) return fn();
/******/ 			return new Promise(function (resolve) {
/******/ 				blockingPromisesWaiting.push(function () {
/******/ 					resolve(fn());
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							},
/******/ 							[])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								} else {
/******/ 									return setStatus("ready").then(function () {
/******/ 										return updatedModules;
/******/ 									});
/******/ 								}
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error(
/******/ 						"apply() is only allowed in ready status (state: " +
/******/ 							currentStatus +
/******/ 							")"
/******/ 					);
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "/";
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/css loading */
/******/ 	!function() {
/******/ 		var createStylesheet = function(chunkId, fullhref, resolve, reject) {
/******/ 			var linkTag = document.createElement("link");
/******/ 		
/******/ 			linkTag.rel = "stylesheet";
/******/ 			linkTag.type = "text/css";
/******/ 			var onLinkComplete = function(event) {
/******/ 				// avoid mem leaks.
/******/ 				linkTag.onerror = linkTag.onload = null;
/******/ 				if (event.type === 'load') {
/******/ 					resolve();
/******/ 				} else {
/******/ 					var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 					var realHref = event && event.target && event.target.href || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + realHref + ")");
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.type = errorType;
/******/ 					err.request = realHref;
/******/ 					linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				}
/******/ 			}
/******/ 			linkTag.onerror = linkTag.onload = onLinkComplete;
/******/ 			linkTag.href = fullhref;
/******/ 		
/******/ 			document.head.appendChild(linkTag);
/******/ 			return linkTag;
/******/ 		};
/******/ 		var findStylesheet = function(href, fullhref) {
/******/ 			var existingLinkTags = document.getElementsByTagName("link");
/******/ 			for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 				var tag = existingLinkTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 				if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return tag;
/******/ 			}
/******/ 			var existingStyleTags = document.getElementsByTagName("style");
/******/ 			for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 				var tag = existingStyleTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href");
/******/ 				if(dataHref === href || dataHref === fullhref) return tag;
/******/ 			}
/******/ 		};
/******/ 		var loadStylesheet = function(chunkId) {
/******/ 			return new Promise(function(resolve, reject) {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				if(findStylesheet(href, fullhref)) return resolve();
/******/ 				createStylesheet(chunkId, fullhref, resolve, reject);
/******/ 			});
/******/ 		}
/******/ 		// no chunk loading
/******/ 		
/******/ 		var oldTags = [];
/******/ 		var newTags = [];
/******/ 		var applyHandler = function(options) {
/******/ 			return { dispose: function() {
/******/ 				for(var i = 0; i < oldTags.length; i++) {
/******/ 					var oldTag = oldTags[i];
/******/ 					if(oldTag.parentNode) oldTag.parentNode.removeChild(oldTag);
/******/ 				}
/******/ 				oldTags.length = 0;
/******/ 			}, apply: function() {
/******/ 				for(var i = 0; i < newTags.length; i++) newTags[i].rel = "stylesheet";
/******/ 				newTags.length = 0;
/******/ 			} };
/******/ 		}
/******/ 		__webpack_require__.hmrC.miniCss = function(chunkIds, removedChunks, removedModules, promises, applyHandlers, updatedModulesList) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			chunkIds.forEach(function(chunkId) {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var oldTag = findStylesheet(href, fullhref);
/******/ 				if(!oldTag) return;
/******/ 				promises.push(new Promise(function(resolve, reject) {
/******/ 					var tag = createStylesheet(chunkId, fullhref, function() {
/******/ 						tag.as = "style";
/******/ 						tag.rel = "preload";
/******/ 						resolve();
/******/ 					}, reject);
/******/ 					oldTags.push(oldTag);
/******/ 					newTags.push(tag);
/******/ 				}));
/******/ 			});
/******/ 		}
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/css loading */
/******/ 	!function() {
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_css = __webpack_require__.hmrS_css || {"vendors-node_modules_intern_browser_intern_js-node_modules_jquery_dist_jquery_js-node_modules-9b4ffa":0,"index":0};
/******/ 		
/******/ 		var uniqueName = "toxin";
/******/ 		var loadCssChunkData = function(target, link, chunkId) {
/******/ 			var data, token = "", token2, exports = {}, exportsWithId = [], exportsWithDashes = [], moduleIds = [], i = 0, cc = 1;
/******/ 			try { if(!link) link = loadStylesheet(chunkId); data = link.sheet.cssRules; data = data[data.length - 1].style; } catch(e) { data = getComputedStyle(document.head); }
/******/ 			data = data.getPropertyValue("--webpack-" + uniqueName + "-" + chunkId);
/******/ 			if(!data) return [];
/******/ 			for(; cc; i++) {
/******/ 				cc = data.charCodeAt(i);
/******/ 				if(cc == 40) { token2 = token; token = ""; }
/******/ 				else if(cc == 41) { exports[token2.replace(/^_/, "")] = token.replace(/^_/, ""); token = ""; }
/******/ 				else if(cc == 47 || cc == 37) { token = token.replace(/^_/, ""); exports[token] = token; exportsWithId.push(token); if(cc == 37) exportsWithDashes.push(token); token = ""; }
/******/ 				else if(!cc || cc == 44) { token = token.replace(/^_/, ""); exportsWithId.forEach(function(x) { exports[x] = uniqueName + "-" + token + "-" + exports[x]; }); exportsWithDashes.forEach(function(x) { exports[x] = "--" + exports[x]; }); __webpack_require__.r(exports); target[token] = (function(exports, module) {
/******/ 					module.exports = exports;
/******/ 				}).bind(null, exports); moduleIds.push(token); token = ""; exports = {}; exportsWithId.length = 0; }
/******/ 				else if(cc == 92) { token += data[++i] }
/******/ 				else { token += data[i]; }
/******/ 			}
/******/ 			if(target == __webpack_require__.m) installedChunks[chunkId] = 0;
/******/ 			return moduleIds;
/******/ 		}
/******/ 		var loadingAttribute = "data-webpack-loading";
/******/ 		var loadStylesheet = function(chunkId, url, done, hmr) {
/******/ 			var link, needAttach, key = "chunk-" + chunkId;
/******/ 			if(!hmr) {
/******/ 			var links = document.getElementsByTagName("link");
/******/ 			for(var i = 0; i < links.length; i++) {
/******/ 				var l = links[i];
/******/ 				if(l.rel == "stylesheet" && (l.href.startsWith(url) || l.getAttribute("href").startsWith(url) || l.getAttribute("data-webpack") == uniqueName + ":" + key)) { link = l; break; }
/******/ 			}
/******/ 			if(!done) return link;
/******/ 			}
/******/ 			if(!link) {
/******/ 				needAttach = true;
/******/ 				link = document.createElement('link');
/******/ 				link.setAttribute("data-webpack", uniqueName + ":" + key);
/******/ 				link.setAttribute(loadingAttribute, 1);
/******/ 				link.rel = "stylesheet";
/******/ 				link.href = url;
/******/ 			}
/******/ 			var onLinkComplete = function(prev, event) {
/******/ 				link.onerror = link.onload = null;
/******/ 				link.removeAttribute(loadingAttribute);
/******/ 				clearTimeout(timeout);
/******/ 				if(event && event.type != "load") link.parentNode.removeChild(link)
/******/ 				done(event);
/******/ 				if(prev) return prev(event);
/******/ 			};
/******/ 			if(link.getAttribute(loadingAttribute)) {
/******/ 				var timeout = setTimeout(onLinkComplete.bind(null, undefined, { type: 'timeout', target: link }), 120000);
/******/ 				link.onerror = onLinkComplete.bind(null, link.onerror);
/******/ 				link.onload = onLinkComplete.bind(null, link.onload);
/******/ 			} else onLinkComplete(undefined, { type: 'load', target: link });
/******/ 			hmr ? document.head.insertBefore(link, hmr) :
/******/ 			needAttach && document.head.appendChild(link);
/******/ 			return link;
/******/ 		};
/******/ 		// no initial css
/******/ 		
/******/ 		// no chunk loading
/******/ 		
/******/ 		var oldTags = [];
/******/ 		var newTags = [];
/******/ 		var applyHandler = function(options) {
/******/ 			return { dispose: function() {
/******/ 		
/******/ 			}, apply: function() {
/******/ 				var moduleIds = [];
/******/ 				newTags.forEach(function(info) { info[1].sheet.disabled = false; });
/******/ 				while(oldTags.length) {
/******/ 					var oldTag = oldTags.pop();
/******/ 					if(oldTag.parentNode) oldTag.parentNode.removeChild(oldTag);
/******/ 				}
/******/ 				while(newTags.length) {
/******/ 					var info = newTags.pop();
/******/ 					var chunkModuleIds = loadCssChunkData(__webpack_require__.m, info[1], info[0]);
/******/ 					chunkModuleIds.forEach(function(id) { moduleIds.push(id); });
/******/ 				}
/******/ 				return moduleIds;
/******/ 			} };
/******/ 		}
/******/ 		var cssTextKey = function(link) { return Array.from(link.sheet.cssRules, function(r) { return r.cssText; }).join(); }
/******/ 		__webpack_require__.hmrC.css = function(chunkIds, removedChunks, removedModules, promises, applyHandlers, updatedModulesList) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			chunkIds.forEach(function(chunkId) {
/******/ 				var filename = __webpack_require__.k(chunkId);
/******/ 				var url = __webpack_require__.p + filename;
/******/ 				var oldTag = loadStylesheet(chunkId, url);
/******/ 				if(!oldTag) return;
/******/ 				promises.push(new Promise(function(resolve, reject) {
/******/ 					var link = loadStylesheet(chunkId, url + (url.indexOf("?") < 0 ? "?" : "&") + "hmr=" + Date.now(), function(event) {
/******/ 						if(event.type !== "load") {
/******/ 							var errorType = event && event.type;
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading css hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							reject(error);
/******/ 						} else {
/******/ 							try { if(cssTextKey(oldTag) == cssTextKey(link)) { if(link.parentNode) link.parentNode.removeChild(link); return resolve(); } } catch(e) {}
/******/ 							var factories = {};
/******/ 							loadCssChunkData(factories, link, chunkId);
/******/ 							Object.keys(factories).forEach(function(id) { updatedModulesList.push(id); })
/******/ 							link.sheet.disabled = true;
/******/ 							oldTags.push(oldTag);
/******/ 							newTags.push([chunkId, link]);
/******/ 							resolve();
/******/ 						}
/******/ 					}, oldTag);
/******/ 				}));
/******/ 			});
/******/ 		}
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			currentUpdatedModulesList = updatedModulesList;
/******/ 			return new Promise(function(resolve, reject) {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = function(event) {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		self["webpackHotUpdatetoxin"] = function(chunkId, moreModules, runtime) {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				} else {
/******/ 					currentUpdateChunks[chunkId] = false;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						!currentUpdateChunks[chunkId]
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = function() {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then(function(response) {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
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
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__.O(undefined, ["vendors-node_modules_intern_browser_intern_js-node_modules_jquery_dist_jquery_js-node_modules-9b4ffa"], function() { return __webpack_require__("./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info&reconnect=10"); })
/******/ 	__webpack_require__.O(undefined, ["vendors-node_modules_intern_browser_intern_js-node_modules_jquery_dist_jquery_js-node_modules-9b4ffa"], function() { return __webpack_require__("./node_modules/webpack/hot/dev-server.js"); })
/******/ 	__webpack_require__.O(undefined, ["vendors-node_modules_intern_browser_intern_js-node_modules_jquery_dist_jquery_js-node_modules-9b4ffa"], function() { return __webpack_require__("./node_modules/intern/browser/intern.js"); })
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_intern_browser_intern_js-node_modules_jquery_dist_jquery_js-node_modules-9b4ffa"], function() { return __webpack_require__("./src/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRUFBRSxJQUFJO1dBQ047V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLElBQUk7V0FDSjtXQUNBO1dBQ0EsRUFBRTtXQUNGO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTtXQUNBLHNDQUFzQztXQUN0QztXQUNBO1dBQ0EsRUFBRTtXQUNGOztXQUVBLDhDQUE4Qzs7V0FFOUM7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxtQ0FBbUM7V0FDcEU7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRTNoQkE7VUFDQTtVQUNBO1VBQ0Esd0pBQXdKLHFLQUFxSztVQUM3VCx3SkFBd0oseUVBQXlFO1VBQ2pPLHdKQUF3Six3RUFBd0U7VUFDaE8sa0xBQWtMLCtDQUErQztVQUNqTyIsInNvdXJjZXMiOlsid2VicGFjazovL3RveGluLy4vc3JjL2NvbXBvbmVudHMvYnV0dG9uL2J1dHRvbi5qcyIsIndlYnBhY2s6Ly90b3hpbi8uL3NyYy9jb21wb25lbnRzL2NvdW50ZXIvY291bnRlci5qcyIsIndlYnBhY2s6Ly90b3hpbi8uL3NyYy9jb21wb25lbnRzL2Ryb3Bkb3duL2Ryb3Bkb3duLmpzIiwid2VicGFjazovL3RveGluLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RveGluLy4vc3JjL3V0aWxzL2pzL2Rpc2FibGVkLmpzIiwid2VicGFjazovL3RveGluLy4vc3JjL3V0aWxzL2pzL2RvbVJlYWR5LmpzIiwid2VicGFjazovL3RveGluLy4vc3JjL3V0aWxzL2pzL2luZGV4LmpzIiwid2VicGFjazovL3RveGluLy4vc3JjL3V0aWxzL2pzL21vcnBoLmpzIiwid2VicGFjazovL3RveGluLy4vc3JjL3V0aWxzL2pzL3NsZWVwLmpzIiwid2VicGFjazovL3RveGluLy4vc3JjL2luZGV4LnNjc3M/MWE0ZiIsIndlYnBhY2s6Ly90b3hpbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b3hpbi93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL3RveGluL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3RveGluL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b3hpbi93ZWJwYWNrL3J1bnRpbWUvZ2V0IGNzcyBjaHVuayBmaWxlbmFtZSIsIndlYnBhY2s6Ly90b3hpbi93ZWJwYWNrL3J1bnRpbWUvZ2V0IGphdmFzY3JpcHQgdXBkYXRlIGNodW5rIGZpbGVuYW1lIiwid2VicGFjazovL3RveGluL3dlYnBhY2svcnVudGltZS9nZXQgbWluaS1jc3MgY2h1bmsgZmlsZW5hbWUiLCJ3ZWJwYWNrOi8vdG94aW4vd2VicGFjay9ydW50aW1lL2dldCB1cGRhdGUgbWFuaWZlc3QgZmlsZW5hbWUiLCJ3ZWJwYWNrOi8vdG94aW4vd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIiwid2VicGFjazovL3RveGluL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG94aW4vd2VicGFjay9ydW50aW1lL2xvYWQgc2NyaXB0Iiwid2VicGFjazovL3RveGluL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG94aW4vd2VicGFjay9ydW50aW1lL2hvdCBtb2R1bGUgcmVwbGFjZW1lbnQiLCJ3ZWJwYWNrOi8vdG94aW4vd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vdG94aW4vd2VicGFjay9ydW50aW1lL2NzcyBsb2FkaW5nIiwid2VicGFjazovL3RveGluL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL3RveGluL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG94aW4vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3RveGluL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtY2xhc3Nlcy1wZXItZmlsZSAqL1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuLyoqXG4gKiBAdm8wZG9PXG4gKiBAaW50ZXJmYWNlKEJ1dHRvbilcbiAqIFRPRE86IE9ic2VydmVyZCBhdHRyIC0+IGhhbmRsZUNoYW5nZUF0dHJpYnV0ZXNcbiAqIFRPRE86IFN5bmMgcHJvcGVydHkgdmFsdWVzIGluIGF0dHJpYnV0ZXMgYW5kIERPTVxuICoqL1xuXG5leHBvcnQgY2xhc3MgQnV0dG9uIGV4dGVuZHMgSFRNTEJ1dHRvbkVsZW1lbnQge1xuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcblx0XHRyZXR1cm4gZ2V0Um9vdFByb3BzKCByb290ICk7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IGVsZW1lbnRzICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0QVJST1c6ICdqcy1idXR0b24taWNvbl9fYXJyb3dfY29sb3JfZ3JheScsXG5cdFx0XHRURVhUOiAnanMtYnV0dG9uLXRleHQnLFxuXHRcdH07XG5cdH1cblxuXHRzdGF0aWMgZ2V0IGV2ZW50cygpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Q0xJQ0tfQVJST1c6ICdjbGljay5hcnJvdy1idXR0b24nLFxuXHRcdFx0Q0xJQ0tfVEVYVF9SRVNFVDogJ2NsaWNrLmNsZWFyLWJ1dHRvbicsXG5cdFx0XHRDTElDS19URVhUX0FDQ0VQVDogJ2NsaWNrLmNvbmZpcm0tYnV0dG9uJyxcblx0XHRcdFRPR0dMRV9URVhUX1JFU0VUOiBcIlwiLCBcblx0XHR9O1xuXHR9XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxuXG5cdGNvbm5lY3RlZENhbGxCYWNrICgpIHtcblx0fVxuXG5cdGRpc2Nvbm5lY3RlZENhbGxCYWNrKCkge1xuXG5cdH1cblxuXHRhdHRyaWJ1dGVzQ2hhbmdlZENhbGxiYWNrKGVsZW1lbnQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuXHRcdGNvbnNvbGUuaW5mbyggZWxlbWVudCwgb2xkVmFsdWUsIG5ld1ZhbHVlICk7XG5cdH1cblxufVxuXG5leHBvcnQgY2xhc3MgQnV0dG9uSWNvbiBleHRlbmRzIEJ1dHRvbiB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdH1cbn1cblxuZXhwb3J0IGNsYXNzIEJ1dHRvblRleHQgZXh0ZW5kcyBCdXR0b24ge1xuXHRjb25zdHJ1Y3RvciAoKSB7XG5cdFx0c3VwZXIoKTtcblx0fVxufVxuXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCAndG94aW4tYnV0dG9uJywgQnV0dG9uLCB7IGV4dGVuZHM6ICdidXR0b24nIH0gKTtcbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoICdidXR0b24taWNvbicsIEJ1dHRvbkljb24sIHsgZXh0ZW5kczogJ2J1dHRvbicgfSApO1xud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSggJ2J1dHRvbi10ZXh0JywgQnV0dG9uVGV4dCwgeyBleHRlbmRzOiAnYnV0dG9uJyB9ICk7XG5cbmZ1bmN0aW9uIGdldFJvb3RQcm9wcyAoKSB7XG5cdHJldHVybiBbXG5cdFx0J2NsYXNzJyxcblx0XHQnYXJpYS1yb2xlJyxcblx0XHQndGFiaW5kZXgnLFxuXHRcdCdoaWRkZW4nLFxuXHRcdCdkaXNhYmxlZCcsXG5cdFx0J3ZhbHVlJyxcblx0XHQnaW5uZXJUZXh0Jyxcblx0XHQnb3V0ZXJUZXh0Jyxcblx0XHQnYWNjZXNzS2V5Jyxcblx0XHQnbGFuZycsXG5cdFx0J3RpdGxlJyxcblx0XHQndHJhbnNsYXRlJyxcblx0XHQnb2Zmc2V0SGVpZ2h0Jyxcblx0XHQnb2Zmc2V0TGVmdCcsXG5cdFx0J29mZnNldFBhcmVudCcsXG5cdFx0J29mZnNldFRvcCcsXG5cdFx0J29mZnNldFdpZHRoJyxcblx0XHQnZm9ybScsXG5cdFx0J2Zvcm1BY3Rpb24nLFxuXHRcdCdmb3JtRW5jdHlwZScsXG5cdFx0J2Zvcm1NZXRob2QnLFxuXHRcdCdmb3JtTm9WYWxpZGF0ZScsXG5cdFx0J2Zvcm1UYXJnZXQnLFxuXHRcdCdsYWJlbHMnLFxuXHRcdCduYW1lJyxcblx0XHQndHlwZScsXG5cdFx0J3ZhbGlkYXRpb25NZXNzYWdlJyxcblx0XHQndmFsaWRpdHknLFxuXHRcdCd3aWxsVmFsaWRhdGUnLFxuXHRdO1xufVxuIiwiY29uc3QgJCA9IHJlcXVpcmUoICdqcXVlcnknICk7XG5jb25zdCB7IHdvcmRzLCB3b3JkT2ZOdW0sIHNldERpc2FibGVkLCByZW1vdmVEaXNhYmxlZCwgc2xlZXAgfSA9IHJlcXVpcmUoICcuLi8uLi91dGlscy9qcy9pbmRleCcgKTtcblxuXG5jbGFzcyBDb3VudGVyIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuXHRzdGF0aWMgZ2V0IGVsZW1lbnRzICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Uk9PVDogJ2pzLWNvdW50ZXInLFxuXHRcdFx0SU5QVVQ6ICdqcy1jb3VudGVyX19pbnB1dCcsXG5cdFx0XHRISURERU46ICdqcy1jb3VudGVyX19pbnB1dF9oaWRkZW4nLFxuXHRcdFx0SU5DUkVNRU5UOiAnanMtY291bnRlcl9faW5jcmVtZW50LWJ1dHRvbicsXG5cdFx0XHRERUNSRU1FTlQ6ICdqcy1jb3VudGVyX19kZWNyZW1lbnQtYnV0dG9uJyxcblx0XHR9O1xuXHR9XG5cblx0c3RhdGljIGdldCBldmVudHMoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdENIQU5HRV9ST09UX1RJVExFOiAnY2hhbmdlOmNvdW50ZXI6cm9vdC50aXRsZScsXG5cdFx0XHRDSEFOR0VfUk9PVF9WQUxVRTogJ2NoYW5nZTpjb3VudGVyOnJvb3QudmFsdWUnLFxuXHRcdFx0Q0hBTkdFX0lOUFVUX1ZBTFVFOiAnY2hhbmdlOmNvdW50ZXI6aW5wdXQudmFsdWUnLFxuXHRcdFx0Q0xJQ0tfSU5DUkVNRU5UX0JVVFRPTjogJ2NsaWNrLmNvdW50ZXIuaW5jcmVtZW50LWJ1dHRvbicsXG5cdFx0XHRDTElDS19ERUNSRU1FTlRfQlVUVE9OOiAnY2xpY2suY291bnRlci5kZWNyZW1lbnQtYnV0dG9uJyxcblx0XHRcdENIQU5HRV9JTkNSRU1FTlRfQlVUVE9OX1NUQVRFOiAnY2hhbmdlOmNvdW50ZXI6aW5jcmVtZW50LWJ1dHRvbi5zdGF0ZScsXG5cdFx0XHRDSEFOR0VfREVDUkVNRU5UX0JVVFRPTl9TVEFURTogJ2NoYW5nZTpjb3VudGVyOmRlY3JlbWVudC1idXR0b24uc3RhdGUnXG5cdFx0fTtcblx0fVxuXG5cdHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuXHRcdHJldHVybiBbJ3ZhbHVlJ107XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5yb290ID0gJChgLmpzLWNvdW50ZXIjJHt0aGlzLmlkfWApO1xuXHRcdHRoaXMuaW5wdXQgPSAkKGAuanMtY291bnRlcl9faW5wdXRfaGlkZGVuIyR7dGhpcy5pZH1gKTtcblx0XHR0aGlzLmRlY3JlbWVudEJ1dHRvbiA9ICQoYC5qcy1jb3VudGVyX19kZWNyZW1lbnQtYnV0dG9uIyR7dGhpcy5pZH1gKTtcblx0XHR0aGlzLmluY3JlbWVudEJ1dHRvbiA9ICQoYC5qcy1jb3VudGVyX19pbmNyZW1lbnQtYnV0dG9uIyR7dGhpcy5pZH1gKTtcblxuXHRcdHRoaXMuY29ubmVjdGVkQ2FsbGJhY2sgPSB0aGlzLmNvbm5lY3RlZENhbGxiYWNrLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5kaXNjb25uZWN0ZWRDYWxsYmFjayA9IHRoaXMuZGlzY29ubmVjdGVkQ2FsbGJhY2suYmluZCh0aGlzKTtcblxuXHRcdHRoaXMuaW5wdXRFdmVudHMgPSB0aGlzLmlucHV0RXZlbnRzLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5kZWNyZW1lbnRCdXR0b25FdmVudHMgPSB0aGlzLmRlY3JlbWVudEJ1dHRvbkV2ZW50cy5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuaW5jcmVtZW50QnV0dG9uRXZlbnRzID0gdGhpcy5pbmNyZW1lbnRCdXR0b25FdmVudHMuYmluZCh0aGlzKTtcblxuXHRcdHRoaXMuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrID0gdGhpcy5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2suYmluZCh0aGlzKTtcblx0XHR0aGlzLmhhbmRsZUNsaWNrQnV0dG9uID0gdGhpcy5oYW5kbGVDbGlja0J1dHRvbi5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuaGFuZGxlQ2hhbmdlUm9vdFZhbHVlID0gdGhpcy5oYW5kbGVDaGFuZ2VSb290VmFsdWUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmhhbmRsZUNoYW5nZUlucHV0VmFsdWUgPSB0aGlzLmhhbmRsZUNoYW5nZUlucHV0VmFsdWUuYmluZCh0aGlzKTtcblx0XHR0aGlzLmhhbmRsZUNoYW5nZUJ1dHRvblN0YXRlID0gdGhpcy5oYW5kbGVDaGFuZ2VCdXR0b25TdGF0ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuaW5wdXRPYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKHRoaXMuaW5wdXRPYnNlcnZlckNhbGxiYWNrKTtcblx0fVxuXG5cdGNvbm5lY3RlZENhbGxiYWNrKCkge1xuXHRcdHRoaXMuaW5wdXRPYnNlcnZlKCk7XG5cdFx0dGhpcy5pbnB1dEV2ZW50cygpO1xuXHRcdHRoaXMuZGVjcmVtZW50QnV0dG9uRXZlbnRzKCk7XG5cdFx0dGhpcy5pbmNyZW1lbnRCdXR0b25FdmVudHMoKTtcblx0fVxuXG5cdGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuXHRcdHRoaXMuaW5wdXRPYnNlcnZlci50YWtlUmVjb3JkcygpO1xuXHRcdHRoaXMuaW5wdXQub2ZmKCBDb3VudGVyLmV2ZW50cy5DSEFOR0VfSU5QVVRfVkFMVUUgKTtcblx0XHR0aGlzLmRlY3JlbWVudEJ1dHRvbi5vZmYoIENvdW50ZXIuZXZlbnRzLkNIQU5HRV9ERUNSRU1FTlRfQlVUVE9OX1NUQVRFICk7XG5cdFx0dGhpcy5pbmNyZW1lbnRCdXR0b24ub2ZmKCBDb3VudGVyLmV2ZW50cy5DSEFOR0VfSU5DUkVNRU5UX0JVVFRPTl9TVEFURSApO1xuXHRcdHRoaXMuaW5jcmVtZW50QnV0dG9uLm9mZiggQ291bnRlci5ldmVudHMuQ0xJQ0tfSU5DUkVNRU5UX0JVVFRPTiApO1xuXHRcdHRoaXMuZGVjcmVtZW50QnV0dG9uLm9mZiggQ291bnRlci5ldmVudHMuQ0xJQ0tfREVDUkVNRU5UX0JVVFRPTiApO1xuXHR9XG5cblx0YXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrICggZWxlbWVudCwgb2xkVmFsdWUsIG5ld1ZhbHVlICkge1xuXHRcdGNvbnN0IG9sZFYgPSBwYXJzZUludChvbGRWYWx1ZSwgMTApO1xuXHRcdGNvbnN0IG5ld1YgPSBwYXJzZUludChuZXdWYWx1ZSwgMTApO1xuXG5cdFx0aWYgKG9sZFYgPT09IG5ld1YgJiYgbmV3ViA8IDApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR0aGlzLmhhbmRsZUNoYW5nZVJvb3RWYWx1ZSggZXZlbnQsIHsgdmFsdWU6IG5ld1YsIGlkOiB0aGlzLmdldEF0dHJpYnV0ZSgnbmFtZScpIH0gKTtcblx0fVxuXG5cdGlucHV0T2JzZXJ2ZSgpIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgYXJyYXktY2FsbGJhY2stcmV0dXJuXG5cdFx0dGhpcy5pbnB1dC5nZXQoKS5tYXAoKG5vZGUpID0+IHtcblx0XHRcdHRoaXMuaW5wdXRPYnNlcnZlci5vYnNlcnZlKG5vZGUsIHRoaXMuaW5wdXRPYnNlcnZlckNvbmZpZyk7XG5cdFx0fSk7XG5cdH1cblxuXHRnZXQgaW5wdXRPYnNlcnZlckNvbmZpZyAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGF0dHJpYnV0ZXM6IHRydWUsXG5cdFx0XHRhdHRyaWJ1dGVPbGRWYWx1ZTogdHJ1ZSxcblx0XHRcdGF0dHJpYnV0ZUZpbHRlcjogQ291bnRlci5vYnNlcnZlZEF0dHJpYnV0ZXNcblx0XHR9O1xuXHR9XG5cblx0aW5wdXRPYnNlcnZlckNhbGxiYWNrICggbXV0YXRpb25zICkge1xuXHRcdG11dGF0aW9ucy5mb3JFYWNoKChtdXRhdGlvbikgPT4ge1xuXHRcdFx0aWYgKG11dGF0aW9uLnR5cGUgPT09ICdhdHRyaWJ1dGVzJykge1xuXHRcdFx0XHRjb25zdCB7IG9sZFZhbHVlIH0gPSBtdXRhdGlvbjtcblx0XHRcdFx0Y29uc3QgeyB2YWx1ZSB9ID0gbXV0YXRpb24udGFyZ2V0O1xuXHRcdFx0XHRpZiAodmFsdWUgIT09IG9sZFZhbHVlKSB7XG5cdFx0XHRcdFx0JCggbXV0YXRpb24udGFyZ2V0ICkudHJpZ2dlciggQ291bnRlci5ldmVudHMuQ0hBTkdFX0lOUFVUX1ZBTFVFLCB7IHZhbHVlOiBtdXRhdGlvbi50YXJnZXQudmFsdWUgfSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRpbnB1dEV2ZW50cygpIHtcblx0XHR0aGlzLmlucHV0Lm9uKHtcblx0XHRcdCdjaGFuZ2U6Y291bnRlcjppbnB1dC52YWx1ZSc6IHRoaXMuaGFuZGxlQ2hhbmdlSW5wdXRWYWx1ZVxuXHRcdH0pO1xuXHR9XG5cblx0aW5jcmVtZW50QnV0dG9uRXZlbnRzKCkge1xuXHRcdHRoaXMuaW5jcmVtZW50QnV0dG9uLm9uKHtcblx0XHRcdCdjbGljay5jb3VudGVyLmluY3JlbWVudC1idXR0b24nOiB0aGlzLmhhbmRsZUNsaWNrQnV0dG9uLFxuXHRcdFx0J2NoYW5nZTpjb3VudGVyOmluY3JlbWVudC1idXR0b24uc3RhdGUnOiB0aGlzLmhhbmRsZUNoYW5nZUJ1dHRvblN0YXRlXG5cdFx0fSk7XG5cdH1cblxuXHRkZWNyZW1lbnRCdXR0b25FdmVudHMoKSB7XG5cdFx0dGhpcy5kZWNyZW1lbnRCdXR0b24ub24oe1xuXHRcdFx0J2NsaWNrLmNvdW50ZXIuZGVjcmVtZW50LWJ1dHRvbic6IHRoaXMuaGFuZGxlQ2xpY2tCdXR0b24sXG5cdFx0XHQnY2hhbmdlOmNvdW50ZXI6ZGVjcmVtZW50LWJ1dHRvbi5zdGF0ZSc6IHRoaXMuaGFuZGxlQ2hhbmdlQnV0dG9uU3RhdGVcblx0XHR9KTtcblx0fVxuXG5cdGhhbmRsZUNoYW5nZUlucHV0VmFsdWUgKCBldmVudCwgZGF0YSApIHtcblx0XHRjb25zdCB7IGlucHV0LCByb290IH0gPSB0aGlzO1xuXHRcdGlmKCBldmVudC50YXJnZXQgIT09IHRoaXMuaW5wdXQuZ2V0KCAwICkgKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYNCe0YjQuNCx0LrQsCDQvtCx0YDQsNCx0L7RgtGH0LjQutCwINGB0L7QsdGL0YLQuNGPICR7ZXZlbnR9YCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgaW5jciA9IHRoaXMuaW5jcmVtZW50QnV0dG9uO1xuXHRcdGNvbnN0IGRlY3IgPSB0aGlzLmRlY3JlbWVudEJ1dHRvbjtcblxuXHRcdHJvb3QuYXR0ciggJ3ZhbHVlJywgZGF0YS52YWx1ZSApXG5cblx0XHRpbmNyLnRyaWdnZXJIYW5kbGVyKCBDb3VudGVyLmV2ZW50cy5DSEFOR0VfSU5DUkVNRU5UX0JVVFRPTl9TVEFURSwge1xuXHRcdFx0aW5wdXQsXG5cdFx0XHRpbmNyLFxuXHRcdFx0ZGVjclxuXHRcdH0pO1xuXG5cdFx0ZGVjci50cmlnZ2VySGFuZGxlciggQ291bnRlci5ldmVudHMuQ0hBTkdFX0RFQ1JFTUVOVF9CVVRUT05fU1RBVEUsIHtcblx0XHRcdGlucHV0LFxuXHRcdFx0aW5jcixcblx0XHRcdGRlY3Jcblx0XHR9KTtcblx0fVxuXG5cdGhhbmRsZUNoYW5nZVJvb3RWYWx1ZSAoIGV2ZW50LCBkYXRhICkge1xuXHRcdGNvbnN0IHRpdGxlID0gd29yZE9mTnVtKGRhdGEudmFsdWUsIHdvcmRzW2RhdGEuaWRdKTtcblx0XHR0aGlzLnJvb3QuYXR0ciggJ3RpdGxlJywgdGl0bGUgKTtcblx0XHR0aGlzLnJvb3QudHJpZ2dlciggQ291bnRlci5ldmVudHMuQ0hBTkdFX1JPT1RfVkFMVUUgKVxuXHR9XG5cblx0aGFuZGxlQ2hhbmdlQnV0dG9uU3RhdGUgKCBldmVudCwgZGF0YSApIHtcblx0XHRjb25zdCB2YWwgPSBwYXJzZUludChkYXRhLmlucHV0LnZhbCgpLCAxMCk7XG5cdFx0Y29uc3QgbWF4ID0gcGFyc2VJbnQoZGF0YS5pbnB1dC5hdHRyKCdtYXgnKSwgMTApO1xuXHRcdGNvbnN0IG1pbiA9IHBhcnNlSW50KGRhdGEuaW5wdXQuYXR0cignbWluJyksIDEwKTtcblxuXHRcdGlmICh2YWwgPCBtYXggJiYgdmFsID49IG1pbikge1xuXHRcdFx0cmVtb3ZlRGlzYWJsZWQoZGF0YS5pbmNyKTtcblx0XHR9XG5cblx0XHRpZiAodmFsID49IG1heCkge1xuXHRcdFx0c2V0RGlzYWJsZWQoZGF0YS5pbmNyKTtcblx0XHR9XG5cblx0XHRpZiAodmFsID4gbWluKSB7XG5cdFx0XHRyZW1vdmVEaXNhYmxlZChkYXRhLmRlY3IpO1xuXHRcdH1cblxuXHRcdGlmICh2YWwgPD0gbWluKSB7XG5cdFx0XHRzZXREaXNhYmxlZChkYXRhLmRlY3IpO1xuXHRcdH1cblx0fVxuXG5cdGFzeW5jIGhhbmRsZUNsaWNrQnV0dG9uICggZXZlbnQgKSB7XG5cdFx0Y29uc3QgZWxlbWVudCA9IGV2ZW50LnRhcmdldDtcblx0XHRjb25zdCBjbCA9IGVsZW1lbnQuY2xhc3NOYW1lO1xuXHRcdGNvbnN0IGlucHV0ID0gZWxlbWVudC5uZXh0U2libGluZyB8fCBlbGVtZW50LnByZXZpb3VzU2libGluZztcblxuXHRcdHRyeSB7XG5cdFx0XHRzd2l0Y2ggKGNsKSB7XG5cdFx0XHRcdGNhc2UgQ291bnRlci5lbGVtZW50cy5JTkNSRU1FTlQ6IHtcblx0XHRcdFx0XHRhd2FpdCBpbnB1dC5zdGVwVXAoKTtcblx0XHRcdFx0XHRhd2FpdCAkKCBpbnB1dCApLmF0dHIoICd2YWx1ZScsIGlucHV0LnZhbHVlICk7XG5cdFx0XHRcdFx0UHJvbWlzZS5yZXNvbHZlKCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjYXNlIENvdW50ZXIuZWxlbWVudHMuREVDUkVNRU5UOiB7XG5cdFx0XHRcdFx0YXdhaXQgaW5wdXQuc3RlcERvd24oKTtcblx0XHRcdFx0XHRhd2FpdCAkKCBpbnB1dCApLmF0dHIoICd2YWx1ZScsIGlucHV0LnZhbHVlICk7XG5cdFx0XHRcdFx0UHJvbWlzZS5yZXNvbHZlKCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCBg0J7RiNC40LHQutCwINC+0LHRgNCw0LHQvtGC0LrQuCDRgdC+0LHRi9GC0LjRjzogJHtldmVudH1gICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCBg0J7RiNC40LHQutCwINC+0LHRgNCw0LHQvtGC0LrQuCDRgdC+0LHRi9GC0LjRjzogJHtlbGVtZW50fSwgJHtldmVudC5vZmZzZXRYfSwgJHtldmVudC5vZmZzZXRZfWAgKTtcblx0XHR9XG5cdH1cbn1cblxud2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSggJ2d1ZXN0cy1jb3VudGVyJywgQ291bnRlciApO1xuZXhwb3J0IHsgQ291bnRlciB9OyIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSdcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4uL2J1dHRvbi9idXR0b24uanMnXG5pbXBvcnQgeyBDb3VudGVyIH0gZnJvbSAnLi4vY291bnRlci9jb3VudGVyJ1xuaW1wb3J0IHsgd29yZHMsIHdvcmRPZk51bSB9IGZyb20gJy4uLy4uL3V0aWxzL2pzL2luZGV4J1xuXG5jbGFzcyBEcm9wRG93biBleHRlbmRzIEhUTUxFbGVtZW50IHtcblx0c3RhdGljIGdldCBlbGVtZW50cyAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdFJPT1Q6ICdqcy1kcm9wZG93bicsXG5cdFx0XHRJTlBVVDogJ2pzLWRyb3Bkb3duX19pbnB1dCcsXG5cdFx0XHRJVEVNUzogJ2pzLWRyb3Bkb3duX19pdGVtcycsXG5cdFx0XHRST09UX09QRU5FRDogYGpzLWRyb3Bkb3duX29wZW5lZGAsXG5cdFx0XHRJTlBVVF9PUEVORUQ6IGBqcy1kcm9wZG93bl9faW5wdXRfb3BlbmVkYCxcblx0XHRcdElURU1TX09QRU5FRDogYGpzLWRyb3Bkb3duX19pdGVtc19vcGVuZWRgLFxuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBnZXQgZXZlbnRzICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Q0xJQ0tfSU5QVVQ6ICdjbGljay5kcm9wZG93bi5pbnB1dCcsXG5cdFx0XHRDSEFOR0VfUk9PVF9WQUxVRTogJ2NoYW5nZTpkcm9wZG93bjpyb290OnZhbHVlJyxcblx0XHRcdENIQU5HRV9JTlBVVF9WQUxVRTogJ2NoYW5nZTpkcm9wZG93bjppbnB1dDp2YWx1ZScsXG5cdFx0XHRUT0dHTEVfUk9PVF9PUEVORUQ6ICd0b2dnbGU6ZHJvcGRvd246cm9vdDpvcGVuZWQnLFxuXHRcdFx0VE9HR0xFX0lURU1TX09QRU5FRDogJ3RvZ2dsZTpkcm9wZG93bjppdGVtczpvcGVuZWQnLFxuXHRcdFx0VE9HR0xFX0lOUFVUX09QRU5FRDogJ3RvZ2dsZTpkcm9wZG93bjppbnB1dDpvcGVuZWQnLFxuXHRcdFx0Q0hBTkdFX1JPT1RfREFUQV9WQUxVRTogJ2NoYW5nZTpkcm9wZG93bjpyb290OnZhbHVlJyxcblx0XHRcdENIQU5HRV9ST09UX1BMQUNFSE9MREVSOiAnY2hhbmdlOmRyb3Bkb3duOnJvb3Q6cGxhY2Vob2xkZXInLFxuXHRcdFx0Q0hBTkdFX0lOUFVUX1BMQUNFSE9MREVSOiAnY2hhbmdlOmRyb3Bkb3duOmlucHV0OnBsYWNlaG9sZGVyJyxcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcyAoKSB7XG5cdFx0cmV0dXJuIFsgJ3ZhbHVlJywgJ2NsYXNzJywgJ2FyaWEtZXhwYW5kZWQnLCAncGxhY2Vob2xkZXInLCAnZGF0YS12YWx1ZXMnIF1cblx0fVxuXG5cdGNvbnN0cnVjdG9yICgpIHtcblx0XHRzdXBlcigpXG5cblx0XHRjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCB0aGlzLm5vZGVOYW1lIClcblx0XHRjb25zdCB0ZW1wbGF0ZUNvbnRlbnQgPSB0ZW1wbGF0ZS5jb250ZW50XG5cdFx0dGhpcy5hdHRhY2hTaGFkb3coIHsgbW9kZTogJ29wZW4nIH0gKS5hcHBlbmRDaGlsZCggdGVtcGxhdGVDb250ZW50LmNsb25lTm9kZSggdHJ1ZSApIClcblx0XHR0aGlzLmVsZW1lbnRzID0gRHJvcERvd24uZWxlbWVudHNcblx0XHR0aGlzLnJvb3QgPSAkKCBgLiR7IERyb3BEb3duLmVsZW1lbnRzLlJPT1QgfSMke3RoaXMuaWR9YCApXG5cdFx0dGhpcy5pdGVtcyA9IHRoaXMucm9vdC5maW5kKCBgLiR7IERyb3BEb3duLmVsZW1lbnRzLklURU1TIH1gIClcblx0XHR0aGlzLmlucHV0ID0gdGhpcy5yb290LmZpbmQoIGAuJHsgRHJvcERvd24uZWxlbWVudHMuSU5QVVQgfWAgKVxuXHRcdHRoaXMuYXJyb3dCdXR0b24gPSB0aGlzLnJvb3QuZmluZCggYC4keyBCdXR0b24uZWxlbWVudHMuQVJST1cgfWAgKVxuXHRcdHRoaXMuaW5wdXRFdmVudHMgPSB0aGlzLmlucHV0RXZlbnRzLmJpbmQoIHRoaXMgKVxuXHRcdHRoaXMuaXRlbXNFdmVudHMgPSB0aGlzLml0ZW1zRXZlbnRzLmJpbmQoIHRoaXMgKVxuXHRcdHRoaXMuaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrLmJpbmQoIHRoaXMgKVxuXHRcdHRoaXMudG9nZ2xlT3BlbmVkID0gdGhpcy50b2dnbGVPcGVuZWQuYmluZCggdGhpcyApXG5cdFx0dGhpcy5hcnJvd0J1dHRvbkV2ZW50cyA9IHRoaXMuYXJyb3dCdXR0b25FdmVudHMuYmluZCggdGhpcyApXG5cdFx0dGhpcy5oYW5kbGVLZXlQcmVzcyA9IHRoaXMuaGFuZGxlS2V5UHJlc3MuYmluZCggdGhpcyApXG5cdFx0dGhpcy5yb290RXZlbnRzID0gdGhpcy5yb290RXZlbnRzLmJpbmQoIHRoaXMgKVxuXHR9XG5cblx0Y29ubmVjdGVkQ2FsbGJhY2sgKCkge1xuXHRcdHRoaXMuaXRlbXNFdmVudHMoKVxuXHRcdHRoaXMuaW5wdXRFdmVudHMoKVxuXHRcdHRoaXMuYXJyb3dCdXR0b25FdmVudHMoKVxuXHRcdHRoaXMucm9vdEV2ZW50cygpXG5cdH1cblxuXHRkaXNjb25uZWN0ZWRDYWxsYmFjayAoKSB7XG5cdFx0dGhpcy5pbnB1dC5vZmYoICdjbGljay5kcm9wZG93bi5pbnB1dCcgKVxuXHRcdHRoaXMuaW5wdXQub2ZmKCAndG9nZ2xlOmRyb3Bkb3duOmlucHV0Om9wZW5lZCcgKVxuXHRcdHRoaXMuaXRlbXMub2ZmKCAndG9nZ2xlOmRyb3Bkb3duOml0ZW1zOm9wZW5lZCcgKVxuXHRcdHRoaXMuYXJyb3dCdXR0b24ub2ZmKCAnY2xpY2suYXJyb3ctYnV0dG9uLmRyb3Bkb3duJyApXG5cdFx0dGhpcy5hcnJvd0J1dHRvbi5vZmYoICd0b2dnbGUuZHJvcGRvd24uYXJyb3ctYnV0dG9uLm9wZW5lZCcgKVxuXHR9XG5cblx0Z2V0R3Vlc3RzSW5wdXRTdHJpbmcgKCkge1xuXHRcdGxldCBndWVzdHMgPSAwXG5cdFx0bGV0IGJhYnlzID0gMFxuXHRcdGNvbnN0IGVsZW1lbnRzID0gdGhpcy5yb290LmZpbmQoIGAuJHsgQ291bnRlci5lbGVtZW50cy5ST09UIH1gIClcblx0XHRlbGVtZW50cy5lYWNoKCAoIGluZGV4ICkgPT4ge1xuXHRcdFx0Y29uc3QgaWQgPSAkKCBlbGVtZW50c1sgaW5kZXggXSApLmF0dHIoICduYW1lJyApXG5cdFx0XHRsZXQgdmFsdWUgPSAkKCBlbGVtZW50c1sgaW5kZXggXSApLmF0dHIoICd2YWx1ZScgKVxuXHRcdFx0aWYgKCBpZCA9PT0gXCLQstC30YDQvtGB0LvRi9C1XCIgKSB7XG5cdFx0XHRcdGd1ZXN0cyArPSBwYXJzZUludCggdmFsdWUsIDEwIClcblx0XHRcdH1cblx0XHRcdGlmICggaWQgPT09IFwi0LTQtdGC0LhcIiApIHtcblx0XHRcdFx0Z3Vlc3RzICs9IHBhcnNlSW50KCB2YWx1ZSwgMTAgKVxuXHRcdFx0fVxuXHRcdFx0aWYgKCBpZCA9PT0gXCLQvNC70LDQtNC10L3RhtGLXCIgKSB7XG5cdFx0XHRcdGJhYnlzICs9IHBhcnNlSW50KCB2YWx1ZSwgMTAgKVxuXHRcdFx0fVxuXHRcdH0gKVxuXHRcdGlmICggZ3Vlc3RzIDw9IDAgKSB7XG5cdFx0XHRyZXR1cm4gJ9Ch0LrQvtC70YzQutC+INCz0L7RgdGC0LXQuSdcblx0XHR9XG5cdFx0aWYgKCBndWVzdHMgPiAwICYmIGJhYnlzID4gMCApIHtcblx0XHRcdGNvbnN0IHN0cmluZ0d1ZXN0cyA9IHdvcmRPZk51bSggZ3Vlc3RzLCB3b3Jkc1sgJ9Cz0L7RgdGC0LgnIF0gKVxuXHRcdFx0Y29uc3Qgc3RyaW5nQmFieXMgPSB3b3JkT2ZOdW0oIGJhYnlzLCB3b3Jkc1sgJ9C80LvQsNC00LXQvdGG0YsnIF0gKVxuXHRcdFx0cmV0dXJuIGAkeyBndWVzdHMgfSAkeyBzdHJpbmdHdWVzdHMgfSwgJHsgYmFieXMgfSAkeyBzdHJpbmdCYWJ5cyB9YFxuXHRcdH1cblx0XHRpZiAoIGd1ZXN0cyA+IDAgJiYgYmFieXMgPD0gMCApIHtcblx0XHRcdGNvbnN0IHN0cmluZ0d1ZXN0cyA9IHdvcmRPZk51bSggZ3Vlc3RzLCB3b3Jkc1sgJ9Cz0L7RgdGC0LgnIF0gKVxuXHRcdFx0cmV0dXJuIGAkeyBndWVzdHMgfSAkeyBzdHJpbmdHdWVzdHMgfWBcblx0XHR9XG5cdH1cblxuXHRzZXRJbnB1dFN0cmluZyAoIGV2ZW50ICkge1xuXHRcdGxldCByZXN1bHRTdHJpbmcgPSBcIlwiXG5cdFx0Y29uc3Qgbm9kZSA9IGV2ZW50LnRhcmdldC5ub2RlTmFtZVxuXHRcdHN3aXRjaCAoIG5vZGUgKSB7XG5cdFx0XHRjYXNlICdHVUVTVFMtQ09VTlRFUic6XG5cdFx0XHRcdHJlc3VsdFN0cmluZyA9IHRoaXMuZ2V0R3Vlc3RzSW5wdXRTdHJpbmcoKVxuXHRcdFx0XHR0aGlzLmlucHV0LmF0dHIoICd2YWx1ZScsIHJlc3VsdFN0cmluZyApXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRicmVha1xuXHRcdH1cblx0fVxuXG5cdHJvb3RFdmVudHMgKCkge1xuXHRcdCQoIHRoaXMucm9vdCApLm9uKFxuXHRcdFx0Q291bnRlci5ldmVudHMuQ0hBTkdFX1JPT1RfVkFMVUUsXG5cdFx0XHRgLiR7IENvdW50ZXIuZWxlbWVudHMuUk9PVCB9YCxcblx0XHRcdCggZXZlbnQgKSA9PiB7XG5cdFx0XHRcdGNvbnN0IHRhcmdldCA9ICQoIGV2ZW50LnRhcmdldCApXG5cdFx0XHRcdGNvbnNvbGUubG9nKCBgVmFsdWU6ICR7IHRhcmdldC5hdHRyKCAndmFsdWUnICkgfSBcXG4gVGl0bGU6ICR7IHRhcmdldC5hdHRyKCAndGl0bGUnICkgfWAgKVxuXHRcdFx0XHR0aGlzLnNldElucHV0U3RyaW5nKCBldmVudCApXG5cdFx0XHR9XG5cdFx0KVxuXHR9XG5cblx0YXR0cmlidXRlQ2hhbmdlZENhbGxCYWNrICggdmFsdWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSApIHtcblx0XHRjb25zb2xlLmxvZyggYERyb3Bkb3duIGF0dHJpYnV0ZSBjaGFuZ2VkOiBcXG4gRWxlbWVudDogJHsgdmFsdWUgfSBcXG4gb2xkdmFsdWUgJHsgb2xkVmFsdWUgfSBcXG4gbmV3VmFsdWUgJHsgbmV3VmFsdWUgfWAgKVxuXHR9XG5cblx0YXJpYUV4cGFuZGVkVG9nZ2xlICggZWxlbSApIHtcblx0XHRjb25zdCB2YWx1ZSA9IGVsZW0uYXR0ciggJ2FyaWEtZXhwYW5kZWQnIClcblx0XHRzd2l0Y2ggKCB2YWx1ZSApIHtcblx0XHRcdGNhc2UgJ2ZhbHNlJzpcblx0XHRcdFx0ZWxlbS5hdHRyKCAnYXJpYS1leHBhbmRlZCcsICd0cnVlJyApXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICd0cnVlJzpcblx0XHRcdFx0ZWxlbS5hdHRyKCAnYXJpYS1leHBhbmRlZCcsICdmYWxzZScgKVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAndW5kZWZpbmVkJzpcblx0XHRcdFx0ZWxlbS5hdHRyKCAnYXJpYS1leHBhbmRlZCcsICd0cnVlJyApXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRicmVha1xuXHRcdH1cblx0fVxuXG5cdGhhbmRsZUNsaWNrICgpIHtcblx0XHR0aGlzLml0ZW1zLnRyaWdnZXIoICd0b2dnbGU6ZHJvcGRvd246aXRlbXM6b3BlbmVkJyApXG5cdFx0dGhpcy5pbnB1dC50cmlnZ2VyKCAndG9nZ2xlOmRyb3Bkb3duOmlucHV0Om9wZW5lZCcgKVxuXHRcdHRoaXMuYXJyb3dCdXR0b24udHJpZ2dlciggJ3RvZ2dsZS5kcm9wZG93bi5hcnJvdy1idXR0b24ub3BlbmVkJyApXG5cdH1cblxuXHRoYW5kbGVLZXlQcmVzcyAoIGV2ZW50ICkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuXHRcdGNvbnN0IGtleSA9IGV2ZW50LndoaWNoXG5cdFx0c3dpdGNoICgga2V5ICkge1xuXHRcdFx0Y2FzZSAzMjpcblx0XHRcdFx0dGhpcy5pdGVtcy50cmlnZ2VyKCAndG9nZ2xlOmRyb3Bkb3duOml0ZW1zOm9wZW5lZCcgKVxuXHRcdFx0XHR0aGlzLmlucHV0LnRyaWdnZXIoICd0b2dnbGU6ZHJvcGRvd246aW5wdXQ6b3BlbmVkJyApXG5cdFx0XHRcdHRoaXMuYXJyb3dCdXR0b24udHJpZ2dlciggJ3RvZ2dsZS5kcm9wZG93bi5hcnJvdy1idXR0b24ub3BlbmVkJyApXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRicmVha1xuXHRcdH1cblx0fVxuXG5cdHRvZ2dsZU9wZW5lZCAoIGV2ZW50ICkge1xuXHRcdGNvbnN0IGVsZW0gPSAkKCBldmVudC50YXJnZXQgKVxuXHRcdGNvbnN0IGNscyA9IGVsZW0uYXR0ciggJ2NsYXNzJyApLnNwbGl0KCAnICcgKVxuXHRcdHN3aXRjaCAoICggKCBjbHNbIDEgXSB8fCBjbHNbIDAgXSApIHx8ICggY2xzWyAxIF0gJiYgY2xzWyAwIF0gKSApLnJlcGxhY2UoICdfb3BlbmVkJywgJycgKSApIHtcblx0XHRcdGNhc2UgJ2pzLWRyb3Bkb3duX19pdGVtcyc6XG5cdFx0XHRcdGVsZW0udG9nZ2xlQ2xhc3MoICdqcy1kcm9wZG93bl9faXRlbXNfb3BlbmVkJyApXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICdqcy1kcm9wZG93bl9faW5wdXQnOlxuXHRcdFx0XHRlbGVtLnRvZ2dsZUNsYXNzKCAnanMtZHJvcGRvd25fX2lucHV0X29wZW5lZCcgKVxuXHRcdFx0XHR0aGlzLmFyaWFFeHBhbmRlZFRvZ2dsZSggZWxlbSApXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICdqcy1idXR0b24taWNvbl9fYXJyb3dfY29sb3JfZ3JheSc6XG5cdFx0XHRcdGVsZW0uZ2V0KCAwICkudG9nZ2xlQXR0cmlidXRlKCBcInByZXNzZWRcIiApXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRicmVha1xuXHRcdH1cblx0fVxuXG5cdGl0ZW1zRXZlbnRzICgpIHtcblx0XHR0aGlzLml0ZW1zLm9uKCB7XG5cdFx0XHQndG9nZ2xlOmRyb3Bkb3duOml0ZW1zOm9wZW5lZCc6IHRoaXMudG9nZ2xlT3BlbmVkXG5cdFx0fSApXG5cdH1cblxuXHRpbnB1dEV2ZW50cyAoKSB7XG5cdFx0dGhpcy5pbnB1dC5vbigge1xuXHRcdFx0a2V5cHJlc3M6IHRoaXMuaGFuZGxlS2V5UHJlc3MsXG5cdFx0XHQnY2xpY2suZHJvcGRvd24uaW5wdXQnOiB0aGlzLmhhbmRsZUNsaWNrLFxuXHRcdFx0J3RvZ2dsZTpkcm9wZG93bjppbnB1dDpvcGVuZWQnOiB0aGlzLnRvZ2dsZU9wZW5lZCxcblx0XHR9IClcblx0XHR0aGlzLmlucHV0Lm9uKCAnY2hhbmdlJywgJ2pzLWNvdW50ZXJfX2lucHV0X2hpZGRlbicsIGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2coICdpbSBjaGFuZ2VkJyApIH0gKVxuXHR9XG5cblx0YXJyb3dCdXR0b25FdmVudHMgKCkge1xuXHRcdHRoaXMuYXJyb3dCdXR0b24ub24oIHtcblx0XHRcdCdjbGljay5hcnJvdy1idXR0b24uZHJvcGRvd24nOiB0aGlzLmhhbmRsZUNsaWNrLFxuXHRcdFx0J3RvZ2dsZS5kcm9wZG93bi5hcnJvdy1idXR0b24ub3BlbmVkJzogdGhpcy50b2dnbGVPcGVuZWRcblx0XHR9IClcblx0fVxufVxuXG5jbGFzcyBEcm9wRG93bldpdGhCdXR0b25zIGV4dGVuZHMgRHJvcERvd24ge1xuXG5cdHN0YXRpYyBnZXQgZWxlbWVudHMgKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRST09UOiAnZHJvcC1kb3duLXdpdGgtYnV0dG9ucycsXG5cdFx0XHRGT09URVJfQlVUVE9OUzogJ2pzLWRyb3Bkb3duX19mb290ZXItYnV0dG9ucycsXG5cdFx0XHRSRVNFVF9CVVRUT046ICdqcy1kcm9wZG93bl9fcmVzZXQtYnV0dG9uJyxcblx0XHRcdEFDQ0VQVF9CVVRUT046ICdqcy1kcm9wZG93bl9fYWNjZXB0LWJ1dHRvbidcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgZ2V0IGV2ZW50cyAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdEZPT1RFUl9CVVRUT05TX0lOSVQ6ICdpbml0OmRyb3Bkb3duOmZvb3Rlci1idXR0b25zJyxcblx0XHRcdEZPT1RFUl9CVVRUT05TX1RPR0dMRV9ESVNBQkxFRDogJ3RvZ2dsZTpkaXNhYmxlZDpkcm9wZG93bjpmb290ZXItYnV0dG9ucycsXG5cdFx0XHRSRVNFVF9CVVRUT05fVE9HR0xFX0RJU0FCTEVEOiAndG9nZ2xlOmRpc2FibGVkOmRyb3Bkb3duOnJlc2V0LWJ1dHRvbicsXG5cdFx0XHRSRVNFVF9CVVRUT05fQ0xJQ0s6ICdjbGljay5kcm9wZG93bjpyZXNldC1idXR0b24nLFxuXHRcdFx0QUNDRVBUX0JVVFRPTl9DTElDSzogJ2NsaWNrLmRyb3Bkb3duOmFjY2VwdC1idXR0b24nLFxuXHRcdH1cblx0fVxuXG5cdGNvbnN0cnVjdG9yICgpIHtcblx0XHRzdXBlcigpXG5cdFx0c3VwZXIucm9vdEV2ZW50cygpXG5cdFx0Ly8gdGhpcy5yb290ID0gJCggRHJvcERvd25XaXRoQnV0dG9ucy5lbGVtZW50cy5ST09UIClcblx0XHR0aGlzLmZvb3RlckJ1dHRvbnMgPSB0aGlzLnJvb3QuZmluZCggYC4keyBEcm9wRG93bldpdGhCdXR0b25zLmVsZW1lbnRzLkZPT1RFUl9CVVRUT05TIH1gIClcblx0XHR0aGlzLnJlc2V0QnV0dG9uID0gdGhpcy5yb290LmZpbmQoIGAuJHsgRHJvcERvd25XaXRoQnV0dG9ucy5lbGVtZW50cy5SRVNFVF9CVVRUT04gfWAgKVxuXHRcdHRoaXMuYWNjZXB0QnV0dG9uID0gdGhpcy5yb290LmZpbmQoIGAuJHsgRHJvcERvd25XaXRoQnV0dG9ucy5lbGVtZW50cy5BQ0NFUFRfQlVUVE9OIH1gIClcblx0XHR0aGlzLm15Um9vdEV2ZW50cyA9IHRoaXMubXlSb290RXZlbnRzLmJpbmQoIHRoaXMgKVxuXHRcdHRoaXMuZm9vdGVyQnV0dG9uc0V2ZW50cyA9IHRoaXMuZm9vdGVyQnV0dG9uc0V2ZW50cy5iaW5kKCB0aGlzIClcblx0XHR0aGlzLnJlc2V0QnV0dG9uRXZlbnRzID0gdGhpcy5yZXNldEJ1dHRvbkV2ZW50cy5iaW5kKCB0aGlzIClcblx0XHR0aGlzLmFjY2VwdEJ1dHRvbkV2ZW50cyA9IHRoaXMuYWNjZXB0QnV0dG9uRXZlbnRzLmJpbmQodGhpcyk7XG5cdH1cblxuXHRjb25uZWN0ZWRDYWxsYmFjayAoKSB7XG5cdFx0c3VwZXIuaXRlbXNFdmVudHMoKVxuXHRcdHN1cGVyLmlucHV0RXZlbnRzKClcblx0XHRzdXBlci5hcnJvd0J1dHRvbkV2ZW50cygpXG5cdFx0dGhpcy5teVJvb3RFdmVudHMoKVxuXHRcdHRoaXMuZm9vdGVyQnV0dG9uc0V2ZW50cygpXG5cdFx0dGhpcy5mb290ZXJCdXR0b25zLnRyaWdnZXIoIERyb3BEb3duV2l0aEJ1dHRvbnMuZXZlbnRzLkZPT1RFUl9CVVRUT05TX0lOSVQgKVxuXHRcdHRoaXMucmVzZXRCdXR0b25FdmVudHMoKVxuXHRcdHRoaXMucmVzZXRCdXR0b24udHJpZ2dlciggRHJvcERvd25XaXRoQnV0dG9ucy5ldmVudHMuUkVTRVRfQlVUVE9OX1RPR0dMRV9ESVNBQkxFRCApXG5cdFx0dGhpcy5hY2NlcHRCdXR0b25FdmVudHMoKTtcblx0fVxuXG5cdG15Um9vdEV2ZW50cyAoKSB7XG5cdFx0JCggdGhpcy5yb290ICkub24oXG5cdFx0XHREcm9wRG93bi5ldmVudHMuVE9HR0xFX0lURU1TX09QRU5FRCxcblx0XHRcdGAuJHsgRHJvcERvd24uZWxlbWVudHMuSVRFTVMgfWAsXG5cdFx0XHQoIGV2ZW50ICkgPT4ge1xuXHRcdFx0XHR0aGlzLmZvb3RlckJ1dHRvbnMudHJpZ2dlciggRHJvcERvd25XaXRoQnV0dG9ucy5ldmVudHMuRk9PVEVSX0JVVFRPTlNfVE9HR0xFX0RJU0FCTEVEIClcblx0XHRcdH1cblx0XHQpXG5cblx0XHQkKCB0aGlzLnJvb3QgKS5vbihcblx0XHRcdENvdW50ZXIuZXZlbnRzLkNIQU5HRV9ST09UX1ZBTFVFLFxuXHRcdFx0YC4keyBDb3VudGVyLmVsZW1lbnRzLlJPT1QgfWAsXG5cdFx0XHQoIGV2ZW50ICkgPT4ge1xuXHRcdFx0XHR0aGlzLnJlc2V0QnV0dG9uLnRyaWdnZXIoIERyb3BEb3duV2l0aEJ1dHRvbnMuZXZlbnRzLlJFU0VUX0JVVFRPTl9UT0dHTEVfRElTQUJMRUQgKVxuXHRcdFx0fVxuXHRcdClcblx0fVxuXG5cdGZvb3RlckJ1dHRvbnNFdmVudHMgKCkge1xuXHRcdHRoaXMuZm9vdGVyQnV0dG9ucy5vbihcblx0XHRcdERyb3BEb3duV2l0aEJ1dHRvbnMuZXZlbnRzLkZPT1RFUl9CVVRUT05TX0lOSVQsXG5cdFx0XHQoIGV2ZW50ICkgPT4ge1xuXHRcdFx0XHRpZiAoIHRoaXMuZm9vdGVyQnV0dG9ucy5hdHRyKCAnZGlzYWJsZWQnICkgKSB7XG5cdFx0XHRcdFx0cmV0dXJuXG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5mb290ZXJCdXR0b25zLmdldCggMCApLnNldEF0dHJpYnV0ZSggXCJkaXNhYmxlZFwiLCBcIlwiIClcblx0XHRcdH1cblx0XHQpXG5cblx0XHR0aGlzLmZvb3RlckJ1dHRvbnMub24oXG5cdFx0XHREcm9wRG93bldpdGhCdXR0b25zLmV2ZW50cy5GT09URVJfQlVUVE9OU19UT0dHTEVfRElTQUJMRUQsXG5cdFx0XHQoIGV2ZW50ICkgPT4ge1xuXHRcdFx0XHRpZiAoIHRoaXMuZm9vdGVyQnV0dG9ucy5nZXQoIDAgKS5nZXRBdHRyaWJ1dGUoICdkaXNhYmxlZCcgKSAhPSBudWxsICkge1xuXHRcdFx0XHRcdHRoaXMuZm9vdGVyQnV0dG9ucy5nZXQoIDAgKS5yZW1vdmVBdHRyaWJ1dGUoIFwiZGlzYWJsZWRcIiApXG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5mb290ZXJCdXR0b25zLmdldCggMCApLnNldEF0dHJpYnV0ZSggXCJkaXNhYmxlZFwiLCBcIlwiIClcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdClcblx0fVxuXG5cdHJlc2V0QnV0dG9uRXZlbnRzICgpIHtcblx0XHR0aGlzLnJlc2V0QnV0dG9uLm9uKFxuXHRcdFx0RHJvcERvd25XaXRoQnV0dG9ucy5ldmVudHMuUkVTRVRfQlVUVE9OX1RPR0dMRV9ESVNBQkxFRCxcblx0XHRcdCggZXZlbnQgKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGlucHV0ID0gdGhpcy5pbnB1dFxuXHRcdFx0XHRjb25zdCByZXNldEJ1dHRvbiA9IHRoaXMucmVzZXRCdXR0b24uZ2V0KDApXG5cdFx0XHRcdGlmICggaW5wdXQudmFsKCkgPT09ICfQodC60L7Qu9GM0LrQviDQs9C+0YHRgtC10LknICkge1xuXHRcdFx0XHRcdGlmICggcmVzZXRCdXR0b24uZ2V0QXR0cmlidXRlKCAnZGlzYWJsZWQnICkgIT0gbnVsbCApIHtcblx0XHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXNldEJ1dHRvbi5zZXRBdHRyaWJ1dGUoIFwiZGlzYWJsZWRcIiwgXCJcIiApXG5cdFx0XHRcdFx0cmV0dXJuXG5cdFx0XHRcdH1cblx0XHRcdFx0cmVzZXRCdXR0b24ucmVtb3ZlQXR0cmlidXRlKCBcImRpc2FibGVkXCIgKVxuXHRcdFx0fVxuXHRcdClcblxuXHRcdHRoaXMucmVzZXRCdXR0b24ub24oXG5cdFx0XHREcm9wRG93bldpdGhCdXR0b25zLmV2ZW50cy5SRVNFVF9CVVRUT05fQ0xJQ0ssXG5cdFx0XHQoIGV2ZW50ICkgPT4ge1xuXHRcdFx0XHRjb25zdCBjb3VudGVycyA9IHRoaXMucm9vdC5maW5kKGAuJHtDb3VudGVyLmVsZW1lbnRzLkhJRERFTn1gKTtcblx0XHRcdFx0Y291bnRlcnMuZWFjaChmdW5jdGlvbigpe1xuXHRcdFx0XHRcdHZhciBlbGVtID0gJCh0aGlzKTtcblx0XHRcdFx0XHR0aGlzLnZhbHVlID0gMTtcblx0XHRcdFx0XHRlbGVtLmF0dHIoICd2YWx1ZScsIDEgKTtcblx0XHRcdFx0XHRlbGVtLnRyaWdnZXIoIENvdW50ZXIuZXZlbnRzLkNIQU5HRV9JTlBVVF9WQUxVRSwgeyB2YWx1ZTogMSB9ICk7XG5cdFx0XHRcdFx0JCh0aGlzLnByZXZpb3VzU2libGluZykudHJpZ2dlcihDb3VudGVyLmV2ZW50cy5DTElDS19ERUNSRU1FTlRfQlVUVE9OKVxuXHRcdFx0XHR9KVxuXHRcdFx0XHR0aGlzLnJlc2V0QnV0dG9uLnRyaWdnZXIoRHJvcERvd25XaXRoQnV0dG9ucy5ldmVudHMuUkVTRVRfQlVUVE9OX1RPR0dMRV9ESVNBQkxFRClcblx0XHRcdH1cblx0XHQpXG5cdH1cblxuXHRhY2NlcHRCdXR0b25FdmVudHMgKCkge1xuXHRcdCQodGhpcy5hY2NlcHRCdXR0b24uZmluZCgnYnV0dG9uJykpLm9uKFxuXHRcdFx0RHJvcERvd25XaXRoQnV0dG9ucy5ldmVudHMuQUNDRVBUX0JVVFRPTl9DTElDSyxcblx0XHRcdCgpPT57XG5cdFx0XHRcdHRoaXMuaXRlbXMudHJpZ2dlciggJ3RvZ2dsZTpkcm9wZG93bjppdGVtczpvcGVuZWQnIClcblx0XHRcdFx0dGhpcy5pbnB1dC50cmlnZ2VyKCAndG9nZ2xlOmRyb3Bkb3duOmlucHV0Om9wZW5lZCcgKVxuXHRcdFx0XHR0aGlzLmFycm93QnV0dG9uLnRyaWdnZXIoICd0b2dnbGUuZHJvcGRvd24uYXJyb3ctYnV0dG9uLm9wZW5lZCcgKVxuXHRcdFx0fVxuXHRcdClcblx0fVxuXG59XG5cbndpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoICdkcm9wLWRvd24nLCBEcm9wRG93biApXG53aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCAnZHJvcC1kb3duLXdpdGgtYnV0dG9ucycsIERyb3BEb3duV2l0aEJ1dHRvbnMgKVxuZXhwb3J0IHsgRHJvcERvd24sIERyb3BEb3duV2l0aEJ1dHRvbnMgfSIsImltcG9ydCBcIi4vaW5kZXguc2Nzc1wiO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvZHJvcGRvd24vZHJvcGRvd24uanMnO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvY291bnRlci9jb3VudGVyLmpzJztcbmltcG9ydCAnLi9jb21wb25lbnRzL2J1dHRvbi9idXR0b24uanMnO1xuXG4iLCJjb25zdCAkID0gcmVxdWlyZSggJ2pxdWVyeScgKTtcblxuZnVuY3Rpb24gZ2V0RGlzYWJsZWQgKCBlbGVtZW50ICkge1xuXHRyZXR1cm4gJChlbGVtZW50KS5hdHRyKCdkaXNhYmxlZCcpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVEaXNhYmxlZCAoIGVsZW1lbnQgKSB7XG5cdGNvbnN0IGRpc2FibGVkID0gZ2V0RGlzYWJsZWQoZWxlbWVudCk7XG5cdGlmIChkaXNhYmxlZCAhPT0gJ2Rpc2FibGVkJykge1xuXHRcdHJldHVybjtcblx0fVxuXHRlbGVtZW50LnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG59XG5cbmZ1bmN0aW9uIHNldERpc2FibGVkICggZWxlbWVudCApIHtcblx0Y29uc3QgZGlzYWJsZWQgPSBnZXREaXNhYmxlZChlbGVtZW50KTtcblx0aWYgKGRpc2FibGVkID09PSAnZGlzYWJsZWQnKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdCQoZWxlbWVudCkuYXR0cignZGlzYWJsZWQnLCAnJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBnZXREaXNhYmxlZCwgcmVtb3ZlRGlzYWJsZWQsIHNldERpc2FibGVkIH07IiwiLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWV4cHJlc3Npb25zICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZG9tUmVhZHkgKCBmbjEsIGZuMiApIHtcblx0dHJ5IHtcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdyZWFkeXN0YXRlY2hhbmdlJywgKGV2ZW50KSA9PiB7XG5cdFx0XHRpZiAoZXZlbnQudGFyZ2V0LnJlYWR5U3RhdGUgPT09ICdpbnRlcmFjdGl2ZScpIHtcblx0XHRcdFx0Zm4xO1xuXHRcdFx0fSBlbHNlIGlmIChldmVudC50YXJnZXQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuXHRcdFx0XHRmbjI7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdEb2N1bWVudCBub3QgbG9hZGVkJyk7XG5cdH1cbn0iLCJpbXBvcnQgeyBkb21SZWFkeSB9IGZyb20gJy4vZG9tUmVhZHknO1xuaW1wb3J0IHsgc2xlZXAgfSBmcm9tICcuL3NsZWVwJztcbmltcG9ydCB7IHdvcmRPZk51bSwgd29yZHMgfSBmcm9tICcuL21vcnBoJztcbmltcG9ydCB7IGdldERpc2FibGVkLCBzZXREaXNhYmxlZCwgcmVtb3ZlRGlzYWJsZWQgfSBmcm9tICcuL2Rpc2FibGVkJztcblxuZXhwb3J0IHtcblx0ZG9tUmVhZHksIHNsZWVwLCB3b3JkT2ZOdW0sIHdvcmRzLCBnZXREaXNhYmxlZCwgc2V0RGlzYWJsZWQsIHJlbW92ZURpc2FibGVkXG59O1xuIiwiZXhwb3J0IGZ1bmN0aW9uIHdvcmRPZk51bShudW1iZXIsIHdvcmRzKSB7XG5cdGNvbnN0IGNhc2VzID0gWzIsIDAsIDEsIDEsIDEsIDJdO1xuXHRyZXR1cm4gd29yZHNbKG51bWJlciAlIDEwMCA+IDQgJiYgbnVtYmVyICUgMTAwIDwgMjApID8gMiA6IGNhc2VzWyhudW1iZXIgJSAxMCA8IDUpID8gbnVtYmVyICUgMTAgOiA1XV07XG59XG5cbmV4cG9ydCBjb25zdCB3b3JkcyA9IHtcblx00LzQu9Cw0LTQtdC90YbRizogWyfQvNC70LDQtNC10L3QtdGGJywgJ9C80LvQsNC00LXQvdGG0LAnLCAn0LzQu9Cw0LTQtdC90YbQtdCyJ10sXG5cdNCy0LfRgNC+0YHQu9GL0LU6IFsn0LPQvtGB0YLQuCcsICfQs9C+0YHRgtC4JywgJ9Cz0L7RgdGC0LgnXSxcblx00LTQtdGC0Lg6IFsn0LPQvtGB0YLQuCcsICfQs9C+0YHRgtC4JywgJ9Cz0L7RgdGC0LgnXSxcblx00LPQvtGB0YLQuDogWyfQs9C+0YHRgtGMJywgJ9Cz0L7RgdGC0Y8nLCAn0LPQvtGB0YLQtdC5J10sXG5cdNGB0L/QsNC70YzQvdC4OiBbJ9GB0L/QsNC70YzQvdGPJywgJ9GB0L/QsNC70YzQvdC4JywgJ9GB0L/QsNC70LXQvSddLFxuXHTQutC+0LzQvdCw0YLRizogWyfQutC+0LzQvdCw0YLQsCcsICfQutC+0LzQvdCw0YLRiycsICfQutC+0LzQvdCw0YInXSxcblx00LLRi9C90L3Ri9C1OiBbJ9Cy0LDQvdC90LAnLCAn0LLQsNC90L3RiycsICfQstCw0L3QvSddLFxuXHTQutGA0L7QstCw0YLQuDogWyfQutGA0L7QstCw0YLRjCcsICfQutGA0L7QstCw0YLQuCcsICfQutGA0L7QstCw0YLQtdC5J10sXG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvbWlzZS1leGVjdXRvci1yZXR1cm4gKi9cbmFzeW5jIGZ1bmN0aW9uIHNsZWVwKG1zKSB7XG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xufVxuXG5leHBvcnQgeyBzbGVlcCB9O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307XG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTY1MzUzNjE5NTMzNlxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIuLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0aWYgKGNhY2hlZE1vZHVsZS5lcnJvciAhPT0gdW5kZWZpbmVkKSB0aHJvdyBjYWNoZWRNb2R1bGUuZXJyb3I7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdHRyeSB7XG5cdFx0dmFyIGV4ZWNPcHRpb25zID0geyBpZDogbW9kdWxlSWQsIG1vZHVsZTogbW9kdWxlLCBmYWN0b3J5OiBfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXSwgcmVxdWlyZTogX193ZWJwYWNrX3JlcXVpcmVfXyB9O1xuXHRcdF9fd2VicGFja19yZXF1aXJlX18uaS5mb3JFYWNoKGZ1bmN0aW9uKGhhbmRsZXIpIHsgaGFuZGxlcihleGVjT3B0aW9ucyk7IH0pO1xuXHRcdG1vZHVsZSA9IGV4ZWNPcHRpb25zLm1vZHVsZTtcblx0XHRleGVjT3B0aW9ucy5mYWN0b3J5LmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGV4ZWNPcHRpb25zLnJlcXVpcmUpO1xuXHR9IGNhdGNoKGUpIHtcblx0XHRtb2R1bGUuZXJyb3IgPSBlO1xuXHRcdHRocm93IGU7XG5cdH1cblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4vLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuX193ZWJwYWNrX3JlcXVpcmVfXy5jID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fO1xuXG4vLyBleHBvc2UgdGhlIG1vZHVsZSBleGVjdXRpb24gaW50ZXJjZXB0b3Jcbl9fd2VicGFja19yZXF1aXJlX18uaSA9IFtdO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IGZ1bmN0aW9uKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgY2h1bmtJZHMgPSBkZWZlcnJlZFtpXVswXTtcblx0XHR2YXIgZm4gPSBkZWZlcnJlZFtpXVsxXTtcblx0XHR2YXIgcHJpb3JpdHkgPSBkZWZlcnJlZFtpXVsyXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoZnVuY3Rpb24oa2V5KSB7IHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSk7IH0pKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYWxsIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5rID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuXHQvLyByZXR1cm4gdXJsIGZvciBmaWxlbmFtZXMgYmFzZWQgb24gdGVtcGxhdGVcblx0cmV0dXJuIFwianMvXCIgKyBjaHVua0lkICsgXCIvXCIgKyB7fVtjaHVua0lkXSArIFwiLmJ1bmRsZS5jc3NcIjtcbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYWxsIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5odSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcblx0Ly8gcmV0dXJuIHVybCBmb3IgZmlsZW5hbWVzIGJhc2VkIG9uIHRlbXBsYXRlXG5cdHJldHVybiBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgX193ZWJwYWNrX3JlcXVpcmVfXy5oKCkgKyBcIi5idW5kbGUtdXBkYXRlLmpzXCI7XG59OyIsIi8vIFRoaXMgZnVuY3Rpb24gYWxsb3cgdG8gcmVmZXJlbmNlIGFzeW5jIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5taW5pQ3NzRiA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcblx0Ly8gcmV0dXJuIHVybCBmb3IgZmlsZW5hbWVzIGJhc2VkIG9uIHRlbXBsYXRlXG5cdHJldHVybiB1bmRlZmluZWQ7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uaG1yRiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gXCJpbmRleC5cIiArIF9fd2VicGFja19yZXF1aXJlX18uaCgpICsgXCIuaG90LXVwZGF0ZS5qc29uXCI7IH07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBcIjM1Mjg5NGNkYmU1YjZlODZcIjsgfSIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCJ2YXIgaW5Qcm9ncmVzcyA9IHt9O1xudmFyIGRhdGFXZWJwYWNrUHJlZml4ID0gXCJ0b3hpbjpcIjtcbi8vIGxvYWRTY3JpcHQgZnVuY3Rpb24gdG8gbG9hZCBhIHNjcmlwdCB2aWEgc2NyaXB0IHRhZ1xuX193ZWJwYWNrX3JlcXVpcmVfXy5sID0gZnVuY3Rpb24odXJsLCBkb25lLCBrZXksIGNodW5rSWQpIHtcblx0aWYoaW5Qcm9ncmVzc1t1cmxdKSB7IGluUHJvZ3Jlc3NbdXJsXS5wdXNoKGRvbmUpOyByZXR1cm47IH1cblx0dmFyIHNjcmlwdCwgbmVlZEF0dGFjaDtcblx0aWYoa2V5ICE9PSB1bmRlZmluZWQpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgcyA9IHNjcmlwdHNbaV07XG5cdFx0XHRpZihzLmdldEF0dHJpYnV0ZShcInNyY1wiKSA9PSB1cmwgfHwgcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXdlYnBhY2tcIikgPT0gZGF0YVdlYnBhY2tQcmVmaXggKyBrZXkpIHsgc2NyaXB0ID0gczsgYnJlYWs7IH1cblx0XHR9XG5cdH1cblx0aWYoIXNjcmlwdCkge1xuXHRcdG5lZWRBdHRhY2ggPSB0cnVlO1xuXHRcdHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG5cdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuXHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuXHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG5cdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG5cdFx0fVxuXHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXdlYnBhY2tcIiwgZGF0YVdlYnBhY2tQcmVmaXggKyBrZXkpO1xuXHRcdHNjcmlwdC5zcmMgPSB1cmw7XG5cdH1cblx0aW5Qcm9ncmVzc1t1cmxdID0gW2RvbmVdO1xuXHR2YXIgb25TY3JpcHRDb21wbGV0ZSA9IGZ1bmN0aW9uKHByZXYsIGV2ZW50KSB7XG5cdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuXHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdHZhciBkb25lRm5zID0gaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdGRlbGV0ZSBpblByb2dyZXNzW3VybF07XG5cdFx0c2NyaXB0LnBhcmVudE5vZGUgJiYgc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcblx0XHRkb25lRm5zICYmIGRvbmVGbnMuZm9yRWFjaChmdW5jdGlvbihmbikgeyByZXR1cm4gZm4oZXZlbnQpOyB9KTtcblx0XHRpZihwcmV2KSByZXR1cm4gcHJldihldmVudCk7XG5cdH1cblx0O1xuXHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQob25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHVuZGVmaW5lZCwgeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pLCAxMjAwMDApO1xuXHRzY3JpcHQub25lcnJvciA9IG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCBzY3JpcHQub25lcnJvcik7XG5cdHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgc2NyaXB0Lm9ubG9hZCk7XG5cdG5lZWRBdHRhY2ggJiYgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xufTsiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBjdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xudmFyIGluc3RhbGxlZE1vZHVsZXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmM7XG5cbi8vIG1vZHVsZSBhbmQgcmVxdWlyZSBjcmVhdGlvblxudmFyIGN1cnJlbnRDaGlsZE1vZHVsZTtcbnZhciBjdXJyZW50UGFyZW50cyA9IFtdO1xuXG4vLyBzdGF0dXNcbnZhciByZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnMgPSBbXTtcbnZhciBjdXJyZW50U3RhdHVzID0gXCJpZGxlXCI7XG5cbi8vIHdoaWxlIGRvd25sb2FkaW5nXG52YXIgYmxvY2tpbmdQcm9taXNlcyA9IDA7XG52YXIgYmxvY2tpbmdQcm9taXNlc1dhaXRpbmcgPSBbXTtcblxuLy8gVGhlIHVwZGF0ZSBpbmZvXG52YXIgY3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnM7XG52YXIgcXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbl9fd2VicGFja19yZXF1aXJlX18uaG1yRCA9IGN1cnJlbnRNb2R1bGVEYXRhO1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmkucHVzaChmdW5jdGlvbiAob3B0aW9ucykge1xuXHR2YXIgbW9kdWxlID0gb3B0aW9ucy5tb2R1bGU7XG5cdHZhciByZXF1aXJlID0gY3JlYXRlUmVxdWlyZShvcHRpb25zLnJlcXVpcmUsIG9wdGlvbnMuaWQpO1xuXHRtb2R1bGUuaG90ID0gY3JlYXRlTW9kdWxlSG90T2JqZWN0KG9wdGlvbnMuaWQsIG1vZHVsZSk7XG5cdG1vZHVsZS5wYXJlbnRzID0gY3VycmVudFBhcmVudHM7XG5cdG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRjdXJyZW50UGFyZW50cyA9IFtdO1xuXHRvcHRpb25zLnJlcXVpcmUgPSByZXF1aXJlO1xufSk7XG5cbl9fd2VicGFja19yZXF1aXJlX18uaG1yQyA9IHt9O1xuX193ZWJwYWNrX3JlcXVpcmVfXy5obXJJID0ge307XG5cbmZ1bmN0aW9uIGNyZWF0ZVJlcXVpcmUocmVxdWlyZSwgbW9kdWxlSWQpIHtcblx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cdGlmICghbWUpIHJldHVybiByZXF1aXJlO1xuXHR2YXIgZm4gPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuXHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG5cdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuXHRcdFx0XHR2YXIgcGFyZW50cyA9IGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cztcblx0XHRcdFx0aWYgKHBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG5cdFx0XHRcdFx0cGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuXHRcdFx0XHRjdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuXHRcdFx0fVxuXHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG5cdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnNvbGUud2Fybihcblx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuXHRcdFx0XHRcdHJlcXVlc3QgK1xuXHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG5cdFx0XHRcdFx0bW9kdWxlSWRcblx0XHRcdCk7XG5cdFx0XHRjdXJyZW50UGFyZW50cyA9IFtdO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVxdWlyZShyZXF1ZXN0KTtcblx0fTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuIHJlcXVpcmVbbmFtZV07XG5cdFx0XHR9LFxuXHRcdFx0c2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdFx0cmVxdWlyZVtuYW1lXSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdH07XG5cdH07XG5cdGZvciAodmFyIG5hbWUgaW4gcmVxdWlyZSkge1xuXHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocmVxdWlyZSwgbmFtZSkgJiYgbmFtZSAhPT0gXCJlXCIpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKG5hbWUpKTtcblx0XHR9XG5cdH1cblx0Zm4uZSA9IGZ1bmN0aW9uIChjaHVua0lkKSB7XG5cdFx0cmV0dXJuIHRyYWNrQmxvY2tpbmdQcm9taXNlKHJlcXVpcmUuZShjaHVua0lkKSk7XG5cdH07XG5cdHJldHVybiBmbjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTW9kdWxlSG90T2JqZWN0KG1vZHVsZUlkLCBtZSkge1xuXHR2YXIgX21haW4gPSBjdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkO1xuXHR2YXIgaG90ID0ge1xuXHRcdC8vIHByaXZhdGUgc3R1ZmZcblx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuXHRcdF9hY2NlcHRlZEVycm9ySGFuZGxlcnM6IHt9LFxuXHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG5cdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG5cdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG5cdFx0X3NlbGZJbnZhbGlkYXRlZDogZmFsc2UsXG5cdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG5cdFx0X21haW46IF9tYWluLFxuXHRcdF9yZXF1aXJlU2VsZjogZnVuY3Rpb24gKCkge1xuXHRcdFx0Y3VycmVudFBhcmVudHMgPSBtZS5wYXJlbnRzLnNsaWNlKCk7XG5cdFx0XHRjdXJyZW50Q2hpbGRNb2R1bGUgPSBfbWFpbiA/IHVuZGVmaW5lZCA6IG1vZHVsZUlkO1xuXHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG5cdFx0fSxcblxuXHRcdC8vIE1vZHVsZSBBUElcblx0XHRhY3RpdmU6IHRydWUsXG5cdFx0YWNjZXB0OiBmdW5jdGlvbiAoZGVwLCBjYWxsYmFjaywgZXJyb3JIYW5kbGVyKSB7XG5cdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcblx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiICYmIGRlcCAhPT0gbnVsbCkge1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uICgpIHt9O1xuXHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWRFcnJvckhhbmRsZXJzW2RlcFtpXV0gPSBlcnJvckhhbmRsZXI7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uICgpIHt9O1xuXHRcdFx0XHRob3QuX2FjY2VwdGVkRXJyb3JIYW5kbGVyc1tkZXBdID0gZXJyb3JIYW5kbGVyO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0ZGVjbGluZTogZnVuY3Rpb24gKGRlcCkge1xuXHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiICYmIGRlcCAhPT0gbnVsbClcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG5cdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcblx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcblx0XHR9LFxuXHRcdGRpc3Bvc2U6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG5cdFx0fSxcblx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcblx0XHR9LFxuXHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcblx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG5cdFx0fSxcblx0XHRpbnZhbGlkYXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLl9zZWxmSW52YWxpZGF0ZWQgPSB0cnVlO1xuXHRcdFx0c3dpdGNoIChjdXJyZW50U3RhdHVzKSB7XG5cdFx0XHRcdGNhc2UgXCJpZGxlXCI6XG5cdFx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMgPSBbXTtcblx0XHRcdFx0XHRPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5obXJJW2tleV0oXG5cdFx0XHRcdFx0XHRcdG1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVyc1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRzZXRTdGF0dXMoXCJyZWFkeVwiKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcInJlYWR5XCI6XG5cdFx0XHRcdFx0T2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5obXJJKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uaG1ySVtrZXldKFxuXHRcdFx0XHRcdFx0XHRtb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnNcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJwcmVwYXJlXCI6XG5cdFx0XHRcdGNhc2UgXCJjaGVja1wiOlxuXHRcdFx0XHRjYXNlIFwiZGlzcG9zZVwiOlxuXHRcdFx0XHRjYXNlIFwiYXBwbHlcIjpcblx0XHRcdFx0XHQocXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzID0gcXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzIHx8IFtdKS5wdXNoKFxuXHRcdFx0XHRcdFx0bW9kdWxlSWRcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdC8vIGlnbm9yZSByZXF1ZXN0cyBpbiBlcnJvciBzdGF0ZXNcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gTWFuYWdlbWVudCBBUElcblx0XHRjaGVjazogaG90Q2hlY2ssXG5cdFx0YXBwbHk6IGhvdEFwcGx5LFxuXHRcdHN0YXR1czogZnVuY3Rpb24gKGwpIHtcblx0XHRcdGlmICghbCkgcmV0dXJuIGN1cnJlbnRTdGF0dXM7XG5cdFx0XHRyZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnMucHVzaChsKTtcblx0XHR9LFxuXHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uIChsKSB7XG5cdFx0XHRyZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnMucHVzaChsKTtcblx0XHR9LFxuXHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uIChsKSB7XG5cdFx0XHR2YXIgaWR4ID0gcmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG5cdFx0XHRpZiAoaWR4ID49IDApIHJlZ2lzdGVyZWRTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcblx0XHR9LFxuXG5cdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG5cdFx0ZGF0YTogY3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG5cdH07XG5cdGN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcblx0cmV0dXJuIGhvdDtcbn1cblxuZnVuY3Rpb24gc2V0U3RhdHVzKG5ld1N0YXR1cykge1xuXHRjdXJyZW50U3RhdHVzID0gbmV3U3RhdHVzO1xuXHR2YXIgcmVzdWx0cyA9IFtdO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgcmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuXHRcdHJlc3VsdHNbaV0gPSByZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuXG5cdHJldHVybiBQcm9taXNlLmFsbChyZXN1bHRzKTtcbn1cblxuZnVuY3Rpb24gdW5ibG9jaygpIHtcblx0aWYgKC0tYmxvY2tpbmdQcm9taXNlcyA9PT0gMCkge1xuXHRcdHNldFN0YXR1cyhcInJlYWR5XCIpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKGJsb2NraW5nUHJvbWlzZXMgPT09IDApIHtcblx0XHRcdFx0dmFyIGxpc3QgPSBibG9ja2luZ1Byb21pc2VzV2FpdGluZztcblx0XHRcdFx0YmxvY2tpbmdQcm9taXNlc1dhaXRpbmcgPSBbXTtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0bGlzdFtpXSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdHJhY2tCbG9ja2luZ1Byb21pc2UocHJvbWlzZSkge1xuXHRzd2l0Y2ggKGN1cnJlbnRTdGF0dXMpIHtcblx0XHRjYXNlIFwicmVhZHlcIjpcblx0XHRcdHNldFN0YXR1cyhcInByZXBhcmVcIik7XG5cdFx0LyogZmFsbHRocm91Z2ggKi9cblx0XHRjYXNlIFwicHJlcGFyZVwiOlxuXHRcdFx0YmxvY2tpbmdQcm9taXNlcysrO1xuXHRcdFx0cHJvbWlzZS50aGVuKHVuYmxvY2ssIHVuYmxvY2spO1xuXHRcdFx0cmV0dXJuIHByb21pc2U7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiBwcm9taXNlO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHdhaXRGb3JCbG9ja2luZ1Byb21pc2VzKGZuKSB7XG5cdGlmIChibG9ja2luZ1Byb21pc2VzID09PSAwKSByZXR1cm4gZm4oKTtcblx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG5cdFx0YmxvY2tpbmdQcm9taXNlc1dhaXRpbmcucHVzaChmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXNvbHZlKGZuKCkpO1xuXHRcdH0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gaG90Q2hlY2soYXBwbHlPblVwZGF0ZSkge1xuXHRpZiAoY3VycmVudFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcblx0fVxuXHRyZXR1cm4gc2V0U3RhdHVzKFwiY2hlY2tcIilcblx0XHQudGhlbihfX3dlYnBhY2tfcmVxdWlyZV9fLmhtck0pXG5cdFx0LnRoZW4oZnVuY3Rpb24gKHVwZGF0ZSkge1xuXHRcdFx0aWYgKCF1cGRhdGUpIHtcblx0XHRcdFx0cmV0dXJuIHNldFN0YXR1cyhhcHBseUludmFsaWRhdGVkTW9kdWxlcygpID8gXCJyZWFkeVwiIDogXCJpZGxlXCIpLnRoZW4oXG5cdFx0XHRcdFx0ZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gc2V0U3RhdHVzKFwicHJlcGFyZVwiKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dmFyIHVwZGF0ZWRNb2R1bGVzID0gW107XG5cdFx0XHRcdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzID0gW107XG5cblx0XHRcdFx0cmV0dXJuIFByb21pc2UuYWxsKFxuXHRcdFx0XHRcdE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uaG1yQykucmVkdWNlKGZ1bmN0aW9uIChcblx0XHRcdFx0XHRcdHByb21pc2VzLFxuXHRcdFx0XHRcdFx0a2V5XG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckNba2V5XShcblx0XHRcdFx0XHRcdFx0dXBkYXRlLmMsXG5cdFx0XHRcdFx0XHRcdHVwZGF0ZS5yLFxuXHRcdFx0XHRcdFx0XHR1cGRhdGUubSxcblx0XHRcdFx0XHRcdFx0cHJvbWlzZXMsXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzLFxuXHRcdFx0XHRcdFx0XHR1cGRhdGVkTW9kdWxlc1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdHJldHVybiBwcm9taXNlcztcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFtdKVxuXHRcdFx0XHQpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHJldHVybiB3YWl0Rm9yQmxvY2tpbmdQcm9taXNlcyhmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRpZiAoYXBwbHlPblVwZGF0ZSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gaW50ZXJuYWxBcHBseShhcHBseU9uVXBkYXRlKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBzZXRTdGF0dXMoXCJyZWFkeVwiKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdXBkYXRlZE1vZHVsZXM7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH0pO1xufVxuXG5mdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG5cdGlmIChjdXJyZW50U3RhdHVzICE9PSBcInJlYWR5XCIpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzIChzdGF0ZTogXCIgK1xuXHRcdFx0XHRcdGN1cnJlbnRTdGF0dXMgK1xuXHRcdFx0XHRcdFwiKVwiXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG5cdHJldHVybiBpbnRlcm5hbEFwcGx5KG9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiBpbnRlcm5hbEFwcGx5KG9wdGlvbnMpIHtcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0YXBwbHlJbnZhbGlkYXRlZE1vZHVsZXMoKTtcblxuXHR2YXIgcmVzdWx0cyA9IGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzLm1hcChmdW5jdGlvbiAoaGFuZGxlcikge1xuXHRcdHJldHVybiBoYW5kbGVyKG9wdGlvbnMpO1xuXHR9KTtcblx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMgPSB1bmRlZmluZWQ7XG5cblx0dmFyIGVycm9ycyA9IHJlc3VsdHNcblx0XHQubWFwKGZ1bmN0aW9uIChyKSB7XG5cdFx0XHRyZXR1cm4gci5lcnJvcjtcblx0XHR9KVxuXHRcdC5maWx0ZXIoQm9vbGVhbik7XG5cblx0aWYgKGVycm9ycy5sZW5ndGggPiAwKSB7XG5cdFx0cmV0dXJuIHNldFN0YXR1cyhcImFib3J0XCIpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhyb3cgZXJyb3JzWzBdO1xuXHRcdH0pO1xuXHR9XG5cblx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG5cdHZhciBkaXNwb3NlUHJvbWlzZSA9IHNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG5cblx0cmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uIChyZXN1bHQpIHtcblx0XHRpZiAocmVzdWx0LmRpc3Bvc2UpIHJlc3VsdC5kaXNwb3NlKCk7XG5cdH0pO1xuXG5cdC8vIE5vdyBpbiBcImFwcGx5XCIgcGhhc2Vcblx0dmFyIGFwcGx5UHJvbWlzZSA9IHNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG5cdHZhciBlcnJvcjtcblx0dmFyIHJlcG9ydEVycm9yID0gZnVuY3Rpb24gKGVycikge1xuXHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuXHR9O1xuXG5cdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcblx0cmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uIChyZXN1bHQpIHtcblx0XHRpZiAocmVzdWx0LmFwcGx5KSB7XG5cdFx0XHR2YXIgbW9kdWxlcyA9IHJlc3VsdC5hcHBseShyZXBvcnRFcnJvcik7XG5cdFx0XHRpZiAobW9kdWxlcykge1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChtb2R1bGVzW2ldKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cblx0cmV0dXJuIFByb21pc2UuYWxsKFtkaXNwb3NlUHJvbWlzZSwgYXBwbHlQcm9taXNlXSkudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcblx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdHJldHVybiBzZXRTdGF0dXMoXCJmYWlsXCIpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR0aHJvdyBlcnJvcjtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGlmIChxdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMpIHtcblx0XHRcdHJldHVybiBpbnRlcm5hbEFwcGx5KG9wdGlvbnMpLnRoZW4oZnVuY3Rpb24gKGxpc3QpIHtcblx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1vZHVsZUlkKSB7XG5cdFx0XHRcdFx0aWYgKGxpc3QuaW5kZXhPZihtb2R1bGVJZCkgPCAwKSBsaXN0LnB1c2gobW9kdWxlSWQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuIGxpc3Q7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gc2V0U3RhdHVzKFwiaWRsZVwiKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBvdXRkYXRlZE1vZHVsZXM7XG5cdFx0fSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBhcHBseUludmFsaWRhdGVkTW9kdWxlcygpIHtcblx0aWYgKHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcykge1xuXHRcdGlmICghY3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMpIGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzID0gW107XG5cdFx0T2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5obXJJKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGVJZCkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmhtcklba2V5XShcblx0XHRcdFx0XHRtb2R1bGVJZCxcblx0XHRcdFx0XHRjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVyc1xuXHRcdFx0XHQpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0cXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzID0gdW5kZWZpbmVkO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG59IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7IiwidmFyIGNyZWF0ZVN0eWxlc2hlZXQgPSBmdW5jdGlvbihjaHVua0lkLCBmdWxsaHJlZiwgcmVzb2x2ZSwgcmVqZWN0KSB7XG5cdHZhciBsaW5rVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cblx0bGlua1RhZy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblx0bGlua1RhZy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHR2YXIgb25MaW5rQ29tcGxldGUgPSBmdW5jdGlvbihldmVudCkge1xuXHRcdC8vIGF2b2lkIG1lbSBsZWFrcy5cblx0XHRsaW5rVGFnLm9uZXJyb3IgPSBsaW5rVGFnLm9ubG9hZCA9IG51bGw7XG5cdFx0aWYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJykge1xuXHRcdFx0cmVzb2x2ZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuXHRcdFx0dmFyIHJlYWxIcmVmID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5ocmVmIHx8IGZ1bGxocmVmO1xuXHRcdFx0dmFyIGVyciA9IG5ldyBFcnJvcihcIkxvYWRpbmcgQ1NTIGNodW5rIFwiICsgY2h1bmtJZCArIFwiIGZhaWxlZC5cXG4oXCIgKyByZWFsSHJlZiArIFwiKVwiKTtcblx0XHRcdGVyci5jb2RlID0gXCJDU1NfQ0hVTktfTE9BRF9GQUlMRURcIjtcblx0XHRcdGVyci50eXBlID0gZXJyb3JUeXBlO1xuXHRcdFx0ZXJyLnJlcXVlc3QgPSByZWFsSHJlZjtcblx0XHRcdGxpbmtUYWcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChsaW5rVGFnKVxuXHRcdFx0cmVqZWN0KGVycik7XG5cdFx0fVxuXHR9XG5cdGxpbmtUYWcub25lcnJvciA9IGxpbmtUYWcub25sb2FkID0gb25MaW5rQ29tcGxldGU7XG5cdGxpbmtUYWcuaHJlZiA9IGZ1bGxocmVmO1xuXG5cdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGlua1RhZyk7XG5cdHJldHVybiBsaW5rVGFnO1xufTtcbnZhciBmaW5kU3R5bGVzaGVldCA9IGZ1bmN0aW9uKGhyZWYsIGZ1bGxocmVmKSB7XG5cdHZhciBleGlzdGluZ0xpbmtUYWdzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJsaW5rXCIpO1xuXHRmb3IodmFyIGkgPSAwOyBpIDwgZXhpc3RpbmdMaW5rVGFncy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciB0YWcgPSBleGlzdGluZ0xpbmtUYWdzW2ldO1xuXHRcdHZhciBkYXRhSHJlZiA9IHRhZy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWhyZWZcIikgfHwgdGFnLmdldEF0dHJpYnV0ZShcImhyZWZcIik7XG5cdFx0aWYodGFnLnJlbCA9PT0gXCJzdHlsZXNoZWV0XCIgJiYgKGRhdGFIcmVmID09PSBocmVmIHx8IGRhdGFIcmVmID09PSBmdWxsaHJlZikpIHJldHVybiB0YWc7XG5cdH1cblx0dmFyIGV4aXN0aW5nU3R5bGVUYWdzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzdHlsZVwiKTtcblx0Zm9yKHZhciBpID0gMDsgaSA8IGV4aXN0aW5nU3R5bGVUYWdzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHRhZyA9IGV4aXN0aW5nU3R5bGVUYWdzW2ldO1xuXHRcdHZhciBkYXRhSHJlZiA9IHRhZy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWhyZWZcIik7XG5cdFx0aWYoZGF0YUhyZWYgPT09IGhyZWYgfHwgZGF0YUhyZWYgPT09IGZ1bGxocmVmKSByZXR1cm4gdGFnO1xuXHR9XG59O1xudmFyIGxvYWRTdHlsZXNoZWV0ID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0dmFyIGhyZWYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLm1pbmlDc3NGKGNodW5rSWQpO1xuXHRcdHZhciBmdWxsaHJlZiA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIGhyZWY7XG5cdFx0aWYoZmluZFN0eWxlc2hlZXQoaHJlZiwgZnVsbGhyZWYpKSByZXR1cm4gcmVzb2x2ZSgpO1xuXHRcdGNyZWF0ZVN0eWxlc2hlZXQoY2h1bmtJZCwgZnVsbGhyZWYsIHJlc29sdmUsIHJlamVjdCk7XG5cdH0pO1xufVxuLy8gbm8gY2h1bmsgbG9hZGluZ1xuXG52YXIgb2xkVGFncyA9IFtdO1xudmFyIG5ld1RhZ3MgPSBbXTtcbnZhciBhcHBseUhhbmRsZXIgPSBmdW5jdGlvbihvcHRpb25zKSB7XG5cdHJldHVybiB7IGRpc3Bvc2U6IGZ1bmN0aW9uKCkge1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBvbGRUYWdzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgb2xkVGFnID0gb2xkVGFnc1tpXTtcblx0XHRcdGlmKG9sZFRhZy5wYXJlbnROb2RlKSBvbGRUYWcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChvbGRUYWcpO1xuXHRcdH1cblx0XHRvbGRUYWdzLmxlbmd0aCA9IDA7XG5cdH0sIGFwcGx5OiBmdW5jdGlvbigpIHtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbmV3VGFncy5sZW5ndGg7IGkrKykgbmV3VGFnc1tpXS5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblx0XHRuZXdUYWdzLmxlbmd0aCA9IDA7XG5cdH0gfTtcbn1cbl9fd2VicGFja19yZXF1aXJlX18uaG1yQy5taW5pQ3NzID0gZnVuY3Rpb24oY2h1bmtJZHMsIHJlbW92ZWRDaHVua3MsIHJlbW92ZWRNb2R1bGVzLCBwcm9taXNlcywgYXBwbHlIYW5kbGVycywgdXBkYXRlZE1vZHVsZXNMaXN0KSB7XG5cdGFwcGx5SGFuZGxlcnMucHVzaChhcHBseUhhbmRsZXIpO1xuXHRjaHVua0lkcy5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcblx0XHR2YXIgaHJlZiA9IF9fd2VicGFja19yZXF1aXJlX18ubWluaUNzc0YoY2h1bmtJZCk7XG5cdFx0dmFyIGZ1bGxocmVmID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgaHJlZjtcblx0XHR2YXIgb2xkVGFnID0gZmluZFN0eWxlc2hlZXQoaHJlZiwgZnVsbGhyZWYpO1xuXHRcdGlmKCFvbGRUYWcpIHJldHVybjtcblx0XHRwcm9taXNlcy5wdXNoKG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdFx0dmFyIHRhZyA9IGNyZWF0ZVN0eWxlc2hlZXQoY2h1bmtJZCwgZnVsbGhyZWYsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR0YWcuYXMgPSBcInN0eWxlXCI7XG5cdFx0XHRcdHRhZy5yZWwgPSBcInByZWxvYWRcIjtcblx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0fSwgcmVqZWN0KTtcblx0XHRcdG9sZFRhZ3MucHVzaChvbGRUYWcpO1xuXHRcdFx0bmV3VGFncy5wdXNoKHRhZyk7XG5cdFx0fSkpO1xuXHR9KTtcbn0iLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IF9fd2VicGFja19yZXF1aXJlX18uaG1yU19qc29ucCA9IF9fd2VicGFja19yZXF1aXJlX18uaG1yU19qc29ucCB8fCB7XG5cdFwiaW5kZXhcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbnZhciBjdXJyZW50VXBkYXRlZE1vZHVsZXNMaXN0O1xudmFyIHdhaXRpbmdVcGRhdGVSZXNvbHZlcyA9IHt9O1xuZnVuY3Rpb24gbG9hZFVwZGF0ZUNodW5rKGNodW5rSWQsIHVwZGF0ZWRNb2R1bGVzTGlzdCkge1xuXHRjdXJyZW50VXBkYXRlZE1vZHVsZXNMaXN0ID0gdXBkYXRlZE1vZHVsZXNMaXN0O1xuXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0d2FpdGluZ1VwZGF0ZVJlc29sdmVzW2NodW5rSWRdID0gcmVzb2x2ZTtcblx0XHQvLyBzdGFydCB1cGRhdGUgY2h1bmsgbG9hZGluZ1xuXHRcdHZhciB1cmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLmh1KGNodW5rSWQpO1xuXHRcdC8vIGNyZWF0ZSBlcnJvciBiZWZvcmUgc3RhY2sgdW53b3VuZCB0byBnZXQgdXNlZnVsIHN0YWNrdHJhY2UgbGF0ZXJcblx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcblx0XHR2YXIgbG9hZGluZ0VuZGVkID0gZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdGlmKHdhaXRpbmdVcGRhdGVSZXNvbHZlc1tjaHVua0lkXSkge1xuXHRcdFx0XHR3YWl0aW5nVXBkYXRlUmVzb2x2ZXNbY2h1bmtJZF0gPSB1bmRlZmluZWRcblx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcblx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcblx0XHRcdFx0ZXJyb3IubWVzc2FnZSA9ICdMb2FkaW5nIGhvdCB1cGRhdGUgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknO1xuXHRcdFx0XHRlcnJvci5uYW1lID0gJ0NodW5rTG9hZEVycm9yJztcblx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcblx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG5cdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHR9XG5cdFx0fTtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmwodXJsLCBsb2FkaW5nRW5kZWQpO1xuXHR9KTtcbn1cblxuc2VsZltcIndlYnBhY2tIb3RVcGRhdGV0b3hpblwiXSA9IGZ1bmN0aW9uKGNodW5rSWQsIG1vcmVNb2R1bGVzLCBydW50aW1lKSB7XG5cdGZvcih2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0Y3VycmVudFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHRpZihjdXJyZW50VXBkYXRlZE1vZHVsZXNMaXN0KSBjdXJyZW50VXBkYXRlZE1vZHVsZXNMaXN0LnB1c2gobW9kdWxlSWQpO1xuXHRcdH1cblx0fVxuXHRpZihydW50aW1lKSBjdXJyZW50VXBkYXRlUnVudGltZS5wdXNoKHJ1bnRpbWUpO1xuXHRpZih3YWl0aW5nVXBkYXRlUmVzb2x2ZXNbY2h1bmtJZF0pIHtcblx0XHR3YWl0aW5nVXBkYXRlUmVzb2x2ZXNbY2h1bmtJZF0oKTtcblx0XHR3YWl0aW5nVXBkYXRlUmVzb2x2ZXNbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG5cdH1cbn07XG5cbnZhciBjdXJyZW50VXBkYXRlQ2h1bmtzO1xudmFyIGN1cnJlbnRVcGRhdGU7XG52YXIgY3VycmVudFVwZGF0ZVJlbW92ZWRDaHVua3M7XG52YXIgY3VycmVudFVwZGF0ZVJ1bnRpbWU7XG5mdW5jdGlvbiBhcHBseUhhbmRsZXIob3B0aW9ucykge1xuXHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5mKSBkZWxldGUgX193ZWJwYWNrX3JlcXVpcmVfXy5mLmpzb25wSG1yO1xuXHRjdXJyZW50VXBkYXRlQ2h1bmtzID0gdW5kZWZpbmVkO1xuXHRmdW5jdGlvbiBnZXRBZmZlY3RlZE1vZHVsZUVmZmVjdHModXBkYXRlTW9kdWxlSWQpIHtcblx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcblx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5tYXAoZnVuY3Rpb24gKGlkKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRjaGFpbjogW2lkXSxcblx0XHRcdFx0aWQ6IGlkXG5cdFx0XHR9O1xuXHRcdH0pO1xuXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG5cdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG5cdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG5cdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG5cdFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW21vZHVsZUlkXTtcblx0XHRcdGlmIChcblx0XHRcdFx0IW1vZHVsZSB8fFxuXHRcdFx0XHQobW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkICYmICFtb2R1bGUuaG90Ll9zZWxmSW52YWxpZGF0ZWQpXG5cdFx0XHQpXG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuXHRcdFx0XHRcdGNoYWluOiBjaGFpbixcblx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG5cdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuXHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcblx0XHRcdFx0dmFyIHBhcmVudCA9IF9fd2VicGFja19yZXF1aXJlX18uY1twYXJlbnRJZF07XG5cdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcblx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuXHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG5cdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG5cdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcblx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcblx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcblx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuXHRcdFx0XHRxdWV1ZS5wdXNoKHtcblx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuXHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuXHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuXHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG5cdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcblx0XHR9O1xuXHR9XG5cblx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuXHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcblx0XHR9XG5cdH1cblxuXHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuXHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG5cdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG5cdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cblx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZShtb2R1bGUpIHtcblx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIG1vZHVsZS5pZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuXHRcdCk7XG5cdH07XG5cblx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gY3VycmVudFVwZGF0ZSkge1xuXHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm8oY3VycmVudFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG5cdFx0XHR2YXIgbmV3TW9kdWxlRmFjdG9yeSA9IGN1cnJlbnRVcGRhdGVbbW9kdWxlSWRdO1xuXHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuXHRcdFx0dmFyIHJlc3VsdDtcblx0XHRcdGlmIChuZXdNb2R1bGVGYWN0b3J5KSB7XG5cdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkTW9kdWxlRWZmZWN0cyhtb2R1bGVJZCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXN1bHQgPSB7XG5cdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuXHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cblx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG5cdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuXHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuXHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG5cdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG5cdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcblx0XHRcdH1cblx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcblx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcblx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcblx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG5cdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuXHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuXHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG5cdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuXHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcblx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG5cdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG5cdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcblx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcblx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG5cdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuXHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcblx0XHRcdH1cblx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZXJyb3I6IGFib3J0RXJyb3Jcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHRcdGlmIChkb0FwcGx5KSB7XG5cdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gbmV3TW9kdWxlRmFjdG9yeTtcblx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcblx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcblx0XHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5vKHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcblx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG5cdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcblx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuXHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuXHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcblx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGN1cnJlbnRVcGRhdGUgPSB1bmRlZmluZWQ7XG5cblx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuXHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG5cdGZvciAodmFyIGogPSAwOyBqIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaisrKSB7XG5cdFx0dmFyIG91dGRhdGVkTW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbal07XG5cdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18uY1tvdXRkYXRlZE1vZHVsZUlkXTtcblx0XHRpZiAoXG5cdFx0XHRtb2R1bGUgJiZcblx0XHRcdChtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQgfHwgbW9kdWxlLmhvdC5fbWFpbikgJiZcblx0XHRcdC8vIHJlbW92ZWQgc2VsZi1hY2NlcHRlZCBtb2R1bGVzIHNob3VsZCBub3QgYmUgcmVxdWlyZWRcblx0XHRcdGFwcGxpZWRVcGRhdGVbb3V0ZGF0ZWRNb2R1bGVJZF0gIT09IHdhcm5VbmV4cGVjdGVkUmVxdWlyZSAmJlxuXHRcdFx0Ly8gd2hlbiBjYWxsZWQgaW52YWxpZGF0ZSBzZWxmLWFjY2VwdGluZyBpcyBub3QgcG9zc2libGVcblx0XHRcdCFtb2R1bGUuaG90Ll9zZWxmSW52YWxpZGF0ZWRcblx0XHQpIHtcblx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcblx0XHRcdFx0bW9kdWxlOiBvdXRkYXRlZE1vZHVsZUlkLFxuXHRcdFx0XHRyZXF1aXJlOiBtb2R1bGUuaG90Ll9yZXF1aXJlU2VsZixcblx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWRcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcblxuXHRyZXR1cm4ge1xuXHRcdGRpc3Bvc2U6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGN1cnJlbnRVcGRhdGVSZW1vdmVkQ2h1bmtzLmZvckVhY2goZnVuY3Rpb24gKGNodW5rSWQpIHtcblx0XHRcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcblx0XHRcdH0pO1xuXHRcdFx0Y3VycmVudFVwZGF0ZVJlbW92ZWRDaHVua3MgPSB1bmRlZmluZWQ7XG5cblx0XHRcdHZhciBpZHg7XG5cdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcblx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuXHRcdFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW21vZHVsZUlkXTtcblx0XHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG5cdFx0XHRcdHZhciBkYXRhID0ge307XG5cblx0XHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG5cdFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG5cdFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRkaXNwb3NlSGFuZGxlcnNbal0uY2FsbChudWxsLCBkYXRhKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckRbbW9kdWxlSWRdID0gZGF0YTtcblxuXHRcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuXHRcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG5cdFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuXHRcdFx0XHRkZWxldGUgX193ZWJwYWNrX3JlcXVpcmVfXy5jW21vZHVsZUlkXTtcblxuXHRcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG5cdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cblx0XHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRcdHZhciBjaGlsZCA9IF9fd2VicGFja19yZXF1aXJlX18uY1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuXHRcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuXHRcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG5cdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG5cdFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuXHRcdFx0dmFyIGRlcGVuZGVuY3k7XG5cdFx0XHRmb3IgKHZhciBvdXRkYXRlZE1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG5cdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm8ob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG91dGRhdGVkTW9kdWxlSWQpKSB7XG5cdFx0XHRcdFx0bW9kdWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW291dGRhdGVkTW9kdWxlSWRdO1xuXHRcdFx0XHRcdGlmIChtb2R1bGUpIHtcblx0XHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID1cblx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbb3V0ZGF0ZWRNb2R1bGVJZF07XG5cdFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuXHRcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcblx0XHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRhcHBseTogZnVuY3Rpb24gKHJlcG9ydEVycm9yKSB7XG5cdFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcblx0XHRcdGZvciAodmFyIHVwZGF0ZU1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcblx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubyhhcHBsaWVkVXBkYXRlLCB1cGRhdGVNb2R1bGVJZCkpIHtcblx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bdXBkYXRlTW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVt1cGRhdGVNb2R1bGVJZF07XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gcnVuIG5ldyBydW50aW1lIG1vZHVsZXNcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY3VycmVudFVwZGF0ZVJ1bnRpbWUubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Y3VycmVudFVwZGF0ZVJ1bnRpbWVbaV0oX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG5cdFx0XHRmb3IgKHZhciBvdXRkYXRlZE1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG5cdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm8ob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG91dGRhdGVkTW9kdWxlSWQpKSB7XG5cdFx0XHRcdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18uY1tvdXRkYXRlZE1vZHVsZUlkXTtcblx0XHRcdFx0XHRpZiAobW9kdWxlKSB7XG5cdFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9XG5cdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW291dGRhdGVkTW9kdWxlSWRdO1xuXHRcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuXHRcdFx0XHRcdFx0dmFyIGVycm9ySGFuZGxlcnMgPSBbXTtcblx0XHRcdFx0XHRcdHZhciBkZXBlbmRlbmNpZXNGb3JDYWxsYmFja3MgPSBbXTtcblx0XHRcdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRcdFx0dmFyIGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcblx0XHRcdFx0XHRcdFx0dmFyIGFjY2VwdENhbGxiYWNrID1cblx0XHRcdFx0XHRcdFx0XHRtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcblx0XHRcdFx0XHRcdFx0dmFyIGVycm9ySGFuZGxlciA9XG5cdFx0XHRcdFx0XHRcdFx0bW9kdWxlLmhvdC5fYWNjZXB0ZWRFcnJvckhhbmRsZXJzW2RlcGVuZGVuY3ldO1xuXHRcdFx0XHRcdFx0XHRpZiAoYWNjZXB0Q2FsbGJhY2spIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoYWNjZXB0Q2FsbGJhY2spICE9PSAtMSkgY29udGludWU7XG5cdFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goYWNjZXB0Q2FsbGJhY2spO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9ySGFuZGxlcnMucHVzaChlcnJvckhhbmRsZXIpO1xuXHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY2llc0ZvckNhbGxiYWNrcy5wdXNoKGRlcGVuZGVuY3kpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBrID0gMDsgayA8IGNhbGxiYWNrcy5sZW5ndGg7IGsrKykge1xuXHRcdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRcdGNhbGxiYWNrc1trXS5jYWxsKG51bGwsIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcblx0XHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBlcnJvckhhbmRsZXJzW2tdID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGVycm9ySGFuZGxlcnNba10oZXJyLCB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG91dGRhdGVkTW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBkZXBlbmRlbmNpZXNGb3JDYWxsYmFja3Nba11cblx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG91dGRhdGVkTW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IGRlcGVuZGVuY2llc0ZvckNhbGxiYWNrc1trXSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIyKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBvdXRkYXRlZE1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogZGVwZW5kZW5jaWVzRm9yQ2FsbGJhY2tzW2tdLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuXHRcdFx0Zm9yICh2YXIgbyA9IDA7IG8gPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBvKyspIHtcblx0XHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbb107XG5cdFx0XHRcdHZhciBtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGl0ZW0ucmVxdWlyZShtb2R1bGVJZCk7XG5cdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyLCB7XG5cdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdG1vZHVsZTogX193ZWJwYWNrX3JlcXVpcmVfXy5jW21vZHVsZUlkXVxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcblx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcblx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuXHRcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIyKTtcblx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG5cdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gb3V0ZGF0ZWRNb2R1bGVzO1xuXHRcdH1cblx0fTtcbn1cbl9fd2VicGFja19yZXF1aXJlX18uaG1ySS5qc29ucCA9IGZ1bmN0aW9uIChtb2R1bGVJZCwgYXBwbHlIYW5kbGVycykge1xuXHRpZiAoIWN1cnJlbnRVcGRhdGUpIHtcblx0XHRjdXJyZW50VXBkYXRlID0ge307XG5cdFx0Y3VycmVudFVwZGF0ZVJ1bnRpbWUgPSBbXTtcblx0XHRjdXJyZW50VXBkYXRlUmVtb3ZlZENodW5rcyA9IFtdO1xuXHRcdGFwcGx5SGFuZGxlcnMucHVzaChhcHBseUhhbmRsZXIpO1xuXHR9XG5cdGlmICghX193ZWJwYWNrX3JlcXVpcmVfXy5vKGN1cnJlbnRVcGRhdGUsIG1vZHVsZUlkKSkge1xuXHRcdGN1cnJlbnRVcGRhdGVbbW9kdWxlSWRdID0gX193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXTtcblx0fVxufTtcbl9fd2VicGFja19yZXF1aXJlX18uaG1yQy5qc29ucCA9IGZ1bmN0aW9uIChcblx0Y2h1bmtJZHMsXG5cdHJlbW92ZWRDaHVua3MsXG5cdHJlbW92ZWRNb2R1bGVzLFxuXHRwcm9taXNlcyxcblx0YXBwbHlIYW5kbGVycyxcblx0dXBkYXRlZE1vZHVsZXNMaXN0XG4pIHtcblx0YXBwbHlIYW5kbGVycy5wdXNoKGFwcGx5SGFuZGxlcik7XG5cdGN1cnJlbnRVcGRhdGVDaHVua3MgPSB7fTtcblx0Y3VycmVudFVwZGF0ZVJlbW92ZWRDaHVua3MgPSByZW1vdmVkQ2h1bmtzO1xuXHRjdXJyZW50VXBkYXRlID0gcmVtb3ZlZE1vZHVsZXMucmVkdWNlKGZ1bmN0aW9uIChvYmosIGtleSkge1xuXHRcdG9ialtrZXldID0gZmFsc2U7XG5cdFx0cmV0dXJuIG9iajtcblx0fSwge30pO1xuXHRjdXJyZW50VXBkYXRlUnVudGltZSA9IFtdO1xuXHRjaHVua0lkcy5mb3JFYWNoKGZ1bmN0aW9uIChjaHVua0lkKSB7XG5cdFx0aWYgKFxuXHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiZcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSAhPT0gdW5kZWZpbmVkXG5cdFx0KSB7XG5cdFx0XHRwcm9taXNlcy5wdXNoKGxvYWRVcGRhdGVDaHVuayhjaHVua0lkLCB1cGRhdGVkTW9kdWxlc0xpc3QpKTtcblx0XHRcdGN1cnJlbnRVcGRhdGVDaHVua3NbY2h1bmtJZF0gPSB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjdXJyZW50VXBkYXRlQ2h1bmtzW2NodW5rSWRdID0gZmFsc2U7XG5cdFx0fVxuXHR9KTtcblx0aWYgKF9fd2VicGFja19yZXF1aXJlX18uZikge1xuXHRcdF9fd2VicGFja19yZXF1aXJlX18uZi5qc29ucEhtciA9IGZ1bmN0aW9uIChjaHVua0lkLCBwcm9taXNlcykge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRjdXJyZW50VXBkYXRlQ2h1bmtzICYmXG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubyhjdXJyZW50VXBkYXRlQ2h1bmtzLCBjaHVua0lkKSAmJlxuXHRcdFx0XHQhY3VycmVudFVwZGF0ZUNodW5rc1tjaHVua0lkXVxuXHRcdFx0KSB7XG5cdFx0XHRcdHByb21pc2VzLnB1c2gobG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpKTtcblx0XHRcdFx0Y3VycmVudFVwZGF0ZUNodW5rc1tjaHVua0lkXSA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxufTtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5obXJNID0gZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZmV0Y2ggPT09IFwidW5kZWZpbmVkXCIpIHRocm93IG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydDogbmVlZCBmZXRjaCBBUElcIik7XG5cdHJldHVybiBmZXRjaChfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckYoKSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdGlmKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0KSByZXR1cm47IC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcblx0XHRpZighcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmZXRjaCB1cGRhdGUgbWFuaWZlc3QgXCIgKyByZXNwb25zZS5zdGF0dXNUZXh0KTtcblx0XHRyZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuXHR9KTtcbn07XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gZnVuY3Rpb24oY2h1bmtJZCkgeyByZXR1cm4gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwOyB9O1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IGZ1bmN0aW9uKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSB7XG5cdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG5cdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG5cdHZhciBydW50aW1lID0gZGF0YVsyXTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKGZ1bmN0aW9uKGlkKSB7IHJldHVybiBpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwOyB9KSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt0b3hpblwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmt0b3hpblwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gbW9kdWxlIGNhY2hlIGFyZSB1c2VkIHNvIGVudHJ5IGlubGluaW5nIGlzIGRpc2FibGVkXG4vLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX2ludGVybl9icm93c2VyX2ludGVybl9qcy1ub2RlX21vZHVsZXNfanF1ZXJ5X2Rpc3RfanF1ZXJ5X2pzLW5vZGVfbW9kdWxlcy05YjRmZmFcIl0sIGZ1bmN0aW9uKCkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2stZGV2LXNlcnZlci9jbGllbnQvaW5kZXguanM/cHJvdG9jb2w9d3MlM0EmaG9zdG5hbWU9MC4wLjAuMCZwb3J0PTgwODAmcGF0aG5hbWU9JTJGd3MmbG9nZ2luZz1pbmZvJnJlY29ubmVjdD0xMFwiKTsgfSlcbl9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX2ludGVybl9icm93c2VyX2ludGVybl9qcy1ub2RlX21vZHVsZXNfanF1ZXJ5X2Rpc3RfanF1ZXJ5X2pzLW5vZGVfbW9kdWxlcy05YjRmZmFcIl0sIGZ1bmN0aW9uKCkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svaG90L2Rldi1zZXJ2ZXIuanNcIik7IH0pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc19pbnRlcm5fYnJvd3Nlcl9pbnRlcm5fanMtbm9kZV9tb2R1bGVzX2pxdWVyeV9kaXN0X2pxdWVyeV9qcy1ub2RlX21vZHVsZXMtOWI0ZmZhXCJdLCBmdW5jdGlvbigpIHsgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oXCIuL25vZGVfbW9kdWxlcy9pbnRlcm4vYnJvd3Nlci9pbnRlcm4uanNcIik7IH0pXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvcnMtbm9kZV9tb2R1bGVzX2ludGVybl9icm93c2VyX2ludGVybl9qcy1ub2RlX21vZHVsZXNfanF1ZXJ5X2Rpc3RfanF1ZXJ5X2pzLW5vZGVfbW9kdWxlcy05YjRmZmFcIl0sIGZ1bmN0aW9uKCkgeyByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpOyB9KVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6WyIkIiwiQnV0dG9uIiwiSFRNTEJ1dHRvbkVsZW1lbnQiLCJvYnNlcnZlZEF0dHJpYnV0ZXMiLCJnZXRSb290UHJvcHMiLCJyb290IiwiZWxlbWVudHMiLCJBUlJPVyIsIlRFWFQiLCJldmVudHMiLCJDTElDS19BUlJPVyIsIkNMSUNLX1RFWFRfUkVTRVQiLCJDTElDS19URVhUX0FDQ0VQVCIsIlRPR0dMRV9URVhUX1JFU0VUIiwiY29uc3RydWN0b3IiLCJjb25uZWN0ZWRDYWxsQmFjayIsImRpc2Nvbm5lY3RlZENhbGxCYWNrIiwiYXR0cmlidXRlc0NoYW5nZWRDYWxsYmFjayIsImVsZW1lbnQiLCJvbGRWYWx1ZSIsIm5ld1ZhbHVlIiwiY29uc29sZSIsImluZm8iLCJCdXR0b25JY29uIiwiQnV0dG9uVGV4dCIsIndpbmRvdyIsImN1c3RvbUVsZW1lbnRzIiwiZGVmaW5lIiwiZXh0ZW5kcyIsInJlcXVpcmUiLCJ3b3JkcyIsIndvcmRPZk51bSIsInNldERpc2FibGVkIiwicmVtb3ZlRGlzYWJsZWQiLCJzbGVlcCIsIkNvdW50ZXIiLCJIVE1MRWxlbWVudCIsIlJPT1QiLCJJTlBVVCIsIkhJRERFTiIsIklOQ1JFTUVOVCIsIkRFQ1JFTUVOVCIsIkNIQU5HRV9ST09UX1RJVExFIiwiQ0hBTkdFX1JPT1RfVkFMVUUiLCJDSEFOR0VfSU5QVVRfVkFMVUUiLCJDTElDS19JTkNSRU1FTlRfQlVUVE9OIiwiQ0xJQ0tfREVDUkVNRU5UX0JVVFRPTiIsIkNIQU5HRV9JTkNSRU1FTlRfQlVUVE9OX1NUQVRFIiwiQ0hBTkdFX0RFQ1JFTUVOVF9CVVRUT05fU1RBVEUiLCJpZCIsImlucHV0IiwiZGVjcmVtZW50QnV0dG9uIiwiaW5jcmVtZW50QnV0dG9uIiwiY29ubmVjdGVkQ2FsbGJhY2siLCJiaW5kIiwiZGlzY29ubmVjdGVkQ2FsbGJhY2siLCJpbnB1dEV2ZW50cyIsImRlY3JlbWVudEJ1dHRvbkV2ZW50cyIsImluY3JlbWVudEJ1dHRvbkV2ZW50cyIsImF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayIsImhhbmRsZUNsaWNrQnV0dG9uIiwiaGFuZGxlQ2hhbmdlUm9vdFZhbHVlIiwiaGFuZGxlQ2hhbmdlSW5wdXRWYWx1ZSIsImhhbmRsZUNoYW5nZUJ1dHRvblN0YXRlIiwiaW5wdXRPYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJpbnB1dE9ic2VydmVyQ2FsbGJhY2siLCJpbnB1dE9ic2VydmUiLCJ0YWtlUmVjb3JkcyIsIm9mZiIsIm9sZFYiLCJwYXJzZUludCIsIm5ld1YiLCJldmVudCIsInZhbHVlIiwiZ2V0QXR0cmlidXRlIiwiZ2V0IiwibWFwIiwibm9kZSIsIm9ic2VydmUiLCJpbnB1dE9ic2VydmVyQ29uZmlnIiwiYXR0cmlidXRlcyIsImF0dHJpYnV0ZU9sZFZhbHVlIiwiYXR0cmlidXRlRmlsdGVyIiwibXV0YXRpb25zIiwiZm9yRWFjaCIsIm11dGF0aW9uIiwidHlwZSIsInRhcmdldCIsInRyaWdnZXIiLCJvbiIsImRhdGEiLCJFcnJvciIsImluY3IiLCJkZWNyIiwiYXR0ciIsInRyaWdnZXJIYW5kbGVyIiwidGl0bGUiLCJ2YWwiLCJtYXgiLCJtaW4iLCJjbCIsImNsYXNzTmFtZSIsIm5leHRTaWJsaW5nIiwicHJldmlvdXNTaWJsaW5nIiwic3RlcFVwIiwiUHJvbWlzZSIsInJlc29sdmUiLCJzdGVwRG93biIsImVycm9yIiwib2Zmc2V0WCIsIm9mZnNldFkiLCJEcm9wRG93biIsIklURU1TIiwiUk9PVF9PUEVORUQiLCJJTlBVVF9PUEVORUQiLCJJVEVNU19PUEVORUQiLCJDTElDS19JTlBVVCIsIlRPR0dMRV9ST09UX09QRU5FRCIsIlRPR0dMRV9JVEVNU19PUEVORUQiLCJUT0dHTEVfSU5QVVRfT1BFTkVEIiwiQ0hBTkdFX1JPT1RfREFUQV9WQUxVRSIsIkNIQU5HRV9ST09UX1BMQUNFSE9MREVSIiwiQ0hBTkdFX0lOUFVUX1BMQUNFSE9MREVSIiwidGVtcGxhdGUiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwibm9kZU5hbWUiLCJ0ZW1wbGF0ZUNvbnRlbnQiLCJjb250ZW50IiwiYXR0YWNoU2hhZG93IiwibW9kZSIsImFwcGVuZENoaWxkIiwiY2xvbmVOb2RlIiwiaXRlbXMiLCJmaW5kIiwiYXJyb3dCdXR0b24iLCJpdGVtc0V2ZW50cyIsImhhbmRsZUNsaWNrIiwidG9nZ2xlT3BlbmVkIiwiYXJyb3dCdXR0b25FdmVudHMiLCJoYW5kbGVLZXlQcmVzcyIsInJvb3RFdmVudHMiLCJnZXRHdWVzdHNJbnB1dFN0cmluZyIsImd1ZXN0cyIsImJhYnlzIiwiZWFjaCIsImluZGV4Iiwic3RyaW5nR3Vlc3RzIiwic3RyaW5nQmFieXMiLCJzZXRJbnB1dFN0cmluZyIsInJlc3VsdFN0cmluZyIsImxvZyIsImF0dHJpYnV0ZUNoYW5nZWRDYWxsQmFjayIsImFyaWFFeHBhbmRlZFRvZ2dsZSIsImVsZW0iLCJwcmV2ZW50RGVmYXVsdCIsImtleSIsIndoaWNoIiwiY2xzIiwic3BsaXQiLCJyZXBsYWNlIiwidG9nZ2xlQ2xhc3MiLCJ0b2dnbGVBdHRyaWJ1dGUiLCJrZXlwcmVzcyIsIkRyb3BEb3duV2l0aEJ1dHRvbnMiLCJGT09URVJfQlVUVE9OUyIsIlJFU0VUX0JVVFRPTiIsIkFDQ0VQVF9CVVRUT04iLCJGT09URVJfQlVUVE9OU19JTklUIiwiRk9PVEVSX0JVVFRPTlNfVE9HR0xFX0RJU0FCTEVEIiwiUkVTRVRfQlVUVE9OX1RPR0dMRV9ESVNBQkxFRCIsIlJFU0VUX0JVVFRPTl9DTElDSyIsIkFDQ0VQVF9CVVRUT05fQ0xJQ0siLCJmb290ZXJCdXR0b25zIiwicmVzZXRCdXR0b24iLCJhY2NlcHRCdXR0b24iLCJteVJvb3RFdmVudHMiLCJmb290ZXJCdXR0b25zRXZlbnRzIiwicmVzZXRCdXR0b25FdmVudHMiLCJhY2NlcHRCdXR0b25FdmVudHMiLCJzZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJjb3VudGVycyIsImdldERpc2FibGVkIiwiZGlzYWJsZWQiLCJyZW1vdmVBdHRyIiwibW9kdWxlIiwiZXhwb3J0cyIsImRvbVJlYWR5IiwiZm4xIiwiZm4yIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlYWR5U3RhdGUiLCJudW1iZXIiLCJjYXNlcyIsItC80LvQsNC00LXQvdGG0YsiLCLQstC30YDQvtGB0LvRi9C1Iiwi0LTQtdGC0LgiLCLQs9C+0YHRgtC4Iiwi0YHQv9Cw0LvRjNC90LgiLCLQutC+0LzQvdCw0YLRiyIsItCy0YvQvdC90YvQtSIsItC60YDQvtCy0LDRgtC4IiwibXMiLCJzZXRUaW1lb3V0Il0sInNvdXJjZVJvb3QiOiIifQ==