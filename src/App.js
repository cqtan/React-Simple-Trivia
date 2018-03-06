import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import './App.css';

const triviaData = [
    {
        question: "A Dark Souls 3 Locations Trivia Game! Only 1 answer is correct per question. Have Fun!!!" +
        "\n \nThe legendary city of the gods that has since been taken over by Aldrich, Devourer of Gods." +
        " What is its name?",
        correctAnswer: 3,
        answers: [
            "Ariandel Chapel",
            "Lothric Castle",
            "Anor Londo",
            "The Ringed City"
        ]
    },
    {
        question: "Where does Rosaria, Mother of Rebirth, reside?",
        correctAnswer: 2,
        answers: [
            "Farron Keep",
            "Cathedral of the Deep",
            "The Undead Settlement",
            "Archdragon Peak"
        ]
    },
    {
        question: "Pontiff Sulyvahn is the usurper of which city?",
        correctAnswer: 1,
        answers: [
            "Irithyll of the Boreal Valley",
            "Lothric Castle",
            "Church of Filianore",
            "The Undead Settlement"
        ]
    },
    {
        question: "Lord of Cinder, Ludleth of Courland, sits on his throne in which location?",
        correctAnswer: 1,
        answers: [
            "Firelink Shrine",
            "The Ringed City",
            "Road of Sacrifices",
            "Consumed King's Garden"
        ]
    },
    {
        question: "The ceasless clashing of swords of Farron's Legion can be heard where?",
        correctAnswer: 4,
        answers: [
            "The Ringed City",
            "Cathedral of the Deep",
            "The Profaned Capital",
            "Farron Keep"
        ]
    },
    {
        question: "Yhorm the Giant can be slain where?",
        correctAnswer: 3,
        answers: [
            "Archdragon Peak",
            "Depths of the Painting",
            "The Profaned Capital",
            "Untended Graves"
        ]
    },
    {
        question: "Company Captain Yorshka can be spoken to where?",
        correctAnswer: 4,
        answers: [
            "Grand Archives",
            "Earthen Peak Ruins",
            "The High Wall of Lothric",
            "Anor Londo"
        ]
    },
    {
        question: "The Pyromancy Tomes of Izalith and Quelana can be found where?",
        correctAnswer: 1,
        answers: [
            "Smouldering Lake",
            "Kiln of the First Flame",
            "Cathedral of the Deep",
            "Catacombs of Carthus"
        ]
    },
    {
        question: "The illusionary wall behind Oceiros, the Consumed King, leads to where?",
        correctAnswer: 2,
        answers: [
            "Road of Sacrifices",
            "Untended Graves",
            "Cemetary of Ash",
            "Irityll of the Boreal Valley"
        ]
    },
    {
        question: "Where do you awaken?",
        correctAnswer: 4,
        answers: [
            "Irythyll Dungeon",
            "Kiln of the First Flame",
            "Painted World of Ariandel",
            "Cemetary of Ash"
        ]
    },
    {
        question: "Game Over",
        correctAnswer: 0,
        answers: [
            "Reset",
            "Reset",
            "Reset",
            "Reset"
        ]
    }
];


function TriviaGameOverMessage(props) {
    let totalQuestions = triviaData.length-1;
    let winMessage = "You Win!!! Do you wish to link the fire?";
    let tryAgainMessage = props.correct + " out of " + totalQuestions + " correct! Try again!";
    let gameOverText = (props.win) ? winMessage : tryAgainMessage;

    return(
        props.gameOver &&
            <div className="container">
                <div className="jumbotron">
                    {gameOverText}
                </div>
            </div>
    )
}

function TriviaCounter(props) {
    return(
        <div className="panel-body">
            {props.answerCounter}
        </div>
    )
}

function TriviaCounterContainer(props) {
    return(
        <div className="panel panel-default">
            <div className="panel-heading">
                Number of correct answers:
            </div>
            <TriviaCounter answerCounter={props.correct}/>

            <div className="panel-heading">
                Number of wrong answers:
            </div>
            <TriviaCounter answerCounter={props.wrong}/>
        </div>
    )
}


function TriviaButton(props) {
    function handleChange() {
        props.clickHandler(props.id);
    }

    return(
        <div>
            <button type="button"
                    className="btn btn-info btn-block"
                    onClick={handleChange}
            >
                [{props.id}] {props.answer}
            </button>
        </div>
    )
}

function TriviaButtonContainer(props) {
    let buttons = props.answers.map((ans, index) =>
        <TriviaButton
            id={index+1}
            answer={ans}
            clickHandler={props.clickHandler}
        />
    )

    return(
        <div>
            {buttons}
        </div>
    )
}

function TriviaQuestion(props) {
    return(
        <div className="jumbotron">
            {props.question}
        </div>
    )
}


class TriviaApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: 0,
            question: triviaData[0].question,
            answers: triviaData[0].answers,
            correctAnswers: 0,
            wrongAnswers: 0,
            gameOver: false,
            win: false
        }
        this.clickHandler = this.clickHandler.bind(this)
        this.nextQuestion = this.nextQuestion.bind(this)
        this.evaluateAnswer = this.evaluateAnswer.bind(this)
        this.resetTrivia = this.resetTrivia.bind(this)
        this.endGame = this.endGame.bind(this)
        this.isWinner = this.isWinner.bind(this)
    }

    clickHandler(id) {
        this.evaluateAnswer(id);
        this.nextQuestion();
    }

    nextQuestion() {
        this.setState({counter: this.state.counter + 1}, function() {
            let counter = this.state.counter;

            if (counter === triviaData.length - 1)
                this.endGame();

            if (counter === triviaData.length)
                counter = this.resetTrivia();

            this.setState({
                question: triviaData[counter].question,
                answers: triviaData[counter].answers
            })
        })
    }

    evaluateAnswer(id) {
        if (triviaData[this.state.counter].correctAnswer === id) {
            this.setState({
                correctAnswers: this.state.correctAnswers + 1
            })
        } else {
            this.setState({
                wrongAnswers: this.state.wrongAnswers + 1
            })
        }
    }

    endGame() {
        this.setState({
            gameOver: true,
            win: this.isWinner()
        })
    }

    isWinner() {
        return (this.state.correctAnswers === triviaData.length - 1) ? true : false;
    }

    resetTrivia() {
        this.setState({
            counter: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            gameOver: false,
            win: false
        })
        return 0;
    }

    render() {
        return (
            <div className="container">
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12}>
                            <TriviaQuestion question={this.state.question}/>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={6}>
                            <TriviaButtonContainer
                                answers={this.state.answers}
                                clickHandler={this.clickHandler}
                            />
                        </Col>
                        <Col xs={6}>
                            <TriviaCounterContainer correct={this.state.correctAnswers}
                                                    wrong={this.state.wrongAnswers}/>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col>
                            <TriviaGameOverMessage gameOver={this.state.gameOver}
                                                   win={this.state.win}
                                                   correct={this.state.correctAnswers}
                                                   wrong={this.state.wrongAnswers}
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default TriviaApp;
