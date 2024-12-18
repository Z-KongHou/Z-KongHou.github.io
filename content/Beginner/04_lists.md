
# [Lists 列表](https://docs.python.org/3/library/stdtypes.html#lists)


```python
my_empty_list = []
print(f"empty list: {my_empty_list}, type: {type(my_empty_list)}")
```

    empty list: [], type: <class 'list'>
    


```python
list_of_ints = [1, 2, 6, 7]
list_of_misc = [0.2, 5, "Python", "is", "still fun", "!"]
print(f"lengths: {len(list_of_ints)} and {len(list_of_misc)}")
```

    lengths: 4 and 6
    

##  访问列表的某个值


```python
my_list = ["Python", "is", "still", "cool"]
print(my_list[0])
print(my_list[3])
```

    Python
    cool
    


```python
coordinates = [[12.0, 13.3], [0.6, 18.0], [88.0, 1.1]]  # two dimensional
print(f"first coordinate: {coordinates[0]}")
print(f"second element of first coordinate: {coordinates[0][1]}")
```

    first coordinate: [12.0, 13.3]
    second element of first coordinate: 13.3
    

##  更新列表的某个值


```python
my_list = [0, 1, 2, 3, 4, 5]
my_list[0] = 99
print(my_list)

# remove first value
del my_list[0]
print(my_list)
```

    [99, 1, 2, 3, 4, 5]
    [1, 2, 3, 4, 5]
    

##  检查某个值是否在列表中


```python
languages = ["Java", "C++", "Go", "Python", "JavaScript"]
if "Python" in languages:
    print("Python is there!")
```

    Python is there!
    


```python
if 6 not in [1, 2, 3, 7]:
    print("number 6 is not present")
```

    number 6 is not present
    

##  列表是可变的


```python
original = [1, 2, 3]
modified = original
modified[0] = 99
print(f"original: {original}, modified: {modified}")
```

    original: [99, 2, 3], modified: [99, 2, 3]
    

你可以通过创建新的 `list` 来避免这个问题：


```python
original = [1, 2, 3]
modified = list(original)  # Note list()
# Alternatively, you can use copy method
# modified = original.copy()
modified[0] = 99
print(f"original: {original}, modified: {modified}")
```

    original: [1, 2, 3], modified: [99, 2, 3]
    

## `list.append()`


```python
my_list = [1]
my_list.append("ham")
print(my_list)
```

    [1, 'ham']
    

## `list.remove()`


```python
my_list = ["Python", "is", "sometimes", "fun"]
my_list.remove("sometimes")
print(my_list)

# If you are not sure that the value is in list, better to check first:
# 如果你不确定某个值是否在列表中，最好先检查一下：
if "Java" in my_list:
    my_list.remove("Java")
else:
    print("Java is not part of this story.")
```

    ['Python', 'is', 'fun']
    Java is not part of this story.
    

## `list.sort()`


```python
numbers = [8, 1, 6, 5, 10]
numbers.sort()
print(f"numbers: {numbers}")

numbers.sort(reverse=True)
print(f"numbers reversed: {numbers}")

words = ["this", "is", "a", "list", "of", "words"]
words.sort()
print(f"words: {words}")
```

    numbers: [1, 5, 6, 8, 10]
    numbers reversed: [10, 8, 6, 5, 1]
    words: ['a', 'is', 'list', 'of', 'this', 'words']
    

## `sorted(list)`

`list.sort()` 会就地排序列表，而 `sorted(list)` 会返回一个新的列表，而不会改变原始列表：

`list.sort()` 会就地排序列表，而 `sorted(list)` 会返回一个新的列表，而不会改变原始列表：


```python
numbers = [8, 1, 6, 5, 10]
sorted_numbers = sorted(numbers)
print(f"{numbers=}, {sorted_numbers=}")
```


      File "<fstring>", line 1
        (numbers=)
                ^
    SyntaxError: invalid syntax
    


## `list.extend()`


```python
first_list = ["beef", "ham"]
second_list = ["potatoes", 1, 3]
first_list.extend(second_list)
print(f"{first_list=}, {second_list=}")
```


      File "<fstring>", line 1
        (first_list=)
                   ^
    SyntaxError: invalid syntax
    


你也可以通过相加列表来扩展它们：

你也可以通过相加列表来扩展它们：


```python
first = [1, 2, 3]
second = [4, 5]
first += second  # same as: first = first + second
print(f"{first=}")
```


      File "<fstring>", line 1
        (first=)
              ^
    SyntaxError: invalid syntax
    


## `list.reverse()`


```python
my_list = ["a", "b", "ham"]
my_list.reverse()
print(my_list)
```

    ['ham', 'b', 'a']
    
