// lib/constants.ts

export interface Review {
    name: string;
    place: string;
    review: string;
    destination: string;
    rating: number;
    tripDate: string;
    tripDuration: string;
    tripType: string;
    verified: boolean;
}

export const REVIEWS: Review[] = [
    {
        name: "Ankit Sharma",
        place: "Delhi",
        destination: "Goa",
        rating: 5,
        tripDate: "December 2024",
        tripDuration: "5 Days",
        tripType: "Family",
        verified: true,
        review:
            "Seamless experience from booking to travel. Purbodoy handled everything perfectly. The beach resorts were amazing and the local sightseeing was well organized. Highly recommend for family trips!",
    },
    {
        name: "Riya Das",
        place: "Kolkata",
        destination: "Himachal Pradesh",
        rating: 5,
        tripDate: "November 2024",
        tripDuration: "7 Days",
        tripType: "Friends",
        verified: true,
        review:
            "The itinerary was well-planned and stress-free. Highly recommended. We explored Shimla, Manali, and the beautiful valleys. The accommodation was top-notch and the guides were very knowledgeable.",
    },
    {
        name: "Arjun Mehta",
        place: "Mumbai",
        destination: "Rajasthan",
        rating: 4,
        tripDate: "October 2024",
        tripDuration: "6 Days",
        tripType: "Couple",
        verified: true,
        review:
            "Great support and transparent pricing. Loved it! The palaces and forts were breathtaking. The cultural experience was authentic and the food was delicious. Minor delay in one transfer but overall excellent.",
    },
    {
        name: "Priya Singh",
        place: "Bangalore",
        destination: "Kerala",
        rating: 5,
        tripDate: "September 2024",
        tripDuration: "8 Days",
        tripType: "Solo",
        verified: true,
        review:
            "Backwaters, houseboats, and Ayurvedic treatments - everything was perfect! Purbodoy made my solo trip safe and memorable. The local experiences were authentic and the photography opportunities were endless.",
    },
    {
        name: "Vikram Patel",
        place: "Ahmedabad",
        destination: "Northeast India",
        rating: 5,
        tripDate: "August 2024",
        tripDuration: "10 Days",
        tripType: "Adventure",
        verified: true,
        review:
            "Unforgettable adventure through Meghalaya, Assam, and Arunachal. The biodiversity was incredible and the tribal culture was fascinating. Purbodoy's local guides made this trip truly special.",
    },
    {
        name: "Sneha Kapoor",
        place: "Pune",
        destination: "Ladakh",
        rating: 5,
        tripDate: "July 2024",
        tripDuration: "9 Days",
        tripType: "Adventure",
        verified: true,
        review:
            "Ladakh exceeded all expectations! The high-altitude lakes, monasteries, and landscapes were breathtaking. Purbodoy arranged everything perfectly including acclimatization stops. The local culture and cuisine were amazing.",
    },
    {
        name: "Rahul Verma",
        place: "Jaipur",
        destination: "Andaman & Nicobar",
        rating: 5,
        tripDate: "June 2024",
        tripDuration: "7 Days",
        tripType: "Family",
        verified: true,
        review:
            "Perfect family getaway to the Andamans! Crystal clear waters, pristine beaches, and amazing snorkeling. The resorts were luxurious and the island hopping was well organized. Kids loved the water activities!",
    },
    {
        name: "Kavita Jain",
        place: "Chennai",
        destination: "Uttarakhand",
        rating: 4,
        tripDate: "May 2024",
        tripDuration: "6 Days",
        tripType: "Spiritual",
        verified: true,
        review:
            "Spiritual journey to the Himalayas was transformative. Visited Rishikesh, Haridwar, and several ashrams. The accommodation was comfortable and the local guides were very knowledgeable about spiritual practices.",
    },
    {
        name: "Amit Kumar",
        place: "Hyderabad",
        destination: "Sikkim & Darjeeling",
        rating: 5,
        tripDate: "April 2024",
        tripDuration: "8 Days",
        tripType: "Photography",
        verified: true,
        review:
            "Darjeeling and Sikkim were paradise for photographers! The tea gardens, monasteries, and mountain views were incredible. Purbodoy helped us get the best vantage points and arranged photography workshops.",
    },
];
