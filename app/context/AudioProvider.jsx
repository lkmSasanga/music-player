import React, { Component } from 'react'
import { Alert, PermissionsAndroid, Text, View } from 'react-native'
import * as MediaLibrary from 'expo-media-library'

export default class AudioProvider extends Component {


    constructor(props) {
        super(props)
    }

    permissionAlert = () => {
        Alert.alert('Persmission Required', 'This app needs to read audio files!', [{
            text: 'I am ready',
            onPress: () => this.getPermission()

        }, {
            text: 'cancel',
            onPress: () => this.getPermissionAlert()
        }
        ])
    }

    getPermission = async () => {
        // {
        //     "canAskAgain": true,
        //     "expires": "never",
        //     "granted": false,
        //     "status": "undetermined",
        //   }

        const permission = await MediaLibrary.getPermissionsAsync()
        if (permission.granted) {
            // we want to get all the audio files
        }

        if (!permission.granted && permission.canAskAgain) {
            const { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync()
            if (status === 'denied' && canAskAgain) {
                // we are going to display aler that user must allow this persmission to work this app
                this.permissionAlert()
            }

            if (status === 'granted') {
                // we want to get all the audio files
            }

            if (status === 'denied' && !canAskAgain) {
                // we want to display some error to user
            }
        }
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
