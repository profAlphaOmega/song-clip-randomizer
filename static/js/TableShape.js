Wav = draw2d.shape.layout.VerticalLayout.extend({

    NAME: "Wav",

    init : function(attr)
    {
        this._super($.extend({bgColor:"#dbddde", color:"#d7d7d7", stroke:1, radius:3},attr));

        this.classLabel = new draw2d.shape.basic.Label({
            text:"ClassName",
            stroke:1,
            fontColor:"#5856d6",
            bgColor:"#f7f7f7",
            radius: this.getRadius(),
            padding:10,
            resizeable:true,
            editor:new draw2d.ui.LabelInplaceEditor()
        });

         var input = this.classLabel.createPort("input");
         var output= this.classLabel.createPort("output");

         input.setName("input_"+this.classLabel.id);
         output.setName("output_"+this.classLabel.id);

         input.setMaxFanOut(1);
         output.setMaxFanOut(1);

        this.add(this.classLabel);
    },


    /**
     * @method
     * Add an entity to the db shape
     *
     * @param {String} txt the label to show
     * @param {Number} [optionalIndex] index where to insert the entity
     */
    addEntity: function(txt, optionalIndex)
    {

    },

    /**
     * @method
     * Remove the entity with the given index from the DB table shape.<br>
     * This method removes the entity without care of existing connections. Use
     * a draw2d.command.CommandDelete command if you want to delete the connections to this entity too
     *
     * @param {Number} index the index of the entity to remove
     */
    removeEntity: function(index)
    {
        this.remove(this.children.get(index+1).figure);
    },

    /**
     * @method
     * Returns the entity figure with the given index
     *
     * @param {Number} index the index of the entity to return
     */
    getEntity: function(index)
    {
        return this.children.get(index+1).figure;
    },


     /**
      * @method
      * Set the name of the DB table. Visually it is the header of the shape
      *
      * @param name
      */
     setName: function(name)
     {
         this.classLabel.setText(name);

         return this;
     },


     /**
      * @method
      * Return an objects with all important attributes for XML or JSON serialization
      *
      * @returns {Object}
      */
     getPersistentAttributes : function()
     {
         var memento= this._super();

        memento.name = this.classLabel.getText();
        memento.entities   = [];
        this.children.each(function(i,e){

            if(i>0){ // skip the header of the figure
                memento.entities.push({
                    text:e.figure.getText(),
                    id: e.figure.id
                });
            }
        });

         return memento;
     },


     /**
      * @method
      * Read all attributes from the serialized properties and transfer them into the shape.
      *
      * @param {Object} memento
      * @return
      */
     setPersistentAttributes : function(memento)
     {
         //this.classLabel.resetPorts();
         this.classLabel.getInputPort(0).setId(memento.ports[0].id);
         this.classLabel.getOutputPort(0).setId(memento.ports[1].id);
         this.classLabel.getInputPort(0).setName(memento.ports[0].name);
         this.classLabel.getOutputPort(0).setName(memento.ports[1].name);
         memento.ports = new Array();
         this._super(memento);

         this.setName(memento.name);

         // if(typeof memento.entities !== "undefined"){
         //     $.each(memento.entities, $.proxy(function(i,e){
         //         var entity =this.addEntity(e.text);
         //         entity.id = e.id;
         //         entity.getInputPort(0).setName("input_"+e.id);
         //         //entity.getOutputPort(0).setName("output_"+e.id);
         //     },this));
         // }



         return this;
     },

    onDrop:function(dropTarget, x, y, shiftKey, ctrlKey)
    {
        // Activate a "smart insert" If the user drop this figure on connection
        //
        if(dropTarget instanceof draw2d.Connection){
            // var oldSource = dropTarget.getSource();
            // dropTarget.setSource(this.classLabel.getOutputPort(0));

            // var additionalConnection = createConnection();
            // this.getCanvas().add(additionalConnection);
            // additionalConnection.setSource(oldSource);
            // additionalConnection.setTarget(this.classLabel.getInputPort(0));
            var oldSource = dropTarget.getSource();
            var oldTarget = dropTarget.getTarget();
            var command0 = new draw2d.command.CommandDelete(dropTarget);
            //dropTarget.setSource(this.classLabel.getOutputPort(0));
            //var command1 = new draw2d.command.Command(eval("dropTarget.setSource(this.classLabel.getOutputPort(0))"));

            // var additionalConnection = createConnection();
            // this.getCanvas().add(additionalConnection);
            // additionalConnection.setSource(oldSource);
            // additionalConnection.setTarget(this.classLabel.getInputPort(0));
            //alert("test");
            //var additionalConnection = createConnection(oldSource,this.classLabel.getInputPort(0));
            //this.getCanvas().add(additionalConnection);
            var test1 = createConnection(oldSource,this.classLabel.getInputPort(0));
            var test2 = createConnection(this.classLabel.getOutputPort(0),oldTarget);
            var command1 = new draw2d.command.CommandAdd(this.getCanvas(),test1,x,y);
            var command2 = new draw2d.command.CommandAdd(this.getCanvas(),test2,x,y);
            var commandCol = new draw2d.command.CommandCollection();
            commandCol.add(command0);
            commandCol.add(command1);
            commandCol.add(command2);
            this.getCanvas().getCommandStack().execute(commandCol);
        }
    }

});

