eel.session_chk(document.cookie, 'main');
eel.expose(create_note);
eel.expose(bin);
eel.expose(home);
eel.expose(redir);
eel.init();

var note_cnt = document.getElementById('note-container'),
    bin_bt = document.getElementById('bin'),
    bin_ct = document.getElementById('bin-ct'),
    bin_xt = document.getElementById('bin-exit'),
    search_bar = document.getElementById('search_bar'),
    search_bt = document.getElementById('search'),
    log_out_bt = document.getElementById('log_out_bt');

function redir() {
    window.location.href = '/index.html'
}

function home() {
    window.location.href = '/index.html'
}

function search(arg) {
    var temps = document.getElementsByClassName('note');
    if (arg != '') {
        for (let x = 0; x < temps.length; x++) {
            var cnt = document.getElementsByClassName('note')[x],
                tt = cnt.children[0].innerText.includes(arg),
                txt = cnt.children[1].innerText.includes(arg);
            cnt.style = 'display: inline;'
            if (tt == false && txt == false) {
                cnt.style = 'display: none;'
            }
        }
    } else {
        reset_view()
    }
};

function enable_note_editor(action) {

    reset_view()

    function enable() {
        note_add_bt.className = 'add hide-bt';
        notecreate.className = "notecreate notecreate-show";
        if (note_add.innerText == 'Save') {
            document.getElementById('notetitle').value = updid.childNodes[0].firstElementChild.innerText;
            document.getElementById('notetext').value = updid.childNodes[1].firstElementChild.innerText;
        };
    };

    function disable() {
        note_add_bt.className = "add";
        notecreate.className = "notecreate";
        updid = '';
        document.getElementById("notetitle").value = '';
        document.getElementById('notetext').value = '';
        note_add.innerText = 'Create';
    };

    if (action == "create") {
        enable();
    } else if (action == "update") {
        enable();
    } else {
        disable();
    };
};

function add(title = '', content = '') {
    var tt_val = title,
        txt_val = content;

    if (title == '' && content == '') {
        tt_val = document.getElementById('notetitle').value;
        txt_val = document.getElementById('notetext').value;
    }
    create_note(tt_val, txt_val);
}

function create_note(tt_val, txt_val, key = '') {
    reset_view()
    /*
    div class="note">
                <div class="title-nt">
                    <label for="">TEXT</label>
                </div>
                <div class="cnt">
                    <p>
                        TEXT
                    </p>
                </div>
                <div class="opcs">
                    <label class="update">Update</label><label class="del">Delete</label>
                </div>
            </div>
    */

    if (tt_val != '' && txt_val != '') {
        if (note_add.innerText == 'Save') {
            updid.childNodes[0].firstElementChild.innerText = tt_val;
            updid.childNodes[1].firstElementChild.innerText = txt_val;
            enable_note_editor('update');
            // eel.db_update(tt_val, txt_val);
            enable_note_editor();
            console.log(bin_locate(tt_val, txt_val, 'note'), tt_val, txt_val)
            eel.db_update(bin_locate(tt_val, txt_val, 'note'), tt_val, txt_val);
        } else {
            if (key == '') {
                eel.db_add(tt_val, txt_val);
            }
            var template = document.createElement('div'),
                tt = document.createElement('div'),
                cnt = document.createElement('div'),
                tt_vl = document.createElement('label'),
                cnt_val = document.createElement('p'),
                bts = document.createElement('div'),
                bts_upd_lb = document.createElement('label'),
                bts_del_lb = document.createElement('label');

            tt_vl.innerText = tt_val;
            cnt_val.innerText = txt_val;

            tt.className = "title-nt";
            tt.appendChild(tt_vl);

            cnt.className = "cnt";
            cnt.appendChild(cnt_val);

            bts_upd_lb.className = 'update'
            bts_upd_lb.innerText = 'Update'


            bts_del_lb.className = 'del';
            bts_del_lb.innerText = 'Delete';

            bts.className = 'opcs';
            bts.appendChild(bts_upd_lb);
            bts.appendChild(bts_del_lb);

            template.className = "note";
            template.appendChild(tt);
            template.appendChild(cnt);
            template.appendChild(bts);

            /* template.innerHTML += `<div class="opcs">
            <label id="update">Update</label><label id="del" onclick="delt()">Delete</label>
            </div>`*/

            note_cnt.appendChild(template);
            bts_del_lb.addEventListener('click', function () {

                /*var note_cnt = document.getElementById('note-container'),
                    check = confirm('This action cannot be undone ');*/
                note_cnt.removeChild(template);
                eel.db_del(template.children[0].firstChild.innerText, template.children[1].firstChild.innerText)
                bin(template);
                enable_note_editor();
                /*if (check) {

                }*/
            });
            enable_note_editor();
            bts_upd_lb.addEventListener('click',
                function note_update() {
                    updid = this.parentElement.parentElement;
                    note_add.innerText = 'Save';
                    enable_note_editor('update');
                });
            enable_note_editor();
        }
    } else {
        alert('fields cannot be empty');
    };
};

