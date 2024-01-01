import { Client, ID, Storage } from "appwrite";
import { bucketId, endPointUrl, projectId } from "../config/env";

class BucketService {
  client = new Client();
  bucket;
  constructor() {
    this.client.setEndpoint(endPointUrl).setProject(projectId);
    this.bucket = new Storage(this.client);
  }

  async uploadFile(image) {
    try {
      return await this.bucket.createFile(bucketId, ID.unique(), image);
    } catch (error) {
      console.log("Failed Bucket uploadFile Service ::", error.message);
      return false;
    }
  }

  async deleteFile(imageId) {
    try {
      return await this.bucket.deleteFile(bucketId, imageId);
    } catch (error) {
      console.log("Failed Bucket deleteFile Service ::", error.message);
      return false;
    }
  }

  // it has no need of async await function
  getFilePreview(imageId) {
    try {
      return this.bucket.getFilePreview(bucketId, imageId);
    } catch (error) {
      console.log("Failed Bucket getFilePreview Service ::", error.message);
      return false;
    }
  }
}

export const bucketService = new BucketService();
