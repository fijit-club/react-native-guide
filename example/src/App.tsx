import { Ionicons } from '@expo/vector-icons';
import { type FC, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TourGuideModal, TourGuideZone, useTourGuide } from 'react-native-guide';

const AppContent = () => {
  const { start, canStart, stop } = useTourGuide();

  useEffect(() => {
    if (canStart) start(3);
  }, [canStart, start]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TourGuideZone index={6}>
          <Text style={styles.title}>
            Welcome to the demo of
            {'\n'}
            react-native-guide
          </Text>
        </TourGuideZone>

        <View style={styles.middleView}>
          <TouchableOpacity onPress={() => start(2)} style={styles.button}>
            <Text style={styles.buttonText}>START THE TUTORIAL!</Text>
          </TouchableOpacity>

          <TourGuideZone holeStyle={{ paddingHorizontal: 0, paddingVertical: 0, borderRadius: 0 }} index={3}>
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
          <TourGuideZone index={7}>
            <Image
              source={{ uri: 'https://avatars.githubusercontent.com/u/63250453?v=4' }}
              style={styles.profilePhoto}
            />
          </TourGuideZone>
        </View>
        <View style={styles.row}>
          <TourGuideZone index={4}>
            <Ionicons color="#888" name="add-circle" size={40} />
          </TourGuideZone>
          <Ionicons color="#888" name="chatbubbles" size={40} />
          <Ionicons color="#888" name="globe" size={40} />
          <TourGuideZone index={5}>
            <Ionicons color="#888" name="navigate" size={40} />
          </TourGuideZone>
          <TourGuideZone index={2}>
            <Ionicons color="#888" name="rainy" size={40} />
          </TourGuideZone>
        </View>
      </View>
    </ScrollView>
  );
};

const App: FC = () => {
  return (
    <>
      <AppContent />
      <TourGuideModal
        backdropColor="#000000de"
        holeStyle={{ paddingHorizontal: 32, paddingVertical: 16, borderRadius: 16 }}
        // tooltipContainerStyle={{ pointerEvents: 'none' }}
      />
    </>
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
