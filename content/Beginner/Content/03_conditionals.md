
#  条件判断

##  判断真值

### `bool`


```python
print(f"type of True and False: {type(True)}")
```

    type of True and False: <class 'bool'>
    


```python
print(f"0: {bool(0)}, 1: {bool(1)}")
print(f"empty list: {bool([])}, list with values: {bool(['woop'])}")
print(f"empty dict: {bool({})}, dict with values: {bool({'Python': 'cool'})}")
```

    0: False, 1: True
    empty list: False, list with values: True
    empty dict: False, dict with values: True
    

### `==, !=, >, <, >=, <=`


```python
print(f"{1 == 0}")
print(f"{1 != 0}")
print(f"{1 > 0}")
print(f"{1 > 1}")
print(f"{1 < 0}")
print(f"{1 < 1}")
print(f"{1 >= 0}")
print(f"{1 >= 1}")
print(f"{1 <= 0}")
print(f"{1 <= 1}")
```

    False
    True
    True
    False
    False
    False
    True
    True
    False
    True
    

你可以组合这些运算符：


```python
print(f"{1 <= 2 <= 3}")
```

    True
    

### `and, or, not` 即与、或、非


```python
python_is_cool = True
java_is_cool = False
empty_list = []
secret_value = 3.14
```


```python
print(f"Python and java are both cool: {python_is_cool and java_is_cool}")
print(f"secret_value and python_is_cool: {secret_value and python_is_cool}")
```

    Python and java are both cool: False
    secret_value and python_is_cool: True
    


```python
print(f"Python or java is cool: {python_is_cool or java_is_cool}")
print(f"{1 >= 1.1 or 2 < 1.4}")
```

    Python or java is cool: True
    False
    


```python
print(f"Java is not cool: {not java_is_cool}")
```

    Java is not cool: True
    

你可以组合多个语句，执行顺序是从左到右。你可以通过使用括号来控制执行顺序。

你可以组合多个语句，执行顺序是从左到右。你可以通过使用括号来控制执行顺序。


```python
print(bool(not java_is_cool or secret_value and python_is_cool or empty_list))
print(bool(not (java_is_cool or secret_value and python_is_cool or empty_list)))
```

    True
    False
    

## `if`


```python
statement = True
if statement:
    print("statement is True")

if not statement:
    print("statement is not True")
```

    statement is True
    


```python
empty_list = []
# With if and elif, conversion to `bool` is implicit
if empty_list:
    print("empty list will not evaluate to True")  # this won't be executed
```


```python
val = 3
if 0 <= val < 1 or val == 3:
    print("Value is positive and less than one or value is three")
```

    Value is positive and less than one or value is three
    

## `if-else`


```python
my_dict = {}
if my_dict:
    print("there is something in my dict")
else:
    print("my dict is empty :(")
```

    my dict is empty :(
    

## `if-elif-else`


```python
val = 88
if val >= 100:
    print("value is equal or greater than 100")
elif val > 10:
    print("value is greater than 10 but less than 100")
else:
    print("value is equal or less than 10")
```

    value is greater than 10 but less than 100
    

你可以根据需要拥有任意多的 `elif` 语句。此外，末尾的 `else` 不是必须的。

你可以根据需要拥有任意多的 `elif` 语句。此外，末尾的 `else` 不是必须的。


```python
greeting = "Hello fellow Pythonista!"
language = "Italian"

if language == "Swedish":
    greeting = "Hejsan!"
elif language == "Finnish":
    greeting = "Latua perkele!"
elif language == "Spanish":
    greeting = "Hola!"
elif language == "German":
    greeting = "Guten Tag!"

print(greeting)
```

    Hello fellow Pythonista!
    

想要了解更多关于条件判断的信息，请查看  [tutorial from Real Python](https://realpython.com/python-conditional-statements/) 的这篇教程。

想要了解更多关于条件判断的信息，请查看  [tutorial from Real Python](https://realpython.com/python-conditional-statements/) 的这篇教程。
