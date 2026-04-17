"""
Otter Submit - A JupyterLab extension for submitting notebooks for grading.
"""
from ._version import __version__

__all__ = ["__version__"]


def _jupyter_labextension_paths():
    """Called by JupyterLab to get the location of the labextension."""
    return [{
        "src": "labextension",
        "dest": "@otter-submit/submit-button"
    }]
