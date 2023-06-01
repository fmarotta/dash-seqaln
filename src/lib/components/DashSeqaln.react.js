import React, { useState, useMemo } from 'react';
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
  const {allow_sequence_selection = true, show_letters = true, show_seqnum = false, zoom = 10} = props;
  const setIncluded = (items) => {
    setProps({included: items.map((x) => x.name)});
  };
  const setExcluded = (items) => {
    setProps({excluded: items.map((x) => x.name)});
  };
  let sequence_selection_component = <></>;
  if (allow_sequence_selection === true) {
    sequence_selection_component = Seqselection({
      id: id,
      included: included,
      excluded: excluded,
      setIncluded: setIncluded,
      setExcluded: setExcluded
    });
  }
  const alignment_cumsum = useMemo(() => get_alignment_cumsum(alignment), [alignment]);
  const alignment_colors = useMemo(() => make_color_scheme(alignment, color_scheme), [alignment, color_scheme]);
  const aln_breaks = [];
  for (let i = 0; i < alignment[Object.keys(alignment)[0]].length; i++) {
    if (i % 10 === 0)
      aln_breaks.push(String(i+1));
    else
      aln_breaks.push("");
  }
  return (
    <div id={id} className="DashSeqaln">
      {title && (<h2 className="title">{title}</h2>)}
      <table>
        {series.map((seriesItem) => (
          <thead key={"series-"+seriesItem.label} className="series">
          <tr>
            <td className="series-label">
              {seriesItem.label}
            </td>
            <td className="series-scale" style={{"position": "relative", "borderRight": "1px solid black"}}>
              {make_series_scale(seriesItem?.breaks)}
            </td>
            {rescale_series(seriesItem.values, seriesItem?.breaks).map((value, index) => (
              <td key={"series-"+index} className="series-values" style={{"height": seriesItem.height || "100px"}}>
                <div style={{"backgroundColor": seriesItem.color || "black", "height": (100 * value) + "%", "position": "relative"}}>
                  <span className="series-values-tooltip">{(index + 1) + ":" + seriesItem.values[index]}</span>
                </div>
              </td>
            ))}
          </tr>
          <tr><td colSpan="100%" className="series-separator"></td></tr>
          </thead>
        ))}
      <tbody className="aln">
        <tr className="aln-axis">
          <td className="aln-axis-label"></td>
          <td className="aln-axis-seqnum"></td>
          {aln_breaks.map((x, index) => (
            <td key={"aln-axis-resnum-"+index} className="aln-axis-resnum">
              <span style={{"width": "0px"}}>{x}</span>
            </td>
          ))}
        </tr>
        {included.map((seqId, seqIndex) => (
          <tr key={"aln-"+seqId}>
            <td className="aln-label">{seqId}</td>
            <td className="aln-seqnum">{show_seqnum ? seqIndex : ""}</td>
            {alignment[seqId].split("").map((letter, index) => (
              <td
                key={"aln-"+index}
                className="aln-letter"
                style={{"backgroundColor": alignment_colors[seqId][index], "width": zoom + "px"}}
              >
                {show_letters ? letter : ""}
                {letter !== "-" && (
                  <span className="aln-letter-tooltip">{seqId + ":" + alignment_cumsum[seqId][index]}</span>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      </table>
      {sequence_selection_component}
    </div>
  );
}

function rescale_series(values, breaks) {
  let min = 0, max = 1;
  if (breaks) {
    min = breaks[0];
    max = breaks[breaks.length - 1];
  }
  return values.map((x) => (x - min) / (max - min));
}

function make_series_scale(breaks, breaks_width = "8px") {
  // for now we ignore the range and use a default scale for everything
  if (!breaks) {
    breaks = [0, 0.5, 1];
  }
  let min = breaks[0];
  let max = breaks[breaks.length - 1];
  let breaks_rescaled = rescale_series(breaks, breaks);
  return (
    <>
    {breaks_rescaled.map((x, i) => (
      <div key={"break-"+i} style={{"position": "absolute", "bottom": `${x * 100}%`, "width": breaks_width, "left": `calc(100% - ${breaks_width} + 1px)`, "borderBottom": "0.5px solid black"}}></div>
    ))}
    {breaks_rescaled.map((x, i) => (
      <div  key={"breaklabel-"+i}style={{"position": "absolute", "bottom": `${x * 100}%`, "left": `calc(100% - ${breaks_width})`, "transform": "translate(-100%, 0%)"}}>{breaks[i].toFixed(1)}</div>
    ))}
    </>
  );
}

function make_color_scheme(alignment, scheme) {
  const seqIds = Object.keys(alignment);
  const aln_length = alignment[seqIds[0]].length;
  const colors = {};
  seqIds.forEach((id) => colors[id] = []);
  for (let i = 0; i < aln_length; i++) {
    let column = seqIds.map((id) => alignment[id][i]);
    let column_colors = color_msa_column(column, scheme);
    seqIds.forEach((id, index) => colors[id].push(column_colors[index]));
  }
  return colors;
}

function get_alignment_cumsum(alignment) {
  const res = {};
  for (const [key, val] of Object.entries(alignment)) {
    res[key] = [];
    let cumsum = 0;
    for (let x of val) {
      cumsum += (x === "-" ? 0 : 1);
      res[key].push(cumsum);
    }
  }
  return res;
}

function Seqselection({id, included, excluded, setIncluded, setExcluded}) {
  // sortablejs needs items as objects with at least the `id` field.
  const includedItems = make_sortablejs_items(included);
  const excludedItems = make_sortablejs_items(excluded);
  return (
    <div className="seqselection">
      <div className="seqselection-included">
        <h3>Included sequences</h3>
        <ReactSortable group={"seqselection-"+id} list={includedItems} setList={setIncluded} className="seqselection-sortable">
          {includedItems.map((item) => (<div key={item.id} className="seqselection-sortable-item">{item.name}</div>))}
        </ReactSortable>
      </div>
      <div className="seqselection-excluded">
        <h3>Excluded sequences</h3>
        <ReactSortable group={"seqselection-"+id} list={excludedItems} setList={setExcluded} className="seqselection-sortable">
          {excluded.length ?
            excludedItems.map((item) => (<div key={item.id} className="seqselection-sortable-item">{item.name}</div>)) :
            <p className="seqselection-message">Drag and drop a sequence ID here to remove it from the alignment.</p>
          }
        </ReactSortable>
      </div>
    </div>
  );
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
