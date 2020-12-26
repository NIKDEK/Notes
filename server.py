import eel
import json

global db_notes

session = ''

def start():
    eel.init('app')
    eel.start('index.html', mode='msedge')

def db_read():
    global db_notes
    with open('./db/NotesDB.json') as nt:
        db_notes = json.load(nt)
        nt.close()

def db_write():
    global db_notes
    with open('./db/NotesDB.json', 'w') as nt:
        nt.write('')
        nt.write(json.dumps(db_notes))
        nt.close()

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
def db_del(tt,txt, key):
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