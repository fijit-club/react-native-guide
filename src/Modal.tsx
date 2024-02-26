import type { LayoutRectangle } from 'react-native';

import { type FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RNHoleView } from 'react-native-hole-view';

import type { IStep } from './types';

type ModalProps = {
  currentStep: IStep | undefined;
  isFirstStep: boolean;
  isLastStep: boolean;
  next: () => void;
  prev: () => void;
  stop: () => void;
  tourKey: string;
  visible: boolean;
};

const Modal: FC<ModalProps> = ({ visible }) => {
  const [layout, setLayout] = useState<LayoutRectangle | null>(null);
  const [containerVisible, setContainerVisible] = useState<boolean>(visible);

  if (!containerVisible) return null;

  return (
    <View pointerEvents="box-none" style={[StyleSheet.absoluteFill, { backgroundColor: 'transparent' }]}>
      <View onLayout={(event) => setLayout(event.nativeEvent.layout)} pointerEvents="box-none" style={styles.container}>
        {layout && containerVisible && (
          <>
            <RNHoleView
              // animation={animation}
              holes={[{ x: 150, y: 390, width: 120, height: 120, borderRadius: 60 }]}
              onAnimationFinished={() => {
                // setAnimation(undefined);
              }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(34,146,231,0.4)',
              }}
            >
              {/* <Video
                source={{ uri: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4' }}
                resizeMode={'contain'}
                style={{ flex: 1 }}
              /> */}
            </RNHoleView>
            {/* {this.renderMask()}
            {this.renderNonInteractionPlaceholder()}
            {this.renderTooltip()} */}
          </>
        )}
      </View>
    </View>
  );
};

export default Modal;

export const Z_INDEX = 100;
// export const MARGIN = 13;
// export const OFFSET_WIDTH = 4;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: Z_INDEX,
  },
  // tooltip: {
  //   position: 'absolute',
  //   paddingHorizontal: 15,
  //   overflow: 'hidden',
  //   width: '100%',
  //   borderRadius: 16,
  //   paddingTop: 24,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   paddingBottom: 16,
  //   zIndex: Z_INDEX - 1,
  // },
  // nonInteractionPlaceholder: {
  //   backgroundColor: 'transparent',
  //   zIndex: Z_INDEX - 2,
  // },
  // tooltipText: {
  //   textAlign: 'center',
  // },
  // tooltipContainer: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'space-around',
  //   width: '80%',
  // },
  // button: {
  //   padding: 10,
  // },
  // buttonText: {
  //   color: '#27ae60',
  // },
  // bottomBar: {
  //   marginTop: 10,
  //   flexDirection: 'row',
  //   justifyContent: 'flex-end',
  // },
  // overlayContainer: {
  //   position: 'absolute',
  //   left: 0,
  //   top: 0,
  //   bottom: 0,
  //   right: 0,
  // },
});
