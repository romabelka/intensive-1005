import React, { Component } from 'react'
import {Text, View, StyleSheet} from 'react-native'

class EventList extends Component {
    static propTypes = {

    };

    render() {
        return (
            <View>
                <Text>Event 1</Text>
                <Text>Event 2</Text>
                <Text>Event 3</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
})

export default EventList
