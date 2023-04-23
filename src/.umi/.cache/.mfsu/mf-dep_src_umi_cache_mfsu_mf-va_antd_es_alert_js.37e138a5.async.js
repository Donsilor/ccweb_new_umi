(self["webpackChunk"] = self["webpackChunk"] || []).push([["mf-dep_src_umi_cache_mfsu_mf-va_antd_es_alert_js"],{

/***/ "./node_modules/antd/es/_util/getDataOrAriaProps.js":
/*!**********************************************************!*\
  !*** ./node_modules/antd/es/_util/getDataOrAriaProps.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getDataOrAriaProps; }
/* harmony export */ });
function getDataOrAriaProps(props) {
  return Object.keys(props).reduce(function (prev, key) {
    if ((key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-' || key === 'role') && key.substr(0, 7) !== 'data-__') {
      prev[key] = props[key];
    }

    return prev;
  }, {});
}

/***/ }),

/***/ "./node_modules/antd/es/_util/reactNode.js":
/*!*************************************************!*\
  !*** ./node_modules/antd/es/_util/reactNode.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isValidElement": function() { return /* binding */ isValidElement; },
/* harmony export */   "replaceElement": function() { return /* binding */ replaceElement; },
/* harmony export */   "cloneElement": function() { return /* binding */ cloneElement; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var isValidElement = react__WEBPACK_IMPORTED_MODULE_0__.isValidElement;

function replaceElement(element, replacement, props) {
  if (!isValidElement(element)) return replacement;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(element, typeof props === 'function' ? props(element.props || {}) : props);
}
function cloneElement(element, props) {
  return replaceElement(element, element, props);
}

/***/ }),

/***/ "./node_modules/antd/es/alert/ErrorBoundary.js":
/*!*****************************************************!*\
  !*** ./node_modules/antd/es/alert/ErrorBoundary.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ErrorBoundary; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createSuper */ "./node_modules/@babel/runtime/helpers/esm/createSuper.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! . */ "./node_modules/antd/es/alert/index.js");







var ErrorBoundary = /*#__PURE__*/function (_React$Component) {
  (0,_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__.default)(ErrorBoundary, _React$Component);

  var _super = (0,_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_3__.default)(ErrorBoundary);

  function ErrorBoundary() {
    var _this;

    (0,_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__.default)(this, ErrorBoundary);

    _this = _super.apply(this, arguments);
    _this.state = {
      error: undefined,
      info: {
        componentStack: ''
      }
    };
    return _this;
  }

  (0,_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__.default)(ErrorBoundary, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error, info) {
      this.setState({
        error: error,
        info: info
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          message = _this$props.message,
          description = _this$props.description,
          children = _this$props.children;
      var _this$state = this.state,
          error = _this$state.error,
          info = _this$state.info;
      var componentStack = info && info.componentStack ? info.componentStack : null;
      var errorMessage = typeof message === 'undefined' ? (error || '').toString() : message;
      var errorDescription = typeof description === 'undefined' ? componentStack : description;

      if (error) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4__.createElement(___WEBPACK_IMPORTED_MODULE_5__.default, {
          type: "error",
          message: errorMessage,
          description: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4__.createElement("pre", null, errorDescription)
        });
      }

      return children;
    }
  }]);

  return ErrorBoundary;
}(react__WEBPACK_IMPORTED_MODULE_4__.Component);



/***/ }),

/***/ "./node_modules/antd/es/alert/index.js":
/*!*********************************************!*\
  !*** ./node_modules/antd/es/alert/index.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _ant_design_icons_es_icons_CloseOutlined__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ant-design/icons/es/icons/CloseOutlined */ "./node_modules/@ant-design/icons/es/icons/CloseOutlined.js");
