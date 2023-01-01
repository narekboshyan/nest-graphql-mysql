import * as crypto from 'crypto';
import { Sequelize } from 'sequelize';

import { ENCRYPTION_OPTIONS } from 'constants/configs';
import { CAMPAIGN_FREE_CREDITS } from 'constants/index';

// export const generateDateCondition = (
//   column: any,
//   filterDate: {},
// ): { query: string; parameters: object } => {
//   const obj = {
//     query: '',
//     parameters: {},
//   };

//   if (filterDate.type === 'range' && typeof filterDate.date !== 'string') {
//     obj.query = ` AND date(${column}) between :from and :to `;
//     obj.parameters['from'] = filterDate.date.from;
//     obj.parameters['to'] = filterDate.date.to;
//   }

//   if (typeof filterDate.date === 'string') {
//     if (filterDate.type === 'month') {
//       const [year, month] = filterDate.date.split('-');
//       obj.query = ` AND YEAR(${column})=:year AND MONTH(${column}) = :month `;
//       obj.parameters['year'] = year;
//       obj.parameters['month'] = month;
//     } else if (filterDate.type === 'year') {
//       obj.query = ` AND YEAR(${column}) = :year `;
//       obj.parameters['year'] = filterDate.date;
//     } else if (filterDate.type === 'date') {
//       obj.query = ` AND date(${column}) = :date `;
//       obj.parameters['date'] = filterDate.date;
//     }
//   }

//   return obj;
// };

const botMatch = (userAgent) => {
  let res;

  if (userAgent.match(/moozilla/i)) {
    return 'MoozillaBot';
  }

  if (userAgent.match(/slurp/i)) {
    return 'YahooBot';
  }

  if (userAgent.match(/googlebot/i)) {
    return 'GoogleBot';
  }

  if (userAgent.match(/AdsBot-Google/i)) {
    return 'GoogleAdsBot';
  }

  if (userAgent.match(/google keyword tool/i)) {
    return 'GoogleKeywordBot';
  }

  if (userAgent.match(/msnbot/i)) {
    return 'MsnBot';
  }

  if (userAgent.match(/adbot/i)) {
    return 'GoogleAdBot';
  }

  if (userAgent.match(/SPENG/)) {
    return 'SiteProbeBot';
  }

  if (userAgent.match(/(facebookexternalhit|facebookbot)/i)) {
    return 'FacebookBot';
  }

  if (userAgent.match(/SurveyBot/)) {
    return 'SurveyBot';
  }

  if (userAgent.match(/Ask Jeeves/)) {
    return 'AskBot';
  }

  if (userAgent.match(/DotBot/)) {
    return 'DotBot';
  }

  res = userAgent.match(/([a-zA-Z\-\/]+Bot)/);
  if (userAgent.match(/([a-zA-Z\-\/]+Bot)/)) {
    return res[1];
  }

  if (userAgent.match(/Trend Micro/i)) {
    return 'TrendMicroBot';
  }

  if (userAgent.match(/CyberPatrol/i)) {
    return 'CyberPatrolBot';
  }

  if (userAgent.match(/ia_archiver/i)) {
    return 'AlexaBot';
  }

  if (userAgent.match(/Ginxbot/i)) {
    return 'GinxBot';
  }

  if (userAgent.match(/Chat Catcher/i)) {
    return 'ChatCatcherBot';
  }
  if (userAgent.match(/AideRSS/i)) {
    return 'AideRSSBot';
  }

  if (userAgent.match(/Baiduspider/i)) {
    return 'BaiduBot';
  }

  if (userAgent.match(/ExaBot/i)) {
    return 'ExaBot';
  }

  if (userAgent.match(/Twiceler/i)) {
    return 'CuilBot';
  }

  if (userAgent.match(/ScoutJet/i)) {
    return 'ScoutJetBot';
  }

  res = userAgent.match(/\b(.*)bot\b/i);
  if (userAgent.match(/\b(.*)bot\b/i)) {
    return `${res[1]}Bot`;
  }

  res = userAgent.match(/\b(\w+)lib\b/i);
  if (res) {
    return `${res[1]}Bot`;
  }

  if (userAgent.match(/\bJava\d+\b/i)) {
    return 'JavaBot';
  }

  if (userAgent.match(/\bmonit/i)) {
    return 'MonitBot';
  }

  return null;
};

