var createConnection=function(sourcePort, targetPort){

    var conn= new draw2d.Connection({
        router:new draw2d.layout.connection.SplineConnectionRouter(),
        outlineStroke:1,
        outlineColor:"#303030",
        stroke:2,
        color:"#00a8f0",
        radius:20,
        source:sourcePort,
        target:targetPort
    });

    //since version 3.5.6

    conn.on("dragEnter", function(emitter, event){
        conn.attr({outlineColor:"#30ff30"});
    });
    conn.on("dragLeave", function(emitter, event){
        conn.attr({outlineColor:"#303030"});
    });

    return conn;

};

function displayJSON(canvas){
    var writer = new draw2d.io.json.Writer();
    writer.marshal(canvas,function(json){
        $("#json").text(JSON.stringify(json, null, 2));
    });
}

/**
 * @method
 * Factory method to provide a default connection for all drag&drop connections. You
 * can override this method and customize this for your personal purpose.
 *
 * @param {draw2d.Port} sourcePort port of the source of the connection
 * @param {draw2d.Port} targetPort port of the target of the connection
 * @template
 * @returns {draw2d.Connection}
 */

$(window).load(function () {

    var routerToUse =new draw2d.layout.connection.SplineConnectionRouter();
    var app  = new example.Application();
    /*app.view.installEditPolicy(  new draw2d.policy.connection.DragConnectionCreatePolicy({
        createConnection: function(){
            var connection = new draw2d.Connection({
                stroke:3,
                outlineStroke:1,
                outlineColor:"#303030",
                color:"91B93E",
                router:routerToUse
            });
            return connection;
        }
    }));*/
    // Install a special policy into the canvas to use my own implementation of connection
    // if we drag&drop a port
    //
    app.view.installEditPolicy(  new draw2d.policy.connection.DragConnectionCreatePolicy({
    createConnection: createConnection
    }));

    // This is the key!! The interceptor allows that a figure is droppable to a
    // connection
    //
    app.view.installEditPolicy(new MyInterceptorPolicy());
    app.view.installEditPolicy(new CopyInterceptorPolicy());


    // unmarshal the JSON document into the canvas
    // (load)
    var reader = new draw2d.io.json.Reader();
    reader.unmarshal(app.view, jsonDocument);
    var test = app.view.getFigures().asArray();
    test[0].setResizeable(false);
    test[0].setDeleteable(false);
    test[1].setResizeable(false);
    test[1].setDeleteable(false);
    var test = app.view.getLines();
    test.each(function(i,value){
        value.on("dragEnter", function(emitter,event){
            value.setOutlineColor("#30ff30");
        });
        value.on("dragLeave", function(emitter,event){
            value.setOutlineColor("#303030");
        });
    })
    //alert(test.getSize());
    //test[0].setColor("#000000");
    // for(i = 0;i < test.length;i++)
    // {
    //     //alert(test[i].id);
    //     // var test6 = test[i];
    //     //alert(i);
    //     test[i].on("dragEnter", function(emitter,event){
    //         test[i].setOutlineColor("#30ff30");
    //     });
    //     test[i].on("dragLeave", function(emitter,event){
    //         test[i].setOutlineColor("#303030");
    //     });
    // }
    //alert(test[0].on());
    // app.view.getBestFigure(100,50).setResizeable(false);
    // app.view.getBestFigure(100,50).setDeleteable(false);
    // app.view.getBestFigure(900,50).setResizeable(false);
    // app.view.getBestFigure(900,50).setDeleteable(false);


    displayJSON(app.view);
    app.view.getCommandStack().addEventListener(function(e){
          if(e.isPostChangeEvent()){
              displayJSON(app.view);
              //alert(getPorts(app.view));
          }
    });

});

