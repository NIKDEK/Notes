eel.expose(login)
eel.expose(mod_session)
eel.expose(create_session)

var login_bt = document.getElementById('login_bt'),
    session;

login_bt.addEventListener('click', function () {
    login()
});

function mod_session(vl) {
    session = vl
    if (session == 'valid') {
        window.location.href = '/main.html'
    } else {
        alert('Bad credentials try again')
    }
}

function login() {
    var usr = document.getElementById('User').value,
        pass = document.getElementById('Pass').value;
    eel.login(usr, pass)
    eel.check(document.cookie)
}

function create_session(tmp_session) {
    document.cookie = tmp_session
};