Branch = draw2d.shape.layout.VerticalLayout.extend({

	NAME: "Branch",

    init : function(attr)
    {
    	this._super($.extend({bgColor:"#dbddde", color:"#d7d7d7", stroke:1, radius:3},attr));

        this.classLabel = new draw2d.shape.basic.Label({
            text:"ClassName",
            stroke:1,
            fontColor:"#5856d6",
            bgColor:"#f7f7f7",
            radius: this.getRadius(),
            padding:10,
            resizeable:true,
            editor:new draw2d.ui.LabelInplaceEditor()
        });

         var input = this.classLabel.createPort("input");
         var output= this.classLabel.createPort("output");

         input.setName("input_"+this.classLabel.id);
         output.setName("output_"+this.classLabel.id);

        input.setMaxFanOut(1);
        output.setMaxFanOut(1);

        this.add(this.classLabel);
    },


    /**
     * @method
     * Add an entity to the db shape
     *
     * @param {String} txt the label to show
     * @param {Number} [optionalIndex] index where to insert the entity
     */
    addEntity: function(txt, optionalIndex)
    {
	   	 var label =new draw2d.shape.basic.Label({
	   	     text:txt,
	   	     stroke:0,
	   	     radius:0,
	   	     bgColor:null,
	   	     padding:{left:10, top:3, right:10, bottom:5},
	   	     fontColor:"#4a4a4a",
	   	     resizeable:true,
             editor:new draw2d.ui.LabelEditor()
	   	 });

//        label.installEditor(new draw2d.ui.LabelEditor());
	     var input = label.createPort("input");
	     // var output= label.createPort("output");

         input.setName("input_"+label.id);
         //output.setName("output_"+label.id);

         input.setMaxFanOut(1);
         var _table=this;
         label.on("contextmenu", function(emitter, event){
             $.contextMenu({
                 selector: 'body',
                 events:
                 {
                     hide:function(){ $.contextMenu( 'destroy' ); }
                 },
                 callback: $.proxy(function(key, options)
                 {
                    switch(key){
                    case "rename":
                        setTimeout(function(){
                            emitter.onDoubleClick();
                        },10);
                        break;
                    case "new":
                        setTimeout(function(){
                            _table.addEntity("50");
                        },10);
                        break;
                    case "delete":
                        // with undo/redo support
                        var cmd = new draw2d.command.CommandDelete(emitter);
                        emitter.getCanvas().getCommandStack().execute(cmd);
                    default:
                        break;
                    }

                 },this),
                 x:event.x,
                 y:event.y,
                 items:
                 {
                     "rename": {name: "Rename"},
                     "new":    {name: "New"},
                     "sep1":   "---------",
                     "delete": {name: "Delete"}
                 }
             });
         });

	     if($.isNumeric(optionalIndex)){
             this.add(label, null, optionalIndex+1);
	     }
	     else{
	         this.add(label);
	     }

	     return label;
    },

    /**
     * @method
     * Remove the entity with the given index from the DB table shape.<br>
     * This method removes the entity without care of existing connections. Use
     * a draw2d.command.CommandDelete command if you want to delete the connections to this entity too
     *
     * @param {Number} index the index of the entity to remove
     */
    removeEntity: function(index)
    {
        this.remove(this.children.get(index+1).figure);
    },

    /**
     * @method
     * Returns the entity figure with the given index
     *
     * @param {Number} index the index of the entity to return
     */
    getEntity: function(index)
    {
        return this.children.get(index+1).figure;
    },


     /**
      * @method
      * Set the name of the DB table. Visually it is the header of the shape
      *
      * @param name
      */
     setName: function(name)
     {
         this.classLabel.setText(name);

         return this;
     },


     /**
      * @method
      * Return an objects with all important attributes for XML or JSON serialization
      *
      * @returns {Object}
      */
     getPersistentAttributes : function()
     {

         var memento= this._super();

        memento.name = this.classLabel.getText();
        memento.entities   = [];
        this.children.each(function(i,e){

            if(i>0){ // skip the header of the figure
                memento.entities.push({
                    text:e.figure.getText(),
                    id: e.figure.id
                });
            }
        });
        // memento.ports   = [];
        // memento.ports.push({
        //     type: "draw2d.InputPort",
        //     //id: this.getInputPort(0).id,
        //     width: 10,
        //     height: 10,
        //     alpha: 1,
        //     angle: 0,
        //     userData: {},
        //     cssClass: "draw2d_InputPort",
        //     bgColor: "#4F6870",
        //     color: "#1B1B1B",
        //     stroke: 1,
        //     dasharray: null,
        //     maxFanOut: 1,
        //     //name: "input_" +this.getInputPort(0).id,
        //     port: "draw2d.InputPort",
        //     locator: "draw2d.layout.locator.InputPortLocator"
        // });
        // memento.ports.push({
        //     type: "draw2d.OutputPort",
        //     //id: this.getOutputPort(0).id,
        //     width: 10,
        //     height: 10,
        //     alpha: 1,
        //     angle: 0,
        //     userData: {},
        //     cssClass: "draw2d_OutputPort",
        //     bgColor: "#4F6870",
        //     color: "#1B1B1B",
        //     stroke: 1,
        //     dasharray: null,
        //     maxFanOut: 1,
        //     //name: "output_" +this.getOutputPort(0).id,
        //     port: "draw2d.OutputPort",
        //     locator: "draw2d.layout.locator.OutputPortLocator"
        // });
        // this.children.each(function(i,e){

        //     if(i>0){ // skip the header of the figure
        //         memento.ports.push({
        //             // text:e.figure.getText(),
        //             // id: e.figure.id
        //             type: "draw2d.InputPort",
        //             id: e.figure.id,
        //             width: 10,
        //             height: 10,
        //             alpha: 1,
        //             angle: 0,
        //             userData: {},
        //             cssClass: "draw2d_InputPort",
        //             bgColor: "#4F6870",
        //             color: "#1B1B1B",
        //             stroke: 1,
        //             dasharray: null,
        //             maxFanOut: 9007199254740991,
        //             name: "input_" + e.figure.id,
        //             port: "draw2d.InputPort",
        //             locator: "draw2d.layout.locator.InputPortLocator"
        //         });
        //     }
        // });

         return memento;
     },


     /**
      * @method
      * Read all attributes from the serialized properties and transfer them into the shape.
      *
      * @param {Object} memento
      * @return
      */
     setPersistentAttributes : function(memento)
     {
         // this.classLabel.removePort(this.classLabel.getInputPort(0));
         // this.classLabel.removePort(this.classLabel.getOutputPort(0));
         //alert(this.classLabel.getInputPort(0).id);
         // this.resetPorts();
         this.classLabel.getInputPort(0).setId(memento.ports[0].id);
         this.classLabel.getOutputPort(0).setId(memento.ports[1].id);
         this.classLabel.getInputPort(0).setName(memento.ports[0].name);
         this.classLabel.getOutputPort(0).setName(memento.ports[1].name);
         //alert(memento.ports);
         memento.ports = new Array();
         //alert(JSON.stringify(memento.ports));
         this._super(memento);
         //alert(JSON.stringify(this.classLabel.getPorts()));
         //this.classLabel.getInputPort(0).id = memento.ports[0].id;
         //alert(this.getInputPort(0).id);
         //alert(this.getInputPort(0).id);

         this.setName(memento.name);

         if(typeof memento.entities !== "undefined"){
             $.each(memento.entities, $.proxy(function(i,e){
                //this.resetPorts();
                  var entity =this.addEntity(e.text);
                  //entity.resetPorts();
                  //alert(e.id);
                   entity.id = e.id;
                   entity.getInputPort(0).setName("input_"+e.id);
                   //alert(entity.getInputPort(0).name);
                 //entity.getOutputPort(0).setName("output_"+e.id);
             },this));
         }
         //this.classLabel.resetPorts();
         // if(typeof memento.ports !== "undefined"){
         //     $.each(memento.ports, $.proxy(function(i,e){
         //         this.classLabel. =this.addEntity(e.text);
         //         entity.id = e.id;
         //         entity.getInputPort(0).setName("input_"+e.id);
         //         //entity.getOutputPort(0).setName("output_"+e.id);
         //     },this));
         // }
         // this.classLabel.getInputPort(0).id = memento.ports[0].id;
         // this.classLabel.getOutputPort(0).id = memento.ports[1].id;
         // this.classLabel.getInputPort(0).name = memento.ports[0].name;
         // this.classLabel.getOutputPort(0).name = memento.ports[1].name;

         return this;
     },

    onDrop:function(dropTarget, x, y, shiftKey, ctrlKey)
    {
        // Activate a "smart insert" If the user drop this figure on connection
        //
        if(dropTarget instanceof draw2d.Connection){
            var oldSource = dropTarget.getSource();
            var oldTarget = dropTarget.getTarget();
            var command0 = new draw2d.command.CommandDelete(dropTarget);
            //dropTarget.setSource(this.classLabel.getOutputPort(0));
            //var command1 = new draw2d.command.Command(eval("dropTarget.setSource(this.classLabel.getOutputPort(0))"));

            // var additionalConnection = createConnection();
            // this.getCanvas().add(additionalConnection);
            // additionalConnection.setSource(oldSource);
            // additionalConnection.setTarget(this.classLabel.getInputPort(0));
            //alert("test");
            //var additionalConnection = createConnection(oldSource,this.classLabel.getInputPort(0));
            //this.getCanvas().add(additionalConnection);
            var test1 = createConnection(oldSource,this.classLabel.getInputPort(0));
            var test2 = createConnection(this.classLabel.getOutputPort(0),oldTarget);
            var command1 = new draw2d.command.CommandAdd(this.getCanvas(),test1,x,y);
            var command2 = new draw2d.command.CommandAdd(this.getCanvas(),test2,x,y);
            var commandCol = new draw2d.command.CommandCollection();
            commandCol.add(command0);
            commandCol.add(command1);
            commandCol.add(command2);
            this.getCanvas().getCommandStack().execute(commandCol);

        }
    }

});
