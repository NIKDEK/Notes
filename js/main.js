var notecreate = document.getElementById('notecreate'),
    note_add = document.getElementById('add'),
    note_add_bt = document.getElementById('add-bt'),
    note_cnt = document.getElementById('note-container'),
    bin_bt = document.getElementById('bin'),
    bin_ct = document.getElementById('bin-ct'),
    bin_xt = document.getElementById('bin-exit'),
    updid;


var temp = {
    'title': [],
    'content': []
};

var tmp = []

function enable_note_editor(action) {
    function enable() {
        note_add_bt.className = 'add hide-bt';
        notecreate.className = "notecreate notecreate-show";
        if (note_add.innerText == 'Save') {
            document.getElementById('notetitle').value = updid.childNodes[0].firstElementChild.innerText;
            document.getElementById('notetext').value = updid.childNodes[1].firstElementChild.innerText;
        }
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


function create_note(title = '', content = '') {

    var tt_val = title,
        txt_val = content;

    if (title == '' && content == '') {
        tt_val = document.getElementById('notetitle').value;
        txt_val = document.getElementById('notetext').value;
    }

    if (tt_val != '' && txt_val != '') {
        if (note_add.innerText == 'Save') {
            updid.childNodes[0].firstElementChild.innerText = tt_val;
            updid.childNodes[1].firstElementChild.innerText = txt_val;
            enable_note_editor('update');
        } else {

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
                tmp.push(template)
                note_cnt.removeChild(template);

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


note_add_bt.addEventListener('click', function () {
    if (note_add_bt.className == "add hide-bt") {
        enable_note_editor();
    } else {
        enable_note_editor('create');
    }
});

note_add.addEventListener('click', function () {
    create_note();
});

function bin_enable(func) {
    if (func == 'open') {
        bin_ct.className = 'bin bin-show'
    } else {
        bin_ct.className = 'bin'
    }
};


bin_bt.addEventListener('click', function () {
    bin_enable('open');
});

bin_xt.addEventListener('click', function () {
    bin_enable();
});