const apiURL = "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple";

const getData = async (url) => {
    try {
        const { data : {results} } = await axios.get(url);
        return results;
    } catch (err) {
        console.log(err);
    }
};
const getQuizzes = async (URL) => {
    quizzes = await getData(URL);
    console.log(quizzes);
}

getQuizzes(apiURL);