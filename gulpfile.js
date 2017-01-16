// 'use strict';

// Require all tasks in gulp/tasks, including subfolders
var requireDir = require('require-dir');
requireDir('./gulp/tasks', { recurse: true });
