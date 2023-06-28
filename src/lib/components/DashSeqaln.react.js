import React, { useState, useMemo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { ReactSortable } from 'react-sortablejs';

import { color_msa_column } from '../msa_color_schemes.js';
import './DashSeqaln.react.css';

// NOTE: series values must be scaled between 0 and 1

/**
 * ExampleComponent is an example component.
 */
export default function DashSeqaln(props) {
  const {id, title, alignment, series, included, excluded, color_scheme, setProps} = props;
  const {allow_sequence_selection = true, show_letters = true, show_seqnum = false, zoom = 10} = props;
  const alnLength = alignment ? alignment[Object.keys(alignment)[0]].length : 0;
  const labelRef = useRef();
  const scaleRef = useRef();
  const scrollViewportRef = useRef();
  const [labelWidth, setLabelWidth] = useState(0);
  const [scaleWidth, setScaleWidth] = useState(0);
  const [scrollViewportWidth, setScrollViewportWidth] = useState(0);
  const [highlightedRow, setHighlightedRow] = useState();
  const [highlightedCol, setHighlightedCol] = useState();
  const [renderBounds, setRenderBounds] = useState([0, 0]);
  const [ticking, setTicking] = useState(false);
  useEffect(() => {
    const lw = labelRef.current.getBoundingClientRect().width;
    const sw = scaleRef.current.getBoundingClientRect().width;
    const svw = scrollViewportRef.current.getBoundingClientRect().width;
    setLabelWidth(lw);
    setScaleWidth(sw);
    setScrollViewportWidth(svw);
    setRenderBounds(getRenderBounds({
      scrollLeft: 0,
      scrollWidth: svw,
      stickyWidth: lw + sw,
      alnLength: alnLength,
      zoom: zoom,
    }));
  }, [labelRef, scaleRef, scrollViewportRef, alnLength, zoom]);
  const setIncluded = (items) => {
    setProps({included: items.map((x) => x.name)});
  };
  const setExcluded = (items) => {
    setProps({excluded: items.map((x) => x.name)});
  };
  const setHighlighted = (row, col) => {
    setHighlightedRow(row);
    setHighlightedCol(col);
    // setProps({highlightedRow: row, highlightedCol: col});
  };
  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        setRenderBounds(getRenderBounds({
          scrollLeft: scrollViewportRef.current.scrollLeft,
          scrollWidth: scrollViewportWidth,
          stickyWidth: labelWidth + scaleWidth,
          alnLength: alnLength,
          zoom: zoom,
        }));
        setTicking(false);
      });
      setTicking(true);
    };
  };
  const alignment_cumsum = useMemo(() => get_alignment_cumsum(alignment), [alignment]);
  const alignment_colors = useMemo(() => make_color_scheme(alignment, color_scheme), [alignment, color_scheme]);
  const aln_breaks = useMemo(() => get_alignment_breaks(alnLength, 10), [alignment]);
  return (
    <div id={id} className="DashSeqaln">
      {title && (<h2 className="title">{title}</h2>)}
      <div ref={scrollViewportRef} style={{"overflowX": "auto"}} onScroll={() => handleScroll()} >
      <table>
        {series && series.map((seriesItem) => VirtualHead(seriesItem.label, seriesItem.breaks, seriesItem.height, rescale_series(seriesItem.values, seriesItem.breaks), seriesItem.color, labelWidth, renderBounds) )}
        <tbody className="aln">
          {VirtualBreaks(labelRef, scaleRef, aln_breaks, zoom, labelWidth, renderBounds)}
          {included && included.map((seqId, seqIndex) => VirtualAlignment(seqId, seqIndex, alignment[seqId].split(""), alignment_colors[seqId], alignment_cumsum[seqId], highlightedRow, highlightedCol, show_seqnum, show_letters, zoom, labelWidth, renderBounds))}
        </tbody>
      </table>
      </div>
      <Seqselection id={id} included={included} excluded={excluded} setIncluded={setIncluded} setExcluded={setExcluded} enabled={allow_sequence_selection} />
    </div>
  );
}

function VirtualHead(label, breaks, height, values, color, labelWidth, renderBounds) {
  const colSpanPre = renderBounds[0];
  const colSpanPost = values.length - renderBounds[1];
  const childrenCols = new Array(renderBounds[1] - renderBounds[0]);
  for (let i = renderBounds[0]; i < renderBounds[1]; ++i) {
    childrenCols[i - renderBounds[0]] = (
      <td key={"series-"+i} className="series-values" style={{"height": height || "100px"}}>
        <div style={{"backgroundColor": color || "black", "height": (100 * values[i]) + "%", "position": "relative"}}>
          <span className="series-values-tooltip">{(i + 1) + ":" + values[i]}</span>
        </div>
      </td>
    );
  }
  return (
    <thead key={"series-"+label} className="series">
    <tr>
      <td className="series-label">
        {label}
      </td>
      <td className="series-scale" style={{"position": "sticky", "left": labelWidth}}>
        {make_series_scale(breaks)}
      </td>
      {colSpanPre > 0 && <td colSpan={colSpanPre}></td>}
      {childrenCols}
      {colSpanPost > 0 && <td colSpan={colSpanPost}></td>}
    </tr>
    <tr><td colSpan={values.length} className="series-separator"></td></tr>
    </thead>
  );
}

