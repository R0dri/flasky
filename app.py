from flask import render_template, request, jsonify, make_response, redirect
from flask_security import Security, SQLAlchemyUserDatastore, login_required
from flask_mail import Message
from flask_security.forms import RegisterForm, LoginForm, Required, StringField, PasswordField
from flask_restful import Resource, Api
from flask_debugtoolbar import DebugToolbarExtension


from database import db, mail, app
from models import User, Role, roles_users, OCLG, OSCL, db, user_datastore
from apis import ticket, usuarioInfo, historial, actividad

api = Api(app)
toolbar=DebugToolbarExtension(app)


# Create a user to test with
#@app.route('/startup')
# @app.before_first_request
# def create_user():
#     print("CREATING USER")
#     db.create_all()
#     user_datastore.create_user(email='r', password='p')
#     db.session.commit()
#     return redirect('/')

@app.route('/redirect')
def redi():
    print('redirecting')
    return redirect('/',code=302)

# Views
@app.route('/sendmail')
def smail():
    msg = Message(subject='sujet', recipients=['defekuz@mrmail.info','rodri.mendoza.t@gmail.com','pablo.mendoza@advisorygc.com'])
    var = {
        'ticket':"Error en cargar datos",
        'date':"22 de abril de 2019",
        'usuario':"rodri",
        'first_name':"Rodrigo"
    }
    msg.html = render_template('security/email/mail.html',var=var)
    mail.connect()
    mail.send(msg)
    return 'Sent email'

@app.route('/testac')
def tmail():
    from database import SendMail
    var = {
        'ticket':"Error al cargar datos en el ADDON",
        'date':"22 de abril de 2019",
        'usuario':"rodrien",
        'first_name':"Rodrigo",
        'actividad':"No seas jil, prende tu compu!"
    }
    ma = SendMail(debug=True,vara=var)
    return ma.actividad()

@app.route('/testtick')
def amail():
    from database import SendMail
    var = {
        'ticket':"Error al cargar datos en el ADDON",
        'date':"22 de abrile de 2019",
        'usuario':"rodrimen",
        'first_name':"Rodrigo",
        'actividad':"No seas jil, prende tu compu!"
    }
    ma = SendMail(debug=True,vara=var)
    return ma.ticket()

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
