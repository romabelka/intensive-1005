import React, { Component } from 'react'
import {View, StyleSheet, Text, TextInput} from 'react-native'
import {observable} from 'mobx'
import {observer} from 'mobx-react'

@observer
class AuthForm extends Component {
    static propTypes = {

    };

    @observable email = ''
    @observable password = ''

    handleEmailChange = email => this.email = email
    handlePasswordChange = password => this.password = password

    render() {
        return (
            <View>
                <Text>Email:</Text>
                <TextInput value={this.email}
                           onChangeText={this.handleEmailChange}/>
                <Text>Password:</Text>
                <TextInput value={this.password}
                           onChangeText={this.handlePasswordChange}
                           secureTextEntry
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
})

export default AuthForm
