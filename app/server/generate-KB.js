// Load the rdf library
const rdf = require("rdf-ext");
//const rdf = import("rdf-ext");

// Create the Graph
const graph = rdf.graph();

// Add the first statement
const subject = rdf.namedNode("http://example.org/climate");
const predicate = rdf.namedNode(
  "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
);
const object = rdf.namedNode("http://www.w3.org/2002/07/owl#Class");
const statement1 = rdf.statement(subject, predicate, object);
graph.add(statement1);

// Add more statements
const subject2 = rdf.namedNode("http://example.org/climate");
const predicate2 = rdf.namedNode("http://www.w3.org/2000/01/rdf-schema#label");
const object2 = rdf.literal("Climate Change");
const statement2 = rdf.statement(subject2, predicate2, object2);
graph.add(statement2);

// Add more statements
const subject3 = rdf.namedNode("http://example.org/global_warming");
const predicate3 = rdf.namedNode(
  "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
);
const object3 = rdf.namedNode("http://www.w3.org/2002/07/owl#Class");
const statement3 = rdf.statement(subject3, predicate3, object3);
graph.add(statement3);

// Add more statements
const subject4 = rdf.namedNode("http://example.org/global_warming");
const predicate4 = rdf.namedNode(
  "http://www.w3.org/2000/01/rdf-schema#subClassOf"
);
const object4 = rdf.namedNode("http://example.org/climate");
const statement4 = rdf.statement(subject4, predicate4, object4);
graph.add(statement4);

// Add more statements
const subject5 = rdf.namedNode("http://example.org/global_warming");
const predicate5 = rdf.namedNode("http://www.w3.org/2000/01/rdf-schema#label");
const object5 = rdf.literal("Global Warming");
const statement5 = rdf.statement(subject5, predicate5, object5);
graph.add(statement5);

// Serialize the graph
const turtle = rdf.serialize(graph, "turtle");

// Save the turtle in a file
const fs = require("fs");
fs.writeFileSync("knowledge-base/climate_change.ttl", turtle);
