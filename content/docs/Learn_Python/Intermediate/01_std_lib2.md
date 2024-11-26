
# [Python标准库](https://docs.python.org/3/library/#the-python-standard-library)的优点

## [`json`](https://docs.python.org/3/library/json.html#module-json) 用于编码和解码 JSON
因为现在网络上充斥着JSON，xml的好日子已经一去不复返了。


```python
data = {"b": True, "a": 1, "nested": {"foo": "bar"}, "c": None, "some_list": [1, 2, 3]}
```

### 编码


```python
import json

json_data = json.dumps(data)
print(f"type: {type(json_data)} data: {json_data}")
```

    type: <class 'str'> data: {"b": true, "a": 1, "nested": {"foo": "bar"}, "c": null, "some_list": [1, 2, 3]}
    

### 解码


```python
decoded = json.loads(json_data)
print(f"type: {type(decoded)} data: {decoded}")
```

    type: <class 'dict'> data: {'b': True, 'a': 1, 'nested': {'foo': 'bar'}, 'c': None, 'some_list': [1, 2, 3]}
    

## [`unittest.mock`](https://docs.python.org/3/library/unittest.mock.html#module-unittest.mock)模块
尽管`pytest`是首选的测试框架，但`unittest.mock`模块提供了一些在pytest测试用例中也很有用的东西。模拟和修补通常用于“伪造”被测软件逻辑/状态的某些部分。例如，常见的用例是修补与第三方交互的代码部分（例如一些web服务）。

### [`MagicMock`](https://docs.python.org/3/library/unittest.mock.html#unittest.mock.MagicMock)

