
# 成语词典

## `get` - 访问时不存在的键的默认值
如果你不确定是否存在键，这样尤其方便。


```python
my_dict = {"a": 1, "b": 2, "c": 3}
```

<font color='red'>不要这样做。</font>


```python
if "g" in my_dict:
    value = my_dict["g"]
else:
    value = "some default value"
print(value)
```

    some default value
    

<font color='red'>或者像这样。</font>


```python
try:
    value = my_dict["g"]
except KeyError:
    value = "some default value"
print(value)
```

    some default value
    

### <font color='green'>这样做！</font>


```python
value = my_dict.get("g", "some default value")
print(value)
```

    some default value
    

请注意，如果不提供`get`的默认值，如果字典中不存在该键，则返回值将为`None`


```python
value = my_dict.get("g")
print(value is None)
```

    True
    

## `setdefault` - 与`get`相同，但如果不存在，也会设置值

<font color='red'>不要这样做。</font>


```python
my_dict = {"a": 1, "b": 2, "c": 3}

key = "g"
if key in my_dict:
    value = my_dict[key]
else:
    value = "some default value"
    my_dict[key] = value

print(value)
print(my_dict)
```

    some default value
    {'a': 1, 'b': 2, 'c': 3, 'g': 'some default value'}
    

### <font color='green'>这样做！</font>


```python
my_dict = {"a": 1, "b": 2, "c": 3}

key = "g"
value = my_dict.setdefault(key, "some default value")

print(value)
print(my_dict)
```

    some default value
    {'a': 1, 'b': 2, 'c': 3, 'g': 'some default value'}
    

## 推导式
假设我们有一组数字，我们想将它们存储为字典，其中数字是键，平方是值。


```python
numbers = (1, 5, 10)
```

<font color='red'>不要这样做。</font>


```python
squares = {}
for num in numbers:
    squares[num] = num**2
print(squares)
```

    {1: 1, 5: 25, 10: 100}
    

### <font color='green'>这样做！</font>


```python
squares = {num: num**2 for num in numbers}
print(squares)
```

    {1: 1, 5: 25, 10: 100}
    

### 另一个例子


```python
keys = ("a", "b", "c")
values = [True, 100, "John Doe"]
```

<font color='red'>不要这样做。</font>


```python
my_dict = {}
for idx, key in enumerate(keys):
    my_dict[key] = values[idx]
print(my_dict)
```

    {'a': True, 'b': 100, 'c': 'John Doe'}
    

### <font color='green'>这样做！</font>


```python
my_dict = {k: v for k, v in zip(keys, values)}
print(my_dict)

# 甚至像这样：
my_dict2 = dict(zip(keys, values))

assert my_dict2 == my_dict
```

    {'a': True, 'b': 100, 'c': 'John Doe'}
    

## 循环


```python
my_dict = {"age": 83, "is gangster": True, "name": "John Doe"}
```

<font color='red'>不要这样做。</font>


```python
for key in my_dict:
    val = my_dict[key]
    print(f"key: {key:15s} value: {val}")
```

    key: age             value: 83
    key: is gangster     value: True
    key: name            value: John Doe
    

### <font color='green'>这样做！</font>


```python
for key, val in my_dict.items():
    print(f"key: {key:15s} value: {val}")
```

    key: age             value: 83
    key: is gangster     value: True
    key: name            value: John Doe
    
