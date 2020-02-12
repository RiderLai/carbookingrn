/*
 * @Author: Rider
 * @Date: 2020-01-22 17:11:22
 * @LastEditors  : Rider
 * @LastEditTime : 2020-02-01 20:30:26
 * @Description: file content
 */
import React from 'react';
import { StatusBar, Platform, AsyncStorage } from 'react-native';
import { Container, Content, List, ListItem, Text } from 'native-base';

import { userInfoAPI } from '../conf/api';

class ProfileScreen extends React.Component {

  state = {
    username: '',
    phone: '',
    address: '',
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');
    fetch(userInfoAPI, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      }
    }).then(
      resopnse => resopnse.json()
    ).then(
      resopnseJson => {
        const data = resopnseJson.data
        if (resopnseJson.meta.success) {
          this.setState( () => ({
            username: data.username,
            phone: data.phone,
            address: data.adress,
          }))
        }
        else {
          this.props.navigation.navigate('Login');
        }
      }
    )
  }

  render() {
    return (
      <Container>
        <Content  style={{ marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 25 }}>
          <List>
            <ListItem itemHeader first>
              <Text>用户信息</Text>
            </ListItem>
            <ListItem>
              <Text>用户名: {this.state.username}</Text>
            </ListItem>
            <ListItem>
              <Text>电话: {this.state.phone}</Text>
            </ListItem>
            <ListItem>
              <Text>地址: {this.state.address}</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    )
  }
}

export default ProfileScreen;