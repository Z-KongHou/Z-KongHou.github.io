
# [异常](https://docs.python.org/3/library/exceptions.html#concrete-exceptions)
当程序中出现错误时，会出现一个异常。举个例子，当你试图将一个数除以0时, Python会抛出`ZeroDivisionError` ，当你尝试访问字典中不存在的键时，Python会抛出  `KeyError`。




```python
empty_dict = {}
# empty_dict['key']  # 取消注释以查看追踪信息
```

## `try-except` 结构 
如果你知道某段代码可能会以某种方式失败, 你可以使用`try-except` 结构以一种期望的方式来捕获并处理可能发生的异常.


```python
# 让我们尝试打开一个不存在的文件。
file_name = "not_existing.txt"

try:
    with open(file_name) as my_file:
        print("File is successfully open")

except FileNotFoundError as e:
    print(f"Uups, file: {file_name} not found")
    print(f"Exception: {e} was raised")
```

    Uups, file: not_existing.txt not found
    Exception: [Errno 2] No such file or directory: 'not_existing.txt' was raised
    

如果你不清楚某段代码可能会引发哪些具体类型的异常，你可以使用 'Exception' 这个语句来捕获所有类型的异常.此外，你可以使用多个'Exception'语句。


```python
def calculate_division(var1, var2):
    result = 0

    try:
        result = var1 / var2
    except ZeroDivisionError as ex1:
        print("Can't divide by zero")
    except Exception as ex2:
        print(f"Exception: {ex2}")

    return result


result1 = calculate_division(3, 3)
print(f"result1: {result1}")

result2 = calculate_division(3, "3")
print(f"result2: {result2}")

result3 = calculate_division(3, 0)
print(f"result3: {result3}")
```

    result1: 1.0
    Exception: unsupported operand type(s) for /: 'int' and 'str'
    result2: 0
    Can't divide by zero
    result3: 0
    

`try-except` 可以存在于其直接作用域之外的一个更大的作用域中:


```python
def calculate_division(var1, var2):
    return var1 / var2


try:
    result = calculate_division(3, "3")
except Exception as e:
    print(e)
```

    unsupported operand type(s) for /: 'int' and 'str'
    

## 创建你自己的异常类 
在你的应用程序中，你可以使用自定义异常来向用户通知在应用程序运行时发生的错误.  


```python
import math


# 定义你自己的异常
class NegativeNumbersNotSupported(Exception):
    pass


# 自定义异常的示例用法：
def secret_calculation(number1, number2):
    if number1 < 0 or number2 < 0:
        msg = f"Negative number in at least one of the parameters: {number1}, {number2}"
        raise NegativeNumbersNotSupported(msg)

    return math.sqrt(number1) + math.sqrt(number2)


# 取消注释以查看追踪信息
# result = secret_calculation(-1, 1)
```
