var app = app || {};
var source;
var buffer;
var analyser;

window.onload = function () {
    app.init();
    // console.log('audio loader connected');

    window.addEventListener('drop', onDrop, false);
    window.addEventListener('dragover', onDrag, false);

    initiateAudio("");

    function onDrag(e) {
        e.stopPropagation();
        e.preventDefault();
        $('#notification').velocity('fadeOut', { duration: 150 });
        return false;
    }

    function onDrop(e) {
        e.stopPropagation();
        e.preventDefault();
        var droppedFiles = e.dataTransfer.files;
        initiateAudio(droppedFiles[0]); // initiates audio from the dropped file
    }

    function initiateAudio(data) {
        if(app.audio){
            app.audio.remove();
            window.cancelAnimationFrame(app.animationFrame);
        }
        app.audio = document.createElement('audio'); // creates an html audio element
        //app.audio.src = URL.createObjectURL(data); // sets the audio source to the dropped file
//        app.audio.src = "http://127.0.0.1:88/test/getSong.php?song=mp3+test&seed=5&pseed=1";
        app.audio.autoplay = false;
        //app.audio.play();
        app.audio.id = "audio"
        app.play = true;
//        document.getElementById('useed').
//        document.body.appendChild(app.audio);
        app.ctx = new (window.AudioContext || window.webkitAudioContext)(); // creates audioNode
        source = app.ctx.createMediaElementSource(app.audio); // creates audio source
        analyser = app.ctx.createAnalyser(); // creates analyserNode
        source.connect(app.ctx.destination); // connects the audioNode to the audioDestinationNode (computer speakers)
        source.connect(analyser); // connects the analyser node to the audioNode and the audioDestinationNode
        app.animate();
    }
};

