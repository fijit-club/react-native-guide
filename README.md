# react-native-guide

react native guide

## Installation

```sh
yarn add react-native-guide react-native-hole-view react-native-reanimated
```

## Usage

```tsx
import {
  TourGuideProvider, // Main provider
  TourGuideZone, // Main wrapper of highlight component
  useTourGuideController, // hook to start, etc.
} from 'react-native-guide'

// Add <TourGuideProvider/> at the root of you app!
function App() {
  return (
    <TourGuideProvider backdropColor="#000000de" holeStyle={{ paddingX: 32, paddingY: 16, borderRadius: 16 }}>
      <AppContent />
    </TourGuideProvider>
  )
}

const AppContent = () => {
  const { start, canStart, stop } = useTourGuide();

  useEffect(() => {
    if (canStart) start(2);
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

          <TourGuideZone holeStyle={{ paddingX: 0, paddingY: 0, borderRadius: 0 }} index={3}>
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
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
