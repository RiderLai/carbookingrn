/*
 * @Author: Rider
 * @Date: 2020-02-02 13:51:33
 * @LastEditors  : Rider
 * @LastEditTime : 2020-02-02 17:52:44
 * @Description: file content
 */
import React from 'react';
import { StatusBar, Platform, AsyncStorage, RefreshControl } from 'react-native';
import { Root, Container, Header, Content, Text, Button, Card, CardItem, Body } from 'native-base';

import DriveCarInformation from '../components/DriveCarInformation'

import { driveAPI } from '../conf/api';

export default class DriveScreen extends React.Component {

	state = {
		data: [],
		length: 0,
		refreshing: false,
	}

  _data_init = async () => {
		const token = await AsyncStorage.getItem('token');
		fetch(driveAPI, {
			method: 'GET',
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
					this.setState( () => ({
						length: -1,
					}) );
					this.setState( () => ({
						data: responseJson.data,
						length: responseJson.data.length,
					}) );
				}
				else {
					this.props.navigation.navigate('Login');
				}
			}
		);
	};

	_on_refresh = async () => {
		this.setState(() => ({
			refreshing: true,
		}));
		await this._data_init();
		this.setState(() => ({
			refreshing: false,
		}));
	};

	async componentDidMount() {
	  await	this._data_init();
	}

	_driveCarShow() {
		let data = [];
		for (let i=0; i < this.state.length; i++) {
			data.push(
				<DriveCarInformation
					key={i}
					data={this.state.data[i]}>
				</DriveCarInformation>
			);
		}
		return data;
	}

  render() {
    return (
      <Root>
        <Container>
					<Content
						style={{
							marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 25,
						}}
						refreshControl={
							<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={this._on_refresh}
							/>
						}>
						<StatusBar backgroundColor='transparent' translucent barStyle={'dark-content'} />
						{this._driveCarShow()}
					</Content>
				</Container>
      </Root>
    );
        
  }
}