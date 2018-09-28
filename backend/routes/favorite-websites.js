const express = require('express');
const router = express.Router();
const favoriteWebsitesJSON = require('../data/favorite-websites.json');

// use middleware for favorite websites path
router.get('', (req, res, next) => {
  // set success status and send express response
  res.status(200).json({
    message: 'favorite websites fetched successfully',
    favoriteWebsites: favoriteWebsitesJSON
  });
  
  getFavoriteWebsites();
});

const getFavoriteWebsites = () => {
  // sort the websites by name
  let websites =  favoriteWebsitesJSON.sort((a, b) => {
    return (a.name).localeCompare(b.name);
  }).forEach((website) => {
    if(website.hasOwnProperty('tags')) {
      // sort the tags
      this.tags = website.tags.sort((a, b) => {
        return a.localeCompare(b);
      });
    }
  });
  return websites;
};

module.exports = router;
