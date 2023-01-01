import * as yaml from 'js-yaml';
import { snakeToCamel } from 'utils/helpers';

export const parseYaml = (yamlString: string, enumType = null, defaultValue = 'any') => {
  if (!yamlString) {
    return null;
  }

  if (!yamlString.startsWith('---')) {
    if (enumType && !Object.values(enumType).includes(yamlString as any)) {
      yamlString = defaultValue;
    }

    return [yamlString];
  }

  let data = yaml.load(yamlString);

  if (typeof data === 'string') {
    if (enumType && !Object.values(enumType).includes(data as any)) {
      data = defaultValue;
    }
    return [data];
  }

  if (Array.isArray(data)) {
    const newData = data.map(function (el) {
      if (enumType && !Object.values(enumType).includes(el as any)) {
        return defaultValue;
      }
      return el;
    });

    return newData.includes(defaultValue) ? [defaultValue] : newData;
  }

  const clearData = {};
  for (const [key, value] of Object.entries(data)) {
    const clearKey = key.split(':')[1] || key;
    clearData[snakeToCamel(clearKey)] = value;
  }

  return clearData;
};