export const extractBrowserInfo = (userAgent: string) => {
  if (!userAgent) {
    return null;
  }

  const bot = botMatch(userAgent);
  if (bot) {
    return bot;
  }

  let res;

  res = userAgent.match(/chrome\/([\d.]+)/i);
  if (res) {
    return `Chrome/${res[1]}`;
  }

  res = userAgent.match(/MSIE[\s\/]([\d.]*)/i);
  if (res) {
    return 'MSIE' + (!res[1] ? '' : `/${res[1]}`);
  }

  res = userAgent.match(/Version\/([\d.]*) Safari/i);
  if (res) {
    return 'Safari' + (!res[1] ? '' : `/${res[1]}`);
  }

  res = userAgent.match(/Safari[\s\/]*([\d.]*)/i);
  if (res) {
    return 'Safari' + (!res[1] ? '' : `/${res[1]}`);
  }

  res = userAgent.match(/FireFox\/([\d.]*)/i);
  if (res) {
    return `FireFox/${res[1]}`;
  }

  res = userAgent.match(/AOL ([\d.]*)/);
  if (res) {
    return `AOL/${res[1]}`;
  }

  res = userAgent.match(/Playstation ([\d.]*)/i);
  if (res) {
    return `Playstation/${res[1]}`;
  }

  res = userAgent.match(/Netscape\/([\d.]*)/i);
  if (res) {
    return `Netscape/${res[1]}`;
  }

  res = userAgent.match(/Mozilla\/([\d.]+)/);
  if (res) {
    return `Mozilla/${res[1]}`;
  }

  res = userAgent.match(/Mozilla/);
  if (res) {
    return `Mozilla`;
  }

  res = userAgent.match(/Opera/);
  if (res) {
    return `Mozilla`;
  }

  res = userAgent.match(/(MIDP[-.a-zA-Z0-9]*)/i);
  if (res) {
    return res[1];
  }

  return null;
};

export const extractSystemInfo = (userAgent: string) => {
  if (!userAgent) {
    return null;
  }

  let res;

  res = userAgent.match(/Windows NT\s*([\d.]*)/);
  if (res) {
    return `Windows/${res[1]}`;
  }

  res = userAgent.match(/OS X\s*([\d_.]*)/);
  if (res) {
    return 'Mac' + (!res[1] ? '' : `/${res[1].replaceAll('_', '.')}`);
  }

  res = userAgent.match(/Mac[\s\/]*([\d_.]*)/);
  if (res) {
    return 'Mac' + (!res[1] ? '' : `/${res[1].replaceAll('_', '.')}`);
  }

  res = userAgent.match(/iPhone/);
  if (res) {
    return 'iPhone';
  }

  res = userAgent.match(/Linux\s*([\d_]*)/);
  if (res) {
    return 'Linux';
  }

  res = userAgent.match(/Mac_PPC/i);
  if (res) {
    return 'Mac(PPC)';
  }

  res = userAgent.match(/SunOS/i);
  if (res) {
    return 'Sun';
  }

  res = userAgent.match(/Blackberry/i);
  if (res) {
    return 'Blackberry';
  }

  res = userAgent.match(/Win\s*9(\d+)/i);
  if (res) {
    return `Win 9${res[1]}`;
  }

  res = userAgent.match(/Windows[\s\/]([\d.]*)/i);
  if (res) {
    return 'Windows' + (!res[1] ? '' : `/${res[1].replaceAll('_', '.')}`);
  }

  res = userAgent.match(/Danger/i);
  if (res) {
    return 'Danger';
  }
};

export const encryptStringToHex = (string) => {
  const { key, alg, iv } = ENCRYPTION_OPTIONS;

  const cipher = crypto.createCipheriv(alg, key, iv);
  const encrypted = cipher.update(string);

  return Buffer.concat([encrypted, cipher.final()]).toString('hex');
};

