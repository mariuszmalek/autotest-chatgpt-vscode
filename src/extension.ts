import * as openai from 'openai';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  // Create a command that generates unit tests using ChatGPT
  let disposable = vscode.commands.registerCommand(
    'extension.generateUnitTests',
    async () => {
      // Prompt the user for input (e.g. the name of a class or function to create a unit test for)
      const input = await vscode.window.showInputBox({
        placeHolder: 'Enter the name of a class or function',
      });

      // Use ChatGPT to generate the unit test code
      openai.api.engine(
        'chatbot',
        {
          prompt: `Write a unit test for ${input}`,
        },
        (error, response) => {
          // Handle errors
          if (error) {
            vscode.window.showErrorMessage(error.message);
            return;
          }

          // Get the generated unit test code
          const unitTestCode = response.data.replies[0];

          // Create a new file and write the unit test code to it
          vscode.workspace.openTextDocument({ language: 'typescript' }).then((doc) => {
            const edit = new vscode.WorkspaceEdit();
            edit.insert(doc.uri, new vscode.Position(0, 0), unitTestCode);
            vscode.workspace.applyEdit(edit);
          });
        }
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}