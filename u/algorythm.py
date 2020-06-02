import random


##############################  ALGORYTHM  #################################

def getpath(shpe, conn, end, seed):
    '''Contructs Path'''
    path = []
    oupt = list(map((lambda x: x[1]), shpe))   # [x[1] for x in shpe]
    targ = list(map((lambda x: x[1]), conn))
    if end in targ:
        srchTarg = targ.index(end)
        srce = conn[srchTarg][0]
        if srce == 'output0':
            return path
        if srce in oupt:
            srchSrce = oupt.index(srce)
            if not shpe[srchSrce][3]:
                path = [shpe[srchSrce][2]] + path
                inpt = shpe[srchSrce][0]
                path = getpath(shpe, conn, inpt, seed) + path
                # print "path3: {}".format(path)
                return path
            else:
                ents = shpe[srchSrce][3]
                pool = 0
                for ent in ents:
                    pool = pool + float(ent['text'])
                if pool == 0:
                    inpt = shpe[srchSrce][0]
                    path = getpath(shpe, conn, inpt, seed) + path
                    return path
                roll = random.random()
                comp = 0
                hit = -1
                while roll >= comp:
                    hit += 1
                    comp = comp + float(ents[hit]['text']) / pool
                inpt = 'input_' + ents[hit]['id']
                path = getpath(shpe, conn, inpt, seed) + path
                inpt = shpe[srchSrce][0]
                path = getpath(shpe, conn, inpt, seed) + path
                return path
        else:
            return path
    else:
        return path



def getwavs(json, seed):
    '''Get Files'''
    table_shpe = []
    table_conn = []
    data = json

    for d in data:
        if d["type"] == "Branch":
            table_shpe = table_shpe + [[d['ports'][0]['name'], d['ports'][1]['name'], d['cssClass'], d['entities']]]
        elif d["type"] == "Wav":
            table_shpe = table_shpe + [[d['ports'][0]['name'], d['ports'][1]['name'], d['cssClass'], []]]
        elif d["type"] == "draw2d.Connection":
            table_conn = table_conn + [[d['source']['port'], d['target']['port']]]
        else:
            print 'error'
    random.seed(seed)
    path = getpath(table_shpe, table_conn, "input0", seed)
    random.seed()
    return path



