from flask import Flask, render_template, request, jsonify, make_response, redirect, send_file
from flask_sqlalchemy import SQLAlchemy
from flask_security import Security, SQLAlchemyUserDatastore, UserMixin, RoleMixin, login_required
from flask_login import current_user
from flask_mail import Mail, Message
from flask_security.forms import RegisterForm, StringField, Required, LoginForm, PasswordField
from flask_restful import Resource, Api
from flask_debugtoolbar import DebugToolbarExtension
from collections import namedtuple
import json

from database import db, SendMail
from models import OSCL, OCLG, ATCH

import datetime
from functools import wraps
import os.path





class validar():
    def empresa(f):
        def wrapper(*args, **kwargs):
            try:
                se = db.text("select OSCL.id from[user] INNER JOIN OSCL on[user].CardCode=oscl.BPProjCode WHERE[user].id=:ids and LEFT([user] .CardCode,1)='C' UNION select OSCL.id from[user] INNER JOIN OSCL on LEFT([user].CardCode,1)='P' where [user].id=:ids")
                ids = current_user.get_id()
                print(ids)
                sn = request.get_json()
                print(sn['ticket'])
                # ids = sn["CntctSbjct"]
                u = db.engine.execute(se, ids=ids).fetchall()
                su = [dict(row) for row in u]
                # su = su[0]
                print(su)

                # recipient = list(range(0,len(su)))
                for i in range(0,len(su)):
                    if su[i]['id'] == int(sn['ticket']):
                        print('GOTCHA')
                        return f(*args, **kwargs)
                    print(su[i]['id'])
                return 'you cannot acces this page'
	            #     recipient[i] = su[i]['email']
                # print(recipient)

            except Exception as error:
                print(error)
                return 'User has no tickets'
        return wrapper

    def usuario(f):
        def wrapper():
            if(False):
                return f()
            else:
                return 'void'
        return wrapper

    def simple(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            print('hey')
            return f(*args, **kwargs)
        return wrapper


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

class activate(Resource):
    def get(self):
        headers = {'Content-Type':'text/html'}
        return make_response(render_template('activation.html'),200,headers)
    def post(self):
        try:
            se = db.text("SELECT * FROM [user]")
            u = db.engine.execute(se)
            su = [dict(row) for row in u]
            # su = su[1]
            # return {'Saved call': status}
            return(jsonify(su))
        except Exception as error:
            print (error)
            # return "got an error on post method"
            return jsonify(error.args)
    def put(self):
        try:
            sn = request.get_json()
            se = db.text("UPDATE [user] SET active=:active WHERE id=:ids")
            ids = sn["usuario"]
            active = sn["active"]
            result = db.engine.execute(se, ids=ids, active=active)
            status = db.session.commit()
            # return jsonify({'result': [dict(row) for row in result]})
            # return {'status': 'updated user'}
            return {'status': status}
        except Exception as error:
            print (error)
            # return "got an error on post method"
            return jsonify(error.args)

class historial(Resource):
    @login_required
    def get(self):
        headers = {'Content-Type':'text/html'}
        return make_response(render_template('html/pages-historial.html'),200,headers)

    def post(self):
        print("sent")
        try:
            sn = request.get_json()
            # usuario = sn["usuario"]
            print(sn)
            bandera = sn["bandera"]
            if bandera == 'especifico':
                print(bandera)
                usuario = sn['ids']
            else:
                usuario = current_user.get_id()
            print(usuario)
            se = db.text("exec historial :usuario, :bandera")
            print(se)
            u = db.engine.execute(se, usuario=usuario, bandera=bandera)
            su = [dict(row) for row in u]
            print("Data from query:")
            print(su)
            # su = su[1]
            print("sent")
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
        print("Posting Ticket")
        try:
            sn = request.get_json()
            se = db.text("SELECT * FROM [user] WHERE username = :ids")
            ids = sn["usuario"]
            u = db.engine.execute(se, ids=ids).fetchall()
            su = [dict(row) for row in u]
            su = su[0]
            sas = OSCL(priority=sn["priority"], estado=sn["estado"], subject=sn["subject"], problemTyp=sn["problemTyp"], ProSubType=sn["ProSubType"], callType=sn["callType"], contactCode=su["id"], BPContact=sn["BPContact"], BPPhone1=su["telefono"], BPCellular=su["celular"], BPE_Mail=su["email"], BPProjCode=su["CardCode"], dscription=sn["dscription"])
            db.session.add(sas)
            status = db.session.commit()
            print('here')

            try:
                #Send Notification Mail
                t = datetime.date.today()
                # t = d.day +" del "+t.month
                d=t.strftime("%d")+" del "+t.strftime("%m")+", "+t.strftime("%Y")

                var = {
                    'ticket':sn['subject'],
                    'date':d,
                    'usuario':sn["usuario"],
                    'first_name':su["first_name"],
                }
                print(var)

                sm = db.text("select d.email FROM OPMG as b inner join [user] as c on b.CardCode = c.cardcode inner join [user] as d on b.owner = d.username WHERE c.username = :ids and b.Estado <> 'ADDON' UNION select  d.email FROM OPMG as b inner join [user] as c on b.CardCode = c.cardcode inner join [user] as d on b.owner = d.username WHERE c.username = :ids and b.estado = :call")
                ids = sn["usuario"]
                call = sn["callType"]
                u = db.engine.execute(sm, ids=ids, call=call).fetchall()
                su = [dict(row) for row in u]
                # su = su["email"]
                print()
                print()
                print("sending mail to:")
                recipient = list(range(0,len(su)))
                for i in range(0,len(su)):
	                recipient[i] = su[i]['email']
                print(recipient)
                ma = SendMail(vara=var,recipient=recipient)
                print(ma.ticket())
            except Exception as error:
                print("Catched ERROR on SendMail @/postticket")
                print(error)

            # return redirect("http://www.google.com", code=302)
            # return {'Saved call': sn['subject']}, 200
            return {'Saved call': status}

        except Exception as error:
            print("Catched ERROR on POST @/ticket")
            print (error)
            return jsonify({'error':error.args})
            # return jsonify({'error':error.args}), 400

class actividad(Resource):
    # @validar.empresa
    @login_required
    def get(self):
        headers = {'Content-Type':'text/html'}
        return make_response(render_template('html/app-actividad.html'),200,headers)

    def post(self):
        print ("geting in post @actividad")
        try:
            sn = request.get_json()
            # se = db.text("SELECT * FROM OCLG WHERE ticket = :ids")

            # se = db.text("select a.* " +
            #              "from   OCLG as a " +
            #              "       inner join OSCL as b on a.ticket = b.id " +
            #              "       inner join [user] as c on b.contactCode = c.id " +
            #              "where  c.username = :ids")

            # ids = sn["usuario"]
            se = db.text("select case when left(b.CardCode, 1) = 'P' then 'Addvisory' else b.username end as usuario, " +
                         "       a.*, 'oculto' as estado " +
                         "from   OCLG as a " +
                         "       inner join [user] as b on a.CntctSbjct = b.username " +
                         "where  a.ticket = :ids")
            ids = sn["ticket"]
            print("TICKET: ")
            print(ids)

            u = db.engine.execute(se, ids=ids).fetchall()
            su = [dict(row) for row in u]

            print("Resultado Query: ")
            print(su)
            # su = su[0]
            return jsonify(su)
            # return jsonify(su), 200

        except Exception as error:
            print ("got an error on POST method at /Actividad")
            print (error)
            return jsonify(error.args)
            # return jsonify(error.args), 400

    def put(self):
        print("Puting Actividad")
        try:
            sn = request.get_json()
            print(sn)
            se = db.text("SELECT * FROM [user] WHERE username = :ids")
            ids = sn["CntctSbjct"]
            u = db.engine.execute(se, ids=ids).fetchall()
            su = [dict(row) for row in u]
            su = su[0]
            print(su)
            print()

            se = db.text("SELECT * FROM OSCL WHERE id = :ids")
            ids = sn["ticket"]
            u = db.engine.execute(se, ids=ids).fetchall()
            sr = [dict(row) for row in u]
            sr = sr[0]
            print(sr)

            sas=OCLG(ticket=sn['ticket'], CntctSbjct=sn['CntctSbjct'], notes=sn['notes'])
            db.session.add(sas)
            db.session.commit()

            # Send Notification Mail
            try:
                #Send Notification Mail
                t = datetime.date.today()
                d=t.strftime("%d")+" del "+t.strftime("%m")+", "+t.strftime("%Y")
                var = {
                    'ticket':sr['subject'],
                    'date':d,
                    'usuario':su["username"],
                    'first_name':su["first_name"]
                }
                print(var)

                sm = db.text("select d.email FROM OPMG as b inner join [user] as c on b.CardCode = c.cardcode inner join [user] as d on b.owner = d.username WHERE c.username = :ids and b.Estado <> 'ADDON' UNION select  d.email FROM OPMG as b inner join [user] as c on b.CardCode = c.cardcode inner join [user] as d on b.owner = d.username WHERE c.username = :ids and b.estado = :call UNION select c.email FROM OPMG as b inner join [user] as c on b.CardCode = c.cardcode inner join [user] as d on b.owner = d.username WHERE d.username = :ids")
                ids = su["username"]
                call = sr["callType"]
                print(call)
                print(ids)
                u = db.engine.execute(sm, ids=ids, call=call).fetchall()
                su = [dict(row) for row in u]

                print("sending mail to:")
                recipient = list(range(0,len(su)))
                for i in range(0,len(su)):
	                recipient[i] = su[i]['email']
                print(recipient)

                ma = SendMail(vara=var,recipient=recipient)
                print(ma.actividad())
            except Exception as error:
                print("Catched ERROR on SendMail @/putActivity")
                print(error)

            return jsonify({'result': sn['ticket']})
            # return "{'Saved activity': 'bien'}"
            # return {'Saved activity': sn['details']}, 200

        except (ValueError, KeyError, TypeError) as error:
            return "got an error on put method @actividad"
            # return jsonify({'valueError':ValueError, 'keyError':KeyError, 'typeError':TypeError})
            return jsonify({'error':error})
            # return jsonify({'error':error}), 400

    def patch(self):
        try:
            sn = request.get_json()
            tick = sn["ticket"]
            act = sn["actividad"]
            est = sn["estado"]
            se = db.text("UPDATE OSCL SET resolution=:act, estado=:est WHERE id = :tick")
            db.engine.execute(se, act=act, tick=tick, est=est)
            se = db.text("UPDATE OCLG SET action=0 WHERE ticket = :tick")
            db.engine.execute(se, tick=tick)
            if est=='cerrado':
                se = db.text("UPDATE OCLG SET action=1 WHERE id = :act")
                db.engine.execute(se, act=act)
            status = db.session.commit()
            return {'status': status}
            # return {'Set resolution and close ticket id': sn['ticket']}, 200
        except Exception as error:
            print ("got an error on POST method @Actividad")
            print (error)
            return jsonify({'error':error.args})
            # return jsonify({'error':error.args}), 400


class archivo(Resource):
    def get(self, action=None, *args, **kwargs):
        if action == 'lista':
            tick = request.args.get('ticket')
            se = db.text("SELECT filename, ext FROM ATCH WHERE ticket=:tick ")
            u = db.engine.execute(se, tick=tick).fetchall()
            su = [dict(row) for row in u]
            print('LISTA DE ARCHIVOS')
            print(tick)
            print(su)
            # su = su[0]
            # return {tick:act}
            return jsonify(su)
        else:
            print('hey')
            try:
                filename  = request.args.get('filename')
                # se = db.text("SELECT diskname FROM ATCH WHERE ticket=:tick AND actividad=:act ")
                se = db.text("SELECT diskname FROM ATCH WHERE filename=:filename ")
                u = db.engine.execute(se, filename=filename).fetchall()
                su = [dict(row) for row in u]
                su = su[0]
                print(su)
                # return {tick:act}
                # return su
                return send_file('files/'+su['diskname'], as_attachment=True, attachment_filename=filename)
            except Exception as e:
               print('error')
               print(e)
               return 'error'

    def post(self, action=None, *args, **kwargs):
        print("saving attachment")
        if 'file' in request.files:
            print('Got file!')
            tick = request.args.get('ticket')
            act  = request.args.get('actividad')
            print('tick')
            print(tick)
            print('act')
            print(act)
            fil = request.files['file']
            filename = fil.filename
            print(filename)
            ext=filename[filename.find('.')+1:len(filename)]

            i=1
            fil.filename  = 'TI'+str(tick).zfill(6)+'AC'+str(act).zfill(6)+'AT'+str(i).zfill(2)
            print(fil.filename)
            while(os.path.exists('files/'+fil.filename)):
                i+=1
                fil.filename  = 'TI'+str(tick).zfill(6)+'AC'+str(act).zfill(6)+'AT'+str(i).zfill(2)
                print(fil.filename)
            diskname = fil.filename

            fil.save('files/'+diskname)

            sas = ATCH(diskname=diskname, filename=filename, ext=ext, ticket=tick, actividad=act)
            db.session.add(sas)
            status = db.session.commit()
            print(status)
            return {'status':status}
        else:
            try:
                print('Got no file, data sent:')
                print (request.files)
                print('__dir__()')
                print (request.__dir__())
                print('__dir__()')
                print (request.files.__dir__())
                print('Raw data as text')
                print (request.get_data(as_text=True))
                return 'No file was sent'
            except Exception as error:
                print('ERROR')
                print (error)
                return error



# @validar.simple
class prueba(Resource):
    @validar.empresa
    def get(self):
        # sn = request.get_json()
        print ('hello world')
        # print(sn)
        # return {'hello world':sn['dato']}
        return 'hello world'
    def post(self):
        return "prueba post"

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
