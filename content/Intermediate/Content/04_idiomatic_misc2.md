
# 符合Python习惯用法的代码 - 杂项部分 2

##字符串拼接


```python
names = ("John", "Lisa", "Terminator", "Python")
```

<font color='red'>不要像这样做。</font>


```python
semicolon_separated = names[0]
for name in names[1:]:
    semicolon_separated += ";" + name
print(semicolon_separated)
```

    John;Lisa;Terminator;Python
    

### <font color='green'>使用 join 而不是其他方式!</font>


```python
semicolon_separated = ";".join(names)
print(semicolon_separated)
```

    John;Lisa;Terminator;Python
    

## 赋值中的 or
a or b 的返回值：
*如果 a 是真值，则返回 a
*否则返回 b

你可以在编写变量赋值时利用这一点。


```python
a = 0
b = None
c = "John Doe"
```

<font color='red'>而不是像这样做：</font>


```python
my_variable = "default value"
if a:
    my_variable = a
elif b:
    my_variable = b
elif c:
    my_variable = c
print(my_variable)
```

    John Doe
    

### <font color='green'>更推荐这样做：</font>


```python
my_variable = a or b or c or "default value"
print(my_variable)
```

    John Doe
    

## try - except - else 语句

<font color='red'>不要使用以下技术来检查某个代码块在执行过程中是否出现了异常。</font>


```python
exception_occured = False
try:
    # here would be the logic of your master piece

    bad_calculation = 1 / 0

except ValueError as e:
    print(f"Oh boi, some value error: {e}")
    exception_occured = True
except Exception as e:
    print(f"Oh boi, something bad happened: {e}")
    exception_occured = True

if not exception_occured:
    print("All went well!")
```

    Oh boi, something bad happened: division by zero
    

### <font color='green'>而是应该这样做！</font>


```python
try:
    # here would be the logic of your master piece

    bad_calculation = 1 / 0

except ValueError as e:
    print(f"Oh boi, some keyerror: {e}")
except Exception as e:
    print(f"Oh boi, something bad happened: {e}")
else:
    print("All went well!")
```

    Oh boi, something bad happened: division by zero
    

## try - finally 语句
对于你总是想要执行某些操作，即使出现异常的场景。

<font color='red'>不要像这样做。</font>


```python
def magical_calculation():
    try:
        # here would be the logic of your master piece
        result = 1 / 0
    except ZeroDivisionError:
        print("This could be something important that should be done every time")
        return 0
    except Exception:
        print("This could be something important that should be done every time")
        return None

    print("This could be something important that should be done every time")
    return result


print(f"return value: {magical_calculation()}")
```

    This could be something important that should be done every time
    return value: 0
    

### <font color='green'>这更适合你的目的！</font>


```python
def magical_calculation():
    try:
        # here would be the logic of your master piece
        result = 1 / 0
    except ZeroDivisionError:
        return 0
    except Exception:
        return None
    finally:
        print("This could be something important that should be done every time")
    return result


print(f"return value: {magical_calculation()}")
```

    This could be something important that should be done every time
    return value: 0
    

**注意**：你还可以使用 try-except-else-finally 结构。在 try 中没有引发异常的情况下，else 会在 finally 之前执行。如果发生了异常，则不会执行 else 块。

##尽可能使用上下文管理器
一个用例示例是文件I/O（输入/输出）。

<font color='red'>不要像这样操作文件。</font>


```python
try:
    some_file = open("tmp.txt", "w")
    print(f"the file is now open: {not some_file.closed}")

    # here would be some logic

finally:
    some_file.close()
    print(f"now it's closed: {some_file.closed}")
```

    the file is now open: True
    now it's closed: True
    

### <font color='green'>而是应该使用上下文管理器！</font>


```python
with open("tmp.txt", "w") as some_file:
    print(f"the file is now open: {not some_file.closed}")

    # here would be some logic

print(f"now it's closed: {some_file.closed}")
```

    the file is now open: True
    now it's closed: True
    

### <font color='green'>你自己实现一个上下文管理器也很容易。</font>


```python
from contextlib import contextmanager


@contextmanager
def my_context():
    print("Entering to my context")
    yield
    print("Exiting my context")


def do_stuff():
    with my_context():
        print("Doing stuff")

    print("Doing some stuff outside my context")


do_stuff()
```

    Entering to my context
    Doing stuff
    Exiting my context
    Doing some stuff outside my context
    

## `min()` 和`max()`


```python
secret_data = (1, 2, 5, 99, 8, -9)
```

<font color='red'>无需自己从头实现。</font>


```python
max_value = 0
for val in secret_data:
    if val > max_value:
        max_value = val
print(max_value)
```

    99
    

### <font color='green'>而是应该使用内置功能！</font>


```python
max_value = max(secret_data)
print(max_value)
```

    99
    

## contextlib.suppress - 忽略异常 

<font color='red'>如果有潜在的异常是可以接受的，不要像这样处理它。</font>


```python
value = 0
try:
    value = 1 / 0  # just for demonstrating purposes
except ZeroDivisionError:
    pass

print(value)
```

    0
    

### <font color='green'>而是应该这样做！</font>


```python
from contextlib import suppress

value = 0
with suppress(ZeroDivisionError):
    value = 1 / 0  # just for demonstrating purposes

print(value)
```

    0
    

##使用属性而不是 getter/setter 方法

<font color='red'>而不是像这样做。</font>


```python
class Person:
    def __init__(self, first_name, last_name):
        self.first_name = first_name
        self.last_name = last_name

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    def set_full_name(self, full_name):
        parts = full_name.split()
        if len(parts) != 2:
            raise ValueError("Sorry, too difficult name")

        self.first_name, self.last_name = parts


p = Person("John", "Doe")
print(p.get_full_name())
p.set_full_name("Lisa Doe")
print(p.get_full_name())
```

    John Doe
    Lisa Doe
    

### <font color='green'>更推荐使用属性!</font>


```python
class Person:
    def __init__(self, first_name, last_name):
        self.first_name = first_name
        self.last_name = last_name

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    @full_name.setter
    def full_name(self, name):
        parts = name.split()
        if len(parts) != 2:
            raise ValueError("Sorry, too difficult name")

        self.first_name, self.last_name = parts


p = Person("John", "Doe")
print(p.full_name)
p.full_name = "Lisa Doe"
print(p.full_name)
```

    John Doe
    Lisa Doe
    
