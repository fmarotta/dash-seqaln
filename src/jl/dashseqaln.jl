# AUTO GENERATED FILE - DO NOT EDIT

export dashseqaln

"""
    dashseqaln(;kwargs...)

A DashSeqaln component.
ExampleComponent is an example component.
Keyword arguments:
- `id` (String; optional): The ID used to identify this component in Dash callbacks.
- `aln` (Dict; optional): An object containing the MSA as strings.
- `excluded` (Array; optional): List of sequence IDs to NOT show in the alignment.
- `included` (Array; optional): List of sequence IDs to show in the alignment.
- `series` (Dict; optional): Object of numeric lists for the bar plots.
- `title` (String; required): A label that will be printed when this component is rendered.
"""
function dashseqaln(; kwargs...)
        available_props = Symbol[:id, :aln, :excluded, :included, :series, :title]
        wild_props = Symbol[]
        return Component("dashseqaln", "DashSeqaln", "dash_seqaln", available_props, wild_props; kwargs...)
end

