// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "tp3--tp6" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

	//控制器替换
	let disposableController = vscode.commands.registerTextEditorCommand('tp3--tp6.controller',()=>{

		// Get the active text editor
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;

			// Get the word within the selection
			const oldContent = document.getText();
			const lineCount = document.lineCount;
			const end = new vscode.Position(lineCount + 1, 0);
			const allRange = new vscode.Range(new vscode.Position(0, 0), end);
			let newContent = oldContent;

			//正则替换
			const reList = [
				{
					're':/I\((.*?)\)/g,
					'replace': 'input($1)'
				}
				,{
					're':/S\((.*?)\)/g,
					'replace': 'cache($1)'
				}
				,{
					're':/U\((.*?)\)/g,
					'replace': 'url($1)'
				}
				,{
					're':/C\((.*?)\)/g,
					'replace': 'config($1)'
				}
				,{
					're':/E\((.*?)\)/g,
					'replace': 'abort($1)'
				}
				,{
					're':/L\((.*?)\)/g,
					'replace': 'lang($1)'
				}
				,{
					're':/^class /g,
					'replace':"use think\\facade\\Db;\nuse think\\facade\\View;\nclass "
				}
				,{
					're':/(\\Think\\)?Log::(record|write)\((.*?)\)/g,
					'replace': 'trace($3)'
				}
				,{
					're':/M\(\)->startTrans\(\)/g,
					'replace':'Db::startTrans()'
				}
				,{
					're':/M\(\)->commit\(\)/g,
					'replace':'Db::commit()'
				}
				,{
					're':/M\(\)->rollback\(\)/g,
					'replace':'Db::rollback()'
				}
				,{
					're':/M\((.*?)\)(.*?)add\((.*?)\)/g,
					'replace': 'M($1)$2insert($3)'
				}
				,{
					're':/M\((.*?)\)(.*?)save\((.*?)\)/g,
					'replace': 'M($1)$2update($3)'
				}
				,{
					're':/M\((.*?)\)(.*?)getField\(([^,]*?)\)/g,
					'replace': 'M($1)$2value($3)'
				}
				,{
					're':/M\((.*?)\)(.*?)getField\((.*?),.*?[true|TRUE].*?\)/g,
					'replace': 'M($1)$2column($3)'
				}
				,{
					're':/M\((.*?)\)(.*?)getField\((.*?)\)/g,
					'replace': 'M($1)$2column($3)'
				}
				,{
					're':/getField\(([^,]*?)\)/g,
					'replace': 'value($1)'
				}
				,{
					're':/getField\((.*?),.*?[true|TRUE].*?\)/g,
					'replace': 'column($1)'
				}
				,{
					're':/getField\((.*?)\)/g,
					'replace': 'column($1)'
				}
				,{
					're':/setField\(([^=>]*?),(.*?)\)/g,
					'replace': 'update([$1=>$2])'
				}
				,{
					're':/setField\((.*?)\)/g,
					'replace': 'update($1)'
				}
				,{
					're':/setInc\((.*?)\)/g,
					'replace': 'inc($1)->update()'
				}
				,{
					're':/setDec\((.*?)\)/g,
					'replace': 'dec($1)->update()'
				}
				,{
					're':/M\((.*?)\)/g,
					'replace': 'Db::table($1)'
				}
				,{
					're':/\$_POST\[[\'\"](.*?)[\'\"]\]/g,
					'replace': 'input(\'post.$1\')'
				}
				,{
					're':/\$_GET\[[\'\"](.*?)[\'\"]\]/g,
					'replace': 'input(\'param.$1\')'
				}
				,{
					're':/\$_REQUEST\[[\'\"](.*?)[\'\"]\]/g,
					'replace': 'input(\'param.$1\')'
				}
				,{
					're':/\$_SESSION\[[\'\"](.*?)[\'\"]\]/g,
					'replace': 'session(\'$1\')'
				}
				,{
					're':/\$_COOKIE\[[\'\"](.*?)[\'\"]\]/g,
					'replace': 'cookie(\'$1\')'
				}
				,{
					're':/\$_SERVER\[[\'\"](.*?)[\'\"]\]/g,
					'replace': 'input(\'server.$1\')'
				}
				,{
					're':/\$this->assign\((.*?)\)/g,
					'replace': 'View::assign($1)'
				}
				,{
					're':/\$this->display\((.*?)\)/g,
					'replace': 'return View::fetch($1)'
				}
				,{
					're':/\$this->ajaxReturn\((.*?)\)/g,
					'replace': 'return json($1)'
				}
			];
			reList.forEach(function(reg){
				console.log(reg);
				newContent = newContent.replace(reg['re'],reg['replace']);
			});
			editor.edit(editBuilder => {
				editBuilder.replace(allRange, newContent);
			});

			vscode.window.showInformationMessage('controller replace complete :)');
		}
	});
	context.subscriptions.push(disposableController);

	//模板替换
	let disposableTemplate = vscode.commands.registerTextEditorCommand('tp3--tp6.template',()=>{
		// Get the active text editor
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;

			// Get the word within the selection
			const oldContent = document.getText();
			const lineCount = document.lineCount;
			const end = new vscode.Position(lineCount + 1, 0);
			const allRange = new vscode.Range(new vscode.Position(0, 0), end);
			let newContent = oldContent;
			//正则替换
			const reList = [
				{
					're':/<(eq|neq|gt|egt|lt|elt|heq|nheq|notin|between|notbetween|empty|notempty|if|present|volist|switch|include|extend|block)(.*?)>/g,
					'replace': '{$1$2}'
				}
				,{
					're':/<\/(eq|neq|gt|egt|lt|elt|heq|nheq|in|notin|between|notbetween|empty|notempty|if|present|volist|switch|block)>/g,
					'replace': '{/$1}'
				}
				,{
					're':/<in\s+(.*?)>/g,
					'replace':'{in $1}',
				}
				,{
					're':/<case(.*?)>(.*?)<\/case>/gm,
					'replace': '{case$1}$2{/case}'
				}
				,{
					're':/<elseif(.*?)>/g,
					'replace': '{elseif$1/}'
				}
				,{
					're':/<(else|default)\/>/g,
					'replace': '{$1/}'
				}
				,{
					're':/<{/g,
					'replace': '{'
				}
				,{
					're':/}>/g,
					'replace': '}'
				}
				,{
					're':/:U\(/g,
					'replace': ':url('
				}
			];
			reList.forEach(function(reg){
				newContent = newContent.replace(reg['re'],reg['replace']);
			});
			editor.edit(editBuilder => {
				editBuilder.replace(allRange, newContent);
			});

			vscode.window.showInformationMessage('template replace complete :)');
		}
	});
	context.subscriptions.push(disposableTemplate);
}

// this method is called when your extension is deactivated
export function deactivate() {}
