---
title: 搭建Jupyter-Notebook服务器
date: 2025-04-17 12:39:13
tags:
      - Notebook

---

# 安装python和相关依赖

首先，更新系统中的包和依赖项：

```bash
sudo apt update
sudo apt upgrade -y
```

Jupyter Notebook需要Python环境。Ubuntu 18.04通常已经安装了Python，但我们可以确保安装`python3`和`pip3`。

```bash
sudo apt install python3 python3-pip python3-dev -y
```

# 安装Jupyter Notebook

使用`pip3`安装Jupyter Notebook：

```bash
pip3 install jupyter
```

## pip换国内源

### 配置 pip 使用国内源

1. 创建配置文件 `~/.pip/pip.conf`

```bash
mkdir -p ~/.pip
nano ~/.pip/pip.conf
```

2. 添加源配置：

```ini
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple

[install]
trusted-host = pypi.tuna.tsinghua.edu.cn
```

>`trusted-host` 是为了防止有些 pip 版本验证 TLS 报错。

按下 `Ctrl + O` 保存，`Ctrl + X` 退出。



### 立即用国内源安装 jupyter

如果你暂时不想配置 pip.conf，也可以临时指定源：

```bash
pip install jupyter -i https://pypi.tuna.tsinghua.edu.cn/simple
```

## 其他问题

安装时如果出现了类似下面的报错

```bash
Command "python setup.py egg_info" failed with error code 1 in /tmp/pip-build-nxqa_lpa/argon2-cffi-bindings/
```

通常是因为：

1.**缺少 Python 开发头文件或编译环境**（最常见）

2.pip 版本过旧

3.setuptools/wheel 没装好

4.有时也可能是权限问题

**解决方案**

1. 安装系统依赖

   ```bash
   sudo apt update
   sudo apt install -y build-essential python3-dev python3-pip python3-setuptools
   ```

​	2.升级 pip + setuptools + wheel

```bash
pip install --upgrade pip setuptools wheel -i https://pypi.tuna.tsinghua.edu.cn/simple
```

​	3.清理旧的缓存再重装

```bash
pip cache purge
pip install jupyter -i https://pypi.tuna.tsinghua.edu.cn/simple
```

​	4.也可以尝试单独装失败的包

```bash
pip install argon2-cffi -i https://pypi.tuna.tsinghua.edu.cn/simple
```

如果上面还是失败，你可以先装一个 Jupyter 的“最小版本”：

```bash
pip install notebook -i https://pypi.tuna.tsinghua.edu.cn/simple
```

# 配置Jupyter Notebook

完成配置之后就可以启动notebook并进行访问

```bash
jupyter notebook
```

但是以 `root` 用户运行 Jupyter Notebook时会提示以下警告

```bash
[C 10:09:56.676 NotebookApp] Running as root is not recommended. Use --allow-root to bypass.
```

Jupyter 官方推荐不要以 `root` 用户运行，因为这可能会导致权限问题或安全隐患。

不过，如果你确认自己要以 `root` 用户运行，可以通过添加 `--allow-root` 参数来绕过这个警告。



我们接下来创建一个普通用户来运行 Jupyter Notebook。这样更安全，而且不容易导致权限问题。

```bash
sudo useradd -m jupyteruser
sudo groupadd jupyteruser
```



确保你当前是以 `jupyteruser` 用户身份操作。你可以通过以下命令切换到该用户：

```bash
sudo su - jupyteruser
```

或者，直接使用该用户的 shell：

```bash
su - jupyteruser
```

接下来我们配置Jupyter Notebook

## 配置登陆密码

为确保安全，可以为Jupyter Notebook设置密码。使用以下命令生成密码哈希：

```python
python
Python 3.8.5
Type "help", "copyright", "credits" or "license" for more information.
>>> from IPython.lib import passwd
>>> passwd()
Enter password:
Verify password:
'sha1:.....................................'
>>>exit()
```

该命令会提示你输入密码并返回一个哈希值。将该哈希值复制备用。

## 生成配置文件

```bash
jupyter notebook --generate-config
```

 然后打开配置文件：

```bash
nano ~/.jupyter/jupyter_notebook_config.py
```

把我们的配置集中追加到末尾：