function bin(tmp) {
    var bin_nt = document.getElementById('bin-notes');
    if (tmp) {
        //  for (let x = 0; x < tmp.length; x++) {
        var bin_note = document.createElement('div'),
            bin_tt = document.createElement('div'),
            bin_cnt = document.createElement('div');
        /*
           <div class="bin-note">
                <div class="title">
                    <label for="">
                        Lorem.
                    </label>
                </div>
                <div class="cnt-prev">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, provident!....
                    </p>
                </div>
                <div class="bts">
                    <label for="" class="safe-lb">
                        < </label> <label for="" class="danger-lb"> X
                    </label>
                </div>
            </div>*/

        bin_note.className = "bin-note";
        bin_tt.className = "title";
        bin_cnt.className = "cnt-prev"
        var bn_tt,
            bn_stxt,
            bn_txt;

        try {
            bn_tt = tmp.children[0].firstElementChild.innerText;
            bn_stxt = tmp.children[1].firstElementChild.innerText.slice(0, 25) + '...';
            bn_txt = tmp.children[1].firstElementChild.innerText;
        } catch (err) {
            if (err) {
                bn_tt = tmp[0];
                bn_stxt = tmp[1].slice(0, 25) + '...';
                bn_txt = tmp[1]
            }
        }

        bin_tt.innerHTML = `<label>${bn_tt}</label>`
        bin_cnt.innerHTML = `<p>${bn_stxt}</p>`;

        bin_note.appendChild(bin_tt);
        bin_note.appendChild(bin_cnt);

        var id = document.getElementsByClassName('bin-note').length;

        bin_note.innerHTML += `<div class="bts"><label class="safe-lb" onclick="bin_rest('${bn_tt}','${bin_cnt.firstChild.innerText}','${bn_txt}')"><</label><label class="danger-lb" onclick="bin_del(['${bn_tt}','${bin_cnt.firstChild.innerText}','${bn_txt}'],false)">x</label></div>`

        bin_nt.appendChild(bin_note);
        //};
    };
};


function bin_locate(tt, txt, clss) {
    var bn = document.getElementsByClassName(clss),
        id;
    for (let x = 0; x < bn.length; x++) {
        var tt_chk = bn[x].children[0].innerText == tt,
            txt_chk = bn[x].children[1].innerText == txt;
        if (tt_chk && txt_chk) {
            id = x;
            return id;
            break;
        };
    };
};

function bin_del(prm, del) {

    var chk = del,
        id;

    if (typeof (prm) != "number") {
        id = bin_locate(prm[0], prm[1], 'bin-note');
    } else {
        id = prm
    }

    function delbin() {
        var nt = document.getElementsByClassName("bin-note")[id];
        bin_nt = document.getElementById('bin-notes');
        bin_nt.removeChild(nt);
        //eel.db_del(id[2],txt)
    };
    if (chk == false) {
        var chk = confirm('Sure?, this action cannot be undone.');
        if (chk) {
            eel.del_back(prm[0], prm[2])
            delbin();
        }
    } else {
        delbin();
    }
}

function bin_rest(tt, stxt, txt) {
    bin_del(bin_locate(tt, stxt, 'bin-note'), true)
    add(tt, txt);
    eel.del_back(tt, txt);
}

function bin_enable(func) {
    if (func == 'open') {
        bin_ct.className = 'bin bin-show'
    } else {
        bin_ct.className = 'bin'
    }
};

search_bt.addEventListener('click', function () {
    var search_inf = document.getElementById('search_bar').value;
    search(search_inf);
})

search_bar.addEventListener('keyup', function () {
    search(this.value);
});

search_bar.addEventListener('click', function () {
    search(this.value);
});

note_add_bt.addEventListener('click', function () {
    if (note_add_bt.className == "add hide-bt") {
        enable_note_editor();
    } else {
        enable_note_editor('create');
    }
});

note_add.addEventListener('click', function () {
    add();
});

bin_bt.addEventListener('click', function () {
    bin_enable('open');
});

bin_xt.addEventListener('click', function () {
    bin_enable();
});

log_out_bt.addEventListener('click', function () {
    var lout = confirm('Log Out?')
    if (lout) {
        eel.log_out();
        window.location.href = '/index.html';
    }
});