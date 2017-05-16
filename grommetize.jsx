/////////////////////////////////////////////////////////////////
//  Grommetize - Written by Josh Makar
    var grommetizeVersion = "V1.0";
//---------------------------------------------------------------
/////////////////////////////////////////////////////////////////

#target Illustrator

var myDoc = app.activeDocument;

/* Variables */

// Grommets
var grommetSize = 27; // .375 in.
var grommetMargin = 9; // .125 in.
// var grommetSpacing = 576; // 8 in.
var grommetSpacing = prompt("Average distance between grommets in inches.\nDefault: 20.\n\nType 'about' for information about Grommetize.", 20);
var grommetMarkFillColor = new RGBColor();
grommetMarkFillColor.red = 236;
grommetMarkFillColor.green = 0;
grommetMarkFillColor.blue = 140;
var grommetMarkStrokeColor = new RGBColor();
grommetMarkStrokeColor.red = 255;
grommetMarkStrokeColor.green = 255;
grommetMarkStrokeColor.blue = 255;

// Get artboard sizing
// var artBoardSize = myDoc.artboards;
// var width = artBoardSize[0].artboardRect[2];
// var height = artBoardSize[0].artboardRect[3];

// Get document sizing
var width = myDoc.width;
var height = myDoc.height;

// Styling
var noColor = new NoColor();

/* Functions */

function calcSpacing(){
	areaX = (Math.abs(width) - grommetSize) - (grommetMargin * 2);
	areaY = (Math.abs(height) - grommetSize) - (grommetMargin * 2);
	noOfGrommetX = Math.round(areaX / grommetSpacing);
	noOfGrommetY = Math.round(areaY / grommetSpacing);
	spaceBetweenGrommetsX = areaX / noOfGrommetX;
	spaceBetweenGrommetsY = areaY / noOfGrommetY;
}

if (grommetSpacing === "about"){
    alert("Grommetize " + grommetizeVersion + ". written by Josh Makar, 2017.\rTo report any issues, bugs, or to suggest improvements, send an email to joshmakar@gmail.com\nTo ensure Grommetize is up-to-date, visit:\rhttp://github.com/joshmakar/grommetize");
} else if (grommetSpacing != null && grommetSpacing != 0) {
	grommetSpacing *= 72;
	if (grommetSpacing === parseInt(grommetSpacing, 10)) {
		
		// Create template layer
		var printMarksLayer = myDoc.layers.add();
		printMarksLayer.name = "Grommets";

		function createGrommets(){
			calcSpacing();
			var spacingX = grommetMargin;
			var spacingY = grommetMargin;
			for (i = 0; i < noOfGrommetX + 1; i++) { // Top & Bottom Grommets
				grommetMarkT = printMarksLayer.pathItems.ellipse( -(spacingY), spacingX, grommetSize, grommetSize );
				grommetMarkT.fillColor = grommetMarkFillColor;
				grommetMarkT.strokeColor = grommetMarkStrokeColor;
				grommetMarkT.strokeWidth = "1";
				grommetMarkB = printMarksLayer.pathItems.ellipse( -(spacingY + areaY), spacingX, grommetSize, grommetSize );
				grommetMarkB.fillColor = grommetMarkFillColor;
				grommetMarkB.strokeColor = grommetMarkStrokeColor;
				grommetMarkB.strokeWidth = "1";
				spacingX += spaceBetweenGrommetsX;
			}
			spacingX = grommetMargin;
			spacingY = grommetMargin + spaceBetweenGrommetsY;
			for (i = 0; i < noOfGrommetY - 1; i++) { // Left & Right Grommets
				grommetMarkL = printMarksLayer.pathItems.ellipse( -(spacingY), spacingX, grommetSize, grommetSize );
				grommetMarkL.fillColor = grommetMarkFillColor;
				grommetMarkL.strokeColor = grommetMarkFillColor;
				grommetMarkL.strokeWidth = "1";
				grommetMarkR = printMarksLayer.pathItems.ellipse( -(spacingY), spacingX + areaX, grommetSize, grommetSize );
				grommetMarkR.fillColor = grommetMarkFillColor;
				grommetMarkR.strokeColor = grommetMarkStrokeColor;
				grommetMarkR.strokeWidth = "1";
				spacingY += spaceBetweenGrommetsY;
			}
		}
		
		createGrommets();

		// Lock Template Layer
		printMarksLayer.locked = true;

	} else {
		alert("Please input a valid numeric entry for grommet spacing.\nMust be a value greater than 0.")
	}
} else if (grommetSpacing != null || grommetSpacing != ''){
	// Do nothing.
} else {
	alert("Please enter a valid entry.")
}
