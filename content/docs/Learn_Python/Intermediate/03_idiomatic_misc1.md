
# 符合Python习惯用法的代码 - 杂项部分 1

##推导式


```python
original_data = (1, 2, 3, 4)
```

<font color='red'>不要这样做。</font>


```python
# list
square_roots_list = []
for val in original_data:
    square_root = val ** (1 / 2)
    square_roots_list.append(square_root)
print(square_roots_list)

# set
square_roots_set = set()
for val in original_data:
    square_root = val ** (1 / 2)
    square_roots_set.add(square_root)
print(square_roots_set)

# dict
square_roots_dict = {}
for val in original_data:
    square_root = val ** (1 / 2)
    square_roots_dict[val] = square_root
print(square_roots_dict)

# dict with a condition
integer_square_roots_dict = {}
for val in original_data:
    square_root = val ** (1 / 2)
    if square_root.is_integer():
        integer_square_roots_dict[val] = square_root
print(integer_square_roots_dict)
```

    [1.0, 1.4142135623730951, 1.7320508075688772, 2.0]
    {1.0, 2.0, 1.7320508075688772, 1.4142135623730951}
    {1: 1.0, 2: 1.4142135623730951, 3: 1.7320508075688772, 4: 2.0}
    {1: 1.0, 4: 2.0}
    

注意：如果你出于某种原因正在使用Python 2.X版本，那么1/2的结果是0而不是0.5。 

### <font color='green'>使用推导式！</font>


```python
square_roots_list = [val ** (1 / 2) for val in original_data]
print(square_roots_list)

square_roots_set = {val ** (1 / 2) for val in original_data}
print(square_roots_set)

square_roots_dict = {val: val ** (1 / 2) for val in original_data}
print(square_roots_dict)

integer_square_roots_dict = {
    val: val ** (1 / 2) for val in original_data if (val ** (1 / 2)).is_integer()
}
print(integer_square_roots_dict)
```

    [1.0, 1.4142135623730951, 1.7320508075688772, 2.0]
    {1.0, 2.0, 1.7320508075688772, 1.4142135623730951}
    {1: 1.0, 2: 1.4142135623730951, 3: 1.7320508075688772, 4: 2.0}
    {1: 1.0, 4: 2.0}
    

##使用 in 来检查集合中是否存在某个元素


```python
name = "John Doe"
```

<font color='red'>不要像这样做。</font>


```python
if name == "John" or name == "Doe" or name == "John Doe":
    print("This seems to be our guy")
```

    This seems to be our guy
    

### <font color='green'>像这样做!</font>


```python
if name in ("John", "Doe", "John Doe"):
    print("This seems to be our guy")
```

    This seems to be our guy
    

##链式比较


```python
a, b, c, d = 1, 2, 3, 4
```

<font color='red'>不要像这样做。</font>


```python
if b > a and c > b and d > c:
    print("from lowest to highest: a, b, c, d")
```

    from lowest to highest: a, b, c, d
    

### <font color='green'>像这样做!</font>


```python
if a < b < c < d:
    print("from lowest to highest: a, b, c, d")
```

    from lowest to highest: a, b, c, d
    

##Falsy（假值）和 truthy（真值）


```python
# These are falsy
my_list = []
my_dict = {}
my_set = set()
my_tuple = tuple()
zero = 0
false = False
none = None
my_str = ""

# Basically the rest are truthy
# for example:
my_second_list = ["foo"]
```

<font color='red'>不要像这样做。</font>


```python
if len(my_list) == 0:
    print("Empty list is so empty")

if not len(my_dict):
    print("Empty dict is also very empty")

if not len(my_set) and not len(my_tuple):
    print("Same goes for sets and tuples")

if not bool(zero) and not bool(false) and not bool(none) and len(my_str) == 0:
    print("These are also falsy")

if len(my_second_list) > 0:
    print("This should be true")
```

    Empty list is so empty
    Empty dict is also very empty
    Same goes for sets and tuples
    These are also falsy
    This should be true
    

### <font color='green'>这样更好!</font>


