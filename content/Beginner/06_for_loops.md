
# [`for` 循环](https://docs.python.org/3/tutorial/controlflow.html#for-statements)

## 对列表进行for循环


```python
my_list = [1, 2, 3, 4, "Python", "is", "neat"]
for item in my_list:
    print(item)
```

    1
    2
    3
    4
    Python
    is
    neat
    

### `break`语句
停止循环的执行。


```python
for item in my_list:
    if item == "Python":
        break
    print(item)
```

    1
    2
    3
    4
    

### `continue`语句
继续执行下一次循环，而不执行本次循环中“continue”后出现的语句。


```python
for item in my_list:
    if item == 1:
        continue
    print(item)
```

    2
    3
    4
    Python
    is
    neat
    

### `enumerate()`函数
如果你还需要知道索引:


```python
for idx, val in enumerate(my_list):
    print(f"idx: {idx}, value: {val}")
```

    idx: 0, value: 1
    idx: 1, value: 2
    idx: 2, value: 3
    idx: 3, value: 4
    idx: 4, value: Python
    idx: 5, value: is
    idx: 6, value: neat
    

## 对字典进行for循环


```python
my_dict = {"hacker": True, "age": 72, "name": "John Doe"}
for val in my_dict:
    print(val)
```

    hacker
    age
    name
    


```python
for key, val in my_dict.items():
    print(f"{key}={val}")
```

    hacker=True
    age=72
    name=John Doe
    

## `range()`函数


```python
for number in range(5):
    print(number)
```

    0
    1
    2
    3
    4
    


```python
for number in range(2, 5):
    print(number)
```

    2
    3
    4
    


```python
for number in range(0, 10, 2):  # last one is step
    print(number)
```

    0
    2
    4
    6
    8
    
