import React, { Component } from 'react'
import { Text, View } from 'react-native'
import * as MediaLibrary from 'expo-media-library'

export default class AudioProvider extends Component {
    constructor(props) {
        super(props)
    }

    getPermission = async () => {
        const permission = await MediaLibrary.getPermissionsAsync()
        console.log(permission)
    }

    componentDidMount() {
        getPermission()
    }
    
    render() {
        return (
            <View>
                <Text>textInComponet</Text>
            </View>
        )
    }
}
