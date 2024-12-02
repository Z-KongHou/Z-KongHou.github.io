
# [Numbers 数据类型](https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex)

## `int` 整型


```python
my_int = 6
print(f"value: {my_int}, type: {type(my_int)}")
```

    value: 6, type: <class 'int'>
    

## `float` 浮点型


```python
my_float = float(my_int)
print(f"value: {my_float}, type: {type(my_float)}")
```

    value: 6.0, type: <class 'float'>
    

注意：多个（两个及以上）`int` 的除法会得到 `float`：

注意：多个（两个及以上）`int` 的除法会得到 `float`：


```python
print(1 / 1)
print(6 / 5)
```

    1.0
    1.2
    

注意：浮点数的二进制表示问题（参见 [Decimal](#decimal) 了解解决方法）：

注意：浮点数的二进制表示问题（参见 [Decimal](#decimal) 了解解决方法）：


```python
val = 0.1 + 0.1 + 0.1
print(val == 0.3)
print(val)
```

    False
    0.30000000000000004
    

## 运算符 `//`、`%` 和 `**` 分别表示除法（向下取整）、取模（取余数）和幂运算：

运算符 `//`、`%` 和 `**` 分别表示除法（向下取整）、取模（取余数）和幂运算：


```python
7 // 5
```




    1




```python
7 % 5
```




    2




```python
2**3
```




    8



<a id='decimal'></a> 
## [`decimal.Decimal——十进制定点和浮点算术`](https://docs.python.org/3/library/decimal.html)


```python
from decimal import Decimal
```


```python
from_float = Decimal(0.1)
from_str = Decimal("0.1")
print(f"from float: {from_float}\nfrom string: {from_str}")
```

    from float: 0.1000000000000000055511151231257827021181583404541015625
    from string: 0.1
    


```python
my_decimal = Decimal("0.1")
sum_of_decimals = my_decimal + my_decimal + my_decimal
print(sum_of_decimals == Decimal("0.3"))
```

    True
    

##  运算符优先级

算术运算符遵循运算符优先级。如果需要改变运算顺序，请使用括号：

算术运算符遵循运算符优先级。如果需要改变运算顺序，请使用括号：


```python
print(1 + 2**2 * 3 / 6)  # 1 + 4 * 3 / 6 == 1 + 12 / 6 == 1 + 2
print((1 + 2**2) * 3 / 6)
```

    3.0
    2.5
    
