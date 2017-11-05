const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
  environment: 'production',
  uri: 'mongodb://localhost:27017/MP-Competences',
  options: { useMongoClient: true },
  secret: crypto,
  db: 'MP-Competences',
  favicon_path: 'dist',
  favicon: 'favicon.ico',
  cors_origin: { origin: 'http://gp-suivifact.herokuapp.com/' }, // Changer adresse quand connue
  static_path: 'dist',
  static_file: 'index.html'
};