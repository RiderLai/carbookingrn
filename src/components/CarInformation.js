/*
 * @Author: Rider
 * @Date: 2020-01-23 15:57:45
 * @LastEditors  : Rider
 * @LastEditTime : 2020-02-01 22:24:17
 * @Description: file content
 */
import React from 'react';
import { AsyncStorage } from 'react-native';
import { Card, CardItem, Text, Body, Toast } from 'native-base';

import { busBookAPI, busCancelAPI } from '../conf/api';
import { timetrans } from '../util';

export default class CarInformation extends React.Component {

    subscribeMap = {
      0: '预约',
      1: '取消预约',
      2: '无法预约'
    };

    isButtonMap = {
      0: true,
      1: true,
      2: false,
    };

    state = {
      isSubscribe: this.props.data.passengerMax - this.props.data.subscribeNumber <= 0 ? 2 : this.props.data.isSubscribe,
      name: this.props.data.name,
      type: this.props.data.type,
      status: this.props.data.status,
      departureTime: this.props.data.departureTime,
      remainNumber: this.props.data.passengerMax - this.props.data.subscribeNumber,
      buttonName: this.subscribeMap[this.props.data.isSubscribe],
      isButton: this.isButtonMap[this.props.data.isSubscribe],
    };

    booking = async () => {
      const token = await AsyncStorage.getItem('token');
      fetch(busBookAPI + this.props.data.id, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token,
        }
      }).then(
        response => response.json()
      ).then(
        responseJson => {
          console.log(responseJson);
          if (responseJson.meta.success) {
            console.log(1);
            const data = responseJson.data;
            const isSubscribe1 = data.passengerMax - data.subscribeNumber <= 0 ? 2 : data.isSubscribe;
            const buttonName1 = this.subscribeMap[isSubscribe1];
            const isButton1 = this.isButtonMap[isSubscribe1];
            this.setState(() => ({
              name: data.name,
              type: data.type,
              status: data.status,
              departureTime: data.departureTime,
              remainNumber: data.passengerMax - data.subscribeNumber,
              isSubscribe: isSubscribe1,
              buttonName: buttonName1,
              isButton: isButton1,
            }));
            console.log(this.state);
            Toast.show({
              text: "预约成功",
              buttonText: "了解",
              position: "bottom"
            });
          }
          else {
            Toast.show({
              text: "预约失败",
              buttonText: "了解",
              position: "bottom"
            });
          }
        }
      )
    };

    unbooking = async () => {
      console.log(2);
      const token = await AsyncStorage.getItem('token');
      fetch(busCancelAPI + this.props.data.id, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token,
        }
      }).then(
        response => response.json()
      ).then(
        responseJson => {
          console.log(responseJson);
          if (responseJson.meta.success) {
            console.log(2);
            const data = responseJson.data;
            const isSubscribe1 = data.passengerMax - data.subscribeNumber <= 0 ? 2 : data.isSubscribe;
            const buttonName1 = this.subscribeMap[isSubscribe1];
            const isButton1 = this.isButtonMap[isSubscribe1];
            this.setState(() => ({
              name: data.name,
              type: data.type,
              status: data.status,
              departureTime: data.departureTime,
              remainNumber: data.passengerMax - data.subscribeNumber,
              isSubscribe: isSubscribe1,
              buttonName: buttonName1,
              isButton: isButton1,
            }));
            console.log(this.state);
            Toast.show({
              text: "取消预约成功",
              buttonText: "了解",
              position: "bottom"
            });
          }
          else {
            Toast.show({
              text: "取消预约失败",
              buttonText: "了解",
              position: "bottom"
            });
          }
        }
      )
    };

    render() {
      return (
      <Card>
        <CardItem header bordered>
          <Text>车辆信息</Text>
        </CardItem>
        <CardItem button
          onPress={this.props.carDetial}>
          <Body>
            <Text>班车名称：{this.state.name}</Text>
            <Text>班车类型：{this.state.type}</Text>
            <Text>班车状态：{this.state.status}</Text>
            <Text>发车时间：{timetrans(this.state.departureTime)}</Text>
            <Text>可预约的人数：{this.state.remainNumber}</Text>
          </Body>
        </CardItem>
        <CardItem
          footer
          bordered
          button={this.state.isButton}
          onPress={
            () => {
              if (this.state.isSubscribe === 0) {
                this.booking();
              }
              else if (this.state.isSubscribe === 1) {
                this.unbooking();
              }
            }
          }>
          <Text>{this.state.buttonName}</Text>
        </CardItem>
      </Card>
      );
    }
}
