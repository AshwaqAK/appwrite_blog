import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query} from "appwrite"

class ConfigService {
  client;
  databases;
  bucket;

  constructor() {
    this.client = new Client();
    this.bucket = new Storage(this.client);
    this.databases = new Databases(this.client);
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          slug,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          slug,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async deletePost(slug) {
    // eslint-disable-next-line no-useless-catch
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getPost(slug) {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }

  async getPosts(query = [Query.equal("status", "active")]) {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        query
      );
    } catch (error) {
      throw error;
    }
  }

  async uploadFile(file) {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteFile(fileId) {
    // eslint-disable-next-line no-useless-catch
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      throw error;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const configServive = new ConfigService();
export default configServive