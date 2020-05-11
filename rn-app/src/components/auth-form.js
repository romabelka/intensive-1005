import React, { Component } from 'react'
import {View, StyleSheet, Text, TextInput} from 'react-native'
import {observer} from 'mobx-react'
import authStore from '../stores/auth'
import PasswordValidation from "./password-validation";

@observer
class AuthForm extends Component {
    static propTypes = {

    };

    render() {
        return (
            <View>
                <Text>Email:</Text>
                <TextInput value={authStore.email}
                           onChangeText={authStore.setEmail}/>
                <Text>Password:</Text>
                <TextInput value={authStore.password}
                           onChangeText={authStore.setPassword}
                           secureTextEntry
                />
                <PasswordValidation />
            </View>
        )
    }
}

const styles = StyleSheet.create({
})

export default AuthForm