```python
#--------------------------------------------------------------------------
# User configuration
#--------------------------------------------------------------------------
c.NotebookApp.ip = '*'                               # notebook监听的IP
c.NotebookApp.port = 8888  							 # notebook监听的端口
c.NotebookApp.notebook_dir = '/home/jupyter-projects'# notebook的工作目录
c.NotebookApp.open_browser = False                   # 运行notebook服务时不打开浏览器
c.NotebookApp.password = u'sha1:..................'  # 密码的hash 值
```

## 启动Jupyter Notebook服务器

配置完成后，可以通过以下命令启动Jupyter Notebook：

```bash
jupyter notebook
```

# 保持Jupyter Notebook后台运行

## 使用 `nohup` 将 Jupyter Notebook 在后台运行

`nohup`（No Hang Up）命令可以使你在关闭终端后，进程继续运行。

**步骤：**

1. **启动 Jupyter Notebook 并使其在后台运行**： 运行以下命令，这样 Jupyter Notebook 会在后台继续运行，并将输出保存到日志文件中：

   ```bash
   nohup jupyter-notebook --no-browser --ip=0.0.0.0 --port=8889 > jupyter.log 2>&1 &
   ```

   - `--no-browser`：防止 Jupyter 自动打开浏览器。
   - `--ip=0.0.0.0`：使 Jupyter 可通过任何网络接口访问。
   - `--port=8889`：指定端口。
   - `> jupyter.log 2>&1`：将输出重定向到 `jupyter.log` 文件中，这样你可以查看日志。
   - `&`：将进程放入后台。

   2.**查看日志**： 你可以查看 `jupyter.log` 文件中的输出，以确认 Jupyter Notebook 是否正在运行：

   ```bash
   tail -f jupyter.log
   ```

   3.**停止 Jupyter Notebook**： 如果需要停止 Jupyter Notebook，可以使用 `ps` 查找进程 ID（PID）并终止它：

   ```bash
   ps aux | grep jupyter
   kill <PID>
   ```



## 使用 `systemd` 来管理 Jupyter Notebook 服务

如果你希望 Jupyter Notebook 在系统启动时自动启动，并且能够通过 `systemctl` 命令管理它，可以使用 `systemd` 服务。这样，Jupyter Notebook 将在后台运行，并且系统崩溃后自动重启。

#### 步骤：

1. **创建一个 `systemd` 服务文件**： 在 `/etc/systemd/system/` 目录下创建一个新的服务文件，例如 `notebook.service`：

```bash
sudo nano /etc/systemd/system/notebook.service
```

​	2.**服务文件内容**：

​	在文件中添加以下内容：

```ini
[Unit]
Description=Jupyter Notebook
After=network.target

[Service]
Type=simple
PIDFile=/run/jupyter.pid
ExecStart=/usr/local/bin/jupyter-notebook
User=jupyteruser
Group=jupyteruser
WorkingDirectory=/home/jupyteruser
Environment="PATH=/home/jupyteruser/.local/bin:$PATH"
Restart=always

[Install]
WantedBy=multi-user.target

```

- `User=jupyteruser` 和 `Group=jupyteruser`：确保以 `jupyteruser` 用户身份运行。

- `ExecStart`：指定 Jupyter Notebook 启动命令和相关参数。

- `Restart=on-failure`：如果服务崩溃，自动重启。

- `WorkingDirectory=/home/jupyteruser`：设置工作目录为 `jupyteruser` 的主目录。



3. **重新加载 `systemd` 配置**： 在创建或修改服务文件后，使用以下命令重新加载 `systemd` 配置：

```bash
sudo systemctl daemon-reload
```

4. **启用并启动服务**： 使服务在系统启动时自动启动，并立即启动服务：

```bash
sudo systemctl enable notebook
sudo systemctl start notebook
```

5. **查看服务状态**： 你可以使用以下命令检查 Jupyter Notebook 服务的状态：

```bash
sudo systemctl status notebook
```

6. **停止服务**： 如果需要停止服务，可以使用：

```bash
sudo systemctl stop notebook
```

# 总结

至此，你已经成功在Ubuntu 18.04上搭建了一个Jupyter Notebook服务器，并且可以从任何地方访问它，只要你提供正确的IP和密码。
