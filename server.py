import eel

def start():
    eel.init('./');
    eel.start('index.html', mode='msedge')

@eel.expose
def inf(vl):
    print(vl)

if __name__ == "__main__":
    start()