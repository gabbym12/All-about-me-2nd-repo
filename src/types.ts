export type PageId = 'about' | 'family' | 'favorites' | 'goals' | 'trivia';

export interface FamilyMember {
  id: string;
  relation: string;
  name: string;
  funFact: string;
}

export interface PetInfo {
  id: string;
  name: string;
  type: string;
  emoji: string;
  personality: string;
}

export interface GoalItem {
  id: string;
  title: string;
  category: 'School' | 'Personal' | 'Dream Career' | 'Bucket List';
  status: 'In Progress' | 'Achieved';
}

export interface SchoolProjectData {
  name: string;
  subtitle: string;
  ageOrGrade: string;
  birthday: string;
  hometown: string;
  motto: string;
  aboutMeParagraph: string;
  personalityWords: string[];
  
  // Family & Pets
  familyStory: string;
  familyMembers: FamilyMember[];
  pets: PetInfo[];
  favoriteTradition: string;
  
  // Favorites
  favorites: {
    color: string;
    food: string;
    subject: string;
    season: string;
    animal: string;
    song: string;
    movie: string;
    book: string;
    snack: string;
    sportOrActivity: string;
  };

  // Goals
  goals: GoalItem[];
  futureDream: string;
}

export interface FunFact {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
