import eel
import json
import math

global db_notes
global users
global session
global tmp_session 

session = ''

with open(f'./db/UsersDB.json') as users_db:
    users = json.load(users_db)
    users_db.close()


tmp_session = {
    'SID' : '',
    'user': '',
    'file': ''
}


def start():
    eel.init('app')
    eel.start('index.html', mode='msedge')

def db_read():
    global session
    if session == tmp_session['SID'] and session != '':
        global db_notes
        fl = tmp_session['file']
        with open(f'{fl}') as nt:
            db_notes = json.load(nt)
            nt.close()
    else:
        eel.home()

def db_write():
    global db_notes
    fl = tmp_session['file']
    with open(f'{fl}', 'w') as nt:
        nt.write('')
        nt.write(json.dumps(db_notes))
        nt.close()

@eel.expose
def login(usr, pss):
    global session 
    for x in users['users']:
        print([x[1], x[2]] == [usr, pss], [x[1], x[2]], [usr, pss])
        if [x[1], x[2]] == [usr, pss]:
            print([x[1], x[2]] == [usr, pss])
            tmp_session['user'] = x[1]
            tmp_session['file'] = f'./db/NotesDB_{str(x[1])}.json'
            tmp_session['SID'] = '41223149213' # WIP will be random
            eel.create_session(tmp_session['SID'])
            session = tmp_session['SID']
            break

@eel.expose
def check(vl):
    if vl != '':
        if tmp_session['SID'] == vl:
            eel.mod_session('valid')

@eel.expose
def init():
    db_read()
    global db_notes
    if len(db_notes) > 0:
        for x in db_notes['Notes']:
            eel.create_note(x[0], x[1], 'db')
        for x in db_notes['tmp']:
            eel.bin((x[0],x[1]))

@eel.expose
def db_add(tt,txt):
    db_notes['Notes'].append((tt,txt))
    db_write()

@eel.expose
def db_del(tt,txt):
    nt_tmp = []

    for x in db_notes['Notes']:
        if x == [tt,txt]:
            db_notes['tmp'].append([tt,txt])
        else:
            nt_tmp.append(x)
        db_notes['Notes'] = nt_tmp
    db_write()

@eel.expose
def del_back(tt,txt):
    tmp = []
    for x in db_notes['tmp']:
        if x == [tt,txt]:
            continue
        else:
            tmp.append(x)
    db_notes['tmp'] = tmp
    db_write()

@eel.expose
def db_update(nid, tt, txt):
    db_notes['Notes'][nid][0] = tt
    db_notes['Notes'][nid][1] = txt
    db_write()

if __name__ == "__main__":
    start()