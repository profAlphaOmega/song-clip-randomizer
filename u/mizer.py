from random import randint
import wave
#from scikits.audiolab import wavread, wavwrite
#from scipy import vstack



def randomizer_uploads(files):

    # Categorize Files
    intros = filter(lambda x: 'intro' in x.name, files)
    verses = filter(lambda w: 'verse' in w.name, files)
    bridges = filter(lambda z: 'bridge' in z.name, files)
    fillers = filter(lambda u: 'filler' in u.name, files)

    # Choose random file from list
    intro = intros[randint(0, len(intros) - 1)]
    verse = verses[randint(0, len(verses) - 1)]
    bridge = bridges[randint(0, len(bridges) - 1)]
    filler = fillers[randint(0, len(fillers) - 1)]

    # Group Files
    infiles = [intro, verse, filler, bridge]

    return infiles


def randomizer(infiles):

    # Categorize Files

    intros = filter(lambda x: 'intro' in x[1], infiles)
    verses = filter(lambda w: 'verse' in w[1], infiles)
    bridges = filter(lambda z: 'bridge' in z[1], infiles)
    fillers = filter(lambda u: 'filler' in u[1], infiles)

    # Choose random file from list
    intro = ''
    verse = ''
    bridge = ''
    filler = ''

    if intros:
        intro = intros[randint(0, len(intros) - 1)]
    if verses:
        verse = verses[randint(0, len(verses) - 1)]
    if bridges:
        bridge = bridges[randint(0, len(bridges) - 1)]
    if fillers:
        filler = fillers[randint(0, len(fillers) - 1)]

    # Group Files
    infiles = filter(None, [intro, verse, filler, bridge])

    return infiles
