import { window, workspace, commands, ExtensionContext, WorkspaceEdit, Uri } from 'vscode';
import { ChatGPTAPIBrowser } from 'chatgpt';

export function activate(context: ExtensionContext) {
  // Create a command that generates unit tests using ChatGPT
  const disposable = commands.registerCommand(
    'extension.generateUnitTests',
    async () => {
      // Get the current editor
      const editor = window.activeTextEditor;
      if (!editor) {
        window.showErrorMessage('No active editor');
        return;
      }
      
      // Prompt the user for input (e.g. the name of a class or function to create a unit test for)
      const input = await window.showInputBox({
        placeHolder: 'Enter the name of a class or function',
      });

      if (!input) {
        return;
      }

      try {
        // Use ChatGPT to generate the unit test code
        const api = new ChatGPTAPIBrowser({
          email: process.env.OPENAI_EMAIL || '',
          password: process.env.OPENAI_PASSWORD || ''
        });
        await api.initSession();
        const result = await api.sendMessage(`Write a unit test for ${input}`);
        
        // Insert the generated unit test code at the beginning of a new Typescript file
        const doc = await workspace.openTextDocument({ language: 'typescript' });
        const edit = new WorkspaceEdit();
        edit.insert(doc.uri, new Uri().with({ scheme: 'untitled', path: 'test.ts' }), result.response);
        workspace.applyEdit(edit);
        window.showInformationMessage(`Unit test for ${input} generated successfully`);
      } catch (error) {
        window.showErrorMessage(`Error generating unit test: ${error.message}`);
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
