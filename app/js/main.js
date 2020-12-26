var notecreate = document.getElementById('notecreate'),
    note_add = document.getElementById('add'),
    note_add_bt = document.getElementById('add-bt'),
    updid;

function reset_view() {
    var temps = document.getElementsByClassName('note');
    for (let x = 0; x < temps.length; x++) {
        var cnt = document.getElementsByClassName('note')[x];
        cnt.style = 'display: inline;'
    }
}

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