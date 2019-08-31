const gremlin = require('gremlin');
const client = new gremlin.driver.Client('ws://localhost:8182/gremlin', { traversalSource: 'g' });

client.submit('g.V().hasLabel(label).tail(n)', { label: 'person', n: 3 }).then(r => {
    // ResultSet is an iterable
    for (const vertex of r) {
        console.log(vertex.id);
    }
}).catch(e => console.log(e))

