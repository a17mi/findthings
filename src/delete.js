const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.deleteAds = functions.pubsub.schedule('every 24 hours').onRun(async (context) => {
  const adsRef = admin.database().ref('advertisment');
  const now = Date.now();
  const cutoff = now - 30 * 24 * 60 * 60 * 1000; // 30 дней в миллисекундах
  const AdsQuery = adsRef.orderByChild('createdAt').endAt(cutoff);
  
  const snapshot = await AdsQuery.once('value');
  const updates = {};
  
  snapshot.forEach(child => {
    updates[child.key] = null;
  });

  return adsRef.update(updates);
});