export const decryptHexToString = (string) => {
  const { key, alg, iv } = ENCRYPTION_OPTIONS;

  const encryptedText = Buffer.from(string, 'hex');

  const decipher = crypto.createDecipheriv(alg, Buffer.from(key), iv);
  const decrypted = decipher.update(encryptedText);

  return Buffer.concat([decrypted, decipher.final()]).toString();
};

export const handleServerError = (e) => {
  console.error(e); //TODO save in logs || db
};

export const generateResponse = (
  isError,
  path,
  status,
  messages,
  resData = {},
) => {
  return {
    statusCode: status,
    path,
    success: !isError,
    resData,
    messages,
  };
};

export const mapPagination = ({
  limit,
  page,
}): { limit: number; offset: number } => {
  if (!limit || limit < 1) {
    limit = 20;
  }
  if (!page || page < 1) {
    page = 1;
  }
  limit = Number(limit);
  const offset = (Number(page) - 1) * limit;

  return { limit, offset };
};

const planKinds = {
  paid_personal: {
    create_folder: true,
    add_test_to_folder: true,
    add_test_from_folder: true,
    remove_test_from_folder: true,
    purchase_tmy_credits: true,
  },
  team: {
    uxcrowd: true,
    task_completion: true,
    seq: true,
    reel_sharing: true,
    reel_download: true,
    mobile_testing: true,
    video_download: true,
    sus: true,
    download_pdf: true,
    uxdiagnostics: true,
    show_test_id: true,
    testing_with_own_testers: true,
    organizations: true,
    create_folder: true,
    add_test_to_folder: true,
    add_test_from_folder: true,
    remove_test_from_folder: true,
    purchase_tmy_credits: true,
    task_duration: true,
    worker_screening: true,
    post_test_all_type_question: true,
    ux_sprint: true,
    share_test: true,
  },
  enterprise: {
    uxcrowd: true,
    task_completion: true,
    seq: true,
    non_disclosure_agreement: true,
    reel_sharing: true,
    reel_download: true,
    mobile_testing: true,
    video_download: true,
    sus: true,
    download_pdf: true,
    uxdiagnostics: true,
    stream: true,
    nps: true,
    concept_mapping: true,
    custom_tester_panel: true,
    face_recording: true,
    show_test_id: true,
    white_label_testing: true,
    testing_with_own_testers: true,
    organizations: true,
    generate_report: true,
    create_folder: true,
    add_test_to_folder: true,
    add_test_from_folder: true,
    remove_test_from_folder: true,
    worker_screening: true,
    purchase_tmy_credits: true,
    task_duration: true,
    custom_filter: true,
    post_test_additional_survey: true,
    video_transcript: true,
    post_test_all_type_question: true,
    ux_sprint: true,
    state_filter: true,
    share_test: true,
    trusted_testers: true,
    moderated_testing: true,
  },
  edu: {
    uxcrowd: true,
    task_completion: true,
    seq: true,
    non_disclosure_agreement: true,
    reel_sharing: true,
    reel_download: true,
    mobile_testing: true,
    video_download: true,
    sus: true,
    download_pdf: true,
    uxdiagnostics: true,
    testing_with_own_testers: true,
    organizations: true,
    generate_report: true,
    create_folder: true,
    add_test_to_folder: true,
    add_test_from_folder: true,
    remove_test_from_folder: true,
    post_test_additional_survey: true,
    ux_sprint: true,
    share_test: true,
  },
  bundle: {
    uxcrowd: true,
    task_completion: true,
    seq: true,
    non_disclosure_agreement: true,
    reel_sharing: true,
    reel_download: true,
    mobile_testing: true,
    video_download: true,
    sus: true,
    download_pdf: true,
    uxdiagnostics: true,
    stream: true,
    nps: true,
    show_test_id: true,
    white_label_testing: true,
    organizations: true,
    create_folder: true,
    add_test_to_folder: true,
    add_test_from_folder: true,
    remove_test_from_folder: true,
    ux_sprint: true,
  },
  enterprise_trial: {
    uxcrowd: true,
    task_completion: true,
    seq: true,
    non_disclosure_agreement: true,
    reel_sharing: true,
    reel_download: true,
    mobile_testing: true,
    video_download: true,
    sus: true,
    download_pdf: true,
    uxdiagnostics: true,
    stream: true,
    nps: true,
    concept_mapping: true,
    custom_tester_panel: true,
    face_recording: true,
    show_test_id: true,
    white_label_testing: true,
    testing_with_own_testers: true,
    organizations: true,
    generate_report: true,
    create_folder: true,
    add_test_to_folder: true,
    add_test_from_folder: true,
    remove_test_from_folder: true,
    worker_screening: true,
    task_duration: true,
    custom_filter: true,
    post_test_additional_survey: true,
    video_transcript: true,
    post_test_all_type_question: true,
    ux_sprint: true,
    state_filter: true,
    share_test: true,
  },
  unlimited: {
    uxcrowd: true,
    task_completion: true,
    seq: true,
    non_disclosure_agreement: true,
    reel_sharing: true,
    reel_download: true,
    mobile_testing: true,
    video_download: true,
    sus: true,
    download_pdf: true,
    uxdiagnostics: true,
    stream: true,
    nps: true,
    concept_mapping: true,
    custom_tester_panel: true,
    face_recording: true,
    show_test_id: true,
    white_label_testing: true,
    testing_with_own_testers: true,
    organizations: true,
    generate_report: true,
    create_folder: true,
    add_test_to_folder: true,
    add_test_from_folder: true,
    remove_test_from_folder: true,
    worker_screening: true,
    task_duration: true,
    custom_filter: true,
    post_test_additional_survey: true,
    video_transcript: true,
    post_test_all_type_question: true,
    ux_sprint: true,
    state_filter: true,
    share_test: true,
    moderated_testing: true,
  },
  agency: {
    organizations: true,
  },
};

