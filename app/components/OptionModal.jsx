import React from "react";
import { StyleSheet, Modal, View, StatusBar, Text } from "react-native";
import color from "../misc/color";

const OptionModal = ({ visible }) => {
  return (
    <>
      <StatusBar hidden />
      <Modal transparent={true} visible={visible}>
        <View style={styles.modal}>
          <Text style={styles.title} numberOfLines={2}>
            Dynamic Title of our audio Dynamic Title of our audioDynamic Title
            of our audioDynamic Title of our audioDynamic Title of our audio
          </Text>
          <View style={styles.optionContainer}>
            <Text style={styles.option}>Play</Text>
            <Text style={styles.option}>Add to PlayList</Text>
          </View>
        </View>
        <View style={styles.modalBG} />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: color.APP_BG,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 10,
  },
  optionContainer: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 20,
    paddingBottom: 0,
    color: color.FONT_MEDIUM,
  },
  option: {
    fontSize: 16,
    fontWeight: "bold",
    color: color.FONT,
    paddingVertical: 10,
    letterSpacing: 0.1,
  },
  modalBG: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: color.MODAL_BG,
  },
});

export default OptionModal;
