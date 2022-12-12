'use strict';

/**
 * posting service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::posting.posting');
