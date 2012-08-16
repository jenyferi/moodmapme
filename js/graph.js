var svg;
var data_array = new Array();
	
window.onload = function()
{
	svg = d3.select("body").append("svg").attr("width", "100%").attr("height", "100%");
}

$(function() {
	$( "#slider" ).slider({ max: 6, value: 3, animate: true });
	$( "#map-btn" ).bind( "click", function() {
		var slidervalue = $( "#slider" ).slider( "value");
		console.log(slidervalue);
					 
		data_array.push(slidervalue);
        
        $.post("/test", {hello: 'world'}, function(content) {
            alert("Data Loaded: " + content);
        });
		
        d3data();
	});
});

function d3data() {	
	var dataEnter = svg.selectAll("circle").data(data_array).enter();
		
	var barcolor = "ffcccc";
	var textcolor = "333333";
	
	//The height of the graph (without text).
	var graphHeight = 100;
	
	//The width of each bar.
	var barWidth = 80;
	
	//The distance between each bar.
	var barSeparation = 10;
	
	//The maximum value of the data.
	var maxData = 50;
	
	//The actual horizontal distance from drawing one bar rectangle to drawing the next.
	var horizontalBarDistance = barWidth + barSeparation;
	
	//The value to multiply each bar's value by to get its height.
	var barHeightMultiplier = graphHeight / 8;
	
	//The horizontal and vertical offsets of the text that displays each bar's value.
	var textXOffset = horizontalBarDistance / 2 - 12;
	var textYOffset = 20;
	
	//The actual Y position of every piece of text.
	var textYPosition = graphHeight + textYOffset;
	
	//Draw the bars.
	dataEnter.append("rect").attr("x", function(d, i)
	{
		return i * horizontalBarDistance;
		}).attr("y", function(d)
		{
		return graphHeight - d * barHeightMultiplier;
		}).attr("width", function(d)
		{
		return barWidth;
		}).attr("height", function(d)
		{
		return d * barHeightMultiplier;
		}).style("fill", function(d)
		{
		return barcolor;
	});
	
	//Draw the text.
	dataEnter.append("text").text(function(d)
	{
		return d;
		}).attr("x", function(d, i)
		{
		return i * horizontalBarDistance + textXOffset;
	}).attr("y", textYPosition).style("fill", textcolor);
}