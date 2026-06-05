var wms_layers = [];

var format_Water_0 = new ol.format.GeoJSON();
var features_Water_0 = format_Water_0.readFeatures(json_Water_0, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Water_0 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Water_0.addFeatures(features_Water_0);
var lyr_Water_0 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Water_0, 
                style: style_Water_0,
                popuplayertitle: 'Water',
                interactive: true,
                title: '<img src="styles/legend/Water_0.png" /> Water'
            });
var format_NCR_1 = new ol.format.GeoJSON();
var features_NCR_1 = format_NCR_1.readFeatures(json_NCR_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_NCR_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_NCR_1.addFeatures(features_NCR_1);
var lyr_NCR_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_NCR_1, 
                style: style_NCR_1,
                popuplayertitle: 'NCR',
                interactive: true,
                title: '<img src="styles/legend/NCR_1.png" /> NCR'
            });
var format_PrimaryRoadsMM_2 = new ol.format.GeoJSON();
var features_PrimaryRoadsMM_2 = format_PrimaryRoadsMM_2.readFeatures(json_PrimaryRoadsMM_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_PrimaryRoadsMM_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_PrimaryRoadsMM_2.addFeatures(features_PrimaryRoadsMM_2);
var lyr_PrimaryRoadsMM_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_PrimaryRoadsMM_2, 
                style: style_PrimaryRoadsMM_2,
                popuplayertitle: 'PrimaryRoadsMM',
                interactive: true,
                title: '<img src="styles/legend/PrimaryRoadsMM_2.png" /> PrimaryRoadsMM'
            });
var format_CitiesMMcopycopy_3 = new ol.format.GeoJSON();
var features_CitiesMMcopycopy_3 = format_CitiesMMcopycopy_3.readFeatures(json_CitiesMMcopycopy_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_CitiesMMcopycopy_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_CitiesMMcopycopy_3.addFeatures(features_CitiesMMcopycopy_3);
var lyr_CitiesMMcopycopy_3 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_CitiesMMcopycopy_3, 
                style: style_CitiesMMcopycopy_3,
                popuplayertitle: 'CitiesMM copy copy',
                interactive: true,
                title: 'CitiesMM copy copy'
            });
var format_CitiesMM_4 = new ol.format.GeoJSON();
var features_CitiesMM_4 = format_CitiesMM_4.readFeatures(json_CitiesMM_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_CitiesMM_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_CitiesMM_4.addFeatures(features_CitiesMM_4);
var lyr_CitiesMM_4 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_CitiesMM_4, 
                style: style_CitiesMM_4,
                popuplayertitle: 'CitiesMM',
                interactive: true,
                title: '<img src="styles/legend/CitiesMM_4.png" /> CitiesMM'
            });
var group_101Main = new ol.layer.Group({
                                layers: [],
                                fold: 'close',
                                title: '101 Main'});
var group_102DSAWalk = new ol.layer.Group({
                                layers: [],
                                fold: 'open',
                                title: '102D SA-Walk'});
var group_102CBarangayDiff = new ol.layer.Group({
                                layers: [],
                                fold: 'close',
                                title: '102C BarangayDiff'});
var group_102A = new ol.layer.Group({
                                layers: [],
                                fold: 'close',
                                title: '102A'});
var group_102B = new ol.layer.Group({
                                layers: [],
                                fold: 'close',
                                title: '102B'});
var group_102ZDiffWalk = new ol.layer.Group({
                                layers: [],
                                fold: 'close',
                                title: '102Z-DiffWalk'});
var group_05CityInputs = new ol.layer.Group({
                                layers: [],
                                fold: 'close',
                                title: '05 City Inputs'});
var group_04DepEDInputs = new ol.layer.Group({
                                layers: [],
                                fold: 'close',
                                title: '04 DepED Inputs'});
var group_03TableInputs = new ol.layer.Group({
                                layers: [],
                                fold: 'close',
                                title: '03 Table Inputs'});
var group_00Base = new ol.layer.Group({
                                layers: [lyr_Water_0,lyr_NCR_1,lyr_PrimaryRoadsMM_2,lyr_CitiesMMcopycopy_3,lyr_CitiesMM_4,],
                                fold: 'close',
                                title: '00 Base'});

