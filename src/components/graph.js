import React from 'react';

import { Sigma, RandomizeNodePositions, RelativeSize, EdgeShapes } from 'react-sigma'

const nodes = [
    {
        id: 'account_number_1',
        label: 'name_1',
        alert: false,
        is_customer: false,
        is_main: false
    },
    {
        id: 'account_number_2',
        label: 'name_2',
        is_customer: true,
        alert: true,
        is_main: false
    }, {
        id: 'account_number_3',
        label: 'name_3',
        alert: false,
        is_customer: true,
        is_main: true
    }, {
        id: 'account_number_4',
        label: 'name_4',
        alert: false,
        is_customer: true,
        is_main: false
    }
]

const edges = [
    {
        id: 'transaction_1',
        source: 'account_number_1',
        target: 'account_number_3',
        label: 'some transaction',
        size: 50
    },
    {
        id: 'transaction_2',
        source: 'account_number_1',
        target: 'account_number_2',
        label: 'another transaction',
        size: 100
    },
    {
        id: 'transaction_3',
        source: 'account_number_3',
        target: 'account_number_2',
        label: '3rd transaction',
        size: 75
    },
    {
        id: 'transaction_4',
        source: 'account_number_2',
        target: 'account_number_4',
        label: '4th',
        size: 50
    }
]

const convertNodesToGraphNodes = nodes => nodes.map(node => {
    const xY = node.is_main ? { x: 50, y: 50 } : {}
    const color = node.alert ? 'red' : 'blue'
    return { color, size: 4, ...xY, ...node }
})

let myGraph = {
    nodes: convertNodesToGraphNodes(nodes), edges
};

export const TestGraph = () => (<Sigma
    renderer="canvas"
    graph={myGraph} settings={{ drawEdges: true, clone: false, minEdgeSize: 0.5, maxEdgeSize: 4, minNodeSize: 7, maxNodeSize: 7 }}
>
    <RelativeSize initialSize={50} />
    <RandomizeNodePositions />
    <EdgeShapes default="arrow" />
</Sigma>
)