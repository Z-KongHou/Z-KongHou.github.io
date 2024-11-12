
# [Numbers](https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex)

## `int`


```python
my_int = 6
print(f"value: {my_int}, type: {type(my_int)}")
```

    value: 6, type: <class 'int'>
    

## `float`


```python
my_float = float(my_int)
print(f"value: {my_float}, type: {type(my_float)}")
```

    value: 6.0, type: <class 'float'>
    

Note that division of `int`s produces `float`:


```python
print(1 / 1)
print(6 / 5)
```

    1.0
    1.2
    

Be aware of the binary floating-point pitfalls (see [Decimal](#decimal) for workaround):


```python
val = 0.1 + 0.1 + 0.1
print(val == 0.3)
print(val)
```

    False
    0.30000000000000004
    

## Floor division `//`, modulus `%`, power `**`


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
## [`decimal.Decimal`](https://docs.python.org/3/library/decimal.html)


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
    

## Operator precedence in calculations
Mathematical operator precedence applies. Use brackets if you want to change the execution order:


```python
print(1 + 2**2 * 3 / 6)  # 1 + 4 * 3 / 6 == 1 + 12 / 6 == 1 + 2
print((1 + 2**2) * 3 / 6)
```

    3.0
    2.5
    
