请求
GET http://localhost:8080/ HTTP/1.1
Host: localhost:8080
Connection: Upgrade 升级协议
Pragma: no-cache
Cache-Control: no-cache
Upgrade: websocket 升级到websocket协议
Origin: http://localhost:63342
Sec-WebSocket-Version: 13 WebSocket版本号
User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.125 Safari/537.36
Accept-Encoding: gzip, deflate, sdch
Accept-Language: en,zh-CN;q=0.8,zh;q=0.6
Cookie: _pk_id.1.1fff=4bd19f44a9aa7bc6.1439643546.1.1439643546.1439643546.; g=57058_1439644565760
Sec-WebSocket-Key: YjcfePAFWQrx8aQMV3pI5A== 安全KEY
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits

响应
HTTP/1.1 101 Switching Protocols 转换协议
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s+vtomf5I1m18RVm3fodnZpt78g=
Sec-WebSocket-Extensions: permessage-deflate




