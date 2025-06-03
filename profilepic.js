document.addEventListener('DOMContentLoaded', function() {
    // Check if this is the first login
    const isFirstLogin = localStorage.getItem('firstLogin') === null;
    const selectedPic = localStorage.getItem('selectedProfilePic');
    
    // Set the profile picture on all pages if one is selected
    if (selectedPic) {
        // Check if it's a data URL (uploaded image) or a predefined image
        if (selectedPic.startsWith('data:')) {
            setProfilePicture(selectedPic);
        } else {
            setProfilePicture(`assets/imgs/${selectedPic}`);
        }
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
    const pictureOptions = document.querySelectorAll('.predefined-options img');
    const profileUpload = document.getElementById('profileUpload');
    const profilePreview = document.getElementById('profilePreview');
    let selectedPic = localStorage.getItem('selectedProfilePic') || '';
    let selectedFile = null;
    
    // Reset the popup state
    profilePreview.style.display = 'none';
    pictureOptions.forEach(opt => opt.classList.remove('selected'));
    profileUpload.value = '';
    
    // Highlight the current selection if any
    if (selectedPic) {
        if (selectedPic.startsWith('data:')) {
            // It's an uploaded image - show in preview
            profilePreview.src = selectedPic;
            profilePreview.style.display = 'block';
        } else {
            // It's a predefined image - highlight it
            pictureOptions.forEach(option => {
                if (option.dataset.pic === selectedPic) {
                    option.classList.add('selected');
                }
            });
        }
    }
    
    // File upload handler
    profileUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        // Validate file type and size
        if (!['image/png', 'image/gif'].includes(file.type)) {
            alert('Please upload only PNG or GIF files');
            return;
        }
        
        if (file.size > 2 * 1024 * 1024) { // 2MB
            alert('File size must be less than 2MB');
            return;
        }
        
        selectedFile = file;
        
        // Unselect any predefined options
        pictureOptions.forEach(opt => opt.classList.remove('selected'));
        
        // Show preview
        const reader = new FileReader();
        reader.onload = function(e) {
            profilePreview.src = e.target.result;
            profilePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    });
    
    // Predefined option click handler
    pictureOptions.forEach(option => {
        option.addEventListener('click', function() {
            pictureOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedPic = this.dataset.pic;
            selectedFile = null;
            profilePreview.style.display = 'none';
        });
    });
    
    // Confirm button handler
    document.getElementById('confirmProfilePic').addEventListener('click', function() {
        if (selectedFile) {
            // User uploaded a file
            const reader = new FileReader();
            reader.onload = function(e) {
                const dataUrl = e.target.result;
                localStorage.setItem('selectedProfilePic', dataUrl);
                localStorage.setItem('firstLogin', 'false');
                setProfilePicture(dataUrl);
                popup.style.display = 'none';
            };
            reader.readAsDataURL(selectedFile);
        } else if (selectedPic) {
            // User selected a predefined option
            localStorage.setItem('selectedProfilePic', selectedPic);
            localStorage.setItem('firstLogin', 'false');
            setProfilePicture(`assets/imgs/${selectedPic}`);
            popup.style.display = 'none';
        } else {
            alert('Please select or upload a profile picture');
        }
    });
    
    // Cancel button handler
    document.getElementById('cancelProfilePic').addEventListener('click', function() {
        popup.style.display = 'none';
    });
    
    popup.style.display = 'flex';
}

function setProfilePicture(picSrc) {
    // Update all profile pictures across pages
    document.querySelectorAll('.user-profile img, .user img').forEach(img => {
        img.src = picSrc;
    });
}