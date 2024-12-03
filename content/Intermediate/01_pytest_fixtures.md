
# `pytest`测试框架的fixture高效使用

在笔记本电脑中使用`pytest`所需的样板。


```python
# 让我们确保安装了pytest和ipytest包
# 在Jupyter notebooks中运行pytest需要ipytest模块
import sys

!{sys.executable} -m pip install pytest
!{sys.executable} -m pip install ipytest

# 在Jupyter notebooks中运行pytest需要这些
import ipytest

ipytest.autoconfig()

import pytest
```

    Requirement already satisfied: pytest in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages
    Requirement already satisfied: py>=1.8.2 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest)
    Requirement already satisfied: iniconfig in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest)
    Requirement already satisfied: tomli>=1.0.0 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest)
    Requirement already satisfied: colorama; sys_platform == "win32" in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest)
    Requirement already satisfied: pluggy<2.0,>=0.12 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest)
    Requirement already satisfied: attrs>=19.2.0 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest)
    Requirement already satisfied: importlib-metadata>=0.12; python_version < "3.8" in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest)
    Requirement already satisfied: packaging in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest)
    Requirement already satisfied: atomicwrites>=1.0; sys_platform == "win32" in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest)
    Requirement already satisfied: typing-extensions>=3.6.4; python_version < "3.8" in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from importlib-metadata>=0.12; python_version < "3.8"->pytest)
    Requirement already satisfied: zipp>=0.5 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from importlib-metadata>=0.12; python_version < "3.8"->pytest)
    Requirement already satisfied: pyparsing!=3.0.5,>=2.0.2 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from packaging->pytest)
    

    You are using pip version 9.0.1, however version 24.3.1 is available.
    You should consider upgrading via the 'python -m pip install --upgrade pip' command.
    

    Requirement already satisfied: ipytest in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages
    Requirement already satisfied: pytest>=5.4 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from ipytest)
    Requirement already satisfied: ipython in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from ipytest)
    Requirement already satisfied: packaging in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from ipytest)
    Requirement already satisfied: atomicwrites>=1.0; sys_platform == "win32" in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest>=5.4->ipytest)
    Requirement already satisfied: importlib-metadata>=0.12; python_version < "3.8" in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest>=5.4->ipytest)
    Requirement already satisfied: colorama; sys_platform == "win32" in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest>=5.4->ipytest)
    Requirement already satisfied: py>=1.8.2 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest>=5.4->ipytest)
    Requirement already satisfied: pluggy<2.0,>=0.12 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest>=5.4->ipytest)
    Requirement already satisfied: iniconfig in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest>=5.4->ipytest)
    Requirement already satisfied: attrs>=19.2.0 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest>=5.4->ipytest)
    Requirement already satisfied: tomli>=1.0.0 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from pytest>=5.4->ipytest)
    Requirement already satisfied: pyparsing!=3.0.5,>=2.0.2 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from packaging->ipytest)
    Requirement already satisfied: typing-extensions>=3.6.4; python_version < "3.8" in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from importlib-metadata>=0.12; python_version < "3.8"->pytest>=5.4->ipytest)
    Requirement already satisfied: zipp>=0.5 in c:\users\konghou\miniconda3\envs\jupyter\lib\site-packages (from importlib-metadata>=0.12; python_version < "3.8"->pytest>=5.4->ipytest)
    

    You are using pip version 9.0.1, however version 24.3.1 is available.
    You should consider upgrading via the 'python -m pip install --upgrade pip' command.
    

## fixtures参数化
与使用`pytest.mark.parameterize`参数化测试函数类似，您也可以参数化fixtures:


```python
PATHS = ["/foo/bar.txt", "/bar/baz.txt"]


@pytest.fixture(params=PATHS)
def executable(request):
    return request.param
```


