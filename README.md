# natutils

这个软件可以帮助你建立NAT之后的UDP通道。

使用：
```
node . [--public] [--port 1926] [--ping 127.0.0.1:6666]

public: 是否通过外部stun服务器获得本地端口的外部映射地址
port  : 本地绑定的端口
ping  : 向目的地址发送数据包以穿透NAT
```

使用时，假设有两台机器`A`、`B`，使用的本地端口均为1926，流程如下：
```
A # node . --public
Using port 1926
A.A.A.A:AAAA
B # node . --public --ping A.A.A.A:AAAA
Using port 1926
B.B.B.B:BBBB
Pinged A.A.A.A:AAAA
A # node . --ping B.B.B.B
Using port 1926
Pinged B.B.B.B:BBBB
```
每条命令执行后请等待半秒。之后，A与B之间即在A.A.A.A:AAAA<->B.B.B.B:BBBB之间建立了UDP通道。

实际使用以kcptun为例（因为kcptun client没法指定绑定端口，这里需要用到端口猜测）
假设A电脑运行client，B电脑运行server，A电脑的NAT的端口映射为x => f(x)
```
A # node . --public
Using port 1926
A.A.A.A:AAAA

B # node . --public
Using port 1926
B.B.B.B:BBBB

A # client -r B.B.B.B:BBBB ...
...
... on connection: 0.0.0.0:x -> B.B.B.B:BBBB

B # node . --ping A.A.A.A:f(x)
Using port 1926
Pinged A.A.A.A:f(x)
B # server -l :1926 ...
```
