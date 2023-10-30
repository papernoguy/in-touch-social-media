document.addEventListener('DOMContentLoaded', function () {
    var dropdownToggle = document.querySelector('.settings .dropdown-toggle');

    dropdownToggle.addEventListener('click', function () {
        var dropdownMenu = document.querySelector('.settings .dropdown-menu');
        dropdownMenu.classList.toggle('show');
    });

    document.addEventListener('click', function (event) {
        var dropdownToggle = document.querySelector('.settings .dropdown-toggle');
        var dropdownMenu = document.querySelector('.settings .dropdown-menu');

        if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
});



function redirectToChatPage() {
    window.location.href = 'chat.html'; 
}

function redirectToCommunityPage() {
    window.location.href = 'community.html'; 
}

function redirectToProfilePage() {
    window.location.href = '/home'; 
}
function redirectToAddPostPage(){
    window.location.href = 'NewPost.html';
}




