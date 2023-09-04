import { isDarkMode } from "./store.js";

export function toggleDarkMode() {
  let theme = localStorage.getItem("theme");
  if (theme === "dark") {
    setLocalTheme("light");
  } else if (theme === "light") {
    setLocalTheme("dark");
  }
}

export function initTheme() {
  const theme = localStorage.getItem("theme");
  if (!theme) return localStorage.setItem("theme", "light");
  if (["dark", "light"].includes(theme)) setLocalTheme(theme);
}

function setLocalTheme(theme: string) {
  localStorage.theme = theme;
  if (theme === "dark") isDarkMode.update(() => true);
  else if (theme === "light") isDarkMode.update(() => false);
  const classList = document.documentElement.classList;
  if (theme === "dark") classList.add("dark");
  else if (theme === "light") classList.remove("dark");
}
