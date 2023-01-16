const ParsingClient = require("sparql-http-client/ParsingClient");
const SparqlClient = require("sparql-http-client");
const rdf = require("rdf-ext");
const owl = require("@rdfjs/owl");
const fs = require("fs");
const express = require("express");
const app = express();
const port = 3000;

//import rdf from 'rdf-ext'

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/all", (req, res) => {
  const response = all();
  res.status(200).send(response);
});

app.get("/query/:keyword", (req, res) => {
  const keyword = req.params.keyword;
  const response = keywordSearch(keyword);
  res.status(200).send(response);
});

app.get("/generate-kb", (req, res) => {
  const response = generate_KB();
  res.status(200).send(response);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

async function parse() {
  const endpointUrl = "http://localhost:3000/kowledge-base/climate-change.ttl";
  const query = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    SELECT ?subject ?object
        WHERE { ?subject rdfs:subClassOf ?object }
    LIMIT 100`;

  const client = new ParsingClient({ endpointUrl });
  const bindings = await client.query.select(query);
  bindings.forEach((row) =>
    Object.entries(row).forEach(([key, value]) => {
      console.log(`${key}: ${value.value} (${value.termType})`);
    })
  );
}

async function all() {
  const client = new SparqlClient({ endpointUrl: "http://localhost:3000/kb" });
  const stream = await client.query.select(`
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    SELECT * WHERE {
    ?sub ?pred ?obj .
    } LIMIT 10
    `);
  stream.on("data", (row) => {
    return row;
  });
}

async function keywordSearch(keyword) {
  const client = new SparqlClient({ endpointUrl: "http://localhost:3000/kb" });
  const stream = await client.query.select(`
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    SELECT * WHERE {
    ?sub ?pred ?obj .
    VALUES ( ?sub ) {( <http://www.semanticweb.org/hp/ontologies/2023/0/planets-geography-ontology#${keyword}> )}
    } LIMIT 10
    `);
  let resp = null;
  stream.on("data", (row) => {
    resp = row;
  });
  console.log(resp);
  return resp;
}

async function generate_KB() {
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

  return "Ontology written to climate-change.ttl";
}
