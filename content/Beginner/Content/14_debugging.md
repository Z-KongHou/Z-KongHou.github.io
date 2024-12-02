
# 使用[`pdb`](https://docs.python.org/3/library/pdb.html#module-pdb)进行调试
您的程序并不总是按照您预期的方式运行。如果错误的来源不明确，调试通常是找出意外行为根本原因的最有效方法。Python 标准库拥有一个内置调试器，这是解决与代码相关的任何问题的强大工具。

## `breakpoint()`
调试的基本用例是您希望在某个特定点停止程序的执行，并从该特定点开始监视变量值或程序执行的总体情况。您可以通过在代码中设置断点 breakpoint() 来在所需的点停止执行。

当您执行程序时，执行将在这个点停止，并进入交互式调试会话。您可以在代码中添加尽可能多的断点。

## 一些有用的命令
请在[此处](https://docs.python.org/3/library/pdb.html#debugger-commands)查看完整列表。

* `h` 或 `help`: 打印可用命令的列表。如果您提供一个参数，例如 help continue，则打印continue 命令的帮助信息。
* `l` 或 `list`: 列出当前所在位置周围的一段代码。
* `n` 或 `next`: 执行下一行。
* `s` 或 `step`: 与 next 相同，但会“进入”下一行中调用的函数。
* `c` 或 `continue`: 继续执行直到下一个断点。
* `r` 或 `return`: 继续执行直到当前函数返回。
* `q` 或 `quit`: 退出调试器并中止程序执行。

请注意，您可以在调试会话中通过输入变量名称来查看任何变量的值。您还可以在调试会话中执行任意代码。

## 让我们看看它是如何工作的
取消注释 `Pdb().set_trace()`（这是 Jupyter notebook 中与 breakpoint() 等效的方式）行并执行单元格。使用上面定义的命令逐行执行程序。尝试所有提到的命令至少一次。注意 n 和 s 之间的区别。


```python
from IPython.core.debugger import Pdb


class SuperGreeter:
    def __init__(self, people_to_greet):
        self.people = people_to_greet

    def greet(self):
        for person in self.people:
            if person.islower():
                self._greet_street_style(person)
            elif len(person) > 7:
                self._greet_hawaii(person)
            else:
                self._greet_polite(person)

    def _greet_polite(self, name):
        greeting = f"G'day {name}! How are you doing?"
        print(greeting)

    def _greet_street_style(self, name):
        # Pdb().set_trace() # 取消注释
        name = name.upper()
        print(f"WASSUP {name}!?")

    def _greet_hawaii(self, name):
        print(f"Aloha {name}!")


def main():
    people = ["John Doe", "Donald", "Lisa", "alex"]
    # Pdb().set_trace()  # 取消注释
    greeter = SuperGreeter(people)
    greeter.greet()


main()
```

    Aloha John Doe!
    G'day Donald! How are you doing?
    G'day Lisa! How are you doing?
    WASSUP ALEX!?
    
