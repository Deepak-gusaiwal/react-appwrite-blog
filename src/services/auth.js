import { endPointUrl, projectId } from "../config/env";
import { Client, Account, ID } from "appwrite";

class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client.setEndpoint(endPointUrl).setProject(projectId);
    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (user) {
        //call login function
        return this.login({ email, password });
      } else {
        return user; // it is the response
      }
    } catch (error) {
      console.log("Auth Service :: Failed Create Account ::", error.message);
      throw error;
    }
  }
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log("Auth Service :: Failed Login Account ::", error.message);
      throw error;
    }
  }
  async getCurrentUser() {
    try {
      const currentUser = await this.account.get();
      return currentUser ? currentUser : null;
    } catch (error) {
      throw error;
    }
  }
  async logout() {
    try {
      //   await this.account.deleteSession(["current"]);
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Auth Service :: Failed to Logout ::", error.message);
      throw error;
    }
  }
}

export const authService = new AuthService();
