/* eslint-disable react-native/no-color-literals */
import { Ionicons } from '@expo/vector-icons';
import { TourGuideProvider, TourGuideZone, useTourGuideController } from '@fijit-club/rn-tourguide';
import { type FC, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const uri = 'https://pbs.twimg.com/profile_images/1223192265969016833/U8AX9Lfn_400x400.jpg';

const AppContent = () => {
  const iconProps = { size: 40, color: '#888' };
  const { start, canStart, stop } = useTourGuideController();

  useEffect(() => {
    if (canStart) start(1);
  }, [canStart, start]);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="always"
      scrollEventThrottle={16}
    >
      <View style={styles.container}>
        <TourGuideZone zone={6}>
          <Text style={styles.title}>{'Welcome to the demo of\n"rn-tourguide"'}</Text>
        </TourGuideZone>
        <View style={styles.middleView}>
          <TouchableOpacity onPress={() => start(2)} style={styles.button}>
            <Text style={styles.buttonText}>START THE TUTORIAL!</Text>
          </TouchableOpacity>

          <TourGuideZone zone={3}>
            <TouchableOpacity onPress={() => start(4)} style={styles.button}>
              <Text style={styles.buttonText}>Step 4</Text>
            </TouchableOpacity>
          </TourGuideZone>
          <TouchableOpacity onPress={() => start(2)} style={styles.button}>
            <Text style={styles.buttonText}>Step 2</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={stop} style={styles.button}>
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
          <TourGuideZone zone={7}>
            <Image source={{ uri }} style={styles.profilePhoto} />
          </TourGuideZone>
        </View>
        <View style={styles.row}>
          <TourGuideZone zone={4}>
            <Ionicons name="add-circle" {...iconProps} />
          </TourGuideZone>
          <Ionicons name="chatbubbles" {...iconProps} />
          <Ionicons name="globe" {...iconProps} />
          <TourGuideZone zone={5}>
            <Ionicons name="navigate" {...iconProps} />
          </TourGuideZone>
          <TourGuideZone zone={2}>
            <Ionicons name="rainy" {...iconProps} />
          </TourGuideZone>
        </View>
        {/* {Platform.OS !== 'web' ?
          <TourGuideZoneByPosition height={64} isTourGuide left={50} shape={'circle'} top={250} width={64} zone={1} />
        : null} */}
      </View>
    </ScrollView>
  );
};

const App: FC = () => {
  return (
    <TourGuideProvider>
      <AppContent />
    </TourGuideProvider>
  );
};
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    marginTop: 60,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  profilePhoto: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginVertical: 20,
  },
  middleView: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2980b9',
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  row: {
    width: '100%',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default App;
