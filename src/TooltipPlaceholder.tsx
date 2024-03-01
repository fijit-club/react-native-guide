import type { FC, PropsWithChildren } from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import useTourGuide from './useTourGuide';

const Button: FC<PropsWithChildren<{ text: string }>> = ({ text }) => (
  <View style={styles.button}>
    <Text style={styles.buttonText}>{text}</Text>
  </View>
);

const TooltipPlaceholder: FC = () => {
  const { currentStep, next, prev, stop, isFirstStep, isLastStep } = useTourGuide();

  if (!currentStep) return null;

  return (
    <View
      style={{
        borderRadius: 16,
        paddingTop: 24,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 16,
        width: '80%',
        backgroundColor: '#ffffffef',
      }}
    >
      <View style={styles.tooltipContainer}>
        <Text style={styles.tooltipText} testID="stepDescription">
          {currentStep.index}
        </Text>
      </View>
      <View style={styles.bottomBar}>
        {!isLastStep ?
          <TouchableOpacity onPress={stop}>
            <Button text="Skip" />
          </TouchableOpacity>
        : null}
        {!isFirstStep ?
          <TouchableOpacity onPress={prev}>
            <Button text="Previous" />
          </TouchableOpacity>
        : null}
        {!isLastStep ?
          <TouchableOpacity onPress={next}>
            <Button text="Next" />
          </TouchableOpacity>
        : <TouchableOpacity onPress={stop}>
            <Button text="Finish" />
          </TouchableOpacity>
        }
      </View>
    </View>
  );
};

export default TooltipPlaceholder;

const styles = StyleSheet.create({
  tooltipText: {
    textAlign: 'center',
  },
  tooltipContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '80%',
  },
  button: {
    padding: 10,
  },
  buttonText: {
    color: '#27ae60',
  },
  bottomBar: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
