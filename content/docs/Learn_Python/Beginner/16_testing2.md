
# 使用[pytest](https://docs.pytest.org/en/latest/)进行测试 - part 2


```python
# 确保安装 pytest 和 ipytest 包
# ipytest 是在 Jupyter Notebook 中运行 pytest 所必需的包。
import sys

!{sys.executable} -m pip install pytest
!{sys.executable} -m pip install ipytest

# 要在 Jupyter Notebook 中进行测试，您需要确保这两个包都已安装。
import ipytest

ipytest.autoconfig()
```

    Requirement already satisfied: pytest in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages
    Requirement already satisfied: importlib-metadata>=0.12; python_version < "3.8" in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest)
    Requirement already satisfied: colorama; sys_platform == "win32" in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest)
    Requirement already satisfied: atomicwrites>=1.0; sys_platform == "win32" in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest)
    Requirement already satisfied: packaging in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest)
    Requirement already satisfied: py>=1.8.2 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest)
    Requirement already satisfied: iniconfig in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest)
    Requirement already satisfied: pluggy<2.0,>=0.12 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest)
    Requirement already satisfied: tomli>=1.0.0 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest)
    Requirement already satisfied: attrs>=19.2.0 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest)
    Requirement already satisfied: zipp>=0.5 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from importlib-metadata>=0.12; python_version < "3.8"->pytest)
    Requirement already satisfied: typing-extensions>=3.6.4; python_version < "3.8" in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from importlib-metadata>=0.12; python_version < "3.8"->pytest)
    Requirement already satisfied: pyparsing!=3.0.5,>=2.0.2 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from packaging->pytest)
    

    You are using pip version 9.0.1, however version 24.3.1 is available.
    You should consider upgrading via the 'python -m pip install --upgrade pip' command.
    

    Collecting ipytest
      Downloading https://files.pythonhosted.org/packages/6d/7e/7a48f3322ebe9d3a79d27ee443657d18b6c378cd0b621e9e4ced6016f0e1/ipytest-0.13.1-py3-none-any.whl
    Requirement already satisfied: ipython in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from ipytest)
    Requirement already satisfied: pytest>=5.4 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from ipytest)
    Requirement already satisfied: packaging in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from ipytest)
    Requirement already satisfied: tomli>=1.0.0 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest>=5.4->ipytest)
    Requirement already satisfied: importlib-metadata>=0.12; python_version < "3.8" in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest>=5.4->ipytest)
    Requirement already satisfied: attrs>=19.2.0 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest>=5.4->ipytest)
    Requirement already satisfied: atomicwrites>=1.0; sys_platform == "win32" in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest>=5.4->ipytest)
    Requirement already satisfied: pluggy<2.0,>=0.12 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest>=5.4->ipytest)
    Requirement already satisfied: colorama; sys_platform == "win32" in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest>=5.4->ipytest)
    Requirement already satisfied: iniconfig in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest>=5.4->ipytest)
    Requirement already satisfied: py>=1.8.2 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest>=5.4->ipytest)
    Requirement already satisfied: pyparsing!=3.0.5,>=2.0.2 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from packaging->ipytest)
    Requirement already satisfied: typing-extensions>=3.6.4; python_version < "3.8" in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from importlib-metadata>=0.12; python_version < "3.8"->pytest>=5.4->ipytest)
    Requirement already satisfied: zipp>=0.5 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from importlib-metadata>=0.12; python_version < "3.8"->pytest>=5.4->ipytest)
    Installing collected packages: ipytest
    Successfully installed ipytest-0.13.1
    

    You are using pip version 9.0.1, however version 24.3.1 is available.
    You should consider upgrading via the 'python -m pip install --upgrade pip' command.
    

## [`@pytest.fixture`](https://docs.pytest.org/en/latest/fixture.html#pytest-fixtures-explicit-modular-scalable)
让我们考虑我们有一个要测试的 Person 类的实现。


```python
class Person:
    def __init__(self, first_name, last_name, age):
        self.first_name = first_name
        self.last_name = last_name
        self.age = age

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    @property
    def as_dict(self):
        return {"name": self.full_name, "age": self.age}

    def increase_age(self, years):
        if years < 0:
            raise ValueError("Can not make people younger :(")
        self.age += years
```

您可以通过使用 `pytest fixture`轻松创建可重用的测试代码。如果您在 [_conftest.py_](https://docs.pytest.org/en/latest/fixture.html#conftest-py-sharing-fixture-functions)中引入`fixture`, 该`fixtures`对您所有的测试用例都是可用的。通常，`conftest.py` 的位置在您的测试目录的根部。


```python
import pytest


@pytest.fixture()
def default_person():
    person = Person(first_name="John", last_name="Doe", age=82)
    return person
```

然后您可以在实际测试用例中利用 `default_person` 装饰器。


```python
%%ipytest


def test_full_name(default_person): # Note: 我们将fixture作为测试用例的参数。
    result = default_person.full_name
    assert result == 'John Doe'
    
    
def test_as_dict(default_person):
    expected = {'name': 'John Doe', 'age': 82}
    result = default_person.as_dict
    assert result == expected
    
    
def test_increase_age(default_person):
    default_person.increase_age(1)
    assert default_person.age == 83
    
    default_person.increase_age(10)
    assert default_person.age == 93
    
    
def test_increase_age_with_negative_number(default_person):
    with pytest.raises(ValueError):
        default_person.increase_age(-1)
```

    [32m.[0m[32m.[0m[32m.[0m[32m.[0m[32m                                                                                         [100%][0m
    [32m[32m[1m4 passed[0m[32m in 0.01s[0m[0m
    

通过使用fixture，我们可以在所有四个测试用例中使用相同的 default_person！

在 `test_increase_age_with_negative_number` 测试中，我们使用  [`pytest.raises`](https://docs.pytest.org/en/latest/assert.html#assertions-about-expected-exceptions) 来验证是否引发了异常。

## [`@pytest.mark.parametrize`](https://docs.pytest.org/en/latest/parametrize.html#pytest-mark-parametrize-parametrizing-test-functions)
有时您想用多个不同的输入测试相同的功能。`pytest.mark.parametrize` 是您定义多个不同输入及其预期输出的解决方案。让我们考虑以下 `replace_names` 函数的实现。 


```python
def replace_names(original_str, new_name):
    """用 new_name 替换 original_str 中的名字（大写单词）。"""
    words = original_str.split()
    manipulated_words = [new_name if w.istitle() else w for w in words]
    return " ".join(manipulated_words)
```

我们可以通过使用 `pytest.mark.parametrize` 用多个输入测试 `replace_names` 函数。


```python
%%ipytest


@pytest.mark.parametrize("original,new_name,expected", [
        ('this is Lisa', 'John Doe', 'this is John Doe'),
        ('how about Frank and Amy', 'John', 'how about John and John'),
        ('no names here', 'John Doe', 'no names here'),
    ])
def test_replace_names(original, new_name, expected):
    result = replace_names(original, new_name)
    assert result == expected
```

    [32m.[0m[32m.[0m[32m.[0m[32m                                                                                          [100%][0m
    [32m[32m[1m3 passed[0m[32m in 0.01s[0m[0m
    
