Python setup envirorment
https://realpython.com/python-virtual-environments-a-primer/#using-different-versions-of-python

Commands (setup from zero):
Setup virtual envirorment:

python3 -m venv env
Activate envirorment:

source env/bin/activate
go to work dir:

cd env



Usage:
git clone 'this'

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
