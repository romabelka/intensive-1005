import React, { Component } from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {observer} from "mobx-react";
import authStore from '../stores/auth'

@observer
class PasswordValidation extends Component {
    static propTypes = {

    };

    render() {
        return (
            <View>
                <Text>{authStore.isValidPassword ? 'True' : 'False'}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
})

export default PasswordValidation
