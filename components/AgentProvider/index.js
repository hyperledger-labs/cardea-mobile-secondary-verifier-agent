import React, {useState, useEffect} from 'react'
import Config from 'react-native-config'
// import type Indy from 'indy-sdk';

import {downloadGenesis, storeGenesis} from '../../genesis-utils'
import {
  HttpOutboundTransporter,
  PollingInboundTransporter,
} from '../../transporters'

import indy from 'rn-indy-sdk'
import {
  Agent,
  ConnectionEventType,
  BasicMessageEventType,
  ConsoleLogger,
  LogLevel,
} from 'aries-framework'
console.disableYellowBox = true

const AgentContext = React.createContext({})

function AgentProvider(props) {
  const [agent, setAgent] = useState(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAgent = async () => {
      let agentInitConfig = {
        mediatorUrl: Config.MEDIATOR_URL,
        genesisUrl: Config.GENESIS_URL,
      }

      console.info('Initializing Agent', agentInitConfig)

      let genesisPath = agentInitConfig.genesisUrl
      const genesis = await downloadGenesis(agentInitConfig.genesisUrl)
      genesisPath = await storeGenesis(genesis, 'genesis.txn')

      let agentConfig = {
        label: 'Cardea Verifier',
        walletConfig: {id: 'wallet4'},
        walletCredentials: {key: '123'},
        autoAcceptConnections: true,
        poolName: 'test-183',
        ...agentInitConfig,
        genesisPath: genesisPath,
        logger: new ConsoleLogger(LogLevel.debug),
        indy: indy,
      }

      const newAgent = new Agent(agentConfig)

      const inbound = new PollingInboundTransporter()
      const outbound = new HttpOutboundTransporter(newAgent)

      newAgent.setInboundTransporter(inbound)
      newAgent.setOutboundTransporter(outbound)

      await newAgent.init()

      setAgent(newAgent)
      setLoading(false)

      console.info('Agent has been initialized')

      const handleBasicMessageReceive = (event) => {
        console.log(
          `New Basic Message with verkey ${event.verkey}:`,
          event.message,
        )
      }
      newAgent.basicMessages.events.on(
        BasicMessageEventType.MessageReceived,
        handleBasicMessageReceive,
      )

      const handleConnectionStateChange = (event) => {
        console.log(
          `connection event for: ${event.connectionRecord.id}, previous state -> ${event.previousState} new state: ${event.connectionRecord.state}`,
        )
      }
      newAgent.connections.events.on(
        ConnectionEventType.StateChanged,
        handleConnectionStateChange,
      )

      console.log('connections:', await newAgent.connections.getAll())
    }

    initAgent()
  }, [])

  return (
    <AgentContext.Provider
      value={{
        agent,
        loading,
      }}>
      {props.children}
    </AgentContext.Provider>
  )
}

export default AgentContext
export {AgentProvider}
