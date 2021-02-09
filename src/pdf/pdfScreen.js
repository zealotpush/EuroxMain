import React, {useState,useEffect} from 'react';
import {StyleSheet, Dimensions, View, Modal, Alert,Text,TouchableHighlight} from 'react-native';
import Pdf from 'react-native-pdf';

const PdfScreen = ({ visible, pdfUrl, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false)
  useEffect(() => {
    setModalVisible(visible)
  },[visible])
  const source = {
    uri: pdfUrl,
    cache: true,
  };
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={()=>{
          setModalVisible(!modalVisible);
        }}
      >
        <Pdf
          source={source}
          onError={(error) => {
            Alert.alert('PDF View', `잘못된 형식의 PDF문서입니다. \n메인화면으로 돌아갑니다.`, 
            [
              {
                text: "확인",
                onPress: () => navigation.navigate('homeScreen')
              }
            ]);
          }}
          style={styles.pdf}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default PdfScreen