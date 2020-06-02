
var BetweenFigure = draw2d.shape.node.Between.extend({

    init : function(attr)
    {
        this._super(attr);
        this.setBackgroundColor("#fdc11d");

        this.add(new draw2d.shape.basic.Label({text: "label"}), new draw2d.layout.locator.CenterLocator(this));
    },

    addEntity: function(txt, optionalIndex)
    {
//          var label =new draw2d.shape.basic.Label({
//              text:txt,
//              stroke:0,
//              radius:0,
//              bgColor:null,
//              padding:{left:10, top:3, right:10, bottom:5},
//              fontColor:"#4a4a4a",
//              resizeable:true,
//              editor:new draw2d.ui.LabelEditor()
//          });

// //        label.installEditor(new draw2d.ui.LabelEditor());
//          //var input = label.createPort("input");
//          //var output= label.createPort("output");

//          //input.setName("input_"+label.id);
//          //output.setName("output_"+label.id);

//          var _table=this;
//          label.on("contextmenu", function(emitter, event){
//              $.contextMenu({
//                  selector: 'body',
//                  events:
//                  {
//                      hide:function(){ $.contextMenu( 'destroy' ); }
//                  },
//                  callback: $.proxy(function(key, options)
//                  {
//                     switch(key){
//                     case "rename":
//                         setTimeout(function(){
//                             emitter.onDoubleClick();
//                         },10);
//                         break;
//                     case "new":
//                         setTimeout(function(){
//                             _table.addEntity("_new_").onDoubleClick();
//                         },10);
//                         break;
//                     case "delete":
//                         // with undo/redo support
//                         var cmd = new draw2d.command.CommandDelete(emitter);
//                         emitter.getCanvas().getCommandStack().execute(cmd);
//                     default:
//                         break;
//                     }

//                  },this),
//                  x:event.x,
//                  y:event.y,
//                  items:
//                  {
//                      "rename": {name: "Rename"},
//                      "new":    {name: "New Entity"},
//                      "sep1":   "---------",
//                      "delete": {name: "Delete"}
//                  }
//              });
//          });

//          if($.isNumeric(optionalIndex)){
//              this.add(label, null, optionalIndex+1);
//          }
//          else{
//              this.add(label);
//          }

//          return label;
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
         this.setText(name);

         return this;
     },


     /**
     * @method
     * Called if the user drop this element onto the dropTarget.
     *
     * In this Example we create a "smart insert" of an existing connection.
     * COOL and fast network editing.
     *
     * @param {draw2d.Figure} dropTarget The drop target.
     * @param {Number} x the x coordinate of the drop
     * @param {Number} y the y coordinate of the drop
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @private
     **/
    onDrop:function(dropTarget, x, y, shiftKey, ctrlKey)
    {
    	// Activate a "smart insert" If the user drop this figure on connection
    	//
    	if(dropTarget instanceof draw2d.Connection){
    		var oldSource = dropTarget.getSource();
    		dropTarget.setSource(this.getOutputPort(0));

    		var additionalConnection = createConnection();
    		this.getCanvas().add(additionalConnection);
    		additionalConnection.setSource(oldSource);
    		additionalConnection.setTarget(this.getInputPort(0));
    	}
    }

});