```python
if not my_list:
    print("Empty list is so empty")

if not my_dict:
    print("Empty dict is also very empty")

if not my_set and not my_tuple:
    print("Same goes for sets and tuples")

if not zero and not false and not none and not my_str:
    print("These are also falsy")

if my_second_list:
    print("This should be true")
```

    Empty list is so empty
    Empty dict is also very empty
    Same goes for sets and tuples
    These are also falsy
    This should be true
    

## `any`和`all`


```python
example_collection = ["a", True, "Python is cool", 123, 0]
```

<font color='red'>不要像这样做。</font>


```python
any_value_truthy = True
for val in example_collection:
    if val:
        any_value_truthy = True
        break

all_values_truthy = True
for val in example_collection:
    if not val:
        all_values_truthy = False
        break

print(f"any truthy: {any_value_truthy}, all truthy: {all_values_truthy}")
```

    any truthy: True, all truthy: False
    

### <font color='green'>像这样做!</font>


```python
any_value_truthy = any(example_collection)
all_values_truthy = all(example_collection)
print(f"any truthy: {any_value_truthy}, all truthy: {all_values_truthy}")
```

    any truthy: True, all truthy: False
    

## Python中三元运算符的替代写法
许多其他编程语言都有三元运算符：?。三元运算符的一个常见用例是根据某个条件将某个值赋给变量。换句话说，可以这样使用：
```
variable = some_condition ? some_value : some_other_value
```

<font color='red'>而不是这样做。</font>


```python
some_condition = True  # just a dummy condition

if some_condition:
    variable = "John"
else:
    variable = "Doe"
print(variable)
```

    John
    

### <font color='green'>你可以像这样做!</font>


```python
variable = "John" if some_condition else "Doe"
print(variable)
```

    John
    

## 函数关键字参数
为了提高可读性和可维护性。


```python
def show_person_details(name, is_gangster, is_hacker, age):
    print(f"name: {name}, gangster: {is_gangster}, hacker: {is_hacker}, age: {age}")
```

<font color='red'>这不好。如果你不熟悉 show_person_details 函数的签名，就很难知道这里的 True、False 和 83 分别指的是什么。</font>


```python
show_person_details("John Doe", True, False, 83)
```

    name: John Doe, gangster: True, hacker: False, age: 83
    

### <font color='green'>这样更好!</font>


```python
show_person_details("John Doe", is_gangster=True, is_hacker=False, age=83)
```

    name: John Doe, gangster: True, hacker: False, age: 83
    

#### <font color='green'>额外内容：仅关键字参数之后 `*`</font>
如果函数的签名在未来可能会发生变化，那么这可能会很有用。例如，如果在未来的开发中有很小的可能性会删除其中一个参数，请考虑使用 `*`.


```python
def func_with_loads_of_args(arg1, *, arg2=None, arg3=None, arg4=None, arg5="boom"):
    pass


# This won't work because only keyword arguments allowed after *
# func_with_loads_of_args('John Doe', 1, 2)

# This is ok
func_with_loads_of_args("John Doe", arg4="foo", arg5="bar", arg2="foo bar")
```

##多重赋值
比如说我们想交换两个变量的值。

<font color='red'>不要像这样做。</font>


```python
# original values
a = 1
b = 2

# swap
tmp = a
a = b
b = tmp
print(a, b)
```

    2 1
    

### <font color='green'>像这样做!</font>


```python
# original values
a = 1
b = 2

# swap
a, b = b, a
print(a, b)
```

    2 1
    

## 解包/装包


```python
my_list = [1, 2, 3, 4, 5, 6]
```

<font color='red'>不要像这样做。</font>


```python
first = my_list[0]
last = my_list[-1]
middle = my_list[1:-1]
print(first, middle, last)

packed = [first] + middle + [last]
assert packed == my_list
```

    1 [2, 3, 4, 5] 6
    

### <font color='green'>这是符合Python习惯用法的方式!</font>


```python
# unpacking
first, *middle, last = my_list
print(first, middle, last)

# packing
packed = [first, *middle, last]
assert packed == my_list
```

    1 [2, 3, 4, 5] 6
    
