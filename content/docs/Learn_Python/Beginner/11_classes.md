
# [类](https://docs.python.org/3/tutorial/classes.html#a-first-look-at-classes)


```python
class MyFirstClass:
    def __init__(self, name):
        self.name = name

    def greet(self):
        print(f"Hello {self.name}!")
```


```python
my_instance = MyFirstClass("John Doe")
print(f"my_instance: {my_instance}")
print(f"type: {type(my_instance)}")
print(f"my_instance.name: {my_instance.name}")
```

    my_instance: <__main__.MyFirstClass object at 0x0000022C6B726160>
    type: <class '__main__.MyFirstClass'>
    my_instance.name: John Doe
    

## 方法
类（class）内部定义的函数被称为方法（methods）. 它们的用法与普通的函数（functions）有些相似. 


```python
alice = MyFirstClass(name="Alice")
alice.greet()
```

    Hello Alice!
    

### `__init__()`
`__init__()` 是一个用于初始化类实例的特殊方法。当你创建一个类的实例时，它会被调用。 


```python
class Example:
    def __init__(self):
        print("Now we are inside __init__")


print("creating instance of Example")
example = Example()
print("instance created")
```

    creating instance of Example
    Now we are inside __init__
    instance created
    

`__init__()`通常用于初始化类的实例变量。这些实例变量可以作为self之后的参数列出。为了能够在实例的存在时间内访问这些实例变量，你必须将它们保存到self中。self是类中方法的第一个参数，它是你访问实例变量和其他方法的途径。


```python
class Example:
    def __init__(self, var1, var2):
        self.first_var = var1
        self.second_var = var2

    def print_variables(self):
        print(f"{self.first_var} {self.second_var}")


e = Example("abc", 123)
e.print_variables()
```

    abc 123
    

### `__str__()`
`__str__()` 这是一个特殊方法，当类的实例被转换成字符串时（例如，当你想要打印这个实例时）会被调用。换句话说，通过为你的类定义__str__方法，你可以决定你的类的实例的可打印版本是什么。这个方法应该返回一个字符串。


```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __str__(self):
        return f"Person: {self.name}"


jack = Person("Jack", 82)
print(f"This is the string presentation of jack: {jack}")
```

    This is the string presentation of jack: Person: Jack
    

## 类变量 vs 实例变量
类变量在该类的所有实例之间共享，而实例变量则可以在该类的不同实例之间持有不同的值。


```python
class Example:
    # These are class variables
    name = "Example class"
    description = "Just an example of a simple class"

    def __init__(self, var1):
        # This is an instance variable
        self.instance_variable = var1

    def show_info(self):
        info = f"instance_variable: {self.instance_variable}, name: {Example.name}, description: {Example.description}"
        print(info)


inst1 = Example("foo")
inst2 = Example("bar")

# name and description have identical values between instances
assert inst1.name == inst2.name == Example.name
assert inst1.description == inst2.description == Example.description

# If you change the value of a class variable, it's changed across all instances
Example.name = "Modified name"
inst1.show_info()
inst2.show_info()
```

    instance_variable: foo, name: Modified name, description: Just an example of a simple class
    instance_variable: bar, name: Modified name, description: Just an example of a simple class
    

## 公有 vs 私有
在Python中，没有严格区分私有（private）或公有（public）方法或实例变量的机制。按照惯例，如果一个方法或实例变量应该被视为私有的，即不应该从类的外部访问，那么它的名称应该以下划线开头。这里的“私有”意味着它不应该被类的外部代码直接访问。

例如，假设我们有一个Person类，它有一个实例变量age。我们希望在实例创建后，age不能被直接访问（例如，被修改）。在Python中，这通常会通过以下方式实现:


```python
class Person:
    def __init__(self, age):
        self._age = age


example_person = Person(age=15)
# You can't do this:
# print(example_person.age)
# Nor this:
# example_person.age = 16
```

如果你希望age（年龄）可以被读取但不能被写入，你可以使用property（属性）功能:


```python
class Person:
    def __init__(self, age):
        self._age = age

    @property
    def age(self):
        return self._age


example_person = Person(age=15)
# Now you can do this:
print(example_person.age)
# But not this:
# example_person.age = 16
```

    15
    

这样，你就可以对你类的实例变量进行受控访问: 


```python
class Person:
    def __init__(self, age):
        self._age = age

    @property
    def age(self):
        return self._age

    def celebrate_birthday(self):
        self._age += 1
        print(f"Happy bday for {self._age} years old!")


example_person = Person(age=15)
example_person.celebrate_birthday()
```

    Happy bday for 16 years old!
    

## 继承简介


```python
class Animal:
    def greet(self):
        print("Hello, I am an animal")

    @property
    def favorite_food(self):
        return "beef"


class Dog(Animal):
    def greet(self):
        print("wof wof")


class Cat(Animal):
    @property
    def favorite_food(self):
        return "fish"
```


```python
dog = Dog()
dog.greet()
print(f"Dog's favorite food is {dog.favorite_food}")

cat = Cat()
cat.greet()
print(f"Cat's favorite food is {cat.favorite_food}")
```

    wof wof
    Dog's favorite food is beef
    Hello, I am an animal
    Cat's favorite food is fish
    
