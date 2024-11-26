
# 函数


```python
def my_first_function():
    print("Hello world!")


print(f"type: {type(my_first_function)}")

my_first_function()  # 调用函数
```

    type: <class 'function'>
    Hello world!
    

### 参数


```python
def greet_us(name1, name2):
    print(f"Hello {name1} and {name2}!")


greet_us("John Doe", "Superman")
```

    Hello John Doe and Superman!
    


```python
# 具有返回值的函数
def strip_and_lowercase(original):
    modified = original.strip().lower()
    return modified


uggly_string = "  MixED CaSe "
pretty = strip_and_lowercase(uggly_string)
print(f"pretty: {pretty}")
```

    pretty: mixed case
    

### 关键字参数


```python
def my_fancy_calculation(first, second, third):
    return first + second - third


print(my_fancy_calculation(3, 2, 1))

print(my_fancy_calculation(first=3, second=2, third=1))

# 使用关键字参数，你可以打乱顺序
print(my_fancy_calculation(third=1, first=3, second=2))

# 你可以混合使用参数和关键字参数，但必须从参数开始
print(my_fancy_calculation(3, third=1, second=2))
```

    4
    4
    4
    4
    

### 默认参数


```python
def create_person_info(name, age, job=None, salary=300):
    info = {"name": name, "age": age, "salary": salary}

    # 仅当“job”键作为参数提供时，才添加它
    if job:
        info.update(dict(job=job))

    return info


person1 = create_person_info("John Doe", 82)  # 对job和salary使用默认参数
person2 = create_person_info("Lisa Doe", 22, "hacker", 10000)
print(person1)
print(person2)
```

    {'name': 'John Doe', 'age': 82, 'salary': 300}
    {'name': 'Lisa Doe', 'age': 22, 'salary': 10000, 'job': 'hacker'}
    

**不要使用可变对象作为默认参数！**


```python
def append_if_multiple_of_five(number, magical_list=[]):
    if number % 5 == 0:
        magical_list.append(number)
    return magical_list


print(append_if_multiple_of_five(100))
print(append_if_multiple_of_five(105))
print(append_if_multiple_of_five(123))
print(append_if_multiple_of_five(123, []))
print(append_if_multiple_of_five(123))
```

    [100]
    [100, 105]
    [100, 105]
    []
    [100, 105]
    

以下是如何实现所需行为的方法：


```python
def append_if_multiple_of_five(number, magical_list=None):
    if not magical_list:
        magical_list = []
    if number % 5 == 0:
        magical_list.append(number)
    return magical_list


print(append_if_multiple_of_five(100))
print(append_if_multiple_of_five(105))
print(append_if_multiple_of_five(123))
print(append_if_multiple_of_five(123, []))
print(append_if_multiple_of_five(123))
```

    [100]
    [105]
    []
    []
    []
    

### 文档字符串
用于记录函数、方法、模块和变量的字符串。


```python
def print_sum(val1, val2):
    """打印给定参数总和的函数。"""
    print(f"sum: {val1 + val2}")


print(help(print_sum))
```

    Help on function print_sum in module __main__:
    
    print_sum(val1, val2)
        打印给定参数总和的函数。
    
    None
    


```python
def calculate_sum(val1, val2):
    """这是一个较长的文档字符串，也定义了参数和返回值。

    参数:
        val1: 第一个参数。
        val2: 第二个参数。

    返回值:
        val1和val2的总和。

    """
    return val1 + val2


print(help(calculate_sum))
```

    Help on function calculate_sum in module __main__:
    
    calculate_sum(val1, val2)
        这是一个较长的文档字符串，也定义了参数和返回值。
        
        参数:
            val1: 第一个参数。
            val2: 第二个参数。
        
        返回值:
            val1和val2的总和。
    
    None
    

### [`pass`](https://docs.python.org/3/reference/simple_stmts.html#the-pass-statement) 语句
`pass` 是一个在执行时什么也不做的语句。它可以用作占位符，使代码在绘制应用程序的函数和/或类时语法正确。例如，以下是有效的Python代码。


```python
def my_function(some_argument):
    pass


def my_other_function():
    pass
```
