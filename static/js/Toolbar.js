
example.Toolbar = Class.extend({

	init:function(elementId, view)
	{
		this.html = $("#"+elementId);
		this.view = view;

		// register this class as event listener for the canvas
		// CommandStack. This is required to update the state of
		// the Undo/Redo Buttons.
		//
		view.getCommandStack().addEventListener(this);

		// Register a Selection listener for the state hnadling
		// of the Delete Button
		//
        view.on("select", $.proxy(this.onSelectionChanged,this));

		// Inject the NEW Button
		//
		this.deleteButton7  = $("<button class='gray'>New</button>");
		this.html.append(this.deleteButton7);
		this.deleteButton7.click($.proxy(function(){
			window.open("/u/song/new","_blank");
		},this));
		// Inject the LOAD Button
		//
		this.deleteButton8  = $("<button class='gray'>Load</button>");
		this.html.append(this.deleteButton8);
		this.deleteButton8.click($.proxy(function(){
			var songName = prompt("Load Song");
			if (songName)
			{
				window.open("index.php?song=" + songName,"_blank");
			}
		},this));

		// Inject the SAVE Button
		//
		this.saveButton  = $("<button class='gray'>Save</button>");
		this.html.append(this.saveButton);
		this.saveButton.click($.proxy(function(){
			while (document.getElementById("logo").innerHTML == "untitled")
			{
				var songName = prompt("Save Song",document.getElementById("logo").innerHTML);
				if (songName)
				{
					document.getElementById("logo").innerHTML = songName;
				}
			}
			$.ajax
		    ({
		        type: "POST",
		        //dataType : 'json',
		        async: false,
		        url: 'addSong.php',
		        data: { par1: document.getElementById("logo").innerHTML, par2: document.getElementById("json").innerHTML },
		        // success: function () {alert("Save Successful"); window.location.href = "test3.php?song=" + document.getElementById("logo").innerHTML;},
		        success: function () {alert("Save Successful");},
		        failure: function() {alert("Save Failed");}
		    });
		    var test = new Date();
			document.getElementById("audio").src = "getSong.php?song=" + document.getElementById("logo").innerHTML+ "&seed=" + document.getElementById("seed").innerHTML.substr(6) + "&pseed=" + test.getTime();
		    //alert("test");
		},this));

		// Inject the COPY Button
		//
		this.saveButton1  = $("<button class='gray'>Copy</button>");
		this.html.append(this.saveButton1);
		this.saveButton1.click($.proxy(function(){
			// while (document.getElementById("logo").innerHTML == "untitled")
			// {
			var songName = prompt("Copy Song");
			if (songName)
			{
				$.ajax
			    ({
			        type: "POST",
			        //dataType : 'json',
			        async: false,
			        url: 'copySong.php',
			        data: { par1: document.getElementById("logo").innerHTML, par2: songName },
			        // success: function () {alert("Save Successful"); window.location.href = "test3.php?song=" + document.getElementById("logo").innerHTML;},
			        success: function () {window.open("index.php?song=" + songName,"_blank");},
			        failure: function() {alert("Copy Failed");}
			    });
			}
			// }
			//window.open("test3.php?song=" + songName,"_blank");
		    //alert("test");
		},this));

		this.delimiter  = $("<span class='toolbar_delimiter'>&nbsp;</span>");
		this.html.append(this.delimiter);
		this.delimiter  = $("<span class='toolbar_delimiter'>&nbsp;</span>");
		this.html.append(this.delimiter);
		this.delimiter  = $("<span class='toolbar_delimiter'>&nbsp;</span>");
		this.html.append(this.delimiter);

		// Inject the UNDO Button and the callbacks
		//
		this.undoButton  = $("<button class='gray'>Undo</button>");
		this.html.append(this.undoButton);
		this.undoButton.click($.proxy(function(){
		       this.view.getCommandStack().undo();
		},this));

		// Inject the REDO Button and the callback
		//
		this.redoButton  = $("<button class='gray'>Redo</button>");
		this.html.append(this.redoButton);
		this.redoButton.click($.proxy(function(){
		    this.view.getCommandStack().redo();
		},this));




		// Inject SaveNEW Button
		this.saveNewButton = $("<button class='gray'>SaveNEWz</button>");
		this.html.append(this.saveNewButton);
		this.saveNewButton.click($.proxy(function(){

		var songName = prompt('Save Song', document.getElementById('savenewsongtitle').getAttribute('value'));
                if (songName)
                {
                document.getElementById('savenewsongtitle').setAttribute('value', songName);
                }
                document.getElementById('savenewjson').setAttribute('value', document.getElementById('json').innerHTML);
                document.getElementById('savenewseed').setAttribute('value', document.getElementById('useed').getAttribute('value'));
		},this));


		// Inject the DELETE Button
		//
		this.deleteButton  = $("<button class='gray'>Delete</button>");
		this.html.append(this.deleteButton);
		this.deleteButton.click($.proxy(function(){
			var node = this.view.getPrimarySelection();
			//alert(node.isDeleteable());
			if (node.isDeleteable())
			{
				var command= new draw2d.command.CommandDelete(node);
				this.view.getCommandStack().execute(command);
			}
		},this));

		this.delimiter  = $("<span class='toolbar_delimiter'>&nbsp;</span>");
		this.html.append(this.delimiter);
		this.delimiter  = $("<span class='toolbar_delimiter'>&nbsp;</span>");
		this.html.append(this.delimiter);
		this.delimiter  = $("<span class='toolbar_delimiter'>&nbsp;</span>");
		this.html.append(this.delimiter);


		// Inject the PLAY Button
		//
		this.deleteButton3  = $("<button class='gray'>Play</button>");
		this.html.append(this.deleteButton3);
		this.deleteButton3.click($.proxy(function(){
			//alert(document.getElementById("audio").ended);
			if (document.getElementById("audio").ended)
			{
				var test = new Date();
//				document.getElementById("audio").src = "getSong.php?song=" + document.getElementById("logo").innerHTML + "&seed=" + document.getElementById("seed").innerHTML.substr(6) + "&pseed=" + test.getTime();
//				document.getElementById("audio").src = ";
//				document.getElementById("audio").play();
                alert("hi");
			}
			else
			{
				document.getElementById("audio").play();
			}
		},this));

		// Inject the PAUSE Button
		//
		this.deleteButton4  = $("<button class='gray'>Pause</button>");
		this.html.append(this.deleteButton4);
		this.deleteButton4.click($.proxy(function(){
			document.getElementById("audio").pause();
		},this));

		// Inject the REPLAY Button
		//
		this.deleteButton10  = $("<button class='gray'>Replay</button>");
		this.html.append(this.deleteButton10);
		this.deleteButton10.click($.proxy(function(){
			//document.getElementById("audio").pause();
			var test = new Date();
			document.getElementById("audio").src = "getSong.php?song=" + document.getElementById("logo").innerHTML + "&seed=" + document.getElementById("seed").innerHTML.substr(6) + "&pseed=" + test.getTime();
			document.getElementById("audio").play();
		},this));

		// Inject the RANDOMIZE Button
		//
		this.deleteButton5  = $("<button class='gray'>Randomize</button>");
		this.html.append(this.deleteButton5);
		this.deleteButton5.click($.proxy(function(){
			document.getElementById("audio").pause();
			var test = new Date();
			var seed = test.getTime()
			document.getElementById("useed").innerHTML = "Seed: " + seed;
			document.getElementById("useed").setAttribute('value', seed);
//			document.getElementById("audio").src = "getSong.php?song=" + document.getElementById("logo").innerHTML + "&seed=" + document.getElementById("seed").innerHTML.substr(6) + "&pseed=" + test.getTime();
		},this));


		// Inject the SEED Button
		//
		var seedStart = document.getElementById("audio").src.indexOf("&seed=");
		//alert(seedStart);
		var seedEnd = document.getElementById("audio").src.indexOf("&pseed=");
		//alert(seedEnd);
		var seedSeed = document.getElementById("audio").src.substring(seedStart+6,seedEnd);
		//alert(seedSeed);
		this.deleteButton9  = $("<button id='seed' class='gray' style='width:200'>Seed: " + seedSeed + "</span></button>");
		this.html.append(this.deleteButton9);
		this.deleteButton9.click($.proxy(function(){
			var songName = prompt("Enter Seed",document.getElementById("seed").innerHTML.substr(6));
			if (songName)
			{
				document.getElementById("seed").innerHTML = "Seed: " + songName;
				var test = new Date();
				document.getElementById("audio").src = "getSong.php?song=" + document.getElementById("logo").innerHTML + "&seed=" + document.getElementById("seed").innerHTML.substr(6) + "&pseed=" + test.getTime();
			}
		},this));

		// Inject the DOWNLOAD Button
		//
		this.deleteButton11  = $("<button class='gray'>Download</button>");
		this.html.append(this.deleteButton11);
		this.deleteButton11.click($.proxy(function(){
			window.open("saveSong.php?song=" + document.getElementById("logo").innerHTML + "&seed=" + document.getElementById("seed").innerHTML.substr(6),"_blank");
		},this));

        this.delimiter  = $("<span class='toolbar_delimiter'>&nbsp;</span>");
		this.html.append(this.delimiter);
		this.delimiter  = $("<span class='toolbar_delimiter'>&nbsp;</span>");
		this.html.append(this.delimiter);
		this.delimiter  = $("<span class='toolbar_delimiter'>&nbsp;</span>");
		this.html.append(this.delimiter);

		// Inject the PLAYER Button
		//
		this.deleteButton6  = $("<button class='gray'>Player</button>");
		this.html.append(this.deleteButton6);
		this.deleteButton6.click($.proxy(function(){
			window.open("player.php?song=" + document.getElementById("logo").innerHTML,"_blank");
		},this));

		this.disableButton(this.undoButton, true);
        this.disableButton(this.redoButton, true);
        this.disableButton(this.deleteButton, true);

        this.html.append($("<div id='toolbar_hint'>Drag &amp; drop elements onto the timeline to create a song...</div>"));
    },

	/**
	 * @method
	 * Called if the selection in the cnavas has been changed. You must register this
	 * class on the canvas to receive this event.
	 *
	 * @param {draw2d.Canvas} emitter
	 * @param {Object} event
	 * @param {draw2d.Figure} event.figure
	 */
	onSelectionChanged : function(emitter, event)
	{
        this.disableButton(this.deleteButton,event.figure===null );
	},

	/**
	 * @method
	 * Sent when an event occurs on the command stack. draw2d.command.CommandStackEvent.getDetail()
	 * can be used to identify the type of event which has occurred.
	 *
	 * @template
	 *
	 * @param {draw2d.command.CommandStackEvent} event
	 **/
	stackChanged:function(event)
	{
        this.disableButton(this.undoButton, !event.getStack().canUndo());
        this.disableButton(this.redoButton, !event.getStack().canRedo());
	},

	disableButton:function(button, flag)
	{
	   button.prop("disabled", flag);
       if(flag){
            button.addClass("disabled");
        }
        else{
            button.removeClass("disabled");
        }
	}
});