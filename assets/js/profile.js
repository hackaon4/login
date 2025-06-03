// Initialize Firebase (make sure you have firebase-config.js)
// import { initializeApp } from "firebase/app";
// import { getAuth, updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
// import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

document.addEventListener('DOMContentLoaded', function() {
    const auth = firebase.auth();
    const db = firebase.firestore();
    const user = auth.currentUser;
    
    if (!user) {
        window.location.href = 'login.html'; // Redirect if not logged in
        return;
    }
    
    // Load user data
    loadUserData();
    
    // Profile picture change handler
    document.getElementById('changeProfilePicBtn').addEventListener('click', showProfilePicPopup);
    
    // User info form submission
    document.getElementById('userInfoForm').addEventListener('submit', updateUserInfo);
    
    // Password change form submission
    document.getElementById('changePasswordForm').addEventListener('submit', changePassword);
    
    // Initialize the profile picture popup (from previous implementation)
    initProfilePicPopup();
});

function loadUserData() {
    const auth = firebase.auth();
    const db = firebase.firestore();
    const user = auth.currentUser;
    
    // Load profile picture
    const profilePic = localStorage.getItem('selectedProfilePic');
    if (profilePic) {
        document.getElementById('currentProfilePic').src = profilePic;
    }
    
    // Load user info from Firestore
    db.collection('users').doc(user.uid).get().then(doc => {
        if (doc.exists) {
            const userData = doc.data();
            document.getElementById('firstName').value = userData.firstName || '';
            document.getElementById('lastName').value = userData.lastName || '';
        }
    });
    
    // Email is from auth
    document.getElementById('email').value = user.email;
}

function updateUserInfo(e) {
    e.preventDefault();
    
    const auth = firebase.auth();
    const db = firebase.firestore();
    const user = auth.currentUser;
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    
    // Update in Firestore
    db.collection('users').doc(user.uid).set({
        firstName: firstName,
        lastName: lastName
    }, { merge: true }).then(() => {
        alert('Profile updated successfully!');
    }).catch(error => {
        console.error('Error updating profile:', error);
        alert('Error updating profile. Please try again.');
    });
}

function changePassword(e) {
    e.preventDefault();
    
    const auth = firebase.auth();
    const user = auth.currentUser;
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validate passwords match
    if (newPassword !== confirmPassword) {
        alert('New passwords do not match!');
        return;
    }
    
    // Reauthenticate user
    const credential = firebase.auth.EmailAuthProvider.credential(
        user.email, 
        currentPassword
    );
    
    user.reauthenticateWithCredential(credential).then(() => {
        // Change password
        user.updatePassword(newPassword).then(() => {
            alert('Password changed successfully!');
            document.getElementById('changePasswordForm').reset();
        }).catch(error => {
            console.error('Error changing password:', error);
            alert('Error changing password. Please try again.');
        });
    }).catch(error => {
        console.error('Error reauthenticating:', error);
        alert('Current password is incorrect.');
    });
}

// Profile picture popup functions (from previous implementation)
function initProfilePicPopup() {
    // ... (your existing popup initialization code) ...
    
    // Modify the confirm handler to update the profile page image
    document.getElementById('confirmProfilePic').addEventListener('click', function() {
        // ... (your existing confirmation code) ...
        
        // Update the profile page image
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const dataUrl = e.target.result;
                document.getElementById('currentProfilePic').src = dataUrl;
                // ... rest of your code ...
            };
            reader.readAsDataURL(selectedFile);
        } else if (selectedPic) {
            document.getElementById('currentProfilePic').src = `assets/imgs/${selectedPic}`;
            // ... rest of your code ...
        }
    });
}