
#  最好的开发实践经验

##  每个项目一个虚拟环境
<img style="float: left;" src="../img/virtualenvs.jpg">


### 为什么 
* 独立
* 不同的项目有不同的依赖版本
* 你不想搞乱系统Python环境

### 工具
`poetry`是目前推荐的依赖管理工具，但["考虑在poetry不满足您的使用情况时使用其他工具，如pip"](https://packaging.python.org/guides/tool-recommendations/#application-dependency-management)。如果您使用`poetry`不合适，我建议使用`virtualenvwrapper`进行虚拟环境管理，并使用`pip`进行包管理。另一方面，如果您只处理几个项目，内置的[`venv`](https://docs.python.org/3/library/venv.html)就足够了。
#### [`poetry`](https://python-poetry.org/docs/)
* 基本上结合了`pip`、`virtualenv`和打包工具在一个CLI中
* [pyproject.toml](https://python-poetry.org/docs/pyproject/)，这取代了requirements.txt和requirements-dev.txt的需求
* poetry.lock，这会固定依赖项，这意味着确定性构建


### Tooling
`poetry`是目前推荐的依赖管理工具，但["考虑在poetry不满足您的使用情况时使用其他工具，如pip"](https://packaging.python.org/guides/tool-recommendations/#application-dependency-management)。如果您使用`poetry`不合适，我建议使用`virtualenvwrapper`进行虚拟环境管理，并使用`pip`进行包管理。另一方面，如果您只处理几个项目，内置的[`venv`](https://docs.python.org/3/library/venv.html)就足够了。
#### [`poetry`](https://python-poetry.org/docs/)
* 基本上结合了`pip`、`virtualenv`和打包工具在一个CLI中
* [pyproject.toml](https://python-poetry.org/docs/pyproject/)，这取代了requirements.txt和requirements-dev.txt的需求
* poetry.lock，这会固定依赖项，这意味着确定性构建


#### [`virtualenvwrapper`](https://virtualenvwrapper.readthedocs.io/en/latest/)
* 如果您使用的是Windows命令提示符：[`virtualenvwrapper-win`](https://pypi.org/project/virtualenvwrapper-win/)
* 顾名思义，是[`virtualenv`](https://pypi.org/project/virtualenv/)的包装器
* 简化了创建、删除和（取消）激活您的虚拟环境的流程

#### [`virtualenvwrapper`](https://virtualenvwrapper.readthedocs.io/en/latest/)
* 如果您使用的是Windows命令提示符：[`virtualenvwrapper-win`](https://pypi.org/project/virtualenvwrapper-win/)
* 顾名思义，是[`virtualenv`](https://pypi.org/project/virtualenv/)的包装器
* 简化了创建、删除和（取消）激活您的虚拟环境的流程

#### [`pyenv`](https://github.com/pyenv/pyenv)
* 轻松更改全局/每个项目的Python版本
* 还是一个用于安装不同Python版本的工具（也提供不同的运行时，例如[PyPy](https://pypy.org/)）
* 如果您需要处理不同的Python版本，则很有用

## 测试您的代码
<img style="float: left;" src="../img/testing.png">

### 为什么
*  防止意外（特别是在工作中）
* 确保一切按预期工作
*  确保在引入新功能后旧的东西仍然按预期工作（回归）
*  重构时，测试会给你信心
*   好的测试展示了应用程序的使用案例，即它们也记录了实现
* ...

### 工具
#### [`pytest`](https://docs.pytest.org/en/latest/)
Python标准库中有一个[`unittest`](https://docs.python.org/3/library/unittest.html)模块，但目前最流行的测试运行程序绝对是`pytest`。

使用`pytest`的一些原因：
* [`fixtures`](https://docs.pytest.org/en/latest/fixture.html#fixture)用于编写可重用的测试代码
* [`markers`](https://docs.pytest.org/en/latest/example/markers.html)用于将测试拆分为不同的组（例如，冒烟测试，仅在CI机器上运行等）或在某些条件下跳过测试
* [自动测试发现](https://docs.pytest.org/en/latest/goodpractices.html#test-discovery)
* [可配置性](https://docs.pytest.org/en/latest/customize.html)
* 活跃的插件开发，举几个例子：
    * [`pytest-cov`](https://pytest-cov.readthedocs.io/en/latest/)用于覆盖率报告
    * [`pytest-xdist`](https://github.com/pytest-dev/pytest-xdist)用于通过并行化加速测试套件运行时间
    * 查看[完整列表](https://github.com/pytest-dev)——由`pytest`维护的插件
* 简化[编写自己的插件](https://docs.pytest.org/en/latest/writing_plugins.html)

### Tooling
#### [`pytest`](https://docs.pytest.org/en/latest/)
Python标准库中有一个[`unittest`](https://docs.python.org/3/library/unittest.html)模块，但目前最流行的测试运行程序绝对是`pytest`。

使用`pytest`的一些原因：
* [`fixtures`](https://docs.pytest.org/en/latest/fixture.html#fixture)用于编写可重用的测试代码
* [`markers`](https://docs.pytest.org/en/latest/example/markers.html)用于将测试拆分为不同的组（例如，冒烟测试，仅在CI机器上运行等）或在某些条件下跳过测试
* [自动测试发现](https://docs.pytest.org/en/latest/goodpractices.html#test-discovery)
* [可配置性](https://docs.pytest.org/en/latest/customize.html)
* 活跃的插件开发，举几个例子：
    * [`pytest-cov`](https://pytest-cov.readthedocs.io/en/latest/)用于覆盖率报告
    * [`pytest-xdist`](https://github.com/pytest-dev/pytest-xdist)用于通过并行化加速测试套件运行时间
    * 查看[完整列表](https://github.com/pytest-dev)——由`pytest`维护的插件
* 简化[编写自己的插件](https://docs.pytest.org/en/latest/writing_plugins.html)

#### [`tox`](https://tox.readthedocs.io/en/latest/)
`tox`使你能够轻松地针对不同的Python解释器/运行时和依赖版本测试你的代码。当你编写应该支持不同Python版本的软件时，这通常适用于库类软件包，这是非常重要的。另一方面，如果你正在开发一个将部署到已知目标平台的Web应用程序，那么测试多个不同的版本通常是不必要的。然而，`tox`也可以将linting配置为`tox`运行的一部分。因此，`tox`可以通过将多个不同的操作包装在一个命令下，显著简化开发工作流程。

##  写高质量的代码
<img style="float: left;" src="../img/high_quality_code.png">

### 为什么
*  容易阅读
*  更好的可维护性
*  更好的质量==更少的错误


```python
import this
```

    The Zen of Python, by Tim Peters
    
    Beautiful is better than ugly.
    Explicit is better than implicit.
    Simple is better than complex.
    Complex is better than complicated.
    Flat is better than nested.
    Sparse is better than dense.
    Readability counts.
    Special cases aren't special enough to break the rules.
    Although practicality beats purity.
    Errors should never pass silently.
    Unless explicitly silenced.
    In the face of ambiguity, refuse the temptation to guess.
    There should be one-- and preferably only one --obvious way to do it.
    Although that way may not be obvious at first unless you're Dutch.
    Now is better than never.
    Although never is often better than *right* now.
    If the implementation is hard to explain, it's a bad idea.
    If the implementation is easy to explain, it may be a good idea.
    Namespaces are one honking great idea -- let's do more of those!
    

###  代码格式化工具

[PEP8](https://www.python.org/dev/peps/pep-0008/?)（参见["for humans version"](https://pep8.org/)）描述了Python代码的样式指南，你应该遵循它们。幸运的是，有很棒的工具可以帮你处理这个问题，这样你就可以专注于编写代码，而不是格式化它。

#### [`black`](https://black.readthedocs.io/en/stable/)


* 这是Python社区的通用格式化工具

### 工具 - linters


自动代码格式化很方便，但除此之外，你应该使用静态分析器（linter）来检测代码中的潜在陷阱。

#### [`ruff`](https://beta.ruff.rs/docs/)

* 最全面的linter。作为一个额外的好处，它非常快。

### 工具 - pre-commit
#### [`pre-commit`](https://pre-commit.com/)
理想情况下，所有项目贡献者都应遵循项目的最佳实践，例如尊重PEP8或确保提交中没有任何linting错误或安全漏洞。然而，由于代码格式化和linter主要是本地工具，这无法保证。`pre-commit`让你配置（.pre-commit-config.yaml文件）一组钩子，这些钩子将在提交/推送之前作为预操作运行。开发人员第一次调用`pre-commit install`后，这些钩子将自动在每次提交/推送之前运行。
* 提交前运行格式化
* 如果有linting错误，则提交失败
* 在代码提交到远程之前，先练习测试套件（在大多数情况下可能耗时较长）
* 简单配置[你自己的钩子](https://pre-commit.com/#new-hooks)
* 还可以使用[现有的钩子](https://github.com/pre-commit/pre-commit-hooks)
* 还有[pre-push选项](https://pre-commit.com/#pre-commit-during-push)
* 用Python编写，但也支持其他语言，如Ruby、Go和Rust
* 更少的CI构建失败！

## 结构化你的代码和项目
<img style="float: left;" src="../img/bad_code.jpg">

### 为什么
*  打包和模块结构可以让你对项目有一个概述
*  模块化设计==更好的可重用性

### 怎么做
一些一般准则：
*  不要把太多的东西放在一个模块中
*  将项目拆分为包
*  保持命名一致性


一些关于结构化你的项目的建议。如果你正在开发，比如说一个相对较大的商业应用程序，将一些非核心业务逻辑包分离到一个单独的项目中，并作为单独的包发布，是有意义的。这样，“主要”存储库就不会膨胀，并且对新来者更具可接近性。此外，你（或其他人）将来可以轻松地重用这个“分离”的包，这通常适用于不同的实用功能。

让我们以一个实际的例子为例。如果你的团队有两个不同的应用程序与同一个第三方交互，为它实现一个单独的客户端库进行通信是有益的。这样，如果第三方决定在他们的API中做出不兼容的更改，只需要在一个地方（在客户端库中）进行更改。

### 工具
#### [`cookiecutter`](https://cookiecutter.readthedocs.io/en/latest/)
<img style="float: left;" src="../img/cookiecutter.jpg">


Cookiecutter是一个让你从预定义模板创建项目的工具。

* 快速设置新项目，无需从现有项目复制粘贴
* 跨所有项目保持一致的开发实践（项目结构以及例如`pre-commit`、`tox`和CI配置）
* 你可以自己创建一个，或者使用其中的一些[现有模板](https://cookiecutter.readthedocs.io/en/latest/readme.html#python)
* 用Python编写，但也可以应用于非Python项目，甚至非编程相关的目录和文件结构

## 使用持续集成和部署
<img style="float: left;" src="../img/ci.jpg">

 
CI & CD属于软件开发的最佳实践，没有争议，无论开发所使用的技术堆栈是什么。从Python的角度来看，CI是我们想要确保上述最佳实践被遵循的地方。例如，在较大的项目中，甚至可能不实际/不可能在开发人员的机器上运行完整的测试套件。

### 为什么
* 确保测试通过
*  CI是可能运行一些耗时测试的地方，这是测试开发人员更喜欢在本地机器上跳过的
*  确保没有linting错误
*  理想情况下，测试所有目标版本和平台的地方
*   总的来说，CI是自动确保质量的最后手段
*  手动部署耗时且易出错，CD是自动和确定的
*  你希望尽可能多地自动化，人类时间很宝贵
*   最小化代码审查所需的时间——什么可以通过自动工具检测到，应该使用这些工具检测到。人类时间很宝贵。

### 工具
工具取决于你选择的git仓库管理选项以及你的需求。例如：
* [GitHub Actions](https://github.com/features/actions) 
*  如果你使用Gitlab，它也有[集成的CI/CD](https://about.gitlab.com/features/gitlab-ci-cd/)
*  [BitBucket](https://www.atlassian.com/continuous-delivery/continuous-integration-tutorial)也是如此


## 利用你的编辑器的功能

### 为什么
*  高效流畅的开发
*  有很多工具可以让你的日常编程更容易，为什么不用呢？

### 工具

由于可用的编辑器和IDE有很多，更不用说每个人都有自己的偏好，所以我将重点介绍我最喜欢的IDE，PyCharm的一些功能，我强烈推荐用于Python开发。

#### [PyCharm](https://www.jetbrains.com/help/pycharm/quick-start-guide.html)
*  与`pytest`的良好集成，例如运行单个测试/测试类/测试模块
*  Git集成（如果你不喜欢命令行）
*  配置自动格式化很容易，例如[`black`](https://github.com/ambv/black#pycharm)
*  直观的搜索功能
*  重构功能
*  调试器
*  Jupyter Notebook集成
*  免费社区版已经包含了你需要的一切

## 使用现有解决方案
<img style="float: left;" src="../img/reinvent.jpg">

### 为什么
*  Python标准库广泛而稳定！
* [PyPI](https://pypi.org/)中超过150k个包
* 有人很可能已经解决了你试图解决的问题
* 在开始解决问题之前，先花5分钟进行谷歌研究，例如[stackoverflow](https://stackoverflow.com/)是一个神奇的地方。

## 高效地学习如何调试
<img style="float: left;" src="../img/debugging.jpg">

### 为什么
*  无论如何，你都不会编写完全稳定的代码——不可能出现的情况。
* 当某些东西没有按预期工作时，有很多工具可以帮助你找出问题所在。

### 工具 - debuggers
#### [`pdb`](https://docs.python.org/3/library/pdb.html)
*  部分是标准库
* 对于大多数用例来说足够了

#### [`ipdb`](https://pypi.org/project/ipdb/)
*  有功能丰富的`pdb`与类似的API

#### [`pdb++`](https://pypi.org/project/pdbpp/)
* `pdb`的替代品，具有额外功能

### 工具 - profilers

#### [`memray`](https://bloomberg.github.io/memray/)
* 可能你需要的唯一内存分析器

#### [`py-spy`](https://github.com/benfred/py-spy)
* P无需修改源代码或重新启动目标进程即可分析运行中的Python程序
*   例如生产中的Web应用程序问题的潜在工具

###  工具 - 运行时错误跟踪

这些工具在Web应用程序中特别有用，因为你会收到有关运行时异常的报告——以及带有完整回溯和变量值的通知。考虑到实施和部署修复所需的时间，这些信息通常足以确定问题的根本原因，这是一个巨大的好处。

#### [Sentry](https://docs.sentry.io/?platform=python)
*  完整的堆栈跟踪与相关变量（`locals()`）值
*  客户端的浏览器和操作系统信息
* 支持其他语言

### 工具 - misc

#### 使用logging而不是打印
<img style="float: left;" src="../img/prints.jpg">

*  [`logging`](https://docs.python.org/3/library/logging.html)是标准库的一部分
* 使用logging可以将输出重定向到文件
*  在终端用户报告问题后，通常首先查看日志
* 你可以指定运行时级别——不需要删除调试打印

### 一些具有普遍性的建议
*  如果你正在构建应用程序，请使用最新的Python。
*  如果你正在构建库，请确保它们也支持较旧的Python版本。
*  在分支中开发。即使你是在项目中唯一的人，分支也使你能够轻松地在不同的功能/错误修复之间切换。
*  如果你不是独自开发，请练习代码审查。这是双方学习最好的方法之一。
* 记录你的杰作
