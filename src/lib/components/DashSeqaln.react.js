import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { ReactSortable } from 'react-sortablejs';
import './DashSeqaln.react.css';

function listdiff(l1, l2) {
  return l1.filter((x) => !l2.includes(x));
}

function make_sortablejs_items(l) {
  return l.map((item) => ({
    id: "sortable-"+item,
    selected: false,
    chosen: false,
    filtered: false,
    name: item,
  }));
}

/**
 * ExampleComponent is an example component.
 */
export default function DashSeqaln(props) {
  const {id, title, aln, included, excluded, series, setProps} = props;
  // sortablejs needs items as objects with at least the `id` field.
  const includedItems = make_sortablejs_items(included);
  const excludedItems = make_sortablejs_items(excluded);
  const setIncluded = (items) => {
    setProps({included: items.map((x) => x.name)});
  };
  const setExcluded = (items) => {
    setProps({excluded: items.map((x) => x.name)});
  };
  return (
    <div id={id} className="DashSeqaln">
      <h2>{title}</h2>
      <table>
        {Object.keys(series).map((label) => (
          <thead key={"series-"+label}>
          <tr>
            <td className="series-label">{label}</td>
            {series[label].map((height, index) => (
              <td key={"series-"+index}>
                <div style={{"backgroundColor": "red", "height": 100 * height}}></div>
              </td>
            ))}
          </tr>
          <tr><td colSpan="100%"><hr style={{"margin": "0px", "border": "dashed 1px lightGray"}}></hr></td></tr>
          </thead>
        ))}
      <tbody>
        {included.map((seqItem) => (
          <tr key={"aln-"+seqItem}>
            <td className="aln-label">{seqItem}</td>
            {aln[seqItem].split("").map((letter, index) => (
              <td key={"aln-"+index}>{letter}</td>
            ))}
          </tr>
        ))}
      </tbody>
      </table>
      <div className="DashSeqaln-select">
        <div className="DashSeqaln-included">
          <h3>Included sequences</h3>
          <ReactSortable group={"DashSeqaln-"+id} list={includedItems} setList={setIncluded} className="Sortable">
            {includedItems.map((item) => (<div key={item.id} className="SortableItem">{item.name}</div>))}
          </ReactSortable>
        </div>
        <div className="DashSeqaln-excluded">
          <h3>Excluded sequences</h3>
          <ReactSortable group={"DashSeqaln-"+id} list={excludedItems} setList={setExcluded} className="Sortable">
            {excludedItems.map((item) => (<div key={item.id} className="SortableItem">{item.name}</div>))}
          </ReactSortable>
        </div>
      </div>
    </div>
  );
}

DashSeqaln.defaultProps = {};

DashSeqaln.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    /**
     * A label that will be printed when this component is rendered.
     */
    title: PropTypes.string.isRequired,

    /**
     * An object containing the MSA as strings.
     */
    aln: PropTypes.object,

    /**
     * Object of numeric lists for the bar plots.
     */
    series: PropTypes.object,

    /**
     * List of sequence IDs to show in the alignment.
     */
    included: PropTypes.array,

    /**
     * List of sequence IDs to NOT show in the alignment.
     */
    excluded: PropTypes.array,

    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func
};
