/**
 * A function that takes a column and returns the corresponding colours according to the scheme name provided.
 *
 * https://www.jalview.org/help/html/colourSchemes/
 */


export {color_msa_column};

function color_msa_column(column, scheme) {
  if (!scheme)
    return make_blank_scheme(column);
  if (scheme === "Blosum62")
    return make_blosum_scheme(column);
  if (scheme === "ClustalX")
    return make_clustalx_scheme(column);
  else
    return make_static_scheme(column, scheme)
}

function make_blank_scheme(column) {
  return column.map((x) => "#ffffff");
}

function make_static_scheme(column, scheme) {
  return column.map((x) => static_schemes[scheme][x]);
}

function make_blosum_scheme(column) {
  // find the consensus
  let consensus = "*";
  let occurrences = {};
  let most_occurrences = 0;
  for (let c of column) {
    if (c === "-") {
      continue
    }
    if (c in occurrences) {
      occurrences[c] += 1;
    } else {
      occurrences[c] = 0;
    }
    if (occurrences[c] > most_occurrences) {
      most_occurrences = occurrences[c];
      consensus = c;
    }
  }
  // the score difference between consensus and residue goes from -4 to 11, exactly 16 steps.
  // We use 8 colours and increment the darkness every 2 steps.
  return column.map((x) => x === "-" ? "#ffffff" : blosum62_palette[Math.floor((blosum62[consensus][x] + 4) / 2)])
}

function make_clustalx_scheme(column) {
  const colors = [];
  const n = column.length;
  const frac = {};
  for (let g of [ ["W", "L", "V", "I", "M", "A", "F", "C", "H", "P"], ["K", "R"], ["Q", "E"], ["E", "D"], ["T", "S"] ]) {
    frac[g.join("")] = column.filter((x) => g.includes(x)).length / n;
  }
  for (let a of "KRQEDNYSTCGPWAFHILMV") {
    frac[a] = column.filter((x) => x == a).length / n;
  }
  const is_hydrophobic = frac["WLVIMAFCHP"] > .6;
  const is_positive = frac["KR"] > .6 || Math.max(frac["K"], frac["R"], frac["Q"]) > .8;
  const is_negative_E = frac["KR"] > .6 || frac["QE"] > .5 || Math.max(frac["E"], frac["Q"], frac["D"]) > .85;
  const is_negative_D = frac["KR"] > .6 || frac["ED"] > .5 || Math.max(frac["K"], frac["R"], frac["Q"]) > .85;
  const is_polar_N = frac["N"] > .5 || Math.max(frac["N"], frac["Y"]) > .85; // eh?
  const is_polar_Q = frac["KR"] > .6 || frac["QE"] > .5 || Math.max(frac["Q"], frac["E"], frac["K"], frac["R"]) > .85;
  const is_polar_ST = frac["WLVIMAFCHP"] > .6 || frac["TS"] > .5 || Math.max(frac["S"], frac["T"]) > .85;
  const is_cystein = frac["C"] > .85;
  const is_glycine = frac["G"] > .0;
  const is_prolyne = frac["P"] > .0;
  const is_aromatic = frac["WLVIMAFCHP"] > .6 || Math.max(frac["W"], frac["Y"], frac["A"], frac["C"], frac["P"], frac["Q"], frac["F"], frac["H"], frac["I"], frac["L"], frac["M"], frac["V"])
  for (let residue of column) {
    if (residue === "-") {
      colors.push("#ffffff");
    } else if (is_hydrophobic && ["A", "I", "L", "M", "F", "W", "V", "C"].includes(residue)) {
      colors.push("blue");
    } else if (is_positive && (residue === "K" || residue === "R")) {
      colors.push("red");
    } else if (is_negative_E && residue === "E") {
      colors.push("magenta");
    } else if (is_negative_D && residue === "D") {
      colors.push("magenta");
    } else if (is_polar_N && residue === "N") {
      colors.push("green");
    } else if (is_polar_Q && residue === "Q") {
      colors.push("green");
    } else if (is_polar_ST && (residue === "S" || residue === "T")) {
      colors.push("green");
    } else if (is_cystein && residue === "C") {
      colors.push("pink");
    } else if (is_glycine && residue === "G") {
      colors.push("orange");
    } else if (is_prolyne && residue === "P") {
      colors.push("yellow");
    } else if (is_aromatic && (residue === "H" || residue == "Y")) {
      colors.push("cyan");
    } else {
      colors.push("#ffffff");
    }
  }
  return colors;
}


