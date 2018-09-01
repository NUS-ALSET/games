import sys
import time
import traceback
import javascript

from browser import document as doc, window, alert

# set height of container to 66% of screen


has_ace = True
preCode = "from browser import document as doc, window, alert;\nworld=window.world;\n";
postCode = "\nwindow.result=getPlayersCommands(world);";

if hasattr(window, 'localStorage'):
    from browser.local_storage import storage
else:
    storage = None

if 'set_debug' in doc:
    __BRYTHON__.debug = int(doc['set_debug'].checked)


class cOutput:
    encoding = 'utf-8'

    def __init__(self):
        # self.cons = doc["python-console"]
        self.buf = ''

    def write(self, data):
        self.buf += str(data)

    def flush(self):
        # self.cons.value += self.buf
        window.console.log(self.buf)
        self.buf = ''

    def __len__(self):
        return len(self.buf)


cOut = cOutput()
sys.stdout = cOut
sys.stderr = cOut


def to_str(xx):
    return str(xx)



def show_console(ev):
    doc["python-console"].value = output
    doc["python-console"].cols = 60


# run a script, in global namespace if in_globals is True
def run(userCode):
    global output
    show_js(userCode)
    doc["python-console"].value = ''
    src=preCode + "" + userCode + "" + postCode;

    t0 = time.perf_counter()
    try:
        ns = {'__name__':'__main__'}
        exec(src, ns)
        state = 1
    except Exception as exc:
        traceback.print_exc(file=sys.stderr)
        state = 0
    sys.stdout.flush()
    output = doc["python-console"].value

    print('<completed in %6.2f ms>' % ((time.perf_counter() - t0) * 1000.0))
    return state

def show_js(userCode):
    src=preCode + "" + userCode + "" + postCode;
    window.newPySrc = javascript.py2js(src, '__main__')

# bind function with javascript
window.runPython=run;

