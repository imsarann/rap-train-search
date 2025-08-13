const mongoose = require('mongoose');
require('dotenv').config();

const Train = require('./models/Train');

const stations = [
  'Mumbai Central', 'Delhi Junction', 'Bangalore City', 'Chennai Central', 'Kolkata Howrah',
  'Hyderabad Deccan', 'Ahmedabad Junction', 'Pune Junction', 'Jaipur Junction', 'Lucknow Junction',
  'Kanpur Central', 'Nagpur Junction', 'Indore Junction', 'Bhopal Junction', 'Patna Junction',
  'Varanasi Junction', 'Allahabad Junction', 'Amritsar Junction', 'Jodhpur Junction', 'Udaipur City',
  'Bhubaneswar', 'Guwahati', 'Chandigarh', 'Dehradun', 'Shimla',
  'Manali', 'Goa', 'Kochi', 'Trivandrum', 'Mangalore',
  'Vijayawada', 'Guntur', 'Warangal', 'Nizamabad', 'Karimnagar',
  'Adilabad', 'Nanded', 'Latur', 'Osmanabad', 'Solapur',
  'Kolhapur', 'Sangli', 'Satara', 'Ratnagiri', 'Sindhudurg',
  'Thane', 'Kalyan', 'Nashik', 'Aurangabad', 'Jalgaon',
  'Dhule', 'Nandurbar', 'Surat', 'Vadodara', 'Rajkot'
];

const trainPrefixes = ['Rajdhani', 'Shatabdi', 'Duronto', 'Garib Rath', 'Jan Shatabdi', 'Sampark Kranti', 'Vivek Express', 'Humsafar', 'Antyodaya', 'Superfast'];
const trainSuffixes = ['Express', 'Mail', 'Special', 'Premium', 'Fast', 'Limited', 'Passenger', 'Local'];

function generateTrainName() {
  const prefix = trainPrefixes[Math.floor(Math.random() * trainPrefixes.length)];
  const suffix = trainSuffixes[Math.floor(Math.random() * trainSuffixes.length)];
  const number = Math.floor(Math.random() * 9999) + 1;
  return `${prefix} ${number} ${suffix}`;
}

function generateTime() {
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 4) * 15; 
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

function generateDistance() {
  return Math.floor(Math.random() * 451) + 50;
}

function generateStops() {
  const numStops = Math.floor(Math.random() * 4) + 5; 
  const selectedStations = [];
  
  while (selectedStations.length < numStops) {
    const station = stations[Math.floor(Math.random() * stations.length)];
    if (!selectedStations.includes(station)) {
      selectedStations.push(station);
    }
  }
  
  const stops = selectedStations.map((station, index) => {
    const distance = index === 0 ? 0 : generateDistance();
    const time = generateTime();
    
    return {
      station,
      distanceFromPrevious: distance,
      departureTime: time
    };
  });
  
  return stops;
}

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');
    
    await Train.deleteMany({});
    console.log('Cleared existing train data');
    
    const trains = [];
    for (let i = 0; i < 1000; i++) {
      const train = {
        name: generateTrainName(),
        stops: generateStops()
      };
      trains.push(train);
      
      if (i % 100 === 0) {
        console.log(`Generated ${i} trains...`);
      }
    }
    
    await Train.insertMany(trains);
    console.log(`Successfully inserted ${trains.length} trains into the database`);
    
    const count = await Train.countDocuments();
    console.log(`Total trains in database: ${count}`);
    
    const sampleTrain = await Train.findOne();
    console.log('Sample train:', JSON.stringify(sampleTrain, null, 2));
    
    console.log('Database seeding completed successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
