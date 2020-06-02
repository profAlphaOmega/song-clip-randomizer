# from .base import *

'''Tries to import from local.py if the file exists. The file only should exist on local machine
        and never the webserver. If the file does not exist, you are on the webserver and should
        pull from the production.py file'''

try:
    from .local import *
    InProduction = False
except:
    InProduction = True

if InProduction:
    from .production import *
