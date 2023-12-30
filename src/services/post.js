import { Client, Databases } from "appwrite";
import { endPointUrl, projectId, dbId, collectionId, bucketId } from "../config/env";
class PostService {
    client = new Client;
    databases;
    bucket;

    constructor() {
        this.client.setEndpoint(endPointUrl).setProject(projectId);
        this.databases = new Databases(this.client);
    }

    async createPost({ title, slug, content, featuredImage }) {
        try {
            return this.databases.createDocument(dbId, collectionId, slug, { title, slug, content, featuredImage })
        } catch (error) {
            console.log('Create Post Service Error ::', error.message)
            return false
        }
    }

    async updatePost(docId, { title, slug, content, featuredImage }) {
        try {
            return this.databases.updateDocument(dbId, collectionId, docId, { title, slug, content, featuredImage })
        } catch (error) {
            console.log('Update Post Service Error ::', error.message)
            return false
        }
    }

    async getPosts() {
        try {
            return this.databases.listDocuments(dbId, collectionId)
        } catch (error) {
            console.log('Get Posts Service Error ::', error.message)
            return false
        }
    }

    async getPost({ postId }) {
        try {
            return this.databases.getDocument(dbId, collectionId, postId)
        } catch (error) {
            console.log('Get Post Service Error ::', error.message)
            return false
        }
    }
}

const postServie = new PostService();
