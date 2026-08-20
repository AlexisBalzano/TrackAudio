export type AlwaysOnTopMode = 'never' | 'always' | 'inMiniMode';
export type RadioEffects = 'on' | 'input' | 'output' | 'off';
export type StyleTheme = 'default' | 'dark';
// Levelling applied to incoming station audio. 'agc' is the historical
// behaviour and adds no latency; 'normalize' matches transmissions properly but
// delays received audio by the configured lookahead.
export type IncomingLevelling = 'off' | 'agc' | 'normalize';
export type NormalizerLatency = 'low' | 'normal' | 'accurate';

export interface Configuration {
  version?: number;

  audioApi: number;
  audioInputDeviceId: string;
  headsetOutputDeviceId: string;
  speakerOutputDeviceId: string;

  cid: string;
  password: string;
  callsign: string;

  hardwareType: number;
  mainRadioVolume: number;

  // Boolean is the prior type for this property, AlwaysOnTopMode is the updated type.
  alwaysOnTop: boolean | AlwaysOnTopMode;
  radioEffects: RadioEffects;

  showExpandedRx: boolean;
  transparentMiniMode: boolean;

  styleTheme: StyleTheme;

  incomingLevelling: IncomingLevelling;
  normalizerTargetLufs: number;
  normalizerLatency: NormalizerLatency;

  radioToMaxVolumeOnTx: boolean;

  pttReleaseSoundEnabled: boolean;

  loopbackEnabled: boolean;
  loopbackTarget: number;
  loopbackGain: number;

  microphoneGain: number;

  updateChannel: string;
}
