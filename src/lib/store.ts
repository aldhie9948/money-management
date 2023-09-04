import { writable } from "svelte/store";
import type { ITransactions } from "./types.js";
export const isDarkMode = writable(false);
export const currentMenu = writable<string>();
export const currentTransactions = writable<ITransactions[]>([]);
