from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_security import Security, SQLAlchemyUserDatastore, UserMixin, RoleMixin, login_required
from flask_security.forms import RegisterForm, StringField, Required, LoginForm

# Create app
app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SECRET_KEY'] = 'super-secret'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pyodbc://sa:B1Admin@MSSQLSRV/WS'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pyodbc://sa:B1Admin@@MSSQLSRV'
#app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/rodri'
app.config['SECURITY_REGISTERABLE'] = True
app.config['SECURITY_PASSWORD_SALT'] = 'somesupersecretstring'
app.config['SECURITY_USER_IDENTITY_ATTRIBUTES'] = 'username'

# Create database connection object
db = SQLAlchemy(app)

# Define models
roles_users = db.Table('roles_users',
        db.Column('user_id', db.Integer(), db.ForeignKey('user.id')),
        db.Column('role_id', db.Integer(), db.ForeignKey('role.id')))

class Role(db.Model, RoleMixin):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True)
    # email = db.Column(db.String(255), unique=True)
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    active = db.Column(db.Boolean())
    password = db.Column(db.String(255))
    confirmed_at = db.Column(db.DateTime())
    roles = db.relationship('Role', secondary=roles_users,
                            backref=db.backref('users', lazy='dynamic'))

class ExtendedLoginForm(LoginForm):
    # username = StringField('Usuario', [Required()])
    email = StringField('Usuario', [Required()])
    password = StringField('Contrasena', [Required()])

class ExtendedRegisterForm(RegisterForm):
    username = StringField('Usuario', [Required()])
    # email = StringField('Usuario', [Required()])
    first_name = StringField('Nombres', [Required()])
    last_name = StringField('Apellidos', [Required()])
    password = StringField('Contrasena', [Required()])
    password_confirm = StringField('Confirmar Contrasena', [Required()])


# Setup Flask-Security
user_datastore = SQLAlchemyUserDatastore(db, User, Role)
security = Security(app, user_datastore,
                    register_form=ExtendedRegisterForm,
                    login_form=ExtendedLoginForm)

@security.register_context_processor
def context_processor():
    return dict(hello=True)

# Create a user to test with
@app.before_first_request
# def create_user():
#     db.create_all()
#     user_datastore.create_user(username='t', password='p')
#     db.session.commit()

# Views
@app.route('/')
# @login_required
def home():
    return render_template('usrform.html')

@app.route('/test')
def test():
    return render_template('test.html')

@app.route('/formulario')
def formulario():
    return render_template('usrform.html')

@app.route('/user')
def user():
    return render_template('user.html')

@app.route('/about')
def about():
    return render_template('index.html')

@app.route('/llamada')
def llamada():
    return render_template('formulario.html')

# @app.route('/historial')
# @login_required
# def historial():
#     return render_template('usrform.html')

if __name__ == '__main__':
    app.run()