const static_schemes = {
  "Clustal": {
    A: "#80a0f0",
    R: "#f01505",
    N: "#00ff00",
    D: "#c048c0",
    C: "#f08080",
    Q: "#00ff00",
    E: "#c048c0",
    G: "#f09048",
    H: "#15a4a4",
    I: "#80a0f0",
    L: "#80a0f0",
    K: "#f01505",
    M: "#80a0f0",
    F: "#80a0f0",
    P: "#ffff00",
    S: "#00ff00",
    T: "#00ff00",
    W: "#80a0f0",
    Y: "#15a4a4",
    V: "#80a0f0",
    B: "#ffffff",
    X: "#ffffff",
    Z: "#ffffff",
    '-': "#ffffff",
  },
  "Zappo": {
    A: "#ffafaf",
    R: "#6464ff",
    N: "#00ff00",
    D: "#ff0000",
    C: "#ffff00",
    Q: "#00ff00",
    E: "#ff0000",
    G: "#ff00ff",
    H: "#6464ff",
    I: "#ffafaf",
    L: "#ffafaf",
    K: "#6464ff",
    M: "#ffafaf",
    F: "#ffc800",
    P: "#ff00ff",
    S: "#00ff00",
    T: "#00ff00",
    W: "#ffc800",
    Y: "#ffc800",
    V: "#ffafaf",
    B: "#ffffff",
    X: "#ffffff",
    Z: "#ffffff",
    '-': "#ffffff",
  },
  "Taylor": {
    A: "#ccff00",
    R: "#0000ff",
    N: "#cc00ff",
    D: "#ff0000",
    C: "#ffff00",
    Q: "#ff00cc",
    E: "#ff0066",
    G: "#ff9900",
    H: "#0066ff",
    I: "#66ff00",
    L: "#33ff00",
    K: "#6600ff",
    M: "#00ff00",
    F: "#00ff66",
    P: "#ffcc00",
    S: "#ff3300",
    T: "#ff6600",
    W: "#00ccff",
    Y: "#00ffcc",
    V: "#99ff00",
    B: "#ffffff",
    X: "#ffffff",
    Z: "#ffffff",
    '-': "#ffffff",
  },
  "Flower": {
    A: "#b18a51",
    R: "#83bff1",
    N: "#0bcec6",
    D: "#01a578",
    C: "#ff5701",
    Q: "#7295ae",
    E: "#2da0a1",
    G: "#b1c23c",
    H: "#0194f9",
    I: "#f27663",
    L: "#df6e75",
    K: "#7fc3d7",
    M: "#fe9daf",
    F: "#fa559d",
    P: "#4fa32a",
    S: "#b4bd9b",
    T: "#d2b576",
    W: "#ff2ded",
    Y: "#c96ecf",
    V: "#fd997b",
    B: "#ffffff",
    X: "#ffffff",
    Z: "#ffffff",
    '-': "#ffffff",
  },
  "Blossom": {
    A: "#8bc4b4",
    R: "#fc9502",
    N: "#b5c206",
    D: "#5fa505",
    C: "#0893fe",
    Q: "#bf8527",
    E: "#dbb501",
    G: "#00d382",
    H: "#ff5701",
    I: "#9abaf3",
    L: "#cda5dc",
    K: "#fea527",
    M: "#f5a1b8",
    F: "#f74fa8",
    P: "#10d631",
    S: "#7e9d59",
    T: "#00a29c",
    W: "#fe08fb",
    Y: "#ff4e7a",
    V: "#87c0e4",
    B: "#ffffff",
    X: "#ffffff",
    Z: "#ffffff",
    '-': "#ffffff",
  },
  "Sunset": {
    A: "#fea0fd",
    R: "#85746a",
    N: "#abc8f5",
    D: "#2e7bbe",
    C: "#fc0cfe",
    Q: "#8c6e81",
    E: "#677892",
    G: "#2799ff",
    H: "#dbc58e",
    I: "#fa21a1",
    L: "#e01e82",
    K: "#debecc",
    M: "#d13e7b",
    F: "#ff385d",
    P: "#5766f9",
    S: "#e7b4fd",
    T: "#a658b7",
    W: "#ff3701",
    Y: "#cb5339",
    V: "#fe51b8",
    B: "#ffffff",
    X: "#ffffff",
    Z: "#ffffff",
    '-': "#ffffff",
  },
  "Ocean": {
    A: "#c6ca9b",
    R: "#0ca0a8",
    N: "#0adfc3",
    D: "#4cdfa1",
    C: "#c68136",
    Q: "#8bd3d1",
    E: "#60dac9",
    G: "#33a551",
    H: "#00cffe",
    I: "#f2baaa",
    L: "#bb8a83",
    K: "#40a090",
    M: "#a48b88",
    F: "#ab88ae",
    P: "#afd365",
    S: "#6d9b74",
    T: "#8d9566",
    W: "#758aee",
    Y: "#bac3fc",
    V: "#e9bea4",
    B: "#ffffff",
    X: "#ffffff",
    Z: "#ffffff",
    '-': "#ffffff",
  },
  "Hydrophobicity": {
    A: "#ad0052",
    R: "#0000ff",
    N: "#0c00f3",
    D: "#0c00f3",
    C: "#c2003d",
    Q: "#0c00f3",
    E: "#0c00f3",
    G: "#6a0095",
    H: "#1500ea",
    I: "#ff0000",
    L: "#ea0015",
    K: "#0000ff",
    M: "#b0004f",
    F: "#cb0034",
    P: "#4600b9",
    S: "#5e00a1",
    T: "#61009e",
    W: "#5b00a4",
    Y: "#4f00b0",
    V: "#f60009",
    B: "#0c00f3",
    X: "#680097",
    Z: "#0c00f3",
    '-': "#ffffff",
  },
  "HelixPropensity": {
    A: "#e718e7",
    R: "#6f906f",
    N: "#1be41b",
    D: "#778877",
    C: "#23dc23",
    Q: "#926d92",
    E: "#ff00ff",
    G: "#00ff00",
    H: "#758a75",
    I: "#8a758a",
    L: "#ae51ae",
    K: "#a05fa0",
    M: "#ef10ef",
    F: "#986798",
    P: "#00ff00",
    S: "#36c936",
    T: "#47b847",
    W: "#8a758a",
    Y: "#21de21",
    V: "#857a85",
    B: "#49b649",
    X: "#758a75",
    Z: "#c936c9",
    '-': "#ffffff",
  },
  "StrandPropensity": {
    A: "#5858a7",
    R: "#6b6b94",
    N: "#64649b",
    D: "#2121de",
    C: "#9d9d62",
    Q: "#8c8c73",
    E: "#0000ff",
    G: "#4949b6",
    H: "#60609f",
    I: "#ecec13",
    L: "#b2b24d",
    K: "#4747b8",
    M: "#82827d",
    F: "#c2c23d",
    P: "#2323dc",
    S: "#4949b6",
    T: "#9d9d62",
    W: "#c0c03f",
    Y: "#d3d32c",
    V: "#ffff00",
    B: "#4343bc",
    X: "#797986",
    Z: "#4747b8",
    '-': "#ffffff",
  },
  "TurnPropensity": {
    A: "#2cd3d3",
    R: "#708f8f",
    N: "#ff0000",
    D: "#e81717",
    C: "#a85757",
    Q: "#3fc0c0",
    E: "#778888",
    G: "#ff0000",
    H: "#708f8f",
    I: "#00ffff",
    L: "#1ce3e3",
    K: "#7e8181",
    M: "#1ee1e1",
    F: "#1ee1e1",
    P: "#f60909",
    S: "#e11e1e",
    T: "#738c8c",
    W: "#738c8c",
    Y: "#9d6262",
    V: "#07f8f8",
    B: "#f30c0c",
    X: "#7c8383",
    Z: "#5ba4a4",
    '-': "#ffffff",
  },
  "BuriedIndex": {
    A: "#00a35c",
    R: "#00fc03",
    N: "#00eb14",
    D: "#00eb14",
    C: "#0000ff",
    Q: "#00f10e",
    E: "#00f10e",
    G: "#009d62",
    H: "#00d52a",
    I: "#0054ab",
    L: "#007b84",
    K: "#00ff00",
    M: "#009768",
    F: "#008778",
    P: "#00e01f",
    S: "#00d52a",
    T: "#00db24",
    W: "#00a857",
    Y: "#00e619",
    V: "#005fa0",
    B: "#00eb14",
    X: "#00b649",
    Z: "#00f10e",
    '-': "#ffffff",
  }
}

