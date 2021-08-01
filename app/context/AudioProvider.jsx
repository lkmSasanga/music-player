import React, { Component, createContext } from "react";
import { Alert, PermissionsAndroid, Text, View } from "react-native";
import * as MediaLibrary from "expo-media-library";

export const AudioContext = createContext();
export default class AudioProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audioFiles: [],
    };
  }

  permissionAlert = () => {
    Alert.alert("Persmission Required", "This app needs to read audio files!", [
      {
        text: "I am ready",
        onPress: () => this.getPermission(),
      },
      {
        text: "cancel",
        onPress: () => this.getPermissionAlert(),
      },
    ]);
  };

  getAudioFiles = async () => {
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
    });
    media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
      first: media.totalCount,
    });

    this.setState({ ...this.state, audioFiles: media.assets });
  };

  getPermission = async () => {
    // {
    //     "canAskAgain": true,
    //     "expires": "never",
    //     "granted": false,
    //     "status": "undetermined",
    //   }

    const permission = await MediaLibrary.getPermissionsAsync();
    if (permission.granted) {
      // we want to get all the audio files
      this.getAudioFiles();
    }

    if (!permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();
      if (status === "denied" && canAskAgain) {
        // we are going to display aler that user must allow this persmission to work this app
        this.permissionAlert();
      }

      if (status === "granted") {
        // we want to get all the audio files
        this.getAudioFiles();
      }

      if (status === "denied" && !canAskAgain) {
        // we want to display some error to user
      }
    }
  };

  componentDidMount() {
    this.getPermission();
  }

  render() {
    return (
      <AudioContext.Provider value={{ audioFiles: this.state.audioFiles }}>
        {this.props.children}
      </AudioContext.Provider>
    );
  }
}
