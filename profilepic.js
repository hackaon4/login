document.addEventListener('DOMContentLoaded', function() {
    // Check if this is the first login
    const isFirstLogin = localStorage.getItem('firstLogin') === null;
    const selectedPic = localStorage.getItem('selectedProfilePic');
    
    // Set the profile picture on all pages if one is selected
    if (selectedPic) {
        setProfilePicture(selectedPic);
    }
    
    // Show popup on first login
    if (isFirstLogin) {
        showProfilePicPopup();
    }
    
    // Add click handler to profile pictures to show popup again
    document.querySelectorAll('.user-profile img, .user img').forEach(img => {
        img.addEventListener('click', function() {
            showProfilePicPopup();
        });
    });
});

function showProfilePicPopup() {
    const popup = document.getElementById('profilePicPopup');
    const pictureOptions = document.querySelectorAll('.picture-options img');
    let selectedPic = localStorage.getItem('selectedProfilePic') || '';
    
    // Highlight the current selection if any
    pictureOptions.forEach(option => {
        if (option.dataset.pic === selectedPic) {
            option.classList.add('selected');
        }
        
        option.addEventListener('click', function() {
            pictureOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedPic = this.dataset.pic;
        });
    });
    
    // Confirm button handler
    document.getElementById('confirmProfilePic').addEventListener('click', function() {
        if (selectedPic) {
            localStorage.setItem('selectedProfilePic', selectedPic);
            localStorage.setItem('firstLogin', 'false');
            setProfilePicture(selectedPic);
            popup.style.display = 'none';
        } else {
            alert('Please select a profile picture');
        }
    });
    
    popup.style.display = 'flex';
}

function setProfilePicture(picName) {
    // Update all profile pictures across pages
    document.querySelectorAll('.user-profile img, .user img').forEach(img => {
        img.src = `assets/imgs/${picName}`;
    });
}