import React, { Component } from "react";
import { Text, StyleSheet, View, ScrollView, Dimensions } from "react-native";
import { AudioContext } from "../context/AudioProvider";
import { RecyclerListView, LayoutProvider } from "recyclerlistview";
import AudioListItem from "../components/AudioListItem";
import Screen from "../components/Screen";
import OptionModal from "../components/OptionModal";
import { Audio } from "expo-av";
// import Toast from "react-native-simple-toast";

export default class AudioList extends Component {
  static contextType = AudioContext;

  constructor(props) {
    super(props);
    this.state = {
      optionModalVisible: false,
      playbackObj: null,
      soundObj: null,
      currentAudio: {},
    };

    this.currentItem = {};
  }

  layoutProvider = new LayoutProvider(
    i => "audio",
    (type, dim) => {
      switch (type) {
        case "audio":
          dim.width = Dimensions.get("window").width;
          dim.height = 70;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    }
  );

  handleAudioPress = async audio => {
    // playing audio for the first time
    // console.log(audio);

    // Toast.show(soundObj);

    if (this.state.soundObj === null) {
      const playbackObj = new Audio.Sound();
      const status = await playbackObj.loadAsync(
        { uri: audio.uri },
        { shouldPlay: true }
      );

      return this.setState({
        ...this.state,
        currentAudio: audio,
        playbackObj: playbackObj,
        soundObj: status,
      });
    }

    // pause audio
    if (this.state.soundObj.isLoaded && this.state.soundObj.isPlaying) {
      const status = this.state.playbackObj.setStatusAsync({
        shouldPlay: false,
      });
      return this.setState({
        ...this.state,
        soundObj: status,
      });
    }

    console.log("current audio id", this.state.currentAudio.id);
    console.log("audio id", audio.id);

    // resume audio
    if (
      this.state.soundObj.isLoaded &&
      !this.state.soundObj.isPlaying &&
      this.state.currentAudio.id === audio.id
    ) {
      const status = await this.state.playbackObj.playAsync();
      console.log(status);

      return this.setState({
        ...this.state,
        soundObj: status,
      });
    }
  };

  rowRenderer = (type, item) => {
    return (
      <AudioListItem
        title={item.filename}
        duration={item.duration}
        onAudioPress={() => this.handleAudioPress(item)}
        onOptionPress={() => {
          this.currentItem = item;
          this.setState({ ...this.state, optionModalVisible: true });
        }}
      />
    );
  };
  render() {
    return (
      <AudioContext.Consumer>
        {({ dataProvider }) => {
          return (
            <Screen>
              <RecyclerListView
                dataProvider={dataProvider}
                layoutProvider={this.layoutProvider}
                rowRenderer={this.rowRenderer}
              />
              <OptionModal
                onPlayPress={() => console.log("Playing audio")}
                onPlayListPress={() => console.log("Added to playlist")}
                currentItem={this.currentItem}
                onClose={() => {
                  this.setState({ ...this.state, optionModalVisible: false });
                }}
                visible={this.state.optionModalVisible}
              />
            </Screen>
          );
        }}
      </AudioContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
