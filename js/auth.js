// ===== AUTHENTICATION LOGIC =====

function createAuthError(firebaseError) {
  const code = firebaseError && firebaseError.code ? firebaseError.code : '';
  const fallbackMessage = firebaseError && firebaseError.message ? firebaseError.message : '';
  const error = new Error(getErrorMessage(code, fallbackMessage));
  error.isAuthError = true;
  if (code) error.code = code;
  return error;
}

// --- Sign Up with Email/Password ---
async function signUpWithEmail(email, password, displayName) {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    // Set display name only when provided.
    if (displayName) {
      await userCredential.user.updateProfile({ displayName: displayName });
    }
    return userCredential.user;
  } catch (error) {
    throw createAuthError(error);
  }
}

// --- Sign In with Email/Password ---
async function signInWithEmail(email, password) {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    throw createAuthError(error);
  }
}

// --- Sign In with Google ---
async function signInWithGoogle() {
  try {
    const result = await auth.signInWithPopup(googleProvider);
    return result.user;
  } catch (error) {
    throw createAuthError(error);
  }
}

// --- Password Reset ---
async function resetPassword(email) {
  try {
    await auth.sendPasswordResetEmail(email);
    return true;
  } catch (error) {
    throw createAuthError(error);
  }
}

// Backward-compatible aliases used by page scripts.
async function registerWithEmail(email, password) {
  return signUpWithEmail(email, password);
}

async function sendPasswordReset(email) {
  return resetPassword(email);
}

// --- Sign Out ---
async function signOut() {
  try {
    await auth.signOut();
    window.location.href = 'login.html';
  } catch (error) {
    console.error('Sign out error:', error);
  }
}

// --- Auth State Observer ---
function onAuthStateChanged(callback) {
  auth.onAuthStateChanged(callback);
}

// --- Protect Page (redirect to login if not authenticated) ---
function requireAuth() {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = 'login.html';
    }
  });
}

// --- Redirect if already logged in (for login page) ---
function redirectIfLoggedIn() {
  auth.onAuthStateChanged((user) => {
    if (user) {
      window.location.href = 'index.html';
    }
  });
}

// --- Get Current User ---
function getCurrentUser() {
  return auth.currentUser;
}

// --- Human-readable error messages ---
function getErrorMessage(code, fallbackMessage) {
  const messages = {
    'auth/email-already-in-use': 'This email is already registered. Try signing in instead.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/operation-not-allowed': 'This sign-in method is not enabled.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/missing-email': 'Please enter your email address.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/popup-closed-by-user': 'Sign-in popup was closed before completing.',
    'auth/popup-blocked': 'Popup was blocked by the browser. Allow popups and try again.',
    'auth/cancelled-popup-request': 'Popup sign-in was cancelled. Please try again.',
    'auth/network-request-failed': 'Network error. Check your connection.',
    'auth/invalid-api-key': 'Firebase API key is invalid. Check your Firebase config.',
    'auth/app-not-authorized': 'This app is not authorized in Firebase. Verify project settings and domain authorization.',
    'auth/unauthorized-domain': 'This domain is not authorized for Firebase Auth. Add it in Firebase Authentication settings.',
    'auth/configuration-not-found': 'Authentication provider is not configured. Enable the provider in Firebase Console.',
    'auth/invalid-credential': 'Invalid credentials. Please try again.',
    'auth/internal-error': 'Firebase internal error. Please try again shortly.',
  };

  if (messages[code]) return messages[code];
  if (code) return `Authentication failed (${code}).`;
  return fallbackMessage || 'An error occurred. Please try again.';
}