export const isFeatureAllowedForPlan = (
  kind: string,
  feature: string,
): boolean => planKinds?.[kind]?.[feature] || false;

export const deleteKeysFromObject = (
  object: Record<string, unknown>,
  keys: Array<string>,
): Record<string, unknown> => {
  for (const key in keys) {
    if (keys[key] in object) {
      delete object[keys[key]];
    }
  }

  return object;
};

export const extraFreeCredits = (campaign) =>
  CAMPAIGN_FREE_CREDITS[campaign] || 0;

export const humanize = (str) =>
  str
    .replace(/^[\s_]+|[\s_]+$/g, '')
    .replace(/[_\s]+/g, ' ')
    .replace(/^[a-z]/, (m) => m.toUpperCase());

//MYSQL not support ILIKE
export const iLike = (field: string, value: string) =>
  Sequelize.literal(`lower(${field}) like '%${value.toLocaleLowerCase()}%'`);

export const snakeToCamel = (str) =>
  str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace('-', '').replace('_', ''),
    );

const camelToSnake = (str) =>
  str
    .split('')
    .map((character) => {
      if (character == character.toUpperCase()) {
        return '_' + character.toLowerCase();
      } else {
        return character;
      }
    })
    .join('');

export const snakelizeKeys = (obj) =>
  Object.keys(obj).reduce(
    (result, key) => ({
      ...result,
      [camelToSnake(key)]: obj[key],
    }),
    {},
  );

export const replaceAll = (
  str: string,
  pattern: string,
  replacement: string,
): string => str.replace(new RegExp(pattern, 'g'), replacement);

export const parametrize = (str: string, replacement: string): string =>
  replaceAll(str, ' ', replacement).toLowerCase();

export const generateRandomString = (length = 10): string =>
  Math.random()
    .toString(36)
    .slice(2, length + 2);

export const transformFullName = (
  fullName,
): { firstName: string; lastName: string } => {
  const [firstName, ...lastNameRest] = fullName.split(' ');
  const lastName = lastNameRest.join(' ');

  return { firstName, lastName };
};

export function debugLine(message) {
  const e = new Error();
  const frame = e.stack.split('\n')[2]; // change to 3 for grandparent func
  const lineNumber = frame.split(':').reverse()[1];
  const functionName = frame.split(' ')[5];
  return functionName + ':' + lineNumber + '::' + message;
}
