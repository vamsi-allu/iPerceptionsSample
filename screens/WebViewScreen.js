import React from 'react';
import { WebView } from 'react-native-webview';
import { Image, TouchableOpacity, SafeAreaView } from 'react-native';
import cross from '../images/crossIcon.png';

const WebViewScreen = (props) => {
  const iPerceptionsSinglePageSurveyURL = props.navigation.state.params.itemId;

  const closeWebView = () => {
    props.navigation.goBack();
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity onPress={closeWebView}>
        <Image
          source={cross}
          style={{ width: 20, height: 20, margin: 10 }}
        />
      </TouchableOpacity>
      <WebView source={{ uri: iPerceptionsSinglePageSurveyURL }}
        title='feedBack Survey' />
    </SafeAreaView>
  );
}

export default WebViewScreen;