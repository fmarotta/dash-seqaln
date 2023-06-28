# AUTO GENERATED FILE - DO NOT EDIT

export dashseqaln

"""
    dashseqaln(;kwargs...)

A DashSeqaln component.
ExampleComponent is an example component.
Keyword arguments:
- `id` (String; optional): The ID used to identify this component in Dash callbacks.
- `alignment` (Dict; optional): An object representing the MSA.
- `color_scheme` (String; optional): The color scheme for the alignment, from Jalview.
- `excluded` (Array; optional): List of sequence IDs to NOT show in the alignment.
- `included` (Array; optional): List of sequence IDs to show in the alignment.
- `series` (Array; optional): List of objects, each containing the data for a bar plot.
- `title` (String; optional): A label that will be printed when this component is rendered.
"""
function dashseqaln(; kwargs...)
        available_props = Symbol[:id, :alignment, :color_scheme, :excluded, :included, :series, :title]
        wild_props = Symbol[]
        return Component("dashseqaln", "DashSeqaln", "dash_seqaln", available_props, wild_props; kwargs...)
end

