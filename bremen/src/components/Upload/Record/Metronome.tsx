'use client';

/* eslint-disable no-console */
import React, {Component} from 'react';
import styled from 'styled-components';
import styles from '@/components/Upload/Record/Metronome.module.scss';

const click1 = '/sound/metronome2.wav';
const click2 = '/sound/metronome.mp3';

interface MetronomeState {
  isPlaying: boolean;
  count: number;
  bpm: number;
  numerator: number;
  denominator: number;
  isButtonPressed: boolean;
}

interface ExtendedWindow extends Window {
  webkitAudioContext?: AudioContext;
}

const NowInfo = styled.div<{size: number}>`
  height: ${(props: {size: number}) => `calc(35vw / ${props.size})`};
  width: ${(props: {size: number}) => `calc(35vw / ${props.size})`};
  max-height: 8vh;
  max-width: 8vh;
  border-radius: 50%;
  color: transparent;
  border: 5px solid var(--origin-red-color);
  @media (min-width: 450px) {
    height: ${(props: {size: number}) => `calc(60vw / ${props.size})`};
    width: ${(props: {size: number}) => `calc(60vw / ${props.size})`};
    max-height: 8vh;
    max-width: 8vh;
  }
`;

const TempoInfo = styled.div<{size: number}>`
  height: ${(props: {size: number}) => `calc(35vw / ${props.size})`};
  width: ${(props: {size: number}) => `calc(35vw / ${props.size})`};
  max-height: 8vh;
  max-width: 8vh;
  border-radius: 50%;
  color: transparent;
  border: 5px solid var(--origin-green-color);
  @media (min-width: 450px) {
    height: ${(props: {size: number}) => `calc(60vw / ${props.size})`};
    width: ${(props: {size: number}) => `calc(60vw / ${props.size})`};
    max-height: 8vh;
    max-width: 8vh;
  }
`;

class Metronome extends Component<unknown, MetronomeState> {
  private audioContext: AudioContext | null = null;

  private click1Buffer: AudioBuffer | null = null;

  private click2Buffer: AudioBuffer | null = null;

  private timer: NodeJS.Timeout | null = null;

  constructor(props: unknown) {
    super(props);

    this.state = {
      isPlaying: false,
      count: 0,
      bpm: 100,
      numerator: 4,
      denominator: 4,
      isButtonPressed: false,
    };

    this.audioContext = this.createAudioContext();
    this.loadSounds().catch(error => console.error(error));
  }

  createAudioContext = (): AudioContext | null => {
    if (typeof window !== 'undefined') {
      const AudioContext =
        window.AudioContext || (window as ExtendedWindow).webkitAudioContext;
      return new AudioContext();
    }
    return null;
  };

  loadSounds = async () => {
    console.log('1', click1);
    console.log('2', click2);
    const click1Response = await fetch(click1);
    const click1ArrayBuffer = await click1Response.arrayBuffer();

    this.audioContext!.decodeAudioData(click1ArrayBuffer, buffer => {
      this.click1Buffer = buffer;
    }).catch(error => console.error(error));

    const click2Response = await fetch(click2);
    const click2ArrayBuffer = await click2Response.arrayBuffer();

    this.audioContext!.decodeAudioData(click2ArrayBuffer, buffer => {
      this.click2Buffer = buffer;
    }).catch(error => console.error(error));
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const bpm = parseInt(event.target.value, 10);

    if (this.state.isPlaying) {
      // stop old timer and start a new one
      if (this.timer) clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

      // set the new bpm
      // and reset the beat counter
      this.setState({
        count: 0,
        bpm,
      });
    } else {
      // otherwise, just update the bpm
      this.setState({bpm});
    }
  };

  handleNumeratorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numerator = parseInt(event.target.value, 10);

    if (this.state.isPlaying) {
      // set the new bpm
      // and reset the beat counter
      this.setState({
        count: 0,
        numerator,
      });
    } else {
      // otherwise, just update the bpm
      this.setState({numerator});
    }
  };

  handleDenominatorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const denominator = parseInt(event.target.value, 10);

    if (this.state.isPlaying) {
      // set the new bpm
      // and reset the beat counter
      this.setState({
        count: 0,
        denominator,
      });
    } else {
      // otherwise, just update the bpm
      this.setState({denominator});
    }
  };

  playClick = () => {
    const {count, numerator} = this.state;
    const time = this.audioContext!.currentTime;

    const source = this.audioContext!.createBufferSource();
    source.connect(this.audioContext!.destination);

    // alternate click sounds
    source.buffer =
      (count + 1) % numerator === 0 ? this.click2Buffer! : this.click1Buffer!;

    source.start(time);
    source.stop(time + 0.1); // adjust duration as needed

    // keep track of which beat we're on
    this.setState(state => ({
      count: (state.count + 1) % state.numerator,
    }));
  };

  startStop = () => {
    if (this.state.isPlaying) {
      // stop the timer
      if (this.timer) clearInterval(this.timer);
      this.setState({
        isPlaying: false,
      });
    } else {
      // start a timer with current bpm
      this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
      this.setState(
        {
          count: 0,
          isPlaying: true,
          // play a click immediately (after setState finishes)
        },
        this.playClick,
      );
    }
    this.setState(prevState => ({
      isButtonPressed: !prevState.isButtonPressed, // 버튼 상태를 토글
    }));
  };

  render() {
    const {isPlaying, bpm, numerator, denominator, count, isButtonPressed} =
      this.state;

    return (
      <div>
        <div className={styles.container}>
          <div className={styles.subTitle}>박자</div>
          <div className={styles.secondContainer}>
            <div className={styles.thirdContainer}>
              <div className={styles.content}>
                bpm:
                <input
                  className={styles.inputBpm}
                  type="number"
                  value={bpm}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className={styles.content}>
                박자:
                <input
                  className={styles.inputContent}
                  type="number"
                  value={numerator}
                  onChange={this.handleNumeratorChange}
                />
                /
                <input
                  className={styles.inputContent}
                  type="number"
                  value={denominator}
                  onChange={this.handleDenominatorChange}
                />
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <button
                onClick={this.startStop}
                className={
                  isButtonPressed ? styles.buttonPressed : styles.button
                }
              >
                메트로놈
              </button>
            </div>
          </div>
        </div>
        <div className={styles.metronomeImg}>
          {isPlaying &&
            Array.from({length: numerator}, (_, index) =>
              (index + 1) % numerator === count ? (
                <NowInfo size={numerator} key={index} />
              ) : (
                <TempoInfo size={numerator} key={index} />
              ),
            )}
        </div>
      </div>
    );
  }
}

export default Metronome;
