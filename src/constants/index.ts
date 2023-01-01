import { IS_PRODUCTION } from 'constants/configs';

export const OTHER_STORES = ['fortnite.com/android'];
export const PLAY_STORE_HOST = 'play.google.com';
export const APP_STORE_HOST = ['itunes.apple.com', 'apps.apple.com'];

export const INTERNAL_SERVER_ERROR_MESSAGE =
  'Something went wrong, please connect with administrator support@trymyui.com';

export const STORE_HOSTS = ['play.google.com', 'itunes.apple.com', 'apps.apple.com'];

export const CAMPAIGN_FREE_CREDITS = {
  TryMyUI4UXPA0: 100,
  TryMyUI4UXPA1: 100,
  TryMyUI4UXPA3: 100,
  TryMyUI4UXPA4: 100,
  TryMyUI4UXPA5: 100,
  TryMyUI4UXPA6: 100,
  TryMyUI4UXPA7: 100,
  TryMyUI4UXPA8: 100,
  TryMyUI4UXPA9: 100,
};

export const NUM_WORKERS_NOTIFIED_PER_TEST = 60;

export const DEMOGRAPHIC_FIELDS = [
  'gender',
  'country',
  'state',
  'income',
  'education',
  'employmentStatus',
  'employmentType',
  'familyStatus',
  'childrenStatus',
  'communityType',
  'socialNetworksUsage',
  'subRegion',
];

export const RECORDER_LAST_UPDATED_ON = new Date('Feb 12, 2020');
export const IOS_APP_LAST_UPDATED_ON = new Date('Jun 2, 2021');
export const ANDROID_APP_LAST_UPDATED_ON = new Date('Sept 13, 2021');

export const MTURK = IS_PRODUCTION ? 'https://www.mturk.com' : 'https://workersandbox.mturk.com';

export const PAYMENT_MOD_TESTER_IN_DOLLARS = {
  20: 15,
  30: 20,
  45: 25,
  60: 30,
  all_conditions: 20,
};

export const customTimeHash = [
  { time: 60, values: [475257, 402463, 'mathieu@neptunecigar.com'] },
  { time: 45, values: ['sara@clearworks.net'] },
];

// in dollars
export const WORKER_REFERRAL_FEE = 2.0;
export const WORKER_PAYMENT_STANDARD_TEST = 10.0;
export const WORKER_PAYMENT_MOBILE_TEST = 10.0;
export const GRADER_PAYMENT_QUAL_TEST = 10.0;
export const GRADER_PAYMENT_ACTUAL_TEST = 10.0;

export const PAGINATION_MAX_LIMIT = 255;

export const SET_NULL = 'SET NULL';
export const CASCADE = 'CASCADE';

export const DEFAULT_SCOPE = 'defaultScope';
