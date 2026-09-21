import { SchoolProjectData, FunFact } from '../types';

export const initialSchoolData: SchoolProjectData = {
  name: "Gabriella",
  subtitle: "Welcome to my 'All About Me' School Project!",
  ageOrGrade: "9th Grade / High School",
  birthday: "October 14th",
  hometown: "Atlanta, Georgia",
  motto: "Work hard, be kind, and always stay curious.",
  aboutMeParagraph: "Hi! My name is Gabriella and this is my digital 'All About Me' portfolio project. I love learning new things, creating digital projects, spending time with my family and friends, and making people smile. Thank you for visiting my project!",
  personalityWords: ["Creative", "Thoughtful", "Hardworking", "Friendly", "Curious", "Optimistic"],
  
  familyStory: "My family is my biggest cheer squad. We love spending weekends cooking together, going for walks, and having family game nights where we get super competitive!",
  familyMembers: [
    {
      id: "fam-1",
      relation: "Mom",
      name: "Mom",
      funFact: "Makes the world's best homemade lasagna and always gives the greatest advice."
    },
    {
      id: "fam-2",
      relation: "Dad",
      name: "Dad",
      funFact: "Told me my very first dad joke and taught me how to ride a bike."
    },
    {
      id: "fam-3",
      relation: "Sibling",
      name: "Alex",
      funFact: "My partner-in-crime for video games, building pillow forts, and laughing until our stomachs hurt."
    }
  ],
  pets: [
    {
      id: "pet-1",
      name: "Milo",
      type: "Golden Retriever Puppy",
      emoji: "🐶",
      personality: "High energy, loves tennis balls, and will do anything for a spoonful of peanut butter!"
    },
    {
      id: "pet-2",
      name: "Luna",
      type: "Calico Cat",
      emoji: "🐱",
      personality: "The queen of sunbathing by the living room window and purring while I do homework."
    }
  ],
  favoriteTradition: "Every Sunday night we make homemade stove-top popcorn and watch a classic movie together with extra blankets.",

  favorites: {
    color: "Baby Blue & Soft Lavender",
    food: "Homemade Pasta & Street Tacos",
    subject: "English Literature & Technology",
    season: "Fall / Autumn (Sweater weather & cozy vibes)",
    animal: "Golden Retrievers & Sea Otters",
    song: "Upbeat Acoustic & Indie Pop",
    movie: "Inside Out & Little Women",
    book: "The Giver & Harry Potter Series",
    snack: "Warm chocolate chip cookies with cold milk",
    sportOrActivity: "Volleyball, Art Drawing, & Coding"
  },

  goals: [
    {
      id: "g-1",
      title: "Maintain Honor Roll grades across all classes this semester",
      category: "School",
      status: "In Progress"
    },
    {
      id: "g-2",
      title: "Join the school Computer Science & Creative Arts clubs",
      category: "School",
      status: "In Progress"
    },
    {
      id: "g-3",
      title: "Read at least 15 books outside of required school reading",
      category: "Personal",
      status: "In Progress"
    },
    {
      id: "g-4",
      title: "Complete my first full web app from start to finish",
      category: "Personal",
      status: "Achieved"
    },
    {
      id: "g-5",
      title: "Travel to Japan to see cherry blossoms and historical sights",
      category: "Bucket List",
      status: "In Progress"
    }
  ],
  futureDream: "In the future, I want to pursue a career in technology and creative design—building apps and tools that help people and make learning fun and accessible for everyone!"
};

export const schoolTriviaQuestions: FunFact[] = [
  {
    id: "q-1",
    question: "What is Gabriella's absolute favorite color combo?",
    options: ["Neon Green & Orange", "Baby Blue & Soft Lavender", "Red & Black", "Yellow & Gray"],
    correctIndex: 1,
    explanation: "Baby Blue and soft Lavender are Gabriella's favorite aesthetic colors!"
  },
  {
    id: "q-2",
    question: "Which subject in school is Gabriella most excited about?",
    options: ["English & Technology", "Gym only", "Advanced Calculus", "Ancient Geology"],
    correctIndex: 0,
    explanation: "She loves both creative writing in English and building digital creations in Technology!"
  },
  {
    id: "q-3",
    question: "What is her family's favorite weekend tradition?",
    options: ["Waking up at 5am for marathons", "Sunday movie night with homemade popcorn", "Camping in the snow", "Painting garage doors"],
    correctIndex: 1,
    explanation: "Sunday movie night with warm homemade popcorn and blankets is the family favorite!"
  },
  {
    id: "q-4",
    question: "What is one of Gabriella's top future career goals?",
    options: ["Astronaut chef", "Software & Creative UX Designer", "Professional skateboarder", "Submarine captain"],
    correctIndex: 1,
    explanation: "She dreams of combining creativity and coding to design impactful apps and software!"
  }
];
