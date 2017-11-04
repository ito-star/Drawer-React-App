import Unsplash, { toJson } from 'unsplash-js';
// import { createReadStream } from "fs"


const unsplash = new Unsplash({
    applicationId: 'be4ed7793dda3a7dad5bc35fab557cb98af589e388b214e85703ae11865d25cf',
    secret: '812198bdcc1acff969cb2adfbbe079332b51771a957c37711ea1f04a7860e744',
    callbackUrl: 'https://campaignkit.com.au',
});

const UnspalshTools = {

    // Get a single page from the list of all photos.
    getlistPhotos: (nPages, nImages, category) => unsplash.photos.listPhotos(nPages, nImages, category).then(toJson),

    // Get a single page from the list of the curated photos.
    getlistCuratedPhotos: (nPages, nImages, category) => unsplash.photos.listCuratedPhotos(nPages, nImages, category).then(toJson),

    // Get a single page from a photo search. Optionally limit your search to a set of categories by supplying the category ID’s.
    searchPhotos: (query, category, page, perPage) => unsplash.photos.searchPhotos(query, category, page, perPage).then(toJson),

    // Retrieve a single photo.
    getPhoto: (id, width, height, rectangle) => unsplash.photos.getPhoto(id, width, height, rectangle).then(toJson),

    // Retrieve a single photo's stats.
    getPhotoStats: id => unsplash.photos.getPhotoStats(id).then(toJson),

    // Retrieve a single random photo, given optional filters.
    getRandomPhoto: ({ width, height, query, username, featured, category }) => unsplash.photos.getRandomPhoto({ width, height, query, username, featured, category }).then(toJson),

    // Upload a photo on behalf of the logged-in user. This requires the write_photos scope.
    // uploadPhoto: (pathToImage) => unsplash.photos.uploadPhoto(createReadStream(__dirname + pathToImage)).then(toJson)
};

export default UnspalshTools;
