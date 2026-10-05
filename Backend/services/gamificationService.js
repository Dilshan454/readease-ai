const calculatePoints = (activity, score = 0) => {

    let points = 0;

    switch (activity) {

        case "lesson":
            points = 10;
            break;

        case "exercise":
            points = score * 5;
            break;

        case "phonetic":
            points = 5;
            break;

        case "reading":
            points = 10;
            break;

        default:
            points = 0;
    }

    return points;
};


const getLevel = (totalPoints) => {

    if (totalPoints >= 100) {
        return "Level 4 - Dyslexia Master";
    }

    if (totalPoints >= 50) {
        return "Level 3 - Learning Star";
    }

    if (totalPoints >= 20) {
        return "Level 2 - Fast Learner";
    }

    return "Level 1 - Beginner";
};


const getBadge = (totalPoints) => {

    if (totalPoints >= 100) {
        return "Dyslexia Master";
    }

    if (totalPoints >= 50) {
        return "Learning Star";
    }

    if (totalPoints >= 20) {
        return "Fast Learner";
    }

    if (totalPoints >= 10) {
        return "First Step";
    }

    return "No Badge Yet";
};


module.exports = {
    calculatePoints,
    getLevel,
    getBadge
};