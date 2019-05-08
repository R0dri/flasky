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

>>>>>>> 7f1b1ee06f953b0f72754de08a9e18f1b2061e24
