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
    <TourGuideProvider {...{ borderRadius: 16 }}>
      <AppContent />
    </TourGuideProvider>
  )
}

const AppContent = () => {
  const iconProps = { size: 40, color: '#888' }

  // Use Hooks to control!
  const {
    canStart, // a boolean indicate if you can start tour guide
    start, // a function to start the tourguide
    stop, // a function  to stopping it
  } = useTourGuideController()

  // Can start at mount 🎉
  // you need to wait until everything is registered 😁
  React.useEffect(() => {
    if (canStart) {
      // 👈 test if you can start otherwise nothing will happen
      start(2)
    }
  }, [canStart]) // 👈 don't miss it!

  return (
    <View style={styles.container}>
      {/* Use TourGuideZone only to wrap your component */}
      <TourGuideZone
        zone={2}
        text={'A react-native-copilot remastered! 🎉'}
        borderRadius={16}
      >
        <Text style={styles.title}>
          {'Welcome to the demo of\n"react-native-guide"'}
        </Text>
      </TourGuideZone>
      <View style={styles.middleView}>
        <TouchableOpacity style={styles.button} onPress={() => start()}>
          <Text style={styles.buttonText}>START THE TUTORIAL!</Text>
        </TouchableOpacity>

        <TourGuideZone zone={3} shape={'rectangle_and_keep'}>
          <TouchableOpacity style={styles.button} onPress={() => start(4)}>
            <Text style={styles.buttonText}>Step 4</Text>
          </TouchableOpacity>
        </TourGuideZone>
        <TouchableOpacity style={styles.button} onPress={() => start(2)}>
          <Text style={styles.buttonText}>Step 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={stop}>
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
        <TourGuideZone
          zone={1}
          text={'With animated SVG morphing with awesome flubber 🍮💯'}
          isActive={false} // Inactive
        >
          <Image source={{ uri }} style={styles.profilePhoto} />
        </TourGuideZone>
      </View>
      <View style={styles.row}>
        <TourGuideZone zone={4}>
          <Ionicons name='contact' {...iconProps} />
        </TourGuideZone>
        <Ionicons name='chatbubbles' {...iconProps} />
        <Ionicons name='globe' {...iconProps} />
        <TourGuideZone zone={5}>
          <Ionicons name='navigate' {...iconProps} />
        </TourGuideZone>
        <TourGuideZone zone={6}>
          <Ionicons name='rainy' {...iconProps} />
        </TourGuideZone>
      </View>
    </View>
  )
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
