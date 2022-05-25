var lc_curr = 0;
var rc_curr = 0;
var nr = false;
var ud = 0;
var show_add_name = '';
var show_box = -1;
var show_lab_box = false;
var show_two_box = false;
var show_del_box = false;
var show_cmt_box = false;
var show_all_box = false;
var show_ar_form = false;
var show_cm_form = false;
var show_ow_info = false;
var show_all_est = false;
var show_th_info = false;
var ar_form_height;
var dc, db, di, fn, wd;
var update_timer = 0;
var status_timer = 0;
var is_calc_rates = false;
var is_twostep_rates = false;
var twostep_rate_id = 0;
var twostep_rate_id_next = 0;
var twostep_rate_id_old = 0;
var chart_time = 0;
var chart_update_stop = false;
var chart_unsuccessful = 0;
var wishes_default_text = '';
var last_exch_id = 0;
var finkdata;
var citylist;
var page_active = true;
var page_active_timer = 0;
var page_tracked = 0;
var last_mouse_move = 0;
var favd_cookie = getCookie('favd');
var update_request = false;
var tglink_checking = false;
var tglink_check_count = 0;
var is_leave_page = false;
var sort_manual = false;
var bonus_captcha;
var bonus_captcha_timer;
var invisible_captcha;
var mouse_on_geo_details = false;
var is_page_loaded = false;
var lc_searched = false;
var rc_searched = false;
var cy_list = new Array();
var sort_type = '';
var sort_range = '';
var calc_type = '';
var calc_give = '';
var calc_get = '';
var calc_commission = 0;
var country = 0;
var city = 0;

//**** Fixes ********************************************

if (!Date.now) {
  Date.now = function now() {
    return new Date().getTime();
  };
}
var last_update = Date.now();

//**** General functions ********************************

function l(value) {
  if (document.all && !document.addEventListener) {
    alert(value);
  } else {
    console.log(value);
  }
}

function createRequest() {
  var req = false;
  if (window.XMLHttpRequest) {
    req = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    try {
      req = new ActiveXObject('Msxml2.XMLHTTP');
    } catch (e) {
    }
    try {
      req = new ActiveXObject('Microsoft.XMLHTTP');
    } catch (e) {
    }
  }
  return req;
}

function sendRequest(req, data, errorEvent) {
  try {
    req.open('POST', 'https://www.bestchange.com/action.php', true);
    req.setRequestHeader('Accept-Charset', 'iso-8859-1');
    req.setRequestHeader('Connection', 'keep-alive');
    req.setRequestHeader('Content-length', data.length);
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=iso-8859-1');
    req.send(data);
  } catch(e) {
    errorEvent();
    return false;
  }
  return true;
}

function eventPush(obj, event, handler) {
  if (obj.addEventListener) {
    obj.addEventListener(event, handler, false);
  } else if (obj.attachEvent) {
    obj.attachEvent('on' + event, handler);
  }
}

function fireEvent(node, eventName) {
  var doc;
  if (node.ownerDocument) {
    doc = node.ownerDocument;
  } else if (node.nodeType == 9) {
    doc = node;
  } else {
    return;
  }
  if (node.dispatchEvent) {
    var eventClass = '';
    switch (eventName) {
      case 'click':
      case 'mousedown':
      case 'mouseup': eventClass = 'MouseEvents'; break;
      case 'focus':
      case 'change':
      case 'blur':
      case 'select': eventClass = 'HTMLEvents'; break;
      default: break;
    }
    var event = doc.createEvent(eventClass);
    var bubbles = eventName == 'change' ? false : true;
    event.initEvent(eventName, bubbles, true);
    event.synthetic = true;
    node.dispatchEvent(event, true);
  } else if (node.fireEvent) {
    var event = doc.createEventObject();
    event.synthetic = true;
    node.fireEvent("on" + eventName, event);
  }
}

function isHidden(el) {
  var width = el.offsetWidth, height = el.offsetHeight, tr = el.nodeName.toLowerCase() === 'tr';
  return width === 0 && height === 0 && !tr ? true : width > 0 && height > 0 && !tr ? false : getRealDisplay(el);
}

function moveToEnd(el) {
  if (typeof el.selectionStart == "number") {
    el.selectionStart = el.selectionEnd = el.value.length;
  } else if (typeof el.createTextRange != "undefined") {
    el.focus();
    var range = el.createTextRange();
    range.collapse(false);
    range.select();
  }
}

function setFocus(obj) {
  if (obj) setTimeout(function () {
    try {
      obj.style.display = '';
      moveToEnd(obj);
      obj.focus();
    } catch(e) {
    }
  }, 1);
}

function setCookie(name, value) {
  var date = new Date();
  date.setTime(date.getTime() + (10 * 365 * 24 * 60 * 60 * 1000));
  document.cookie = name + '=' + escape(value) + '; expires=' + date.toGMTString() + '; path=/';
}

function getCookie(name) {
  var cookie = ' ' + document.cookie;
  var search = ' ' + name + '=';
  var setStr = '';
  var offset = 0;
  var end = 0;
  if (cookie.length > 0) {
    offset = cookie.indexOf(search);
    if (offset != -1) {
      offset += search.length;
      end = cookie.indexOf(';', offset)
      if (end == -1) end = cookie.length;
      setStr = unescape(cookie.substring(offset, end));
    }
  }
  return(setStr);
}

function addClass(o, c) {
  var re = new RegExp('(^|\\s)' + c + '(\\s|$)', 'g');
  if (re.test(o.className)) return;
  o.className = (o.className + ' ' + c).replace(/\s+/g, ' ').replace(/(^ | $)/g, '');
}

function removeClass(o, c) {
  var re = new RegExp('(^|\\s)' + c + '(\\s|$)', 'g');
  o.className = o.className.replace(re, '$1').replace(/\s+/g, ' ').replace(/(^ | $)/g, '');
}

function classExists(o, c) {
  var re = new RegExp('(^|\\s)' + c + '(\\s|$)', 'g');
  return re.test(o.className);
}

function getCursor(ctrl) {
  var CaretPos = 0;
  if (document.selection) {
    ctrl.focus ();
    var Sel = document.selection.createRange ();
    Sel.moveStart ('character', -ctrl.value.length);
    CaretPos = Sel.text.length;
  } else if (ctrl.selectionStart || ctrl.selectionStart == '0') CaretPos = ctrl.selectionStart;
  return CaretPos;
}

