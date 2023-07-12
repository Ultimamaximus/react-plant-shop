import { firestore } from '../firebase';

export function getPlants() {
  return firestore.collection('plants')
    .get()
    .then(snapshot => {
      const plants = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return plants;
    });
}
