var form = document.querySelector('#form')
var answer = document.querySelector('#answer')
var Square = document.querySelector('.cQuestion')
var mainContainer = document.getElementById('mainContainer')


var Asks = ["Who wrote the book Chitty-Chitty-Bang-Bang: The Magical Car?", "In which part of your body would you find the cruciate ligament?", "What is the name of the main antagonist in the Shakespeare play Othello?", "When was the movie the Titanic released?", "What element is denoted by the chemical symbol Sn in the periodic table?", "How many of Henry VIII's wives were called Catherine?", "What was the most popular girls name in the UK in 2021?", "What is the name of the 1976 film about the Watergate scandal, starring Robert Redford and Dustin Hoffman?", "Which comedian was the second permanent host of Never Mind the Buzzcocks after Mark Lamarr?", "What is the capital of Finland?", "Which popular video game franchise has released games with the subtitles World At War and Black Ops?", "In what US state is the city Nashville?", "Which rock band was founded by Trent Reznor in 1988?", "What is the currency of Denmark?", "Which Tennis Grand Slam is played on a clay surface?", "In which European country would you find the Rijksmuseum?", "How many films have Al Pacino and Robert De Niro appeared in together?", "What was the old name for a Snickers bar before it changed in 1990?", "Who was the head of state in Japan during the Second World War?", "What is the smallest planet in our solar system?", "Who wrote the novels Gone Girl and Sharp Objects?", "Which legendary surrealist artist is famous for painting melting clocks?", "Which football club plays its home games at Loftus Road?", "Continental United States has 4 time zones, can you name them?", "What was the Turkish city of Istanbul called before 1930?", "From which US city do the band The Killers originate?", "Name the Coffee shop in US sitcom Friends.", "How many human players are there on each side in a polo match?", "In what year did Tony Blair become British Prime Minister?", "How many times has England won the men's football World Cup?", "What is the common name for the larva of a housefly?", "Street artist Banksy is originally associated with which British city?", "From what grain is the Japanese spirit Sake made?"];
var Answers = ["Ian Fleming", "Knee", "Iago", "1997", "Tin", "3", "Olivia", "All the President's Men", "Simon Amstell", "Helsinki", "Call of Duty", "Tennessee", "Nine Inch Nails", "Krone", "The French Open", "Netherlands", "4", "Marathon", "Hirohito", "Mercury", "Gillian Flynn", "Salvador Dali", "Queen's Park Rangers", "Pacific - Mountain - Central - Eastern", "Constantinople", "Las Vegas", "Central Perk", "4", "1997", "1", "Maggot", "Bristol", "Rice"]
var Questions = []
var chosenQuestion;
var CorrecAudio = new Audio('CorrectAudio.mp3')
var WrongAudio = new Audio('WrongAudio.mp3')


var pointsCounter = 0;
if (!points){
    var points = document.createElement('p')
    mainContainer.appendChild(points)
    mainContainer.insertBefore(points, Square)
    points.classList.add('points')
    points.innerHTML = 'Pts:' + 0
}
function pointsAdd(){
    pointsCounter++
    points.innerHTML = 'Pts:' + pointsCounter
}


class Question{
    constructor(question, answer){
        this.question = question
        this.answer = answer
    }
    answerCheck(introducedAnswer, displayDiv){
        if (introducedAnswer == this.answer.toUpperCase()){
            displayDiv.textContent = 'Correct!'
            CorrecAudio.play()
        }
        else if (introducedAnswer != this.answer.toUpperCase() && introducedAnswer != ''){
            displayDiv.textContent = 'Incorrect :('
            WrongAudio.play()
        }
        else{
            displayDiv.textContent = 'No response entered'
        }
    }
}


for (let i = 0; i < Asks.length; i++){
    var Qs= new Question(Asks[i], Answers[i])
    Questions.push(Qs)
}

function PickAQuestion(Questions){
    chosenQuestion = Questions[Math.floor((Math.random()*Questions.length))]
    Square.textContent = chosenQuestion.question
}

var previousQuestion = chosenQuestion
PickAQuestion(Questions)

if (chosenQuestion === previousQuestion){
    PickAQuestion(Questions)
}


form.addEventListener('submit', (e)=>{
    e.preventDefault()

    var yourAnswer = answer.value.toUpperCase()
    answer.value = ''
    chosenQuestion.answerCheck(yourAnswer, Square)

    if (Square.innerHTML === 'Correct!'){
        pointsAdd()
    }

    var loadBar = document.createElement('div')
    loadBar.setAttribute('id', 'loadingBar')
    mainContainer.appendChild(loadBar)

    var CorrectAnswer = document.createElement('p')
    CorrectAnswer.innerHTML = "Answer: " + chosenQuestion.answer
    CorrectAnswer.style.fontSize = '20px'
    CorrectAnswer.style.textShadow = '3px 3px 0px black, 5px 5px 0px black'
    Square.appendChild(CorrectAnswer)


    var count = 5;
    var counter = document.createElement('p');
    counter.classList.add('counter');
    counter.innerHTML = count
    mainContainer.appendChild(counter)
    mainContainer.insertBefore(counter, Square)

    setTimeout(()=>{
        previousQuestion = chosenQuestion
        PickAQuestion(Questions)

        if (chosenQuestion === previousQuestion){
            PickAQuestion(Questions)
        }
        loadBar.remove()
        counter.remove()
    }, 5000)

    var interval = setInterval(Counter, 1000);
    
    function Counter(){
        count--
        counter.innerHTML = count
        if (count == 1){
            clearInterval(interval)
        }
    }
})