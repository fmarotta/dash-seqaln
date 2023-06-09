# Tricks

Incantation to start the engine:
```
export NODE_OPTIONS=--openssl-legacy-provider
```

Incantation to build a python package:
```
python setup.py sdist
```
or
```
python setup.py sdist bdist_wheel
```

# TODO

* [x] show msa as table
* [x] show histograms
* [x] color the msa
* [] add a textbox to the right where user can write own annotations
* [x] overing residue shows a popup with its actual position in the sequence (not in the aln), OR ability to choose one sequence as reference
* [x] scale the height of the histograms between a and b
* [x] series should be a list of dict. the dict should be {label, values, color, scale}
* ~[] maybe, make aln compatible with BioPython and series compatible with plotly~ (AlignIO is a class, we need a dict)
* [] add a row for the secondary structure (maybe a row for each sequence?)
* [x] add position on the x axis, scale on the y axis (for series), or sequence number (for sequences)
* [x] show letters or hide them
* [x] change the width of the <td>s to zoom out
* [x] reorganise css class names (e.g. all labels should be the same)
* [x] make more modular
* [x] use virtual scrolling
* [ ] scrolling is still a bit sluggish, see if performance can be improved (adding more padding improved a bit)
* [ ] click support
    * [ ] on a sequence, it highlights the row
    * [ ] on a series or residueNumber, it highlights the column
    * [ ] on a cell, it highlights both row and column
* ~[ ] memoize the rescaled series values and the .split("")ted alignment~ (we ask the user to do these steps)
* [ ] move style to css

# dash_seqaln

dash_seqaln is a Dash component library.

Get started with:
1. Install Dash and its dependencies: https://dash.plotly.com/installation
2. Run `python usage.py`
3. Visit http://localhost:8050 in your web browser

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)

### Install dependencies

If you have selected install_dependencies during the prompt, you can skip this part.

1. Install npm packages
    ```
    $ npm install
    ```
2. Create a virtual env and activate.
    ```
    $ virtualenv venv
    $ . venv/bin/activate
    ```
    _Note: venv\Scripts\activate for windows_

3. Install python packages required to build components.
    ```
    $ pip install -r requirements.txt
    ```
4. Install the python packages for testing (optional)
    ```
    $ pip install -r tests/requirements.txt
    ```

### Write your component code in `src/lib/components/DashSeqaln.react.js`.

- The demo app is in `src/demo` and you will import your example component code into your demo app.
- Test your code in a Python environment:
    1. Build your code
        ```
        $ npm run build
        ```
    2. Run and modify the `usage.py` sample dash app:
        ```
        $ python usage.py
        ```
- Write tests for your component.
    - A sample test is available in `tests/test_usage.py`, it will load `usage.py` and you can then automate interactions with selenium.
    - Run the tests with `$ pytest tests`.
    - The Dash team uses these types of integration tests extensively. Browse the Dash component code on GitHub for more examples of testing (e.g. https://github.com/plotly/dash-core-components)
- Add custom styles to your component by putting your custom CSS files into your distribution folder (`dash_seqaln`).
    - Make sure that they are referenced in `MANIFEST.in` so that they get properly included when you're ready to publish your component.
    - Make sure the stylesheets are added to the `_css_dist` dict in `dash_seqaln/__init__.py` so dash will serve them automatically when the component suite is requested.
- [Review your code](./review_checklist.md)

### Create a production build and publish:

1. Build your code:
    ```
    $ npm run build
    ```
2. Create a Python distribution
    ```
    $ python setup.py sdist bdist_wheel
    ```
    This will create source and wheel distribution in the generated the `dist/` folder.
    See [PyPA](https://packaging.python.org/guides/distributing-packages-using-setuptools/#packaging-your-project)
    for more information.

3. Test your tarball by copying it into a new environment and installing it locally:
    ```
    $ pip install dash_seqaln-0.0.1.tar.gz
    ```

4. If it works, then you can publish the component to NPM and PyPI:
    1. Publish on PyPI
        ```
        $ twine upload dist/*
        ```
    2. Cleanup the dist folder (optional)
        ```
        $ rm -rf dist
        ```
    3. Publish on NPM (Optional if chosen False in `publish_on_npm`)
        ```
        $ npm publish
        ```
        _Publishing your component to NPM will make the JavaScript bundles available on the unpkg CDN. By default, Dash serves the component library's CSS and JS locally, but if you choose to publish the package to NPM you can set `serve_locally` to `False` and you may see faster load times._

5. Share your component with the community! https://community.plotly.com/c/dash
    1. Publish this repository to GitHub
    2. Tag your GitHub repository with the plotly-dash tag so that it appears here: https://github.com/topics/plotly-dash
    3. Create a post in the Dash community forum: https://community.plotly.com/c/dash
