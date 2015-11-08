var App = function(divID, displayNum, orientation, margin){

    var svg = d3.select(divID).append("svg") //Init D3
        .attr('width', '100%')
            .attr('height', '100%');


    var width = $("svg").width();
    var height = $("svg").height();
    var controller = new Controller(50, height, width, orientation, margin);

    var update = function(data)
      {

        var circle = svg.selectAll("circle").data(data); //init circles


            circle.exit().remove(); //remove circles when no corresponding data point

            circle.enter().append("circle") //add circle when there is corresponding data point
                .attr("cy", function(d){return d.Y;})
                .attr("r", function(d){return 5;})
                .attr("cx", function(d){return d.X;})
                .attr("fill", function(d, i){return '#59B33C';});

           circle.transition() //transition circles
              .attr("cy", function(d){return d.Y;})
              .attr("cx", function(d){return d.X;});


      var line = svg.selectAll(".datapoint")
              .data(data);
          line.exit().remove();

          line.enter().append("line")
              .attr('class', function(){return 'datapoint';})
              .attr("x1", function(d,i)
                {
                  if(i < 1){return 0;}
                  else{return data[i-1].X;}
                })
              .attr("y1", function(d,i)
                {
                  if(i < 1){return 0;}
                  else{return data[i-1].Y;}
                })
              .attr("x2", function(d,i)
                {
                  if(i < 1){return 0;}
                  else{return d.X;}
                })
              .attr("y2", function(d,i)
                {
                  if(i < 1){return 0;}
                  else{return d.Y;}
                })
              .attr("stroke", function(d,i)
                {
                  return '#59B33C';
                })
              .attr("stroke-width", function(d,i){return 2;});

      line.transition()
          .attr("x1", function(d,i)
            {
              if(i < 1){return 0;}
              else{return data[i-1].X;}
            })
          .attr("y1", function(d,i)
            {
              if(i < 1){return 0;}
              else{return data[i-1].Y;}
            })
          .attr("x2", function(d,i)
            {
              if(i < 1){return 0;}
              else{return d.X;}
            })
          .attr("y2", function(d,i)
            {
              if(i < 1){return 0;}
              else{return d.Y;}
            })
          .attr("stroke", function(d,i){return '#59B33C';})
          .attr("stroke-width", function(d,i){return 2;});
}

 this.start = function(data){
    setInterval(function() //update viewport size and things
    {
    //  drawReferenceLines($("svg").height(), $("svg").width()); - SLOW. so slow. why?

    //console.log(ipc.sendSync('synchronous-message', 'data?'));
     controller.addData(data());
     update(controller.updateDataset());
     update(controller.Draw($("svg").height(), $("svg").width()));
    }, 300);
  }
}

/*D3 Permanent Canvas Items  - To draw reference lines - call in setInterval


      var drawReferenceLines = function(height, width){
        var midWidth = width / 2 ;
        var midHeight = height / 2;
        var data = controller.getData();
        var midY = Math.round((Math.abs(data.max) - Math.abs(data.min)) / 2);

        var top = svg.selectAll('.referenceLineTop').data([height]);
        top.enter().append("line")
         .attr('class', function(){return 'referenceLineTop';})
          .attr("x1", function(){return midWidth;})
          .attr("y1", function(){return 0;})
          .attr("x2", function(){return midWidth;})
          .attr("y2", function(){return 30;})
          .attr("stroke", function(){return '#010101';})
          .attr("stroke-width", function(d,i){return 2;});
       top.transition()
         .attr("x1", function(){return midWidth;})
         .attr("y1", function(){return 0;})
         .attr("x2", function(){return midWidth;})
         .attr("y2", function(){return 30;});

       var side = svg.selectAll('.referenceLineSide').data([width]);

         side.enter().append("line")
         .attr('class', function(){return 'referenceLineSide';})
         .attr("x1", function(){return 0})
         .attr("y1", function(){return midHeight;})
         .attr("x2", function(){return 50;})
         .attr("y2", function(){return midHeight;})
         .attr("stroke", function(){return '#010101';})
         .attr("stroke-width", function(d,i){return 1;});

         side.transition()
           .attr("x1", function(){return 0;})
           .attr("y1", function(){return midHeight;})
           .attr("x2", function(){return 50;})
           .attr("y2", function(){return midHeight;});

         var sideText = svg.selectAll('.sideText').data([midY]);
         sideText.enter().append("text")
          .attr('class', function(){return 'sideText';})
          .attr('x', function(){return 15;})
          .attr('y', function(){return (midHeight - 10);})
          .attr('fill', function(){})
          .text(midY);
         sideText.transition()
           .attr('x', function(){return 15;})
           .attr('y', function(){return (midHeight - 10);})
           .text(midY);
      }

*/
