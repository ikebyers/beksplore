import { Types } from 'mongoose';

const usernames = [
    'PlayerOne',
    'RetailExpert',
    'CoolCat667',
    'ChillerMan9000',
    'LiveAndDieByDaSword',
    'TechieNoTecca',
    'Traveloo2',
    'GamerGyal',
    'FoodAndBevEnthusiast',
    'BookTapeWorm',
    'AVerySpicyOne',
    'LoneWolfSoldier',
];

const thoughtTexts = [
    'This is an amazing day!',
    'I can’t believe how awesome this app is!',
    'Just had the best meal ever.',
    'Coding is so much fun!',
    'Learning TypeScript has been an adventure.',
    'Who else loves React?',
    'The world needs more kindness.',
    'How does everyone feel about the latest tech trends?',
    'I’m so excited about my new project!',
    'What are your thoughts on AI and humanity?',
    'WHY HAVE YOU FORSAKEN ME ?!?!?!?!',
    'me and oomf >>>>',
    'hear me out...',

];

const reactionBodies = [
    'I totally agree!',
    'That’s amazing!',
    'You’re so right.',
    'Thanks for sharing!',
    'This is very insightful.',
    'Keep up the great work!',
    'Love this!',
    'Couldn’t have said it better myself.',
    'Inspiring!',
    'So true!',
    'HOW COULD YOU SAY THIS!!!!!!!',
    'I am disappointed in you...',
];

// random item helper
const getRandomItem = (arr: string[]): string => arr[Math.floor(Math.random() * arr.length)];

// random number of reactions helper
const getRandomReactions = (count: number) => {
    const reactions = [];
    for (let i = 0; i < count; i++) {
        reactions.push({
            reactionId: new Types.ObjectId(),
            reactionBody: getRandomItem(reactionBodies),
            username: getRandomItem(usernames),
        });
    }
    return reactions;
};

// thought generator
const getRandomThoughts = (count: number) => {
    const thoughts = [];
    for (let i = 0; i < count; i++) {
        thoughts.push({
            thoughtText: getRandomItem(thoughtTexts),
            username: getRandomItem(usernames),
            reactions: getRandomReactions(Math.floor(Math.random() * 4)),
        });
    }
    return thoughts;
};

export { usernames, getRandomThoughts };