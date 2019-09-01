import React, { useState } from 'react';
import { TestGraph } from './components/graph'
import Button from 'antd/es/button'
import Slider from 'antd/es/slider'
import Input from 'antd/es/input'
import message from 'antd/es/message'
import './App.css'
import { getTransactions } from './services/graphConvertor'
import Layout from 'antd/es/layout';
const { Header, Sider, Content } = Layout
const dollarMarks = { 0: '0', 40000: '40000' }
const interactionMarks = { 1: '1', 2: '2', 3: '3' }
const daysMarks = { 1: '1', 180: '180' }
const siderStyles = { margin: 30 }
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
    <Layout className='app'>
      <Header>
        <div className="logo" />

      </Header>

      <Layout>
        <Sider breakpoint="md" width={300} collapsedWidth={0}>
          <div style={siderStyles}>
            <Input
              placeholder="Account Number" value={accountNumber}
              onChange={e => setAccountNumber(e.target.value)}
            />
          </div>

          <Slider style={siderStyles} value={dollarAmount} max={40000} onChange={setDollarAmount} marks={dollarMarks} />
          <Slider style={siderStyles} value={days} min={1} max={180} onChange={setDays} marks={daysMarks} />
          <Slider style={siderStyles} value={interaction} min={1} max={3} onChange={setInteraction} marks={interactionMarks} />
          <Button style={siderStyles} onClick={updateTransactions} type="primary" loading={loading}>
            Submit
            </Button>
        </Sider>
        <Content><TestGraph nodes={data.nodes} edges={data.edges} /></Content>
      </Layout>
    </Layout>
  );
}

export default App;
