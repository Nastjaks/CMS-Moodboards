'use strict';

/**
 * blogpost service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::blogpost.blogpost');
