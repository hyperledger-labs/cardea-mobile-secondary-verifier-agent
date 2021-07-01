import React, {useState, useEffect, useContext} from 'react'
import {ConnectionType, encodeInvitationToUrl} from 'aries-framework'

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

import QRCode from 'react-native-qrcode-svg'

import AppHeaderLarge from '../../AppHeaderLarge/index.js'
import BackButton from '../../BackButton/index.js'
import LoadingOverlay from '../../LoadingOverlay/index.js'
import * as Keychain from 'react-native-keychain'

import AgentContext from '../../AgentProvider/'

import Styles from './styles'
import AppStyles from '@assets/styles'
import Images from '@assets/images'

function QRCodeScreen(props) {
  console.log('Entering the scanner')
  let history = useHistory()

  props.setWorkflowInProgress(false)

  const agentContext = useContext(AgentContext)

  const [invite, setInvite] = useState(false)

  useEffect(() => {
    const startup = async () => {
      await setLabel()
      console.log('agentConfig:', agentContext.agent.agentConfig.mediatorUrl)
      console.log(
        'connectionsService:',
        agentContext.agent.connectionService.config.mediatorUrl,
      )
      const invitation = await agentContext.agent.connections.createConnection(
        true,
        'Cardea Mobile Verifier',
      )
      console.log('- - - - - INVITATION: ', invitation.invitation.id)
      const invitationURL = invitation.invitation.toUrl(
        agentContext.agent.agentConfig.mediatorUrl,
      )
      console.log('- - - - - INVITATION URL: ', invitationURL)
      console.log(agentContext.agent.connections)
      console.log('invitation:', invitation)
      setInvite(invitationURL)
    }
    if (!agentContext.loading) {
      startup()
    }
  }, [agentContext.loading])

  const setLabel = async () => {
    const label = await Keychain.getGenericPassword({service: 'afj_label'})
    if (label) {
      agentContext.agent.setLabel(label.password)
    }
  }

  async function getInvitationUrl() {
    console.log('Calling the invitation')
    const invitation = await agentContext.agent.connections.createConnection(
      true,
      'Cardea Mobile Verifier',
    )

    return 'https://www.google.com'
  }

  const testFun = async () => {
    return 'https://www.google.com'
  }

  return (
    <>
      <BackButton backPath={'/home'} />
      <View style={AppStyles.viewFull}>
        <AppHeaderLarge logo={true} />
        <Text
          style={[
            AppStyles.h1,
            AppStyles.textUpper,
            AppStyles.textCenter,
            AppStyles.textBold,
            AppStyles.textItalic,
            AppStyles.textPrimary,
            {top: 20},
          ]}>
          Verify
        </Text>
        <View style={[AppStyles.flexView, {justifyContent: 'center'}]}>
          <TouchableOpacity
            hitSlop={{top: 0, bottom: 0, left: 40, right: 0}}
            onPress={() => history.push('/home')}>
            <Image source={Images.arrowLeft} style={AppStyles.backArrow} />
          </TouchableOpacity>
          <TouchableOpacity
            //onPress={() => props.setWorkflow('connecting')}
            style={Styles.code}>
            {invite ? (
              <QRCode size={250} style={Styles.QR} value={invite} />
            ) : (
              <View style={{width: 250, height: 250}}>
                <Text
                  style={[
                    AppStyles.textCenter,
                    AppStyles.textItalic,
                    {top: 100},
                  ]}>
                  Loading QR Code...
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

export default QRCodeScreen
