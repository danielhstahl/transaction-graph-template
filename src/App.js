import React, { useState } from 'react';
import { TestGraph } from './components/graph'
import Button from 'antd/es/button'
import Slider from 'antd/es/slider'
import Input from 'antd/es/input'
import message from 'antd/es/message'
import Row from 'antd/es/row'
import Col from 'antd/es/col'
import './App.css'
import { getTransactions } from './services/graphConvertor'

const dollarMarks = { 0: '0', 40000: '40000' }
const interactionMarks = { 1: '1', 2: '2', 3: '3' }
const daysMarks = { 1: '1', 180: '180' }
const rowStyle = { marginLeft: 50, marginRight: 50 }
const App = () => {
  const [dollarAmount, setDollarAmount] = useState(20000)
  const [days, setDays] = useState(3)
  const [interaction, setInteraction] = useState(1)
  const [accountNumber, setAccountNumber] = useState("")
  const [data, setData] = useState({ nodes: [], edges: [] })
  const [loading, setLoading] = useState(false)
  console.log(data)
  const updateTransactions = () => {
    setLoading(true)
    getTransactions(accountNumber, interaction, dollarAmount, days)
      .then(setData)
      .catch(e => message.error(e.message))
      .finally(() => setLoading(false))
  }
  return (
    <div className="App">
      <Row style={rowStyle}>
        <Col span={8}>
          <Input placeholder="Account Number" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} />
        </Col>
        <Col span={8}>
          <Slider value={dollarAmount} max={40000} onChange={setDollarAmount} marks={dollarMarks} />
        </Col>
        <Col span={8}>
          <Slider value={days} min={1} max={180} onChange={setDays} marks={daysMarks} />
        </Col>
        <Col span={8}>
          <Slider value={interaction} max={3} min={1} onChange={setInteraction} marks={interactionMarks} />
        </Col>
      </Row>
      <Row style={rowStyle}>
        <Col span={8}>
          <Button onClick={updateTransactions} type="primary" loading={loading}>
            Submit
          </Button>
        </Col>
      </Row>
      <Row style={rowStyle}>
        <TestGraph nodes={data.nodes} edges={data.edges} />
      </Row>
    </div>
  );
}

export default App;
