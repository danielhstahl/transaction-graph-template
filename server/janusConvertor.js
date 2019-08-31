const gremlin = require('gremlin')
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection
const traversal = gremlin.process.AnonymousTraversalSource.traversal
const createClient = (url) => {
    return traversal().withRemote(new DriverRemoteConnection(url))
}
const getResults = client => {
    //just a test for now
    return client.V()./*hasLabel('god').*/values('name').toList()
}

module.exports = {
    createClient,
    getResults
}