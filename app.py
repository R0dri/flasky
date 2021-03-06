from flask import render_template, request, jsonify, make_response, redirect, send_from_directory
from flask_security import Security, SQLAlchemyUserDatastore, login_required, user_registered
from flask_mail import Message
from flask_security.forms import RegisterForm, LoginForm, Required, StringField, PasswordField, ForgotPasswordForm
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

@app.route('/partials/<path:path>')
def send_part(path):
    return send_from_directory('partials', path)

@app.route('/assets/<path:path>')
def send_ass(path):
    return send_from_directory('assets', path)

# Create a user to test with
# @app.before_first_request
# @app.route('/refreshdb')
def create_user():
    print("CREATING USER")
    db.create_all()
    user_datastore.create_user(email='r@mail.com',username='ro', password='p',active=True)
    db.session.commit()
    return redirect('/')

# @app.before_first_request
# @app.route('/rebuild')

def rebuild():
    try:
        print('create all missing at db')
        db.create_all()
        user_datastore.create_user(email='r', password='p')
        db.session.commit()
        # return redirect('/')
        return ('rebuilt')
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
    # return render_template('html/pages-historial.html')
    return redirect('historial')

@app.route('/usuario')
@login_required
def usuario ():
    return render_template('usuario.html')

@app.route('/<route>')
def endless(route):
    #return 'you reached an empyt page, check if your route is correct: /{}'.format(route)
    # return send_from_directory('templates/html', route)
    return render_template('html/'+route)


@app.route('/myip')
def myip():
    # if request.environ.get('HTTP_X_FORWARDED_FOR') is None:
        # return jsonify({'ip': request.environ['REMOTE_ADDR']}), 200
    # return jsonify({'ip': request.environ['HTTP_X_FORWARDED_FOR']}), 200
    # return request.headers['X-Forwarded-For'] , 200
    if request.headers.getlist("X-Forwarded-For"):
        ip = request.headers.getlist("X-Forwarded-For")[0]
    else:
        ip = request.remote_addr

    # ip = request.headers.getlist("X-Forwarded-For")
    return jsonify(ip)
    # return jsonify({'ip': request.environ['REMOTE_ADDR']}), 200

    # else:
    # su = su[0]
    # return jsonify(request.environ.get_json()), 200
    # return su

    # return 'hello'


@app.route('/test')
def test():
    return render_template('test.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/recuperar')
def recover():
    return render_template('security/forgot_password.html')

@app.route('/template')
def template():
    return render_template('/html/index.html')

api.add_resource(ticket, '/ticket')#, '/ticket/<action>')
api.add_resource(usuarioInfo, '/usuarioInfo', '/usuarioInfo/<action>')
api.add_resource(historial, '/historial')
api.add_resource(actividad, '/actividad')#, '/actividad/<action>')
api.add_resource(activate, '/activate')
api.add_resource(archivo, '/archivo', '/archivo/<action>')

api.add_resource(prueba, '/prueba')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000)