function VirtualBreaks(labelRef, scaleRef, values, zoom, labelWidth, renderBounds) {
  const colSpanPre = renderBounds[0];
  const colSpanPost = values.length - renderBounds[1];
  // Each td has a padding of one, so we need `zoom + 2`
  const widthPre = (zoom + 2) * colSpanPre - 2; // We subtract 2 because two pixels will be added by the padding
  const widthPost = (zoom + 2) * colSpanPost - 2;
  const childrenCols = new Array(renderBounds[1] - renderBounds[0]);
  for (let i = renderBounds[0]; i < renderBounds[1]; ++i) {
    childrenCols[i - renderBounds[0]] = (
      <td key={"aln-axis-resnum-"+i} className="aln-axis-resnum" >
        <span style={{"width": "0px", "display": "block"}}>{values[i]}</span>
      </td>
    );
  }
  return (
    <tr className="aln-axis">
      <td ref={labelRef} className="aln-axis-label"></td>
      <td ref={scaleRef} className="aln-axis-seqnum" style={{"position": "sticky", "left": labelWidth}} ></td>
      {colSpanPre > 0 && <td colSpan={colSpanPre} style={{"minWidth": widthPre + "px", "maxWidth": widthPre + "px"}}></td>}
      {childrenCols}
      {colSpanPost > 0 && <td colSpan={colSpanPost} style={{"minWidth": widthPost + "px", "maxWidth": widthPost + "px"}}></td>}
    </tr>
  );
}

function VirtualAlignment(label, rowNumber, values, colors, cumsum, highlightedRow, highlightedCol, show_seqnum, show_letters, zoom, labelWidth, renderBounds) {
  const colSpanPre = renderBounds[0];
  const colSpanPost = values.length - renderBounds[1];
  const childrenCols = new Array(renderBounds[1] - renderBounds[0]);
  for (let i = renderBounds[0]; i < renderBounds[1]; ++i) {
    childrenCols[i - renderBounds[0]] = (
      <td
        key={"aln-"+i}
        className={"aln-letter" + (i === highlightedCol ? " highlighted" : "")}
        style={{"backgroundColor": colors[i], "minWidth": zoom + "px", "maxWidth": zoom + "px"}}
        onClick={() => {setHighlighted(rowNumber, i)}}
      >
        {show_letters ? values[i] : ""}
        {values[i] !== "-" && (
          <span className="aln-letter-tooltip">{label + ":" + cumsum[i]}</span>
        )}
      </td>
    );
  }
  return (
    <tr key={"aln-"+label} className={"aln-row" + (rowNumber === highlightedRow ? " highlighted" : "")}>
      <td className="aln-label">{label}</td>
      <td className="aln-seqnum" style={{"position": "sticky", "left": labelWidth}}>{show_seqnum ? rowNumber : ""}</td>
      {colSpanPre > 0 && <td colSpan={colSpanPre}></td>}
      {childrenCols}
      {colSpanPost > 0 && <td colSpan={colSpanPost}></td>}
    </tr>
  )
}

function getRenderBounds({ scrollLeft, scrollWidth, stickyWidth, alnLength, zoom, padding = 2 }) {
  // Each td has a padding of one and a width of `zoom`, therefore we need `zoom + 2`
  const renderStart = Math.max(0, Math.floor(scrollLeft / (zoom + 2)) - padding);
  const renderEnd = Math.min(alnLength, renderStart + Math.ceil(scrollWidth / (zoom + 2)) + padding);
  return [renderStart, renderEnd];
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
      <div key={"break-"+i} style={{"position": "absolute", "bottom": `calc(${x * 100}% - 1px)`, "width": breaks_width, "left": `calc(100% - ${breaks_width})`, "borderBottom": "0.5px solid black"}}></div>
    ))}
    {breaks_rescaled.map((x, i) => (
      <div key={"breaklabel-"+i} style={{"position": "absolute", "bottom": `${x * 100}%`, "left": `calc(100% - ${breaks_width} - 2px)`, "lineHeight": "8px", "textAlign": "center", "transform": `translate(-100%, ${x * 100}%)`}}>{breaks[i].toFixed(1)}</div>
    ))}
    <div style={{"position": "absolute", "right": "0px", "bottom": "0px", "height": "100%", "width": "1px", "backgroundColor": "black"}}></div>
    </>
  );
}

function make_color_scheme(alignment, scheme) {
  try {
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
  } catch(e) {
    return null;
  }
}

function get_alignment_cumsum(alignment) {
  try {
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
  } catch(e) {
    return null;
  }
}

function get_alignment_breaks(alnLength, mod) {
  const aln_breaks = new Array(alnLength);
  for (let i = 0; i < alnLength; i++) {
    if (i % mod === 0)
      aln_breaks[i] = String(i+1);
    else
      aln_breaks[i] = "";
  }
  return aln_breaks;
}

function Seqselection({id, included, excluded, setIncluded, setExcluded, enabled}) {
  // sortablejs needs items as objects with at least the `id` field.
  if (!enabled || !included) {
    return (<></>);
  }
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
          {excludedItems ?
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
    title: PropTypes.string,

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
