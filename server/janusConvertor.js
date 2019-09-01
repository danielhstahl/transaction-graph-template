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

const {
    generateNodes,
    generateEdges
} = require('./mockGenerator')
const arrayUtils = require('array_utils')

//temporary!!
const numNodes = 12
const numEdges = 25
const nodes = generateNodes(numNodes)
const edges = generateEdges(numEdges, numNodes)
console.log(nodes)
const subtractDays = (date, days) => {
    var d = new Date(date);
    d.setDate(d.getDate() - days)
    return d
}
//super inefficient..but this is temporary
const findInteraction = (accountId, edges, uniqueAccounts, index, maxIndex) => {
    if (index === maxIndex) {
        return uniqueAccounts
    }
    const onlyAccountId = edges.filter(edge => edge.to === accountId || edge.from === accountId)
    const getUniqueTo = arrayUtils.getUniqueArray(onlyAccountId, "to").map(v => v.to)
    const getUniqueFrom = arrayUtils.getUniqueArray(onlyAccountId, "from").map(v => v.from)
    const uniqueAccountLocal = arrayUtils.getUniqueArray([...getUniqueTo, ...getUniqueFrom])
    console.log(uniqueAccountLocal)
    return arrayUtils.getUniqueArray(uniqueAccountLocal.reduce((aggr, accountId) => [
        ...aggr,
        ...findInteraction(accountId, edges, uniqueAccountLocal, index + 1, maxIndex)
    ], []))
}

//replace with real client at some point and real queries
const getNodesAndEdges = (client, accountId, interactionLevel, dollarAmount, days) => {
    const currentDate = Date.UTC(2019, 6, numEdges)
    const cutoffDate = subtractDays(currentDate, days)
    //console.log(cutoffDate)
    const filteredEdges = edges.filter(edge => edge.date > cutoffDate).filter(edge => edge.value > dollarAmount)
    const relevantAccounts = findInteraction(accountId, filteredEdges, [], 0, interactionLevel)
    const filteredNodes = arrayUtils.innerjoin(nodes, relevantAccounts, (left, right) => left.id === right)
    return Promise.resolve({
        nodes: filteredNodes,
        edges: filteredEdges
    })
}


module.exports = {
    createClient,
    getResults,
    getNodesAndEdges,
    //for testing
    findInteraction
}