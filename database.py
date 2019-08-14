from flask import Flask, render_template, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message


# Create app and import configurations
app = Flask(__name__)
app.config.from_json('config.json')

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
        # se = db.text("SELECT * [user] WHERE username=:usuario")
        # usuario = sn["usuario"]
        # u = db.engine.execute(se, usuario=usuario).fetchall()
        # su = [dict(row) for row in u]
        # su = su[0]

        # se = db.text("SELECT subject FROM OCLG WHERE id=:tid")
        # usuario = sn["tid"]
        # t = db.engine.execute(se, usuario=usuario).fetchall()
        # st = [dict(row) for row in u]
        # st = su[0]

        self.var = {
            'ticket':"subject",
            'date':"29 de abril de 2019",
            'usuario':kwargs.get('usuario','rodri'),
            'first_name':"first_name"
        }

        self.var = kwargs.get('vara',self.var)
        self.msg = Message(subject='sujet', recipients=['defekuz@mrmail.info','rodri.mendoza.t@gmail.com','pablo.mendoza@advisorygc.com'])

    def teste(self):
        if(self.test):
            print("hey - Test Mode Enabled")
            return "hey - Test Mode Enabled"
        else:
            print("ho - Test Mode Disabled")
            return "h0 - Test Mode Disabled"

    def ticket(self):
        if(self.test):
        #     headers = {'Content-Type':['text/html', 'charset=utf-8']}
        #     return make_response(render_template('security/email/mail.html',var=self.var),200,headers)
            res = make_response(render_template('security/email/ticket.html', var=self.var))
            res.headers["Content-Type"]="text/html; charset=utf-8"
            return res
        else:
            self.msg.html = render_template('security/email/ticket.html',var=self.var)
            mail.connect()
            mail.send(self.msg)
            return 'Sent email'

    def actividad(self):
        if(self.test):
        #     headers = {'Content-Type':['text/html', 'charset=utf-8']}
        #     return make_response(render_template('security/email/mail.html',var=self.var),200,headers)
            res = make_response(render_template('security/email/actividad.html', var=self.var))
            res.headers["Content-Type"]="text/html; charset=utf-8"
            return res
        else:
            self.msg.html = render_template('security/email/actividad.html',var=self.var)
            mail.connect()
            mail.send(self.msg)
            return 'Sent email'


