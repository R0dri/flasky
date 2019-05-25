from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship, backref
from sqlalchemy import Boolean, DateTime, Column, Integer, String, ForeignKey, Table
from flask_security import UserMixin, RoleMixin

from database import db


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
    empresa = db.Column(db.String(255))
    password = db.Column(db.String(255))
    active = db.Column(db.Boolean())
    password = db.Column(db.String(255))
    confirmed_at = db.Column(db.DateTime())
    roles = db.relationship('Role', secondary='roles_users', backref=db.backref('users', lazy='dynamic'))

class OCLG(db.Model):
    # __tablename__ = 'OCLG'
    id =db.Column(db.Integer(), primary_key=True)
    ticket = db.Column(db.Integer())
    CntctSbjct = db.Column(db.String(20))
    details = db.Column(db.String(50))
    notes = db.Column(db.String(100))
    recontact = db.Column(db.DateTime(100))
    begintime = db.Column(db.DateTime())
    action = db.Column(db.String(100))

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
    dscription = db.Column(db.String(8000))
    resolution = db.Column(db.String(8000))


