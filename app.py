from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_security import Security, SQLAlchemyUserDatastore, UserMixin, RoleMixin, login_required
from flask_security.forms import RegisterForm, StringField, Required, LoginForm

# Create app
app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SECRET_KEY'] = 'super-secret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/rodri'
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
    password = db.Column(db.String(255))
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    active = db.Column(db.Boolean())
    confirmed_at = db.Column(db.DateTime())
    roles = db.relationship('Role', secondary=roles_users,
                            backref=db.backref('users', lazy='dynamic'))

class ExtendedLoginForm(LoginForm):
    email = StringField('Username', [Required()])

class ExtendedRegisterForm(RegisterForm):
    email = StringField('Username', [Required()])
    first_name = StringField('First Name', [Required()])
    last_name = StringField('Last Name', [Required()])

# Setup Flask-Security
user_datastore = SQLAlchemyUserDatastore(db, User, Role)
security = Security(app, user_datastore,
                    register_form=ExtendedRegisterForm,
                    login_form=ExtendedLoginForm)

@security.register_context_processor
def context_processor():
    return dict(hello=True)

# Create a user to test with
# @app.before_first_request
# def create_user():
#     db.create_all()
#     user_datastore.create_user(username='r', password='p')
#     db.session.commit()

# Views
@app.route('/')
# @login_required
def home():
    return render_template('index.html')

@app.route('/test')
def test():
    return render_template('test.html')

@app.route('/user')
def user():
    return render_template('user.html')


if __name__ == '__main__':
    app.run()
