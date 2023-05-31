import dash_seqaln
from dash import Dash, callback, html, Input, Output

app = Dash(__name__)

sampleSeries = [
    {
        "label": "Entropy",
        "values": [0, 0.5, 0.3, 0.5, 0.2, 0, 0.5, 0.3, 0.5, 0.2, 0, 0.5, 0.3, 0.5, 0.2, 0, 0.5, 0.3, 0.5, 0.2, 0, 0.5, 0.3, 0.5, 0.2, 0.7, 0.9, 1],
        "color": "green",
        "height": "100px",
    },
]
sampleAln = {
    "id1": "ART--RGPWTQRW-LLERERP---RM-M",
    "id2": "A-MD-RGD-TDRWPLLD-EWP---RTFM",
    "id3": "AR--TRGP-TERWP--ERERP---RM-M",
}

app.layout = html.Div([
    dash_seqaln.DashSeqaln(
        id='input',
        title='my msa',
        alignment=sampleAln,
        color_scheme="ClustalX",
        included=list(sampleAln.keys()),
        excluded=[],
        series=sampleSeries,
    ),
    html.Div(id='output')
])


@callback(
    Output('output', 'children'),
    Input('input', 'excluded'))
def display_output(excluded):
    print(excluded)
    return 'You have dropped {}'.format(", ".join(excluded))


if __name__ == '__main__':
    app.run_server(debug=True)