/* harmony import */ var _ant_design_icons_es_icons_CheckCircleOutlined__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ant-design/icons/es/icons/CheckCircleOutlined */ "./node_modules/@ant-design/icons/es/icons/CheckCircleOutlined.js");
/* harmony import */ var _ant_design_icons_es_icons_ExclamationCircleOutlined__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ant-design/icons/es/icons/ExclamationCircleOutlined */ "./node_modules/@ant-design/icons/es/icons/ExclamationCircleOutlined.js");
/* harmony import */ var _ant_design_icons_es_icons_InfoCircleOutlined__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ant-design/icons/es/icons/InfoCircleOutlined */ "./node_modules/@ant-design/icons/es/icons/InfoCircleOutlined.js");
/* harmony import */ var _ant_design_icons_es_icons_CloseCircleOutlined__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ant-design/icons/es/icons/CloseCircleOutlined */ "./node_modules/@ant-design/icons/es/icons/CloseCircleOutlined.js");
/* harmony import */ var _ant_design_icons_es_icons_CheckCircleFilled__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ant-design/icons/es/icons/CheckCircleFilled */ "./node_modules/@ant-design/icons/es/icons/CheckCircleFilled.js");
/* harmony import */ var _ant_design_icons_es_icons_ExclamationCircleFilled__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ant-design/icons/es/icons/ExclamationCircleFilled */ "./node_modules/@ant-design/icons/es/icons/ExclamationCircleFilled.js");
/* harmony import */ var _ant_design_icons_es_icons_InfoCircleFilled__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ant-design/icons/es/icons/InfoCircleFilled */ "./node_modules/@ant-design/icons/es/icons/InfoCircleFilled.js");
/* harmony import */ var _ant_design_icons_es_icons_CloseCircleFilled__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ant-design/icons/es/icons/CloseCircleFilled */ "./node_modules/@ant-design/icons/es/icons/CloseCircleFilled.js");
/* harmony import */ var rc_motion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rc-motion */ "./node_modules/rc-motion/es/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _config_provider__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../config-provider */ "./node_modules/antd/es/config-provider/context.js");
/* harmony import */ var _util_getDataOrAriaProps__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../_util/getDataOrAriaProps */ "./node_modules/antd/es/_util/getDataOrAriaProps.js");
/* harmony import */ var _ErrorBoundary__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./ErrorBoundary */ "./node_modules/antd/es/alert/ErrorBoundary.js");
/* harmony import */ var _util_reactNode__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../_util/reactNode */ "./node_modules/antd/es/_util/reactNode.js");




var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

















var iconMapFilled = {
  success: _ant_design_icons_es_icons_CheckCircleFilled__WEBPACK_IMPORTED_MODULE_6__.default,
  info: _ant_design_icons_es_icons_InfoCircleFilled__WEBPACK_IMPORTED_MODULE_7__.default,
  error: _ant_design_icons_es_icons_CloseCircleFilled__WEBPACK_IMPORTED_MODULE_8__.default,
  warning: _ant_design_icons_es_icons_ExclamationCircleFilled__WEBPACK_IMPORTED_MODULE_9__.default
};
var iconMapOutlined = {
  success: _ant_design_icons_es_icons_CheckCircleOutlined__WEBPACK_IMPORTED_MODULE_10__.default,
  info: _ant_design_icons_es_icons_InfoCircleOutlined__WEBPACK_IMPORTED_MODULE_11__.default,
  error: _ant_design_icons_es_icons_CloseCircleOutlined__WEBPACK_IMPORTED_MODULE_12__.default,
  warning: _ant_design_icons_es_icons_ExclamationCircleOutlined__WEBPACK_IMPORTED_MODULE_13__.default
};