function setCursor(ctrl, pos) {
  if (ctrl.setSelectionRange){
    ctrl.focus();
    ctrl.setSelectionRange(pos,pos);
  } else if (ctrl.createTextRange) {
    var range = ctrl.createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
}

function arraySum(a) {
  var r = 0;
  for (var i = 0; i < a.length; i++) r += a[i];
  return r;
}

function add_favorite(a, url, title) {
  try {
    window.external.AddFavorite(url, title);
  }
  catch (e) {
    try {
      window.sidebar.addPanel(title, url, '');
    }
    catch (e) {
      if (typeof opera == 'object') {
        a.rel = 'sidebar';
        a.title = title;
        a.url = url;
        return true;
      } else {
        alert('Press Ctrl+D to bookmark the page');
      }
    }
  }
  return false;
}

function objectsAreSame(x, y) {
  for (var propertyName in x) if (x[propertyName] !== y[propertyName]) return false;
  return true;
}

function openDocument(url, new_window) {
  var a = document.createElement('a');
  if (!a.click || a.click != undefined) {
    if (new_window) {
      window.open(url, '', '');
    } else {
      document.location = url;
    }
    return;
  }
  a.setAttribute('href', url);
  if (new_window) a.setAttribute('target', '_blank');
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
}

function isNumeric(value) {
  return !isNaN(parseInt(value));
}

function getPageScroll() {
  var yScroll;
  if (self.pageYOffset) {
    yScroll = self.pageYOffset;
  } else if (document.documentElement && document.documentElement.scrollTop) {
    yScroll = document.documentElement.scrollTop;
  } else if (document.body) {
    yScroll = document.body.scrollTop;
  }
  arrayPageScroll = new Array('', yScroll);
  return arrayPageScroll;
}

function getPageSize() {
  var xScroll, yScroll;
  if (window.innerHeight && window.scrollMaxY) {
    xScroll = document.body.scrollWidth;
    yScroll = window.innerHeight + window.scrollMaxY;
  } else if (document.body.scrollHeight > document.body.offsetHeight) {
    xScroll = document.body.scrollWidth;
    yScroll = document.body.scrollHeight;
  } else if (document.documentElement && document.documentElement.scrollHeight) {
    xScroll = document.documentElement.scrollWidth;
    yScroll = document.documentElement.scrollHeight;
  } else {
    xScroll = document.body.offsetWidth;
    yScroll = document.body.offsetHeight;
  }

  var windowWidth, windowHeight;
  if (self.innerHeight) {
    windowWidth = self.innerWidth;
    windowHeight = self.innerHeight;
  } else if (document.documentElement && document.documentElement.clientHeight) {
    windowWidth = document.documentElement.clientWidth;
    windowHeight = document.documentElement.clientHeight;
  } else if (document.body) {
    windowWidth = document.body.clientWidth;
    windowHeight = document.body.clientHeight;
  }

  pageHeight = Math.max(yScroll, windowHeight);
  pageWidth = Math.max(xScroll, windowWidth);

  arrayPageSize = new Array(pageWidth, pageHeight, windowWidth, windowHeight);
  return arrayPageSize;
}

(function() {
  var cache = {};
  window.nodeById = function(id) {
    return cache[id] ? cache[id] : cache[id] = document.getElementById(id);
  }
})()

function checkParent(parent, elem) {
  if (!elem) return false;
  return elem == parent || checkParent(parent, elem.parentNode);
}

function stopBubbling(event) {
  event = event || window.event;
  if (event.stopPropagation) {
    event.stopPropagation();
  } else {
    event.cancelBubble = true;
  }
}

function numFormat(n, del_sep, th_sep) {
  if (!del_sep) del_sep = '.';
  if (!th_sep) th_sep = ' ';
  
  n = Math.round(n * 100000000) / 100000000;
  if (n == Math.ceil(n)) n = Math.ceil(n);
  var s = n.toString();
  var pos = s.indexOf('.');
  var rest = pos > -1 ? s.slice(pos + 1) : '';
  n = n - (n%1);
  return n.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1' + th_sep) + (rest ? del_sep + rest : '');
}

function getTimeFormat(time, needSec) {
  var time_sec = time.getSeconds();
  var time_min = time.getMinutes();
  var time_hours = time.getHours();
  var result = (time_hours < 10 ? '0' : '') + time_hours + ':' + (time_min < 10 ? '0' : '') + time_min + (needSec ? ':' + (time_sec < 10 ? '0' : '') + time_sec : ''); 
  return result;
}

function changeZoneTime(obj, time, needSec) {
  var x = new Date();
  var m = new Date((time - x.getTimezoneOffset() * 60) * 1000);
  obj.innerHTML = getTimeFormat(m, needSec);
  var n = new Date((time) * 1000);
  if (obj.title != '') {
    obj.title += ' (' + getTimeFormat(n, needSec) + ' UTC' + ')';
  } else {
    obj.title = getTimeFormat(n, needSec) + ' UTC';
  }
}

function prepareFloat(s) {
  if (typeof s == 'undefined') return 0;
  var r = s.toString().replace(/,/gi, s.indexOf('.') == -1 ? '.' : '').replace(/[^\d\.]/gi, '');
  return r == '' ? 0 : parseFloat(r);
}

function emptyObject(obj) {
  for (var i in obj) return false;
  return true;
}

function isFramed() {
  try {
    return window != window.top || document != top.document || self.location != top.location;
  } catch (e) {
    return true;
  }
}

function copyTextToClipboard(text) {
  var copyFrom = document.createElement('textarea');
  copyFrom.textContent = text;
  var body = document.getElementsByTagName('body')[0];
  body.appendChild(copyFrom);
  copyFrom.select();
  document.execCommand('copy');
  body.removeChild(copyFrom);
}

var recaptcha_callback = function () {};

function recaptcha_check(action, done_callback) {
  recaptcha_callback = function () {
    grecaptcha.ready(function() {
      grecaptcha.execute('6Le8iM4ZAAAAADEjw_VY4eW97zvA923JmDWGvdaq', {'action': action}).then(function (token) {
        done_callback(token);
        addClass(document.getElementsByClassName('grecaptcha-badge')[0], 'grecaptcha-hide');
      });
    });
  };
  
  if (typeof grecaptcha == 'undefined') {
    var grecaptcha_s = document.createElement('script');
    grecaptcha_s.src = 'https://www.recaptcha.net/recaptcha/api.js?onload=recaptcha_callback&render=6Le8iM4ZAAAAADEjw_VY4eW97zvA923JmDWGvdaq';
    grecaptcha_s.setAttribute('async', 'async');
    grecaptcha_s.setAttribute('defer', 'defer');
    var grecaptcha_h = document.getElementsByTagName('script')[0];
    grecaptcha_h.parentNode.insertBefore(grecaptcha_s, grecaptcha_h);
  } else {
    removeClass(document.getElementsByClassName('grecaptcha-badge')[0], 'grecaptcha-hide');
    recaptcha_callback();
  }
}

//**** Custom functions ********************************

function id2pos(number) {
  for (var i = 0; i < ds_list.length; i++) if (ds_list[i] == number) return i;
}

function goto_list(from, to) {
  var fromcur = from ? from : lc_curr;
  var tocur = to ? to : rc_curr;
  var is_cash = ty_list[id2pos(fromcur)] == 5 || ty_list[id2pos(tocur)] == 5;
  openDocument('https://www.bestchange.com/' + cu_list[id2pos(fromcur)] + '-to-' + cu_list[id2pos(tocur)] + (is_cash && last_cc ? '-in-' + last_cc : '') + '.html', false);
}

function list_clk() {
  lc_curr = document.getElementById('currency_lc').value;
  rc_curr = document.getElementById('currency_rc').value;
  goto_list();
  return false;
}

function mark_selected(id, direct) {
  document.getElementById('d' + direct + id).className = 'c' + direct;
  if (sc_list[id2pos(id)] == 0) {
    removeClass(document.getElementById('ti' + id), 'hide');
    resize_tab_line(id);
    tab_repainting();
  }
}

function mark_unav(id, direct) {
  var id_pos = id2pos(id);
  for (var i = 0; i < ds_list.length; i++) nodeById((direct == 'rc' ? 'alc' : 'arc') + ds_list[i]).className = direct == 'rc' ? (av_list[i].substring(id_pos, id_pos + 1) == '0' ? 'unav' : '') : (av_list[id_pos].substring(i, i + 1) == '0' ? 'unav' : '');
}

function make_tablink(direct) {
  var a_name, a_id;
  eval('var current_curr = ' + direct + '_curr');
  for (var i = 0; i < ds_list.length; i++) {
    if (ds_list[i] == current_curr) continue;
    a_id = document.getElementById('a' + direct + ds_list[i]);
    if (a_id.name) a_id.href = 'https://www.bestchange.com/' + a_id.name;
  }
}

function clk(id, direct, nofollow) {
  eval('var old_curr = ' + direct + '_curr');
  if (old_curr == id) return false;
  if (lc_curr != 0 && rc_curr != 0 && ((direct == 'lc' && rc_curr == id) || (direct == 'rc' && lc_curr == id))) {
    var adirect = direct == 'rc' ? 'lc' : 'rc';
    eval(adirect + '_curr = 0');
    document.getElementById('d' + adirect + id).className = adirect;
  }
  var b = (old_curr > 0 && old_curr != id);
  eval(direct + '_curr = ' + id);
  if (b) document.getElementById('d' + direct + old_curr).className = direct;
  mark_selected(id, direct);
  mark_unav(id, direct);
  if (lc_curr != 0 && rc_curr != 0 && !nofollow) goto_list();
  return false;
}

function sel_change(direct, locate) {
  var id = document.getElementById('currency_' + direct).value;
  if (locate) {
    eval(direct + '_curr = id');
    if (lc_curr != 0 && rc_curr != 0) goto_list();
  }
  var adirect = direct == 'rc' ? 'lc' : 'rc';
  var options = document.getElementById('currency_' + adirect).options;
  var id_pos = id2pos(id);
  for (var i = 0; i < options.length; i++) options[i].style.color = direct == 'rc' ? (av_list[i].substring(id_pos, id_pos + 1) == '0' ? '#aaaaaa' : '#222222') : (av_list[id_pos].substring(i, i + 1) == '0' ? '#aaaaaa' : '#222222');

  return false;
}

function change_upd_img(class_name, src) {
  var obj = document.getElementById('update_image');
  if (obj) {
    obj.className = class_name;
    if (src) obj.src = src;
  }
}

function error_upd_img() {
  change_upd_img('', 'https://www.bestchange.com/images/error.png');
  setTimeout(function () {
    change_upd_img('hide');
  }, 500);
}

function corr_tab(id, direct) {
  if (id != 0) {
    for (var i = 0; i < ds_list.length; i++) if (ds_list[i] != id) nodeById('d' + direct + ds_list[i]).className = direct;
    mark_selected(id, direct);
    if (direct == 'lc' || (direct == 'rc' && lc_curr == 0)) mark_unav(id, direct);
  }
}

function corr_list(id, direct) {
  if (id != 0) {
    sel_el = document.getElementById('currency_' + direct);
    sel_el.value = id;
    sel_el.onchange();
    sel_change(direct, false);
  }
}

function change_tab(type, name, oldname) {
  if (type == 'content') {
    if ((name == 'calc' || name == 'notify' || name == 'twostep') && oldname != 'rates') document.getElementById('content_rates').className = '';
    if ((oldname == 'calc' || oldname == 'notify' || oldname == 'twostep') && (name != 'rates' && name != 'calc' && name != 'notify' && name != 'twostep')) document.getElementById('content_rates').className = 'hide';
    if (name == 'twostep' && oldname != 'calc') document.getElementById('content_calc').className = '';
    if (oldname == 'twostep') {
      if (name != 'calc') document.getElementById('content_calc').className = 'hide';
    } else {
      document.getElementById(type + '_' + oldname).className = (oldname == 'rates' && (name == 'calc' || name == 'notify' || name == 'twostep')) || oldname == 'calc' && name == 'twostep' ? '' : 'hide';
    }
    if (name == 'stats') {
      chart_update_stop = false;
      update_stats();
    }
    if (oldname == 'stats') chart_update_stop = true;
  } else {
    document.getElementById(type + '_' + oldname).className = 'hide';
  }
  if (name != 'twostep') document.getElementById(type + '_' + name).className = '';
  document.getElementById('tab_' + oldname).className = '';
  document.getElementById('tab_' + name).className = 'active';
}

function change_ctab(name) {
  if (name != ct) {
    change_tab('curr', name, ct);
    setCookie('ct', name);
    ct = name;
    if (name == 'tab') {
      corr_tab(lc_curr, 'lc');
      corr_tab(rc_curr, 'rc');
    }
    if (name == 'list') {
      corr_list(lc_curr, 'lc');
      corr_list(rc_curr, 'rc');
    }
  }
  return false;
}

function change_mtab(name) {
  if (name != mt) {
    change_tab('content', name, mt);
    if (name == 'calc' || name == 'twostep') {
      sort_manual = false;
      sort_type = '';
      sort_range = '';
      setCalcFocus();
    }
    if (name == 'notify') setNotifyFocus();
    if (name != 'calc' && name != 'twostep') {
      sort_manual = false;
      sort_type = '';
      sort_range = '';
      calc_type = '';
    }
    mt = name;
    eval('var is_calc_update = name == \'calc\' && calc_type != \'\' && calc_' + calc_type + ' != \'\'');
    if (name != 'stats' && ((name == 'twostep' && !is_twostep_rates) || (name != 'twostep' && is_twostep_rates) || (name != 'calc' && is_calc_rates) || is_calc_update)) update_rates();
  }
  return false;
}

function change_itab(name, cu_page) {
  eval('var b = name != ' + cu_page);
  if (b) {
    change_tab('info', name, eval(cu_page));
    setCookie(cu_page, name);
    eval(cu_page + ' = name');
  }
  return false;
}

function change_etab(name) {
  if (name != it) {
    change_tab('content', name, it);
    it = name;
  }
  return false;
}

function set_cur_cookies() {
  if (lc_curr && rc_curr) {
    document.cookie = 'from=' + lc_curr + '; path=/';
    document.cookie = 'to=' + rc_curr + '; path=/';
  }
}

function fco(id) {
  nr = true;
  if (typeof id != 'undefined') last_exch_id = id;
  if (typeof gtag === 'function') {
    gtag('event', 'click', {
      'event_category': 'exchanger' + (lc_curr != 0 && rc_curr != 0 ? '' : '-main'),
      'event_label': id
    });
  }
  if (typeof yaCounter55602688 != 'undefined' && lc_curr != 0 && rc_curr != 0) {
    yaCounter55602688.reachGoal('exchanger');
  }
  return true;
}

function ccl(id, from, to, city) {
  if (nr) {
    nr = false;
    return false;
  }
  if (!city) city = 0;
  last_exch_id = id;
  openDocument('https://www.bestchange.com/click.php?id=' + id + (from && to ? '&from=' + from + '&to=' + to : '') + '&city=' + city, true);
  
  if (typeof gtag === 'function') {
    gtag('event', 'click', {
      'event_category': 'exchanger' + (lc_curr != 0 && rc_curr != 0 ? '' : '-main'),
      'event_label': id
    });
  }
}

function open_reviews(id) {
  if (typeof direct_data != 'undefined' && direct_data) {
    set_cur_cookies();
    openDocument('https://www.bestchange.com/' + direct_data[id]['u'] + '-exchanger.html', false);
  }
  return false;
}

function crw(id) {
  if (nr) return false;
  fco();
  open_reviews(id);
}

function arw(id) {
  if ('\v'=='v') {
    crw(id);
    return false;
  } else {
    fco();
    set_cur_cookies();
    return true;
  }
}

function set_status(name, status, filename, noclear) {
  if (status_timer != 0) clearTimeout(status_timer);
  status_timer = 0;
  var img_content = status != '' ? '<img src="https://www.bestchange.com/images/' + filename + '" width="16" height="16" />' : '';
  document.getElementById(name + '_img').innerHTML = img_content;
  document.getElementById(name + '_status').innerHTML = status;
  if (name == 'bonus' && status == '') {
    document.getElementById('bonus_result').className = 'hide';
    document.getElementById('bonus_form').className = '';
  }
  if (name == 'manage_review') document.getElementById('manage_review_status_block').className = status ? '' : 'hide';
  if (!noclear) status_timer = setTimeout(function () {
   set_status(name, '', '', true);
  }, 2500);
}

function save_sets() {
  var req = createRequest();
  if (req) {
    var sets_button = document.getElementById('sets_button');
    sets_button.disabled = true;
    set_status('sets', 'Saving the settings...', 'ajax.gif', true);

    var ajax_timer = setTimeout(function() {
      req.abort();
      req.onreadystatechange = function() {
        return true;
      };
      set_status('sets', 'No connection to the server', 'error.png');
      sets_button.disabled = false;
    }, 25000);

    var sets_vars = new Array('dc', 'db', 'di', 'ud', 'fn', 'wd');
    for (var i = 0; i < sets_vars.length; i++) {
      var set_value = document.getElementById(sets_vars[i]).value;
      setCookie(sets_vars[i], set_value);
      eval(sets_vars[i] + ' = \'' + set_value.replace(/[\']/, '\\\'') + '\'');
    }

    req.onreadystatechange = function() {
      if (req.readyState != 4) return;
      clearTimeout(ajax_timer);
      if (req.status == 200) {
        var results = req.responseText.split('[delimiter]');
        if (results.length == 2 && results[0] == 'OK') {
          document.getElementById('custom_style').innerHTML = '&nbsp; <style type="text/css">' + results[1] + '</style>';
          update_rates();
          set_status('sets', 'The changes have been saved', 'ok.png', true);
          setTimeout(function () {
            hide_overlay();
          }, 700);
        } else {
          set_status('sets', 'An error occurred', 'error.png');
        }
      } else {
        set_status('sets', 'An error occurred', 'error.png');
      }
      sets_button.disabled = false;
    }

    sendRequest(req, 'action=savesets&name=' + fn + '&type=' + wd, function () {
      set_status('sets', 'No connection', 'error.png');
      sets_button.disabled = false;
    });
  }
  return false;
}

function show_info(id) {
  if (typeof direct_data != 'undefined' && direct_data) {
    if (id !== show_box) {
      var info_box = nodeById('details');
      var obj = document.getElementById('io' + id);

      var x = 0, y = 0;
      try {
        while (obj && obj.id != 'content_rates') {
          x += parseInt(obj.offsetLeft);
          y += parseInt(obj.offsetTop);
          obj = obj.offsetParent;
        }
      } catch (error) {
        show_box = -1;
        return false;
      }
      show_box = id;
      info_box.style.left = Math.round(x + 22) + 'px';
      info_box.style.top = Math.round(y - 13) + 'px';
      info_box.onmouseover = function () {
        show_box = id;
      };
      info_box.className = '';
      var star_content = '';
      for (i = 1; i <= (direct_data[id]['s'] > 5 ? 5 : direct_data[id]['s']); i++) star_content += '<span class="star"></span>';
      nodeById('det_changer').innerHTML = '<a target="_blank" href="https://www.bestchange.com/click.php?' + direct_data[id]['a'] + '" title="Open the exchanger">' + direct_data[id]['n'] + '</a>' + (direct_data[id]['v'] ? '<span class="full" title="This exchanger undergone an additional check"></span>' : '') + (direct_data[id]['o'] ? '<span class="company" title="This exchanger has official legal registration"></span>' : '') + (star_content ? '<span class="stars" title="Rating">' + star_content + '</span>' : '');
      nodeById('det_acts').innerHTML = (direct_data[id]['b'] > -1 ? direct_data[id]['b'] : '&mdash;');
      nodeById('det_ts').innerHTML = (direct_data[id]['t'] > -1 ? direct_data[id]['t'] : '&mdash;');
      nodeById('det_reserve').innerHTML = direct_data[id]['r'];
      nodeById('det_date').innerHTML = direct_data[id]['d'];
      nodeById('det_country').innerHTML = '<img src="https://www.bestchange.com/images/countries/' + direct_data[id]['c'] + '.png" valign="middle" />' + direct_data[id]['m'];
    }
  }
}

function hide_info() {
  if (show_box == -1) nodeById('details').className = 'hide';
}

function shd() {
  show_box = -1;
  setTimeout(function () {
    hide_info();
  }, 200);
}

function shc(id) {
  if (show_box > -1) {
    show_box = -1;
    hide_info();
  } else {
    show_info(id);
  }
}

function sld(id) {
  show_lab_box = true;
  var obj = document.getElementById('la' + id);
  var info_box = document.getElementById('label_details');
  if (!info_box) {
    info_box = document.createElement('div');
    info_box.id = 'label_details';
    info_box.className = 'hide';
    info_box.innerHTML = '<table class="stretch_label">\
<tr><td class="sl1"></td><td class="sl2"></td><td class="sl3"></td></tr>\
<tr><td class="sl4"></td><td class="sl5"><div id="label_text"></div></td><td class="sl6"></td></tr>\
<tr><td class="sl7"></td><td class="sl8"></td><td class="sl9"></td></tr>\
</table>';
  }
  obj.parentNode.appendChild(info_box);
  info_box.style.left = Math.round(parseInt(obj.offsetLeft) + 14) + 'px';
  info_box.style.top = Math.round(parseInt(obj.offsetTop) - 17) + 'px';

  document.getElementById('label_text').innerHTML = document.getElementById('ld' + id).innerHTML;
  info_box.className = '';
}

function hld() {
  show_lab_box = false;
  setTimeout(function () {
    if (!show_lab_box) {
      var label_details = document.getElementById('label_details');
      if (label_details) label_details.className = 'hide';
    }
  }, 100);
}

function std(id) {
  show_two_box = true;
  var obj = document.getElementById('eb' + id);
  var info_box = document.getElementById('twostep_details');
  if (!info_box) {
    info_box = document.createElement('div');
    info_box.id = 'twostep_details';
    info_box.className = 'hide';
    info_box.innerHTML = '<div id="twostep_text"></div><div class="inner"></div>';
  }
  document.body.appendChild(info_box);

  var x = 0, y = 0;
  while (obj) {
    x += parseInt(obj.offsetLeft);
    y += parseInt(obj.offsetTop);

    obj = obj.offsetParent;
  }
  info_box.style.left = Math.round(x - 153) + 'px';
  info_box.style.top = Math.round(y + 14) + 'px';

  document.getElementById('twostep_text').innerHTML = document.getElementById('ed' + id).innerHTML;
  info_box.className = '';
}

function htd() {
  show_two_box = false;
  setTimeout(function () {
    if (!show_two_box) document.getElementById('twostep_details').className = 'hide';
  }, 100);
}

function calcChange(obj) {
  eval('calc_' + obj.name + ' = \'' + obj.value.replace('\'', '\\\'') + '\'');
  //if (!calc_type) calc_type = obj.name;
}

function calcKeyPress(obj) {
  var evt = event || window.event;
  if ((evt.keyCode || evt.which) == 13) {
    calcChange(obj);
    update_rates();
    return false;
  }
}

function setCalcFocus() {
  obj = document.getElementById('give');
  if (!isHidden(obj)) {
    setFocus(obj);
    calc_type = 'give';
    sort_manual = false;
  } else {
    obj = document.getElementById('get');
    if (!isHidden(obj)) {
      setFocus(obj);
      calc_type = 'get';
      sort_manual = false;
    }
  }
}

function setNotifyFocus(to_address_only) {
  var notify_address_el = document.getElementById('notify_address');
  if (to_address_only || !notify_address_el.value) {
    setFocus(notify_address_el);
  } else {
    setFocus(document.getElementById('notify_rate'));
  }
}

function abort_update_rates(calc_button, sets_button) {
  update_request.abort();
  update_request.onreadystatechange = function() {
    return true;
  };
  if (calc_button) calc_button.disabled = false;
  if (sets_button) sets_button.disabled = false;
  update_request = false;
}

function update_rates() {
  var calc_button = document.getElementById('calc_button');
  var sets_button = document.getElementById('sets_button');
  
  last_update = Date.now();
  if (update_request) abort_update_rates(calc_button, sets_button);
  
  if (is_leave_page) return;
  
  update_request = createRequest();
  if (update_request) {
    change_upd_img('', 'https://www.bestchange.com/images/ajax.gif');
    if (calc_button) calc_button.disabled = true;
    if (sets_button) sets_button.disabled = true;
    var ajax_timer = setTimeout(function() {
      abort_update_rates(calc_button, sets_button);
      error_upd_img();
    }, 25000);
    
    update_request.onreadystatechange = function() {
      if (update_request.readyState != 4) return;
      clearTimeout(ajax_timer);
      if (update_request.status == 200) {
        var results = update_request.responseText.split('[delimiter]');
        if (results.length >= 4 && (results[0].indexOf('content_table') || results[0].indexOf('content_norates'))) {
          document.getElementById('rates_block').innerHTML = results[0];
          document.getElementById('headinfo').innerHTML = results[1];
          var undertable = document.getElementById('undertable');
          if (undertable) undertable.innerHTML = results[2];
          var old_ds_list = ds_list;
          eval(results[3]);
          if (!objectsAreSame(ds_list, old_ds_list)) {
            window.location.reload(true);
          }
          if (ct == 'tab') {
            if (lc_curr > 0) mark_unav(lc_curr, 'lc');
            if (rc_curr > 0) mark_unav(rc_curr, 'rc');
            if (lc_searched) search_cy('lc');
            if (rc_searched) search_cy('rc');
          } else if (ct == 'list') {
            if (lc_curr > 0) sel_change('lc', false);
            if (rc_curr > 0) sel_change('rc', false);
          }
          is_calc_rates = ud_page == 'rates' && calc_type != '' && (calc_give != '' || calc_get != '');
          is_twostep_rates = ud_page == 'rates' && mt == 'twostep';

          if (is_twostep_rates && twostep_rate_id_old > 0 && twostep_rate_id_old != twostep_rate_id_next) {
            addClass(document.getElementById('dr' + twostep_rate_id_old), 'hide');
            removeClass(document.getElementById('tsl' + twostep_rate_id_old), 'tsa');
            if (twostep_rate_id_next > 0) {
              removeClass(document.getElementById('dr' + twostep_rate_id_next), 'hide');
              addClass(document.getElementById('tsl' + twostep_rate_id_next), 'tsa');
            }
          }
          if (mt == 'stats') update_stats();
          
          if (results[4] !== undefined) document.title = results[4];
          if (results[6] !== undefined) document.getElementById('small_text').innerHTML = results[6];
          if (results[7] !== undefined) document.getElementById('big_text').innerHTML = results[7];
        } else {
          error_upd_img();
        }
      } else {
        error_upd_img();
      }
      if (calc_button) calc_button.disabled = false;
      if (sets_button) sets_button.disabled = false;
      update_request = false;
      update_runner();
    }

    var data = 'action=getrates&page=' + (mt == 'twostep' ? mt : ud_page);
    if (ud_page == 'rates') {
      var com_option = document.getElementById('commission');
      if (com_option) calc_commission = com_option.value;
      data += '&from=' + lc_curr + '&to=' + rc_curr + '&city=' + city + '&type=' + calc_type + '&give=' + encodeURIComponent(calc_give) + '&get=' + encodeURIComponent(calc_get) + '&commission=' + calc_commission;
    }
    if (ud_page == 'list' || ud_page == 'rates') data += '&sort=' + sort_type + '&range=' + sort_range + '&sortm=' + (sort_manual ? '1' : '0');
    data += '&tsid=' + twostep_rate_id_next;
    
    sendRequest(update_request, data, function () {
      error_upd_img();
      if (calc_button) calc_button.disabled = false;
      if (sets_button) sets_button.disabled = false;
      update_request = false;
    });
  }
  return false;
}

function update_runner() {
  if (update_timer != 0) {
    clearTimeout(update_timer);
    update_timer = 0;
  }
  if (ud == 0) return;
  
  update_timer = setTimeout(function () {
    if (page_active) {
      update_rates();
    } else {
      update_runner();
      change_upd_img('', 'https://www.bestchange.com/images/update.png');
    }
  }, ud * 15000);
}

eventPush(window, 'beforeunload', function () {
  is_leave_page = true;
  if (update_timer != 0) {
    clearTimeout(update_timer);
    update_timer = 0;
  }
});

function track_page() {
  if (Date.now() - page_tracked < 3600 * 1000) return;
  page_tracked = Date.now();
  
  var req = createRequest();
  if (req) {
    var ajax_timer = setTimeout(function() {
      req.abort();
      req.onreadystatechange = function() {
        return true;
      };
    }, 5000);
    req.onreadystatechange = function() {
      if (req.readyState != 4) return;
      clearTimeout(ajax_timer);
    }
    sendRequest(req, 'action=track', function () {});
  }
}

function restart_stop_timer() {
  clearTimeout(page_active_timer);
  page_active_timer = setTimeout(function () {
    page_active = false;
  }, 55000);
}

function activate_page() {
  page_active = true;
  if (ud > 0 && Date.now() - last_update > ud * 15000) update_rates();
}

activate_page();
restart_stop_timer();

window.onfocus = function () {
  if (!page_active) activate_page();
  restart_stop_timer();
};
window.onmousemove = function () {
  if (!last_mouse_move || Date.now() - last_mouse_move > 500) {
    if (!page_active) activate_page();
    restart_stop_timer();
    last_mouse_move = Date.now();
  }
  track_page();
};
window.onkeydown = function () {
  if (!page_active) activate_page();
  restart_stop_timer();
  track_page();
};
if ('ontouchstart' in document.documentElement) eventPush(document, 'touchstart', function () {
  if (!page_active) activate_page();
  restart_stop_timer();
  track_page();
});
if ('onwheel' in document.documentElement) eventPush(document, 'wheel', function () {
  if (!page_active) activate_page();
  restart_stop_timer();
  track_page();
});
window.onblur = function () {
  page_active = false;
  clearTimeout(page_active_timer);
};

function check_telegram_link() {
  var telegram_status = nodeById('telegram_status');
  telegram_status.innerHTML = '<img src="https://www.bestchange.com/images/ajax.gif" width="16" height="16" alt= />';
  telegram_status.style.display = 'inline-block';
  var req = createRequest();
  if (req) {
    var ajax_timer = setTimeout(function() {
      req.abort();
      req.onreadystatechange = function() {
        return true;
      };
      telegram_status.style.display = 'none';
    }, 5000);

    req.onreadystatechange = function() {
      if (req.readyState != 4) return;
      clearTimeout(ajax_timer);
      if (req.status == 200) {
        var results = req.responseText.split('[delimiter]');
        if (results.length == 2) {
          if (results[0] == 'OK') {
            var re = new RegExp('([0-9]+)-(.+)');
            var found = results[1].match(re);
            if (found[1] && found[2]) {
              var notify_address = nodeById('notify_address');
              notify_address.value = found[2];
              notify_address.lang = found[1];
              notify_address.title = 'Your Telegram account has been linked. Click to switch';
              def_telegram = results[1];
              setCookie('telegram', results[1]);
            }
            stop_tglink_checking();
          }
        }
      }
      telegram_status.style.display = 'none';
    }
    sendRequest(req, 'action=tglink', function () {
      telegram_status.style.display = 'none';
    });
  }
  return false;
}

function start_tglink_checking() {
  tglink_check_count++;
  if (!tglink_checking || tglink_check_count > 100) {
    stop_tglink_checking();
    return;
  }
  setTimeout(function () {
    if (tglink_checking) {
      check_telegram_link();
      start_tglink_checking();
    }
  }, 6000);
}

function stop_tglink_checking() {
  tglink_checking = false;
  window.onfocus = null;
  window.onblur = null;
  window.onmousemove = null;
}

function notify_address_click(id) {
  if (nodeById('notify_type').value != 'telegram') return;
  
  stop_tglink_checking();
  
  page_active = true;
  tglink_checking = true;
  tglink_check_count = 0;
  
  window.onfocus = function () {
    if (!tglink_checking) {
      stop_tglink_checking();
    } else {
      if (!page_active) check_telegram_link();
      page_active = true;
    }
  };
  window.onblur = function () {
    if (!tglink_checking) {
      stop_tglink_checking();
    } else {
      page_active = false;
    }
  };
  window.onmousemove = function () {
    if (!page_active) {
      if (!tglink_checking) {
        stop_tglink_checking();
      } else {
        page_active = true;
        check_telegram_link();
      }
    }
  };
  
  openDocument('tg://resolve?domain=bestchange_bot&start=n-2-' + id, true);
  start_tglink_checking();
}

function change_notify_type() {
  var notify_type = nodeById('notify_type');
  var notify_address = nodeById('notify_address');
  
  if (notify_type.value == 'telegram') {
    var re = new RegExp('([0-9]+)-(.+)');
    var found = def_telegram.match(re);
    if (found) {
      notify_address.value = found[2];
      notify_address.lang = found[1];
      notify_address.title = 'Your Telegram account has been linked. Click to switch';
    } else {
      notify_address.value = '<bind>';
      notify_address.lang = '';
      notify_address.title = 'Run Telegram Desktop, follow this link and click the Start button on the chat window';
    } 
    notify_address.readOnly = true;
    addClass(notify_address, 'telegram');
  } else {
    notify_address.value = '';
    notify_address.lang = '';
    notify_address.readOnly = false;
    removeClass(notify_address, 'telegram');
    notify_address.title = '';
  }
  
  if (notify_type.value == 'email' && def_email) {
    notify_address.value = def_email;
  } else if (notify_type.value == 'wmid' && def_wmid) {
    notify_address.value = def_wmid;
  }
  setNotifyFocus(true);
}

function send_notify() {
  var notify_type = nodeById('notify_type').value;
  var notify_address = nodeById('notify_address').value;
  var notify_rate = nodeById('notify_rate').value;
  var notify_reserve = nodeById('notify_reserve').value;
  var notify_close = nodeById('notify_close').value;
  var notify_button = nodeById('notify_button');
  setCookie('notify_type', notify_type);
  if (notify_type == 'telegram') {
    notify_address = nodeById('notify_address').lang;
  } else {
    setCookie(notify_type, notify_address);
  }
  setCookie('notify_close', notify_close);

  var req = createRequest();
  if (req) {
    notify_button.disabled = true;
    var ajax_timer = setTimeout(function() {
      req.abort();
      req.onreadystatechange = function() {
        return true;
      };
      set_status('notify', 'No connection to the server', 'error.png');
      notify_button.disabled = false;
    }, 25000);
    set_status('notify', 'Submitting the application...', 'ajax.gif', true);

    req.onreadystatechange = function() {
      if (req.readyState != 4) return;
      clearTimeout(ajax_timer);
      if (req.status == 200) {
        var results = req.responseText.split('[delimiter]');
        if (results.length == 2) {
          if (results[0] == 'OK') {
            set_status('notify', 'The application has been successfully submitted', 'ok.png');
            alert(results[1]);
          } else if (results[0] == 'ERROR') {
            set_status('notify', 'Input error', 'error.png');
            alert('Please fix the following errors:\n' + results[1]);
          } else {
            set_status('notify', 'An error occurred. Contact the administrator', 'error.png');
          }
        } else {
          set_status('notify', 'An error occurred. Contact the administrator', 'error.png');
        }
      } else {
        set_status('notify', 'The server is temporarily unavailable', 'error.png');
      }
      notify_button.disabled = false;
    }

    sendRequest(req, 'action=newnotify&from=' + lc_curr + '&to=' + rc_curr + '&type=' + notify_type + '&address=' + encodeURIComponent(notify_address) + '&rate=' + encodeURIComponent(notify_rate) + '&by_from_id=' + byfrom + '&reserve=' + encodeURIComponent(notify_reserve) + '&close=' + notify_close, function () {
      set_status('notify', 'No connection', 'error.png');
      notify_button.disabled = false;
    });
  }
  
  if (typeof gtag === 'function') {
    gtag('event', 'request', {
      'event_category': 'notify'
    });
  }
  return false;
}

function chart_update_complete(success) {
  if (success) {
    document.getElementById('chartcanvas').className = 'chart';
    chart_time = new Date();
    chart_unsuccessful = 0;
  } else {
    chart_unsuccessful++;
  }
  update_stats();
}

function update_stats(forcibly) {
  var stats_button = document.getElementById('stats_button');
  if (!stats_button) return;
  stats_button.disabled = false;
  if (!forcibly && (chart_update_stop || chart_unsuccessful >= 3)) {
    chart_unsuccessful = 0;
    return;
  }
  var chartcanvas = document.getElementById('chartcanvas');
  if (forcibly || chartcanvas.className == 'waitchart' || new Date() - chart_time > 2 * 60 * 1000) {
    stats_button.disabled = true;
    chartcanvas.className = 'waitchart';

    var stats_type = document.getElementById('stats_type').value;
    var stats_interval = document.getElementById('stats_interval').value;
    var chart_url = 'https://www.bestchange.com/chart.php?type=' + stats_type + '&ci=' + stats_interval;
    if (ud_page == 'rates') chart_url += '&from=' + lc_curr + '&to=' + rc_curr;
    chart_url += '&rnd=' + Math.random() + '&session=' + session_params;

    chartcanvas.innerHTML = '<div class="waitborder"></div> <img src="https://www.bestchange.com/images/ajax-big.gif" class="waitimg" alt="Wait..." /> <img src="' + chart_url + '" class="chartimg" onload="chart_update_complete(true)" onerror="chart_update_complete(false)" />';
  }
  return false;
}

function wishesFocus(is_active) {
  var suggesttext = document.getElementById('suggesttext');
  if (suggesttext) {
    if (is_active) {
      if (wishes_default_text == '') wishes_default_text = suggesttext.value;
      if (suggesttext.value == wishes_default_text) suggesttext.value = '';
      suggesttext.className = 'wishesenable';
    } else {
      if (suggesttext.value == '') {
        suggesttext.value = wishes_default_text;
        suggesttext.className = 'wishesdisable';
      }
    }
  }
}

function send_email(email_type) {
  var textfield = nodeById(email_type + 'text');
  var text = '';
  var name = '';
  var email = '';
  var type = '';
  var exchid = 0;
  var last_exchid = 0;
  var order = '';
  var last_order = '';
  var phone = '';
  var address = '';
  var blog_type = 0;
  var blog_theme = 0;
  var blog_size = 0;
  if (textfield.value && (email_type == 'contact' || email_type == 'blogger' || (email_type == 'suggest' && wishes_default_text && textfield.value != wishes_default_text))) {
    text = textfield.value;
    if (email_type == 'contact') {
      name = nodeById('contactname').value;
      email = nodeById('contactemail').value;
      type = nodeById('type').value;
      exchid = nodeById('exch').value;
      order = nodeById('order').value;
      phone = nodeById('phone').value;
      address = nodeById('address').value;
    } else if (email_type == 'suggest') {
      type = 20;
    } else if (email_type == 'blogger') {
      type = 21;
      name = nodeById('bloggername').value;
      email = nodeById('bloggeremail').value;
      blog_type = nodeById('blog_type').value;
      blog_theme = nodeById('blog_theme').value;
      blog_size = nodeById('blog_size').value;
      address = nodeById('blog_link').value;
    }
  } else {
    set_status(email_type, 'Enter the message text', 'error.png');
    if (email_type == 'contact' || email_type == 'blogger') setFocus(textfield);
  }
  
  var req = createRequest();
  if (req && text) {
    var send_button = document.getElementById(email_type + '_button');
    send_button.disabled = true;
    
    if (text) {
      if (name) {
        setCookie('name', name);
      } else {
        name = getCookie('name');
      }
      if (email) {
        setCookie('email', email);
      } else {
        email = getCookie('email');
      }
      if (exchid) {
        setCookie('exchid', exchid);
      } else {
        last_exchid = getCookie('exchid');
      }
      if (order) {
        setCookie('order', order);
      } else {
        last_order = getCookie('order');
      }
      if (phone) {
        setCookie('phone', phone);
      } else {
        phone = getCookie('phone');
      }
      if (address) {
        setCookie('website', address);
      } else {
        address = getCookie('website');
      }
      
      if (email_type == 'contact' && !document.getElementById('agree').checked) {
        set_status(email_type, 'Need to consent to the processing of personal data', 'error.png');
        send_button.disabled = false;
        return false;
      }
      if (email_type == 'contact' && !email && !confirm('Email address not specified. Do you really want to just send a message without getting an answer?')) {
        setFocus(document.getElementById('contactemail'));
        send_button.disabled = false;
        return false;
      }
      var unklang = /[^\u0000-\u00FF\u0400-\u04FF\u2000-\u2BFF]/i.test(text);
      if (unklang && !confirm('Our support service accepts messages and replies to them in English only. Do you still want to send this message?')) {
        setFocus(textfield);
        send_button.disabled = false;
        return false;
      }
      if (email_type == 'blogger' && !document.getElementById('user_agree1').checked) {
        set_status(email_type, '', 'error.png');
        send_button.disabled = false;
        return false;
      }
      if (email_type == 'blogger' && !document.getElementById('user_agree2').checked) {
        set_status(email_type, 'Need to consent to the processing of personal data', 'error.png');
        send_button.disabled = false;
        return false;
      }
      
      var dataquery = '&text=' + encodeURIComponent(text);
      if (name) dataquery += '&name=' + encodeURIComponent(name);
      if (email) dataquery += '&email=' + encodeURIComponent(email);
      
      if (type) dataquery += '&type=' + encodeURIComponent(type);
      if (exchid) dataquery += '&exchid=' + encodeURIComponent(exchid);
      if (last_exchid) dataquery += '&last_exchid=' + encodeURIComponent(last_exchid);
      if (order) dataquery += '&order=' + encodeURIComponent(order);
      if (last_order) dataquery += '&last_order=' + encodeURIComponent(last_order);
      if (phone) dataquery += '&phone=' + encodeURIComponent(phone);
      if (address) dataquery += '&address=' + encodeURIComponent(address);
      if (blog_type) dataquery += '&blog_type=' + encodeURIComponent(blog_type);
      if (blog_theme) dataquery += '&blog_theme=' + encodeURIComponent(blog_theme);
      if (blog_size) dataquery += '&blog_size=' + encodeURIComponent(blog_size);

      if (email_type == 'suggest') dataquery += '&tsid=' + encodeURIComponent(document.location.href);
    }

    var ajax_timer = setTimeout(function() {
      req.abort();
      req.onreadystatechange = function() {
        return true;
      };
      set_status(email_type, 'No connection to the server', 'error.png');
      send_button.disabled = false;
    }, 25000);
    set_status(email_type, 'Sending the message...', 'ajax.gif', true);

    req.onreadystatechange = function() {
      if (req.readyState != 4) return;
      clearTimeout(ajax_timer);
      if (req.status == 200) {
        if (req.responseText == 'OK') {
          set_status(email_type, 'Successfully sent', 'ok.png');
          if (email_type == 'suggest') {
            textfield.value = wishes_default_text;
            textfield.className = 'wishesdisable';
          } else if (email_type == 'contact') {
            textfield.value = '';
          }
        } else {
          set_status(email_type, 'The message was not sent', 'error.png');
        }
      } else {
        set_status(email_type, 'An error occurred', 'error.png');
      }
      send_button.disabled = false;
    }

    sendRequest(req, 'action=newemail&' + dataquery, function () {
      set_status(email_type, 'No connection', 'error.png');
      send_button.disabled = false;
    });
  }
  return false;
}

function show_addform(locate, name, u, t) {
  var content = '';
  show_add_name = name == show_add_name ? '' : name;

  if (show_add_name == 'social') {
    var social_data = new Array(
      'facebook.com', 'share.php?u={u}', 'Facebook',
      'twitter.com', 'home?status={t} {u}', 'Twitter',
      'google.com', 'bookmarks/mark?op=edit&bkmk={u}&title={t}', 'Google bookmarks',
      'vk.com', 'share.php?url={u}', 'VK',
      'zakladki.yandex.ru', 'userarea/links/addfromfav.asp?bAddLink_x=1&lurl={u}&lname={t}', 'Yandex.Bookmarks'
    );
    u = encodeURIComponent(u);
    t = encodeURIComponent(t);
    for (var i = 0; i < social_data.length; i += 3) content += '<a target="_blank" href="http://' + social_data[i] + '/' + social_data[i + 1].replace('{u}', u).replace('{t}', t) + '" title="Add to ' + social_data[i + 2] + '"><img src="https://www.bestchange.com/images/social/' + social_data[i] + '.png" width="16" height="16" alt="' + social_data[i + 2] + '" /></a>';
  } else if (show_add_name == 'forum') {
    content = '<textarea id="pagesavetext" onclick="this.select()">[url="' + u + '"]' + t + '[/url]</textarea>';
  } else if (show_add_name == 'site') {
    content = '<textarea id="pagesavetext" onclick="this.select()">&lt;a target="_blank" href="' + u + '"&gt;' + t + '&lt;/a&gt;</textarea>';
  }
  document.getElementById(locate).innerHTML = content;
  setFocus(document.getElementById('pagesavetext'));
}

function show_pagesave(url, title) {
  //document.write('<hr align="left" /><div class="pagesavelinks"></div>');
}

var bonus_last_time = getCookie('bonus_last_time');
var bonus_timer_count = 0;
var bonus_timer_ended = true;
function start_bonus_timer() {
  var bonus_button = document.getElementById('bonus_button');
  if (!bonus_button || !bonus_last_time || parseInt(bonus_last_time) > Math.floor(new Date() / 1000)) return;
  var left = parseInt(bonus_last_time) + 3600 - Math.floor(new Date() / 1000);
  if (left <= 0) {
    bonus_button.value = 'Claim free Bitcoins';
    bonus_timer_ended = true;
    bonus_button_switch();
    clearTimeout(bonus_captcha_timer);
    hcaptcha.reset(bonus_captcha);
    document.getElementById('bonus_captcha_title').innerHTML = '&larr; Click to verify';
    if (bonus_timer_count > 5 && !page_active) {
      var sound = new Audio();
      sound.src = 'https://www.bestchange.com/images/notify.mp3';
      sound.autoplay = true;
      bonus_timer_count = 0;
    }
    return;
  }
  var left_hours = Math.floor(left / 3600);
  var left_mins = Math.floor((left - (left_hours * 3600)) / 60);
  var left_sec = left - left_hours * 3600 - left_mins * 60;
  bonus_button.value = 'Time left: ' + (left_hours ? (left_hours < 10 ? '0' : '') + left_hours + ':' : '') + (left_mins < 10 ? '0' : '') + left_mins + ':' + (left_sec < 10 ? '0' : '') + left_sec;
  bonus_timer_ended = false;
  bonus_button_switch();
  setTimeout(function () {
    start_bonus_timer();
    bonus_timer_count++;
  }, 1000);
}

eventPush(window, 'load', function () {
  is_page_loaded = true;
  start_bonus_timer();
});

function activate_bonus_captcha() {
  setTimeout(function() {
    removeClass(document.getElementById('bonus_captcha'), 'hide');
  }, 200);
}

var captcha_callback = function() {
  var hl = /ar|iw/i.test(navigator.browserLanguage || navigator.language || navigator.userLanguage) ? 'en' : '';
  var bonus_captcha_obj = document.getElementById('bonus_captcha');
  if (bonus_captcha_obj) {
    bonus_captcha = hcaptcha.render(bonus_captcha_obj, {
      'sitekey': '96698d85-c7f5-46b2-a9b8-8a2d6c7ec963',
      'hl': hl,
      'callback': function () {
        document.getElementById('bonus_captcha_title').innerHTML = 'Checked successfully';
        bonus_captcha_timer = setTimeout(function() {
          hcaptcha.reset(bonus_captcha);
          document.getElementById('bonus_captcha_title').innerHTML = '&larr; Click to verify';
        }, 100000);
      }
    });
	if (is_page_loaded) {
      activate_bonus_captcha();
	} else {
      eventPush(window, 'load', function () {
        activate_bonus_captcha();
      });
	  eventPush(window, 'abort', function () {
        activate_bonus_captcha();
      });
	}
  }
  
  var invisible_captcha_obj = document.getElementById('invisible_captcha');
  if (invisible_captcha_obj) invisible_captcha = hcaptcha.render(invisible_captcha_obj, {
    'sitekey': '4c06fe16-39f9-484a-b4f1-b4d94bf0fa01',
    'hl': hl,
    'callback': function () {
      if (typeof invisible_captcha_callback === 'function') invisible_captcha_callback(hcaptcha.getResponse(invisible_captcha));
    },
    'close-callback': function () {
      if (typeof invisible_captcha_close_callback === 'function') invisible_captcha_close_callback();
    },
    'size': 'invisible'
  });
};

function set_bonus_status(content, status, filename) {
  var bonus_result = document.getElementById('bonus_result');
  var status_content = '<p><span id="bonus_img"></span> <span id="bonus_status"></span></p>';
  if (content) {
    status_content += content;
  } else {
    status_content = '<div style="text-align: center; padding-top: ' + (bonus_result.offsetHeight / 2 - 10) + 'px">' + status_content + '</div>';
  }
  bonus_result.innerHTML = status_content;
  set_status('bonus', status, filename, content != '');
}

function get_bonus() {
  if (isFramed()) {
    alert('To get the Bitcoins, you must open the exchanger monitor in a separate window');
    return;
  }
  var bonus_purse = document.getElementById('bonus_purse');
  var bonus_result = document.getElementById('bonus_result');
  var bonus_form = document.getElementById('bonus_form');
  if (bonus_purse.value) setCookie('bonus_purse', bonus_purse.value);

  var req = createRequest();
  if (req) {
    var width = bonus_form.offsetWidth;
    var height = bonus_form.offsetHeight;

    bonus_result.style.width = width + 'px';
    bonus_result.style.height = height + 'px';
    addClass(bonus_form, 'hide');
    removeClass(bonus_result, 'hide');

    bonus_result.innerHTML = '<img src="https://www.bestchange.com/images/ajax-big.gif" width="48" height="48" style="padding: ' + (height / 2 - 28) + 'px 0 0 ' + (width / 2 - 24) + 'px" alt="Wait..." />';
    clearTimeout(bonus_captcha_timer);

    var ajax_timer = setTimeout(function() {
      req.abort();
      req.onreadystatechange = function() {
        return true;
      };
      set_bonus_status('', 'No connection to the server', 'error.png');
      document.getElementById('bonus_captcha_title').innerHTML = '&larr; Click to verify';
      hcaptcha.reset(bonus_captcha);
    }, 25000);

    req.onreadystatechange = function() {
      if (req.readyState != 4) return;
      clearTimeout(ajax_timer);
      if (req.status == 200) {
        var results = req.responseText.split('[delimiter]');
        if (results.length == 6) {
          if (results[0] == 'OK') {
            set_bonus_status(results[5] + '<p>If you like our exchanger monitor, you can:</p><ul><li>Leave your feedback on <a target="_blank" rel="noreferrer" href="https://www.mywot.com/en/scorecard/bestchange.com">MyWOT</a> or on <a target="_blank" rel="noreferrer" href="https://www.trustpilot.com/review/www.bestchange.com">TrustPilot</a>;</li><li><a href="//www.bestchange.com/bitcoin-to-perfectmoney-usd.html">View</a> the current <b>Bitcoin rates</b>;</li><li><a href="//www.bestchange.com/partner/">Register</a> in our affiliate program and earn money by <span class="videolink" onclick="show_video(\'aff-en\')"><span class="videoicon"></span><span class="link dashlink">advertising</span></span> BestChange.com;</li><li>Recommend BestChange.com to your friends and people you know;</li><li>Follow us on our <a target="_blank" href="https://facebook.com/bestchange">Facebook page</a>.</li></ul><input type="button" class="button" value="Thank you! I want more!" onclick="open_bonus_form()" />', results[1], 'ok.png');
            bonus_result.style.height = 'auto';
            bonus_last_time = Math.floor(new Date() / 1000);
            setCookie('bonus_last_time', bonus_last_time);
			if (results[4] == '1') load_overlay('addrmsg');
          } else if (results[0] == 'ERROR') {
            set_bonus_status('', results[1], 'error.png');
          } else {
            set_bonus_status('', 'An error occurred', 'error.png');
          }
          document.getElementById('bonus_captcha_title').innerHTML = '&larr; Click to verify';
          hcaptcha.reset(bonus_captcha);
          document.getElementById('bonus_stats').innerHTML = results[2];
          if (results[3] == 'purse') setFocus(bonus_purse);
        } else {
          set_bonus_status('', 'An error occurred', 'error.png');
        }
      } else {
        set_bonus_status('', 'No connection to the server', 'error.png');
      }
    }
    
    sendRequest(req, 'action=getbonus&address=' + encodeURIComponent(bonus_purse.value) + '&captcha=' + encodeURIComponent(hcaptcha.getResponse(bonus_captcha)), function () {
      set_bonus_status('', 'No connection', 'error.png');
    });
  }
  
  if (typeof gtag === 'function') {
    gtag('event', 'claim', {
      'event_category': 'bonus'
    });
  }
  return false;
}

function bonus_button_switch() {
  var bonus_agree_obj = document.getElementById('bonus_agree');
  var bonus_agree = bonus_agree_obj ? bonus_agree_obj.checked : true;
  document.getElementById('bonus_button').disabled = !bonus_agree || !bonus_timer_ended;
}

function process_claim() {
  if (isFramed()) {
    alert('To get the Bitcoins, you must open the exchanger monitor in a separate window');
    return;
  }
  var bonus_agree = document.getElementById('bonus_agree');
  if (!bonus_agree.checked) return;
  var bonus_purse = document.getElementById('bonus_purse');
  var bonus_result = document.getElementById('bonus_result');
  var bonus_form = document.getElementById('bonus_form');
  if (bonus_purse.value) setCookie('bonus_purse', bonus_purse.value);

  var req = createRequest();
  if (req) {
    var width = bonus_form.offsetWidth;
    var height = bonus_form.offsetHeight;

    bonus_result.style.width = width + 'px';
    bonus_result.style.height = height + 'px';
    addClass(bonus_form, 'hide');
    removeClass(bonus_result, 'hide');

    bonus_result.innerHTML = '<img src="https://www.bestchange.com/images/ajax-big.gif" width="48" height="48" style="padding: ' + (height / 2 - 28) + 'px 0 0 ' + (width / 2 - 24) + 'px" alt="Wait..." />';
    clearTimeout(bonus_captcha_timer);

    var ajax_timer = setTimeout(function() {
      req.abort();
      req.onreadystatechange = function() {
        return true;
      };
      set_bonus_status('', 'No connection to the server', 'error.png');
      document.getElementById('bonus_captcha_title').innerHTML = '&larr; Click to verify';
      hcaptcha.reset(bonus_captcha);
    }, 25000);

    req.onreadystatechange = function() {
      if (req.readyState != 4) return;
      clearTimeout(ajax_timer);
      if (req.status == 200) {
        var results = req.responseText.split('[delimiter]');
        if (results.length == 6) {
          if (results[0] == 'OK') {
            set_bonus_status(results[5] + '<p>If you like our exchanger monitor, you can:</p><ul><li>Leave your feedback on <a target="_blank" rel="noreferrer" href="https://www.mywot.com/en/scorecard/bestchange.com">MyWOT</a> or on <a target="_blank" rel="noreferrer" href="https://www.trustpilot.com/review/www.bestchange.com">TrustPilot</a>;</li><li><a href="//www.bestchange.com/bitcoin-to-perfectmoney-usd.html">View</a> the current <b>Bitcoin rates</b>;</li><li><a href="//www.bestchange.com/partner/">Register</a> in our affiliate program and earn money by <span class="videolink" onclick="show_video(\'aff-en\')"><span class="videoicon"></span><span class="link dashlink">advertising</span></span> BestChange.com;</li><li>Recommend BestChange.com to your friends and people you know;</li><li>Follow us on our <a target="_blank" href="https://facebook.com/bestchange">Facebook page</a>.</li></ul><input type="button" class="button" value="Thank you! I want more!" onclick="open_bonus_form()" />', results[1], 'ok.png');
            bonus_result.style.height = 'auto';
            bonus_last_time = Math.floor(new Date() / 1000);
            setCookie('bonus_last_time', bonus_last_time);
          } else if (results[0] == 'ERROR') {
            set_bonus_status('', results[1], 'error.png');
          } else {
            set_bonus_status('', 'An error occurred', 'error.png');
          }
          document.getElementById('bonus_captcha_title').innerHTML = '&larr; Click to verify';
          hcaptcha.reset(bonus_captcha);
          document.getElementById('bonus_stats').innerHTML = results[2];
          setFocus(bonus_purse);
        } else {
          set_bonus_status('', 'An error occurred', 'error.png');
        }
      } else {
        set_bonus_status('', 'No connection to the server', 'error.png');
      }
    }
    
    sendRequest(req, 'action=getbonus&address=' + encodeURIComponent(bonus_purse.value), function () {
      set_bonus_status('', 'No connection', 'error.png');
    });
  }
  
  if (typeof gtag === 'function') {
    gtag('event', 'claim', {
      'event_category': 'bonus'
    });
  }
  return false;
}

function open_bonus_form() {
  addClass(nodeById('bonus_result'), 'hide');
  removeClass(nodeById('bonus_form'), 'hide');
  start_bonus_timer();
}

function bonusKeyPress(obj) {
  var evt = event || window.event;
  if ((evt.keyCode || evt.which) == 13) {
    get_bonus();
    return false;
  }
}

function faucet_order(address) {
  if (!confirm('Are you sure you want to request a payout?')) return false;
  
  var faucet_order_button = document.getElementById('faucet_order_button');
  
  var req = createRequest();
  if (req) {
    var ajax_timer = setTimeout(function() {
      req.abort();
      req.onreadystatechange = function() {
        return true;
      };
      faucet_order_button.disabled = false;
      faucet_order_button.value = 'Request a payout';
    }, 25000);
    faucet_order_button.disabled = true;
    faucet_order_button.value = 'Sending request...';
    
    req.onreadystatechange = function() {
      if (req.readyState != 4) return;
      clearTimeout(ajax_timer);
      if (req.status == 200) {
        var results = req.responseText.split('[delimiter]');
        if (results[0] == 'OK') {
          document.getElementById('faucet_order_result').innerHTML = results[1];
          document.getElementById('faucet_paid_amount').innerHTML = results[2];
          document.getElementById('faucet_unpaid_balance').innerHTML = '0 Satoshi';
          show_th_info = false;
          show_trans_history();
        } else {
          faucet_order_button.disabled = false;
          faucet_order_button.value = 'Request a payout';
        }
      } else {
        faucet_order_button.disabled = false;
        faucet_order_button.value = 'Request a payout';
      }
    }

    sendRequest(req, 'action=faucetorder&address=' + encodeURIComponent(address), function () {
      faucet_order_button.disabled = false;
      faucet_order_button.value = 'Request a payout';
    });
  }
  return false;
}

function show_trans_history() {
  show_th_info = !show_th_info;
  var transhistory = document.getElementById('transhistory');
  var th_bullet = document.getElementById('th_bullet');
  if (show_th_info) {
    transhistory.className = '';
    th_bullet.className = 'bulletup';
  } else {
    transhistory.className = 'hide';
    th_bullet.className = 'bulletdown';
  }
}

function show_overlay() {
  var arrayPageSize = getPageSize();
  var arrayPageScroll = getPageScroll();
  var objBody = document.getElementsByTagName('body').item(0);

  var objOverlay = document.getElementById('overlay');
  var objLightbox = document.getElementById('lightbox');
  if (objOverlay) {
    objOverlay.style.display = 'block';
    objLightbox.style.display = 'block';
  } else {
    objOverlay = document.createElement('div');
    objOverlay.setAttribute('id', 'overlay');
    objOverlay.onclick = function () {
      hide_overlay();
      return false;
    }
    objBody.insertBefore(objOverlay, objBody.firstChild);

    var objLightbox = document.createElement('div');
    objLightbox.setAttribute('id', 'lightbox');
    objBody.insertBefore(objLightbox, objOverlay.nextSibling);
  }
  objOverlay.style.height = arrayPageSize[1] + 'px';
  objLightbox.style.height = '150px';
  objLightbox.innerHTML = '<div id="lightboxClose" onclick="hide_overlay()"></div><div id="lightboxPre"></div><div id="lightboxContent"></div><div id="lightboxPost"></div>';
  objLightbox.style.top = arrayPageScroll[1] + ((arrayPageSize[3] - objLightbox.clientHeight) / 2) + 'px';
  objLightbox.style.left = ((arrayPageSize[0] - objLightbox.clientWidth) / 2) + 'px';

  eventPush(document, 'keydown', function (evt) {
    evt = evt || window.event;
    var key = evt.keyCode || evt.which;
    if (key == 27) {
      hide_overlay();
      return false;
    }
  });
}

function hide_overlay() {
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('lightbox').style.display = 'none';
  document.getElementById('lightboxClose').style.display = 'none';
  setTimeout(function () {
    document.getElementById('lightboxContent').innerHTML = '';
  }, 50);
  document.onkeydown = null;
}

function load_overlay(params) {
  var req = createRequest();
  if (req) {
    show_overlay();
    
    var geo_details = nodeById('geo_details');
    if (geo_details) addClass(geo_details, 'hide');

    var lightboxContent = document.getElementById('lightboxContent');
    var width = lightboxContent.offsetWidth;
    var height = lightboxContent.offsetHeight;
    lightboxContent.innerHTML = '<img src="https://www.bestchange.com/images/ajax-big.gif" width="48" height="48" style="padding: ' + (height / 2 - 28) + 'px 0 0 ' + (width / 2 - 24) + 'px" alt="Wait..." />';

    var ajax_timer = setTimeout(function() {
      req.abort();
      req.onreadystatechange = function() {
        return true;
      };
      hide_overlay();
    }, 25000);

    req.onreadystatechange = function() {
      if (req.readyState != 4) return;
      clearTimeout(ajax_timer);
      if (req.status == 200) {
        var results = req.responseText.split('[delimiter]');
        if (results[0] == 'OK') {
          setTimeout(function () {
            document.getElementById('lightbox').style.height = 'auto';
            lightboxContent.innerHTML = results[1];
            setSelectStyle(lightboxContent);
            if (results[2]) eval(results[2]);
            var arrayPageSize = getPageSize();
            var arrayPageScroll = getPageScroll();
            var objLightbox = document.getElementById('lightbox');
            objLightbox.style.top = arrayPageScroll[1] + ((arrayPageSize[3] - objLightbox.clientHeight) / 2) + 'px';
            objLightbox.style.left = ((arrayPageSize[0] - objLightbox.clientWidth) / 2) + 'px';
            document.getElementById('lightboxClose').style.display = 'block';
          }, 300);
        } else {
          hide_overlay();
        }
      } else {
        hide_overlay();
      }
    }

    sendRequest(req, 'action=' + params, function () {
      hide_overlay();
    });
  }
  return false;
}

function video_load_complete() {
  document.getElementById('video_pre_load').style.display = 'none';
  document.getElementById('video_frame').style.display = 'block';
  document.getElementById('lightbox').style.height = 'auto';
  var lightboxContent = document.getElementById('lightboxContent');
  setSelectStyle(lightboxContent);
  var arrayPageSize = getPageSize();
  var arrayPageScroll = getPageScroll();
  var objLightbox = document.getElementById('lightbox');
  objLightbox.style.top = arrayPageScroll[1] + ((arrayPageSize[3] - objLightbox.clientHeight) / 2) + 'px';
  objLightbox.style.left = ((arrayPageSize[0] - objLightbox.clientWidth) / 2) + 'px';
  document.getElementById('lightboxClose').style.display = 'block';
}

function show_video(id) {
  var video;
  if (id == 'ru') {
    video = 'hgx0IScTiQM';
  } else if (id == 'en') {
    video = 'Jck4GeBB3-c';
  } else if (id == 'aff-ru') {
    video = 'yihaSX2qr6s';
  } else if (id == 'aff-en') {
    video = 'y-X-JAFfo5A';
  }
  show_overlay();
  var lightboxContent = document.getElementById('lightboxContent');
  lightboxContent.innerHTML = '<img src="https://www.bestchange.com/images/ajax-big.gif" id="video_pre_load" width="48" height="48" style="padding: ' + (lightboxContent.offsetHeight / 2 - 28) + 'px 0 0 ' + (lightboxContent.offsetWidth / 2 - 24) + 'px" alt="Wait..." /><div id="video_frame"><iframe onload="setTimeout(function () {video_load_complete()}, 200)" width="600" height="338" src="https://www.youtube.com/embed/' + video + '?rel=0&autoplay=1&showinfo=0" frameborder="0" allowfullscreen></iframe></div>';
}

function switch_ts_desc(id, pos) {
  if (id == twostep_rate_id) return;
  twostep_rate_id_next = id;
  if (id > 0) document.getElementById('tk' + id).style.height = pos + 'px';
  if (twostep_rate_id > 0) document.getElementById('tk' + twostep_rate_id).style.height = (47 - pos) + 'px';
  if (pos == 0) {
    if (id > 0) {
      removeClass(document.getElementById('dr' + id), 'hide');
      addClass(document.getElementById('tsl' + id), 'tsa');
    }
  } else if (pos == 47) {
    if (twostep_rate_id > 0) {
      addClass(document.getElementById('dr' + twostep_rate_id), 'hide');
      removeClass(document.getElementById('tsl' + twostep_rate_id), 'tsa');
    }
    twostep_rate_id = id;
  }
  if (pos < 47) setTimeout(function () {
    switch_ts_desc(id, (pos + 5 > 47 ? 47 : pos + 5));
  }, 10);
}

function tab_repainting() {
  if (lc_curr > 0) sc_list[id2pos(lc_curr)] = 1;
  if (rc_curr > 0) sc_list[id2pos(rc_curr)] = 1;
  
  if (sc == 0) {
    var maxpos = arraySum(sc_list);
  } else {
    var maxpos = sc_list.length;
  }
  
  var pos = 0;
  var is_alt = true;
  var last_type = ty_list[0];
  
  for (var i = 0; i < ds_list.length; i++) {
    if (sc == 1 || sc_list[i] == 1) {
      pos++;
      is_alt = !is_alt;
      if (last_type != ty_list[i]) {
        if (is_alt) {
          removeClass(nodeById('ty' + ty_list[i]), 'alt');
        } else {
          addClass(nodeById('ty' + ty_list[i]), 'alt');
        }
        last_type = ty_list[i];
        is_alt = !is_alt;
      }
      if (is_alt) {
        addClass(nodeById('ti' + ds_list[i]), 'alt');
      } else {
        removeClass(nodeById('ti' + ds_list[i]), 'alt');
      }
      removeClass(nodeById('ti' + ds_list[i]), 'hide');
    } else {
      addClass(nodeById('ti' + ds_list[i]), 'hide');
    }

    if (pos != maxpos) {
      removeClass(nodeById('ti' + ds_list[i]), 'last');
    } else {
      addClass(nodeById('ti' + ds_list[i]), 'last');
    }
  }
}

function resize_tab_line(id, px) {
  if (px === undefined) px = 24;
  nodeById('alc' + id).style.lineHeight = px + 'px';
  nodeById('arc' + id).style.lineHeight = px + 'px';
  nodeById('alc' + id).style.height = px + 'px';
  nodeById('arc' + id).style.height = px + 'px';
  nodeById('dlc' + id).style.height = px + 'px';
  nodeById('drc' + id).style.height = px + 'px';
}

function tab_winding(px) {
  if (sc == 1) {
    px += 6;
  } else {
    px -= 6;
  }
  if (px < 0) px = 0;
  if (px > 24) px = 24;

  for (var i = 0; i < ds_list.length; i++) {
    if (sc_list[i] == 0) {
      resize_tab_line(ds_list[i], px);
      if (sc == 0 && px == 0) addClass(nodeById('ti' + ds_list[i]), 'hide');
      if (sc == 1 && px == 6) removeClass(nodeById('ti' + ds_list[i]), 'hide');
    }
  }

  if ((sc == 0 && px == 0) || (sc == 1 && px == 24)) {
    tab_repainting();
    
    var tab_show_button = document.getElementById('tab_show_button');
    if (sc == 0) {
      removeClass(tab_show_button, 'down');
      tab_show_button.title = 'Expand the entire currency list';
    } else {
      addClass(tab_show_button, 'down');
      tab_show_button.title = 'Reduce the currency list';
    }
    return;
  }
  setTimeout(function () {
    tab_winding(px);
  }, 10);
}

function switch_curr_list() {
  if (lc_curr > 0) sc_list[id2pos(lc_curr)] = 1;
  if (rc_curr > 0) sc_list[id2pos(rc_curr)] = 1;
  sc = sc == 0 ? 1 : 0;
  setCookie('sc', sc);
  tab_winding(sc == 0 ? 24 : 0);
  return false;
}

function change_reviewtype(num) {
  var tsidreq = document.getElementById('tsidreq');
  var tsiddesc = document.getElementById('tsiddesc');
  var tsidposdesc = document.getElementById('tsidposdesc');
  var reviewtsid = document.getElementById('reviewtsid');
  if (num == 2) {
    removeClass(tsidreq, 'hide');
    tsiddesc.style.display = document.all && !document.querySelector ? 'block' : 'table-row';//ie7fix
    //tsidposdesc.style.display = 'none';
    if (reviewtsid.value == '') setFocus(reviewtsid);
  } else {
    addClass(tsidreq, 'hide');
    tsiddesc.style.display = 'none';
    //tsidposdesc.style.display = document.all && !document.querySelector ? 'block' : 'table-row';//ie7fix
  }
}

function switch_arform(obj, position, is_start) {
  if (show_ar_form) {
    if (is_start) obj.style.position = 'static';

    position += 35;
    if (position < ar_form_height) {
      obj.style.height = position + 'px';
    } else {
      position = ar_form_height;
      obj.style.height = 'auto';

      var reviewname = document.getElementById('reviewname');
      if (reviewname.value == '') {
        setFocus(reviewname);
      } else {
        var reviewemail = document.getElementById('reviewemail');
        if (reviewemail.value == '') {
          setFocus(reviewemail);
        } else {
          setFocus(document.getElementById('reviewtext'));
        }
      }
      return;
    }
  } else {
    position -= 35;
    if (position > 0) {
      obj.style.height = position + 'px';
    } else {
      obj.style.position = 'absolute';
      obj.style.left = '-9999px';
      obj.style.height = 'auto';
      document.getElementById('ar_bullet').className = 'bulletdown';
      return;
    }
  }
  setTimeout(function () {
    switch_arform(obj, position, false);
  }, 10);
}

function show_addreviewform(whatis) {
  var new_show_ar_form;
  if (whatis == 1) {
    new_show_ar_form = true;
  } else if (whatis == 2) {
    new_show_ar_form = false;
  } else {
    new_show_ar_form = !show_ar_form;
  }
  if (show_ar_form == new_show_ar_form) return;
  show_ar_form = new_show_ar_form;

  var review_form = document.getElementById('review_form');
  ar_form_height = review_form.clientHeight;
  if (show_ar_form) {
    switch_arform(review_form, 0, true);
    document.getElementById('ar_bullet').className = 'bulletup';
  } else {
    switch_arform(review_form, ar_form_height, true);
  }
}

function send_review(exchid) {
  if (isFramed()) {
    alert('To leave feedback, open the site in a separate window.');
    return;
  }
  var name = document.getElementById('reviewname').value;
  var email = document.getElementById('reviewemail').value;
  var text = document.getElementById('reviewtext').value;
  var type = 3;
  for (var i = 1; i <= 3; i++) if (document.getElementById('rvtype_' + i).checked) type = i;
  var tsid = document.getElementById('reviewtsid').value;

  if (name) setCookie('name', name);
  if (email) setCookie('email', email);

  var req = createRequest();
  if (req) {
    var send_button = document.getElementById('review_button');
    send_button.disabled = true;

    var ajax_timer = setTimeout(function() {
      req.abort();
      req.onreadystatechange = function() {
        return true;
      };
      set_status('review', 'No connection to the server', 'error.png');
      send_button.disabled = false;
    }, 25000);
    set_status('review', 'Saving the feedback...', 'ajax.gif', true);

    req.onreadystatechange = function() {
      if (req.readyState != 4) return;
      clearTimeout(ajax_timer);
      if (req.status == 200) {
        var results = req.responseText.split('[delimiter]');
        if (results.length == 2) {
          if (results[0] == 'OK') {
            set_status('review', 'The feedback has been successfully saved', 'ok.png');
            document.getElementById('reviewtext').value = '';
            document.getElementById('reviewtsid').value = '';
            document.getElementById('rvtype_3').click();
            document.getElementById('new_review_container').innerHTML = results[1];
            setTimeout(function() {
              show_addreviewform(2);
            }, 700);

          } else if (results[0] == 'ERROR') {
            set_status('review', 'Input error', 'error.png');
            alert('Please fix the following errors:\n' + results[1]);
          } else {
            set_status('review', 'Error saving the feedback', 'error.png');
          }
        } else {
          set_status('review', 'Error saving the feedback', 'error.png');
        }
      } else {
        set_status('review', 'An error occurred', 'error.png');
      }
      send_button.disabled = false;
    }

    sendRequest(req, 'action=newreview&exchid=' + exchid + '&name=' + encodeURIComponent(name) + '&email=' + encodeURIComponent(email) + '&text=' + encodeURIComponent(text) + '&type=' + type + '&tsid=' + encodeURIComponent(tsid), function () {
      set_status('review', 'No connection', 'error.png');
      send_button.disabled = false;
    });
  }
  
  if (typeof gtag === 'function') {
    gtag('event', 'review', {
      'event_category': 'exchanger',
      'event_label': exchid
    });
  }
  return false;
}

function review_smooth_hide(obj, op, text) {
  if (op > 0) {
    op -= 0.1;
    obj.style.opacity = op;
    obj.style.filter = 'alpha(opacity=' + (op * 100) + ')';
    setTimeout(function() {
      review_smooth_hide(obj, op, text);
    }, 30);
  } else {
    obj.style.display = 'none';
    document.getElementById('new_review_container').innerHTML = text;
  }
}

function delete_review() {
  var req = createRequest();
  if (req) {
    var send_button = document.getElementById('manage_review_button');
    send_button.disabled = true;
    var review_password = document.getElementById('review_password');
    var id = document.getElementById('manage_review_id').value;
    var password = document.getElementById('review_password').value;

    var ajax_timer = setTimeout(function() {
      req.abort();
      req.onreadystatechange = function() {
        return true;
      };
      set_status('manage_review', 'No connection to the server', 'error.png');
      send_button.disabled = false;
    }, 25000);
    set_status('manage_review', 'Removing the feedback...', 'ajax.gif', true);

    req.onreadystatechange = function() {
      if (req.readyState != 4) return;
      clearTimeout(ajax_timer);
      if (req.status == 200) {
        var results = req.responseText.split('[delimiter]');
        if (results.length >= 2) {
          if (results[0] == 'OK') {
            set_status('manage_review', 'Removed', 'ok.png');
            document.getElementById('bc_rw_count').innerHTML = results[2];
            setTimeout(function() {
              details_menu_hide();
              review_smooth_hide(document.getElementById('review' + id), 1, results[1]);
            }, 500);
          } else if (results[0] == 'ERROR') {
            set_status('manage_review', results[1], 'error.png');
            setFocus(review_password);
          } else {
            set_status('manage_review', 'Error removing the feedback', 'error.png');
            setFocus(review_password);
          }
        } else {
          set_status('manage_review', 'Error removing the feedback', 'error.png');
          setFocus(review_password);
        }
      } else {
        set_status('manage_review', 'An error occurred', 'error.png');
        setFocus(review_password);
      }
      send_button.disabled = false;
    }

    sendRequest(req, 'action=deletereview&tsid=' + encodeURIComponent(id) + '&password=' + encodeURIComponent(password), function () {
      set_status('manage_review', 'No connection', 'error.png');
      setFocus(review_password);
      send_button.disabled = false;
    });
  }
  return false;
}

function comment_review() {
  var req = createRequest();
  if (req) {
    var send_button = document.getElementById('manage_review_button');
    send_button.disabled = true;
    var review_password = document.getElementById('review_password');
    var id = document.getElementById('manage_review_id').value;
    var password = document.getElementById('review_password').value;

    var ajax_timer = setTimeout(function() {
      req.abort();
      req.onreadystatechange = function() {
        return true;
      };
      set_status('manage_review', 'No connection to the server', 'error.png');
      send_button.disabled = false;
    }, 25000);
    set_status('manage_review', 'Verifying the password...', 'ajax.gif', true);

    req.onreadystatechange = function() {
      if (req.readyState != 4) return;
      clearTimeout(ajax_timer);
      if (req.status == 200) {
        var result = req.responseText;
        if (result == 'OK') {
          set_status('manage_review', 'The password is correct', 'ok.png');
          setTimeout(function() {
            details_menu_hide();
            show_review_comment_form(id, password);
          }, 200);
        } else if (result == 'ERROR') {
          set_status('manage_review', 'Incorrect password', 'error.png');
          setFocus(review_password);
        } else {
          set_status('manage_review', 'Verification error', 'error.png');
          setFocus(review_password);
        }
      } else {
        set_status('manage_review', 'An error occurred', 'error.png');
        setFocus(review_password);
      }
      send_button.disabled = false;
    }

    sendRequest(req, 'action=prereviewcomment&tsid=' + encodeURIComponent(id) + '&password=' + encodeURIComponent(password), function () {
      set_status('manage_review', 'No connection', 'error.png');
      setFocus(review_password);
      send_button.disabled = false;
    });
  }
  return false;
}

function info_page_click_event(e) {
  var evt = e || window.event;
  var target = evt.target || evt.srcElement;
  if (!checkParent(nodeById('details_menu'), target)) details_menu_hide();
}

function details_menu_show(obj, is_right_head, text) {
  var info_box = nodeById('details_menu');
  var linkwidth = window.opera ? obj.clientWidth : obj.offsetWidth;

  var x = 0, y = 0;
  try {
    while (obj && obj.id != 'info_content') {
      x += parseInt(obj.offsetLeft);
      y += parseInt(obj.offsetTop);
      obj = obj.offsetParent;
    }
  } catch (error) {
    return false;
  }

  info_box.style.left = Math.round(x + linkwidth / 2 - (is_right_head ? 140 : 87)) + 'px';
  info_box.style.top = Math.round(y + 20) + 'px';

  nodeById('details_menu_head').className = is_right_head ? 'details_menu_head_right' : '';
  nodeById('details_menu_body').innerHTML = text;

  eventPush(info_box, 'keydown', function (evt) {
    evt = evt || window.event;
    var key = evt.keyCode || evt.which;
    if (key == 27) {
      details_menu_hide();
      return false;
    }
  });
  
  info_box.className = '';
  return true;
}

function details_menu_hide() {
  nodeById('details_menu').className = 'hide';
  show_del_box = false;
  show_cmt_box = false;
  show_all_box = false;
}

function manage_review_menu_show(obj, is_delete, password) {
  var text = '<div class="review_menu_manage">\
  <form>\
    Feedback password:<br />\
    <div class="pre_input_skin">\
      <div class="input_skin">\
        <div class="input_left"></div>\
        <input type="text" id="review_password" value="' + (password ? password : '') + '" />\
        <div class="input_right"></div>\
      </div>\
      <div class="clear"></div>\
    </div>\
    <input type="hidden" id="manage_review_id" value="" />\
    <input type="submit" class="button" id="manage_review_button" value="' + (is_delete ? 'Remove' : 'Type') + '" />\
  </form>\
  <div id="manage_review_status_block" class="hide">\
    <span id="manage_review_img"></span><span id="manage_review_status"></span>\
  </div>\
</div>';

  return details_menu_show(obj, is_delete, text);
}

function delete_review_menu(id, obj, event, password) {
  if (show_del_box) {
    if (show_del_box == id) return;
    details_menu_hide();
  }
  
  var autodelete = false;
  if (!password) password = getCookie('review' + id);
  if (password) {
    if (confirm('Do you really want to delete this review?')) {
      autodelete = true;
    } else {
      return;
    }
  }

  show_del_box = id;
  show_cmt_box = false;
  show_all_box = false;
  
  if (!manage_review_menu_show(obj, true, password)) {
    show_del_box = false;
    return;
  }
  document.getElementById('manage_review_id').value = id;
  document.getElementById('manage_review_button').onclick = function () {
    delete_review();
    return false;
  };
  document.getElementById('review_password').value = password;
  setFocus(document.getElementById('review_password'));
  
  if (autodelete) {
    set_status('manage_review', 'Removing the feedback...', 'ajax.gif', true);
    setTimeout(function () {
      delete_review();
    }, 300);
  }

  stopBubbling(event);
}

function comment_review_menu(id, obj, event) {
  if (show_cmt_box) {
    if (show_cmt_box == id) return;
    details_menu_hide();
  }
  show_cmt_box = id;
  show_del_box = false;
  show_all_box = false;
  
  if (!manage_review_menu_show(obj, false)) {
    show_cmt_box = false;
    return;
  }
  document.getElementById('manage_review_id').value = id;
  document.getElementById('manage_review_button').onclick = function () {
    comment_review();
    return false;
  };
  
  var password = getCookie('review' + id);
  if (password) {
    document.getElementById('review_password').value = password;
    set_status('manage_review', 'Verifying the password...', 'ajax.gif', true);
    setTimeout(function () {
      comment_review();
    }, 700);
  }
  setFocus(document.getElementById('review_password'));

  stopBubbling(event);
}

function show_all_exch_list(obj, event, pos) {
  if (show_all_box) {
    details_menu_hide();
    return;
  }
  show_cmt_box = false;
  show_del_box = false;
  show_all_box = true;
  
  var text = '<div id="all_exch_list">' + document.getElementById('all_exch_list_menu').innerHTML + '</div>';
  
  if (!details_menu_show(obj, true, text)) {
    show_all_box = false;
    return;
  }
  document.getElementById('all_exch_list').scrollTop = (pos - 2) * 24;
  setFocus(document.getElementById('all_exch_list').getElementsByTagName('a')[pos == 1 ? 0 : pos - 2]);
  stopBubbling(event);
}

function switch_cmform(id, obj, position, is_start, inner) {
  if (show_cm_form) {
    if (is_start) {
      obj.className = 'review_comment_box';
      obj.style.height = '0px';
      inner.className = '';
      nodeById('reviewmanage' + id).className = 'hide';
    }
    position += 20;
    if (position < inner.clientHeight) {
      obj.style.height = position + 'px';
    } else {
      obj.style.height = 'auto';
      setFocus(nodeById('review_comment_text'));
      return;
    }
  } else {
    if (is_start) position = inner.clientHeight;
    position -= 20;
    if (position > 18) {
      obj.style.height = position + 'px';
    } else {
      obj.className = 'hide';
      inner.className = 'hide';
      nodeById('reviewmanage' + id).className = 'review_manage';
      return;
    }
  }
  setTimeout(function () {
    switch_cmform(id, obj, position, false, inner);
  }, 10);
}

function show_review_comment_form(id, password) {
  var review_comment_form = nodeById('review_comment_form');
  var review_comment_id = nodeById('review_comment_id');
  if (review_comment_id.value != '') {
    nodeById('reviewmanage' + review_comment_id.value).className = 'review_manage';
    nodeById('reviewcomment' + review_comment_id.value).className = 'hide';
    close_comment_form();
  }
  var switch_type_table = nodeById('switch_type_table');
  var reviewclaimtype = document.getElementById('reviewclaimtype' + id).innerHTML;
  if (reviewclaimtype > 0) {
    switch_type_table.className = '';
    nodeById('switch_type_title').innerHTML = reviewclaimtype == 2 ? 'Cancel claim' : 'Renew claim' ;
  } else {
    switch_type_table.className = 'hide';
  }
  var review_comment_box = nodeById('reviewcomment' + id);
  review_comment_box.appendChild(review_comment_form);
  review_comment_id.value = id;
  nodeById('review_comment_password').value = password;
  show_cm_form = true;
  switch_cmform(id, review_comment_box, 0, true, review_comment_form);
}

function close_comment_form() {
  var review_comment_id = nodeById('review_comment_id');
  if (review_comment_id.value == '') return;
  show_cm_form = false;
  switch_cmform(review_comment_id.value, nodeById('reviewcomment' + review_comment_id.value), 0, true, nodeById('review_comment_form'));
  review_comment_id.value = '';
}

function send_comment() {
  var req = createRequest();
  if (req) {
    var send_button = document.getElementById('send_comment_button');
    send_button.disabled = true;
    var id = document.getElementById('review_comment_id').value;
    var password = document.getElementById('review_comment_password').value;
    var comment_text = document.getElementById('review_comment_text');
    var switch_type = nodeById('switch_type');
    var type = switch_type.checked ? 1 : 0;

    var ajax_timer = setTimeout(function() {
      req.abort();
      req.onreadystatechange = function() {
        return true;
      };
      set_status('comment', 'No connection to the server', 'error.png');
      send_button.disabled = false;
    }, 25000);
    set_status('comment', 'Saving the comment...', 'ajax.gif', true);

    req.onreadystatechange = function() {
      if (req.readyState != 4) return;
      clearTimeout(ajax_timer);
      if (req.status == 200) {
        var results = req.responseText.split('[delimiter]');
        if (results.length == 3) {
          if (results[0] == 'OK') {
            set_status('comment', 'The comment has been published', 'ok.png');
            nodeById('reviewcomments' + id).innerHTML = results[2];
            show_comment_case(id);
            if (results[1] == 1) nodeById('reviewcommentexpand' + id).className = 'review_comment_expand';
            nodeById('commentexpandcount' + id).innerHTML = results[1];
            if (type == 1) {
              var reviewclaimtype = document.getElementById('reviewclaimtype' + id).innerHTML;
              if (reviewclaimtype == 2 || reviewclaimtype == 3) nodeById('review' + id).className = 'review_block_' + reviewclaimtype;
            }
            comment_text.value = '';
            switch_type.checked = false;
            switch_type.onclick();
            setTimeout(function() {
              close_comment_form();
              set_status('comment', '', '', true);
            }, 900);
          } else if (results[0] == 'ERROR') {
            set_status('comment', results[1], 'error.png');
          } else {
            set_status('comment', 'Error submitting', 'error.png');
          }
        } else {
          set_status('comment', 'Error submitting', 'error.png');
        }
      } else {
        set_status('comment', 'An error occurred', 'error.png');
      }
      send_button.disabled = false;
    }
    
    sendRequest(req, 'action=newreviewcomment&tsid=' + encodeURIComponent(id) + '&password=' + encodeURIComponent(password) + '&text=' + encodeURIComponent(comment_text.value) + '&type=' + type, function () {
      set_status('comment', 'No connection', 'error.png');
      send_button.disabled = false;
    });
  }
  return false;
}

function switch_comment_case(obj, inner, is_show, is_start, position, per) {
  if (is_show) {
    if (is_start) {
      obj.className = 'comment_case';
      obj.style.height = '0px';
      inner.className = '';
      per = Math.round(inner.clientHeight / 8);
    }
    position += per;
    if (position < inner.clientHeight) {
      obj.style.height = position + 'px';
    } else {
      obj.style.height = 'auto';
      obj.querySelector('.review_comment').style.paddingTop = '1px';//chrome bug fix
      return;
    }
  } else {
    if (is_start) {
      position = inner.clientHeight;
      per = Math.round(inner.clientHeight / 8);
    }
    position -= per;
    if (position > per) {
      obj.style.height = position + 'px';
    } else {
      obj.className = 'hide';
      obj.querySelector('.review_comment').style.paddingTop = '0px';//chrome bug fix
      inner.className = 'hide';
      return;
    }
  }
  setTimeout(function () {
    switch_comment_case(obj, inner, is_show, false, position, per);
  }, 3);
}

function show_comment_case(id) {
  if (nodeById('commentcase' + id).className != 'hide') return;
  nodeById('commentexpandlink' + id).onclick = function () {
    hide_comment_case(id);
  }
  nodeById('commentexpandtext' + id).innerHTML = 'Collapse';
  nodeById('vcbullet' + id).className = 'bulletup';
  switch_comment_case(nodeById('commentcase' + id), nodeById('reviewcomments' + id), true, true, 0, 0);
}

function hide_comment_case(id) {
  if (nodeById('commentcase' + id).className == 'hide') return;
  nodeById('commentexpandlink' + id).onclick = function () {
    show_comment_case(id);
  }
  nodeById('commentexpandtext' + id).innerHTML = 'Expand';
  nodeById('vcbullet' + id).className = 'bulletdown';
  switch_comment_case(nodeById('commentcase' + id), nodeById('reviewcomments' + id), false, true, 0, 0);
}

function show_owner_info() {
  show_ow_info = !show_ow_info;
  var ownerinfo = document.getElementById('ownerinfo');
  var oi_bullet = document.getElementById('oi_bullet');
  if (show_ow_info) {
    ownerinfo.className = '';
    oi_bullet.className = 'bulletup';
  } else {
    ownerinfo.className = 'hide';
    oi_bullet.className = 'bulletdown';
  }
}

function show_all_exchstats(count) {
  show_all_est = !show_all_est;
  var es_continue = document.getElementById('es_continue');
  var es_bullet = document.getElementById('es_bullet');
  var es_expand_link = document.getElementById('es_expand_link');
  if (show_all_est) {
    removeClass(es_continue, 'hide');
    es_bullet.className = 'bulletup';
    es_expand_link.innerHTML =  'Collapse (' + count + ')';
  } else {
    addClass(es_continue, 'hide');
    es_bullet.className = 'bulletdown';
    es_expand_link.innerHTML =  'Expand (' + count + ')';
  }
}

function es_click(from, to) {
  openDocument('https://www.bestchange.com/' + cu_list[id2pos(from)] + '-to-' + cu_list[id2pos(to)] + '.html', false);
}

function open_answer(id) {
  var answer = nodeById('answer' + id);
  var faqexp = nodeById('faqexp' + id);
  if (classExists(answer, 'hide')) {
    addClass(faqexp, 'expand');
    removeClass(answer, 'hide');
  } else {
    removeClass(faqexp, 'expand');
    addClass(answer, 'hide');
  }
}

function show_promo(lang) {
  nodeById('promo_' + (lang == 'ru' ? 'en' : 'ru')).className = 'hide';
  nodeById('promo_' + lang).className = '';
  nodeById('promolink_' + (lang == 'ru' ? 'en' : 'ru')).className = 'link dashlink';
  nodeById('promolink_' + lang).className = 'bt';
}

function select_fink_exch() {
  var selected_exch = document.getElementById('finkexch');
  var is_disabled = selected_exch.value == 0;
  var finkinfo = document.getElementById('finkinfo');
  var finkrate = document.getElementById('finkrate');
  var corrrate = document.getElementById('corrrate');
  var finkreserve = document.getElementById('finkreserve');
  var corrreserve = document.getElementById('corrreserve');
  var finkminfee = document.getElementById('finkminfee');
  var corrminfee = document.getElementById('corrminfee');
  var corrminfeecu = document.getElementById('corrminfeecu');
  var corrminfeecu_cont = document.getElementById('custom_select_corrminfeecu');
  var finkaddfee = document.getElementById('finkaddfee');
  var corraddfee = document.getElementById('corraddfee');
  var corraddfeecu = document.getElementById('corraddfeecu');
  var corraddfeecu_cont = document.getElementById('custom_select_corraddfeecu');
  var finkmanual = document.getElementById('finkmanual');
  var finknone = document.getElementById('finknone');

  finkrate.checked = false;
  removeClass(document.getElementById('finkrate_label'), 'checked');
  finkreserve.checked = false;
  removeClass(document.getElementById('finkreserve_label'), 'checked');
  finkminfee.checked = false;
  removeClass(document.getElementById('finkminfee_label'), 'checked');
  finkaddfee.checked = false;
  removeClass(document.getElementById('finkaddfee_label'), 'checked');
  finkmanual.checked = false;
  removeClass(document.getElementById('finkmanual_label'), 'checked');
  finknone.checked = false;
  removeClass(document.getElementById('finknone_label'), 'checked');

  if (is_disabled) {
    addClass(finkinfo, 'disabled');
    addClass(corrminfeecu_cont, 'disabled');
    addClass(corraddfeecu_cont, 'disabled');
  } else {
    removeClass(finkinfo, 'disabled');
    var rate = finkdata[(selected_exch.selectedIndex - 1) * 7 + 2];
    corrrate.value = rate;
    document.getElementById('origrate').innerHTML = 'instead of declared <b>' + rate + '<b>';
    var reserve = finkdata[(selected_exch.selectedIndex - 1) * 7 + 3];
    corrreserve.value = reserve;
    document.getElementById('origreserve').innerHTML = 'instead of declared <b>' + reserve + '<b>';
    
    var minfee = finkdata[(selected_exch.selectedIndex - 1) * 7 + 4].split('#');
    var origminfee = document.getElementById('origminfee');
    if (minfee[0] == 2) {
      corrminfee.value = minfee[1];
      for (i = 0; i < corrminfeecu.options.length; i++) if (corrminfeecu.options[i].value == minfee[2]) {
        corrminfeecu.options[i].selected = true;
        corrminfeecu.onchange();
        origminfee.innerHTML = 'instead of declared <b>' + minfee[1] + ' ' + corrminfeecu.options[i].text + '</b>';
        break;
      }
    } else {
      corrminfee.value = '';
      origminfee.innerHTML = '';
    }
    if (finkminfee.checked) {
      removeClass(corrminfeecu_cont, 'disabled');
    } else {
      addClass(corrminfeecu_cont, 'disabled');
    }
    
    var addfee = finkdata[(selected_exch.selectedIndex - 1) * 7 + 5].split('#');
    var origaddfee = document.getElementById('origaddfee');
    if (addfee[0] == 3 || addfee[0] == 4) {
      corraddfee.value = addfee[1];
      for (i = 0; i < corraddfeecu.options.length; i++) if (corraddfeecu.options[i].value == addfee[2]) {
        corraddfeecu.options[i].selected = true;
        corraddfeecu.onchange();
        origaddfee.innerHTML = 'instead of declared <b>' + addfee[1] + ' ' + corraddfeecu.options[i].text + '</b>';
        break;
      }
    } else {
      corraddfee.value = '';
      origaddfee.innerHTML = '';
    }
    if (finkaddfee.checked) {
      removeClass(corraddfeecu_cont, 'disabled');
    } else {
      addClass(corraddfeecu_cont, 'disabled');
    }
    
    document.getElementById('finkmanual_text').innerHTML = finkdata[(selected_exch.selectedIndex - 1) * 7 + 6] == '' ? 'Manual exchange mode instead of declared automatic mode' : 'Automatic exchange mode instead of declared manual mode';
  }
  finkrate.disabled = is_disabled;
  corrrate.disabled = is_disabled || !finkrate.checked;
  finkreserve.disabled = is_disabled;
  corrreserve.disabled = is_disabled || !finkreserve.checked;
  finkminfee.disabled = is_disabled;
  corrminfee.disabled = is_disabled || !finkminfee.checked;
  corrminfeecu.disabled = is_disabled || !finkminfee.checked;
  finkaddfee.disabled = is_disabled;
  corraddfee.disabled = is_disabled || !finkaddfee.checked;
  corraddfeecu.disabled = is_disabled || !finkaddfee.checked;
  finkmanual.disabled = is_disabled;
  finknone.disabled = is_disabled;
}

function fink_checkbox(type) {
  var fink_cb = document.getElementById('fink' + type);
  var fink_cr = document.getElementById('corr' + type);
  fink_cr.disabled = !fink_cb.checked;
  if (type == 'minfee' || type == 'addfee') {
    document.getElementById('corr' + type + 'cu').disabled = !fink_cb.checked;
    if (fink_cb.checked) {
      removeClass(document.getElementById('custom_select_corr' + type + 'cu'), 'disabled');
    } else {
      addClass(document.getElementById('custom_select_corr' + type + 'cu'), 'disabled');
    }
  }
  if (fink_cb.checked) setFocus(fink_cr);
}

function save_fink(from, to) {
  var finkexch = document.getElementById('finkexch');
  var finktext = document.getElementById('finktext');
  var fink_button = document.getElementById('fink_button');
  
  var text = finktext.value;
  
  var cookie_name = getCookie('name');
  if (cookie_name) text += '\nName: ' + cookie_name;
  var cookie_email = getCookie('email');
  if (cookie_email) text += '\nE-mail: ' + cookie_email;
  var cookie_wmid = getCookie('wmid');
  if (cookie_wmid) text += '\nWMID: ' + cookie_wmid;
  var cookie_userno = getCookie('userno');
  if (cookie_userno) text += '\nPartner: ' + cookie_userno;
  var cookie_partner = getCookie('partner_id');
  if (cookie_partner) text += '\nFrom partner: ' + cookie_partner;

  var req = createRequest();
  if (req) {
    fink_button.disabled = true;
    var ajax_timer = setTimeout(function() {
      req.abort();
      req.onreadystatechange = function() {
        return true;
      };
      set_status('fink', 'No connection to the server', 'error.png');
      fink_button.disabled = false;
    }, 25000);
    set_status('fink', 'Information is being sent...', 'ajax.gif', true);

    req.onreadystatechange = function() {
      if (req.readyState != 4) return;
      clearTimeout(ajax_timer);
      if (req.status == 200) {
        var results = req.responseText.split('[delimiter]');
        if (results[0] == 'OK') {
          set_status('fink', 'Thank you for cooperation! Information was sent to the administrator', 'ok.png', true);
          finktext.value = '';
          setTimeout(function () {
            hide_overlay();
          }, 1000);
        } else {
          set_status('fink', results[1] ? results[1] : 'Information was not sent', 'error.png');
        }
      } else {
        set_status('fink', 'The server is temporarily unavailable', 'error.png');
      }
      fink_button.disabled = false;
    }

    var data = '';
    if (finkexch.value > 0) {
      if (document.getElementById('finkrate').checked) {
        var corrrate = prepareFloat(document.getElementById('corrrate').value);
        var rateorig = finkdata[(finkexch.selectedIndex - 1) * 7 + 2];
        if (corrrate != parseFloat(rateorig)) data += '&rate=' + encodeURIComponent(corrrate) + '&rateorig=' + encodeURIComponent(rateorig);
      }
      if (document.getElementById('finkreserve').checked) {
        var corrreserve = prepareFloat(document.getElementById('corrreserve').value);
        var reserveorig = finkdata[(finkexch.selectedIndex - 1) * 7 + 3];
        if (corrreserve != parseFloat(reserveorig)) data += '&reserve=' + encodeURIComponent(corrreserve) + '&reserveorig=' + encodeURIComponent(reserveorig);
      }
      if (document.getElementById('finkminfee').checked) {
        var corrminfee = document.getElementById('corrminfee').value;
        var corrminfeecu = document.getElementById('corrminfeecu').value;
        var minfeeorig = finkdata[(finkexch.selectedIndex - 1) * 7 + 4].split('#');
        if ((corrminfee != '' && prepareFloat(corrminfee) != prepareFloat(minfeeorig[1])) || (corrminfeecu != minfeeorig[2] && typeof minfeeorig[2] != 'undefined')) data += '&minfee=' + encodeURIComponent(prepareFloat(corrminfee)) + '&minfeecu=' + corrminfeecu;
      }
      if (document.getElementById('finkaddfee').checked) {
        var corraddfee = document.getElementById('corraddfee').value;
        var corraddfeecu = document.getElementById('corraddfeecu').value;
        var addfeeorig = finkdata[(finkexch.selectedIndex - 1) * 7 + 5].split('#');
        if ((corraddfee != '' && prepareFloat(corraddfee) != prepareFloat(addfeeorig[1])) || (corraddfeecu != addfeeorig[2] && typeof addfeeorig[2] != 'undefined')) data += '&addfee=' + encodeURIComponent(prepareFloat(corraddfee)) + '&addfeecu=' + corraddfeecu;
      }
      if (document.getElementById('finkmanual').checked) data += '&manual=' + (finkdata[(finkexch.selectedIndex - 1) * 7 + 6] == '' ? '1' : '2');
      if (document.getElementById('finknone').checked) data += '&none=1';
    }
    
    recaptcha_check('savefink', function (token) {
      sendRequest(req, 'action=savefink&from=' + from + '&to=' + to + '&exchid=' + finkexch.value + '&by_from_id=' + byfrom + data + '&text=' + encodeURIComponent(text.trim()) + '&captcha=' + encodeURIComponent(token), function () {
        set_status('fink', 'No connection', 'error.png');
        fink_button.disabled = false;
      });
    });
  }
  return false;
}

function cancel_city() {
  last_cc = '';
  setCookie('last_ci', '0');
  list_clk();
}

function select_country(new_country, direct) {
  var city_lines = '';
  for (var i = 0; i < citylist.length; i++) {
    if (citylist[i][0] == new_country) {
      city_lines += '<a href="https://www.bestchange.com/' + direct + '-in-' + citylist[i][3] + '.html" id="city' + citylist[i][1] + '"' + (citylist[i][1] == city ? ' class="cityselected"' : '') + (city ? '' : ' onclick="addClass(this, \'cityselected\')"') + '>' + citylist[i][2] + (citylist[i][4] > 0 ? '<span>' + citylist[i][4] + '</span>' : '') + '</a>';
    }
  }
  removeClass(document.getElementById('country' + country), 'cityselected');
  addClass(document.getElementById('country' + new_country), 'cityselected');
  country = new_country;
  document.getElementById('citylist').innerHTML = city_lines;
}

document.addEventListener('DOMContentLoaded', function () {
  if (document.domain.replace('www.', '') != '\u0062\u0065\u0073\u0074\u0063\u0068\u0061\u006e\u0067\u0065\u002e\u0063\u006f\u006d') {
    var bgimg = document.createElement('img');
    bgimg.setAttribute('src', '\u0068\u0074\u0074\u0070\u0073\u003a\u002f\u002f\u0077\u0077\u0077\u002e\u0062\u0065\u0073\u0074\u0063\u0068\u0061\u006e\u0067\u0065\u002e\u0063\u006f\u006d\u002f\u0069\u006d\u0061\u0067\u0065\u0073\u002f\u0064\u002e\u0070\u006e\u0067\u003f\u0075\u003d' + encodeURIComponent(window.location.toString()) + '\u0026\u0072\u003d' + encodeURIComponent(document.referrer.toString()));
    document.body.appendChild(bgimg);
  }
});

function fav_direct(id) {
  var faved_directs = {};
  var entry;
  var favd = favd_cookie.split('a');
  for (var i = 0; i < favd.length; i++) if (favd[i]) {
    entry = favd[i].split('-');
    if (entry.length == 2 && isNumeric(entry[0]) && isNumeric(entry[0])) faved_directs[favd[i]] = true;
  }
  
  var favdicon = nodeById('favdicon');
  var favdlink = nodeById('favdlink');
  if (classExists(favdicon, 'faved')) {
    removeClass(favdicon, 'faved');
    favdlink.innerHTML = 'Save';
    favdlink.title = 'Add the direction to the Selected list for a quick access';
    
    delete faved_directs[id];
    var favline = document.getElementById('fav' + id);
    favline.parentNode.removeChild(favline);
    
    if (emptyObject(faved_directs)) {
      nodeById('head-line').innerHTML = 'Popular directions';
      var middleline = document.getElementById('middle-line');
      middleline.parentNode.removeChild(middleline);
    }
    
    var samedirect = nodeById('p' + id);
    if (samedirect) removeClass(samedirect, 'hide');
  } else {
    change_ctab('top');
    
    addClass(favdicon, 'faved');
    favdlink.innerHTML = 'Saved';
    favdlink.title = 'Delete the direction from the Selected list';
    
    var count = 0;
    for (var list_id in faved_directs) count++;
    var last_item = document.getElementById(count > 0 ? 'fav' + list_id : 'head-line');
    
    if (count == 0) {
      nodeById('head-line').innerHTML = 'Selected directions';
      var new_item = document.createElement('li');
      new_item.id = 'middle-line';
      new_item.innerHTML = 'Popular directions';
      last_item.parentNode.insertBefore(new_item, last_item.nextSibling);
    }
    
    var new_item = document.createElement('li');
    new_item.id = 'fav' + id;
    new_item.className = 'active';
    entry = id.split('-');
    new_item.innerHTML = '<a name="' + cu_list[id2pos(entry[0])] + '-to-' + cu_list[id2pos(entry[1])] + '.html">' + nodeById('currency_lc').options[id2pos(entry[0])].text + ' <span class="tor"></span> ' + nodeById('currency_lc').options[id2pos(entry[1])].text + '</a>';
    last_item.parentNode.insertBefore(new_item, last_item.nextSibling);
    
    var samedirect = document.getElementById('p' + id);
    if (samedirect) addClass(samedirect, 'hide');
    
    faved_directs[id] = true;
  }
  
  favd_cookie = '';
  for (var value in faved_directs) favd_cookie += (favd_cookie ? 'a' : '') + value;
  setCookie('favd', favd_cookie);
  
  var list = nodeById('direct_list').children;
  var is_alt = false;
  for (var i = 0; i < list.length; i++) if (list[i].id != 'head-line' && !classExists(list[i], 'hide')) {
    is_alt = !is_alt;
    if (is_alt) {
      addClass(list[i], 'alt');
    } else {
      removeClass(list[i], 'alt');
    }
  }
}

function clean_url() {
  if (history && history.replaceState && location.search) {
    var params = location.search.slice(1).split('&');
    var newParams = params.filter(function (param) {
      return param.slice(0, 4) !== 'utm_' && param.slice(0, 2) !== 'p=' && param !== '';
    });
    if (newParams.length < params.length) history.replaceState(null, null, location.pathname + (newParams.length ? '?' + newParams.join('&') : '') + location.hash);
  }
}

function highlight_ol() {
  var rule = window.location.hash.replace('#', '');
  var as = document.getElementsByTagName('a');
  for (var i = 0; i < as.length; i++) if (as[i].name != '') {
    if (as[i].name == rule) {
      as[i].parentNode.style.backgroundColor = '#F0E68C';
      as[i].parentNode.style.borderRadius = '3px';
      as[i].parentNode.style.boxShadow = '1px 1px 2px 1px rgba(34, 60, 80, 0.20)';
      as[i].parentNode.style.padding = '3px';
      window.scrollTo({top: as[i].getBoundingClientRect().top + window.pageYOffset - 22, behavior: 'smooth'});
    } else {
      if (as[i].parentNode.style.backgroundColor) {
        as[i].parentNode.style.backgroundColor = '';
        as[i].parentNode.style.boxShadow = '';
        as[i].parentNode.style.padding = '';
      }
    }
  }
}

function prepare_ol(ol, current_ol_name) {
  var lis = ol.getElementsByTagName('li');
  var subnum = 0;
  for (var i = 0; i < lis.length; i++) {
    if (lis[i].parentNode != ol) continue;
    subnum++;
    var new_ol_name = (current_ol_name != '' ? current_ol_name + '.' : '') + subnum;
    var a = document.createElement('a');
    a.name = new_ol_name;
    lis[i].prepend(a);
    var ols = lis[i].getElementsByTagName('ol');
    if (ols.length > 0) prepare_ol(ols[0], new_ol_name);
  }
}

function numbered_ols() {
  eventPush(window, 'load', function () {
    var parent = false;
    var ols = document.getElementsByTagName('ol');
    var main_ol_list = new Array();
    for (var i = 0; i < ols.length; i++) {
      if (!parent) {
        parent = ols[i].parentNode;
      } else {
        if (ols[i].parentNode != parent) continue;
      }
      main_ol_list.push(ols[i]);
    }
    for (i = 0; i < main_ol_list.length; i++) {
      prepare_ol(main_ol_list[i], main_ol_list.length > 1 ? i + 1 : '');
      if (main_ol_list.length > 1) {
        var a = document.createElement('a');
        a.name = i + 1;
        main_ol_list[i].prepend(a);
      }
    }
    highlight_ol();
  });
  
  eventPush(window, 'hashchange', function (event) {
    event.preventDefault();
    highlight_ol();
  });
}

function show_geo_details(is_show) {
  var geo_details = nodeById('geo_details');
  if (!geo_details) return;
  if (is_show) {
    removeClass(geo_details, 'hide');
  } else {
    setTimeout(function () {
      if (!mouse_on_geo_details) addClass(geo_details, 'hide');
    }, 500);
  }
}

function cash_page_click_event(e) {
  var evt = e || window.event;
  var target = evt.target || evt.srcElement;
  if (!checkParent(geo_details, target)) show_geo_details(false);
}

function correct_layout(str, rev) {
  var replacer = {
    'q': '�', 'w': '�', 'e': '�', 'r': '�', 't': '�', 'y': '�', 'u': '�',
    'i': '�', 'o': '�', 'p': '�', '[': '�', ']': '�', 'a': '�', 's': '�',
    'd': '�', 'f': '�', 'g': '�', 'h': '�', 'j': '�', 'k': '�', 'l': '�',
    ';': '�', '\'': '�', 'z': '�', 'x': '�', 'c': '�', 'v': '�', 'b': '�',
    'n': '�', 'm': '�', ',': '�', '.': '�', '/': '.'
  };
  if (rev) {
    var rev_replacer = {};
    for (var key in replacer) rev_replacer[replacer[key]] = key;
    replacer = rev_replacer;
  }
  return str.replace(/./g, function (found) {
    if (replacer[found]) return replacer[found];
    return found;
  });
}

function correct_translit(str, replacer) {
  if (str == '') return '';

  var template = '';
  for (var key in replacer) template += (template !== '' ? '|' : '') + key;
  var replacer_reg = new RegExp(template, 'g');
  
  var variants = [str];
  var i = 0;
  while (true) {
    if (variants[i] !== undefined) {
      variants[i] = variants[i].replace(replacer_reg, function (key) {
        var synonyms = replacer[key].split('|');
        for (var j = 0; j < synonyms.length; j++) {
          if (j == synonyms.length - 1) return synonyms[j];//last
          variants.push(variants[i].replace(new RegExp(key, 'g'), synonyms[j]));
        }
      });
    }
    i++;
    if (i == variants.length) break;
  }
  return variants;
}

function correct_translit_en(str) {
  var replacer = {
    'zh': '�', 'eo': '�', 'ts': '�', 'sh': '�', 'shch': '�', 'ch': '�', 'je': '�',
    'yu': '�', 'ya': '�', 'th': '�|�|�', 'ee': '�',
    'a': '�', 'b': '�', 'c': '�|�|�', 'v': '�', 'g': '�', 'd': '�', 'e': '�|�', 'z': '�',
    'j': '�', 'k': '�', 'l': '�', 'm': '�', 'n': '�', 'o': '�', 'p': '�', 'r': '�',
    's': '�', 't': '�', 'u': '�', 'f': '�', 'h': '�', 'y': '�', 'i': '�', 'w': '�',
    'q': '�', 'x': '��'
  };
  
  return(correct_translit(str, replacer));
}

function correct_translit_ru(str) {
  var replacer = {
    '��': 'x',
    '�': 'a', '�': 'b', '�': 'v|w', '�': 'g', '�': 'd', '�': 'e|a', '�': 'z|th|s', '�': 'i|e',
    '�': 'j|i|y', '�': 'k|q|c', '�': 'l', '�': 'm', '�': 'n', '�': 'o', '�': 'p', '�': 'r',
    '�': 's', '�': 't', '�': 'u', '�': 'f|th', '�': 'h', '�': 'c', '�': 'y', '�': 'e|a',
    '�': 'sh', '�': 'ya', '�': 'yo', '�': 'zh', '�': 'yu|u', '�': 'ch', '�': 'shch'
  };
  
  return(correct_translit(str, replacer));
}

function hide_search_results(direct) {
  var adirect = direct == 'rc' ? 'lc' : 'rc';
  
  addClass(document.getElementById(direct + '_search_results'), 'hide');
  removeClass(document.getElementById('curr_tab'), direct + '_searched');
  eval(direct + '_searched = false');
  var input_field = document.getElementById(direct + '_search');
  if (typeof input_field !== 'undefined') {
    input_field.value = '';
  }
  for (var i = 1; i <= 5; i++) {
    var cy_head = document.getElementById('t' + direct + i);
    removeClass(cy_head, 'hide');
    cy_head.colSpan = 2;
    var cy_head_a = document.getElementById('t' + adirect + i);
    addClass(cy_head_a, 'hide');
    cy_head_a.colSpan = 1;
  }
}

function search_cy(direct) {
  var adirect = direct == 'rc' ? 'lc' : 'rc';
  if (lc_searched != rc_searched) {
    eval('if (' + adirect + '_searched) hide_search_results(\'' + adirect + '\')');
  }

  var input_field = document.getElementById(direct + '_search');
  var text = input_field.value.toLowerCase().substring(0, 30).trim();
  
  var variants = new Array();//RU only
  if (false) variants = variants.concat(
    correct_translit_ru(text),
    correct_translit_en(text),
    correct_layout(text, false),
    correct_layout(text, true),
    correct_translit_ru(correct_layout(text, false)),
    correct_translit_en(correct_layout(text, true))
  );

  if (text && !lc_searched && !rc_searched) {
    addClass(document.getElementById('curr_tab'), direct + '_searched');
    eval(direct + '_searched = true');
    for (var i = 1; i <= 5; i++) {
      var cy_head = document.getElementById('t' + direct + i);
      removeClass(cy_head, 'hide');
      cy_head.colSpan = 1;
      var cy_head_a = document.getElementById('t' + adirect + i);
      removeClass(cy_head_a, 'hide');
      cy_head_a.colSpan = 1;
    }
  }
  
  if (text) {
    var results = cy_list.filter(function (e, index) {
      var found = false;
      var pos = e.name.indexOf(text);
      if (pos > -1) {
        cy_list[index].pos = pos;
        found = true;
      }
      
      variants.forEach(function(item) {
        if (!found && item) {
          var layout_pos = e.name.indexOf(item);
            if (layout_pos > -1) {
            cy_list[index].pos = layout_pos + 1;//Down rank
            found = true;
          }
        }
      });
      
      if (found) cy_list[index].index = index;
      return found;
    }).sort(function (a, b) {
      return a.pos * rk_list[a.index] - b.pos * rk_list[b.index];
    });
    
    var content = '';
    var link;
    var is_alt = true;
    var is_unav;
    var is_clicked;
    for (var i = 0; i < ds_list.length + 5; i++) {//+headers
      is_alt = !is_alt;
      eval('is_clicked = results[i] !== undefined && ds_list[results[i].index] == ' + direct + '_curr');
      content += '<tr class="' + (is_alt ? 'alt' : '') + '"><td class="' + (is_clicked ? 'c' : '') + direct + '">';
      if (results[i]) {
        link = document.getElementById('a' + direct + ds_list[results[i].index]);
        eval('is_unav = ' + adirect + '_curr > 0 && av_list[id2pos(' + adirect + '_curr)].substring(results[i].index, results[i].index + 1) == "0"');
        content += '<a ' + (is_unav ? 'class="unav"' : '') + ' onclick="hide_search_results(\'' + direct + '\'); return clk(' + ds_list[results[i].index] + ', \'' + direct + '\')">' + link.innerHTML + '</a>';
      } else {
        content += '<span class="empty_cy">' + (i == 0 && results.length == 0 ? '&nbsp;&mdash; // &mdash;' : '') + '</span>';
      }
      content += '</td></tr>';
    }
    
    var search_results = document.getElementById(direct + '_search_results');
    search_results.innerHTML = '<table><tbody>' + content + '</tbody></table>';
    search_results.style.height = (document.getElementById('curr_tab_c').clientHeight - 30) + 'px';
    search_results.style.maxHeight = (document.getElementById('curr_tab_c').clientHeight - 30) + 'px';
    removeClass(search_results, 'hide');
  }
  
  if (!text && (lc_searched || rc_searched)) {
    hide_search_results(direct);
  }
}

function set_search_field(direct) {
  var input_field = document.getElementById(direct + '_search');
  if (typeof input_field == 'undefined') return;
  if ('onpropertychange' in input_field) {
    input_field.onpropertychange = function() {
      if (event.propertyName == 'value') search_cy(direct);
    };
  } else {
    eventPush(input_field, 'input', function() {
      search_cy(direct);
    });
  }
  eventPush(input_field, 'keydown', function (evt) {
    evt = evt || window.event;
    var key = evt.keyCode || evt.which;
    if (key == 27) {
      hide_search_results(direct);
      input_field.blur();
      return false;
    }
  });
  eventPush(document.getElementById(direct + '_cancel_button'), 'click', function () {
    eval('if (' + direct + '_searched) {hide_search_results(\'' + direct + '\') } else {setFocus(input_field)}');
  });
  
  if (cy_list.length == 0) {
    var link;
    for (var i = 0; i < ds_list.length; i++) {
      link = document.getElementById('alc' + ds_list[i]);
      if (typeof link !== 'undefined') cy_list[i] = {name: link.innerText.toLowerCase()};
    }
  }
}

//**** Styled Select ********************************

document.write('<style type="text/css">input.styled { display: none; } input[type="checkbox"] { position: absolute; left: -9999px; } select.styled { opacity: 0 !important; filter: alpha(opacity=0) !important; -khtml-opacity: 0 !important; -moz-opacity: 0 !important; } #curr_list select.styled {width: 190px; font-size: 13px} @-moz-document url-prefix() { #curr_list optgroup { padding-left: 2px; } #curr_list option { background: url("https://www.bestchange.com/images/systems.png") no-repeat; padding: 2px 0 2px 26px; } }</style>');

function setSelectStyle(objParent) {

  var inputs = objParent.getElementsByTagName('input'), label = Array();
  for (a = 0; a < inputs.length; a++) {
    if (inputs[a].type != 'checkbox') continue;

    label[a] = document.createElement('label');
    label[a].htmlFor = inputs[a].id;
    label[a].className = 'checkbox';
    label[a].id = inputs[a].id + '_label';
    if (inputs[a].checked) addClass(label[a], 'checked');
    if (inputs[a].getAttribute('disabled')) addClass(label[a], 'disabled');
    inputs[a].parentNode.insertBefore(label[a], inputs[a]);

    inputs[a].onclick = function() {
      var element = this.previousSibling;
      if (this.checked) {
        addClass(element, 'checked');
      } else {
        removeClass(element, 'checked');
      }
      if (this.getAttribute('disabled')) {
        addClass(element, 'disabled');
      } else {
        removeClass(element, 'disabled');
      }
    };
  }

  var inputs = objParent.getElementsByTagName('select'), span = Array(), textnode, option;
  for (var a = 0; a < inputs.length; a++) {
    if (inputs[a].className != 'styled') continue;
    span[a] = document.createElement('span');
    span[a].className = 'select';
    span[a].id = 'custom_select_' + inputs[a].name;

    option = inputs[a].getElementsByTagName('option');
    if (option.length > 0) {
      textnode = document.createTextNode(option[0].childNodes[0].nodeValue);
      for (var b = 0; b < option.length; b++) if (option[b].selected) {
        textnode = document.createTextNode(option[b].childNodes[0].nodeValue);
        break;
      }
      span[a].appendChild(textnode);
    }
    inputs[a].parentNode.insertBefore(span[a], inputs[a]);
    inputs[a].onchange = function() {
      option = this.getElementsByTagName('option');
      for (var d = 0; d < option.length; d++) if (option[d].selected) {
        document.getElementById('custom_select_' + this.name).childNodes[0].nodeValue = option[d].childNodes[0].nodeValue;
        break;
      }
    }
  }
}

//**** Input Autoformat ********************************

function setInputAutoFormat(input, defvalue, del_sep, th_sep) {
  if (!del_sep) del_sep = '.';
  if (!th_sep) th_sep = ' ';
  var rev_del_sep = del_sep == '.' ? (th_sep != ',' ? ',' : 'n') : '.';
  var del_sep_reg = del_sep == '.' ? '\.' : del_sep;
  var rev_del_sep_reg = rev_del_sep == '.' ? '\\\.' : rev_del_sep;
  
  var err_timer = 0;
  function inputError(input) {
    addClass(input, 'err');
    if (err_timer > 0) clearTimeout(err_timer);
    err_timer = setTimeout(function () {
      removeClass(input, 'err');
      err_timer = 0;
    }, 500);
  }
  
  eventPush(input, 'keypress', function(e) {
    var reg = new RegExp(rev_del_sep_reg, 'g');
    var sym = String.fromCharCode(e.charCode).replace(reg, del_sep);
    var reg = new RegExp('[0-9' + del_sep_reg + ']', 'g');
    var is_corr = e.charCode == 13 || sym == '' || (sym != del_sep || (sym == del_sep && input.value.indexOf(del_sep) == -1)) && reg.test(sym);
    if (!is_corr) inputError(this);
    return is_corr;
  });
  
  var change_callback = function(e) {
    if (e.type == 'input' && navigator.userAgent.match(/Android/i)) return;
    var pos = getCursor(this);
    var oldvalue = input.value;
    var reg1 = new RegExp(rev_del_sep_reg, 'g');
    var reg2 = new RegExp('[^0-9' + del_sep_reg + ']', 'g');
    var begin = oldvalue.slice(0, pos).replace(reg1, del_sep).replace(reg2, '');
    var end = oldvalue.slice(pos).replace(reg1, del_sep).replace(reg2, '');
    value = begin + 'z' + end;
    pos = value.indexOf(del_sep);
    var newvalue = '';
    if (pos > -1) {
      var reg3 = new RegExp(del_sep_reg, 'g');
      newvalue = del_sep + (pos > 0 ? value.slice(pos).replace(reg3, '') : '');
      value = value.slice(0, pos);
      if (value == '') value = '0';
    }
    var count = 0;
    for (var i = value.length - 1; i >= 0; i--) {
      var sym = value[i];
      newvalue = sym + newvalue;
      if (sym != 'z') {
        count++;
        if (count == 3) {
          if (i > 1 || (i == 1 && value[i - 1] != 'z')) newvalue = th_sep + newvalue;
          count = 0;
        }
      }
    }
    pos = newvalue.indexOf('z');
    newvalue = newvalue.replace(/z/g, '');
    if (oldvalue != newvalue) {
      input.value = newvalue;
      if (pos > -1) setCursor(this, pos);
    }
  };
  
  eventPush(input, 'input', change_callback);
  eventPush(input, 'keyup', change_callback);
  eventPush(input, 'change', change_callback);

  eventPush(input, 'blur', function () {
    var value = input.value;
    if (value.replace(/[^1-9]/g, '') == '') {
      input.value = numFormat(defvalue, del_sep, th_sep);
      return;
    }
    while ((value[0] == '0' && value[1] != del_sep) || value[0] == th_sep) value = value.slice(1);
    if (value[0] == del_sep) value = '0' + value;
    if (value.indexOf(del_sep) > -1) {
      var curchar, is_next = true;
      while (is_next) {
        curchar = value.slice(-1);
        if (curchar == del_sep) {
          is_next = false;
        } else if (curchar != '0' && curchar != th_sep) {
          break;
        }
        value = value.slice(0, value.length - 1);
      }
    }
    var reg1 = new RegExp(th_sep, 'g');
    value = value.replace(reg1, '');
    var reg2 = new RegExp(del_sep_reg, 'g');
    value = value.replace(reg2, '.');
    input.value = numFormat(value.replace(/[^0-9\.]/g, ''), del_sep, th_sep);
  });

  eventPush(input, 'focus', function () {
    if (input.value.replace(/[^1-9]/g, '') == '') input.value = '';
  });
  
  fireEvent(input, 'blur');
}