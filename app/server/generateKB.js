const fs = require("fs");

const rdf = require("rdf-ext");
const owl = require("@rdfjs/owl");

// Create the prefixes
const prefixes = {
  rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
  rdfs: "http://www.w3.org/2000/01/rdf-schema#",
  owl: "http://www.w3.org/2002/07/owl#",
  cc: "http://example.com/climate-change#",
};

// Create the ontology
const ontology = rdf
  .dataset()
  .add(
    rdf.quad(
      rdf.namedNode(prefixes.cc + "ClimateChange"),
      rdf.namedNode(prefixes.rdf + "type"),
      rdf.namedNode(prefixes.owl + "Ontology")
    )
  )
  .add(
    rdf.quad(
      rdf.namedNode(prefixes.cc + "ClimateChange"),
      rdf.namedNode(prefixes.rdfs + "label"),
      rdf.literal("Climate Change Ontology")
    )
  );

// Add the classes
ontology
  .add(
    rdf.quad(
      rdf.namedNode(prefixes.cc + "ClimateChange"),
      rdf.namedNode(prefixes.owl + "imports"),
      rdf.namedNode(prefixes.owl + "Thing")
    )
  )
  .add(
    rdf.quad(
      rdf.namedNode(prefixes.cc + "GreenhouseGas"),
      rdf.namedNode(prefixes.rdf + "type"),
      rdf.namedNode(prefixes.owl + "Class")
    )
  )
  .add(
    rdf.quad(
      rdf.namedNode(prefixes.cc + "GreenhouseGas"),
      rdf.namedNode(prefixes.rdfs + "subClassOf"),
      rdf.namedNode(prefixes.owl + "Thing")
    )
  )
  .add(
    rdf.quad(
      rdf.namedNode(prefixes.cc + "Mitigation"),
      rdf.namedNode(prefixes.rdf + "type"),
      rdf.namedNode(prefixes.owl + "Class")
    )
  )
  .add(
    rdf.quad(
      rdf.namedNode(prefixes.cc + "Mitigation"),
      rdf.namedNode(prefixes.rdfs + "subClassOf"),
      rdf.namedNode(prefixes.owl + "Thing")
    )
  )
  .add(
    rdf.quad(
      rdf.namedNode(prefixes.cc + "Adaptation"),
      rdf.namedNode(prefixes.rdf + "type"),
      rdf.namedNode(prefixes.owl + "Class")
    )
  )
  .add(
    rdf.quad(
      rdf.namedNode(prefixes.cc + "Adaptation"),
      rdf.namedNode(prefixes.rdfs + "subClassOf"),
      rdf.namedNode(prefixes.owl + "Thing")
    )
  );

// Add the properties
ontology
  .add(
    rdf.quad(
      rdf.namedNode(prefixes.cc + "hasGHG"),
      rdf.namedNode(prefixes.rdf + "type"),
      rdf.namedNode(prefixes.owl + "ObjectProperty")
    )
  )
  .add(
    rdf.quad(
      rdf.namedNode(prefixes.cc + "hasGHG"),
      rdf.namedNode(prefixes.rdfs + "domain"),
      rdf.namedNode(prefixes.cc + "ClimateChange")
    )
  )
  .add(
    rdf.quad(
      rdf.namedNode(prefixes.cc + "hasGHG"),
      rdf.namedNode(prefixes.rdfs + "range"),
      rdf.namedNode(prefixes.cc + "GreenhouseGas")
    )
  )
  .add(
    rdf.quad(
      rdf.namedNode(prefixes.cc + "hasMitigation"),
      rdf.namedNode(prefixes.rdf + "type"),
      rdf.namedNode(prefixes.owl + "ObjectProperty")
    )
  )
  .add(
    rdf.quad(
      rdf.namedNode(prefixes.cc + "hasMitigation"),
      rdf.namedNode(prefixes.rdfs + "domain"),
      rdf.namedNode(prefixes.cc + "ClimateChange")
    )
  )
  .add(
    rdf.quad(
      rdf.namedNode(prefixes.cc + "hasMitigation"),
      rdf.namedNode(prefixes.rdfs + "range"),
      rdf.namedNode(prefixes.cc + "Mitigation")
    )
  )
  .add(
    rdf.quad(
      rdf.namedNode(prefixes.cc + "hasAdaptation"),
      rdf.namedNode(prefixes.rdf + "type"),
      rdf.namedNode(prefixes.owl + "ObjectProperty")
    )
  )
  .add(
    rdf.quad(
      rdf.namedNode(prefixes.cc + "hasAdaptation"),
      rdf.namedNode(prefixes.rdfs + "domain"),
      rdf.namedNode(prefixes.cc + "ClimateChange")
    )
  )
  .add(
    rdf.quad(
      rdf.namedNode(prefixes.cc + "hasAdaptation"),
      rdf.namedNode(prefixes.rdfs + "range"),
      rdf.namedNode(prefixes.cc + "Adaptation")
    )
  );

