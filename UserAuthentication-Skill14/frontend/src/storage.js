const STORAGE_KEY = "skill14_auth_user";

function readFromStorage(storage) {
  const storedValue = storage.getItem(STORAGE_KEY);

  if (!storedValue) {
    return null;
  }

  try {
    return JSON.parse(storedValue);
  } catch {
    storage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function saveUserSession(user, storageType = "local") {
  clearUserSession();

  const targetStorage = storageType === "session" ? window.sessionStorage : window.localStorage;
  targetStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      id: user.id,
      username: user.username
    })
  );
}

export function getStoredUser() {
  return readFromStorage(window.localStorage) ?? readFromStorage(window.sessionStorage);
}

export function clearUserSession() {
  window.localStorage.removeItem(STORAGE_KEY);
  window.sessionStorage.removeItem(STORAGE_KEY);
}

