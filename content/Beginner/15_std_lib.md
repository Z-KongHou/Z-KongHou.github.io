
# [Python标准库](https://docs.python.org/3/library/#the-python-standard-library)的好处
Python标准库是您Python安装的一部分。它包含多种包，这些包在构建您的Python杰作时可能很有帮助。本文档列出了常用的包及其主要功能。

## 用于处理日期和时间的[`datetime`](https://docs.python.org/3/library/datetime.html#module-datetime)


```python
import datetime as dt

local_now = dt.datetime.now()
print(f"local now: {local_now}")

utc_now = dt.datetime.utcnow()
print(f"utc now: {utc_now}")

# 您可以单独访问任何值：
print(
    f"{local_now.year} {local_now.month} {local_now.day} {local_now.hour} {local_now.minute} {local_now.second}"
)

print(f"date: {local_now.date()}")
print(f"time: {local_now.time()}")
```

    local now: 2024-12-03 09:58:30.795635
    utc now: 2024-12-03 01:58:30.795635
    2024 12 3 9 58 30
    date: 2024-12-03
    time: 09:58:30.795635
    

### `strftime()`
用于字符串格式化 `datetime`


```python
formatted1 = local_now.strftime("%Y/%m/%d-%H:%M:%S")
print(formatted1)

formatted2 = local_now.strftime("date: %Y-%m-%d time:%H:%M:%S")
print(formatted2)
```

    2024/12/03-09:58:30
    date: 2024-12-03 time:09:58:30
    

### `strptime()`
用于将 `datetime` 字符串转换为 `datetime` 对象


```python
my_dt = dt.datetime.strptime("2000-01-01 10:00:00", "%Y-%m-%d %H:%M:%S")
print(f"my_dt: {my_dt}")
```

    my_dt: 2000-01-01 10:00:00
    

### [`timedelta`](https://docs.python.org/3/library/datetime.html#timedelta-objects)
用于处理时间差。


```python
tomorrow = local_now + dt.timedelta(days=1)
print(f"tomorrow this time: {tomorrow}")

delta = tomorrow - local_now
print(f"tomorrow - now = {delta}")
print(f"days: {delta.days}, seconds: {delta.seconds}")
print(f"total seconds: {delta.total_seconds()}")
```

    tomorrow this time: 2024-12-04 09:58:30.795635
    tomorrow - now = 1 day, 0:00:00
    days: 1, seconds: 0
    total seconds: 86400.0
    

### 处理时区


```python
import datetime as dt
from zoneinfo import ZoneInfo

naive_utc_now = dt.datetime.utcnow()
print(f"naive utc now: {naive_utc_now}, tzinfo: {naive_utc_now.tzinfo}")

# 本地化时间
UTC_TZ = ZoneInfo("UTC")
utc_now = naive_utc_now.replace(tzinfo=UTC_TZ)
print(f"utc now: {utc_now}, tzinfo: {utc_now.tzinfo}")

# 将本地化日期时间转换为不同的时区
PARIS_TZ = ZoneInfo("Europe/Paris")
paris_now = utc_now.astimezone(PARIS_TZ)
print(f"Paris: {paris_now}, tzinfo: {paris_now.tzinfo}")

NEW_YORK_TZ = ZoneInfo("America/New_York")
ny_now = utc_now.astimezone(NEW_YORK_TZ)
print(f"New York: {ny_now}, tzinfo: {ny_now.tzinfo}")
```


    ---------------------------------------------------------------------------

    ModuleNotFoundError                       Traceback (most recent call last)

    <ipython-input-5-44612c055fa6> in <module>()
          1 import datetime as dt
    ----> 2 from zoneinfo import ZoneInfo
          3 
          4 naive_utc_now = dt.datetime.utcnow()
          5 print(f"naive utc now: {naive_utc_now}, tzinfo: {naive_utc_now.tzinfo}")
    

    ModuleNotFoundError: No module named 'zoneinfo'


