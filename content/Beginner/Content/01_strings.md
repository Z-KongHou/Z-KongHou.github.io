
# [Strings 字符串 ](https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str)


```python
my_string = "Python is my favorite programming language!"
```


```python
my_string
```




    'Python is my favorite programming language!'




```python
type(my_string)
```




    str




```python
len(my_string)
```




    43



### 长字符串遵循[PEP8](https://www.python.org/dev/peps/pep-0008/#maximum-line-length)规范


```python
long_story = (
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    "Pellentesque eget tincidunt felis. Ut ac vestibulum est."
    "In sed ipsum sit amet sapien scelerisque bibendum. Sed "
    "sagittis purus eu diam fermentum pellentesque."
)
long_story
```




    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Pellentesque eget tincidunt felis. Ut ac vestibulum est.In sed ipsum sit amet sapien scelerisque bibendum. Sed sagittis purus eu diam fermentum pellentesque.'



## `str.replace()`

如果你不知道这个函数如何使用，你可以用help函数查询：


```python
help(str.replace)
```

    Help on method_descriptor:
    
    replace(...)
        S.replace(old, new[, count]) -> str
        
        Return a copy of S with all occurrences of substring
        old replaced by new.  If the optional argument count is
        given, only the first count occurrences are replaced.
    
    

下面这串代码将不会按照把"a"替换成"?"的要求打印出结果，因为replace函数不会在原字符串上进行修改。


```python
my_string.replace("a", "?")
print(my_string)
```

    Python is my favorite programming language!
    

你必须把replace函数的返回值赋值给一个变量，这样才可以实现替换。

你必须把replace函数的返回值赋值给一个变量，这样才可以实现替换。


```python
my_modified_string = my_string.replace("is", "will be")
print(my_modified_string)
```

    Python will be my favorite programming language!
    

需要注意的是：在本教程接下来的所有函数同replace()函数一样，你必须把函数的返回值赋值给一个变量，这样才可以取得函数的结果，这些函数并不会对原字符串产生任何的改变，均返回一个新的字符串。

## f-strings

在Python 3.6及以上版本中，你可以使用f-strings来格式化字符串。

通过在字符串前加上字母"f"，你可以在字符串中直接用{变量名}插入变量。


```python
first_name = "John"
last_name = "Doe"
age = 88
print(f"My name is {first_name} {last_name}, you can call me {first_name}.")
print(f"I'm {age} years old.")
```

    My name is John Doe, you can call me John.
    I'm 88 years old.
    

也可以通过{变量名=}来打印“变量名=变量值”。


```python
print(f"Use '=' to also print the variable name like this: {age=}")
```


      File "<fstring>", line 1
        (age=)
            ^
    SyntaxError: invalid syntax
    


## `str.join()`

通过join函数，你可以把一个字符串列表连接成一个字符串，并且可以指定连接的分隔符。


```python
pandas = "pandas"
numpy = "numpy"
requests = "requests"
cool_python_libs = ", ".join([pandas, numpy, requests])
```


```python
print(f"Some cool python libraries: {cool_python_libs}")
```

    Some cool python libraries: pandas, numpy, requests
    

替代方法（不推荐，因为不够[Pythonic](http://docs.python-guide.org/en/latest/writing/style/#idioms)，而且速度[较慢](https://waymoot.org/home/python_string/)）：


```python
cool_python_libs = pandas + ", " + numpy + ", " + requests
print(f"Some cool python libraries: {cool_python_libs}")

cool_python_libs = pandas
cool_python_libs += ", " + numpy
cool_python_libs += ", " + requests
print(f"Some cool python libraries: {cool_python_libs}")
```

    Some cool python libraries: pandas, numpy, requests
    Some cool python libraries: pandas, numpy, requests
    

## `str.upper(), str.lower(), str.title()`


```python
mixed_case = "PyTHoN hackER"
```

将字符串全部转换成大写。


```python
mixed_case.upper()
```




    'PYTHON HACKER'



将字符串全部转换成小写。


```python
mixed_case.lower()
```




    'python hacker'



将字符串首字母大写。


```python
mixed_case.title()
```




    'Python Hacker'



## `str.strip()`

这个函数会删除字符串开头和结尾的空白字符（包括空格、换行符、制表符等）。


```python
ugly_formatted = " \n \t Some story to tell "
stripped = ugly_formatted.strip()

print(f"ugly: {ugly_formatted}")
print(f"stripped: {stripped}")
```

    ugly:  
     	 Some story to tell 
    stripped: Some story to tell
    

## `str.split()`

这个函数会把字符串按照指定的分隔符分割成字符串列表且默认情况下为空格。


```python
sentence = "three different words"
words = sentence.split()
print(words)
```

    ['three', 'different', 'words']
    


```python
type(words)
```




    list




```python
secret_binary_data = "01001,101101,11100000"
binaries = secret_binary_data.split(",")
print(binaries)
```

    ['01001', '101101', '11100000']
    

## 在一行中连续调用多个函数（对一个字符串变量连续进行多次操作）。


```python
ugly_mixed_case = "   ThIS LooKs BAd "
pretty = ugly_mixed_case.strip().lower().replace("bad", "good")
print(pretty)
```

    this looks good
    

注意：函数的执行顺序是从左到右的，所以下面的代码不会按照预期打印出结果。


```python
pretty = ugly_mixed_case.replace("bad", "good").strip().lower()
print(pretty)
```

    this looks bad
    

## [Escape characters](http://python-reference.readthedocs.io/en/latest/docs/str/escapes.html#escape-characters)——转义字符

点击上方可以跳转Python中转义字符的官方文档，你可以在这里找到所有转义字符的详细解释。

下面是两个常用的转义字符：换行符（\n）和制表符（\t）。


```python
two_lines = "First line\nSecond line"
print(two_lines)
```

    First line
    Second line
    


```python
indented = "\tThis will be indented"
print(indented)
```

    	This will be indented
    
