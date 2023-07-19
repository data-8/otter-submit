import { JupyterFrontEndPlugin, JupyterFrontEnd } from '@jupyterlab/application';
import { INotebookTracker } from '@jupyterlab/notebook';

/**
 * The plugin registration information.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: '@otter-submit/submit-button:plugin',
  description:
    'A JupyterLab extension used to submit notebooks for grading to otter-service.',
  autoStart: true,
  requires: [INotebookTracker],
  activate: (app: JupyterFrontEnd, notebookTracker: INotebookTracker) => {
    // Nothing is needed
    const { commands } = app;

    const command = 'otter-submit:submit';
    var nbpanel : any;
    notebookTracker.currentChanged.connect((tracker, panel) => {
      nbpanel = panel
    })
    // Add a command
    commands.addCommand(command, {
      label: 'Submit for Grading',
      caption: 'Send your notebook to be graded',
      execute: (args: any) => {
        var nb = nbpanel?.context.model.toJSON();

        var payload = JSON.stringify({'nb': nb});
        var otherParam = {
          headers: {"Content-Type": "application/json"},
          body: payload,
          method: "POST"
        };
        
        fetch('/services/gofer_nb/', otherParam)
          // processes the response (in this case grabs text)
          .then(response=>{return response.text()})
          // processes the output of previous line (calling it data, then doing something with it)
          .then(data=>{console.log( data); alert(data)});

      }
    });
  }
};


/**
 * Export the plugin as default.
 */
export default plugin;
