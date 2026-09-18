export type Stall = {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  area: string;
  foodTypes: string[];
  photos: string[];
  avgRating: number;
  reviewCount: number;
  note: string;
  openHours: string;
  price: string;
};

export type Review = {
  id: string;
  stallId: string;
  userId: string;
  foodType: string;
  rating: number;
  text: string;
  photoUrl: string;
  timestamp: string;
};

export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  trustScore: number;
};

const foodImage = (id: string) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1000`;

const stalls: Stall[] = [
  { id: '1', name: 'Ashok Vada Pav', area: 'Dadar West', location: { lat: 19.0183, lng: 72.8422 }, foodTypes: ['Vada Pav', 'Snacks'], photos: [foodImage('5560763'), foodImage('6646367')], avgRating: 4.8, reviewCount: 284, note: 'The crackly chilli-garlic chutney is the reason locals queue before the train rush.', openHours: '7:00 AM – 11:30 PM', price: '₹' },
  { id: '2', name: 'Elco Pani Puri Centre', area: 'Bandra West', location: { lat: 19.0596, lng: 72.8295 }, foodTypes: ['Chaat', 'Pani Puri'], photos: [foodImage('1479330'), foodImage('1437267')], avgRating: 4.7, reviewCount: 219, note: 'Six waters, one perfectly crisp puri, and a very good excuse to order one more.', openHours: '11:00 AM – 10:30 PM', price: '₹₹' },
  { id: '3', name: 'Sardar Refreshments', area: 'Tardeo', location: { lat: 18.9717, lng: 72.8144 }, foodTypes: ['Pav Bhaji', 'Snacks'], photos: [foodImage('5638331'), foodImage('958545')], avgRating: 4.6, reviewCount: 176, note: 'The bhaji is buttery, smoky and unapologetically orange.', openHours: '12:00 PM – 1:00 AM', price: '₹₹' },
  { id: '4', name: 'Bademiya', area: 'Colaba', location: { lat: 18.922, lng: 72.8325 }, foodTypes: ['Kebabs', 'Rolls'], photos: [foodImage('1614401'), foodImage('1633578')], avgRating: 4.5, reviewCount: 342, note: 'Late-night seekh kebabs with the Gateway lights in the background.', openHours: '6:00 PM – 4:00 AM', price: '₹₹₹' },
  { id: '5', name: 'A1 Sandwich', area: 'Churchgate', location: { lat: 18.9322, lng: 72.8264 }, foodTypes: ['Sandwiches', 'Snacks'], photos: [foodImage('1601050690597'), foodImage('1528735602780')], avgRating: 4.4, reviewCount: 131, note: 'A toasted, overstuffed classic for the walk back from Marine Drive.', openHours: '4:00 PM – 1:00 AM', price: '₹' },
  { id: '6', name: 'Mithibai Dosa Corner', area: 'Vile Parle West', location: { lat: 19.1024, lng: 72.8361 }, foodTypes: ['Dosa', 'South Indian'], photos: [foodImage('433452'), foodImage('541040')], avgRating: 4.5, reviewCount: 98, note: 'Paper-thin dosas that land on the table faster than your group chat replies.', openHours: '7:30 AM – 11:00 PM', price: '₹' },
  { id: '7', name: 'Khao Suey House', area: 'Khar', location: { lat: 19.068, lng: 72.8367 }, foodTypes: ['Noodles', 'Indo-Chinese'], photos: [foodImage('1458694'), foodImage('2347311')], avgRating: 4.3, reviewCount: 87, note: 'Messy, tangy noodles for a rainy evening and an empty schedule.', openHours: '5:00 PM – 12:00 AM', price: '₹₹' },
  { id: '8', name: 'Juhu Beach Kulfi', area: 'Juhu', location: { lat: 19.098, lng: 72.8267 }, foodTypes: ['Desserts', 'Kulfi'], photos: [foodImage('2728825'), foodImage('3026804')], avgRating: 4.6, reviewCount: 154, note: 'Malai kulfi, beach breeze, sticky fingers. The whole Juhu ritual.', openHours: '2:00 PM – 12:30 AM', price: '₹' },
  { id: '9', name: 'Mohammed Ali Road Grill', area: 'Bhendi Bazaar', location: { lat: 18.9566, lng: 72.8314 }, foodTypes: ['Kebabs', 'Mughlai'], photos: [foodImage('1601050690597'), foodImage('1544025162')], avgRating: 4.7, reviewCount: 263, note: 'Charcoal, spice and the kind of midnight hunger Mumbai does best.', openHours: '6:30 PM – 3:30 AM', price: '₹₹₹' },
  { id: '10', name: 'Prakash Shakahari Upahar Kendra', area: 'Dadar East', location: { lat: 19.0178, lng: 72.8478 }, foodTypes: ['South Indian', 'Thali'], photos: [foodImage('1626132647523'), foodImage('5560763')], avgRating: 4.4, reviewCount: 121, note: 'Old-school, fast and full of regulars who know exactly what to order.', openHours: '8:00 AM – 10:30 PM', price: '₹' },
];

const users: User[] = [
  { id: 'u1', name: 'Aisha Mehta', avatarUrl: '', trustScore: 96 },
  { id: 'u2', name: 'Kabir Shah', avatarUrl: '', trustScore: 91 },
  { id: 'u3', name: 'Naina Fernandes', avatarUrl: '', trustScore: 88 },
  { id: 'u4', name: 'Rohan Kulkarni', avatarUrl: '', trustScore: 84 },
];

let reviews: Review[] = [
  { id: 'r1', stallId: '1', userId: 'u1', foodType: 'Vada Pav', rating: 5, text: 'The chutney has actual heat and the potato filling is fluffy, not oily. Worth crossing the road for.', photoUrl: foodImage('5560763'), timestamp: '2 days ago' },
  { id: 'r2', stallId: '1', userId: 'u2', foodType: 'Vada Pav', rating: 5, text: 'Classic Dadar stop. Go before 9am if you want zero queue and maximum crunch.', photoUrl: '', timestamp: '1 week ago' },
  { id: 'r3', stallId: '1', userId: 'u3', foodType: 'Chilli bhaji', rating: 4, text: 'Spicy, quick, iconic. Their dry garlic chutney is the move.', photoUrl: '', timestamp: '2 weeks ago' },
  { id: 'r4', stallId: '2', userId: 'u4', foodType: 'Pani Puri', rating: 5, text: 'The mint water is bright and cold. Loved the ragda finish.', photoUrl: '', timestamp: '4 days ago' },
  { id: 'r5', stallId: '3', userId: 'u1', foodType: 'Pav Bhaji', rating: 5, text: 'Smoky edges, lots of butter, excellent toasted pav. Come hungry.', photoUrl: '', timestamp: '3 weeks ago' },
  { id: 'r6', stallId: '4', userId: 'u2', foodType: 'Seekh Kebab', rating: 4, text: 'A proper late-night Mumbai classic. The roomali roti is soft and the kebab is smoky.', photoUrl: '', timestamp: '1 month ago' },
];

const wait = <T,>(value: T, ms = 180) => new Promise<T>((resolve) => setTimeout(() => resolve(value), ms));

export async function listStalls(query = '', foodType = 'All'): Promise<Stall[]> {
  const normalized = query.trim().toLowerCase();
  return wait(stalls.filter((stall) => {
    const matchesQuery = !normalized || `${stall.name} ${stall.area} ${stall.foodTypes.join(' ')}`.toLowerCase().includes(normalized);
    const matchesType = foodType === 'All' || stall.foodTypes.includes(foodType);
    return matchesQuery && matchesType;
  }));
}

export async function getStallById(id: string): Promise<Stall | undefined> {
  return wait(stalls.find((stall) => stall.id === id));
}

export async function getTopRatedStalls(limit = 10): Promise<Stall[]> {
  return wait([...stalls].sort((a, b) => b.avgRating - a.avgRating || b.reviewCount - a.reviewCount).slice(0, limit));
}

export async function getReviewsForStall(stallId: string): Promise<{ review: Review; user: User }[]> {
  return wait(reviews.filter((review) => review.stallId === stallId).map((review) => ({ review, user: users.find((user) => user.id === review.userId) ?? users[0] })));
}

export async function submitReview(input: Omit<Review, 'id' | 'timestamp' | 'userId'>): Promise<Review> {
  const review: Review = { ...input, id: `r${Date.now()}`, userId: 'u1', timestamp: 'just now' };
  reviews = [review, ...reviews];
  const stall = stalls.find((item) => item.id === input.stallId);
  if (stall) {
    const count = stall.reviewCount + 1;
    stall.avgRating = Number(((stall.avgRating * stall.reviewCount + input.rating) / count).toFixed(1));
    stall.reviewCount = count;
  }
  return wait(review, 260);
}

export async function submitStall(input: Omit<Stall, 'id' | 'avgRating' | 'reviewCount'>): Promise<Stall> {
  const stall: Stall = { ...input, id: `s${Date.now()}`, avgRating: 0, reviewCount: 0 };
  stalls.unshift(stall);
  return wait(stall, 300);
}

export const foodTypes = ['All', 'Vada Pav', 'Chaat', 'Pav Bhaji', 'Kebabs', 'Sandwiches', 'Dosa', 'Desserts'];
export const getInitialUser = () => users[0];