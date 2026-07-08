const mongoose = require('mongoose');
const User = require('./models/userModel');
require('dotenv').config();

const testMongoDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/photographer-book', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected Successfully');

    // Create a test user
    const testUser = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      phone: '1234567890'
    });

    // Save the test user
    const savedUser = await testUser.save();
    console.log('Test user created successfully:', savedUser);

    // Verify we can retrieve the user
    const foundUser = await User.findOne({ email: 'test@example.com' });
    console.log('Retrieved user from database:', foundUser);

    // Clean up - delete the test user
    await User.deleteOne({ email: 'test@example.com' });
    console.log('Test user deleted successfully');

    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB Connection Closed');

  } catch (error) {
    console.error('Error:', error.message);
  }
};

// Run the test
testMongoDB(); 