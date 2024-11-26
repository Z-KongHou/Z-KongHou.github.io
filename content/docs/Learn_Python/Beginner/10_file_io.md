
# [文件 I/O操作](https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files)
读取和写入文件。

## 使用路径


```python
from pathlib import Path

current_file = Path("file_io.ipynb").resolve()
print(f"current file: {current_file}")
# 注意：在.py文件中，您可以通过path（__file__）获取当前文件的路径

current_dir = current_file.parent
print(f"current directory: {current_dir}")

data_dir = current_dir.parent / "data"
print(f"data directory: {data_dir}")
```

    current file: file_io.ipynb
    current directory: .
    data directory: data
    

### 检查路径是否存在


```python
print(f"exists: {data_dir.exists()}")
print(f"is file: {data_dir.is_file()}")
print(f"is directory: {data_dir.is_dir()}")
```

    exists: False
    is file: False
    is directory: False
    

## 读取文件


```python
file_path = data_dir / "simple_file.txt"

with open(file_path) as simple_file:
    for line in simple_file:
        print(line.strip())
```


    ---------------------------------------------------------------------------

    FileNotFoundError                         Traceback (most recent call last)

    <ipython-input-3-2a22b5fe7209> in <module>()
          1 file_path = data_dir / "simple_file.txt"
          2 
    ----> 3 with open(file_path) as simple_file:
          4     for line in simple_file:
          5         print(line.strip())
    

    FileNotFoundError: [Errno 2] No such file or directory: 'data\\simple_file.txt'


 [`with`](https://docs.python.org/3/reference/compound_stmts.html#the-with-statement) 语句用于获取[上下文管理器](https://docs.python.org/3/reference/datamodel.html#with-statement-context-managers) 该上下文管理器将用作`with`语句中命令的执行上下文。上下文管理器保证在退出上下文时完成某些操作。

在这种情况下，上下文管理器保证在退出上下文时隐式调用 `simple_file.close()`函数。这是一种让开发人员生活更轻松的方法：您不必记住显式关闭您打开的文件，也不必担心文件打开时发生异常。未关闭的文件可能是资源泄漏的来源。因此，最好始终与文件I/O一起使用 `with open()` 结构。

举个例子，和上面一样，没有`with`语句.


```python
file_path = data_dir / "simple_file.txt"

# 这不是首选方式
simple_file = open(file_path)
for line in simple_file:
    print(line.strip())
simple_file.close()  # 这必须明确地调用
```


    ---------------------------------------------------------------------------

    FileNotFoundError                         Traceback (most recent call last)

    <ipython-input-4-60fe322ff2ff> in <module>()
          2 
          3 # 这不是首选方式
    ----> 4 simple_file = open(file_path)
          5 for line in simple_file:
          6     print(line.strip())
    

    FileNotFoundError: [Errno 2] No such file or directory: 'data\\simple_file.txt'


## 写入文件


```python
new_file_path = data_dir / "new_file.txt"

with open(new_file_path, "w") as my_file:
    my_file.write("This is my first file that I wrote with Python.")
```


    ---------------------------------------------------------------------------

    FileNotFoundError                         Traceback (most recent call last)

    <ipython-input-5-c074c8ddad58> in <module>()
          1 new_file_path = data_dir / "new_file.txt"
          2 
    ----> 3 with open(new_file_path, "w") as my_file:
          4     my_file.write("This is my first file that I wrote with Python.")
    

    FileNotFoundError: [Errno 2] No such file or directory: 'data\\new_file.txt'


现在去检查数据目录中是否有new_file.txt文件。之后，您可以通过以下方式删除该文件：


```python
if new_file_path.exists():  # 确保文件存在
    new_file_path.unlink()
```
