var radius = 300
var d = radius/2
var arcs = [];
arcs[0] = [];
arcs[1] = [];

(function($)
{
    $.fn.colorPicker=function(parametres)
    {
        var cp = new colorPicker(this);
        jQuery('<div/>', {
                class: 'color',
                style: 'background-color:#000;width:30px;height:30px;border-radius:30px;cursor:pointer;'
        }).click(function(){
                cp.display();
                arcs[0].map(function(g,i){
                        g.transition().duration(600).attr("transform", "translate("+ d +","+ d +"),scale(1)").ease("elastic")
                });
        }).prependTo(this);
       return this;
    };
})(jQuery);



$( document ).ready(function() {
        $("#myColorPicker").colorPicker();
});

var data = [];

$.getJSON( "colors.json").done(function( jsonData ) {
    var data = jsonData
});








function colorPicker(me){
        var me = me;
        var root = this;
        var canvas;
        var nbColor;
        var angle_initial = 0;



        this.display = function(){
                var c = $("#myColorPicker").find($("input")).val()
                me.find($("svg")).remove();
                canvas = d3.select("#myColorPicker")
                        .append("svg")
                        .attr("width",radius).attr("height",radius)
                        .attr("style","position:absolute;margin-left:-"+(d-15)+"px;margin-top:-"+(d+15)+"px;");
                nbColor = data.length;
                for(var i=0;i<nbColor; i++) {
                        var angles_degre =  Math.round(360 / nbColor);
                        this.DrawArc(0,70,canvas,angle_initial,angles_degre,data[i].color,i,0.2);
                        angle_initial += angles_degre;
                }
                var circle = canvas.append("circle")
                        .attr("cx", d)
                        .attr("cy", d)
                        .attr("r", 15)
                        .attr("fill",c)

                circle.transition().duration(100).attr("r","41");
        }
        this.drawChild = function(n){
                var angle_initial = 0;
                var nbColor = data[n].colors.length;
                for(var i=0;i<nbColor; i++) {
                        var angles_degre =  Math.round(360 / nbColor);// conversion pourcentage -> angle en degré
                        this.DrawArc(1,70,canvas,angle_initial,angles_degre,data[n].colors[i].color,i,0.2);
                        angle_initial += angles_degre;
                } 
        }  
        this.click = function(e, i) {;
                var color = d3.select(this)
                var n = color.attr("i")
                d3.select("circle").attr("fill",color.attr("fill"))
                arcs[1].map(function(g,i){
                        g.remove()
                });
                root.drawChild(n)
                arcs[1].map(function(g,i){
                        g.transition().duration(600).attr("transform", "translate("+ d +","+ d +"),scale(1)").ease("elastic")
                });
                arcs[0].map(function(g,i){
                        g.transition().duration(600).attr("transform", "translate("+ d +","+ d +"),scale(1.5)").ease("elastic")
                });
        }

        this.click2 = function(e, i) {;
                var color = d3.select(this).attr("fill")
                $("#myColorPicker").find($("input")).val(color)
                $("#myColorPicker").find($(".color")).css("background-color",color)
                $("#myColorPicker").find($("svg")).delay(600).hide(0);
                var circle = d3.select("circle")
                circle.moveToFront()
                circle.transition().duration(100).attr("r","15");
                arcs[1].map(function(g,i){
                        g.transition().duration(600).attr("transform", "translate("+ d +","+ d +"),scale(0.1)").ease("elastic")
                });
                arcs[0].map(function(g,i){
                        g.transition().duration(600).attr("transform", "translate("+ d +","+ d +"),scale(0.1)").ease("elastic")
                });
        }
        this.hover2 = function(){
                var color = d3.select(this).attr("fill")
                d3.select("circle").transition().attr("fill",color)
        } 
        this.DrawArc = function(level,r,canvas,startAngle,angle,color,i,s){

                startAngle = startAngle / (180 / Math.PI)
                angle = angle / (180 / Math.PI)

                var p=Math.PI*2;
                var group= canvas.append("g")
                    .attr("transform", "translate("+ d +","+ d +"),scale("+s+")")
                
                    //.attr("transform", "")

                var arc = d3.svg.arc()
                    .innerRadius(r-30)
                    .outerRadius(r)
                    .startAngle(startAngle)
                    .endAngle(startAngle + angle);

                var p = group.append("path")
                    .attr("d",arc)
                    .attr("fill",color)
                    .attr("i",i)
                    .attr("style","cursor: pointer;")
                    if(level==0){
                        p.on("click", this.click) 
                    }else{
                        p.on("click", this.click2) 
                        
                    }
                    p.on("mouseover", this.hover2) 
                

                arcs[level].push(group);
        }
}




d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

