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
 * ExampleComponent is an example component.
 */
function DashSeqaln(props) {
  var id = props.id,
    title = props.title,
    alignment = props.alignment,
    included = props.included,
    excluded = props.excluded,
    series = props.series,
    setProps = props.setProps;
  var allow_sequence_selection = props.allow_sequence_selection,
    show_letters = props.show_letters,
    zoom = props.zoom;
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
  var sequence_selection_component = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null);
  if (allow_sequence_selection === true) {
    sequence_selection_component = DashSeqalnSelect({
      id: id,
      included: included,
      excluded: excluded,
      setIncluded: setIncluded,
      setExcluded: setExcluded
    });
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: id,
    className: "DashSeqaln"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", null, series.map(function (seriesItem) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", {
      key: "series-" + seriesItem.label
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      className: "series-label"
    }, seriesItem.label), seriesItem.values.map(function (value, index) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
        key: "series-" + index,
        style: {
          "height": seriesItem.height
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          "backgroundColor": seriesItem.color,
          "height": 100 * value + "%"
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
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, included.map(function (seqId) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
      key: "aln-" + seqId
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      className: "aln-label"
    }, seqId), alignment[seqId].split("").map(function (letter, index) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
        key: "aln-" + index
      }, letter);
    }));
  }))), sequence_selection_component);
}
function DashSeqalnSelect(_ref) {
  var id = _ref.id,
    included = _ref.included,
    excluded = _ref.excluded,
    setIncluded = _ref.setIncluded,
    setExcluded = _ref.setExcluded;
  // sortablejs needs items as objects with at least the `id` field.
  var includedItems = make_sortablejs_items(included);
  var excludedItems = make_sortablejs_items(excluded);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
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
  }))));
}
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
   * An object representing the MSA.
   */
  alignment: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  /**
   * List of objects, each containing the data for a bar plot.
   */
  series: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
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
//# sourceMappingURL=d214699-main-wps-hmr.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJkMjE0Njk5LW1haW4td3BzLWhtci5qcyIsInNvdXJjZVJvb3QiOiIifQ==