// Add the individuals
ontology
  .add(
    rdf.quad(
      rdf.namedNode(prefixes.cc + "CO2"),
      rdf.namedNode(prefixes.rdf + "type"),
      rdf.namedNode(prefixes.owl + "NamedIndividual")
    )
  )
  .add(
    rdf.quad(
      rdf.namedNode(prefixes.cc + "CO2"),
      rdf.namedNode(prefixes.rdf + "type"),
      rdf.namedNode(prefixes.cc + "GreenhouseGas")
    )
  )
  .add(
    rdf.quad(
      rdf.namedNode(prefixes.cc + "SolarEnergy"),
      rdf.namedNode(prefixes.rdf + "type"),
      rdf.namedNode(prefixes.owl + "NamedIndividual")
    )
  )
  .add(
    rdf.quad(
      rdf.namedNode(prefixes.cc + "SolarEnergy"),
      rdf.namedNode(prefixes.rdf + "type"),
      rdf.namedNode(prefixes.cc + "Mitigation")
    )
  )
  .add(
    rdf.quad(
      rdf.namedNode(prefixes.cc + "Geoengineering"),
      rdf.namedNode(prefixes.rdf + "type"),
      rdf.namedNode(prefixes.owl + "NamedIndividual")
    )
  )
  .add(
    rdf.quad(
      rdf.namedNode(prefixes.cc + "Geoengineering"),
      rdf.namedNode(prefixes.rdf + "type"),
      rdf.namedNode(prefixes.cc + "Adaptation")
    )
  );

// Add the axioms
ontology
  .add(
    owl.classAssertion(
      rdf.namedNode(prefixes.cc + "CO2"),
      rdf.namedNode(prefixes.cc + "GreenhouseGas")
    )
  )
  .add(
    owl.objectPropertyAssertion(
      rdf.namedNode(prefixes.cc + "hasGHG"),
      rdf.namedNode(prefixes.cc + "ClimateChange"),
      rdf.namedNode(prefixes.cc + "CO2")
    )
  )
  .add(
    owl.objectPropertyAssertion(
      rdf.namedNode(prefixes.cc + "hasMitigation"),
      rdf.namedNode(prefixes.cc + "ClimateChange"),
      rdf.namedNode(prefixes.cc + "SolarEnergy")
    )
  )
  .add(
    owl.objectPropertyAssertion(
      rdf.namedNode(prefixes.cc + "hasAdaptation"),
      rdf.namedNode(prefixes.cc + "ClimateChange"),
      rdf.namedNode(prefixes.cc + "Geoengineering")
    )
  );

// Serialize the ontology as Turtle
const turtle = rdf.serialize(ontology, "text/turtle");

// Write the ontology to a file
fs.writeFileSync("/knowledge-base/climate-change.ttl", turtle);

console.log("Ontology written to climate-change.ttl");

// Output the ontology
console.log(turtle);
