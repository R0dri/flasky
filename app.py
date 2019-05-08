import _mssql
from flask import Flask

app = Flask(__name__)

con = _mssql.connect(server='192.168.0.127', user='sa', password='B1Admin@', database='WS')

prueba = conn.execute_scalar("SELECT COUNT(*) FROM OUSR")
print prueba


# Hola
# cambio yo
# Hola nuevo cambio
