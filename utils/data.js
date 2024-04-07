const users = [
    ["Cdog", "cdog@gmail.com"],
    ["Lilly", "lilly@gmail.com"],
    ["Bily", "thelegend@hero.com"],
    ["Joel", "automaton@robot.com"],
    ["caveJohnson", "cjohnson@aperture.org"]
];

const thoughts = [
    "too much water",
    "needs lamb sauce",
    "a little sus",
    "a double decker pickup truck",
    "a combustible lemon",
    "super earth",
    "a camera with a flash you have to pay for",
    "16x the detail of fallout 4",
    "4x the size of fallout 4",
    "We should make a programming bootcamp"
];

const reactions = [
    "no",
    "yes",
    "I had a similar idea",
    "sounds like starwars",
    "to burn my house down?",
    "It was not, in fact, better than fallout 4",
    "I don't like this",
    "I heard they're reforming the dawnguard...",
    "for Super Earth",
    "...vampire hunters or something, in the old fort near Riften",
    "I had you figured for a mage",
    "you shal not pass!",
    "and MY AXE",
    "Gospel of the Throttle",
    "Hammer Down!",
    "Reloading!",
    "shh! my *common sense* is tingling - Deadpool",
    "I love the smell of 372, 844 pancakes in the morning",
    "smells like victory",
    "Battle Star Galactica is good",
    "I like turtles"
]

const getUserLength = () => {
    return users.length
}

const getUsernameEmail = (index) => {
    return users[index];
}

const getThoughtText = (index) => {
    return thoughts[index];
}

const getReactionBody = (index) => {
    return reactions[index]
}

// Export the functions for use in seed.js
module.exports = { getUserLength, getUsernameEmail, getThoughtText, getReactionBody };
