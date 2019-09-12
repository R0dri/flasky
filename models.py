from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship, backref
from flask_security.forms import RegisterForm, LoginForm, Required, StringField, PasswordField
from sqlalchemy import Boolean, DateTime, Column, Integer, String, ForeignKey, Table
from flask_security import UserMixin, RoleMixin
from flask_security import Security, SQLAlchemyUserDatastore, login_required
from flask_security import user_registered

from contextlib import contextmanager

from database import db, app

from sqlalchemy.sql import func, expression


# time_created = Column(DateTime(timezone=True), server_default=func.now())
# time_updated = Column(DateTime(timezone=True), onupdate=func.now())

# Define models
roles_users = db.Table('roles_users',
        db.Column('user_id', db.Integer(), db.ForeignKey('user.id')),
        db.Column('role_id', db.Integer(), db.ForeignKey('role.id')))

# class roles_users(db.Model):
#     # __tablename__ = 'roles_users'
#     id = Column(Integer(), primary_key=True)
#     user_id = Column('user_id', Integer(), ForeignKey('user.id'))
#     role_id = Column('role_id', Integer(), ForeignKey('role.id'))

class Role(db.Model, RoleMixin):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255))

class User(db.Model, UserMixin):
    # __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True)
    username = db.Column(db.String(255), unique=True)
    telefono = db.Column(db.String(255))
    celular = db.Column(db.String(255))
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    # empresa = db.Column(db.String(254))
    CardCode = db.Column(db.String(20)) #id del Cliente
    password = db.Column(db.String(255))
    active = db.Column(db.Boolean(), nullable=False)
    password = db.Column(db.String(255))
    confirmed_at = db.Column(db.DateTime(timezone=True))
    last_login_at = db.Column(db.DateTime(timezone=True))
    current_login_at = db.Column(db.DateTime(timezone=True))
    last_login_ip = db.Column(db.String(20))
    current_login_ip = db.Column(db.String(20))
    login_count = db.Column(db.Integer)
    origen = db.Column(db.String(255)) #Tabla de origen OHEM ODCA OUSR
    roles = db.relationship('Role', secondary='roles_users', backref=db.backref('users', lazy='dynamic'))

class asign (db.Model):
    # __tablename__ = 'asign'
    id = db.Column(db.Integer(), primary_key=True)
    sap_email = db.Column(db.String(100))
    empresa = db.Column(db.String(100))


# Clientes
class OCRD(db.Model):
    # __tablename__ = 'OCRD'
    CardCode = db.Column(db.String(15), primary_key=True)
    CardName = db.Column(db.String(15))     #Nombre Cliente
    DfTcnician = db.Column(db.String(20))   #Consultor Asignado principal
    OwnerCode = db.Column(db.String(50))    #Dueno del proyecto (fijo)

    recontact = db.Column(db.DateTime(timezone=True), server_default=func.now())
    begintime = db.Column(db.DateTime(timezone=True), server_default=func.now())
    # begintime = recontact
    #action = db.Column(db.String(100))     #?

# Proyectos
class OPMG(db.Model):
    # __tablename__ = 'OPMG'
    AbsEntry =db.Column(db.Integer(), primary_key=True)
    CardCode = db.Column(db.String(15))       #id cliente
    Estado = db.Column(db.String(20))  #tag AddOn, Productivo, Post Productivo
    NAME = db.Column(db.String(20))      #Primario, nuevo/secundario -> antes proyecto
    OWNER = db.Column(db.String(20))      #consultor
    # OwnerCode = db.Column(db.String(20))      #Cliente

    endtime = db.Column(db.DateTime(timezone=True), server_default=func.now())
    begintime = db.Column(db.DateTime(timezone=True), server_default=func.now())

# Estados de cada proyecto
class SCLA(db.Model):
    # __tablename__ = 'OPMG'
    id = db.Column(db.Integer(), primary_key=True)
    OSCL = db.Column(db.Integer())
    Estado   = db.Column(db.String(20))  #tag AddOn, Productivo, Post Productivo
    begintime = db.Column(db.DateTime(timezone=False), server_default=func.now())

# Actividades
class OCLG(db.Model):
    # __tablename__ = 'OCLG'
    id =db.Column(db.Integer(), primary_key=True)
    ticket = db.Column(db.Integer())       #ticket_id
    CntctSbjct = db.Column(db.String(20))  #user_id
    details = db.Column(db.String(50))     #asunto
    notes = db.Column(db.String(100))
    recontact = db.Column(db.DateTime(timezone=True), server_default=func.now())
    begintime = db.Column(db.DateTime(timezone=True), server_default=func.now())
    # begintime = recontact
    action = db.Column(db.String(100))     #?


# Tickets
class OSCL(db.Model):
    # __tablename__ = 'OSCL'
    id =db.Column(db.Integer(), primary_key=True)
    priority = db.Column(db.Integer())
    subject = db.Column(db.String(100))     #asunto
    estado = db.Column(db.String(50))
    problemTyp = db.Column(db.String(100))
    ProSubType = db.Column(db.String(100))
    callType = db.Column(db.String(100))    #?
    contactCode = db.Column(db.String(100)) #username?
    BPContact = db.Column(db.String(100))   #usuario afectado
    createTime = db.Column(db.DateTime(timezone=True), server_default=func.now())
    createDate = db.Column(db.DateTime(timezone=True), server_default=func.now())
    # createDate = createTime
    BPPhone1 = db.Column(db.String(20))     #^
    BPCellular = db.Column(db.String(20))   #^
    BPE_Mail = db.Column(db.String(50))     #^correo usuario
    BPProjCode = db.Column(db.String(80))   #empresa?
    dscription = db.Column(db.String(8000))
    resolution = db.Column(db.String(8000))

class ATCH(db.Model):
    # __tablename__ = 'ATCH'
    # id = db.Column(db.Integer(), primary_key=True)
    diskname = db.Column(db.String(20), primary_key=True)
    ext = db.Column(db.String(5))
    # diskname = db.Column(db.String(20))
    filename = db.Column(db.String(100))
    ticket = db.Column(db.Integer())
    actividad = db.Column(db.Integer())

#Set Modification for Security Forms
class ExtendedLoginForm(LoginForm):
    # username = StringField('Usuario', [Required()])
    email = StringField('Correo', [Required()])
    password = PasswordField('Contrase&ntilde;a', [Required()])

class ExtendedRegisterForm(RegisterForm):
    username = StringField('Usuario', [Required()])
    # email = StringField('Usuario', [Required()])
    first_name = StringField('Nombre', [Required()])
    last_name = StringField('Apellido', [Required()])
    CardCode = StringField('C&oacute;digo Empresa', [Required()])
    telefono = StringField('Tel&eacute;fono', [Required()])
    celular = StringField('Celular', [Required()])
    password = PasswordField('Contrase&ntilde;a', [Required()])
    password_confirm = PasswordField('Confirmar Contrase&ntilde;a', [Required()])

# Setup Flask-Security
user_datastore = SQLAlchemyUserDatastore(db, User, Role)
security = Security(app, user_datastore,
                    confirm_register_form=ExtendedRegisterForm,
                    login_form=ExtendedLoginForm)

