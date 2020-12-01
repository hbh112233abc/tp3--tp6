# tp3--tp6 README

VSCODE ThinkPHP 版本3到版本6的迁移小助手.

## 功能

1. 控制器php文件的匹配替换

> php编辑界面->右键菜单->tp3-tp6 控制器替换

|tp3|tp6|
|-|-|
|I|input|
|S|cache|
|U|url|
|C|config|
|E|abort|
|L|lang|
|Log|trace|
|M()->...->add()|insert|
|M()->...->save()|update|
|getField()|value/column|
|setField|update|
|setInc|inc()->update()|
|setDec|dec()->update()|
|M|Db::table|
|$_GET['xx']|input('param.xx')|
|$_POST['xx']|input('post.xx')|
|$_REQUEST['xx']|input('param.xx')|
|$_SESSION['xx']|session('xx')|
|$_COOKIE['xx']|cookie('xx')|
|$_SERVER['xx']|input('server.xx')|
|$this->assign|View::assign|
|$this->display|return View::fetch|

2. 模板html文件的匹配替换

> html编辑界面->右键菜单->tp3-tp6 模板替换

模板标签替换:
- eq
- neq
- gt
- egt
- lt
- elt
- heq
- nheq
- in
- notin
- between
- notbetween
- empty
- notempty
- present
- volist
- switch
- case
- default
- if
- elseif
- else
- include
- extend
- block
- <{
- }>
- {:U()}

> 如果有想要的功能可以给我反馈,谢谢!