```python
%%ipytest -s

def test_something_with_executable(executable):
    print(executable)
```

    /foo/bar.txt
    [32m.[0m/bar/baz.txt
    [32m.[0m
    [32m[32m[1m2 passed[0m[32m in 0.01s[0m[0m
    

## [`pytest.mark.usefixtures`](https://docs.pytest.org/en/latest/fixture.html#usefixtures)
[`pytest.mark.usefixtures`](https://docs.pytest.org/en/latest/fixture.html#usefixtures) 非常有用，特别是当您想在一组测试中使用某个fixture，但不需要fixture的返回值时。


```python
%%ipytest -s


@pytest.fixture
def my_fixture():
    print("\nmy_fixture is used")
  

@pytest.fixture
def other_fixture():
    return "FOO"


@pytest.mark.usefixtures('my_fixture')
class TestMyStuff:
    def test_somestuff(self):
        pass
    
    def test_some_other_stuff(self, other_fixture):
        print(f'here we use also other_fixture which returns: {other_fixture}')
```

    
    my_fixture is used
    [32m.[0m
    my_fixture is used
    here we use also other_fixture which returns: FOO
    [32m.[0m
    [32m[32m[1m2 passed[0m[32m in 0.02s[0m[0m
    

## `pytest` [内置 fixtures](https://docs.pytest.org/en/latest/builtin.html#pytest-api-and-builtin-fixtures)
这里有几个有用的内置fixtures的示例，您可以通过运行`pytest --fixtures`来查看所有可用的fixtures。

### [`monkeypatch（猴子补丁）`](https://docs.pytest.org/en/latest/reference.html#_pytest.monkeypatch.MonkeyPatch)
内置[`monkeypatch`](https://docs.pytest.org/en/latest/reference.html#_pytest.monkeypatch.MonkeyPatch) fixture允许您设置环境变量和设置/删除对象的属性。用例类似于使用patching/mocking进行补丁/模拟。 `unittest.mock.patch`/`unittest.mock.MagicMock` 是Python标准库的一部分。

**Monkey匹配环境变量：**


```python
import os


def get_env_var_or_none(var_name):
    return os.environ.get(var_name, None)
```


```python
%%ipytest -s

def test_get_env_var_or_none_with_valid_env_var(monkeypatch):
    monkeypatch.setenv('MY_ENV_VAR', 'secret')
    res = get_env_var_or_none('MY_ENV_VAR')
    assert res == 'secret'
    
def test_get_env_var_or_none_with_missing_env_var():
    res = get_env_var_or_none('NOT_EXISTING')
    assert res is None
```

    [32m.[0m[32m.[0m
    [32m[32m[1m2 passed[0m[32m in 0.03s[0m[0m
    

**Monkeypatching 属性:**


```python
class SomeClass:
    some_value = "some value"

    @staticmethod
    def tell_the_truth():
        print("This is the original truth")
```


```python
def fake_truth():
    print("This is modified truth")


@pytest.fixture
def fake_some_class(monkeypatch):
    monkeypatch.setattr("__main__.SomeClass.some_value", "fake value")
    monkeypatch.setattr("__main__.SomeClass.tell_the_truth", fake_truth)
```


```python
%%ipytest -s

def test_some_class(fake_some_class):
    print(SomeClass.some_value)
    SomeClass.tell_the_truth()
```

    fake value
    This is modified truth
    [32m.[0m
    [32m[32m[1m1 passed[0m[32m in 0.01s[0m[0m
    

### [`tmpdir`](https://docs.pytest.org/en/latest/tmpdir.html#the-tmpdir-fixture)
[`tmpdir`](https://docs.pytest.org/en/latest/tmpdir.html#the-tmpdir-fixture) fixture 提供创建临时文件和目录的功能。


```python
def word_count_of_txt_file(file_path):
    with open(file_path) as f:
        content = f.read()
        return len(content.split())
```


```python
%%ipytest -s

def test_word_count(tmpdir):
    test_file = tmpdir.join('test.txt')
    test_file.write('This is example content of seven words')
    res = word_count_of_txt_file(str(test_file)) # str返回路径
    assert res == 7
```

    [32m.[0m
    [32m[32m[1m1 passed[0m[32m in 0.02s[0m[0m
    

## Fixture 作用范围


```python
@pytest.fixture(scope="function")
def func_fixture():
    print("\nfunc")


@pytest.fixture(scope="module")
def module_fixture():
    print("\nmodule")


@pytest.fixture(scope="session")
def session_fixture():
    print("\nsession")
```


```python
%%ipytest -s

def test_something(func_fixture, module_fixture, session_fixture):
    pass

def test_something_else(func_fixture, module_fixture, session_fixture):
    pass
```

    
    session
    
    module
    
    func
    [32m.[0m
    func
    [32m.[0m
    [32m[32m[1m2 passed[0m[32m in 0.01s[0m[0m
    

## 前置-后置行为


```python
@pytest.fixture
def some_fixture():
    print("some_fixture is run now")
    yield "some magical value"
    print("\nthis will be run after test execution, you can do e.g. some clean up here")
```


```python
%%ipytest -s

def test_something(some_fixture):
    print('running test_something')
    assert some_fixture == 'some magical value'
    print('test ends here')
```

    some_fixture is run now
    running test_something
    test ends here
    [32m.[0m
    this will be run after test execution, you can do e.g. some clean up here
    
    [32m[32m[1m1 passed[0m[32m in 0.01s[0m[0m
    

## 自动使用 fixtures


```python
@pytest.fixture(autouse=True)
def my_fixture():
    print("\nusing my_fixture")
```


```python
%%ipytest -s

def test_1():
    pass
    
def test_2():
    pass
```

    
    using my_fixture
    [32m.[0m
    using my_fixture
    [32m.[0m
    [32m[32m[1m2 passed[0m[32m in 0.01s[0m[0m
    
