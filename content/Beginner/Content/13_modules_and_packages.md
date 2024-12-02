
# [模块和包](https://docs.python.org/3/tutorial/modules.html#modules)

> 模块是一个 Python 源代码文件，即扩展名为 .py 的文件。

> 包是一个包含 init.py 文件的目录，并且可以包含 Python 模块和其他包。


## 为什么要将代码组织成模块和包
* 可维护性
* 可重用性
* 命名空间
* 不熟悉项目的人可以通过查看项目的目录结构，快速获得清晰的概览
* 搜索特定功能或类很容易

## 如何使用

让我们以以下目录结构为例：

```
food_store/
    __init__.py
    
    product/
        __init__.py
        
        fruit/
            __init__.py
            apple.py
            banana.py
            
        drink/
            __init__.py
            juice.py
            milk.py
            beer.py

    cashier/
        __ini__.py
        receipt.py
        calculator.py
```

假设 `banana.py` 文件包含：


```python
def get_available_brands():
    return ["chiquita"]


class Banana:
    def __init__(self, brand="chiquita"):
        if brand not in get_available_brands():
            raise ValueError(f"Unknown brand: {brand}")
        self._brand = brand
```

### 导入

假设我们需要在 `receipt.py` 文件中访问 `banana.py` 文件中的 Banana 类。我们可以通过在 `receipt.py` 文件的开头导入来实现：


```python
from food_store.product.fruit.banana import Banana

# 然后它可以这样使用：
my_banana = Banana()
```


    ---------------------------------------------------------------------------

    ModuleNotFoundError                       Traceback (most recent call last)

    <ipython-input-2-9e300da5f747> in <module>()
    ----> 1 from food_store.product.fruit.banana import Banana
          2 
          3 # 然后它可以这样使用：
          4 my_banana = Banana()
    

    ModuleNotFoundError: No module named 'food_store'


如果我们需要从 `banana.py` 文件中访问多个类或函数：


```python
from food_store.product.fruit import banana

# 然后它可以这样使用：
brands = banana.get_available_brands()
my_banana = banana.Banana()
```


    ---------------------------------------------------------------------------

    ModuleNotFoundError                       Traceback (most recent call last)

    <ipython-input-3-97a3fcc1e27d> in <module>()
    ----> 1 from food_store.product.fruit import banana
          2 
          3 # 然后它可以这样使用：
          4 brands = banana.get_available_brands()
          5 my_banana = banana.Banana()
    

    ModuleNotFoundError: No module named 'food_store'


有关模块和包的全面介绍可以在[此处](https://realpython.com/python-modules-packages/)找到
