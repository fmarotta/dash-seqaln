import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { ReactSortable } from 'react-sortablejs';
import './DashSeqaln.react.css';
import { color_msa_column } from '../msa_color_schemes.js';

// NOTE: series values must be scaled between 0 and 1

/**
 * ExampleComponent is an example component.
 */
export default function DashSeqaln(props) {
  const {id, title, alignment, included, excluded, series, color_scheme, setProps} = props;
  const {allow_sequence_selection = true, show_letters = true, show_seqnum = false, zoom = "10px", border_spacing = "0px"} = props;
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
  const alignment_colors = make_color_scheme(alignment, color_scheme);
  const aln_breaks = [];
  for (let i = 0; i < alignment[Object.keys(alignment)[0]].length; i++) {
    if (i % 10 === 0)
      aln_breaks.push(String(i+1));
    else
      aln_breaks.push("");
  }
  return (
    <div id={id} className="DashSeqaln">
      <h2>{title}</h2>
      <table style={{"borderSpacing": border_spacing}}>
        {series.map((seriesItem) => (
          <thead key={"series-"+seriesItem.label}>
          <tr>
            <td className="series-label">{seriesItem.label}</td>
            <td className="series-scale" style={{"position": "relative", "borderRight": "1px solid black"}}>{make_series_scale()}</td>
            {seriesItem.values.map((value, index) => (
              <td key={"series-"+index} style={{"height": seriesItem.height}}>
                <div style={{"backgroundColor": seriesItem.color, "height": (100 * value) + "%"}}></div>
              </td>
            ))}
          </tr>
          <tr><td colSpan="100%"><hr style={{"margin": "0px", "border": "dashed 1px lightGray"}}></hr></td></tr>
          </thead>
        ))}
      <tbody>
        <tr>
          <td className="aln-axis-label"></td>
          <td className="aln-axis-seqnum"></td>
          {aln_breaks.map((x, index) => <td key={"aln-resnum-"+index} className="aln-axis"><div style={{"width": "0px"}}>{x}</div></td>)}
        </tr>
        {included.map((seqId, seqIndex) => (
          <tr key={"aln-"+seqId}>
            <td className="aln-label">{seqId}</td>
            <td className="aln-seqnum">{show_seqnum ? seqIndex : ""}</td>
            {alignment[seqId].split("").map((letter, index) => (
              <td key={"aln-"+index} style={{"backgroundColor": alignment_colors[seqId][index], "width": "10px"}}>{show_letters ? letter : ""}</td>
            ))}
          </tr>
        ))}
      </tbody>
      </table>
      {sequence_selection_component}
    </div>
  );
}

function make_series_scale() {
  // for now we ignore the range and use a default scale for everything
  const breaks = [0, 0.5, 1];
  const breaks_width = "8px";
  return (
    <>
    {breaks.map((x) => (
      <>
        <div style={{"position": "absolute", "bottom": `${x * 100}%`, "width": breaks_width, "left": `calc(100% - ${breaks_width} + 1px)`, "borderBottom": "0.5px solid black"}}></div>
        <div style={{"position": "absolute", "bottom": `${x * 100}%`, "left": `calc(100% - ${breaks_width} + 1px)`, "transform": "translate(-100%, 0)"}}>{x.toFixed(1)}</div>
      </>
    ))}
    </>
  );
}

function make_color_scheme(alignment, scheme) {
  const seqIds = Object.keys(alignment);
  const aln_length = alignment[seqIds[0]].length;
  const colors = {};
  seqIds.forEach((id) => colors[id] = []);
  console.log(colors);
  for (let i = 0; i < aln_length; i++) {
    const column = [];
    for (const seqId of seqIds) {
      column.push(alignment[seqId][i]);
    }
    let column_colors = color_msa_column(column, scheme);
    seqIds.forEach((id, index) => colors[id].push(column_colors[index]));
  }
  return colors;
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
     * An object representing the MSA.
     */
    alignment: PropTypes.object,

    /**
     * List of objects, each containing the data for a bar plot.
     */
    series: PropTypes.array,

    /**
     * The color scheme for the alignment, from Jalview.
     */
    color_scheme: PropTypes.string,

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
