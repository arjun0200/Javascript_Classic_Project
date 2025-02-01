
const questionParent = document.querySelector(".question-container")
const optionParent = document.querySelector(".option-container")
const nextButton = document.querySelector(".next")
const quizCategory = document.querySelector(".quiz-category")
const qnsCount = document.querySelector(".qns-count")
const curScore = document.querySelector(".cur-score")

let quizzes = [];
let createQuestionIndex = 0;
let score = 0;
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

function createQuestionAndOption(quizzes, index){
    quizCategory.innerText = quizzes[index].category;
    qnsCount.innerText = `Q${index+1}/${quizzes.length}`;
    const questionEle = document.createElement("p");
    questionEle.innerText = quizzes[index].question;
    questionParent.appendChild(questionEle);
    let options = [quizzes[index].correct_answer, ...quizzes[index].incorrect_answers].sort(() => Math.random() - 0.5);
    for (let option of options){
        const optionBtn = document.createElement("button");
        optionBtn.setAttribute('name', option);
        optionBtn.classList.add("button");
        optionBtn.innerText = option;
        optionParent.appendChild(optionBtn);
    }
};

function disableOption(){
    document.querySelectorAll(".button").
    forEach((button) => (button.disabled = true))
};
optionParent.addEventListener("click", (e) =>{
    if (e.target.name===quizzes[createQuestionIndex].correct_answer){
        e.target.classList.add("correct");
        score++;
        curScore.innerText = `Score: ${score}`;
        disableOption();
    }
    else if(e.target.name !== quizzes[createQuestionIndex].correct_answer){
        e.target.classList.add('incorrect');
        disableOption();
    }
});

nextButton.addEventListener("click", () => {
    createQuestionIndex++;
    questionParent.innerHTML = "";
    optionParent.innerHTML = "";
    createQuestionAndOption(quizzes, createQuestionIndex);
})

setTimeout(() => createQuestionAndOption(quizzes, createQuestionIndex), 2000);