lyr_Water_0.setVisible(true);lyr_NCR_1.setVisible(true);lyr_PrimaryRoadsMM_2.setVisible(true);lyr_CitiesMMcopycopy_3.setVisible(true);lyr_CitiesMM_4.setVisible(true);
var layersList = [group_00Base];
lyr_Water_0.set('fieldAliases', {'fid': 'fid', 'full_id': 'full_id', 'osm_id': 'osm_id', 'osm_type': 'osm_type', 'natural': 'natural', 'artwork_type': 'artwork_type', 'artist_name': 'artist_name', 'artist:wikidata': 'artist:wikidata', 'addr:street': 'addr:street', 'addr:district': 'addr:district', 'access': 'access', 'hazard': 'hazard', 'location': 'location', 'source:device': 'source:device', 'addr:barangay': 'addr:barangay', 'ele:min': 'ele:min', 'ele:max': 'ele:max', 'smoking': 'smoking', 'reservoir_type': 'reservoir_type', 'ship': 'ship', 'motorboat': 'motorboat', 'canoe': 'canoe', 'building:min_level': 'building:min_level', 'level': 'level', 'wikimedia_commons': 'wikimedia_commons', 'memorial': 'memorial', 'historic': 'historic', 'heritage': 'heritage', 'leaf_type': 'leaf_type', 'leaf_cycle': 'leaf_cycle', 'operator:wikidata': 'operator:wikidata', 'operator:type': 'operator:type', 'man_made': 'man_made', 'content': 'content', 'building': 'building', 'addr:city': 'addr:city', 'tourism': 'tourism', 'addr:province': 'addr:province', 'addr:postcode': 'addr:postcode', 'addr:municipality': 'addr:municipality', 'sport': 'sport', 'leisure': 'leisure', 'postal_code': 'postal_code', 'place': 'place', 'name:id': 'name:id', 'barrier': 'barrier', 'operator': 'operator', 'lit': 'lit', 'fountain': 'fountain', 'drinking_water': 'drinking_water', 'amenity': 'amenity', 'description': 'description', 'boat': 'boat', 'survey:date': 'survey:date', 'protect_class': 'protect_class', 'basin': 'basin', 'previously': 'previously', 'salt': 'salt', 'boundary': 'boundary', 'wetland': 'wetland', 'intermittent': 'intermittent', 'tidal': 'tidal', 'old_name': 'old_name', 'layer': 'layer', 'landuse': 'landuse', 'aquaculture': 'aquaculture', 'golf': 'golf', 'wikipedia': 'wikipedia', 'wikidata': 'wikidata', 'water': 'water', 'type': 'type', 'name:tl': 'name:tl', 'name:fa': 'name:fa', 'name:es': 'name:es', 'name:en': 'name:en', 'name': 'name', 'ele': 'ele', 'alt_name': 'alt_name', });
lyr_NCR_1.set('fieldAliases', {'fid': 'fid', 'PHCode_Reg': 'PHCode_Reg', 'Reg_Name': 'Reg_Name', 'PHCode_Pro': 'PHCode_Pro', 'Pro_Name': 'Pro_Name', 'Label': 'Label', 'NCOV_Case': 'NCOV_Case', 'Layer': 'Layer', });
lyr_PrimaryRoadsMM_2.set('fieldAliases', {'fid': 'fid', 'full_id': 'full_id', 'highway': 'highway', 'name': 'name', });
lyr_CitiesMMcopycopy_3.set('fieldAliases', {'fid': 'fid', 'PHCode_Reg': 'PHCode_Reg', 'Reg_Name': 'Reg_Name', 'PHCode_Pro': 'PHCode_Pro', 'Pro_Name': 'Pro_Name', 'PHCode_Mun': 'PHCode_Mun', 'Mun_Name': 'Mun_Name', 'Province': 'Province', 'MuniCity': 'MuniCity', });
lyr_CitiesMM_4.set('fieldAliases', {'fid': 'fid', 'PHCode_Reg': 'PHCode_Reg', 'Reg_Name': 'Reg_Name', 'PHCode_Pro': 'PHCode_Pro', 'Pro_Name': 'Pro_Name', 'PHCode_Mun': 'PHCode_Mun', 'Mun_Name': 'Mun_Name', 'Province': 'Province', 'MuniCity': 'MuniCity', });
lyr_Water_0.set('fieldImages', {'fid': 'TextEdit', 'full_id': 'TextEdit', 'osm_id': 'TextEdit', 'osm_type': 'TextEdit', 'natural': 'TextEdit', 'artwork_type': 'TextEdit', 'artist_name': 'TextEdit', 'artist:wikidata': 'TextEdit', 'addr:street': 'TextEdit', 'addr:district': 'TextEdit', 'access': 'TextEdit', 'hazard': 'TextEdit', 'location': 'TextEdit', 'source:device': 'TextEdit', 'addr:barangay': 'TextEdit', 'ele:min': 'TextEdit', 'ele:max': 'TextEdit', 'smoking': 'TextEdit', 'reservoir_type': 'TextEdit', 'ship': 'TextEdit', 'motorboat': 'TextEdit', 'canoe': 'TextEdit', 'building:min_level': 'TextEdit', 'level': 'TextEdit', 'wikimedia_commons': 'TextEdit', 'memorial': 'TextEdit', 'historic': 'TextEdit', 'heritage': 'TextEdit', 'leaf_type': 'TextEdit', 'leaf_cycle': 'TextEdit', 'operator:wikidata': 'TextEdit', 'operator:type': 'TextEdit', 'man_made': 'TextEdit', 'content': 'TextEdit', 'building': 'TextEdit', 'addr:city': 'TextEdit', 'tourism': 'TextEdit', 'addr:province': 'TextEdit', 'addr:postcode': 'TextEdit', 'addr:municipality': 'TextEdit', 'sport': 'TextEdit', 'leisure': 'TextEdit', 'postal_code': 'TextEdit', 'place': 'TextEdit', 'name:id': 'TextEdit', 'barrier': 'TextEdit', 'operator': 'TextEdit', 'lit': 'TextEdit', 'fountain': 'TextEdit', 'drinking_water': 'TextEdit', 'amenity': 'TextEdit', 'description': 'TextEdit', 'boat': 'TextEdit', 'survey:date': 'TextEdit', 'protect_class': 'TextEdit', 'basin': 'TextEdit', 'previously': 'TextEdit', 'salt': 'TextEdit', 'boundary': 'TextEdit', 'wetland': 'TextEdit', 'intermittent': 'TextEdit', 'tidal': 'TextEdit', 'old_name': 'TextEdit', 'layer': 'TextEdit', 'landuse': 'TextEdit', 'aquaculture': 'TextEdit', 'golf': 'TextEdit', 'wikipedia': 'TextEdit', 'wikidata': 'TextEdit', 'water': 'TextEdit', 'type': 'TextEdit', 'name:tl': 'TextEdit', 'name:fa': 'TextEdit', 'name:es': 'TextEdit', 'name:en': 'TextEdit', 'name': 'TextEdit', 'ele': 'TextEdit', 'alt_name': 'TextEdit', });
lyr_NCR_1.set('fieldImages', {'fid': 'TextEdit', 'PHCode_Reg': 'TextEdit', 'Reg_Name': 'TextEdit', 'PHCode_Pro': 'TextEdit', 'Pro_Name': 'TextEdit', 'Label': 'TextEdit', 'NCOV_Case': 'Range', 'Layer': 'Range', });
lyr_PrimaryRoadsMM_2.set('fieldImages', {'fid': '', 'full_id': '', 'highway': '', 'name': '', });
lyr_CitiesMMcopycopy_3.set('fieldImages', {'fid': 'TextEdit', 'PHCode_Reg': 'TextEdit', 'Reg_Name': 'TextEdit', 'PHCode_Pro': 'TextEdit', 'Pro_Name': 'TextEdit', 'PHCode_Mun': 'TextEdit', 'Mun_Name': 'TextEdit', 'Province': 'TextEdit', 'MuniCity': 'TextEdit', });
lyr_CitiesMM_4.set('fieldImages', {'fid': 'TextEdit', 'PHCode_Reg': 'TextEdit', 'Reg_Name': 'TextEdit', 'PHCode_Pro': 'TextEdit', 'Pro_Name': 'TextEdit', 'PHCode_Mun': 'TextEdit', 'Mun_Name': 'TextEdit', 'Province': 'TextEdit', 'MuniCity': 'TextEdit', });
lyr_Water_0.set('fieldLabels', {'fid': 'no label', 'full_id': 'no label', 'osm_id': 'no label', 'osm_type': 'no label', 'natural': 'no label', 'artwork_type': 'no label', 'artist_name': 'no label', 'artist:wikidata': 'no label', 'addr:street': 'no label', 'addr:district': 'no label', 'access': 'no label', 'hazard': 'no label', 'location': 'no label', 'source:device': 'no label', 'addr:barangay': 'no label', 'ele:min': 'no label', 'ele:max': 'no label', 'smoking': 'no label', 'reservoir_type': 'no label', 'ship': 'no label', 'motorboat': 'no label', 'canoe': 'no label', 'building:min_level': 'no label', 'level': 'no label', 'wikimedia_commons': 'no label', 'memorial': 'no label', 'historic': 'no label', 'heritage': 'no label', 'leaf_type': 'no label', 'leaf_cycle': 'no label', 'operator:wikidata': 'no label', 'operator:type': 'no label', 'man_made': 'no label', 'content': 'no label', 'building': 'no label', 'addr:city': 'no label', 'tourism': 'no label', 'addr:province': 'no label', 'addr:postcode': 'no label', 'addr:municipality': 'no label', 'sport': 'no label', 'leisure': 'no label', 'postal_code': 'no label', 'place': 'no label', 'name:id': 'no label', 'barrier': 'no label', 'operator': 'no label', 'lit': 'no label', 'fountain': 'no label', 'drinking_water': 'no label', 'amenity': 'no label', 'description': 'no label', 'boat': 'no label', 'survey:date': 'no label', 'protect_class': 'no label', 'basin': 'no label', 'previously': 'no label', 'salt': 'no label', 'boundary': 'no label', 'wetland': 'no label', 'intermittent': 'no label', 'tidal': 'no label', 'old_name': 'no label', 'layer': 'no label', 'landuse': 'no label', 'aquaculture': 'no label', 'golf': 'no label', 'wikipedia': 'no label', 'wikidata': 'no label', 'water': 'no label', 'type': 'no label', 'name:tl': 'no label', 'name:fa': 'no label', 'name:es': 'no label', 'name:en': 'no label', 'name': 'no label', 'ele': 'no label', 'alt_name': 'no label', });
lyr_NCR_1.set('fieldLabels', {'fid': 'no label', 'PHCode_Reg': 'no label', 'Reg_Name': 'no label', 'PHCode_Pro': 'no label', 'Pro_Name': 'no label', 'Label': 'no label', 'NCOV_Case': 'no label', 'Layer': 'no label', });
lyr_PrimaryRoadsMM_2.set('fieldLabels', {'fid': 'no label', 'full_id': 'no label', 'highway': 'no label', 'name': 'no label', });
lyr_CitiesMMcopycopy_3.set('fieldLabels', {'fid': 'no label', 'PHCode_Reg': 'no label', 'Reg_Name': 'no label', 'PHCode_Pro': 'no label', 'Pro_Name': 'no label', 'PHCode_Mun': 'no label', 'Mun_Name': 'no label', 'Province': 'no label', 'MuniCity': 'no label', });
lyr_CitiesMM_4.set('fieldLabels', {'fid': 'no label', 'PHCode_Reg': 'no label', 'Reg_Name': 'no label', 'PHCode_Pro': 'no label', 'Pro_Name': 'no label', 'PHCode_Mun': 'no label', 'Mun_Name': 'no label', 'Province': 'no label', 'MuniCity': 'no label', });
lyr_CitiesMM_4.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});