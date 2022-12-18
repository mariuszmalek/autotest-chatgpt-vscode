import * as vscode from 'vscode';
import { ChatGPTAPIBrowser } from 'chatgpt';

export function activate(context: vscode.ExtensionContext) {
  // Create a command that generates unit tests using ChatGPT
  let disposable = vscode.commands.registerCommand(
    'extension.generateUnitTests',
    async () => {
      // Get the current editor
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage('No active editor');
        return;
      }
      
      // Prompt the user for input (e.g. the name of a class or function to create a unit test for)
      const input = await vscode.window.showInputBox({
        placeHolder: 'Enter the name of a class or function',
      });

      // Use ChatGPT to generate the unit test code
      const api = new ChatGPTAPIBrowser({
        email: '',//process.env.OPENAI_EMAIL,
        password: ''//process.env.OPENAI_PASSWORD
      })
      await api.initSession()
      
      const result = await api.sendMessage(`Write a unit test for ${input}`)
      // console.log(result.response)
      // const unitTestCode = response.data.replies[0];
      vscode.workspace.openTextDocument({ language: 'typescript' }).then((doc) => {
        const edit = new vscode.WorkspaceEdit();
        edit.insert(doc.uri, new vscode.Position(0, 0), result.response);
        vscode.workspace.applyEdit(edit);
      });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}