import { JupyterFrontEndPlugin, JupyterFrontEnd } from '@jupyterlab/application';
import { showDialog, Dialog } from '@jupyterlab/apputils';
import { INotebookTracker } from '@jupyterlab/notebook';
import { fileUploadIcon } from '@jupyterlab/ui-components';

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
    const { commands } = app;
    const command = 'otter-submit:submit';
    var nbpanel: any;
    notebookTracker.currentChanged.connect((_tracker, panel) => {
      nbpanel = panel;
    });

    // Add a command
    commands.addCommand(command, {
      label: 'Submit for Grading',
      icon: fileUploadIcon,
      iconLabel: 'Submit for Grading',
      caption: 'Send your notebook to be graded',
      execute: (_args: any) => {
        var nb = nbpanel?.context.model.toJSON();

        var payload = JSON.stringify({ nb: nb });
        var otherParam = {
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          method: 'POST'
        };

        // Show confirmation immediately — grading is asynchronous so there is
        // no need to wait for the server response before informing the student.
        showDialog({
          title: 'Notebook Submitted for Grading',
          body: 'Your notebook has been submitted for grading. Your grade will appear in edX within 10 minutes. If you do not see your grade, please post in the Discussion Board.',
          buttons: [Dialog.okButton({ label: 'OK' })]
        });

        // Fire and forget — submit runs in the background.
        // If the request fails the grade will not appear in edX;
        // the student should resubmit or post in the Discussion Board.
        fetch('/services/otter_grade/', otherParam).catch(err =>
          console.error('otter-submit: submission error', err)
        );
      }
    });
  }
};


/**
 * Export the plugin as default.
 */
export default plugin;
