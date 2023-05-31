import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { ReactSortable } from 'react-sortablejs';
import './DashSeqaln.react.css';

/**
 * ExampleComponent is an example component.
 */
export default function DashSeqaln(props) {
  const {id, title, alignment, included, excluded, series, setProps} = props;
  const {allow_sequence_selection, show_letters, zoom} = props;
  const setIncluded = (items) => {
    setProps({included: items.map((x) => x.name)});
  };
  const setExcluded = (items) => {
    setProps({excluded: items.map((x) => x.name)});
  };
  let sequence_selection_component = <></>;
  if (allow_sequence_selection === true) {
    sequence_selection_component = DashSeqalnSelect({
      id: id,
      included: included,
      excluded: excluded,
      setIncluded: setIncluded,
      setExcluded: setExcluded
    });
  }
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
        {included.map((seqId) => (
          <tr key={"aln-"+seqId}>
            <td className="aln-label">{seqId}</td>
            {alignment[seqId].split("").map((letter, index) => (
              <td key={"aln-"+index}>{letter}</td>
            ))}
          </tr>
        ))}
      </tbody>
      </table>
      {sequence_selection_component}
    </div>
  );
}

function DashSeqalnSelect({id, included, excluded, setIncluded, setExcluded}) {
  // sortablejs needs items as objects with at least the `id` field.
  const includedItems = make_sortablejs_items(included);
  const excludedItems = make_sortablejs_items(excluded);
  return (
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
  );
}

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
     * An iterable containing the sequences as objects with `id` and `seq` fields.
     */
    alignment: PropTypes.array,

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
