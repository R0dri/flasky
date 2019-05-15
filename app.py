from flask import Flask, render_template, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_security import Security, SQLAlchemyUserDatastore, UserMixin, RoleMixin, login_required
from flask_security.forms import RegisterForm, StringField, Required, LoginForm, PasswordField
from flask_restful import Resource, Api
from flask_debugtoolbar import DebugToolbarExtension
from collections import namedtuple
import json


# Create app
app = Flask(__name__)
# app.config['DEBUG'] = True
app.config['SECRET_KEY'] = 'super-secret'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/rodri'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pyodbc://sa:B1Admin@@MYMSSQL'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pyodbc://sa:B1Admin@@MSSQLSRV'
app.config['SECURITY_POST_REGISTER_VIEW'] = '/about'
app.config['SECURITY_REGISTERABLE'] = True
app.config['SECURITY_PASSWORD_SALT'] = 'somesupersecretstring'
app.config['SECURITY_SEND_REGISTER_EMAIL'] = False
app.config['DEBUG_TB_ENABLED'] = False 
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

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
    estado = db.Column(db.String(50))
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
    telefono = db.Column(db.String(255))
    celular = db.Column(db.String(255))
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    empresa = db.Column(db.String(255))
    password = db.Column(db.String(255))
    active = db.Column(db.Boolean())
    password = db.Column(db.String(255))
    confirmed_at = db.Column(db.DateTime())
    roles = db.relationship('Role', secondary='roles_users', backref=db.backref('users', lazy='dynamic'))


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
                    register_form=ExtendedRegisterForm,
                    login_form=ExtendedLoginForm)

@security.register_context_processor
def context_processor():
    return dict(hello=True)

#Create a user to test with
# @app.before_first_request
# def create_user():
#     db.create_all()
#     user_datastore.create_user(email='r', password='p')
#     db.session.commit()

# # Views
@app.route('/')
@login_required
def home():
    return render_template('historial.html')

@app.route('/<usuario>')
@login_required
def usuario (usuario):
    user = User.query.filter_by(username=usuario).first();
    return render_template('usuario.html',user=user)

# @app.route('/<username>')
# @login_required
# def euser(username):
#     user = User.query.filter_by(username=username).first();
#     return render_template('user.html', user=user)

@app.route('/about')
def about():
    return render_template('about.html')

class usuarioInfo(Resource):
    def get(self):
        sn = request.get_json()
        se = db.text("SELECT * FROM [user] WHERE username=:usuario")
        usuario = sn["usuario"]
        u = db.engine.execute(se, usuario=usuario).fetchall()
        su = [dict(row) for row in u]
        su = su[0]
        su["password"] = '' 
        return jsonify(su)

class historial(Resource):
    # def get(self):
    #     headers = {'Content-Type':'text/html'}
    #     return make_response(render_template('historial.html'),200,headers)

    def post(self):
        try:
            sn = request.get_json()
            se = db.text("exec historial :usuario, :bandera")
            usuario = sn["usuario"]
            bandera = sn["bandera"]
            u = db.engine.execute(se, usuario=usuario, bandera=bandera).fetchall()
            su = [dict(row) for row in u]
            su = su[0]
            return jsonify(su)
        except (ValueError, KeyError, TypeError) as error:
            print (error)
            return "got an error on post method"
            # return {"JSON Format Error."}, status=400, mimetype='application/json'

class ticket(Resource):
    def get(self):
        headers = {'Content-Type':'text/html'}
        return make_response(render_template('ticket.html'),200,headers)

    def post(self):
        try:
            sn = request.get_json()
            se = db.text("SELECT * FROM [user] WHERE username = :ids")
            ids = sn["usuario"]
            u = db.engine.execute(se, ids=ids).fetchall()
            su = [dict(row) for row in u]
            su = su[0]
            sas = OSCL(priority=sn["priority"], subject=sn["subject"], problemTyp=sn["problemTyp"], ProSubType=sn["ProSubType"], callType=sn["callType"], contactCode=su["id"], BPContact=sn["BPContact"], createTime=su["confirmed_at"], BPPhone1=su["telefono"], BPCellular=su["celular"], BPE_Mail=su["email"], BPProjCode=su["empresa"], description=sn["dscription"])
            db.session.add(sas)
            db.session.commit()
            return {'Saved call': sn['subject']}
        except (ValueError, KeyError, TypeError) as error:
            print (error)
            return "got an error on post method"


api.add_resource(ticket, '/ticket')
api.add_resource(usuarioInfo, '/usuarioInfo')
api.add_resource(historial, '/historial')

# class query(Resource):
#     def get(self):
#         # return render_template('test.html')
#         # ids = "asdf"
#         # se = db.text("SELECT * FROM [user] WHERE username = :ids")
#         # que = db.engine.execute(se, ids = ids)
#         # un = [dict(row) for row in que]
#         # un = un[0]

#         # return jsonify(un["email"])
#         # stmt = db.text('''SELECT * FROM OSCL CAST('{"foo": "bar"}' as JSON) as `json`''')
#         # stmt = stmt.columns(json=db.types.JSON)
#         # u = db.engine.execute("")
#         q = db.engine.execute("SELECT * FROM OSCL")
#         # q = db.engine.execute(stmt).fetchone()
#         # return db.type(q.json)
#         s = db.select([OSCL])
#         result =  db.engine.execute(s)
#         return jsonify({'result': [dict(row) for row in q]})

#     def post(self):
#         sn = request.get_json()
#         #     # sas = json.loads(ssn, object_hook=lambda d: namedtuple('X', d.keys())(*d.values()))
#         # u = db.engine.execute("SELECT * FROM user")
#         # su = jsonify([dict(row) for row in u])

#         # se = db.text("SELECT id FROM [user] WHERE username = :ids")

#         se = db.text("SELECT :id FROM [user]")
#         ids = "id"
#         sele = sn["query"]
#         sele = 'id,email'
#         # u = db.engine.execute(se, sele='email', ids=ids).fetchall()
#         u = db.engine.execute(se, {'id':'idas'})
#         su = [dict(row) for row in u]
#         su = su[0]


#         # db.session.add(sas)
#         # db.session.commit()
#         return jsonify(su)
#         # return sn["query"]

# api.add_resource(query, '/usuario')

# @app.route('/test')
# def test():
#     return render_template('test.html')




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