var Alert = function Alert(_a) {
  var _classNames2;

  var description = _a.description,
      customizePrefixCls = _a.prefixCls,
      message = _a.message,
      banner = _a.banner,
      _a$className = _a.className,
      className = _a$className === void 0 ? '' : _a$className,
      style = _a.style,
      onMouseEnter = _a.onMouseEnter,
      onMouseLeave = _a.onMouseLeave,
      onClick = _a.onClick,
      afterClose = _a.afterClose,
      showIcon = _a.showIcon,
      closable = _a.closable,
      closeText = _a.closeText,
      _a$closeIcon = _a.closeIcon,
      closeIcon = _a$closeIcon === void 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_ant_design_icons_es_icons_CloseOutlined__WEBPACK_IMPORTED_MODULE_14__.default, null) : _a$closeIcon,
      action = _a.action,
      props = __rest(_a, ["description", "prefixCls", "message", "banner", "className", "style", "onMouseEnter", "onMouseLeave", "onClick", "afterClose", "showIcon", "closable", "closeText", "closeIcon", "action"]);

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_3__.useState(false),
      _React$useState2 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__.default)(_React$useState, 2),
      closed = _React$useState2[0],
      setClosed = _React$useState2[1];

  var ref = react__WEBPACK_IMPORTED_MODULE_3__.useRef();

  var _React$useContext = react__WEBPACK_IMPORTED_MODULE_3__.useContext(_config_provider__WEBPACK_IMPORTED_MODULE_15__.ConfigContext),
      getPrefixCls = _React$useContext.getPrefixCls,
      direction = _React$useContext.direction;

  var prefixCls = getPrefixCls('alert', customizePrefixCls);

  var handleClose = function handleClose(e) {
    var _a;

    setClosed(true);
    (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props, e);
  };

  var getType = function getType() {
    var type = props.type;

    if (type !== undefined) {
      return type;
    } // banner 模式默认为警告


    return banner ? 'warning' : 'info';
  }; // closeable when closeText is assigned


  var isClosable = closeText ? true : closable;
  var type = getType();

  var renderIconNode = function renderIconNode() {
    var icon = props.icon; // use outline icon in alert with description

    var iconType = (description ? iconMapOutlined : iconMapFilled)[type] || null;

    if (icon) {
      return (0,_util_reactNode__WEBPACK_IMPORTED_MODULE_16__.replaceElement)(icon, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement("span", {
        className: "".concat(prefixCls, "-icon")
      }, icon), function () {
        return {
          className: classnames__WEBPACK_IMPORTED_MODULE_5___default()("".concat(prefixCls, "-icon"), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__.default)({}, icon.props.className, icon.props.className))
        };
      });
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(iconType, {
      className: "".concat(prefixCls, "-icon")
    });
  };

  var renderCloseIcon = function renderCloseIcon() {
    return isClosable ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement("button", {
      type: "button",
      onClick: handleClose,
      className: "".concat(prefixCls, "-close-icon"),
      tabIndex: 0
    }, closeText ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement("span", {
      className: "".concat(prefixCls, "-close-text")
    }, closeText) : closeIcon) : null;
  }; // banner 模式默认有 Icon


  var isShowIcon = banner && showIcon === undefined ? true : showIcon;
  var alertCls = classnames__WEBPACK_IMPORTED_MODULE_5___default()(prefixCls, "".concat(prefixCls, "-").concat(type), (_classNames2 = {}, (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__.default)(_classNames2, "".concat(prefixCls, "-with-description"), !!description), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__.default)(_classNames2, "".concat(prefixCls, "-no-icon"), !isShowIcon), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__.default)(_classNames2, "".concat(prefixCls, "-banner"), !!banner), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__.default)(_classNames2, "".concat(prefixCls, "-rtl"), direction === 'rtl'), _classNames2), className);
  var dataOrAriaProps = (0,_util_getDataOrAriaProps__WEBPACK_IMPORTED_MODULE_17__.default)(props);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(rc_motion__WEBPACK_IMPORTED_MODULE_4__.default, {
    visible: !closed,
    motionName: "".concat(prefixCls, "-motion"),
    motionAppear: false,
    motionEnter: false,
    onLeaveStart: function onLeaveStart(node) {
      return {
        maxHeight: node.offsetHeight
      };
    },
    onLeaveEnd: afterClose
  }, function (_ref) {
    var motionClassName = _ref.className,
        motionStyle = _ref.style;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__.default)({
      ref: ref,
      "data-show": !closed,
      className: classnames__WEBPACK_IMPORTED_MODULE_5___default()(alertCls, motionClassName),
      style: (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__.default)((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__.default)({}, style), motionStyle),
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave,
      onClick: onClick,
      role: "alert"
    }, dataOrAriaProps), isShowIcon ? renderIconNode() : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", {
      className: "".concat(prefixCls, "-content")
    }, message ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", {
      className: "".concat(prefixCls, "-message")
    }, message) : null, description ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", {
      className: "".concat(prefixCls, "-description")
    }, description) : null), action ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", {
      className: "".concat(prefixCls, "-action")
    }, action) : null, renderCloseIcon());
  });
};

Alert.ErrorBoundary = _ErrorBoundary__WEBPACK_IMPORTED_MODULE_18__.default;
/* harmony default export */ __webpack_exports__["default"] = (Alert);

/***/ }),

/***/ "./src/.umi/.cache/.mfsu/mf-va_antd_es_alert.js":
/*!******************************************************!*\
  !*** ./src/.umi/.cache/.mfsu/mf-va_antd_es_alert.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Users_yeqixu_Desktop_ccweb_new_umi_node_modules_antd_es_alert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/antd/es/alert */ "./node_modules/antd/es/alert/index.js");

/* harmony default export */ __webpack_exports__["default"] = (_Users_yeqixu_Desktop_ccweb_new_umi_node_modules_antd_es_alert__WEBPACK_IMPORTED_MODULE_0__.default);


/***/ })

}]);