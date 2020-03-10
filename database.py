from flask import Flask, render_template, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message

from flask_uploads import UploadSet, configure_uploads, patch_request_class, AllExcept, AUDIO, SCRIPTS, EXECUTABLES, DATA, TestingFileStorage

from werkzeug.middleware.proxy_fix import ProxyFix



# Create app and import configurations
app = Flask(__name__)
# After 'Create app'
app.wsgi_app = ProxyFix(app.wsgi_app)


app.config.from_json('config.json')
app.config['UPLOADS_DEFAULT_DEST'] = 'files'

# # Test Overrides
# app.config['DEBUG'] = True
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/rodri'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pyodbc://sa:B1Admin@@MSSQLSRV'
# app.config['MAIL_SERVER'] = 'smtp.gmail.com'
# app.config['SECURITY_EMAIL_SENDER'] = 'rodri.mendoza.t@gmail.com'
# app.config['MAIL_USERNAME'] = 'rodri.mendoza.t@gmail.com'

#Create database and mail connection objects
db = SQLAlchemy(app)
mail = Mail(app)
files = UploadSet('files', AllExcept(AUDIO + SCRIPTS + EXECUTABLES + DATA))
configure_uploads(app,files)
patch_request_class(app,size=16777216)


class Simple:
    def __init__(self, *args,**kwargs):
        print("inside the simple constructor")
        self.a = args
        self.k = kwargs

    def show(self):
        print(self.s)

    def showMsg(self, msg):
        print(msg + ':', self.show())

class SendMail:
    def __init__(self,**kwargs):
        self.test = kwargs.get('debug',False)

        self.var = {
            'ticket':"subject",
            'date':"29 de abril de 2019",
            'usuario':kwargs.get('usuario','rodri'),
            'first_name':"first_name"
        }

        self.var = kwargs.get('vara',self.var)

        self.recipient=['defekuz@mrmail.info','rodri.mendoza.t@gmail.com','pablo.mendoza@advisorygc.com']
        self.recipient = kwargs.get('recipient',self.recipient)
        # self.msg = Message(subject='Se ha creado una nueva actividad', recipients=['defekuz@mrmail.info','rodri.mendoza.t@gmail.com','pablo.mendoza@advisorygc.com'])
        # self.msg = Message(subject='Se ha creado una nueva actividad', recipients=self.recipient)

    def teste(self):
        if(self.test):
            print("hey - Test Mode Enabled")
            return "hey - Test Mode Enabled"
        else:
            print("ho - Test Mode Disabled")
            return "ho - Test Mode Disabled"

    def ticket(self):
        self.msg = Message(subject='Se ha creado una nueva llamada de servicio', recipients=self.recipient)
        if(self.test):
        #     headers = {'Content-Type':['text/html', 'charset=utf-8']}
        #     return make_response(render_template('security/email/mail.html',var=self.var),200,headers)
            res = make_response(render_template('security/email/ticket.html', var=self.var))
            res.headers["Content-Type"]="text/html; charset=utf-8"
            return res
        else:
            print("rendering mail")
            print(self.msg)
            self.msg.html = render_template('security/email/ticket.html',var=self.var)
            print("building mail")
            mail.connect()
            print("connected to mailserver")
            mail.send(self.msg)
            print("sent mail")
            return 'Sent email'

    def actividad(self):
        self.msg = Message(subject='Se ha creado una nueva actividad', recipients=self.recipient)
        if(self.test):
        #     headers = {'Content-Type':['text/html', 'charset=utf-8']}
        #     return make_response(render_template('security/email/mail.html',var=self.var),200,headers)
            res = make_response(render_template('security/email/actividad.html', var=self.var))
            res.headers["Content-Type"]="text/html; charset=utf-8"
            return res
        else:
            print("rendering mail")
            print(self.msg)
            self.msg.html = render_template('security/email/actividad.html',var=self.var)
            print(self.msg.html)
            print(mail.connect())
            print(mail.send(self.msg))
            return 'Sent email'

    def reasign(self):
        self.msg = Message(subject='Se te ha asignado una llamada de servicio', recipients=self.recipient)
        if(self.test):
        #     headers = {'Content-Type':['text/html', 'charset=utf-8']}
        #     return make_response(render_template('security/email/mail.html',var=self.var),200,headers)
            res = make_response(render_template('security/email/reasign.html', var=self.var))
            res.headers["Content-Type"]="text/html; charset=utf-8"
            return res
        else:
            print("rendering mail")
            print(self.msg)
            self.msg.html = render_template('security/email/reasign.html',var=self.var)
            print("building mail")
            mail.connect()
            print("connected to mailserver")
            mail.send(self.msg)
            print("sent mail")
            return 'Sent email'
