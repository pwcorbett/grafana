///<reference path="../../../headers/common.d.ts" />

import angular from 'angular';
import _ from 'lodash';
import {OdbcDatasource} from './datasource';
import {OdbcQueryCtrl} from './query_ctrl';

class OdbcConfigCtrl {
  static templateUrl = 'partials/config.html';
}

const defaultQuery = `SELECT
    UNIX_TIMESTAMP(<time_column>) as time_sec,
    <title_column> as title,
    <text_column> as text,
    <tags_column> as tags
  FROM <table name>
  WHERE $__timeFilter(time_column)
  ORDER BY <time_column> ASC
  LIMIT 100
  `;

class OdbcAnnotationsQueryCtrl {
  static templateUrl = 'partials/annotations.editor.html';

  annotation: any;

  /** @ngInject **/
  constructor() {
    this.annotation.rawQuery = this.annotation.rawQuery || defaultQuery;
  }
}

export {
  OdbcDatasource,
  OdbcDatasource as Datasource,
  OdbcQueryCtrl as QueryCtrl,
  OdbcConfigCtrl as ConfigCtrl,
  OdbcAnnotationsQueryCtrl as AnnotationsQueryCtrl,
};

