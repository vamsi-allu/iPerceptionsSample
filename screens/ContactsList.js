import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  Text,
} from 'react-native';
import Segment from '../components/Segment';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import { Iperceptions }  from '../screens/Helpers/IPerceptions';
import { WebView } from 'react-native-webview';

const ContactsList = (props) => {
  const contactsReduced = useSelector((state) => {
    return state.contactsList.contacts;
  });
  const [mount, setMount] = useState(false);
  let iPerceptionsSinglePageSurveyURL = 'https://ips-invite.iperceptions.com/webValidator.aspx?sdfc=355b766d-129871-c733c77b-141a-42d7-be9f-2e52b426622b&lID=1&source=102226';
    
  useEffect(() => {
    if (!mount) {
      setMount(true);
      props.navigation.addListener('didFocus', onScreenFocus);
    }
  }, [mount, onScreenFocus, props.navigation]);

  const onScreenFocus = useCallback(() => {
    let initialValues = new Array(contactsReduced.length);
    for (var i = 0; i < contactsReduced.length; i++) {
      initialValues[i] = false;
    }
  }, [contactsReduced]);

  const initIperceptions = () => {
    let iPerceptionsApiKey = 'EF6177E6-A195-4FC1-9B32-7636466E19B5';
    Iperceptions.initialize(iPerceptionsApiKey);
  }

  const sanitizeMetadataFieldValue = (value: any) => {
    return value && `${value}`.split(' ').join('_');
  }

  const getFeedback = async () => {
    const urlVariables = {
        hv1: `LOB~${(sanitizeMetadataFieldValue('MNR'))}`,
        hv2: `appVersion~${sanitizeMetadataFieldValue('Sample-App-01')}`,
        hv3: `HSID~${sanitizeMetadataFieldValue('427b2b7e-1010-467c-9f75-e4dc6e583c9b')}`,
        hv4: `RID~${sanitizeMetadataFieldValue('f6e6aa58-27d6-4b6f-8cf1-bbb4133bc504')}`,
        hv5: `UUID~${sanitizeMetadataFieldValue('115298106')}`,
        hv6: `employerInfo~${sanitizeMetadataFieldValue('Rally_Health_Employees')}`,
        hv7: `policyNumber~${sanitizeMetadataFieldValue('915788')}`,
        hv8: `productType~${sanitizeMetadataFieldValue('M-D-V')}`,
        hv9: `planTenure~${sanitizeMetadataFieldValue(
          'ACTIVE',
        )}`,
        hv10: `memberType~${sanitizeMetadataFieldValue(
          'PUBLIC_EXCHANGE',
        )}`,
        hv11: `clientId~${sanitizeMetadataFieldValue('903033')}`,
      };

  urlVariables.hv12 = `Environment~local`;
  urlVariables.hv13 = sanitizeMetadataFieldValue(
    `adobe_mc=MCMID~1234234334`,
  );
  urlVariables.hv14 = sanitizeMetadataFieldValue(
    `featureName~LOB`,
  );

  
  Object.keys(urlVariables).forEach(key => {
    iPerceptionsSinglePageSurveyURL = `${iPerceptionsSinglePageSurveyURL}&${key}=${
        urlVariables[key]
    }`;
  });

  props.navigation.navigate('WebScreen', {
    itemId: iPerceptionsSinglePageSurveyURL,
  });
  
   
};

  const triggerIperceptionsSurvey = () => {
    const urlVariables = {
      hv1: `LOB~${(sanitizeMetadataFieldValue('MNR'))}`,
      hv2: `appVersion~${sanitizeMetadataFieldValue('Sample-App-01')}`,
      hv3: `HSID~${sanitizeMetadataFieldValue('427b2b7e-1010-467c-9f75-e4dc6e583c9b')}`,
      hv4: `RID~${sanitizeMetadataFieldValue('f6e6aa58-27d6-4b6f-8cf1-bbb4133bc504')}`,
      hv5: `UUID~${sanitizeMetadataFieldValue('115298106')}`,
      hv6: `employerInfo~${sanitizeMetadataFieldValue('Rally_Health_Employees')}`,
      hv7: `policyNumber~${sanitizeMetadataFieldValue('915788')}`,
      hv8: `productType~${sanitizeMetadataFieldValue('M-D-V')}`,
      hv9: `planTenure~${sanitizeMetadataFieldValue(
        'ACTIVE',
      )}`,
      hv10: `memberType~${sanitizeMetadataFieldValue(
        'PUBLIC_EXCHANGE',
      )}`,
      hv11: `clientId~${sanitizeMetadataFieldValue('903033')}`,
    };
    Iperceptions.triggerSurvey(urlVariables, 'test', 'MNR');
  }

  return (
    <ScrollView style={styles.screen}>
      <StatusBar backgroundColor="#3b5998" />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={contactsReduced}
        renderItem={(itemData) => (
          <View style={styles.segmentCotainer}>
            <TouchableOpacity
              style={styles.touchableContainer}
              onPress={() => {
                props.navigation.navigate('Details', {
                  itemId: itemData.item.link,
                });
              }}>
              <Segment data={itemData} />
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.buttonContainer}>
      {/* <TouchableOpacity
              style={styles.buttonDeleteContainer}
              onPress={() => {
                Iperceptions.clearCache();
              }}>
              <Text style={styles.buttonColor}>Clear Cache</Text>
      </TouchableOpacity>
      <TouchableOpacity
              style={styles.buttonDeleteContainer}
              onPress={initIperceptions}>
              <Text style={styles.buttonColor}>Init Survey</Text>
      </TouchableOpacity>
      <TouchableOpacity
              style={styles.buttonDeleteContainer}
              onPress={triggerIperceptionsSurvey}>
              <Text style={styles.buttonColor}>Trigger Survey</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
            style={styles.buttonDeleteContainer}
            onPress={getFeedback}>
            <Text style={styles.buttonColor}>Feedback</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
    left: 100
  },
  touchableContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 80,
  },
  segmentCotainer: {
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    paddingRight: 30,
    paddingLeft: 20,
  },
  buttonDeleteContainer: {
    marginTop: 15,
    backgroundColor: '#3b5998',
    minWidth: '90%',
    marginBottom: 15,
    justifyContent: 'space-evenly',
    alignItems: "center",
  },
  buttonColor: {
    color: 'white',
    paddingBottom: 15,
    paddingTop: 15,
  },
});

export default ContactsList;
