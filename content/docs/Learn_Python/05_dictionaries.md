# [Dictionaries](https://docs.python.org/3/library/stdtypes.html#dict)

Collections of `key`-`value` pairs.

```python
my_empty_dict = {}  # alternative: my_empty_dict = dict()
print(f"dict: {my_empty_dict}, type: {type(my_empty_dict)}")
```

    dict: {}, type: <class 'dict'>

## Initialization

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

```python
print(f"keys: {dict1.keys()}")
print(f"values: {dict1.values()}")
print(f"items: {dict1.items()}")
```

    keys: dict_keys(['value1', 'value2', 'name'])
    values: dict_values([1.6, 10, 'John Doe'])
    items: dict_items([('value1', 1.6), ('value2', 10), ('name', 'John Doe')])

## Accessing and setting values

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

Accessing a nonexistent key will raise `KeyError` (see [`dict.get()`](#dict_get) for workaround):

```python
# print(my_dict['nope'])
```

## Deleting

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

## Dictionaries are mutable

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

Create a new `dict` if you want to have a copy:

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

Returns `None` if `key` is not in `dict`. However, you can also specify `default` return value which will be returned if `key` is not present in the `dict`.

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

Returns the `value` of `key` defined as first parameter. If the `key` is not present in the dict, adds `key` with default value (second parameter).

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

Merge two `dict`s

```python
dict1 = {"a": 1, "b": 2}
dict2 = {"c": 3}
dict1.update(dict2)
print(dict1)

# If they have same keys:
dict1.update({"c": 4})
print(dict1)
```

    {'a': 1, 'b': 2, 'c': 3}
    {'a': 1, 'b': 2, 'c': 4}

## The keys of a `dict` have to be immutable

Thus you can not use e.g. a `list` or a `dict` as key because they are mutable types
:

```python
# bad_dict = {['my_list'], 'value'}  # Raises TypeError
```

Values can be mutable

```python
good_dict = {"my key": ["Python", "is", "still", "cool"]}
print(good_dict)
```

    {'my key': ['Python', 'is', 'still', 'cool']}
