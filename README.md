# Otter Submit

This JupyterLab extension places a "Submit" button in the Jupyter Notebook header. The submit button is used to submit a notebook to otter-service for grading.

## Development
Create your environment however you like:
- mamba create -n otter-submit -c conda-forge python==3.11
- mamba activate otter-submit

Make changes and run these commands:
- python3 -m pip install -ve .
- jlpm run build
- jupyter lab

