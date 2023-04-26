import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  // Register the generateUnitTests command
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
        email: process.env.OPENAI_EMAIL || '',
        password: process.env.OPENAI_PASSWORD || ''
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

  // Register the showFunctions command
  disposable = vscode.commands.registerCommand('extension.showFunctions', () => {
    // Call the function to get all the functions
    const functions = getAllFunctions();

    // Show the functions in a message box
    vscode.window.showInformationMessage(
      `Found ${functions.length} functions:\n${functions.join('\n')}`
    );

    // Alternatively, log the functions to the output channel
    const outputChannel = vscode.window.createOutputChannel('Functions');
    outputChannel.show();
    outputChannel.appendLine(`Found ${functions.length} functions:`);
    functions.forEach((fn) => outputChannel.appendLine(fn));
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}

function getAllFunctions(): string[] {
  const functionRegex = /function\s+(\w+)\s*\(/gm;
  const functions: string[] = [];

  vscode.workspace.textDocuments.forEach((document) => {
    const text = document.getText();
    let match;

    while ((match = functionRegex.exec(text))) {
      functions.push(match[1]);
    }
  });

  return functions;
}