一般来说，[Mocks](https://en.wikipedia.org/wiki/Mock_object)是以受控方式替换现实世界对象的功能/状态的模拟对象。因此，它们在模拟被测实现特定部分的某些行为的测试中特别有用。

Python标准库中还有一个[`Mock`](https://docs.python.org/3/library/unittest.mock.html#unittest.mock.Mock)类，但您通常希望使用`Mock`的子类[`MagicMock`](https://docs.python.org/3/library/unittest.mock.html#unittest.mock.MagicMock)。`MagicMock`为大多数魔术方法提供了默认实现(例如`__setitem__()`和`__getitem__()`)

一个潜在的用例可能是这样的：


```python
import random


class Client:
    def __init__(self, url, username, password):
        self.url = url
        self.creds = (username, password)

    def fetch_some_data(self):
        print(
            "例如，在这里，我们可以从第三方API获取数据并返回数据。"
        )
        print("Now we will just return some random number between 1-100.")
        return random.randint(1, 100)


class MyApplication:
    def __init__(self):
        self.client = Client(
            url="https://somewhere/api", username="John Doe", password="secret123?"
        )

    def do_something_fancy(self):
        data = self.client.fetch_some_data()
        return data ** (1 / 2)  # 举个例子，让我们返回一个平方根


####################
# 在测试模块中：

from unittest.mock import MagicMock

# 在测试用例中：
app = MyApplication()
app.client = MagicMock()  # 模拟客户
app.client.fetch_some_data.return_value = 4  # 设置受控行为
result = app.do_something_fancy()
assert result == 2
print("All good, woop woop!")
```

    All good, woop woop!
    

### [`patch`](https://docs.python.org/3/library/unittest.mock.html#unittest.mock.patch)（补丁）
[`patch`](https://docs.python.org/3/library/unittest.mock.html#unittest.mock.patch)的用例与`MacigMock`非常相似。最大的区别是`patch`被用作上下文管理器或装饰器。 要修补的对象作为`补丁`的参数给出。此外，您可以提供额外的对象作为第二个参数(`new`)，它将替换原始参数。如果省略了`new`，默认情况下将使用`MagicMock`。

让我们看看上面的例子在使用`patch`的情况下会是什么样子。


```python
# 在测试模块中：

from unittest.mock import patch

# 在测试用例中：
app = MyApplication()
with patch("__main__.app.client") as patched_client:  # 修补客户端
    patched_client.fetch_some_data.return_value = 4  # 设置受控行为
    result = app.do_something_fancy()
    assert result == 2
    print("All good, woop woop!")
```

    All good, woop woop!
    

相同，但使用函数装饰器而不是上下文管理器。请注意，这里我们正在修补整个`Client`类，而不仅仅是`app`的客户端实例变量。


```python
from unittest.mock import patch


@patch("__main__.Client")  # 修补客户端
def test_do_something_fancy(client_cls):
    client_cls().fetch_some_data.return_value = 4  # 设置受控行为
    app = MyApplication()
    result = app.do_something_fancy()
    assert result == 2
    print("All good, woop woop!")


test_do_something_fancy()  # 这只是为了举例
```

    All good, woop woop!
    

## [`collections`](https://docs.python.org/3/library/collections.html#module-collections)模块

### [`namedtuple`](https://docs.python.org/3/library/collections.html#collections.namedtuple)函数
创建更易读和自文档化代码的好帮手。

`namedtuple`是一个函数，它返回一个元组，其字段有名称，元组本身也有名称（就像类及其实例变量一样）。潜在的用例包括存储不可变的数据。如果你能使用Python 3.7或更高版本，你可能也想看看[`数据类`](https://docs.python.org/3/library/dataclasses.html#module-dataclasses)。


```python
from collections import namedtuple

Person = namedtuple("Person", ["name", "age", "is_gangster"])

# 实例创建类似于类
john = Person("John Doe", 83, True)
lisa = Person("Lis Doe", age=77, is_gangster=False)

print(john, lisa)
print(f"Is John a gangster: {john.is_gangster}")

# 元组是不可变的，因此你不能这样做
# john.is_gangster = False
```

    Person(name='John Doe', age=83, is_gangster=True) Person(name='Lis Doe', age=77, is_gangster=False)
    Is John a gangster: True
    

### [`Counter`](https://docs.python.org/3/library/collections.html#collections.Counter)函数
用于统计集合中元素的出现次数。


```python
from collections import Counter

data = [1, 2, 3, 1, 2, 4, 5, 6, 2]

counter = Counter(data)
print(f"type: {type(counter)}, counter: {counter}")

print(f"count of twos: {counter[2]}")
print(f"count of tens: {counter[10]}")  # 零表示不存在

print(f"counter is a dict: {isinstance(counter, dict)}")
```

    type: <class 'collections.Counter'>, counter: Counter({2: 3, 1: 2, 3: 1, 4: 1, 5: 1, 6: 1})
    count of twos: 3
    count of tens: 0
    counter is a dict: True
    

### [`defaultdict`](https://docs.python.org/3/library/collections.html#collections.defaultdict)函数
用于填充字典的更简洁的代码。

让我们先看看如何使用一个普通的`dict`。


```python
data = (1, 2, 3, 4, 3, 2, 5, 6, 7)

my_dict = {}
for val in data:
    if val % 2:
        if not "odd" in my_dict:
            my_dict["odd"] = []
        my_dict["odd"].append(val)
    else:
        if not "even" in my_dict:
            my_dict["even"] = []
        my_dict["even"].append(val)

print(my_dict)
```

    {'odd': [1, 3, 3, 5, 7], 'even': [2, 4, 2, 6]}
    

使用`defaultdict`：


```python
from collections import defaultdict

my_dict = defaultdict(list)
for val in data:
    if val % 2:
        my_dict["odd"].append(val)
    else:
        my_dict["even"].append(val)
print(my_dict)
```

    defaultdict(<class 'list'>, {'odd': [1, 3, 3, 5, 7], 'even': [2, 4, 2, 6]})
    

在上面的示例中，`defaultdict` 确保在添加新键时，新`list`会自动初始化为值。

这是另一个默认使用`int`的例子。


```python
my_dict = defaultdict(int)
for val in data:
    if val % 2:
        my_dict["odd_count"] += 1
    else:
        my_dict["even_count"] += 1
print(my_dict)
```

    defaultdict(<class 'int'>, {'odd_count': 5, 'even_count': 4})
    
