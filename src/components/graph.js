import React from 'react';

import Graph from 'vis-react'


const convertNodesToGraphNodes = nodes => nodes.map(node => {
    const group = node.is_main ? 'main' : (node.alert ? 'alert' : (node.is_customer ? 'customer' : node.group))
    return { ...node, group }
})

const options = {
    autoResize: true,
    height: '100%',
    width: '100%',
    locale: 'en',
    layout: {
    },
    physics: {
        //enabled: false
        //stabilization: false
    },
    nodes: {
        shape: 'circle',
    },
    edges: {
        color: 'lightblue',
        smooth: true,
        scaling: {
            min: 2,
            max: 8
        }
    },
    groups: {
        alert: {
            color: 'red',
        },
        FI: {
            color: 'orange'
        },
        Business: {
            color: 'blue'
        },
        People: {
            color: 'purple'
        },
        customer: {
            color: 'green'
        },
        main: {
            color: 'yellow'
        }
    }
}

const events = {
    select: (event) => {
        //const { nodes, edges } = event
        console.log(event)
        //console.log(edges)
    }
}

export const TestGraph = ({ nodes, edges }) => {
    const myGraph = {
        nodes: convertNodesToGraphNodes(nodes), edges
    }
    return (<Graph
        graph={myGraph}
        options={options}
        events={events}
    />)
}