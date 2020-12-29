eel.session_chk(document.cookie, 'index');
eel.expose(login);
eel.expose(mod_session);
eel.expose(create_session);
eel.expose(redir)

function redir() {
    window.location.href = '/main.html'
}

var login_bt = document.getElementById('login_bt'),
    new_acct_bt = document.getElementById('new_acct'),
    session;

login_bt.addEventListener('click', function () {
    login();
});

new_acct_bt.addEventListener('click', function () {
    window.location.href = '/singup.html'
})

function mod_session(vl) {
    session = vl;
    if (session == 'valid') {
        window.location.href = '/main.html';
    } else {
        alert('Bad credentials try again');
    };
};

function login() {
    var usr = document.getElementById('User').value,
        pass = document.getElementById('Pass').value;
    eel.login(usr, pass);
    eel.check(document.cookie);
};

function create_session(tmp_session) {
    document.cookie = tmp_session;
};