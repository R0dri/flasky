from flask import render_template, request, jsonify, make_response
from flask_security import Security, SQLAlchemyUserDatastore, login_required
from flask_mail import Message
from flask_security.forms import RegisterForm, LoginForm, Required, StringField, PasswordField
from flask_restful import Resource, Api
from flask_debugtoolbar import DebugToolbarExtension

from database import db, mail, app
from models import User, Role, roles_users, OCLG, OSCL, db
from apis import ticket, usuarioInfo, historial, actividad

api = Api(app)
toolbar=DebugToolbarExtension(app)


#Set Modification for Security Forms
class ExtendedLoginForm(LoginForm):
    # username = StringField('Usuario', [Required()])
    email = StringField('Correo', [Required()])
    password = PasswordField('Contrasena', [Required()])
class ExtendedRegisterForm(RegisterForm):
    username = StringField('Usuario', [Required()])
    # email = StringField('Usuario', [Required()])
    first_name = StringField('Nombres', [Required()])
    last_name = StringField('Apellidos', [Required()])
    telefono = StringField('telefono', [Required()])
    celular = StringField('telefono', [Required()])
    password = PasswordField('Contrasena', [Required()])
    password_confirm = PasswordField('Confirmar Contrasena', [Required()])

# Setup Flask-Security
user_datastore = SQLAlchemyUserDatastore(db, User, Role)
security = Security(app, user_datastore,
                    confirm_register_form=ExtendedRegisterForm,
                    login_form=ExtendedLoginForm)

# Views
@app.route('/sendmail')
def smail():
    msg = Message(subject='sujet', recipients=['defekuz@mrmail.info','rodri.mendoza.t@gmail.com','pablo.mendoza@advisorygc.com'])
    var = {
        'ticket':"consulta de usuario",
        'date':"22 de abril de 2019",
        'usuario':"rodri",
        'first_name':"cheeky"
    }
    msg.html = render_template('security/email/mail.html',var=var)
    mail.connect()
    mail.send(msg)
    return 'Sent email'

@app.route('/testmail')
def tmail():
    var = {
        'ticket':"consulta de usuario",
        'date':"22 de abril de 2019",
        'usuario':"rodri",
        'first_name':"cheeky"
    }
    headers = {'Content-Type':'text/html'}
    return make_response(render_template('security/email/mail.txt',var=var),200,headers)

@app.route('/')
@login_required
def home():
    return render_template('historial.html')

@app.route('/usuario')
@login_required
def usuario ():
    return render_template('usuario.html')

@app.route('/<route>')
def endless(route):
    return 'you reached an empyt page, check if your route is correct: /{}'.format(route)


@app.route('/about')
def about():
    return render_template('about.html')


api.add_resource(ticket, '/ticket')
api.add_resource(usuarioInfo, '/usuarioInfo')
api.add_resource(historial, '/historial')
api.add_resource(actividad, '/actividad')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
