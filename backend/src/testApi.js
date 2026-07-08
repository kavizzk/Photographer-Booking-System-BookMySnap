import fetch from 'node-fetch';

const testApi = async () => {
  try {
    // Test user registration
    console.log('Testing user registration...');
    const registrationResponse = await fetch('http://localhost:5000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test API User',
        email: 'testapi@example.com',
        password: 'password123',
        phone: '1234567890'
      }),
    });

    const registrationData = await registrationResponse.json();
    console.log('Registration response:', registrationData);

    // Test user login
    console.log('\nTesting user login...');
    const loginResponse = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'testapi@example.com',
        password: 'password123'
      }),
    });

    const loginData = await loginResponse.json();
    console.log('Login response:', loginData);

    // Test creating a booking
    console.log('\nTesting booking creation...');
    const bookingResponse = await fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: registrationData._id,
        date: new Date('2024-04-01'),
        time: '10:00 AM',
        packageType: 'wedding',
        location: 'Test Location',
        specialRequirements: 'Test Requirements'
      }),
    });

    const bookingData = await bookingResponse.json();
    console.log('Booking creation response:', bookingData);

    // Test contact form submission
    console.log('\nTesting contact form submission...');
    const contactResponse = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test Contact',
        email: 'testcontact@example.com',
        phone: '0987654321',
        message: 'This is a test contact message'
      }),
    });

    const contactData = await contactResponse.json();
    console.log('Contact form submission response:', contactData);

  } catch (error) {
    console.error('Error during API testing:', error);
  }
};

// Run the API tests
testApi(); 