**注意**: 如果您的项目大量使用日期时间，您可能想要查看一些外部库，例如 [Pendulum](https://pendulum.eustace.io/docs/) 和 [Maya](https://github.com/kennethreitz/maya), 它们在某些用例中使处理日期时间变得更加容易。

## [`logging`](https://docs.python.org/3/library/logging.html#module-logging)


```python
import logging

# 为每个模块单独获取专用日志记录器的便捷方式
logger = logging.getLogger(__name__)
logger.setLevel(logging.WARNING)

logger.debug("This is debug")
logger.info("This is info")
logger.warning("This is warning")
logger.error("This is error")
logger.critical("This is critical")
```

    This is warning
    This is error
    This is critical
    

### 记录异常
在日志模块中有一个很好的异常函数，它会自动记录堆栈跟踪，以及用户定义的日志条目。


```python
try:
    path_calculation = 1 / 0
except ZeroDivisionError:
    logging.exception("All went south in my calculation")
```

    ERROR:root:All went south in my calculation
    Traceback (most recent call last):
      File "<ipython-input-7-c2679c76d879>", line 2, in <module>
        path_calculation = 1 / 0
    ZeroDivisionError: division by zero
    

### 格式化日志条目


```python
import logging

# 这仅在 Jupyter Notebook 环境中需要。
from importlib import reload

reload(logging)

my_format = "%(asctime)s | %(name)-12s | %(levelname)-10s | %(message)s"
logging.basicConfig(format=my_format)

logger = logging.getLogger("MyLogger")

logger.warning("Something bad is going to happen")
logger.error("Uups, it already happened")
```

    2024-12-03 09:58:32,442 | MyLogger     | WARNING    | Something bad is going to happen
    2024-12-03 09:58:32,443 | MyLogger     | ERROR      | Uups, it already happened
    

### 记录到文件


```python
import logging
from pathlib import Path

# 这仅在 Jupyter Notebook 环境中需要。
from importlib import reload

reload(logging)

logger = logging.getLogger("MyFileLogger")

# 让我们为我们的日志记录器定义一个文件处理器。
log_path = Path.cwd() / "my_log.txt"
file_handler = logging.FileHandler(log_path)

# 还有一个不错的格式
formatter = logging.Formatter(
    "%(asctime)s | %(name)-12s | %(levelname)-10s | %(message)s"
)
file_handler.setFormatter(formatter)

logger.addHandler(file_handler)

# 如果你想在控制台中也看到它，请为此添加另一个处理器
# logger.addHandler(logging.StreamHandler())

logger.warning("Oops something is going to happen")
logger.error("John Doe visits our place")
```

## 用于随机数生成的[`random`](https://docs.python.org/3/library/random.html)模块


```python
import random

rand_int = random.randint(1, 100)
print(f"random integer between 1-100: {rand_int}")

rand = random.random()
print(f"random float between 0-1: {rand}")
```

    random integer between 1-100: 90
    random float between 0-1: 0.907272884400509
    

如果你需要伪随机数，可以为随机数设置 seed。这将重现输出（尝试多次运行该单元格）：


```python
import random

random.seed(5)  # 设置随机数种子

# 让我们打印出十个随机数
for _ in range(10):
    print(random.random())
```

    0.6229016948897019
    0.7417869892607294
    0.7951935655656966
    0.9424502837770503
    0.7398985747399307
    0.922324996665417
    0.029005228283614737
    0.46562265437810535
    0.9433567169983137
    0.6489745531369242
    

## 用于正则表达式的[`re`](https://docs.python.org/3/library/re.html#module-re)模块

### 搜索出现次数


```python
import re

secret_code = "qwret 8sfg12f5 fd09f_df"
# 开头的 "r" 表示原始格式，使用它与正则表达式模式。
search_pattern = r"(g12)"

match = re.search(search_pattern, secret_code)
print(f"match: {match}")
print(f"match.group(): {match.group()}")

numbers_pattern = r"[0-9]"
numbers_match = re.findall(numbers_pattern, secret_code)
print(f"numbers: {numbers_match}")
```

    match: <_sre.SRE_Match object; span=(9, 12), match='g12'>
    match.group(): g12
    numbers: ['8', '1', '2', '5', '0', '9']
    

### 变量验证


```python
import re


def validate_only_lower_case_letters(to_validate):
    pattern = r"^[a-z]+$"
    return bool(re.match(pattern, to_validate))


print(validate_only_lower_case_letters("thisshouldbeok"))
print(validate_only_lower_case_letters("thisshould notbeok"))
print(validate_only_lower_case_letters("Thisshouldnotbeok"))
print(validate_only_lower_case_letters("thisshouldnotbeok1"))
print(validate_only_lower_case_letters(""))
```

    True
    False
    False
    False
    False
    
