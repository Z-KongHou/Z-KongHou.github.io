
#  [pytest测试](https://docs.pytest.org/en/latest/) - 第1部分

## 为什么要写测试？
* 谁想进行手动测试？
* 当你修复一个bug或添加一个新功能时，测试是一种验证你在修复或添加的过程中没有破坏任何代码功能的方法
* 如果你有明确的要求，你可以为每个要求进行匹配测试
* 你不必害怕重新编写代码
* 测试记录了你的用例实现——它们向其他人展示了你实现的用例
* 这份列表是无尽的。。。

## [测试驱动开发](https://en.wikipedia.org/wiki/Test-driven_development)(又叫做TDD)
简而言之，TDD的基本思想是在编写实际实现之前编写测试。也许这种方法最显著的好处是开发人员专注于编写与程序应该做的事情相匹配的测试。然而，如果测试是在实际实现之后编写的，那么匆忙测试的风险很高，因为这只会为已经编写的逻辑开绿灯。

测试是现代敏捷软件开发中的一流公民，这就是为什么在Python学习过程中尽早开始考虑TDD很重要。

TDD的工作流程可以概括如下：
1. 为您要实现的更改/功能/错误修复添加测试用例
2. 运行所有测试并检查新测试是否失败
3. 执行所需的更改
4. 运行测试并验证所有测试均通过
5. 重构

### 在notebooks中运行pytest
这些是在Jupyter单元格内运行pytest所需的步骤。您可以将此单元格的内容复制到包含测试的notebook顶部。


```python
# 让我们确保安装了pytest和ipytest包
# 在Jupyter notebooks中运行pytest需要ipytest
import sys

!{sys.executable} -m pip install pytest
!{sys.executable} -m pip install ipytest

# 在Jupyter notebooks中运行pytest需要这些
import ipytest

ipytest.autoconfig()
```

    Requirement already satisfied: pytest in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages
    Requirement already satisfied: colorama; sys_platform == "win32" in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest)
    Requirement already satisfied: tomli>=1.0.0 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest)
    Requirement already satisfied: pluggy<2.0,>=0.12 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest)
    Requirement already satisfied: atomicwrites>=1.0; sys_platform == "win32" in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest)
    Requirement already satisfied: iniconfig in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest)
    Requirement already satisfied: attrs>=19.2.0 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest)
    Requirement already satisfied: importlib-metadata>=0.12; python_version < "3.8" in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest)
    Requirement already satisfied: packaging in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest)
    Requirement already satisfied: py>=1.8.2 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest)
    Requirement already satisfied: typing-extensions>=3.6.4; python_version < "3.8" in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from importlib-metadata>=0.12; python_version < "3.8"->pytest)
    Requirement already satisfied: zipp>=0.5 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from importlib-metadata>=0.12; python_version < "3.8"->pytest)
    Requirement already satisfied: pyparsing!=3.0.5,>=2.0.2 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from packaging->pytest)
    

    You are using pip version 9.0.1, however version 24.3.1 is available.
    You should consider upgrading via the 'python -m pip install --upgrade pip' command.
    

    Collecting ipytest
      Downloading https://files.pythonhosted.org/packages/6d/7e/7a48f3322ebe9d3a79d27ee443657d18b6c378cd0b621e9e4ced6016f0e1/ipytest-0.13.1-py3-none-any.whl
      Requirement already satisfied (use --upgrade to upgrade): ipytest from https://files.pythonhosted.org/packages/6d/7e/7a48f3322ebe9d3a79d27ee443657d18b6c378cd0b621e9e4ced6016f0e1/ipytest-0.13.1-py3-none-any.whl#sha256=b661cbe4a8d3f52cd9460141b939a343fd2aab037be694386e4cb5bfb7564279 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages
    Requirement already satisfied: pytest>=5.4 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from ipytest)
    Requirement already satisfied: packaging in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from ipytest)
    Requirement already satisfied: ipython in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from ipytest)
    Requirement already satisfied: iniconfig in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest>=5.4->ipytest)
    Requirement already satisfied: atomicwrites>=1.0; sys_platform == "win32" in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest>=5.4->ipytest)
    Requirement already satisfied: pluggy<2.0,>=0.12 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest>=5.4->ipytest)
    Requirement already satisfied: attrs>=19.2.0 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest>=5.4->ipytest)
    Requirement already satisfied: tomli>=1.0.0 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest>=5.4->ipytest)
    Requirement already satisfied: py>=1.8.2 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest>=5.4->ipytest)
    Requirement already satisfied: importlib-metadata>=0.12; python_version < "3.8" in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest>=5.4->ipytest)
    Requirement already satisfied: colorama; sys_platform == "win32" in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest>=5.4->ipytest)
    Requirement already satisfied: pyparsing!=3.0.5,>=2.0.2 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from packaging->ipytest)
    Requirement already satisfied: zipp>=0.5 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from importlib-metadata>=0.12; python_version < "3.8"->pytest>=5.4->ipytest)
    Requirement already satisfied: typing-extensions>=3.6.4; python_version < "3.8" in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from importlib-metadata>=0.12; python_version < "3.8"->pytest>=5.4->ipytest)
    

    You are using pip version 9.0.1, however version 24.3.1 is available.
    You should consider upgrading via the 'python -m pip install --upgrade pip' command.
    

## `pytest`测试用例
让我们考虑一下，我们有一个名为`sum_of_three_numbers`的函数，我们想为它编写一个测试。


```python
def sum_of_three_numbers(num1, num2, num3):
    return num1 + num2 + num3
```

Pytest测试用例实际上与您在练习中看到的非常相似。大多数练习的结构类似于pytest测试用例，将每个练习分为三个单元：
1. 设置测试中使用的变量
2. 你的执行
3. 通过使用断言来验证您的实现是否符合要求

请参阅下面的示例测试用例，了解练习和测试用例常见结构之间的相似之处。


```python
%%ipytest

def test_sum_of_three_numbers():
    # 1. 设置测试中使用的变量
    num1 = 2
    num2 = 3
    num3 = 5
    
    # 2. 调用要测试的功能
    result = sum_of_three_numbers(num1, num2, num3)
    
    # 3. 验证结果是否符合预期
    assert result == 10
```

    [32m.[0m[32m                                                                                            [100%][0m
    [32m[32m[1m1 passed[0m[32m in 0.01s[0m[0m
    

现在继续更改`assert result == 10`这一行，使断言无法看到失败测试的输出。
