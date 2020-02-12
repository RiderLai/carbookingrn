/*
 * @Author: Rider
 * @Date: 2020-02-02 15:06:24
 * @LastEditors  : Rider
 * @LastEditTime : 2020-02-03 15:33:41
 * @Description: file content
 */
import React from 'react';
import { AsyncStorage } from 'react-native';
import { Card, CardItem, Text, Body, Toast } from 'native-base';

import { busDepartAPI, busArriveAPI } from '../conf/api';
import { timetrans } from '../util';

export default class DriveCarInformation extends React.Component {

	buttonText = {
		0: '发车',
		1: '到站',
	};

	state = {
		controlState: this.props.data.controlState,
		buttonText: this.buttonText[this.props.data.controlState],
	};

	_depart = async () => {
		console.log(busDepartAPI + this.props.data.id);
		const token = await AsyncStorage.getItem('token');
		fetch(busDepartAPI + this.props.data.id, {
			method: 'POST',
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
					const buttonText1 = this.buttonText[data.controlState];
					this.setState( () => ({
						controlState: data.controlState,
						buttonText: buttonText1,
					}) );
					Toast.show({
						text: "发车成功",
						buttonText: "了解",
						position: "bottom"
					});
				}
				else {
					Toast.show({
						text: "发车失败",
						buttonText: "了解",
						position: "bottom"
					});
				}
			}
		)
	};

	_arrive = async () => {
		const token = await AsyncStorage.getItem('token');
		fetch(busArriveAPI + this.props.data.id, {
			method: 'POST',
			headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      }
		}).then(
			resopnse => resopnse.json()
		).then(
			responseJson => {
				if (responseJson.meta.success) {
					const data = responseJson.data;
					const buttonText1 = this.buttonText[data.controlState];
					this.setState( () => ({
						controlState: data.controlState,
						buttonText: buttonText1,
					}) );
					Toast.show({
						text: "到站成功",
						buttonText: "了解",
						position: "bottom"
					});
				}
				else {
					Toast.show({
						text: "到站失败",
						buttonText: "了解",
						position: "bottom"
					});
				}
			}
		)
	};
    
  render() {
    return (
			<Card
				style={{
					marginLeft: 10,
					marginRight: 10,
				}}>
					<CardItem header>
						<Text>
							班车信息
						</Text>
					</CardItem>
					<CardItem>
						<Body>
							<Text>
								班车名: {this.props.data.name}
							</Text>
							<Text>
								车牌: {this.props.data.licence}
							</Text>
							<Text>
								发车时间: {timetrans(this.props.data.departureTime)}
							</Text>
							<Text>
								可做总人数: {this.props.data.passengerMax}
							</Text>
							<Text>
								已经预约的人数: {this.props.data.subscribeNumber}
							</Text>
							<Text>
								剩余人数: {this.props.data.passengerMax - this.props.data.subscribeNumber}
							</Text>
						</Body>
					</CardItem>
					<CardItem
						footer
						bordered
						button
						onPress={() => {
							if (this.state.controlState === 0) {
								this._depart();
							}
							else if (this.state.controlState === 1) {
								this._arrive();
							}
						}}>
						<Text>{this.state.buttonText}</Text>
					</CardItem>
				</Card>
      );
    }
}