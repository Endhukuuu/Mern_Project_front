// Dummy data for Sportify Arena - Updated with reviews & facilities

export const sports = [
  { id: 1, name: 'Cricket', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400', grounds: [1, 2] },
  { id: 2, name: 'Football', image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400', grounds: [3, 4] },
  { id: 3, name: 'Tennis', image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=400', grounds: [5, 6] },
  { id: 4, name: 'Badminton', image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400', grounds: [7, 8] },
  { id: 5, name: 'Basketball', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400', grounds: [9, 10] },
  { id: 6, name: 'Volleyball', image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=400', grounds: [11, 12] }
];

// Facilities for each ground
const commonFacilities = [
  'Parking', 'Washroom', 'Drinking Water', 'Changing Room', 'First Aid'
];

export const grounds = [
  {
    id: 1,
    name: 'Greenfield Cricket Stadium',
    sportId: 1,
    sportName: 'Cricket',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600',
    gallery: [
      'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600',
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600',
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600'
    ],
    location: 'Downtown Sports Complex, New York',
    pricePerHour: 120,
    rating: 4.8,
    reviewCount: 124,
    description: 'Professional cricket ground with floodlights, pitch prepared by former international players. Includes changing rooms and equipment rental.',
    facilities: [...commonFacilities, 'Flood Lights', 'Cafeteria', 'Equipment Rental'],
    availableSports: ['Cricket']
  },
  {
    id: 2,
    name: 'City Cricket Arena',
    sportId: 1,
    sportName: 'Cricket',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600',
    gallery: [
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600',
      'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600'
    ],
    location: 'Queens Sports Hub, New York',
    pricePerHour: 100,
    rating: 4.5,
    reviewCount: 89,
    description: 'Indoor cricket facility with bowling machines and practice nets. Great for training sessions.',
    facilities: [...commonFacilities, 'Flood Lights', 'Equipment Rental'],
    availableSports: ['Cricket']
  },
  {
    id: 3,
    name: 'Metro Football Ground',
    sportId: 2,
    sportName: 'Football',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600',
    gallery: [
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600',
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600'
    ],
    location: 'Brooklyn Athletic Field, New York',
    pricePerHour: 150,
    rating: 4.9,
    reviewCount: 203,
    description: 'Full-size artificial turf football pitch with night lighting and spectator seating.',
    facilities: [...commonFacilities, 'Flood Lights', 'Cafeteria', 'Equipment Rental'],
    availableSports: ['Football']
  },
  {
    id: 4,
    name: 'Sunset Soccer Park',
    sportId: 2,
    sportName: 'Football',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600',
    gallery: [
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600',
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600'
    ],
    location: 'Jersey City Sports Zone',
    pricePerHour: 130,
    rating: 4.6,
    reviewCount: 67,
    description: 'Five-a-side football pitches with high-quality grass and changing facilities.',
    facilities: [...commonFacilities, 'Flood Lights'],
    availableSports: ['Football']
  },
  {
    id: 5,
    name: 'Elite Tennis Club',
    sportId: 3,
    sportName: 'Tennis',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600',
    gallery: [
      'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600',
      'https://images.unsplash.com/photo-1622279454840-3b7e5ea21b9b?w=600'
    ],
    location: 'Manhattan Tennis Center',
    pricePerHour: 80,
    rating: 4.7,
    reviewCount: 156,
    description: 'Clay and hard courts available. Professional coaching and ball machine rental.',
    facilities: [...commonFacilities, 'Cafeteria', 'Equipment Rental'],
    availableSports: ['Tennis']
  },
  {
    id: 6,
    name: 'Central Park Tennis Courts',
    sportId: 3,
    sportName: 'Tennis',
    image: 'https://images.unsplash.com/photo-1622279454840-3b7e5ea21b9b?w=600',
    gallery: [
      'https://images.unsplash.com/photo-1622279454840-3b7e5ea21b9b?w=600',
      'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600'
    ],
    location: 'Central Park, New York',
    pricePerHour: 60,
    rating: 4.4,
    reviewCount: 98,
    description: 'Scenic outdoor courts surrounded by nature. Great for recreational play.',
    facilities: [...commonFacilities],
    availableSports: ['Tennis']
  },
  {
    id: 7,
    name: 'Smash Badminton Arena',
    sportId: 4,
    sportName: 'Badminton',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600',
    gallery: [
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600',
      'https://images.unsplash.com/photo-1612325928835-8ed35b3f2a1c?w=600'
    ],
    location: 'Staten Island Indoor Sports',
    pricePerHour: 50,
    rating: 4.8,
    reviewCount: 212,
    description: 'Air-conditioned indoor courts with professional mats and shuttlecock service.',
    facilities: [...commonFacilities, 'Cafeteria', 'Equipment Rental'],
    availableSports: ['Badminton']
  },
  {
    id: 8,
    name: 'Quick Strike Badminton Hall',
    sportId: 4,
    sportName: 'Badminton',
    image: 'https://images.unsplash.com/photo-1612325928835-8ed35b3f2a1c?w=600',
    gallery: [
      'https://images.unsplash.com/photo-1612325928835-8ed35b3f2a1c?w=600',
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600'
    ],
    location: 'Bronx Badminton Hub',
    pricePerHour: 45,
    rating: 4.3,
    reviewCount: 54,
    description: 'Competition-grade courts with good lighting and seating area for players.',
    facilities: [...commonFacilities],
    availableSports: ['Badminton']
  },
  {
    id: 9,
    name: 'Hoops Basketball Court',
    sportId: 5,
    sportName: 'Basketball',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600',
    gallery: [
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600',
      'https://images.unsplash.com/photo-1504450758481-7338e1f5e5c6?w=600'
    ],
    location: 'Harlem Sports Complex',
    pricePerHour: 90,
    rating: 4.7,
    reviewCount: 135,
    description: 'Indoor full court with glass backboards and bleachers for spectators.',
    facilities: [...commonFacilities, 'Cafeteria', 'Equipment Rental'],
    availableSports: ['Basketball']
  },
  {
    id: 10,
    name: 'Streetball Arena',
    sportId: 5,
    sportName: 'Basketball',
    image: 'https://images.unsplash.com/photo-1504450758481-7338e1f5e5c6?w=600',
    gallery: [
      'https://images.unsplash.com/photo-1504450758481-7338e1f5e5c6?w=600',
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600'
    ],
    location: 'Williamsburg Basketball Park',
    pricePerHour: 70,
    rating: 4.5,
    reviewCount: 87,
    description: 'Outdoor asphalt court with modern hoops and night lighting.',
    facilities: [...commonFacilities, 'Flood Lights'],
    availableSports: ['Basketball']
  },
  {
    id: 11,
    name: 'Spike Volleyball Court',
    sportId: 6,
    sportName: 'Volleyball',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600',
    gallery: [
      'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600',
      'https://images.unsplash.com/photo-1592656094267-764a45160876?w=600'
    ],
    location: 'Long Island Beach Volleyball',
    pricePerHour: 75,
    rating: 4.6,
    reviewCount: 112,
    description: 'Sand volleyball court near the beach. Perfect for summer games.',
    facilities: [...commonFacilities, 'Cafeteria'],
    availableSports: ['Volleyball']
  },
  {
    id: 12,
    name: 'Power Smash Volleyball Indoor',
    sportId: 6,
    sportName: 'Volleyball',
    image: 'https://images.unsplash.com/photo-1592656094267-764a45160876?w=600',
    gallery: [
      'https://images.unsplash.com/photo-1592656094267-764a45160876?w=600',
      'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600'
    ],
    location: 'Queens Volleyball Center',
    pricePerHour: 85,
    rating: 4.8,
    reviewCount: 98,
    description: 'Indoor hard court with professional net system and training equipment.',
    facilities: [...commonFacilities, 'Equipment Rental', 'Flood Lights'],
    availableSports: ['Volleyball']
  }
];

// Reviews for each ground (sample)
export const reviews = {
  1: [
    { id: 1, name: 'John Doe', rating: 5, date: '2026-05-20', message: 'Excellent pitch! Well maintained floodlights. Will visit again.', avatar: '', verified: true },
    { id: 2, name: 'Sarah Miller', rating: 4, date: '2026-05-15', message: 'Good facilities but parking could be better.', avatar: '', verified: true },
    { id: 3, name: 'Mike Chen', rating: 5, date: '2026-05-10', message: 'Best cricket ground in the city! Highly recommended.', avatar: '', verified: true }
  ],
  2: [
    { id: 4, name: 'Alex Johnson', rating: 4, date: '2026-05-18', message: 'Indoor nets are great for practice. Bowling machine helped a lot.', avatar: '', verified: true }
  ],
  3: [
    { id: 5, name: 'Chris Evans', rating: 5, date: '2026-05-22', message: 'Amazing turf! Perfect for 11-a-side matches.', avatar: '', verified: true },
    { id: 6, name: 'Emma Watson', rating: 5, date: '2026-05-19', message: 'Floodlights are excellent. Night matches are fun!', avatar: '', verified: true }
  ],
  // Add default for others - but will handle in component if not present
};

export const availableTimeSlots = [
  '06:00 AM - 07:00 AM', '07:00 AM - 08:00 AM', '08:00 AM - 09:00 AM',
  '09:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM',
  '12:00 PM - 01:00 PM', '01:00 PM - 02:00 PM', '02:00 PM - 03:00 PM',
  '03:00 PM - 04:00 PM', '04:00 PM - 05:00 PM', '05:00 PM - 06:00 PM',
  '06:00 PM - 07:00 PM', '07:00 PM - 08:00 PM', '08:00 PM - 09:00 PM',
  '09:00 PM - 10:00 PM'
];

export const dummyBookings = [
  {
    id: 101,
    groundId: 1,
    groundName: 'Greenfield Cricket Stadium',
    date: '2026-06-15',
    timeSlot: '04:00 PM - 05:00 PM',
    duration: 1,
    amount: 120,
    status: 'Confirmed'
  },
  {
    id: 102,
    groundId: 5,
    groundName: 'Elite Tennis Club',
    date: '2026-06-20',
    timeSlot: '09:00 AM - 10:00 AM',
    duration: 2,
    amount: 160,
    status: 'Pending'
  },
  {
    id: 103,
    groundId: 7,
    groundName: 'Smash Badminton Arena',
    date: '2026-06-10',
    timeSlot: '07:00 PM - 08:00 PM',
    duration: 1,
    amount: 50,
    status: 'Confirmed'
  }
];

// Helper functions
export const getGroundsBySport = (sportId) => grounds.filter(g => g.sportId === sportId);
export const getGroundById = (id) => grounds.find(g => g.id === parseInt(id));
export const getReviewsForGround = (groundId) => reviews[groundId] || [];