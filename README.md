# [Start Bootstrap - Blog Post](https://startbootstrap.com/template-overviews/blog-post/)

[Blog Post](http://startbootstrap.com/template-overviews/blog-post/) is a basic blog post HTML starter template for [Bootstrap](http://getbootstrap.com/) created by [Start Bootstrap](http://startbootstrap.com/).

## Preview

[![Blog Post Preview](https://startbootstrap.com/assets/img/templates/blog-post.jpg)](https://blackrockdigital.github.io/startbootstrap-blog-post/)

**[View Live Preview](https://blackrockdigital.github.io/startbootstrap-blog-post/)**

## Status

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/BlackrockDigital/startbootstrap-blog-post/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/startbootstrap-blog-post.svg)](https://www.npmjs.com/package/startbootstrap-blog-post)
[![Build Status](https://travis-ci.org/BlackrockDigital/startbootstrap-blog-post.svg?branch=master)](https://travis-ci.org/BlackrockDigital/startbootstrap-blog-post)
[![dependencies Status](https://david-dm.org/BlackrockDigital/startbootstrap-blog-post/status.svg)](https://david-dm.org/BlackrockDigital/startbootstrap-blog-post)
[![devDependencies Status](https://david-dm.org/BlackrockDigital/startbootstrap-blog-post/dev-status.svg)](https://david-dm.org/BlackrockDigital/startbootstrap-blog-post?type=dev)

## Download and Installation

source env/bin/activate

Docker install Reference: https://linoxide.com/linux-how-to/install-docker-ubuntu/
SQL 2019 on Docker Reference: https://www.sqlshack.com/sql-server-2019-on-linux-with-a-docker-container-on-ubuntu/

*  Requerimientos [0/2]
   sugerimos un codigo que puede estar conformado por el codigo de SAP y un adicional para 2 o 3 usuarios de la empresa que serian los encargados de levantar tickets. Los demas miembros de la empresa pueden ver el estado de sus solicitudes mediante el codigo generico de la empresa que seria solo de lectura / consulta de los reportes

** TODO Conectar con base de datos 
** TODO Login del cliente (código y pwrd) -  [0/5]
   - Telefono 1 - se llena automaticamente desde el contacto
   - Celular -  se llena automaticamente desde el contacto
   - Correo -  se llena automaticamente desde el contacto
*** TODO crear el formulario HTML
*** TODO Login
*** TODO Registro
*** TODO mail para resetar clave
*** TODO Grabar informacion en BD
** Llamada de servicio [0/3]
   - Prioridad: Muy alta / Alta / Media / Baja
   - Asunto: Descripción o titulo del problema en 100 caracteres
   - Tipo de problema
   - Subtipo de problema
   - Tipo de llamada
   - Persona de contacto: Usuario dueño del login
   - Usuario solicitante: Campo abierto de 100 caracteres, iría en SAP a un UDF simplemente informativo.
   - Fecha y hora de creación -  esta iría automática.
   - Telefono 1 - se llena automaticamente desde el contacto
   - Celular -  se llena automaticamente desde el contacto
   - Correo -  se llena automaticamente desde el contacto
   - Proyecto: se llena automaticamente desde el cliente
   - Comentarios: Descripción del problema ( 250000 carcteres) El sistema tiene 256 mil pero mejor dejarlo en 250 por si nosotros queremos añadir algo.
   - Attachment (file o foto o ambos): quiza lo mejor es q sea un file, ya ven ellos si quieren un PDF con mil fotos o una sola foto, etc.
*** TODO crear el formulario HTML
*** TODO Grabar informacion en BD
*** TODO Crear tabla de historico de formularios con status.

* Docker commands
** Start and Enable Service to start on Boot
   $ sudo systemctl start docker
   $ sudo systemctl enable docker
   $ sudo systemctl is-enabled docker
   enabled
** Check the status of the service using:
   $ sudo systemctl status docker
** Iniciar el SQL: 
   sudo docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=B1Admin'    -p 1433:1433 --name SQL2019    -d mcr.microsoft.com/mssql/server:2019-CTP2.1
   sudo docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=B1Admin@'    -p 1433:1433 --name SQL2019  -v /home/workbook/dockervolumes/var/opt/mssql  -d mcr.microsoft.com/mssql/server:2019-CTP2.1
   sudo docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=B1Admin@'    -p 1433:1433 --name SQL2017  -v /home/workbook/dockervolumes/var/opt/mssql  -d mcr.microsoft.com/mssql/server:2017-latest

* Ubuntu/nginx setup
  https://www.youtube.com/watch?v=goToXTC96Co&list=PLovF0v_9CWzJNX8Ag0KUi78BdSeAw2Kow&index=10&t=498s
** hostname: ver el hostname del server
** hostnamectl set-hostname nombredelserver: para setear el hostname
** archivo de hosts:
   :anterior:
    cat /etc/hosts
    127.0.0.1	localhost.localdomain	localhost
    ::1		localhost6.localdomain6	localhost6

    # The following lines are desirable for IPv6 capable hosts
    ::1     localhost ip6-localhost ip6-loopback
    fe00::0 ip6-localnet
    ff02::1 ip6-allnodes
    ff02::2 ip6-allrouters
    ff02::3 ip6-allhosts
   :end:
   :nuevo:
   127.0.0.1       localhost.localdomain   localhost
   192.168.0.127   support
   ::1             localhost6.localdomain6 localhost6
   
   # The following lines are desirable for IPv6 capable hosts
   ::1     localhost ip6-localhost ip6-loopback
   fe00::0 ip6-localnet
   ff02::1 ip6-allnodes
   ff02::2 ip6-allrouters
   ff02::3 ip6-allhosts
   :end:
** adduser nombreDeUsuario: para crear nuevo usuario.
** adduser nombreDeUsuario sudo: para asignarle permisos de administrador.
** crear una llave ssh
*** crear un .ssh en el home dir de mi usuario
*** En la maquina local, ssh-keygen -b 4096 (el numero es para que sea mas seguro)
*** tenermos los archivos id_rsa. y el id_rsa.pub el .pub es el que hay que copiar en el server.
*** scp (secure copy) scp ~/.ssh/id_rsa.pub workbook@192.168.0.127:~/.ssh/authorized_keys (no es necesario file extensions en linux)
*** En el servidor debemos setear los permisos para el ssh sudo chmod 700 ~/.ssh/ y chmod 600 ~/ssh/*
*** con esto ya se puede logear sin el password.
** Deshabilitar logins de root por ssh
** sudo vim /etc/ssh/sshd_config
*** PermitRootLogin no (ya muy seguro pero se puede probar mas tarde)
*** PasswordAuthentication no Para que nadie pueda logearse con clave, solo con ssh
*** sudo systemctl restart sshd -> para actualizar el ssh
** Setear el firewall
*** sudo apt install ufw ->instala el (uncomplicated firewall)
*** sudo ufw default allow outgoing
*** sudo ufw default deny incoming
*** sudo ufw allow ssh
*** sudo ufw allow 5000
*** sudo ufw enable
*** sudo ufw status -> para mostrar los puertos disponibles!
** Poner la aplicacion en el server, puede ser por github o scp scp -r archivo local usuario@server:lugar
** pip freeze te muestra todos los paquetes que tienes instalado en el environment con pip freeze > requirements.txt lo guardas a un archivo.
** sudo apt install python3-pip y python3-venv
** recien en el server crear el python environment, con python3 -m venv archivo/(nombre del environment)
** source venv/bin/activate para activar el virtual environment
** pip install -r requirements.txt para isntalar todas las dependencias en el environment.
** Crear un archivo de configuraciones en el server en lugar de tener environment variables para cosas como email etc que requiere la app
*** para obtener las variables globales de flaks escribimos python para obtener la linea de ocmandos
*** import os
*** os.environ.get('SECRET_KEY') para esa variale
*** os.environ.get('SQLALCHEMY_DATABASE_URI') por ejemplo estas estaban en el flask configuration files
*** os.enviorn.get('EMAIL_USER')
*** os.enviorn.get('EMAIL_PASS')
*** luego en el servidor creamos un archivo en el /etc/config.json
*** en el archivo debe ir:
    en formato json {"SECRET_KEY":"valor", "":"", "":""} para las demas variables...
*** editar el config file en el proyecto flask.. config.py en el archivo de la aplicacion que vive en el folder en el root del environment
*** poner with open('/ect/config.json') as config_file:
    config = json.load(config_file)
    este config al leer desde json, se vuelve un diccionario.. podemos poner config.get('SECRET_KEY') etc
    el archivo confi.py termina con el comando anterior y la clase
    class Config:
    SECRET_KEY = config.get('SECRET_KEY')
    MAIL_SERVER = config.get('MAIL_SERVER'), etc...
** Probar la aplicacion ->  
*** flask run en lugar de python app, 
*** export FLASK_ENV=development (para se actualice el deamon al guardad)
*** crear una variable temporal para probar enviando al puerto 0000 que lo hace visible afuera (export FLASK=run.py)
*** luego correr (flask run --host=0.0.0.0)
** NGINX
*** sudo apt install nginx
*** pip install gunicorn -> en el environment
*** Actualizar los archivos para nginx y gunicorn
    nginx es el servior que administra los archivos y requests, gunicorn es el que procesa o administra el codigo en python
*** sudo rm /ect/nginx/sites-enabled/default
*** sudo nano /ect/nginx/sites-enabled/Flasky
    esto es para obtener la direcion de los archivos y redireccionar a gunicorn
    :codigo:
    #+BEGIN_SRC json
    server {
        listen 80;
        server_name 192.168.0.127;

        location /static {
            alias /home/workbook/flasky/flasky/static;
        }

        location / {
                proxy_pass http://localhost:8000;
                include /etc/nginx/proxy_params;
                proxy_redirect off;
        }
    }
    #+END_SRC
    :end:
*** sudo ufw allow http/tcp -> para habilitar el puerto 80 en el firewall
*** sudo ufw delete allow 5000 -> para eliminar el puerto 5000 en el firewall
*** sudo ufw enable 
*** sudo systemctl restart nginx
** GUNICORN
*** gunicorn -w 3 run:app para esto debemos estar en el directorio de la aplicacion .py  
    (app es la vairable de la aplicacion que se encuentra en el app.py)
    w es el numero de workers.. segun la documentacion en NGINX es (2 x el numero de cores) + 1 en nuestro caso son 2 cores, necesitamos 5 workers
*** nproc --all -para saber el numero de cores en el server.
*** SERVICO para que este automatico el GUNICORN
**** sudo apt install supervisor
**** crear archivo de configuracion: sudo vim /etc/supervisor/conf.d/flasky.conf
     :notes:
     [program:flasky] 
     directory=/home/workbook/flasky 
     command=/home/workbook/flasky/newenv/bin/gunicorn -w 5 app:app 
     user=workbook 
     autostart=true 
     autorestart=true 
     stopasgroup=true 
     killasgroup=true 
     stderr_logfile=/var/log/flasky/flasky.err.log 
     stdout_logfile=/var/log/flasky/flasky.out.log 
     :end:
**** con mkdir -p crea toda la ruta si no existiera un archivo
**** crear la carpeta de los archivos de log sudo mkdir -p /var/log/flasky 
**** crear log err sudo touch /var/log/flasky/flasky.err.log 
**** crear log out sudo touch /var/log/flasky/flasky.out.log 
**** finalmente, solo queda reiniciar el supervisor con sudo supervisorctl reload
* Comandos de git
** git rm --cached -r env/ -> quitar archivos y dejar de trackear
** git ls-tree --name-only -r 7f1b1 -> para mosrar los archivos que se encuentran en el commit.
** git log --pretty=oneline --reverse -> para mostrar en resumido el log
** git merge sqlcon -> git merge <nomre del branch> hay que estar posicionado sobre el branch al que se le quiere agregar el cambio.
** $ git push --delete <remote_name> <branch_name> eliminar branch remota
** $ git branch -d <branch_name> eliminar branch local
** git branch -> para enlistar los branches existentes y en cual nos encontramos.
** TODO git commit desde el server error por atender.. 
   :Actividad:
   [master 9bb45a3] configuracion del Flask security
   Committer: devops <workbook@support.www.nexxtwifi.com>
   Your name and email address were configured automatically based
   on your username and hostname. Please check that they are accurate.
   You can suppress this message by setting them explicitly. Run the
   following command and follow the instructions in your editor to edit
   your configuration file:
   
       git config --global --edit

   After doing this, you may fix the identity used for this commit with:

       git commit --amend --reset-author

   1 file changed, 49 insertions(+), 1 deletion(-)
   :END:
* MSSQL 
** insalar freetds
   https://github.com/mkleehammer/pyodbc/wiki/Connecting-to-SQL-Server-from-Mac-OSX
** conectar SQL server con Pyodbc y SQLAlchemy
   https://stackoverflow.com/questions/53753948/connecting-to-sql-server-using-pyodbc-sqlalchemy

* Reunion Feedback
- Alerta/tutorial al inicio. Info redireccionada al about.
- crystal report...
- remove user desde home page del usuario
- codigos de usuarios predefinidos
- tikets generan alertas asociados a usuarios de soporte definido
  - timeouts de respuesta/lectura (tag de recibido/trabajando)
  - gris/verde de que lado esta la bola +fecha (ETA)
  - timeout del ETA
  - historial de soluciones (llamadas completadas)
- alerta informativa en prioridad alta
  - default prioridad media
- tipo de problema general y subtipo acorde al tipo general
  - producto (sap, addon, otros)
  - problema (segun el producto)
- sidebar
  - leyenda
  - ayuda (tipos de notas)
  - notas similares?

