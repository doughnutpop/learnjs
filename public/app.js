'use strict';
var learnjs = {};

//source[learnjs/3100/public/app.js]{
learnjs.problems = [
    {
        description: "What is truth?",
        code: "function problem(){ return __; }"
    },
    {
        description: "Simple Math",
        code: "function problem(){ return 42 === 6 * __; }"
    }
];
//}

learnjs.applyObject = function(obj, elem){
    for(var key in obj){
        elem.find('[data-name="' + key + '"]').text(obj[key]);
    }
}

learnjs.temlate = function(name){
    return $('.templates .' + name).clone();
}

learnjs.problemView = function(data){
    var problemNumber = parseInt(data, 10);
    var view = learnjs.temlate('problem-view');
    var problemData = learnjs.problems[problemNumber - 1];
    var resultFlash = view.find('.result');

    function checkAnswer(){
        var answer = view.find('.answer').val();
        var test = problemData.code.replace('__', answer) + '; problem();';
        //console.log(answer);
        //console.log(test);

        return eval(test);
    }

    function checkAnswerClick(){
        if(checkAnswer()){
            var correctFlash = learnjs.temlate('correct-flash');
            correctFlash.find('a').attr('href', '#problem-' + (problemNumber + 1));
            learnjs.flashElement(resultFlash, correctFlash);
        } else {
            learnjs.flashElement(resultFlash, 'Incorrect!');
        }
        return false;
    }

    view.find('.check-btn').click(checkAnswerClick);
    view.find('.title').text('Problem #' + problemNumber);
    learnjs.applyObject(problemData,view);
    return view;
}

learnjs.buildCorrectFlash = function(problemNum){
    var correctFlash = learnjs.temlate('correct-flash');
    var link = correctFlash.find('a');
    if(problemNum < learnjs.problems.length){
      link.attr('href', '');
      link.text("You're Finished!");
    };
    return correctFlash;
}


learnjs.flashElement = function(elem, content){
    elem.fadeOut('fast', function(){
        elem.html(content);
        elem.fadeIn();
    });
}


learnjs.showView = function(hash){
    var routes = {
        '#problem': learnjs.problemView
    };
    var hashParts = hash.split('-');
    var viewFn = routes[hashParts[0]]; //problemviewを作成
    if(viewFn){
        //problemviewに数字を入れる
        $('.view-container').empty().append(viewFn(hashParts[1]));
    }
}

learnjs.appOnReady = function(){
    window.onhashchange = function(){
        learnjs.showView(window.location.hash);
    };
    learnjs.showView(window.location.hash);
}