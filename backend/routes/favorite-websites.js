const express = require('express');
const router = express.Router();

// local data
const favoriteWebsitesJSON = require('../data/favorite-websites/favorite-websites.json');
const favoriteWebsitesCategoriesJSON = require('../data/favorite-websites/favorite-websites-categories.json');
const favoriteWebsitesDisplayedFields = require('../data/favorite-websites/favorite-websites-displayed-fields');

const getOrderedFavoriteWebsites = () => {
  // sort the websites by name
  let orderedFavoriteWebsites = favoriteWebsitesJSON.sort((a, b) => {
    return (a.name).localeCompare(b.name);
  });
  // sort website tags
  orderedFavoriteWebsites.forEach((website) => {
    if (website.hasOwnProperty('tags')) {
      this.tags = website.tags.sort((a, b) => {
        return a.localeCompare(b);
      });
    }
  });
  return orderedFavoriteWebsites;
};

const getOrderedFavoriteWebsitesCategories = () => {
  // sort the categories by name
  let categories = favoriteWebsitesCategoriesJSON.sort((a, b) => {
    return (a.name).localeCompare(b.name);
  });
  return categories;
};

const getFavoriteWebsitesCategories = () => {
  return favoriteWebsitesCategoriesJSON;
};

// use middleware for favorite websites path
router.get('', (req, res) => {
  // set success status and send express response
  res.status(200).json({
    message: 'favorite websites fetched successfully',
    favoriteWebsitesDisplayedFields: favoriteWebsitesDisplayedFields,
    favoriteWebsitesCategories: getFavoriteWebsitesCategories(),
    favoriteWebsites: getOrderedFavoriteWebsites()
  });
});

module.exports = router;
