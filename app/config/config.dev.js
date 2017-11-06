
module.exports = {
  environment: 'development',
  uri: 'mongodb://localhost:27017/MP-Competences',
  options: { useMongoClient: true },
  db: 'MP-Competences',
  favicon_path: 'public/src',
  favicon: 'favicon.ico',
  cors_origin: { origin: 'http://localhost:4200' },
  static_path: 'dist',
  static_file: 'index.html'
};