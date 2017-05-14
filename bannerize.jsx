/////////////////////////////////////////////////////////////////
//  Bannerize - Written by Josh Makar
    var bannerizeVersion = "V1.0";
//---------------------------------------------------------------
/////////////////////////////////////////////////////////////////

#target Illustrator

var myDoc = app.activeDocument;  

/* Variables */

// Grommets
var grommetSize = 27; // .375 in.
var grommetMargin = 9; // .125 in.
// var grommetSpacing = 576; // 8 in.
var grommetSpacing = prompt("Average distance between grommets in inches.\nDefault: 10.\n\nType 'about' for information about Bannerize.", 10);
var grommetMarkColor = new RGBColor();
grommetMarkColor.red = 236;
grommetMarkColor.green = 0;
grommetMarkColor.blue = 140;

// Get artboard sizing
var artBoardSize = myDoc.artboards;
var width = artBoardSize[0].artboardRect[2];
var height = artBoardSize[0].artboardRect[3];

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
    alert("Bannerize " + bannerizeVersion + ". written by Josh Makar, 2017.\rTo report any issues, bugs, or to suggest improvements, send an email to joshmakar@gmail.com\nTo ensure Proof Details Generator is up-to-date, visit:\rhttp://github.com/joshmakar/bannerize");
} else if (grommetSpacing != null && grommetSpacing != 0) {
	grommetSpacing *= 72;
	if (grommetSpacing === parseInt(grommetSpacing, 10)) {
		// Create template layer
		var printMarksLayer = myDoc.layers.add();
		printMarksLayer.name = "Template";

		function createGrommets(){
			calcSpacing();
			var spacingX = grommetMargin;
			var spacingY = grommetMargin;
			for (i = 0; i < noOfGrommetX + 1; i++) { // Top & Bottom Grommets
				grommetMarkT = printMarksLayer.pathItems.ellipse( -(spacingY), spacingX, grommetSize, grommetSize );
				grommetMarkT.fillColor = grommetMarkColor;
				grommetMarkT.strokeColor = noColor;
				grommetMarkT.strokeWidth = "0";
				grommetMarkB = printMarksLayer.pathItems.ellipse( -(spacingY + areaY), spacingX, grommetSize, grommetSize );
				grommetMarkB.fillColor = grommetMarkColor;
				grommetMarkB.strokeColor = noColor;
				grommetMarkB.strokeWidth = "0";
				spacingX += spaceBetweenGrommetsX;
			}
			spacingX = grommetMargin;
			spacingY = grommetMargin + spaceBetweenGrommetsY;
			for (i = 0; i < noOfGrommetY - 1; i++) { // Left & Right Grommets
				grommetMarkL = printMarksLayer.pathItems.ellipse( -(spacingY), spacingX, grommetSize, grommetSize );
				grommetMarkL.fillColor = grommetMarkColor;
				grommetMarkL.strokeColor = noColor;
				grommetMarkL.strokeWidth = "0";
				grommetMarkR = printMarksLayer.pathItems.ellipse( -(spacingY), spacingX + areaX, grommetSize, grommetSize );
				grommetMarkR.fillColor = grommetMarkColor;
				grommetMarkR.strokeColor = noColor;
				grommetMarkR.strokeWidth = "0";
				spacingY += spaceBetweenGrommetsY;
			}
		}
		createGrommets();
	} else {
		alert("Please input a valid numeric entry for grommet spacing.\nMust be a value greater than 0.")
	}
} else if (grommetSpacing != null || grommetSpacing != ''){
	// Do nothing.
} else {
	alert("Please enter a valid entry.")
}
