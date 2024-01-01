import { Client, Databases } from "appwrite";
import {
  endPointUrl,
  projectId,
  dbId,
  collectionId,
  bucketId,
} from "../config/env";
class PostService {
  client = new Client();
  databases;

  constructor() {
    this.client.setEndpoint(endPointUrl).setProject(projectId);
    this.databases = new Databases(this.client);
  }

  async createPost({ title, slug, content, featuredImage, alt, userId }) {
    try {
      return await this.databases.createDocument(dbId, collectionId, slug, {
        title,
        slug,
        content,
        featuredImage,
        alt,
        userId,
      });
    } catch (error) {
      console.log("Create Post Service Error ::", error.message);
      return false;
    }
  }

  async updatePost(docId, { title, slug, content, featuredImage }) {
    try {
      return await this.databases.updateDocument(dbId, collectionId, docId, {
        title,
        slug,
        content,
        featuredImage,
      });
    } catch (error) {
      console.log("Update Post Service Error ::", error.message);
      return false;
    }
  }
  async deletePost(docId) {
    try {
      await this.databases.deleteDocument(dbId, collectionId, docId);
      return true;
    } catch (error) {
      console.log("Delete Posts Service Error ::", error.message);
      return false;
    }
  }
  async getPosts() {
    try {
      const posts = await this.databases.listDocuments(dbId, collectionId);
      return posts;
    } catch (error) {
      console.log("Get Posts Service Error ::", error.message);
      return false;
    }
  }

  async getPost({ postId }) {
    try {
      return await this.databases.getDocument(dbId, collectionId, postId);
    } catch (error) {
      console.log("Get Post Service Error ::", error.message);
      return false;
    }
  }
}

export const postService = new PostService();
