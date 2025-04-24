// Sample room data with more details
const ROOMS = [
    { 
        id: 1, 
        type: "Standard", 
        price: 100, 
        available: 5,
        size: "30m²",
        beds: "1 Queen Bed",
        occupancy: "2 Adults",
        amenities: ["Free Wi-Fi", "TV", "Air Conditioning", "Mini Fridge"],
        description: "Comfortable standard room perfect for couples or single travelers."
    },
    { 
        id: 2, 
        type: "Deluxe", 
        price: 200, 
        available: 3,
        size: "45m²",
        beds: "1 King Bed",
        occupancy: "2 Adults, 1 Child",
        amenities: ["Free Wi-Fi", "Smart TV", "Air Conditioning", "Mini Bar", "Safe", "Balcony"],
        description: "Spacious deluxe room with premium amenities and a private balcony."
    },
    { 
        id: 3, 
        type: "Suite", 
        price: 300, 
        available: 2,
        size: "65m²",
        beds: "1 King Bed + Sofa Bed",
        occupancy: "3 Adults or 2 Adults, 2 Children",
        amenities: ["Free Wi-Fi", "65\" Smart TV", "Air Conditioning", "Full Bar", "Safe", "Balcony", "Living Room", "Jacuzzi"],
        description: "Luxury suite with separate living area and premium facilities."
    }
];

let currentUser = null;
let selectedRoom = null;

// Load data from localStorage
const users = JSON.parse(localStorage.getItem('users')) || [];
const bookings = JSON.parse(localStorage.getItem('bookings')) || [];

// Initialize the page
function init() {
    displayRooms();
    displayBookings();
    setupEventListeners();
}

// Setup Event Listeners
function setupEventListeners() {
    // Auth buttons
    document.getElementById('login-btn').addEventListener('click', () => openModal('loginModal'));
    document.getElementById('register-btn').addEventListener('click', () => openModal('registerModal'));

    // Close buttons
    document.getElementById('close-login').addEventListener('click', () => closeModal('loginModal'));
    document.getElementById('close-register').addEventListener('click', () => closeModal('registerModal'));
    document.getElementById('close-room-details').addEventListener('click', () => closeModal('roomDetailsModal'));
    document.getElementById('close-booking').addEventListener('click', () => closeModal('bookingModal'));

    // Submit buttons
    document.getElementById('login-submit').addEventListener('click', handleLogin);
    document.getElementById('register-submit').addEventListener('click', handleRegister);
    document.getElementById('booking-submit').addEventListener('click', handleBooking);
    document.getElementById('book-now-btn').addEventListener('click', openBookingModal);

    // Modal outside click
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
}

// Display rooms
function displayRooms() {
    const container = document.getElementById('rooms-container');
    container.innerHTML = ROOMS.map(room => `
        <div class="room-card" data-room-id="${room.id}">
            <h3><i class="fa fa-bed"></i> ${room.type} Room</h3>
            <p>$${room.price} per night</p>
            <p>${room.available} rooms available</p>
            <p class="click-hint">Click for more details</p>
        </div>
    `).join('');

    // Add click event listeners to room cards
    const roomCards = document.querySelectorAll('.room-card');
    roomCards.forEach(card => {
        card.addEventListener('click', () => {
            const roomId = parseInt(card.dataset.roomId);
            showRoomDetails(roomId);
        });
    });
}

// Show room details in modal
function showRoomDetails(roomId) {
    selectedRoom = ROOMS.find(r => r.id === roomId);
    const detailsContent = document.getElementById('room-details-content');
    const bookNowBtn = document.getElementById('book-now-btn');
    
    detailsContent.innerHTML = `
        <h2>${selectedRoom.type} Room</h2>
        <div class="room-details">
            <p class="price">$${selectedRoom.price} per night</p>
            <p><strong>Size:</strong> ${selectedRoom.size}</p>
            <p><strong>Beds:</strong> ${selectedRoom.beds}</p>
            <p><strong>Max Occupancy:</strong> ${selectedRoom.occupancy}</p>
            <p><strong>Availability:</strong> ${selectedRoom.available} rooms</p>
            <h3>Amenities:</h3>
            <ul>
                ${selectedRoom.amenities.map(amenity => `<li><i class="fa fa-check"></i> ${amenity}</li>`).join('')}
            </ul>
            <p class="description">${selectedRoom.description}</p>
        </div>
    `;
    
    bookNowBtn.style.display = currentUser ? 'block' : 'none';
    openModal('roomDetailsModal');
}

// Display bookings for current user
function displayBookings() {
    const container = document.getElementById('bookings-container');
    if (!currentUser) {
        container.innerHTML = '';
        return;
    }

    const userBookings = bookings.filter(b => b.userId === currentUser.id);
    if (userBookings.length === 0) return;

    container.innerHTML = `
        <h2>Your Bookings</h2>
        ${userBookings.map(booking => `
            <div class="booking-card">
                <h3>${booking.roomType} Room</h3>
                <p>Check-in: ${booking.checkIn}</p>
                <p>Check-out: ${booking.checkOut}</p>
            </div>
        `).join('')}
    `;
}

// Modal functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function openBookingModal() {
    closeModal('roomDetailsModal');
    openModal('bookingModal');
}

// Handle registration
function handleRegister() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const email = document.getElementById('register-email').value;

    if (!username || !password || !email) {
        alert('Please fill all fields');
        return;
    }

    const newUser = {
        id: Date.now(),
        username,
        password,
        email
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    closeModal('registerModal');
}

// Handle login
function handleLogin() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        currentUser = user;
        document.getElementById('auth-buttons').style.display = 'none';
        document.getElementById('user-info').style.display = 'flex';
        document.getElementById('username-display').textContent = username;
        closeModal('loginModal');
        displayRooms();
        displayBookings();
    } else {
        alert('Invalid credentials');
    }
}

// Handle booking
function handleBooking() {
    if (!selectedRoom) return;

    const checkIn = document.getElementById('check-in').value;
    const checkOut = document.getElementById('check-out').value;

    if (!checkIn || !checkOut) {
        alert('Please select dates');
        return;
    }

    const newBooking = {
        id: Date.now(),
        userId: currentUser.id,
        roomType: selectedRoom.type,
        checkIn,
        checkOut
    };

    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    closeModal('bookingModal');
    displayBookings();
}

// Initialize the page
init();
