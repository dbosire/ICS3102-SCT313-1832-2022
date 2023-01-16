const { DataFactory } = require("@rdfjs/data-model");
const { namedNode } = DataFactory;

// Define the namespaces
const rdf = namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
const rdfs = namedNode("http://www.w3.org/2000/01/rdf-schema#");
const xsd = namedNode("http://www.w3.org/2001/XMLSchema#");
const owl = namedNode("http://www.w3.org/2002/07/owl#");
const cc = namedNode("http://climatechange.example.org/ontology#");

// Define the classes
const ClimateChange = cc.add("ClimateChange");
const ClimateChangeIndicator = cc.add("ClimateChangeIndicator");
const TemperatureIndicator = cc.add("TemperatureIndicator");
const CO2Indicator = cc.add("CO2Indicator");
const WaterIndicator = cc.add("WaterIndicator");
const WindIndicator = cc.add("WindIndicator");

// Define the properties
const hasIndicator = cc.add("hasIndicator");
const hasTemperature = cc.add("hasTemperature");
const hasCO2 = cc.add("hasCO2");
const hasWater = cc.add("hasWater");
const hasWind = cc.add("hasWind");

// Define the data types
const Float = xsd.add("float");

// Define the axioms
ClimateChange.addOut(rdf.type, owl.Class);
ClimateChangeIndicator.addOut(rdf.type, owl.Class);
TemperatureIndicator.addOut(rdf.type, owl.Class);
CO2Indicator.addOut(rdf.type, owl.Class);
WaterIndicator.addOut(rdf.type, owl.Class);
WindIndicator.addOut(rdf.type, owl.Class);

hasIndicator.addOut(rdf.type, owl.ObjectProperty);
hasTemperature.addOut(rdf.type, owl.DatatypeProperty);
hasTemperature.addOut(rdfs.range, Float);
hasCO2.addOut(rdf.type, owl.DatatypeProperty);
hasCO2.addOut(rdfs.range, Float);
hasWater.addOut(rdf.type, owl.DatatypeProperty);
hasWater.addOut(rdfs.range, Float);
hasWind.addOut(rdf.type, owl.DatatypeProperty);
hasWind.addOut(rdfs.range, Float);

// Define the relationships
ClimateChange.addOut(hasIndicator, ClimateChangeIndicator);
ClimateChangeIndicator.addOut(hasTemperature, TemperatureIndicator);
ClimateChangeIndicator.addOut(hasCO2, CO2Indicator);
ClimateChangeIndicator.addOut(hasWater, WaterIndicator);
ClimateChangeIndicator.addOut(hasWind, WindIndicator);

// Output the ontology in TTL (Turtle) format
console.log(ClimateChange.toString());
console.log(ClimateChangeIndicator.toString());
console.log(TemperatureIndicator.toString());
console.log(CO2Indicator.toString());
console.log(WaterIndicator.toString());
console.log(WindIndicator.toString());
console.log(hasIndicator.toString());
console.log(hasTemperature.toString());
console.log(hasCO2.toString());
console.log(hasWater.toString());
console.log(hasWind.toString());

// Output the ontology in TTL (Turtle) format in a .ttl file
const fs = require("fs");
const ttlData =
  ClimateChange.toString() +
  ClimateChangeIndicator.toString() +
  TemperatureIndicator.toString() +
  CO2Indicator.toString() +
  WaterIndicator.toString() +
  WindIndicator.toString() +
  hasIndicator.toString() +
  hasTemperature.toString() +
  hasCO2.toString() +
  hasWater.toString() +
  hasWind.toString();
fs.writeFile("climate-change.ttl", ttlData, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log(
    "Knowledge base ontology created successfully on climate change in .ttl file."
  );
});

// End of code
