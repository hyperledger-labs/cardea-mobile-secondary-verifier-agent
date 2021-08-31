import React, {useState, useEffect, useContext} from 'react'

import {Alert, Image, Text, View, TouchableWithoutFeedback} from 'react-native'

import {
  Prompt,
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-native'

import Images from '@assets/images'
import AppStyles from '@assets/styles'

import AgentContext from '../AgentProvider/'
import {
  ConnectionEventType,
  BasicMessageEventType,
  ConnectionState,
  ProofEventType,
  ProofState,
} from 'aries-framework'

import Message from '../Message/index.js'
import QRCodeScreen from './QRCodeScreen/index.js'
import Verified from './Verified/index.js'

function Workflow(props) {
  let history = useHistory()
  let {url} = useRouteMatch()

  const [workflow, setWorkflow] = useState('connect')
  const [workflowInProgress, setWorkflowInProgress] = useState(true)
  const [firstRender, setFirstRender] = useState(false)
  const [contactID, setContactID] = useState('')
  const [approved, setApproved] = useState(false)
  const [proof, setProof] = useState(false)

  const agentContext = useContext(AgentContext)

  const handleConnectionStateChange = async (event) => {
    console.log(
      `connection event for: ${event.connectionRecord.id}, previous state -> ${event.previousState} new state: ${event.connectionRecord.state}`,
    )

    if (event.connectionRecord.state == ConnectionState.Complete) {
      const proofConfig = {
        comment: 'n/a',
      }

      const proofRequest = {
        name: 'Proof request',
        nonce: '1234567890',
        requestedAttributes: {
          traveler_surnames: {
            name: 'traveler_surnames',
            restrictions: [
              {
                schema_id: 'RuuJwd3JMffNwZ43DcJKN1:2:Trusted_Traveler:1.4',
              },
            ],
          },
          traveler_given_names: {
            name: 'traveler_given_names',
            restrictions: [
              {
                schema_id: 'RuuJwd3JMffNwZ43DcJKN1:2:Trusted_Traveler:1.4',
              },
            ],
          },
          traveler_date_of_birth: {
            name: 'traveler_date_of_birth',
            restrictions: [
              {
                schema_id: 'RuuJwd3JMffNwZ43DcJKN1:2:Trusted_Traveler:1.4',
              },
            ],
          },
          traveler_gender_legal: {
            name: 'traveler_gender_legal',
            restrictions: [
              {
                schema_id: 'RuuJwd3JMffNwZ43DcJKN1:2:Trusted_Traveler:1.4',
              },
            ],
          },
          traveler_country: {
            name: 'traveler_country',
            restrictions: [
              {
                schema_id: 'RuuJwd3JMffNwZ43DcJKN1:2:Trusted_Traveler:1.4',
              },
            ],
          },
          traveler_origin_country: {
            name: 'traveler_origin_country',
            restrictions: [
              {
                schema_id: 'RuuJwd3JMffNwZ43DcJKN1:2:Trusted_Traveler:1.4',
              },
            ],
          },
          traveler_email: {
            name: 'traveler_email',
            restrictions: [
              {
                schema_id: 'RuuJwd3JMffNwZ43DcJKN1:2:Trusted_Traveler:1.4',
              },
            ],
          },
          trusted_traveler_id: {
            name: 'trusted_traveler_id',
            restrictions: [
              {
                schema_id: 'RuuJwd3JMffNwZ43DcJKN1:2:Trusted_Traveler:1.4',
              },
            ],
          },
          trusted_traveler_issue_date_time: {
            name: 'trusted_traveler_issue_date_time',
            restrictions: [
              {
                schema_id: 'RuuJwd3JMffNwZ43DcJKN1:2:Trusted_Traveler:1.4',
              },
            ],
          },
          trusted_traveler_expiration_date_time: {
            name: 'trusted_traveler_expiration_date_time',
            restrictions: [
              {
                schema_id: 'RuuJwd3JMffNwZ43DcJKN1:2:Trusted_Traveler:1.4',
              },
            ],
          },
          governance_applied: {
            name: 'governance_applied',
            restrictions: [
              {
                schema_id: 'RuuJwd3JMffNwZ43DcJKN1:2:Trusted_Traveler:1.4',
              },
            ],
          },
          credential_issuer_name: {
            name: 'credential_issuer_name',
            restrictions: [
              {
                schema_id: 'RuuJwd3JMffNwZ43DcJKN1:2:Trusted_Traveler:1.4',
              },
            ],
          },
          credential_issue_date: {
            name: 'credential_issue_date',
            restrictions: [
              {
                schema_id: 'RuuJwd3JMffNwZ43DcJKN1:2:Trusted_Traveler:1.4',
              },
            ],
          },
        },
        requestedPredicates: {},
      }

      setWorkflow('connecting')

      const request = await agentContext.agent.proofs.requestProof(
        event.connectionRecord.id,
        proofRequest,
        proofConfig,
      )
      console.log(' - - - - - REQUEST: ', request)

      setWorkflow('requesting')
    }
  }

  const handlePresentationStateChange = async (event) => {
    console.log(
      `Presentation event for: ${event.proofRecord.id}, previous state -> ${event.previousState} new state: ${event.proofRecord.state}`,
      event.proofRecord,
    )

    if (event.proofRecord.state === ProofState.PresentationReceived) {
      console.log('Verified Presentation')

      console.log(
        '- - - - - PRESENTATION: ',
        event.proofRecord.presentationMessage.indyProof,
        event.proofRecord.presentationMessage.indyProof.requested_proof
          .revealed_attrs,
        event.proofRecord.presentationMessage.indyProof.identifiers[0]
          .cred_def_id,
      )

      setProof({
        last_name:
          event.proofRecord.presentationMessage.indyProof.requested_proof
            .revealed_attrs.traveler_last_name.raw,
        traveler_id:
          '******' +
          event.proofRecord.presentationMessage.indyProof.requested_proof.revealed_attrs.trusted_traveler_id.raw.slice(
            -4,
          ),
        issuer: 'Health Department',
        trusted_date:
          event.proofRecord.presentationMessage.indyProof.requested_proof
            .revealed_attrs.trusted_date_time.raw,
      })

      setApproved(event.proofRecord.isVerified)

      //The next screen is 'verified' either way
      setWorkflow('verified')

      //Send basic message indicating if the presentation failed TODO: Replace with present-proof v2 functionality

      console.log('Is Verified:', event.proofRecord.isVerified)

      if (!event.proofRecord.isVerified) {
        console.log('Presentation not verified, sending message to prover')
        const connection = await agentContext.agent.connections.getById(
          event.proofRecord.connectionId,
        )

        await agentContext.agent.basicMessages.sendMessage(
          connection,
          'UNVERIFIED',
        )
      }

      console.log('Sending presentation ack')

      await agentContext.agent.proofs.acceptPresentation(event.proofRecord.id)
    }
  }

  const handleBasicMessage = async (event) => {
    console.log('Received Basic Message Event', event)

    //TODO: Replace the following with present-proof v2 functionality
    switch (event.message.content) {
      case 'INSUFFICIENT_CREDENTIALS':
        console.log(
          'Received Message that the prover does not have sufficient credentials',
        )
        setApproved(false)
        setWorkflow('verified')

        break
      default:
        console.log(`New Basic Message: '${event.message.content}'`)
        break
    }
  }

  //Invitation connection event listeners
  useEffect(() => {
    if (!agentContext.loading) {
      agentContext.agent.connections.events.on(
        ConnectionEventType.StateChanged,
        handleConnectionStateChange,
      )
      agentContext.agent.proofs.events.on(
        ProofEventType.StateChanged,
        handlePresentationStateChange,
      )
      agentContext.agent.basicMessages.events.on(
        BasicMessageEventType.MessageReceived,
        handleBasicMessage,
      )
      return function () {
        agentContext.agent.connections.events.removeListener(
          ConnectionEventType.StateChanged,
          handleConnectionStateChange,
        )
        agentContext.agent.proofs.events.removeListener(
          ProofEventType.StateChanged,
          handlePresentationStateChange,
        )
        agentContext.agent.basicMessages.events.removeListener(
          BasicMessageEventType.MessageReceived,
          handleBasicMessage,
        )
      }
    }
  })

  useEffect(() => {
    setWorkflowInProgress(true)
    if (firstRender) {
      history.push(`${url}/${workflow}`)
    } else {
      setFirstRender(true)
    }
  }, [workflow])

  // Mock Credential

  const mockCredential = {
    label: 'Trusted Traveler',
    sublabel: 'Health Clinic',
    traveler_id: 1234567,
    issue_date: '01-15-2021', 
    cred_did: '7173hcd20sh15dc200005',
    cred_id: 1234567,
  }

  return (
    <View>
      <Route
        path={`${url}/connect`}
        render={() => (
          <QRCodeScreen
            setWorkflow={setWorkflow}
            setWorkflowInProgress={setWorkflowInProgress}
          />
        )}
      />
      <Route
        path={`${url}/connecting`}
        render={() => {
          return (
            <Message
              title={'Connecting'}
              bgColor={AppStyles.secondaryBackground}
              >
              <Image
                source={Images.waiting}
                style={{
                  alignSelf: 'center',
                  width: 102,
                  height: 115,
                }}
              />
            </Message>
          )
        }}
      />
      <Route
        path={`${url}/requesting`}
        render={() => {
          return (
            <Message
              title={'Requesting Credential'}
              bgColor={AppStyles.secondaryBackground}
              >
              <Image
                source={Images.waiting}
                style={{
                  alignSelf: 'center',
                  width: 102,
                  height: 115,
                }}
              />
            </Message>
          )
        }}
      />
      <Route
        path={`${url}/verified`}
        render={() => <Verified approved={approved} proof={proof} />}
      />

      {/* <Prompt
        message={(location, action) => {
          // Provides warning before exiting workflow
          if (
            location.pathname != '/workflow/verified' &&
            workflowInProgress
          ) {
            return `Are you sure you want to exit and lose unsaved progress?`
          }
        }}
      /> */}
    </View>
  )
}
export default Workflow
