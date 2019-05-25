from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail


# Create app and import configurations
app = Flask(__name__)
app.config.from_json('config.json')

# # Test Overrides
# app.config['DEBUG'] = True
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/rodri'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pyodbc://sa:B1Admin@@MSSQLSRV'
# app.config['MAIL_SERVER'] = 'smtp.gmail.com'
# app.config['SECURITY_EMAIL_SENDER'] = 'rodri.mendoza.t@gmail.com'
# app.config['MAIL_USERNAME'] = 'rodri.mendoza.t@gmail.com'

#Create database and mail connection objects
db = SQLAlchemy(app)
mail = Mail(app)


#Create a user to test with
# @app.before_first_request
# def create_user():
#     db.create_all()
#     user_datastore.create_user(email='r', password='p')
#     db.session.commit()
