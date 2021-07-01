import React, {useState, useEffect, useContext} from 'react'

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
import Config from "react-native-config";

import packageJson from '../../package.json'

import {JsonTransformer, PresentationMessage} from 'aries-framework'

import AppHeaderLarge from '../AppHeaderLarge/index.js'
import BackButton from '../BackButton/index.js'

import AgentContext from '../AgentProvider/'

import AppStyles from '@assets/styles'
import Images from '@assets/images.js'
import Styles from './styles'

function Settings(props) {
  let history = useHistory()

  const [proofs, setProofs] = useState(false)

  const agentContext = useContext(AgentContext)

  const getPresentations = async () => {
    const presentations = await agentContext.agent.proofs.getAll()

    let results = []

    for (let i = 0; i < presentations.length; i++) {
      let presentation = JsonTransformer.fromJSON(
        presentations[i].presentationMessage,
        PresentationMessage,
      )

      results.push(presentation)
    }

    console.log('-VERIFICATION DATE', presentations[0].createdAt)
    console.log('-CREDENTIAL NAME', 'Happy Traveler Card')
    console.log('-ISSUER', results[0].indyProof.requested_proof)
    setProofs(presentations)
  }

  useEffect(() => {
    getPresentations()
  }, [])

  return (
    <>
    <BackButton backPath={'/home'} />
    <View style={AppStyles.viewFull}>
      <AppHeaderLarge />
      <View style={Styles.settingView}>
        <TouchableOpacity
          style={AppStyles.marginBottomMd}
          hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
          onPress={() => history.push('/home')}>
          <Image source={Images.arrowDown} style={AppStyles.arrow} />
        </TouchableOpacity>
        <Text style={[AppStyles.textPrimary, AppStyles.h3]}>
          <Text style={AppStyles.textBold}>Version: </Text> {packageJson.version}
        </Text>
        {Config.ENV &&
          <Text style={[AppStyles.textPrimary, AppStyles.h3]}>
            <Text style={AppStyles.textBold}>Env: </Text> {Config.ENV}
          </Text>
        }
      </View>
    </View>
    </>
  )
}

export default Settings
