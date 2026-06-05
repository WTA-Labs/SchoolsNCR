var size = 0;
var placement = 'point';

var style_Baramgays_inSAWalk_1 = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    
    var labelText = ""; 
    var value = feature.get("PopDenES ");
    var labelFont = "10px, sans-serif";
    var labelFill = "#000000";
    var bufferColor = "";
    var bufferWidth = 0;
    var textAlign = "left";
    var offsetX = 0;
    var offsetY = 0;
    var placement = 'point';
    if ("" !== null) {
        labelText = String("");
    }
    if (value >= 0.000000 && value <= 1.872000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(222,207,163,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 1.872000 && value <= 3.150000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(176,156,100,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 3.150000 && value <= 5.060000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(130,106,37,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 5.060000 && value <= 8.546000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(101,80,19,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 8.546000 && value <= 71.690000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(76,60,14,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    };

    return style;
};
