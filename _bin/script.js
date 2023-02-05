$(function() {
    $('#quizknop, #quiz').hide();
    
    slowShowText('.slowType', function() { $('#quizknop').show(); });
})

function gotoquiz() {
    $('#quiz').show();
    toggleVisability('#intro', null, function() {
        $('#intro').remove();
        nextQuestion();
    });
}

function getQuestion(index) {
    currentQuestion = index;

    $('#response, #answers').html('').show();
    
    for (let aIndex = 0; aIndex < questions[index].answers.length; aIndex++) {
        $('#answers').append(`<button type="button" class="button-49" style="display:none" onclick="answerQuestion(${aIndex})">${questions[index].answers[aIndex]}</button>`);
        
        if (questions[index].answers[aIndex] === '<3') {
            $('#answers > button').addClass('pink');
        }
    }
    
    $('#question').html(questions[index].question);
    
    slowShowText('#question', function() {
        toggleVisability('#answers > button', null, function() {
            $('#answers > button').show().on('mouseover', function() {
                if (this.innerHTML === 'Sws niet') {
                    displaceElement(this);
                }
            });
        });
    });
}

function displaceElement(element) {
    const $element = $(element);

    $element.addClass('floating');

    const btnWidth = $element.width();
    const btnHeight = $element.height();

    const windowWidth = $(window).width();
    const windowHeight = $(window).height();

    const newX = Math.floor(Math.random() * (windowWidth - btnWidth - 100));
    const newY = Math.floor(Math.random() * (windowHeight - btnHeight - 100));

    $element.css({"left": newX + "px", "top": newY + "px"});
}

function slowShowText(elements, callback) {
    $(elements).each(function(_, elem) {
        const text = $(elem).text();    
        let newText= '';
        let charIndex = 0;
        let textSpeed = 50;
        let interval = setInterval(function() {
            
            if (text[charIndex] === '|') {
                newText += '<br/>';
            } else {
                newText += text[charIndex];
            }
            $(elem).html(newText + '<span class="curser">|</span>').show();
            charIndex++;
    
            if (charIndex >= text.length) {
                clearInterval(interval);
                interval = null;
                $('.curser').addClass('blinking');
    
                if (callback != null && callback != undefined && typeof callback === 'function') {
                    callback();
                }
            }
        }, textSpeed);
    });
}

function toggleVisability(element, blinkAmount, callback) {
    const maxLength = blinkAmount ?? 5;
    for (let i = 0; i <= maxLength; i++) {
        setTimeout(function() {
            if (i == maxLength) {
                if (callback != undefined && callback != null && typeof callback == 'function') {
                    callback();
                } else {
                    $(element).toggle();
                }
            } else {
                $(element).toggle();
            }
        }, 50 * i);
    }
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        getQuestion(currentQuestion + 1);
    } else {
        showLove();
    }
}

function answerQuestion(index) {
    $('#response').hide();
    
    const goodAnswer = questions[currentQuestion].rightAnswer.indexOf(index) > -1;

    if (goodAnswer) {
        $('#response').html(questions[currentQuestion].responseRight ?? '');
    } else {
        $('#response').html(questions[currentQuestion].responseWrong ?? '');
    }

    toggleVisability('#question, #answers', null, function() {
        slowShowText('#response', function() {
            setTimeout(function() {
                toggleVisability('#response', null, function() {
                    if (goodAnswer) {
                        nextQuestion();
                    } else {
                        getQuestion(currentQuestion);
                    }
                });
            }, 2000);
        });
    });
}

function showLove() {
    $('#love').addClass('active');
}

function sluiten() {
    window.close();
}

let currentQuestion = -1;
const questions = [
    {
        "question": "Wat is de eerste knuffel die je van mij hebt gekregen?",
        "answers": ["Hondje", "Avocado", "Kwal", "Dino"],
        "rightAnswer": [0],
        "responseRight": "Dat was het goede antwoord.|Door naar de volgende vraag.",
        "responseWrong": "Dat was het goede antwoord.|Oh wacht... toch niet....."
    },
    {
        "question": "Wanneer was de eerste blackout waar we samen met z'n 2en heen zijn gegaan?",
        "answers": ["5 oktober 2019", "15 november 2019", "19 januari 2020", "7 februari 2020"],
        "rightAnswer": [3],
        "responseRight": "Dit was het goede antwoord.",
        "responseWrong": "Helaas."
    },
    {
        "question": "Wanneer zijn we voor het eerst sushi gaan eten en had ik je ouders voor het eerst gezien?",
        "answers": ["7 januari 2020", "22 februari 2020", "2 maart 2020", "15 april 2020"],
        "rightAnswer": [1],
        "responseRight": "Dit was het goede antwoord.|Ik zou eigenlijk wel weer naar dat restaurant willen gaan.",
        "responseWrong": "Helaas, niet goed."
    },
    {
        "question": "Hoe vaak knippert een persoon gemiddeld per dag?",
        "answers": ["140", "1.400", "14.000", "140.000"],
        "rightAnswer": [2],
        "responseRight": "Wauw, alweer goed.",
        "responseWrong": "Ik had wel verwacht dat je dit zou weten..."
    },
    {
        "question": "Welk van de volgende opties vind ik het leukste aan jou?",
        "answers": ["Je gezicht", "Je borsten", "Je billen", "Je persoonlijkheid"],
        "rightAnswer": [0,1,2,3],
        "responseRight": "FOUT. Je bent perfect in elk opzicht."
    },
    {
        "question": "En wat vind je het leukste aan mij?",
        "answers": ["Mijn gezicht", "Mijn tepels", "Mijn grote pik", "Mijn persoonlijkheid"],
        "rightAnswer": [0,1,2,3],
        "responseRight": "Ik dacht al dat je dat ging kiezen.|Het staat genoteerd."
    },
    {
        "question": "Ben ik de grappigste persoon met de beste humor en vergeet ik nooit iets wat je mij verteld?",
        "answers": ["100%", "Sws niet"],
        "rightAnswer": [0],
        "responseRight": "Fijn dat we het daar over eens zijn",
        "responseWrong": "Hoe kreeg je dat voor elkaar?"
    },
    {
        "question": "Wil je mijn valentijn zijn?",
        "answers": ["\<3", "\<\\3"],
        "rightAnswer": [0],
        "responseRight": ":)",
        "responseWrong": ":(|Geen cadeautjes voor jou"
    },
];