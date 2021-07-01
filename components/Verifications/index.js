import React, {useState, useEffect, useContext} from 'react'
import {ProofState, PresentationMessage, JsonTransformer} from 'aries-framework'

import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import {useHistory} from 'react-router-native'

import BackButton from '../BackButton/index.js'
import LoadingOverlay from '../LoadingOverlay/index.js'
import AppHeaderLarge from '../AppHeaderLarge/index.js'
import VerificationItem from './VerificationItem/index.js'
import AgentContext from '../AgentProvider/'
import Styles from './styles'
import AppStyles from '@assets/styles'
import Images from '@assets/images'

function Verifications(props) {
  let history = useHistory()

  const agentContext = useContext(AgentContext)
  const [proofList, setProofList] = useState([])

  useEffect(() => {
    fetchProofs()
  }, [])

  const fetchProofs = async () => {
    let insufficientProofs = await agentContext.agent.basicMessages.findAllByQuery(
      {},
    )

    let proofs = await agentContext.agent.proofs.getAll()

    //filter out none-done states
    proofs = proofs
      .filter((curr) => {
        return curr.state === ProofState.Done
      })
      .map((presentation) => {
        let userData = {}
        userData.createdAt = presentation.createdAt
        if (presentation.isVerified) {
          userData.isVerified = true
          const data = JsonTransformer.fromJSON(
            presentation.presentationMessage,
            PresentationMessage,
          ).indyProof.requested_proof.revealed_attrs
          userData.attributes = {
            trusted_date: data.trusted_date_time.raw,
            credentialName: 'Happy Traveler Card',
            issuer: 'Health Department',
            traveler_id: '******' + data.trusted_traveler_id.raw.slice(-4),
          }
        } else {
          userData.isVerified = false
        }
        return userData
      })

    let currentProofs = [...proofs, ...insufficientProofs]
    currentProofs.sort((a, b) => {
      return b.createdAt - a.createdAt
    })
    setProofList(currentProofs)
    console.log('proofs:', currentProofs)
  }

  return (
    <>
      <View style={AppStyles.viewFull}>
        <AppHeaderLarge />
        <View style={[Styles.window]}>
          <TouchableOpacity
            style={AppStyles.marginBottomSm}
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
            onPress={() => history.push('/home')}>
            <Image source={Images.arrowDown} style={AppStyles.arrow} />
          </TouchableOpacity>
          <ScrollView
            contentContainerStyle={Styles.proofView}
            style={{width: '100%'}}>
            {proofList.map((curr, key) => {
              if (curr) {
                let label
                let background = curr.isVerified
                  ? AppStyles.confirmBackground
                  : AppStyles.errorBackground
                if (curr.content === 'INSUFFICIENT_CREDENTIALS') {
                  label = 'Unapproved - Insufficient Credentials'
                } else {
                  label = curr.isVerified
                    ? 'Approved - ' + curr.attributes.credentialName
                    : 'Unapproved'
                }
                return (
                  <VerificationItem
                    curr={curr}
                    key={key}
                    background={background}
                    label={label}
                  />
                )
              } else {
                return null
              }
            })}
          </ScrollView>
        </View>
      </View>
    </>
  )
}

export default Verifications
