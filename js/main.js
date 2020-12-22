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
                note_cnt.removeChild(template);
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

        bin_tt.innerHTML = `<label>${tmp.children[0].firstElementChild.innerText}</label>`
        bin_cnt.innerHTML = `<p>${tmp.children[1].firstElementChild.innerText.slice(0,25)+'...'}</p>`;

        bin_note.appendChild(bin_tt);
        bin_note.appendChild(bin_cnt);

        var id = document.getElementsByClassName('bin-note').length;

        bin_note.innerHTML += `<div class="bts"><label class="safe-lb" onclick="bin_rest(${id},'${tmp.children[0].firstElementChild.innerText}', '${tmp.children[1].firstElementChild.innerText}')"><</label><label class="danger-lb" onclick="bin_del(${id},false)">x</label></div>`

        bin_nt.appendChild(bin_note);
        //};
    };
};


function bin_del(id, del) {
    var chk = del;

    function delbin() {
        bin_nt = document.getElementById('bin-notes');
        bin_nt.removeChild(document.getElementsByClassName("bin-note")[id]);
    };
    if (chk == false) {
        var chk = confirm('Sure?, this action cannot be undone.');
        if (chk) {
            delbin();
        }
    } else {
        delbin();
    }
}

function bin_rest(id, tt, txt) {
    bin_del(id, true);
    create_note(tt, txt);
}

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