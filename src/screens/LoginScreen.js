/*
 * @Author: Rider
 * @Date: 2020-01-22 17:11:57
 * @LastEditors  : Rider
 * @LastEditTime : 2020-02-02 16:52:32
 * @Description: file content
 */
import React from 'react';
import { StatusBar, Platform, AsyncStorage } from 'react-native';
import { Root, Container, Header, Body, Title,
   Content, Form, Item, Input, Label, Button, Text, Spinner, Toast } from 'native-base';

import { loginAPI } from '../conf/api';

class LoginScreen extends React.Component {

  state = {
    visibleButton: true,
    visibleSpinner: false,
    username: '',
    password: '',
  };

  login = () =>{
    const data = JSON.stringify({
      password: this.state.password,
      useraccount: this.state.username,
    });

    const toHome = () => this.props.navigation.navigate('Home');
    const toDrive = () => this.props.navigation.navigate('Drive');

    const message = () => {
      Toast.show({
        text: "登陆失败",
        buttonText: "了解",
        position: "bottom"
      })
    };

    this.setState(previousState => {
      previousState.visibleButton = false;
      previousState.visibleSpinner = true;
      return previousState;
    });

    return fetch(loginAPI, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: data,
    }).then(
      response => response.json()
    ).then(
      async responseJson => {
        console.log(responseJson)
        if (responseJson.meta.success){
          await AsyncStorage.setItem('token', responseJson.data.token);
          if (responseJson.data.userType === '0') {
            toHome();
          }
          else if (responseJson.data.userType === '1') {
            toDrive();
          }
          else if (responseJson.data.userType === '2') {
            toHome();
          }
        }
        else {
          this.setState(previousState => {
            previousState.visibleButton = true;
            previousState.visibleSpinner = false;
            return previousState;
          });
          
          message();
        }
      }
    );
  }

  render() {
    return (
      <Root>
        <Container >
          <Header style={{paddingTop: 40,
            paddingBottom: Platform.OS === 'android' ? StatusBar.currentHeight : 25}}>
            <Body>
              <Title>登陆</Title>
            </Body>
          </Header>

          <Content>
            <Form>
              <Item floatingLabel>
                <Label>用户名</Label>
                <Input
                  value={this.state.username}
                  onChangeText={ text => this.setState( previousState => previousState.username=text ) } />
              </Item>
              <Item floatingLabel>
                <Label>密码</Label>
                <Input
                  value={this.state.password}
                  onChangeText={ text => this.setState( previousState => previousState.password=text ) } />
              </Item>
              
              { this.state.visibleButton &&
              <Button block
                style={{ margin: 15, marginTop: 50 }}
                onPress={this.login}>
                <Text>登陆</Text>
              </Button>}

              { this.state.visibleSpinner &&
              <Spinner color='blue' />}
            </Form>
            
          </Content>
        </Container>
      </Root>
    );
  }
}

export default LoginScreen;