from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_security import Security, SQLAlchemyUserDatastore, UserMixin, RoleMixin, login_required
from flask_security.forms import RegisterForm, StringField, Required, LoginForm
from flask_restful import Resource, Api

import json
from collections import namedtuple


from flask_debugtoolbar import DebugToolbarExtension

# Create app
app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SECRET_KEY'] = 'super-secret'
<<<<<<< HEAD
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/rodri'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pyodbc://sa:B1Admin@@MYMSSQL'
=======
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pyodbc://sa:B1Admin@MSSQLSRV/WS'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pyodbc://sa:B1Admin@@MSSQLSRV'
#app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/rodri'
>>>>>>> 11c6136181f89e75db86b162404679f17af5ca96
app.config['SECURITY_REGISTERABLE'] = True
app.config['SECURITY_PASSWORD_SALT'] = 'somesupersecretstring'
app.config['SECURITY_SEND_REGISTER_EMAIL'] = False
app.config['DEBUG_TB_ENABLED'] = True

api = Api(app)
toolbar=DebugToolbarExtension(app)

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

class OSCL(db.Model):
    # __tablename__ = 'OSCL'
    id =db.Column(db.Integer(), primary_key=True)
    priority = db.Column(db.Integer())
    subject = db.Column(db.String(100))
    problemTyp = db.Column(db.String(100))
    ProSubType = db.Column(db.String(100))
    callType = db.Column(db.String(100))
    contactCode = db.Column(db.String(100))
    BPContact = db.Column(db.String(100))
    createTime = db.Column(db.DateTime())
    BPPhone1 = db.Column(db.String(20))
    BPCellular = db.Column(db.String(20))
    BPE_Mail = db.Column(db.String(50))
    # empresa = db.Column(db.String(80), unique=True)
    BPProjCode = db.Column(db.String(80))
    description = db.Column(db.String(8000))
    # trgtPath = db.Column()

class User(db.Model, UserMixin):
    # __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True)
    username = db.Column(db.String(255), unique=True)
<<<<<<< HEAD
    telefono = db.Column(db.String(255))
    celular = db.Column(db.String(255))
=======
    # email = db.Column(db.String(255), unique=True)
>>>>>>> 11c6136181f89e75db86b162404679f17af5ca96
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    empresa = db.Column(db.String(255))
    password = db.Column(db.String(255))
    active = db.Column(db.Boolean())
    password = db.Column(db.String(255))
    confirmed_at = db.Column(db.DateTime())
    roles = db.relationship('Role', secondary='roles_users', backref=db.backref('users', lazy='dynamic'))



class ExtendedLoginForm(LoginForm):
<<<<<<< HEAD
    email = StringField('Usuario o Mail', [Required()])


class ExtendedRegisterForm(RegisterForm):
    username = StringField('Nombre de Usuario', [Required()])
    email = StringField('Mail', [Required()])
    telefono = StringField('Telefono', [Required()])
    celular = StringField('Celular', [Required()])
    first_name = StringField('Primer Nombre', [Required()])
    last_name = StringField('Apellido', [Required()])
    empresa = StringField('Nombre Empersa', [Required()])
=======
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

>>>>>>> 11c6136181f89e75db86b162404679f17af5ca96

# Setup Flask-Security
user_datastore = SQLAlchemyUserDatastore(db, User, Role)
security = Security(app, user_datastore,
                    register_form=ExtendedRegisterForm,
                    login_form=ExtendedLoginForm)

@security.register_context_processor
def context_processor():
    return dict(hello=True)

<<<<<<< HEAD
#Create a user to test with
# @app.before_first_request
# def create_user():
#     db.create_all()
#     user_datastore.create_user(email='r', password='p')
=======
# Create a user to test with
@app.before_first_request
# def create_user():
#     db.create_all()
#     user_datastore.create_user(username='t', password='p')
>>>>>>> 11c6136181f89e75db86b162404679f17af5ca96
#     db.session.commit()

# # Views
@app.route('/')
# @login_required
def home():
    return render_template('usrform.html')

