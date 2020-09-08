import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <Text style={styles.title}>สมาชิกหมายเลข  230</Text>
      <Text style={styles.title}>พลเอก นิพัฒน์ บุณยรัตพันธุ์ </Text>

<Text style={styles.title}>หมายเลขฌาปนกิจ 0000000230 </Text>


      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
