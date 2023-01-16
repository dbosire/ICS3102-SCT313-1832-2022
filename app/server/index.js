import fetch from "@rdfjs/fetch";
const res = await fetch(
  "http://localhost:3000/knowledge-base/climate-change.ttl"
);
const dataset = await res.dataset();

for (const quad of dataset) {
  console.log(
    `${quad.subject.value} ${quad.predicate.value} ${quad.object.value}`
  );
}
