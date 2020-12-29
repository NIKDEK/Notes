var create_acct_bt = document.getElementById('SUP');

eel.expose(check_account);
eel.expose(redir)
eel.session_chk(document.cookie, 'index');

function redir() {
    window.location.href = '/main.html'
}

function create_acct() {
    var usr = document.getElementById('User_create').value,
        pass = document.getElementById('Pass_create').value;
    if (usr == '' || pass == '') {
        alert('Complete all the fields');
    } else {
        eel.new_user(usr, pass);
        alert('New user created')
    };
};

function check_account() {
    var chk = confirm('this user already, exist wanna go home?')
    if (chk) {
        window.location.href = '/index.html'
    }
}

create_acct_bt.addEventListener('click', function () {
    create_acct()
});