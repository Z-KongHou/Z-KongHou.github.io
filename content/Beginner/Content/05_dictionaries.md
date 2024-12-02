
# [Dictionaries 字典](https://docs.python.org/3/library/stdtypes.html#dict) 
集合`key`-`value`对。


```python
my_empty_dict = {}  # alternative: my_empty_dict = dict()
print(f"dict: {my_empty_dict}, type: {type(my_empty_dict)}")
```

    dict: {}, type: <class 'dict'>
    

## 初始化


```python
dict1 = {"value1": 1.6, "value2": 10, "name": "John Doe"}
dict2 = dict(value1=1.6, value2=10, name="John Doe")

print(dict1)
print(dict2)

print(f"equals: {dict1 == dict2}")
print(f"length: {len(dict1)}")
```

    {'value1': 1.6, 'value2': 10, 'name': 'John Doe'}
    {'value1': 1.6, 'value2': 10, 'name': 'John Doe'}
    equals: True
    length: 3
    

## `dict.keys(), dict.values(), dict.items()`

取得字典的键、值、键值对列表。


```python
print(f"keys: {dict1.keys()}")
print(f"values: {dict1.values()}")
print(f"items: {dict1.items()}")
```

    keys: dict_keys(['value1', 'value2', 'name'])
    values: dict_values([1.6, 10, 'John Doe'])
    items: dict_items([('value1', 1.6), ('value2', 10), ('name', 'John Doe')])
    

##  访问和设置值


```python
my_dict = {}
my_dict["key1"] = "value1"
my_dict["key2"] = 99
my_dict["key1"] = "new value"  # overriding existing value
print(my_dict)
print(f"value of key1: {my_dict['key1']}")
```

    {'key1': 'new value', 'key2': 99}
    value of key1: new value
    

访问一个不存在的键将引发`KeyError`（请参阅[`dict.get()`](#dict_get)以解决此问题）：

访问一个不存在的键将引发`KeyError`（请参阅[`dict.get()`](#dict_get)以解决此问题）：


```python
# print(my_dict['nope'])
```

##  删除


```python
my_dict = {"key1": "value1", "key2": 99, "keyX": "valueX"}
del my_dict["keyX"]
print(my_dict)

# Usually better to make sure that the key exists (see also pop() and popitem())
key_to_delete = "my_key"
if key_to_delete in my_dict:
    del my_dict[key_to_delete]
else:
    print(f"{key_to_delete} is not in {my_dict}")
```

    {'key1': 'value1', 'key2': 99}
    my_key is not in {'key1': 'value1', 'key2': 99}
    

## 字典是可变的


```python
my_dict = {"ham": "good", "carrot": "semi good"}
my_other_dict = my_dict
my_other_dict["carrot"] = "super tasty"
my_other_dict["sausage"] = "best ever"
print(f"{my_dict=}\nother: {my_other_dict}")
print(f"equals: {my_dict == my_other_dict}")
```


      File "<fstring>", line 1
        (my_dict=)
                ^
    SyntaxError: invalid syntax
    


如果要一个复制，请创建一个新的`dict`：


```python
my_dict = {"ham": "good", "carrot": "semi good"}
my_other_dict = dict(my_dict)
my_other_dict["beer"] = "decent"
print(f"{my_dict=}\nother: {my_other_dict}")
print(f"equals: {my_dict == my_other_dict}")
```


      File "<fstring>", line 1
        (my_dict=)
                ^
    SyntaxError: invalid syntax
    


<a id='dict_get'></a>
## `dict.get()`


如果`key`不在`dict`中返回`None`。但是，您还可以指定`default`返回值，如果`key`不在`dict`中，则返回该值。

返回`None`如果`key`不在`dict`中。但是，您还可以指定`default`返回值，如果`key`不在`dict`中，则返回该值。


```python
my_dict = {"a": 1, "b": 2, "c": 3}
value_of_d = my_dict.get("d")
print(f"d: {value_of_d}")

value_of_d = my_dict.get("d", "my default value")
print(f"d: {value_of_d}")
```

    d: None
    d: my default value
    

## `dict.pop()`


```python
my_dict = dict(food="ham", drink="beer", sport="football")
print(f"dict before pops: {my_dict}")

food = my_dict.pop("food")
print(f"food: {food}")
print(f"dict after popping food: {my_dict}")

food_again = my_dict.pop("food", "default value for food")
print(f"food again: {food_again}")
print(f"dict after popping food again: {my_dict}")
```

    dict before pops: {'food': 'ham', 'drink': 'beer', 'sport': 'football'}
    food: ham
    dict after popping food: {'drink': 'beer', 'sport': 'football'}
    food again: default value for food
    dict after popping food again: {'drink': 'beer', 'sport': 'football'}
    

## `dict.setdefault()`

返回作为第一个参数定义的`key`的`value`。如果`key`不在字典中，则使用默认值（第二个参数）添加`key`。

返回作为第一个参数定义的`key`的`value`。如果`key`不在字典中，则使用默认值（第二个参数）添加`key`。


```python
my_dict = {"a": 1, "b": 2, "c": 3}
a = my_dict.setdefault("a", "my default value")
d = my_dict.setdefault("d", "my default value")
print(f"a: {a}\nd: {d}\nmy_dict: {my_dict}")
```

    a: 1
    d: my default value
    my_dict: {'a': 1, 'b': 2, 'c': 3, 'd': 'my default value'}
    

## `dict.update()`

将两个`dict`合并

将两个`dict`合并


```python
dict1 = {"a": 1, "b": 2}
dict2 = {"c": 3}
dict1.update(dict2)
print(dict1)

# If they have same keys: 如果它们有相同的键：则更新字典值
dict1.update({"c": 4})
print(dict1)
```

    {'a': 1, 'b': 2, 'c': 3}
    {'a': 1, 'b': 2, 'c': 4}
    

## 字典的`键`必须是不可变的

因此，您不能使用例如`list`或`dict`作为键，因为它们是可变类型

因此，您不能使用例如`list`或`dict`作为键，因为它们是可变类型


```python
# bad_dict = {['my_list'], 'value'}  # Raises TypeError
```

但是值可以是可变的

但是值可以是可变的


```python
good_dict = {"my key": ["Python", "is", "still", "cool"]}
print(good_dict)
```

    {'my key': ['Python', 'is', 'still', 'cool']}
    
