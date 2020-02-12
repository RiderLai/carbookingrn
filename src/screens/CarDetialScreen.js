/*
 * @Author: Rider
 * @Date: 2020-01-22 17:55:44
 * @LastEditors  : Rider
 * @LastEditTime : 2020-02-01 20:21:50
 * @Description: file content
 */
import React from 'react';
import { AsyncStorage } from 'react-native';
import { Container, Content, List, ListItem, Text } from 'native-base';

import { busByIdAPI } from '../conf/api';
import { timetrans } from '../util';

class CarDetialScreen extends React.Component {

  state = {
    name: '',
    type: '',
    status: '',
    departureTime: '',
    driverName: '',
    licence: '',
    route: '',
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');
    fetch(busByIdAPI + this.props.navigation.getParam('id'), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      }
    }).then(
      resopnse => resopnse.json()
    ).then(
      responseJson => {
        console.log(responseJson);
        if (responseJson.meta.success) {
          const data = responseJson.data;
          this.setState( () => ({
            name: data.name,
            type: data.type,
            status: data.status,
            departureTime: timetrans(data.departureTime),
            driverName: data.driverName,
            licence: data.licence,
            route: data.route,
          }) );
        }
        else {
          this.props.navigation.goBack();
        }
      }
    )
  }

  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem>
              <Text>
                班车名称: {this.state.name}
              </Text>
            </ListItem>

            <ListItem>
              <Text>
                班车类型: {this.state.type}
              </Text>
            </ListItem>

            <ListItem>
              <Text>
                班车状态: {this.state.status}
              </Text>
            </ListItem>

            <ListItem>
              <Text>
                发车时间: {this.state.departureTime}
              </Text>
            </ListItem>

            <ListItem>
              <Text>
                司机名: {this.state.driverName}
              </Text>
            </ListItem>

            <ListItem>
              <Text>
                车牌: {this.state.licence}
              </Text>
            </ListItem>

            <ListItem>
              <Text>
                路线: {this.state.route}
              </Text>
            </ListItem>

          </List>
        </Content>
      </Container>
    )
  }
}

export default CarDetialScreen;