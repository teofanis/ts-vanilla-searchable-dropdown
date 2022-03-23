import _ from 'lodash';

export function data_get(object: object, path: string, defaultValue: unknown) {
  return _.get(object, path, defaultValue);
}
