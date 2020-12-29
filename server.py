import eel
import json

global db_notes
global users
global session
global tmp_session 

@eel.expose
def session_chk(val, nm):
    print('ok')
    sess = ''
    try:
        sess = tmp_session ['SID']
        if sess:
            print(sess)
            if sess == val and nm == 'index':
                eel.redir()
    except NameError as err:
        print('error')
        eel.redir()

def user_read():
    global users
    with open('./db/UsersDB.json') as users_db:
        users = json.load(users_db)
        users_db.close()
    print('done')


tmp_session = {
    'SID' : '',
    'user': '',
    'file': ''
}


def start():
    user_read()
    eel.init('app')
    eel.start('index.html', mode='msedge')

def db_read():
    global session
    try:
        if session == tmp_session['SID']:
            global db_notes
            fl = tmp_session['file']
            with open(f'{fl}') as nt:
                db_notes = json.load(nt)
                nt.close()
        else:
            eel.home()
    except NameError as err:
        if err:
            print('error')
            eel.redir()

def db_write():
    global db_notes
    fl = tmp_session['file']
    with open(f'{fl}', 'w') as nt:
        nt.write('')
        nt.write(json.dumps(db_notes))
        nt.close()

@eel.expose
def new_user(username, userpass):
    exists = False

    default_db = {
        "Notes":[],
        "tmp": []
    }

    for x in users['users']:
        if x[1] == username:
            exists = True
            eel.check_account()
            break
    
    if exists == False:
        users["users"].append([len(users["users"]), f"{username}", f"{userpass}", f"NotesDB_{username}.json"])
        
        with open(f'./db/NotesDB_{username}.json', 'w') as db:
            db.write(json.dumps(default_db))
            
        with open('./db/UsersDB.json', 'w') as user_db:
            user_db.write(json.dumps(users))

@eel.expose
def log_out():
    tmp_session['user'] = ''
    tmp_session['file'] = ''    
    tmp_session['SID'] = ''


@eel.expose
def login(usr, pss):
    global session 
    global tmp_session
    for x in users['users']:
        print([x[1], x[2]] == [usr, pss], [x[1], x[2]], [usr, pss])
        if [x[1], x[2]] == [usr, pss]:
            print([x[1], x[2]] == [usr, pss])
            tmp_session['user'] = x[1]
            tmp_session['file'] = f'./db/NotesDB_{str(x[1])}.json'
            tmp_session['SID'] = '41223149213' # WIP will be random
            print(tmp_session['SID'])
            session = tmp_session['SID']
            eel.create_session(tmp_session['SID'])
            break

@eel.expose
def check(vl):
    if vl != '':
        if tmp_session['SID'] == vl:
            eel.mod_session('valid')

@eel.expose
def init():
    try:
        db_read()
        global db_notes
        if len(db_notes) > 0:
            for x in db_notes['Notes']:
                eel.create_note(x[0], x[1], 'db')
            for x in db_notes['tmp']:
                eel.bin((x[0],x[1]))
    except NameError as err:
        if err:
            print('error')

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