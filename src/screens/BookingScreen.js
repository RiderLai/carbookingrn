/*
 * @Author: Rider
 * @Date: 2020-01-30 16:05:56
 * @LastEditors  : Rider
 * @LastEditTime : 2020-02-02 17:52:16
 * @Description: file content
 */
import React from 'react';
import { StatusBar, Platform, AsyncStorage, RefreshControl } from 'react-native';
import { Root, Container, Header, Content } from 'native-base';

import CarInformation from '../components/CarInformation';

import { busBookingAPI } from '../conf/api';

class BookingScreen extends React.Component {
	
	state = {
		data: [],
		length: 0,
		refreshing: false,
	};

	_data_init = async () => {
		const token = await AsyncStorage.getItem('token');
		fetch(busBookingAPI, {
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
					this.setState( () => ({
            length: -1,
					}));
					this.setState( () => ({
            data: responseJson.data,
            length: responseJson.data.length,
					}));
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
	
  async	componentDidMount() {
		await this._data_init();
	}
  
  _cardShow() {
    let cards = [];
    for (let i=0; i < this.state.length; i++){
      cards.push(
				<CarInformation
					key={i}
					carDetial={() => this.props.navigation.navigate('CarDetial', {id: this.state.data[i].id})}
					data={this.state.data[i]}
					>
				</CarInformation> );
    }
    return cards;
	}
	
  render() {
    return (
			<Root>
				<Container>
					<Content
						style={{ marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 25 }}
						refreshControl={
							<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={this._on_refresh}
							/>
						}>
						<StatusBar backgroundColor='transparent' translucent barStyle={'dark-content'} />
						{this._cardShow()}
					</Content>
				</Container>
			</Root>
    )
  }
}

export default BookingScreen;