
#  惯用的循环

##  一般循环


```python
data = ["John", "Doe", "was", "here"]
```


<font color='red'>不要这样做。while循环实际上很少需要。</font>


```python
idx = 0
while idx < len(data):
    print(data[idx])
    idx += 1
```

    John
    Doe
    was
    here
    


<font color='red'>也不要这样做。</font>


```python
for idx in range(len(data)):
    print(data[idx])
```

    John
    Doe
    was
    here
    


### <font color='green'>像这样做！</font>


```python
for item in data:
    print(item)
```

    John
    Doe
    was
    here
    


<font color='green'>如果你需要索引，可以使用enumerate。</font>


```python
for idx, val in enumerate(data):
    print(f"{idx}: {val}")
```

    0: John
    1: Doe
    2: was
    3: here
    

##  循环一个数字范围


<font color='red'>不要这样做。</font>


```python
i = 0
while i < 6:
    print(i)
    i += 1
```

    0
    1
    2
    3
    4
    5
    


<font color='red'>也不要这样做。</font>


```python
for val in [0, 1, 2, 3, 4, 5]:
    print(val)
```

    0
    1
    2
    3
    4
    5
    


### <font color='green'>像这样做！</font>


```python
for val in range(6):
    print(val)
```

    0
    1
    2
    3
    4
    5
    

##  反向循环


```python
data = ["first", "to", "last", "from"]
```


<font color='red'>这不是很好。</font>


```python
i = len(data) - 1
while i >= 0:
    print(data[i])
    i -= 1
```

    from
    last
    to
    first
    


### <font color='green'>像这样做！</font>


```python
for item in reversed(data):
    print(item)
```

    from
    last
    to
    first
    

## 同时循环n个集合


```python
collection1 = ["a", "b", "c"]
collection2 = (10, 20, 30, 40, 50)
collection3 = ["John", "Doe", True]
```


<font color='red'>哦，不，不要这样做。</font>


```python
shortest = len(collection1)
if len(collection2) < shortest:
    shortest = len(collection2)
if len(collection3) < shortest:
    shortest = len(collection3)

i = 0
while i < shortest:
    print(collection1[i], collection2[i], collection3[i])
    i += 1
```

    a 10 John
    b 20 Doe
    c 30 True
    


<font color='red'>这变得更好了，但还有更好的方法！</font>


```python
shortest = min(len(collection1), len(collection2), len(collection3))
for i in range(shortest):
    print(collection1[i], collection2[i], collection3[i])
```

    a 10 John
    b 20 Doe
    c 30 True
    


### <font color='green'>像这样做！</font>


```python
for first, second, third in zip(collection1, collection2, collection3):
    print(first, second, third)
```

    a 10 John
    b 20 Doe
    c 30 True
    


<font color='green'>你也可以用两个集合创建一个字典！</font>


```python
my_dict = dict(zip(collection1, collection2))
print(my_dict)
```

    {'a': 10, 'b': 20, 'c': 30}
    

## `for - else` - 检查集合中的匹配项

当我们想要验证集合中的一个元素是否满足某个条件时，我们会考虑以下相对原始的例子，我们想要验证`data`中至少有一个项目是"python"（不区分大小写）。如果不是，我们会引发ValueError。


```python
data = [1, 2, 3, "This", "is", "just", "a", "random", "Python", "list"]
```


<font color='red'>不要这样做</font>


```python
found = False
for val in data:
    if str(val).lower() == "python":
        found = True
        break
if not found:
    raise ValueError("Nope, couldn't find.")
```


### <font color='green'>像这样做！</font>


```python
for val in data:
    if str(val).lower() == "python":
        break
else:
    raise ValueError("Nope, couldn't find.")
```
