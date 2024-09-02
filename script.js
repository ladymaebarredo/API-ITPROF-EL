
const fetchUsersBtn = document.getElementById('fetchUsersBtn');
const searchInput = document.getElementById('searchInput');
const userContainer = document.getElementById('userContainer');
let usersData = [];


function displayUsers(users) {
    
    userContainer.innerHTML = '';

    if (users.length === 0) {
        userContainer.innerHTML = '<p style="color:red;">No users found.</p>';
        return;
    }

    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';

        userCard.innerHTML = `
            <img src="https://i.pravatar.cc/100?u=${user.email}" alt="Profile Picture">
            <h3>${user.name}</h3>
            <p><span>Email:</span> ${user.email}</p>
            <p><span>Phone:</span> ${user.phone}</p>
            <p><span>Website:</span> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
            <p><span>Company:</span> ${user.company.name}</p>
        `;

        
        userCard.addEventListener('click', () => {
            userCard.classList.toggle('expanded');
        });

       
        const img = userCard.querySelector('img');
        img.addEventListener('click', (event) => {
            event.stopPropagation(); 
            img.classList.toggle('expanded-img');
        });

        userContainer.appendChild(userCard);
    });
}



function fetchAndDisplayUsers() {
    
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            usersData = users; 
            displayUsers(users); 
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            userContainer.innerHTML = '<p style="color:red;">Failed to fetch user data. Please try again later.</p>';
        });
}


function filterUsers() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredUsers = usersData.filter(user => 
        user.name.toLowerCase().includes(searchTerm)
    );
    displayUsers(filteredUsers);
}


fetchUsersBtn.addEventListener('click', fetchAndDisplayUsers);
searchInput.addEventListener('input', filterUsers);