@app.route('/test')
def test():
    return render_template('test.html')

<<<<<<< HEAD
@app.route('/<username>')
@login_required
def euser(username):
    user = User.query.filter_by(username=username).first();
    return render_template('user.html', user=user)

class llamadaServicio(Resource):
    def get(self):
        # return render_template('test.html')
        ids = "asdf"
        se = db.text("SELECT * FROM [user] WHERE username = :ids")
        que = db.engine.execute(se, ids = ids)
        un = [dict(row) for row in que]
        un = un[0]
        return jsonify(un["email"])

    def post(self):
        sn = request.get_json()
        # u = db.engine.execute("SELECT * FROM user")
        # su = jsonify([dict(row) for row in u])

        se = db.text("SELECT * FROM [user] WHERE username = :ids")
        # u = db.engine.execute(se, ids = sn["BPContact"]).fetchall()
        ids = "asdf"
        u = db.engine.execute(se, ids=ids).fetchall()
        su = [dict(row) for row in u]
        su = su[0]
        sas = OSCL(priority=sn["priority"], subject=sn["subject"], problemTyp=sn["problemTyp"], ProSubType=sn["ProSubType"], callType=sn["callType"], contactCode=su["id"], BPContact=su["username"], createTime=su["confirmed_at"], BPPhone1=su["telefono"], BPCellular=su["celular"], BPE_Mail=su["email"], BPProjCode=su["empresa"], description=sn["description"])


        # sas = OSCL(priority=sn["priority"], subject=sn["subject"], problemTyp=sn["problemTyp"], ProSubType=sn["ProSubType"], callType=sn["callType"], contactCode=sn["contactCode"], BPContact=sn["BPContact"], createTime=sn["createTime"], BPPhone1=sn["BPPhone1"], BPCellular=sn["BPCellular"], BPE_Mail=sn["BPE_Mail"], BPProjCode=sn["BPProjCode"], description=sn["description"])
        # {"priority":"priority", "subject":"subject", "problemTyp":"problemTyp", "ProSubType":"ProSubType", "callType":"callType", "contactCode":"contactCode", "BPContact":"BPContact", "createTime":"createTime", "BPPhone1":"BPPhone1", "BPCellular":"BPCellular", "BPE_Mail":"BPE_Mail", "BPProjCode":"BPProjCode", "description":"description"}
        # sas = json.loads(ssn, object_hook=lambda d: namedtuple('X', d.keys())(*d.values()))
        # sas = User(sa)
        db.session.add(sas)
        db.session.commit()
        return {'Saved call': sn['subject']}
        # return jsonify(sas)

class query(Resource):
    def get(self):
        # stmt = db.text('''SELECT * FROM OSCL CAST('{"foo": "bar"}' as JSON) as `json`''')
        # stmt = stmt.columns(json=db.types.JSON)
        # u = db.engine.execute("")
        q = db.engine.execute("SELECT * FROM OSCL")
        # q = db.engine.execute(stmt).fetchone()
        # return db.type(q.json)
        s = db.select([OSCL])
        result =  db.engine.execute(s)
        return jsonify({'result': [dict(row) for row in q]})

    def post(self):
        sn = request.get_json()
        # u = db.engine.execute("SELECT * FROM user")
        # su = jsonify([dict(row) for row in u])

        # se = db.text("SELECT id FROM [user] WHERE username = :ids")

        se = db.text("SELECT :id FROM [user]")
        ids = "id"
        sele = sn["query"]
        sele = 'id,email'
        # u = db.engine.execute(se, sele='email', ids=ids).fetchall()
        u = db.engine.execute(se, {'id':'idas'})
        su = [dict(row) for row in u]
        su = su[0]


        # db.session.add(sas)
        # db.session.commit()
        return jsonify(su)
        # return sn["query"]

api.add_resource(llamadaServicio, '/llamada_servicio')
api.add_resource(query, '/query')
=======
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
>>>>>>> 11c6136181f89e75db86b162404679f17af5ca96

if __name__ == '__main__':
    app.run()
