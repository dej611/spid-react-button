export const DEFAULT_TRANSITION_TIME = 2000;
export const BUTTON_DELAY_TIME = 1.1;
export const DELAY_STEP = 0.1;

export const possibleStates = {
  INIT: { type: 'init' },
  ENTERING: { type: 'entering' },
  ENTERED: { type: 'entered' },
  EXITING: { type: 'exiting' },
  EXITED: { type: 'exited' }
} as const;

export const panelAnimClass = 'spid-button-panel-anim';
export const logoAnimationOutClass = 'spid-button-logo-animation-out';
export const emptyClass = '';
export const buttonIconAnimationClass = 'spid-button-icon-animation';

export const sizeMapping = {
  sm: 'small',
  md: 'medium',
  l: 'large'
};
