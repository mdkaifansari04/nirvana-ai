"use client";
import { LOCAL_STORAGE_KEY } from "@/constants";

class TokenStorage {
  public storageKey: string;

  constructor(key: string) {
    this.storageKey = key;
  }

  set(token: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.storageKey, token);
    }
  }

  get() {
    if (typeof window !== "undefined") {
      return localStorage.getItem(this.storageKey);
    }
    return null; // Return null if running on the server
  }

  delete() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.storageKey);
    }
  }
}

export const accessTokenStorage = new TokenStorage(LOCAL_STORAGE_KEY);
