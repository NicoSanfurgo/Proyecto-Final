Test Realizados:

Profiling sin Login 20 usuarios y 50 request cada uno.

```
artillery quick --count 20 -n 50 "http://localhost:8080/productos/listar" > ./profiling/result_sin_login.txt

```

Login realizo en curl:

```
curl -d '{"email":"alejandro@gmail.com", "password":"555"}' -H "Content-Type: application/json" -X POST "http://localhost:8080/auth/login"
```

Profiling con Login 20 usuarios y 50 request cada uno.

```
artillery quick --count 20 -n 50 "http://localhost:8080/productos/listar" > ./profiling/result_con_login.txt
```
