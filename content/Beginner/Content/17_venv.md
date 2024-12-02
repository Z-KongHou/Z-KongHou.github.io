
# 虚拟环境
在进行 Python 项目时，最佳实践是为每个项目创建一个单独的虚拟环境。 

每个虚拟环境都有其自己的 Python 二进制文件。当您将某个 Python 包安装到虚拟环境中时，它只会安装到该特定环境中。这意味着您可以在同一台机器上的不同虚拟环境中拥有同一个 Python 包的不同版本。如果您的项目需要使用不同的 Python 版本，虚拟环境也非常有用。

## [`venv`](https://docs.python.org/3/library/venv.html#module-venv)

#### 创建新的虚拟环境
您可以将所有虚拟环境创建到一个单独的目录中（例如，在您的主目录下创建一个 `.virtualenvs` 目录）。这样更容易找到它们。

`python3 -m venv /path/to/new/environment`

或者

`path/to/your/python -m venv /path/to/new/environment`

#### 激活虚拟环境

Windows: `path_to_virtual_env\Scripts\activate.bat`<br/>
Posix: `source path_to_virtual_env/bin/activate`

#### 安装包
在激活新创建的虚拟环境后，您可以使用 pip 安装新的包。例如，如果您想安装 pytest，可以使用以下命令：

`python -m pip install pytest`

该包将被安装到 `path_to_virtual_env/lib/<python_version>/site-packages` 目录下。请注意，`site-packages` 的路径可能会因您使用的操作系统而略有不同。

您可以通过运行以下命令来列出已安装的包及其版本：

`python -m pip freeze`
