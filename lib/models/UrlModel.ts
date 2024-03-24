// models/Url.js

import mongoose from 'mongoose';

const UrlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String
});

const Url = mongoose.models.Url || mongoose.model('Url', UrlSchema);

export default Url;
