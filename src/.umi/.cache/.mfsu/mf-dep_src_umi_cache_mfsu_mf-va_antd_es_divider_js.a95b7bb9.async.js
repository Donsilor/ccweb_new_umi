(self["webpackChunk"] = self["webpackChunk"] || []).push([["mf-dep_src_umi_cache_mfsu_mf-va_antd_es_divider_js"],{

/***/ "./node_modules/antd/es/divider/index.js":
/*!***********************************************!*\
  !*** ./node_modules/antd/es/divider/index.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _config_provider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../config-provider */ "./node_modules/antd/es/config-provider/context.js");



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





var Divider = function Divider(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_config_provider__WEBPACK_IMPORTED_MODULE_4__.ConfigConsumer, null, function (_ref) {
    var _classNames;

    var getPrefixCls = _ref.getPrefixCls,
        direction = _ref.direction;

    var customizePrefixCls = props.prefixCls,
        _props$type = props.type,
        type = _props$type === void 0 ? 'horizontal' : _props$type,
        _props$orientation = props.orientation,
        orientation = _props$orientation === void 0 ? 'center' : _props$orientation,
        orientationMargin = props.orientationMargin,
        className = props.className,
        children = props.children,
        dashed = props.dashed,
        plain = props.plain,
        restProps = __rest(props, ["prefixCls", "type", "orientation", "orientationMargin", "className", "children", "dashed", "plain"]);

    var prefixCls = getPrefixCls('divider', customizePrefixCls);
    var orientationPrefix = orientation.length > 0 ? "-".concat(orientation) : orientation;
    var hasChildren = !!children;
    var hasCustomMarginLeft = orientation === 'left' && orientationMargin != null;
    var hasCustomMarginRight = orientation === 'right' && orientationMargin != null;
    var classString = classnames__WEBPACK_IMPORTED_MODULE_3___default()(prefixCls, "".concat(prefixCls, "-").concat(type), (_classNames = {}, (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__.default)(_classNames, "".concat(prefixCls, "-with-text"), hasChildren), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__.default)(_classNames, "".concat(prefixCls, "-with-text").concat(orientationPrefix), hasChildren), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__.default)(_classNames, "".concat(prefixCls, "-dashed"), !!dashed), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__.default)(_classNames, "".concat(prefixCls, "-plain"), !!plain), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__.default)(_classNames, "".concat(prefixCls, "-rtl"), direction === 'rtl'), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__.default)(_classNames, "".concat(prefixCls, "-no-default-orientation-margin-left"), hasCustomMarginLeft), (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__.default)(_classNames, "".concat(prefixCls, "-no-default-orientation-margin-right"), hasCustomMarginRight), _classNames), className);

    var innerStyle = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__.default)((0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__.default)({}, hasCustomMarginLeft && {
      marginLeft: orientationMargin
    }), hasCustomMarginRight && {
      marginRight: orientationMargin
    });

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__.default)({
      className: classString
    }, restProps, {
      role: "separator"
    }), children && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("span", {
      className: "".concat(prefixCls, "-inner-text"),
      style: innerStyle
    }, children));
  });
};

/* harmony default export */ __webpack_exports__["default"] = (Divider);

/***/ }),

/***/ "./src/.umi/.cache/.mfsu/mf-va_antd_es_divider.js":
/*!********************************************************!*\
  !*** ./src/.umi/.cache/.mfsu/mf-va_antd_es_divider.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Users_yeqixu_Desktop_ccweb_new_umi_node_modules_antd_es_divider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/antd/es/divider */ "./node_modules/antd/es/divider/index.js");

/* harmony default export */ __webpack_exports__["default"] = (_Users_yeqixu_Desktop_ccweb_new_umi_node_modules_antd_es_divider__WEBPACK_IMPORTED_MODULE_0__.default);


/***/ })

}]);