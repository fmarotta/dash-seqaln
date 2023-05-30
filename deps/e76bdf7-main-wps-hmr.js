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
/* harmony import */ var _DashSeqaln_react_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DashSeqaln.react.css */ "./src/lib/components/DashSeqaln.react.css");
/* harmony import */ var _DashSeqaln_react_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_DashSeqaln_react_css__WEBPACK_IMPORTED_MODULE_3__);
/**
 * TODO:
 * color the msa
 * support clicking rows or cols
 * scale the height of the histograms between a and b
 */





function listdiff(l1, l2) {
  return l1.filter(function (x) {
    return !l2.includes(x);
  });
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

/**
 * ExampleComponent is an example component.
 */
function DashSeqaln(props) {
  var id = props.id,
    title = props.title,
    aln = props.aln,
    included = props.included,
    excluded = props.excluded,
    series = props.series,
    setProps = props.setProps;
  // sortablejs needs items as objects with at least the `id` field.
  var includedItems = make_sortablejs_items(included);
  var excludedItems = make_sortablejs_items(excluded);
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
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: id,
    className: "DashSeqaln"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", null, Object.keys(series).map(function (label) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", {
      key: "series-" + label
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      className: "series-label"
    }, label), series[label].map(function (height, index) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
        key: "series-" + index
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          "backgroundColor": "red",
          "height": 100 * height
        }
      }));
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      colSpan: "100%"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", {
      style: {
        "margin": "0px",
        "border": "dashed 1px lightGray"
      }
    }))));
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, included.map(function (seqItem) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
      key: "aln-" + seqItem
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      className: "aln-label"
    }, seqItem), aln[seqItem].split("").map(function (letter, index) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
        key: "aln-" + index
      }, letter);
    }));
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "DashSeqaln-select"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "DashSeqaln-included"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Included sequences"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_sortablejs__WEBPACK_IMPORTED_MODULE_2__["ReactSortable"], {
    group: "DashSeqaln-" + id,
    list: includedItems,
    setList: setIncluded,
    className: "Sortable"
  }, includedItems.map(function (item) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: item.id,
      className: "SortableItem"
    }, item.name);
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "DashSeqaln-excluded"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Excluded sequences"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_sortablejs__WEBPACK_IMPORTED_MODULE_2__["ReactSortable"], {
    group: "DashSeqaln-" + id,
    list: excludedItems,
    setList: setExcluded,
    className: "Sortable"
  }, excludedItems.map(function (item) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: item.id,
      className: "SortableItem"
    }, item.name);
  })))));
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
  title: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  /**
   * An object containing the MSA as strings.
   */
  aln: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  /**
   * Object of numeric lists for the bar plots.
   */
  series: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
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
//# sourceMappingURL=e76bdf7-main-wps-hmr.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJlNzZiZGY3LW1haW4td3BzLWhtci5qcyIsInNvdXJjZVJvb3QiOiIifQ==