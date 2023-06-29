webpackHotUpdatedash_seqaln("main",{

/***/ "./src/lib/components/DashSeqaln.react.js":
/*!************************************************!*\
  !*** ./src/lib/components/DashSeqaln.react.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DashSeqaln; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_sortablejs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-sortablejs */ "./node_modules/react-sortablejs/dist/index.js");
/* harmony import */ var react_sortablejs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_sortablejs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _msa_color_schemes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../msa_color_schemes.js */ "./src/lib/msa_color_schemes.js");
/* harmony import */ var _DashSeqaln_react_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DashSeqaln.react.css */ "./src/lib/components/DashSeqaln.react.css");
/* harmony import */ var _DashSeqaln_react_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_DashSeqaln_react_css__WEBPACK_IMPORTED_MODULE_4__);
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






// NOTE: series values must be scaled between 0 and 1

/**
 * ExampleComponent is an example component.
 */
function DashSeqaln(props) {
  // Seqaln properties
  var id = props.id,
    title = props.title,
    alignment = props.alignment,
    series = props.series,
    included = props.included,
    excluded = props.excluded,
    color_scheme = props.color_scheme,
    setProps = props.setProps;
  // Customisation options
  var _props$allow_sequence = props.allow_sequence_selection,
    allow_sequence_selection = _props$allow_sequence === void 0 ? true : _props$allow_sequence,
    _props$show_letters = props.show_letters,
    show_letters = _props$show_letters === void 0 ? true : _props$show_letters,
    _props$show_seqnum = props.show_seqnum,
    show_seqnum = _props$show_seqnum === void 0 ? false : _props$show_seqnum,
    _props$zoom = props.zoom,
    zoom = _props$zoom === void 0 ? 10 : _props$zoom;
  var alnLength = alignment ? alignment[Object.keys(alignment)[0]].length : 0;
  // Ref & state to save the width of the first column (needed to position the second column relatively)
  var labelRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])();
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0),
    _useState2 = _slicedToArray(_useState, 2),
    labelWidth = _useState2[0],
    setLabelWidth = _useState2[1];
  // Ref & state to save the width of the scrollable area
  var scrollViewportRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])();
  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(0),
    _useState4 = _slicedToArray(_useState3, 2),
    scrollViewportWidth = _useState4[0],
    setScrollViewportWidth = _useState4[1];
  // Highlighting
  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(),
    _useState6 = _slicedToArray(_useState5, 2),
    highlightedRow = _useState6[0],
    setHighlightedRow = _useState6[1];
  var _useState7 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(),
    _useState8 = _slicedToArray(_useState7, 2),
    highlightedCol = _useState8[0],
    setHighlightedCol = _useState8[1];
  // Rendering params
  var _useState9 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([0, 0]),
    _useState10 = _slicedToArray(_useState9, 2),
    renderBounds = _useState10[0],
    setRenderBounds = _useState10[1];
  var _useState11 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
    _useState12 = _slicedToArray(_useState11, 2),
    ticking = _useState12[0],
    setTicking = _useState12[1];
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    var lw = labelRef.current.getBoundingClientRect().width;
    var svw = scrollViewportRef.current.getBoundingClientRect().width;
    setLabelWidth(lw);
    setScrollViewportWidth(svw);
    setRenderBounds(getRenderBounds({
      scrollLeft: 0,
      scrollWidth: svw,
      alnLength: alnLength,
      zoom: zoom
    }));
  }, [labelRef, scrollViewportRef, alnLength, alignment, series, zoom]);
  var setIncluded = function setIncluded(items) {
    setProps({
      included: items.map(function (x) {
        return x.name;
      })
    });
  };
  var setExcluded = function setExcluded(items) {
    setProps({
      excluded: items.map(function (x) {
        return x.name;
      })
    });
  };
  var setHighlighted = function setHighlighted(row, col) {
    setHighlightedRow(row);
    setHighlightedCol(col);
  };
  var handleScroll = function handleScroll() {
    if (!ticking) {
      setTicking(true);
      window.requestAnimationFrame(function () {
        setRenderBounds(getRenderBounds({
          scrollLeft: scrollViewportRef.current.scrollLeft,
          scrollWidth: scrollViewportWidth,
          alnLength: alnLength,
          zoom: zoom
        }));
        setTicking(false);
      });
    }
  };
  // Transformed values that don't need to be recomputed every time
  var alignment_cumsum = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    return get_alignment_cumsum(alignment);
  }, [alignment]);
  var alignment_colors = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    return make_color_scheme(alignment, color_scheme);
  }, [alignment, color_scheme]);
  var aln_breaks = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    return get_alignment_breaks(alnLength, 10);
  }, [alignment]);
  // Array of fixed size; will contain all the visible values for the alignment breaks
  var breaksWindow = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    return new Array(getWindowSize({
      scrollWidth: scrollViewportWidth,
      zoom: zoom,
      padding: 2
    }));
  }, [zoom, alignment, series, scrollViewportWidth]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: id,
    className: "DashSeqaln"
  }, title && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
    className: "title"
  }, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    ref: scrollViewportRef,
    style: {
      "overflowX": "auto"
    },
    onScroll: function onScroll() {
      return handleScroll();
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", null, series && series.map(function (seriesItem) {
    return VirtualHead(seriesItem.label, seriesItem.breaks, seriesItem.height, rescale_series(seriesItem.values, seriesItem.breaks), seriesItem.color, labelWidth, renderBounds);
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", {
    className: "aln"
  }, VirtualBreaks(labelRef, aln_breaks, zoom, labelWidth, renderBounds, breaksWindow), included && included.map(function (seqId, seqIndex) {
    return VirtualAlignment(seqId, seqIndex, alignment[seqId].split(""), alignment_colors[seqId], alignment_cumsum[seqId], highlightedRow, highlightedCol, show_seqnum, show_letters, zoom, labelWidth, renderBounds);
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Seqselection, {
    id: id,
    included: included,
    excluded: excluded,
    setIncluded: setIncluded,
    setExcluded: setExcluded,
    enabled: allow_sequence_selection
  }));
}
function VirtualHead(label, breaks, height, values, color, labelWidth, renderBounds) {
  var colSpanPre = renderBounds[0];
  var colSpanPost = values.length - renderBounds[1];
  var childrenCols = new Array(renderBounds[1] - renderBounds[0]);
  for (var i = renderBounds[0]; i < renderBounds[1]; ++i) {
    childrenCols[i - renderBounds[0]] = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      key: "series-" + i,
      className: "series-values",
      style: {
        "height": height || "100px"
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        "backgroundColor": color || "black",
        "height": 100 * values[i] + "%",
        "position": "relative"
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "series-values-tooltip"
    }, i + 1 + ":" + values[i])));
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", {
    key: "series-" + label,
    className: "series"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    className: "series-label"
  }, label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    className: "series-scale",
    style: {
      "position": "sticky",
      "left": labelWidth
    }
  }, make_series_scale(breaks)), colSpanPre > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    colSpan: colSpanPre
  }), childrenCols, colSpanPost > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    colSpan: colSpanPost
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    colSpan: values.length,
    className: "series-separator"
  })));
}
function VirtualBreaks(labelRef, values, zoom, labelWidth, renderBounds, breaksWindow) {
  // NOTE: only this component has the proper colSpanPre and colSpanPost widths becuse we know it's unique.
  var colSpanPre = renderBounds[0];
  var colSpanPost = values.length - renderBounds[1];
  // Each td has a padding of one, so we need `zoom + 2`
  var widthPre = (zoom + 2) * colSpanPre - 2; // We subtract 2 because two pixels will be added by the padding
  var widthPost = (zoom + 2) * colSpanPost - 2;
  // const childrenCols = new Array(renderBounds[1] - renderBounds[0]);
  for (var i = renderBounds[0]; i < renderBounds[1]; ++i) {
    breaksWindow[i - renderBounds[0]] = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      key: "aln-axis-resnum-" + i,
      className: "aln-axis-resnum"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      style: {
        "width": "0px",
        "display": "block"
      }
    }, values[i]));
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
    className: "aln-axis"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    ref: labelRef,
    className: "aln-axis-label"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    className: "aln-axis-seqnum",
    style: {
      "position": "sticky",
      "left": labelWidth
    }
  }), colSpanPre > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    colSpan: colSpanPre,
    style: {
      "minWidth": widthPre + "px",
      "maxWidth": widthPre + "px"
    }
  }), breaksWindow, colSpanPost > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    colSpan: colSpanPost,
    style: {
      "minWidth": widthPost + "px",
      "maxWidth": widthPost + "px"
    }
  }));
}
function VirtualAlignment(label, rowNumber, values, colors, cumsum, highlightedRow, highlightedCol, show_seqnum, show_letters, zoom, labelWidth, renderBounds) {
  var colSpanPre = renderBounds[0];
  var colSpanPost = values.length - renderBounds[1];
  var childrenCols = new Array(renderBounds[1] - renderBounds[0]);
  var _loop = function _loop(i) {
    childrenCols[i - renderBounds[0]] = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      key: "aln-" + i,
      className: "aln-letter" + (i === highlightedCol ? " highlighted" : ""),
      style: {
        "backgroundColor": colors[i],
        "minWidth": zoom + "px",
        "maxWidth": zoom + "px"
      },
      onClick: function onClick() {
        setHighlighted(rowNumber, i);
      }
    }, show_letters ? values[i] : "", values[i] !== "-" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "aln-letter-tooltip"
    }, label + ":" + cumsum[i]));
  };
  for (var i = renderBounds[0]; i < renderBounds[1]; ++i) {
    _loop(i);
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
    key: "aln-" + label,
    className: "aln-row" + (rowNumber === highlightedRow ? " highlighted" : "")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    className: "aln-label"
  }, label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    className: "aln-seqnum",
    style: {
      "position": "sticky",
      "left": labelWidth
    }
  }, show_seqnum ? rowNumber : ""), colSpanPre > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    colSpan: colSpanPre
  }), childrenCols, colSpanPost > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    colSpan: colSpanPost
  }));
}
function getWindowSize(_ref) {
  var scrollWidth = _ref.scrollWidth,
    zoom = _ref.zoom,
    _ref$padding = _ref.padding,
    padding = _ref$padding === void 0 ? 2 : _ref$padding;
  return Math.ceil(scrollWidth / (zoom + 2)) + 2 * padding;
}
function getRenderBounds(_ref2) {
  var scrollLeft = _ref2.scrollLeft,
    scrollWidth = _ref2.scrollWidth,
    alnLength = _ref2.alnLength,
    zoom = _ref2.zoom,
    _ref2$padding = _ref2.padding,
    padding = _ref2$padding === void 0 ? 2 : _ref2$padding;
  // Each td has a padding of one and a width of `zoom`, therefore we need `zoom + 2`
  // the `padding` variable refers to how many columns outside of the view should we render
  var windowSize = getWindowSize({
    scrollWidth: scrollWidth,
    zoom: zoom,
    padding: padding
  });
  var renderStart = Math.max(0, Math.min(alnLength - windowSize, Math.floor(scrollLeft / (zoom + 2)) - padding));
  var renderEnd = Math.min(alnLength, renderStart + windowSize);
  return [renderStart, renderEnd];
}
function rescale_series(values, breaks) {
  var min = 0,
    max = 1;
  if (breaks) {
    min = breaks[0];
    max = breaks[breaks.length - 1];
  }
  return values.map(function (x) {
    return (x - min) / (max - min);
  });
}
function make_series_scale(breaks) {
  var breaks_width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "8px";
  // for now we ignore the range and use a default scale for everything
  if (!breaks) {
    breaks = [0, 0.5, 1];
  }
  var min = breaks[0];
  var max = breaks[breaks.length - 1];
  var breaks_rescaled = rescale_series(breaks, breaks);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, breaks_rescaled.map(function (x, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: "break-" + i,
      style: {
        "position": "absolute",
        "bottom": "calc(".concat(x * 100, "% - 1px)"),
        "width": breaks_width,
        "left": "calc(100% - ".concat(breaks_width, ")"),
        "borderBottom": "0.5px solid black"
      }
    });
  }), breaks_rescaled.map(function (x, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: "breaklabel-" + i,
      style: {
        "position": "absolute",
        "bottom": "".concat(x * 100, "%"),
        "left": "calc(100% - ".concat(breaks_width, " - 2px)"),
        "lineHeight": "8px",
        "textAlign": "center",
        "transform": "translate(-100%, ".concat(x * 100, "%)")
      }
    }, breaks[i].toFixed(1));
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: {
      "position": "absolute",
      "right": "0px",
      "bottom": "0px",
      "height": "100%",
      "width": "1px",
      "backgroundColor": "black"
    }
  }));
}
function make_color_scheme(alignment, scheme) {
  try {
    var seqIds = Object.keys(alignment);
    var aln_length = alignment[seqIds[0]].length;
    var colors = {};
    seqIds.forEach(function (id) {
      return colors[id] = [];
    });
    var _loop2 = function _loop2(i) {
      var column = seqIds.map(function (id) {
        return alignment[id][i];
      });
      var column_colors = Object(_msa_color_schemes_js__WEBPACK_IMPORTED_MODULE_3__["color_msa_column"])(column, scheme);
      seqIds.forEach(function (id, index) {
        return colors[id].push(column_colors[index]);
      });
    };
    for (var i = 0; i < aln_length; i++) {
      _loop2(i);
    }
    return colors;
  } catch (e) {
    return null;
  }
}
function get_alignment_cumsum(alignment) {
  try {
    var res = {};
    for (var _i2 = 0, _Object$entries = Object.entries(alignment); _i2 < _Object$entries.length; _i2++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
        key = _Object$entries$_i[0],
        val = _Object$entries$_i[1];
      res[key] = [];
      var cumsum = 0;
      var _iterator = _createForOfIteratorHelper(val),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var x = _step.value;
          cumsum += x === "-" ? 0 : 1;
          res[key].push(cumsum);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    return res;
  } catch (e) {
    return null;
  }
}
function get_alignment_breaks(alnLength, mod) {
  var aln_breaks = new Array(alnLength);
  for (var i = 0; i < alnLength; i++) {
    if (i % mod === 0) aln_breaks[i] = String(i + 1);else aln_breaks[i] = "";
  }
  return aln_breaks;
}
function Seqselection(_ref3) {
  var id = _ref3.id,
    included = _ref3.included,
    excluded = _ref3.excluded,
    setIncluded = _ref3.setIncluded,
    setExcluded = _ref3.setExcluded,
    enabled = _ref3.enabled;
  // sortablejs needs items as objects with at least the `id` field.
  if (!enabled || !included) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null);
  }
  var includedItems = make_sortablejs_items(included);
  var excludedItems = make_sortablejs_items(excluded);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "seqselection"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "seqselection-included"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Included sequences"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_sortablejs__WEBPACK_IMPORTED_MODULE_2__["ReactSortable"], {
    group: "seqselection-" + id,
    list: includedItems,
    setList: setIncluded,
    className: "seqselection-sortable"
  }, includedItems.map(function (item) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: item.id,
      className: "seqselection-sortable-item"
    }, item.name);
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "seqselection-excluded"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Excluded sequences"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_sortablejs__WEBPACK_IMPORTED_MODULE_2__["ReactSortable"], {
    group: "seqselection-" + id,
    list: excludedItems,
    setList: setExcluded,
    className: "seqselection-sortable"
  }, excludedItems ? excludedItems.map(function (item) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: item.id,
      className: "seqselection-sortable-item"
    }, item.name);
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "seqselection-message"
  }, "Drag and drop a sequence ID here to remove it from the alignment."))));
}
function make_sortablejs_items(l) {
  return l.map(function (item) {
    return {
      id: "sortable-" + item,
      selected: false,
      chosen: false,
      filtered: false,
      name: item
    };
  });
}
DashSeqaln.defaultProps = {};
DashSeqaln.propTypes = {
  /**
   * The ID used to identify this component in Dash callbacks.
   */
  id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  /**
   * A label that will be printed when this component is rendered.
   */
  title: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  /**
   * An object representing the MSA.
   */
  alignment: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  /**
   * List of objects, each containing the data for a bar plot.
   */
  series: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  /**
   * The color scheme for the alignment, from Jalview.
   */
  color_scheme: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  /**
   * List of sequence IDs to show in the alignment.
   */
  included: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  /**
   * List of sequence IDs to NOT show in the alignment.
   */
  excluded: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  /**
   * Dash-assigned callback that should be called to report property changes
   * to Dash, to make them available for callbacks.
   */
  setProps: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
};

/***/ })

})
//# sourceMappingURL=912ab03-main-wps-hmr.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiI5MTJhYjAzLW1haW4td3BzLWhtci5qcyIsInNvdXJjZVJvb3QiOiIifQ==