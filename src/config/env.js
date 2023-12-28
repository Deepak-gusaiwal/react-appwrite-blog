const importViteString = import.meta.env;
export const endPointUrl = importViteString.VITE_APPWRITE_URL;
export const projectId = importViteString.VITE_APPWRITE_PROJECT_ID;
export const dbId = importViteString.VITE_APPWRITE_DATABASE_ID;
export const collectionId = importViteString.VITE_APPWRITE_COLLECTION_ID;
export const bucketId = importViteString.VITE_APPWRITE_BUCKET_ID;
