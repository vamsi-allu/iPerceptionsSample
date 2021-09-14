// @flow
import {
    Platform,
    DeviceEventEmitter,
    NativeEventEmitter,
    NativeModules,
  } from 'react-native';
  
  export const { Iperceptions } = NativeModules;
  export const SDKEventEmitter = Platform.select({
    ios: new NativeEventEmitter(Iperceptions),
    android: DeviceEventEmitter,
  });
  