from flask import render_template, request, jsonify, make_response, redirect
from flask_security import Security, SQLAlchemyUserDatastore, login_required, user_registered
from flask_mail import Message
from flask_security.forms import RegisterForm, LoginForm, Required, StringField, PasswordField
from flask_restful import Resource, Api
from flask_debugtoolbar import DebugToolbarExtension
from flask_migrate import Migrate

from contextlib import contextmanager


from database import db, mail, app
# from models import User, Role, roles_users, OCLG, OSCL, db, user_datastore
from models import db, user_datastore
from apis import ticket, usuarioInfo, historial, actividad, archivo, prueba, activate

api = Api(app)
toolbar=DebugToolbarExtension(app)
migrate = Migrate(app,db)



# Create a user to test with
# @app.before_first_request
def create_user():
    print("CREATING USER")
    db.create_all()
    user_datastore.create_user(email='r', password='p')
    db.session.commit()
    return redirect('/')


@app.route('/rebuild')
def rebuild():
    try:
        print('create all missing at db')
        db.create_all()
        # user_datastore.create_user(email='r', password='p')
        db.session.commit()
        return redirect('/')
    except Exception as error:
        print('got error @rebuilding db')
        print (error)
        return error

@app.route('/redirect')
def redi():
    print('redirecting')
    return redirect('/',code=302)

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

@app.route('/actividades')
def actividades():
    return render_template('actividad.html')

api.add_resource(ticket, '/ticket')
api.add_resource(usuarioInfo, '/usuarioInfo')
api.add_resource(historial, '/historial')
api.add_resource(actividad, '/actividad')
api.add_resource(activate, '/activate')
api.add_resource(archivo, '/archivo')

api.add_resource(prueba, '/prueba')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
