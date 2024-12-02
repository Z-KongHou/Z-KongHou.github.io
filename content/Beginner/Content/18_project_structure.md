
# 项目结构

## Python 脚本
Python 是一种非常适合构建各种任务的小型辅助工具的语言。这类小工具通常可以用一个单独的 Python 脚本来表达。

以下是 Python 脚本（即可执行的 Python 模块）的示例结构。


```python
# the content of my_script.py

# imports
import logging

# constants
LOGGER = logging.getLogger()


def magical_function():
    LOGGER.warning("We are about to do some magical stuff")


def main():
    # The actual logic of the script
    magical_function()


if __name__ == "__main__":
    main()
```

    We are about to do some magical stuff
    

## Python 包
一个 Python 项目的示例结构：




```python
my_project/
    README.md
    requirements.txt
    setup.py
    
    src/
        my_project/
            __init__.py
            my_module.py
            other_module.py
            
            my_pkg1/
                __init__.py
                my_third_module.py
                
    tests/
        conftest.py
        test_module.py
        test_other_module.py
        
        my_pkg1/
            test_my_third_module.py
```


      File "<ipython-input-2-c0d928e0f8f2>", line 1
        my_project/
                   ^
    SyntaxError: invalid syntax
    


* [requirements.txt](https://pip.pypa.io/en/latest/user_guide/#requirements-files) 列出了 `my_project` 所依赖的 Python 包。
    * 这些包可以通过运行 `pip install -r requirements.txt` 来安装。
* [setup.py](https://packaging.python.org/tutorials/distributing-packages/#setup-py) 这是一个用于包含有关项目的相关信息的文件，同时该文件也用于打包你的项目。以下是一个最小的 `setup.py` 示例：


```python
```python
'''Minimal setup.py file'''

from setuptools import setup, find_packages

setup(
    name='my_project',
    version='0.1',
    packages=find_packages(where="src"),
    package_dir={"": "src"})
```
```


      File "<ipython-input-3-8c82ba350c5d>", line 1
        ```python
        ^
    SyntaxError: invalid syntax
    


* 一旦你在项目中准备好 `setup.py` 文件，就可以通过在项目根目录中运行 `pip install -e` . 以可编辑模式安装你的项目。在可编辑模式下，当你对源代码文件进行更改时，安装的版本会自动更新。
