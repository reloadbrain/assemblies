import Colors from '../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from 'react-native-navbar';
import Groups from '../groups/groups';
import Group from '../groups/group';
import CreateGroup from '../groups/create_group';
import CreateEvent from '../groups/create_event';
import GroupMembers from '../groups/group_members';
import GroupEvents from '../groups/group_events';
import CreateEventConfirm from '../groups/create_event_confirm';
import CreateGroupConfirm from '../groups/create_group_confirm';
import Profile from '../messages/profile';
import Event from '../groups/event';
import MessageList from '../messages/messages_list';
import MessageBox from '../messages/message_box';
import CalendarList from './calendar_list';
import _ from 'underscore';
import {BASE_URL, DEV} from '../utilities/fixtures';

import React, {
  ScrollView,
  Component,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  Image,
  TouchableOpacity,
  Dimensions,
  NativeModules,
  Navigator,
  InteractionManager,
  ActivityIndicatorIOS,
} from 'react-native';

const CUSTOM_CONFIG = Navigator.SceneConfigs.HorizontalSwipeJump;

CUSTOM_CONFIG.gestures = {}; // disable gestures for side swipe

class CalendarView extends React.Component{
  render(){
    return (
      <View style={styles.container}>
        <Navigator
          initialRoute={{ name: 'CalendarList' }}
          configureScene={(route, routeStack) => {
            return CUSTOM_CONFIG;
          }}
          renderScene={(route, navigator) => {
            if (route.name == 'CalendarList') {
              return (
                <CalendarList
                  {...this.props}
                  groups={this.props.groups.concat(this.props.suggestedGroups)}
                  changeState={this.props.changeState}
                  events={this.props.events.sort(function(a, b){
                    return a.start > b.start
                  })}
                  navigator={navigator}
                />
              )
            } else if (route.name == 'Event') {
              return (
                <Event {...route} {...this.props} navigator={navigator} />
              )
            } else if (route.name == 'Profile') {
              return (
                <Profile {...route} {...this.props} navigator={navigator} />
              )
            } else if (route.name == 'Groups') {
              return (
                <Groups
                  {...this.props}
                  navigator={navigator}
                  addUserToGroup={()=>{
                    if (DEV) {console.log('ADD USER TO GROUP')}
                  }}
                />
              )
            } else if (route.name == 'CreateGroup'){
              return <CreateGroup {...this.props} navigator={navigator} />
            } else if (route.name == 'Group') {
              return (
                <Group
                  addUserToGroup={()=>{
                    if (DEV) {console.log('ADD USER TO GROUP')}
                  }}
                  {...this.props}
                  {...route}
                  navigator={navigator}
                />
              )
            } else if (route.name == 'Members') {
              return <GroupMembers {...this.props} navigator={navigator} />
            } else if (route.name == 'Events' ) {
              return <GroupEvents {...this.props} navigator={navigator}  />
            } else if (route.name == 'CreateEvent'){
              return <CreateEvent {...this.props} {...route} navigator={navigator}  />
            } else if (route.name == 'CreateEventConfirm'){
              return (
                <CreateEventConfirm {...this.props} {...route}
                  navigator={navigator}
                  addEvent={()=>{
                    if (DEV) {console.log('ADD EVENT')}
                  }}
                />
              )
            } else if (route.name == 'CreateGroupConfirm'){
              return (
                <CreateGroupConfirm {...this.props} {...route}
                  createGroup={()=> {
                    if (DEV) {console.log('CREATE GROUP')}
                  }}
                  navigator={navigator}
                />
              )
            } else if (route.name == 'Chat') {
              return (
                <MessageBox
                  {...this.props}
                  userIds={[route.user.id, this.props.currentUser.id]}
                  user={route.user}
                  navigator={navigator}
                />
              )
            }
          }}/>
      </View>
    )
  }
}

let styles = {
  container: {
    flex: 1,
  }
}
module.exports = CalendarView;