const blosum62_palette = [ "#c5e7ff", "#abcfe9", "#91b8d3", "#78a1be", "#5f8ba9", "#457594", "#2a6080", "#004c6d" ]
// https://stackoverflow.com/questions/38647306/blosum62-or-45-scoring-in-javascript
const blosum62 = {
  '*':{'*':  1, 'A': -4, 'C': -4, 'B': -4, 'E': -4,
      'D': -4, 'G': -4, 'F': -4, 'I': -4, 'H': -4,
      'K': -4, 'M': -4, 'L': -4, 'N': -4, 'Q': -4,
      'P': -4, 'S': -4, 'R': -4, 'T': -4, 'W': -4,
      'V': -4, 'Y': -4, 'X': -4, 'Z': -4},
  'A':{'*': -4, 'A':  4, 'C':  0, 'B': -2, 'E': -1,
      'D': -2, 'G':  0, 'F': -2, 'I': -1, 'H': -2,
      'K': -1, 'M': -1, 'L': -1, 'N': -2, 'Q': -1,
      'P': -1, 'S':  1, 'R': -1, 'T':  0, 'W': -3,
      'V':  0, 'Y': -2, 'X':  0, 'Z': -1},
  'C':{'*': -4, 'A':  0, 'C':  9, 'B': -3, 'E': -4,
      'D': -3, 'G': -3, 'F': -2, 'I': -1, 'H': -3,
      'K': -3, 'M': -1, 'L': -1, 'N': -3, 'Q': -3,
      'P': -3, 'S': -1, 'R': -3, 'T': -1, 'W': -2,
      'V': -1, 'Y': -2, 'X': -2, 'Z': -3},
  'B':{'*': -4, 'A': -2, 'C': -3, 'B':  4, 'E':  1,
      'D':  4, 'G': -1, 'F': -3, 'I': -3, 'H':  0,
      'K':  0, 'M': -3, 'L': -4, 'N':  3, 'Q':  0,
      'P': -2, 'S':  0, 'R': -1, 'T': -1, 'W': -4,
      'V': -3, 'Y': -3, 'X': -1, 'Z':  1},
  'E':{'*': -4, 'A': -1, 'C': -4, 'B':  1, 'E':  5,
      'D':  2, 'G': -2, 'F': -3, 'I': -3, 'H':  0,
      'K':  1, 'M': -2, 'L': -3, 'N':  0, 'Q':  2,
      'P': -1, 'S':  0, 'R':  0, 'T': -1, 'W': -3,
      'V': -2, 'Y': -2, 'X': -1, 'Z':  4},
  'D':{'*': -4, 'A': -2, 'C': -3, 'B':  4, 'E':  2,
      'D':  6, 'G': -1, 'F': -3, 'I': -3, 'H': -1,
      'K': -1, 'M': -3, 'L': -4, 'N':  1, 'Q':  0,
      'P': -1, 'S':  0, 'R': -2, 'T': -1, 'W': -4,
      'V': -3, 'Y': -3, 'X': -1, 'Z':  1},
  'G':{'*': -4, 'A':  0, 'C': -3, 'B': -1, 'E': -2,
      'D': -1, 'G':  6, 'F': -3, 'I': -4, 'H': -2,
      'K': -2, 'M': -3, 'L': -4, 'N':  0, 'Q': -2,
      'P': -2, 'S':  0, 'R': -2, 'T': -2, 'W': -2,
      'V': -3, 'Y': -3, 'X': -1, 'Z': -2},
  'F':{'*': -4, 'A': -2, 'C': -2, 'B': -3, 'E': -3,
      'D': -3, 'G': -3, 'F':  6, 'I':  0, 'H': -1,
      'K': -3, 'M':  0, 'L':  0, 'N': -3, 'Q': -3,
      'P': -4, 'S': -2, 'R': -3, 'T': -2, 'W':  1,
      'V': -1, 'Y':  3, 'X': -1, 'Z': -3},
  'I':{'*': -4, 'A': -1, 'C': -1, 'B': -3, 'E': -3,
      'D': -3, 'G': -4, 'F':  0, 'I':  4, 'H': -3,
      'K': -3, 'M':  1, 'L':  2, 'N': -3, 'Q': -3,
      'P': -3, 'S': -2, 'R': -3, 'T': -1, 'W': -3,
      'V':  3, 'Y': -1, 'X': -1, 'Z': -3},
  'H':{'*': -4, 'A': -2, 'C': -3, 'B':  0, 'E':  0,
      'D': -1, 'G': -2, 'F': -1, 'I': -3, 'H':  8,
      'K': -1, 'M': -2, 'L': -3, 'N':  1, 'Q':  0,
      'P': -2, 'S': -1, 'R':  0, 'T': -2, 'W': -2,
      'V': -3, 'Y':  2, 'X': -1, 'Z':  0},
  'K':{'*': -4, 'A': -1, 'C': -3, 'B':  0, 'E':  1,
      'D': -1, 'G': -2, 'F': -3, 'I': -3, 'H': -1,
      'K':  5, 'M': -1, 'L': -2, 'N':  0, 'Q':  1,
      'P': -1, 'S':  0, 'R':  2, 'T': -1, 'W': -3,
      'V': -2, 'Y': -2, 'X': -1, 'Z':  1},
  'M':{'*': -4, 'A': -1, 'C': -1, 'B': -3, 'E': -2,
      'D': -3, 'G': -3, 'F':  0, 'I':  1, 'H': -2,
      'K': -1, 'M':  5, 'L':  2, 'N': -2, 'Q':  0,
      'P': -2, 'S': -1, 'R': -1, 'T': -1, 'W': -1,
      'V':  1, 'Y': -1, 'X': -1, 'Z': -1},
  'L':{'*': -4, 'A': -1, 'C': -1, 'B': -4, 'E': -3,
      'D': -4, 'G': -4, 'F':  0, 'I':  2, 'H': -3,
      'K': -2, 'M':  2, 'L':  4, 'N': -3, 'Q': -2,
      'P': -3, 'S': -2, 'R': -2, 'T': -1, 'W': -2,
      'V':  1, 'Y': -1, 'X': -1, 'Z': -3},
  'N':{'*': -4, 'A': -2, 'C': -3, 'B':  3, 'E':  0,
      'D':  1, 'G':  0, 'F': -3, 'I': -3, 'H':  1,
      'K':  0, 'M': -2, 'L': -3, 'N':  6, 'Q':  0,
      'P': -2, 'S':  1, 'R':  0, 'T':  0, 'W': -4,
      'V': -3, 'Y': -2, 'X': -1, 'Z':  0},
  'Q':{'*': -4, 'A': -1, 'C': -3, 'B':  0, 'E':  2,
      'D':  0, 'G': -2, 'F': -3, 'I': -3, 'H':  0,
      'K':  1, 'M':  0, 'L': -2, 'N':  0, 'Q':  5,
      'P': -1, 'S':  0, 'R':  1, 'T': -1, 'W': -2,
      'V': -2, 'Y': -1, 'X': -1, 'Z':  3},
  'P':{'*': -4, 'A': -1, 'C': -3, 'B': -2, 'E': -1,
      'D': -1, 'G': -2, 'F': -4, 'I': -3, 'H': -2,
      'K': -1, 'M': -2, 'L': -3, 'N': -2, 'Q': -1,
      'P':  7, 'S': -1, 'R': -2, 'T': -1, 'W': -4,
      'V': -2, 'Y': -3, 'X': -2, 'Z': -1},
  'S':{'*': -4, 'A':  1, 'C': -1, 'B':  0, 'E':  0,
      'D':  0, 'G':  0, 'F': -2, 'I': -2, 'H': -1,
      'K':  0, 'M': -1, 'L': -2, 'N':  1, 'Q':  0,
      'P': -1, 'S':  4, 'R': -1, 'T':  1, 'W': -3,
      'V': -2, 'Y': -2, 'X':  0, 'Z':  0},
  'R':{'*': -4, 'A': -1, 'C': -3, 'B': -1, 'E':  0,
      'D': -2, 'G': -2, 'F': -3, 'I': -3, 'H':  0,
      'K':  2, 'M': -1, 'L': -2, 'N':  0, 'Q':  1,
      'P': -2, 'S': -1, 'R':  5, 'T': -1, 'W': -3,
      'V': -3, 'Y': -2, 'X': -1, 'Z':  0},
  'T':{'*': -4, 'A':  0, 'C': -1, 'B': -1, 'E': -1,
      'D': -1, 'G': -2, 'F': -2, 'I': -1, 'H': -2,
      'K': -1, 'M': -1, 'L': -1, 'N':  0, 'Q': -1,
      'P': -1, 'S':  1, 'R': -1, 'T':  5, 'W': -2,
      'V':  0, 'Y': -2, 'X':  0, 'Z': -1},
  'W':{'*': -4, 'A': -3, 'C': -2, 'B': -4, 'E': -3,
      'D': -4, 'G': -2, 'F':  1, 'I': -3, 'H': -2,
      'K': -3, 'M': -1, 'L': -2, 'N': -4, 'Q': -2,
      'P': -4, 'S': -3, 'R': -3, 'T': -2, 'W': 11,
      'V': -3, 'Y':  2, 'X': -2, 'Z': -3},
  'V':{'*': -4, 'A':  0, 'C': -1, 'B': -3, 'E': -2,
      'D': -3, 'G': -3, 'F': -1, 'I':  3, 'H': -3,
      'K': -2, 'M':  1, 'L':  1, 'N': -3, 'Q': -2,
      'P': -2, 'S': -2, 'R': -3, 'T':  0, 'W': -3,
      'V':  4, 'Y': -1, 'X': -1, 'Z': -2},
  'Y':{'*': -4, 'A': -2, 'C': -2, 'B': -3, 'E': -2,
      'D': -3, 'G': -3, 'F':  3, 'I': -1, 'H':  2,
      'K': -2, 'M': -1, 'L': -1, 'N': -2, 'Q': -1,
      'P': -3, 'S': -2, 'R': -2, 'T': -2, 'W':  2,
      'V': -1, 'Y':  7, 'X': -1, 'Z': -2},
  'X':{'*': -4, 'A':  0, 'C': -2, 'B': -1, 'E': -1,
      'D': -1, 'G': -1, 'F': -1, 'I': -1, 'H': -1,
      'K': -1, 'M': -1, 'L': -1, 'N': -1, 'Q': -1,
      'P': -2, 'S':  0, 'R': -1, 'T':  0, 'W': -2,
      'V': -1, 'Y': -1, 'X': -1, 'Z': -1},
  'Z':{'*': -4, 'A': -1, 'C': -3, 'B':  1, 'E':  4,
      'D':  1, 'G': -2, 'F': -3, 'I': -3, 'H':  0,
      'K':  1, 'M': -1, 'L': -3, 'N':  0, 'Q':  3,
      'P': -1, 'S':  0, 'R':  0, 'T': -1, 'W': -3,
      'V': -2, 'Y': -2, 'X': -1, 'Z': 4}
}
