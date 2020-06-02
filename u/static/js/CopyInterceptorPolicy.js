function getMethods(obj) {
  var result = [];
  for (var id in obj) {
    try {
      if (typeof(obj[id]) == "function") {
        result.push(id + ": " + obj[id].toString());
      }
    } catch (err) {
      result.push(id + ": inaccessible");
    }
  }
  return result;
}
var CopyInterceptorPolicy = draw2d.policy.canvas.BoundingboxSelectionPolicy.extend({
	NAME: "CopyInterceptorPolicy",

    init : function()
    {
        this._super();

        this.cloneOnDrag = false;
    },

    /**
     * @method
     *
     * @param {draw2d.Canvas} canvas
     * @param {Number} x the x-coordinate of the mouse down event
     * @param {Number} y the y-coordinate of the mouse down event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     */
    onMouseDown:function(canvas, x, y, shiftKey, ctrlKey)
    {
    	this.cloneOnDrag = ctrlKey;
    	// this.cloneOnDrag = false;
        this._super(canvas, x,y,shiftKey, ctrlKey);
    },

    /**
     * Copy the selected figure if the user start dragging the selection.
     *
     */
    onMouseDrag:function(canvas, dx, dy, dx2, dy2, shiftKey, ctrlKey)
    {
        if((canvas.getSelection().getAll().getSize() == 1) && ((this.mouseDraggingElement instanceof Wav) || (this.mouseDraggingElement instanceof Branch))){
            if(this.cloneOnDrag ===true && this.mouseDraggingElement !==null){
                // get the current position of the selected shape
                var old = this.mouseDraggingElement;
                var pos = this.mouseDraggingElement.getPosition();

                // cancel the current drag&drop operation
                //this.mouseDraggingElement.onDragEnd(pos.x, pos.y, false,false);
                this.unselect(canvas,this.mouseDraggingElement);

                // clone the selection
                if (old instanceof Wav)
                {
                    this.mouseDraggingElement  = new Wav();
                    this.mouseDraggingElement.classLabel.text = old.classLabel.text;
                }
                else if (old instanceof Branch)
                {
                    this.mouseDraggingElement  = new Branch();
                    this.mouseDraggingElement.classLabel.text = old.classLabel.text;
                    //alert(old.children.getSize());
                    //alert(old.getEntity(0).text);
                    var test = old.children.asArray();
                    for (i = 0; i < test.length-1; i++)
                    {
                    //     //alert(getMethods(test[i]).join("\n"));
                    //     //var test2 = test[i].children[i].text;
                    //     //alert(JSON.stringify(test[i]));
                        this.mouseDraggingElement.addEntity(old.getEntity(i).text);
                    }
                    //this.mouseDraggingElement.addEntity("test");
                }
                // add the clone to the canvas and start dragging of the clone
                //canvas.add(this.mouseDraggingElement, pos);
                var command = new draw2d.command.CommandAdd(canvas,this.mouseDraggingElement,pos.x+20,pos.y+20);
                canvas.getCommandStack().execute(command);

                // select the cloned shape
                this.select(canvas,this.mouseDraggingElement);

                // start dragging if the clone accept this operation
                this.mouseDraggingElement.onDragStart(pos.x, pos.y, false,false);
            }
        }

        this.cloneOnDrag=false;

        this._super(canvas, dx,dy,dx2,dy2, shiftKey, ctrlKey);
    }
  //   onMouseDrag:function(canvas, dx, dy, dx2, dy2, shiftKey, ctrlKey)
  //   {
  //   	// if(((this.mouseDraggingElement instanceof Wav) || (this.mouseDraggingElement instanceof Branch))){
	 //    	// if(this.cloneOnDrag ===true && this.mouseDraggingElement !==null){
  //           if(this.cloneOnDrag ===true){
	 //    		// get the current position of the selected shape
  //               var old = canvas.getSelection().getAll().asArray();
  //               canvas.getSelection().getAll().clear();
  //               //alert(old.getSize());
  //               //old.clear();
  //               // old.each(function(i,value){
  //               //     //alert(getMethods(value).join("\n"));
  //               //     //this.unselect(canvas,old.first());
  //               //     //this.unselect(canvas,old.get(i));
  //               // });
  //               //old.each(this.unselect(canvas,old.first()));
  //               //alert(getMethods(old.first()).join("\n"));
  //               for(i = 0;i < old.length;i++)
  //               {
  //                   this.unselect(canvas,old[i]);
  //                   this.mouseDraggingElement = new Wav();
  //                   this.mouseDraggingElement.classLabel.text = old[i].classLabel.text;
  //                   var pos = this.mouseDraggingElement.getPosition();
  //                   canvas.add(this.mouseDraggingElement,pos);
  //                   canvas.addSelection(this.mouseDraggingElement);
  //                   //this.select(canvas,test);
  //                   this.mouseDraggingElement.onDragStart(pos.x,pos.y,false,false);
  //               }
  //               //this.unselect(canvas,old.last());

  //      //          var old = this.mouseDraggingElement;
	 //    		// var pos = this.mouseDraggingElement.getPosition();

	 //    		// // cancel the current drag&drop operation
  //      //           // alert(getMethods(this).join("\n"));
  //      //          //alert(pos.x);
	 //    		// //this.mouseDraggingElement.onDragEnd(pos.x, pos.y, false,false);
  //      //          this.unselect(canvas,this.mouseDraggingElement);
  //      //          //alert(canvas.getSelection().getSize());

	 //    		// // clone the selection
	 //    		// this.mouseDraggingElement  = new Wav();
  //      //          this.mouseDraggingElement.classLabel.text = old.classLabel.text;
	 //    		// // add the clone to the canvas and start dragging of the clone
	 //    		// canvas.add(this.mouseDraggingElement,pos);
  //      //          canvas.addSelection(this.mouseDraggingElement);

	 //    		// // select the cloned shape
	 //    		// //this.select(canvas,this.mouseDraggingElement);

	 //    		// // start dragging if the clone accept this operation
	 //    		// this.mouseDraggingElement.onDragStart(pos.x, pos.y, false,false);
	 //    	}
  //   	// }

		// this.cloneOnDrag=false;

  //   	this._super(canvas, dx,dy,dx2,dy2, shiftKey, ctrlKey);
  //   }
});
