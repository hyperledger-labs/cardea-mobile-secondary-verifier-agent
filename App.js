/**
 * Cardea Mobile App - Verifier
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react'
import {Alert, BackHandler, Image, Text, View} from 'react-native'
import {
  Prompt,
  Redirect,
  Route,
  Router,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-native'

import Errors from './components/Errors/index.js'
import Notifications from './components/Notifications/index.js'

import {AgentProvider} from './components/AgentProvider/'

import 'react-native-get-random-values'
import '@azure/core-asynciterator-polyfill'

import BusinessInfo from './components/Registration/BusinessInfo/index.js'
import Confirmed from './components/Registration/Confirmed/index.js'
import EntryPoint from './components/EntryPoint/index.js'
import Home from './components/Home/index.js'
import Message from './components/Message/index.js'
import NameEntry from './components/Registration/NameEntry/index.js'
import Navbar from './components/Navbar/index.js'
import PinCreate from './components/Registration/PinCreate/index.js'
import PinEnter from './components/PinEnter/index.js'
import Settings from './components/Settings/index.js'
import SetupWizard from './components/Registration/SetupWizard/index.js'
import StartScreen from './components/StartScreen/index.js'
import Terms from './components/Registration/Terms/index.js'
import Workflow from './components/Workflow/index.js'
import Verifications from './components/Verifications/index.js'

import LoadingOverlay from './components/LoadingOverlay/index.js'

import Images from '@assets/images'
import AppStyles from '@assets/styles'

const App = (props) => {
  let location = useLocation()
  let history = useHistory()

  const [currentLocation, setCurrentLocation] = useState('')

  const [authenticated, setAuthenticated] = useState(false)

  // Mock data to pass to Terms component
  const mockTitle = 'Terms of Service'
  const mockMessage =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel consectetur diam. Nunc sit amet elit est. Praesent libero elit, consectetur dapibus diam non, facilisis euismod velit. Etiam a ligula eget leo elementum tincidunt. Fusce et lorem turpis. Nunc tempus nisl consectetur eros vehicula venenatis. Suspendisse potenti. Aenean vitae aliquet augue. Maecenas lacinia nunc vitae blandit hendrerit. Sed congue risus quis magna convallis sollicitudin. Integer in ante vel orci ornare porta quis id libero. Proin mollis urna nec lectus fringilla, sit amet aliquam urna fringilla. Praesent pellentesque non augue et gravida. Donec congue urna ac massa consequat, lacinia condimentum dolor blandit. Nam ultrices tellus at risus dignissim, quis cursus mauris pellentesque. Donec at scelerisque ipsum. Praesent eu massa at tellus cursus ornare. Fusce vel faucibus dolor. Etiam blandit velit sed velit tempus feugiat. Donec condimentum pretium suscipit. Sed suscipit, leo molestie tempus maximus, turpis enim hendrerit nibh, semper sagittis turpis velit sed nisl. Aliquam eu ultrices velit. Aenean tristique mauris justo, eu commodo quam semper non. Curabitur ultricies auctor mi eu tempus. Sed bibendum eros sed neque semper fermentum. Nullam porta tortor ut ante congue molestie. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur sit amet aliquam nunc, malesuada auctor quam. Pellentesque vel lobortis risus, volutpat suscipit velit. Aenean ut erat sed metus interdum mattis. Nam consectetur ante eu felis rhoncus, et volutpat dolor tincidunt. Vivamus sit amet feugiat mi. Proin in dui ac metus vehicula fringilla eget id mauris. Maecenas et elit venenatis dolor pulvinar pulvinar in et leo. Aliquam scelerisque viverra sapien at bibendum. Curabitur et libero nec enim convallis porttitor sed a libero. In hac habitasse platea dictumst. Integer dignissim velit eu pharetra ultricies. Vestibulum at velit hendrerit, pretium purus eget, lobortis tellus. Maecenas non erat ut lacus scelerisque luctus et et tellus.'
  const mockEulaTitle = 'EULA Agreement'
  const mockEulaMessage =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel consectetur diam. Nunc sit amet elit est. Praesent libero elit, consectetur dapibus diam non, facilisis euismod velit. Etiam a ligula eget leo elementum tincidunt. Fusce et lorem turpis. Nunc tempus nisl consectetur eros vehicula venenatis. Suspendisse potenti. Aenean vitae aliquet augue. Maecenas lacinia nunc vitae blandit hendrerit. Sed congue risus quis magna convallis sollicitudin. Integer in ante vel orci ornare porta quis id libero. Proin mollis urna nec lectus fringilla, sit amet aliquam urna fringilla. Praesent pellentesque non augue et gravida. Donec congue urna ac massa consequat, lacinia condimentum dolor blandit. Nam ultrices tellus at risus dignissim, quis cursus mauris pellentesque. Donec at scelerisque ipsum. Praesent eu massa at tellus cursus ornare. Fusce vel faucibus dolor. Etiam blandit velit sed velit tempus feugiat. Donec condimentum pretium suscipit. Sed suscipit, leo molestie tempus maximus, turpis enim hendrerit nibh, semper sagittis turpis velit sed nisl. Aliquam eu ultrices velit. Aenean tristique mauris justo, eu commodo quam semper non. Curabitur ultricies auctor mi eu tempus. Sed bibendum eros sed neque semper fermentum. Nullam porta tortor ut ante congue molestie. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur sit amet aliquam nunc, malesuada auctor quam. Pellentesque vel lobortis risus, volutpat suscipit velit. Aenean ut erat sed metus interdum mattis. Nam consectetur ante eu felis rhoncus, et volutpat dolor tincidunt. Vivamus sit amet feugiat mi. Proin in dui ac metus vehicula fringilla eget id mauris. Maecenas et elit venenatis dolor pulvinar pulvinar in et leo. Aliquam scelerisque viverra sapien at bibendum. Curabitur et libero nec enim convallis porttitor sed a libero. In hac habitasse platea dictumst. Integer dignissim velit eu pharetra ultricies. Vestibulum at velit hendrerit, pretium purus eget, lobortis tellus. Maecenas non erat ut lacus scelerisque luctus et et tellus.'

  // Mock Credentials
  const mockCredentials = [
    {
      label: 'Covid-19 Vaccination',
      sublabel: 'Brooklyn Health Clinic',
      first_name: 'John',
      last_name: 'Doe',
      provider: 'Dr. Jane Smith',
      date_received: 'Oct 30, 2020',
      service: 'Covid-19 Vaccination',
      result: 'Vaccinated',
      cred_id: 1234567,
    },
    {
      label: 'Covid-19 Test',
      sublabel: 'Brooklyn Health Clinic',
      first_name: 'John',
      last_name: 'Doe',
      provider: 'Dr. Jane Smith',
      date_received: 'Sep 20, 2020',
      service: 'Covid-19 Test',
      result: 'Negative',
      cred_id: 7654321,
    },
  ]

  // Mock Contacts
  const mockContacts = [
    {
      label: 'Department of Health',
      sublabel: 'Health Clinic',
      address: '1234 Island View Blvd',
      city: 'Nassau',
      country: 'Bahamas',
      phone: '555-555-5555',
      email: 'healthdepartment@email.com',
      contact_id: 7654321,
    },
    {
      label: 'Department of Health',
      sublabel: 'Health Clinic',
      address: '1234 Island View Blvd',
      city: 'Nassau',
      country: 'Bahamas',
      phone: '555-555-5555',
      email: 'healthdepartment@email.com',
      contact_id: 7654567,
    },
  ]

  /*
    /
    /home
    /start
    /pin-entry
    /pin-create
    /scan
    /workflow
    /settings
  */

  return (
    <View>
      <AgentProvider>
        <Errors>
          <Notifications>
            <View style={authenticated ? {height: '90%'} : {height: '100%'}}>
              <Route
                exact
                path="/"
                render={() => {
                  return <EntryPoint authenticated={authenticated} />
                }}
              />
              <Route
                exact
                path="/home"
                render={() => (authenticated ? <Home /> : <Redirect to="/" />)}
              />
              <Route
                exact
                path="/settings"
                render={() =>
                  authenticated ? <Settings /> : <Redirect to="/" />
                }
              />
              <Route
                exact
                path="/verifications"
                render={() =>
                  authenticated ? <Verifications /> : <Redirect to="/" />
                }
              />
              <Route path="/workflow" render={() => <Workflow />} />
              <Route
                exact
                path="/pin/enter"
                render={() => <PinEnter setAuthenticated={setAuthenticated} />}
              />
              <Route exact path="/start" render={() => <StartScreen />} />
              <Route
                exact
                path="/setup-wizard"
                render={() => (
                  <SetupWizard setAuthenticated={setAuthenticated}>
                    <PinCreate />
                    <NameEntry />
                    <Confirmed />
                  </SetupWizard>
                )}
              />
            </View>
            {authenticated ? (
              <View style={{height: '10.5%', top: -8}}>
                <Navbar />
              </View>
            ) : null}
          </Notifications>
        </Errors>
      </AgentProvider>
    </View>
  )
}

export default App
