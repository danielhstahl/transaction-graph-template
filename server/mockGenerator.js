//mock generates nodes and edges

const possibleGroups = [
    'FI',
    'Business',
    'People'
]
const generateInteger = (randomNumber, largestNumber) => Math.floor(randomNumber * largestNumber)
const generateFromArray = (randomNumber, array) => array[generateInteger(randomNumber, array.length)]
const generateBoolean = (threshold, randomNumber) => randomNumber < threshold
const generateFloat = (randomNumber, largestFloat) => randomNumber * largestFloat
const selectedAccount = {
    id: 'account_number_0',
    label: 'name_0',
    group: possibleGroups[0],
    alert: false,
    is_customer: true,
    is_main: true
}

const generateNode = (r1, r2, r3, index) => {
    const isCustomer = generateBoolean(0.6, r1)
    const isAlert = isCustomer && generateBoolean(0.3, r2)
    const group = generateFromArray(r3, possibleGroups)
    return {
        id: `account_number_${index}`,
        label: `name_${index}`,
        group,
        is_customer: isCustomer,
        alert: isAlert
    }
}

const generateNodes = numNodes => {
    let nodes = [selectedAccount]
    for (let i = 1; i < numNodes; ++i) {
        nodes.push(generateNode(Math.random(), Math.random(), Math.random(), i))
    }
    return nodes
}

const generateEdge = (r1, r2, r3, numNodes, index) => {
    const from = `account_number_${generateInteger(r1, numNodes)}`
    const to = `account_number_${generateInteger(r2, numNodes)}`
    const value = generateFloat(r3, 50000)
    return {
        from, to, value, date: Date.UTC(2019, 6, index), id: `transaction_${index}`
    }
}

const generateEdges = (numEdges, numNodes) => {
    let edges = []
    for (let i = 0; i < numEdges; ++i) {
        const edge = generateEdge(Math.random(), Math.random(), Math.random(), numNodes, i)
        edges.push(edge)
    }
    return edges
}

module.exports = {
    generateEdges,
    generateNodes
}