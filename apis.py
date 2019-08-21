from flask import Flask, render_template, request, jsonify, make_response, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_security import Security, SQLAlchemyUserDatastore, UserMixin, RoleMixin, login_required
from flask_mail import Mail, Message
from flask_security.forms import RegisterForm, StringField, Required, LoginForm, PasswordField
from flask_restful import Resource, Api
from flask_debugtoolbar import DebugToolbarExtension
from collections import namedtuple
import json

from database import db
from models import OSCL, OCLG


class usuarioInfo(Resource):
    def post(self):
        sn = request.get_json()
        se = db.text("SELECT * FROM [user] WHERE username=:usuario")
        usuario = sn["usuario"]
        u = db.engine.execute(se, usuario=usuario).fetchall()
        su = [dict(row) for row in u]
        su = su[0]
        su["password"] = '' 
        return jsonify(su)

class historial(Resource):
    @login_required
    def get(self):
        headers = {'Content-Type':'text/html'}
        return make_response(render_template('historial.html'),200,headers)

    def post(self):
        try:
            sn = request.get_json()
            se = db.text("exec historial :usuario, :bandera")
            usuario = sn["usuario"]
            bandera = sn["bandera"]
            u = db.engine.execute(se, usuario=usuario, bandera=bandera)
            su = [dict(row) for row in u]
            # su = su[1]
            return jsonify(su)
        except Exception as error:
            print (error)
            # return "got an error on post method"
            return jsonify(error.args)
            # return jsonify(error.args), 400
        # , status=400
            # return {"JSON Format Error."}, status=400, mimetype='application/json'

class ticket(Resource):
    @login_required
    def get(self):
        print("loading page ticket")
        headers = {'Content-Type':'text/html'}
        return make_response(render_template('ticket.html'),200,headers)

    def post(self):
        print("entering post")
        try:
            print("try post data1")
            sn = request.get_json()
            se = db.text("SELECT * FROM [user] WHERE username = :ids")
            ids = sn["usuario"]
            print(sn)
            u = db.engine.execute(se, ids=ids).fetchall()
            su = [dict(row) for row in u]
            print("try post data2")
            print(su)
            su = su[0]
            print(su)
            sas = OSCL(priority=sn["priority"], estado=sn["estado"], subject=sn["subject"], problemTyp=sn["problemTyp"], ProSubType=sn["ProSubType"], callType=sn["callType"], contactCode=su["id"], BPContact=sn["BPContact"], createTime=su["confirmed_at"], BPPhone1=su["telefono"], BPCellular=su["celular"], BPE_Mail=su["email"], BPProjCode=su["CardCode"], dscription=sn["dscription"])
            db.session.add(sas)
            status = db.session.commit()
            # db.session.commit()
            print("api ran with no errors")
            # return {'Saved call': sn['subject']}
            # return redirect("http://www.google.com", code=302)
            # return {'Saved call': sn['subject']}, 200
            return {'Saved call': status}
            # return(200);

        except Exception as error:
            print("Catched ERROR on POST @/ticket")
            print (error)
            # return "got an error on post method"
            return jsonify({'error':error.args})
            # return jsonify({'error':error.args}), 400

class actividad(Resource):
    def post(self):
        print ("geting in get")
        try:
            sn = request.get_json()
            # se = db.text("SELECT * FROM OCLG WHERE ticket = :ids")

            se = db.text("select a.* " +
                         "from   OCLG as a " +
                         "       inner join OSCL as b on a.ticket = b.id " +
                         "       inner join [user] as c on b.contactCode = c.id " +
                         "where  c.username = :ids")
            ids = sn["usuario"]

            u = db.engine.execute(se, ids=ids).fetchall()
            su = [dict(row) for row in u]

            # print (su)
            # su = su[0]
            return jsonify(su)
            # return jsonify(su), 200
        except Exception as error:
            print ("got an error on POST method at /Actividad")
            print (error)
            return jsonify(error.args)
            # return jsonify(error.args), 400

    def put(self):
        try:
            sn = request.get_json()
            # sas=OCLG(ticket=sn['ticket'], CntctSbjct=sn['CntctSbjct'], details=sn['details'], notes=sn['notes'], recontact=sn['recontact'], begintime=sn['begintime'], action=sn['action'])
            # sas=OCLG(ticket=sn['ticket'], CntctSbjct=sn['CntctSbjct'], notes=sn['notes'], recontact=sn['recontact'], begintime=sn['begintime'], action=sn['action'])
            sas=OCLG(ticket=sn['ticket'], CntctSbjct=sn['CntctSbjct'], notes=sn['notes'])
            db.session.add(sas)
            db.session.commit()
            return jsonify({'result': sn['ticket']})
            # return "{'Saved activity': 'bien'}"
            # return {'Saved activity': sn['details']}, 200
        except (ValueError, KeyError, TypeError) as error:
            # print (error)
            # return "got an error on post method"
            # return jsonify({'valueError':ValueError, 'keyError':KeyError, 'typeError':TypeError})
            return jsonify({'error':error})
            # return jsonify({'error':error}), 400
    def update(self):
        try:
            sn = request.get_json()
            se = db.text("UPDATE OSCL SET resolution=:sol, estado='cerrado' WHERE id = :ids")
            ids = sn["ticket"]
            sol = sn["resolution"]
            db.engine.execute(se, sol=sol, ids=ids)
            # su = [dict(row) for row in u]
            # su = su[0]
            # db.session.add(sas)
            db.session.commit()
            return {'Set resolution and close ticket id': sn['ticket']}
            # return {'Set resolution and close ticket id': sn['ticket']}, 200
        except Exception as error:
            print ("got an error on POST method at /Actividad")
            print (error)
            return jsonify({'error':error.args})
            # return jsonify({'error':error.args}), 400


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
