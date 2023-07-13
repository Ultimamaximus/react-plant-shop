import { db } from '../firebase';

export async function getPlants() {
  const snapshot = await db.collection('plants').get();

  const plants = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return plants;
}
