let itemList = []; //Stores all of the items you are voting on.

/* CREATE A NEW VOTE VARAIBLES */

let newItem; //Temporarily stores the new item you want to add to your list.
let itemListHTMLText = ''; //The variable that stores the full string for the HTML Preview on the New Vote Screen
let itemListHTMLPreview =  document.getElementById('preview-voting-item-list'); //This variable actually updates the inner HTML


let newListValues;
let text = "<th></th>";
let matrix = [];
let booleanMatrix = [];
let totalVotes = [];
let list = [];


let sumTotalVotes = 0;

let chooseRow;
let chooseColumn;

let lastRowChoice = 0;
let lastColumnChoice = 0;

let fifoRow; //pop[0], push[l-1];
let fifoColumn;

let totalRounds;
let idealAverage;

let sum = 0;

let choiceA_Rating;
let choiceB_Rating;
let choiceA_ExpectedScore;
let choiceB_ExpectedScore;
let choiceA_TotalVotes;
let choiceB_TotalVotes;
let choiceA_K;
let choiceB_K;

let choiceA_minus_choiceB;
let choiceB_minus_choiceA;
let percentageRemainingVotes;

let colorscale = ['#cb4064', '#c94064', '#c73f64', '#c53f64', '#c33f64', '#c13f63', '#bf3e63', '#bd3e63', '#bb3e63', '#ba3e63', '#b83d63', '#b63d63', '#b43d63', '#b23d63', '#b03c62', '#ae3c62', '#ac3c62', '#aa3c62', '#a83b62', '#a63b62', '#a43b62', '#a23b62', '#a03a62', '#9e3a61', '#9c3a61', '#9b3a61', '#993961', '#973961', '#953961', '#933861', '#913861', '#8f3861', '#8d3860', '#8b3760', '#893760', '#873760', '#853760', '#833660', '#813660', '#7f3660', '#7d3660', '#7b355f', '#7a355f', '#78355f', '#76355f', '#74345f', '#72345f', '#70345f', '#6e345f', '#6c335f', '#6a335f', '#68335e', '#66325e', '#64325e', '#62325e', '#60325e', '#5e315e', '#5c315e', '#5a315e', '#59315e', '#57305d', '#55305d', '#53305d', '#51305d', '#4f2f5d', '#4d2f5d', '#4b2f5d', '#492f5d', '#472e5d', '#452e5c', '#432e5c', '#412e5c', '#3f2d5c', '#3d2d5c', '#3b2d5c', '#3a2d5c', '#382c5c', '#362c5c', '#342c5b', '#322b5b', '#302b5b', '#2e2b5b', '#2c2b5b', '#2a2a5b', '#282a5b', '#262a5b', '#242a5b', '#22295a', '#20295a', '#1e295a', '#1c295a', '#1a285a', '#19285a', '#17285a', '#15285a', '#13275a', '#112759', '#0f2759', '#0d2759', '#0b2659', '#092659'];
let darkcolorscale = ['#972906', '#962908', '#962909', '#95290b', '#94290d', '#942a0e', '#932a10', '#932a11', '#922a12', '#912a13', '#912a15', '#902a16', '#8f2a17', '#8f2a18', '#8e2a19', '#8d2a1a', '#8d2b1c', '#8c2b1d', '#8b2b1e', '#8b2b1f', '#8a2b20', '#892b21', '#892b22', '#882b23', '#872b24', '#872b25', '#862b26', '#852b27', '#852c28', '#842c29', '#832c29', '#832c2a', '#822c2b', '#812c2c', '#802c2d', '#802c2e', '#7f2c2f', '#7e2c30', '#7e2c31', '#7d2c32', '#7c2c33', '#7b2c34', '#7b2d35', '#7a2d35', '#792d36', '#782d37', '#782d38', '#772d39', '#762d3a', '#752d3b', '#742d3c', '#742d3d', '#732d3d', '#722d3e', '#712d3f', '#702d40', '#702d41', '#6f2e42', '#6e2e43', '#6d2e44', '#6c2e45', '#6b2e45', '#6b2e46', '#6a2e47', '#692e48', '#682e49', '#672e4a', '#662e4b', '#652e4c', '#642e4d', '#632e4d', '#622e4e', '#612e4f', '#602e50', '#5f2f51', '#5e2f52', '#5d2f53', '#5c2f54', '#5b2f54', '#5a2f55', '#592f56', '#582f57', '#572f58', '#562f59', '#552f5a', '#542f5b', '#522f5c', '#512f5c', '#502f5d', '#4f2f5e', '#4d2f5f', '#4c2f60', '#4b3061', '#4a3062', '#483063', '#473064', '#453064', '#443065', '#423066', '#413067', '#3f3068'];


let elo = [];

/* CREATING THE ITEM LIST */


function appendVotingList(){ 
    
    //Step 1: Get the value of the new item
        newItem = document.getElementById('add-new-voting-item').value;

    //Step 2: Check to see if the value is not blank
        if (newItem == ''){
            alert('Please enter a valid item name');
            return false;

    //Step 3: If the first check clears, check to see if the item already exists in the array
        } else if (itemList.includes(newItem)){
            alert('Please do not enter duplicate list items');
            return false;

    //Step 4: If THAT check clears, add the list item to the array
        } else {
            itemList.push(newItem);
            itemListHTMLText = "";
        };

    //Step 5: Update the HTML to reflect the current list
        for (let i=0; i<itemList.length; i++){
            itemListHTMLText += '<li class="itemListItem"><div class="listItemText">' + itemList[i] + '</div><button type="button" class="removeListItemButton" onclick=spliceVotingList(' + i + ')><img type="svg" src="assets/icon/trash.svg"></button></li>'; //Button allows you to delete that specific list item.
        }

        itemListHTMLPreview.innerHTML = '<ul class="itemList">' + itemListHTMLText + '<div id="bottom"></div></ul>';
        clearCurrentValues();



        if (itemList.length >= 3){
            document.getElementById("submit").style.display = 'flex';
            document.getElementById("disable-submit").style.display = 'none';
        }


        document.getElementById('bottom').scrollIntoView();

        if (itemList.length > 0){
            document.getElementById("welcome-message").style.display = 'none';
        } else {
            document.getElementById("welcome-message").style.display = 'flex';
        }


}


function helpToggle(){
    help = document.getElementById("help");
    console.log("Help Toggle Triggered")
    
    if (help.style.display == 'flex'){
        help.style.display = 'none';
    } else if (help.style.display == 'none'){
        help.style.display = 'flex';
    };
}


//On average, it takes about 5 seconds per vote.

function clearCurrentValues(){
    document.getElementById('add-new-voting-item').value = '';
}


/* REMOVING ITEMS FROM THE ITEM LIST  */

function spliceVotingList(listItemNumber){
    //Step 1: Clear the old list item text
    itemListHTMLText = '';

    //Step 2: Removes the list item specified by variable 'listItemNumber'
    itemList.splice(listItemNumber, 1);

    //Step 3: Rebuilds the HTML Text to reflect the current list
    for (let i=0; i<itemList.length; i++){
        itemListHTMLText += '<li class="itemListItem"><div class="listItemText">' + itemList[i] + '</div><button type="button" class="removeListItemButton" onclick=spliceVotingList(' + i + ')><img type="svg" src="assets/icon/trash.svg"></button></li>';
    }
    itemListHTMLPreview.innerHTML = '<ul class="itemList">' + itemListHTMLText +'<div id="bottom"></div></ul>';


    //Step 4: Update Style Rules to Reflect Current System Status

    if (itemList.length == 0){
        document.getElementById("welcome-message").style.display = 'flex';
    } else {
        document.getElementById("welcome-message").style.display = 'none';
    };

    if (itemList.length <= 2){
        document.getElementById("submit").style.display = 'none';
        document.getElementById("disable-submit").style.display = 'flex';
    }


}


window.onkeyup = function(event) {
    const el = document.querySelector('.new-vote-textbox');
    if (el === document.activeElement){
        if (event.which == 13) {
            appendVotingList();

        }
    }
}


//OLD CODE GOES HERE


function readData() {
    console.log("readData called");
  
    // Does this browser support local storage?
    if (typeof (Storage) !== "undefined") {
        console.log("Browser supports local storage");
    
        if (window.localStorage.getItem('matrix')){
          /*   let lastList = window.localStorage.getItem('sanitized-list');
            document.getElementById("write-new-list").value = lastList; */

            
            itemList = JSON.parse(window.localStorage.getItem('list'));
            matrix = JSON.parse(window.localStorage.getItem('matrix'));
            booleanMatrix = JSON.parse(window.localStorage.getItem('boolean-matrix'));
            elo = JSON.parse(window.localStorage.getItem('elo'));
            totalVotes = JSON.parse(window.localStorage.getItem('votes'));
            sumTotalVotes = JSON.parse(window.localStorage.getItem('sum-total-votes'));


            console.log(itemList);
            console.log(matrix);
            console.log(booleanMatrix);
            console.log(elo);
            console.log(totalVotes);
            console.log(sumTotalVotes)


            if (window.localStorage.getItem('sum-total-votes') == null){
                sumTotalVotes = 0;
            };

            createNewList();

        }

    } else {
      // Sorry! No Web Storage support..
      alert('This browser does NOT support local storage');
    }
  }
  



let form = document.getElementById("create-new-list");
function handleForm(event) { 
    event.preventDefault(); 
} 
form.addEventListener('submit', handleForm);

function sanitizeInputs(str){
    str = str.replace(/[^a-z0-9áéíóúñü \,-]/gim,"");
    return str.trim();
}

function sumArrays(array){
    sum = 0;
    for (let i = 0; i < array.length; i++){
        sum += array[i];
    }
    return sum;
}

function findK(votes, rating){
    let k;
    if ((votes <= 30) & (rating <= 6000)){
        k = 100;
    } else if ((votes >= 30) & (rating <= 6000)){
        k = 50;
    } else if ((votes >= 30) & (rating >= 6000)){
        k = 25
    };

    return k;
};

function getExpectedScore(primary, secondary){
    let difference = secondary - primary;
    let chances = 1/(1+10**((difference)/1000));
    return chances;
}


function shuffle(array){
    let flattenedArray = array.flat();
    let currentIndex = flattenedArray.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [flattenedArray[currentIndex], flattenedArray[randomIndex]] = [
        flattenedArray[randomIndex], flattenedArray[currentIndex]];
    }
  
    return flattenedArray;
}


function sortResults(elo, name){
        // Create a map to store the relationships between elements in arr1 and arr2
        const mapping = new Map(name.map((element, index) => [element, elo[index]]));
        // Sort the second array (arr2) in ascending order
        elo.sort((a, b) => b - a);
        // Sort the first array (arr1) based on the order of elements in the sorted arr2
        name.sort((a, b) => mapping.get(b) - mapping.get(a));
        return [elo, name]; // Return both sorted arrays
}

function elo_to_percentage(elo, min, max){
    let elo_difference = max - min;
    let percentage = (elo - min) / elo_difference;
    return percentage;
}


function elo_percent_from_neutral(elo){
    let neutral_elo = 1000;
    let percent_from_neutral = elo / neutral_elo;
    let reported_difference;
    if (percent_from_neutral <= 1.0){
        /* Negative Difference */
        reported_difference = '-' + (100-(percent_from_neutral*100)).toFixed(1) + '%';
    } else if (percent_from_neutral >= 1.0){
        /* Positive Difference */
        reported_difference = '+' + ((percent_from_neutral * 100) - 100).toFixed(1) + '%'; 
    } else if (percent_from_neutral == 1.0){
        reported_difference = '0%';
    }
    return reported_difference;
};

function elo_color_percent_from_neutral(elo){
    let neutral_elo = 1000;
    let percent_from_neutral = elo / neutral_elo;
    let color;
    if (percent_from_neutral <= 1.0){
        /* Negative Difference */
        color = "#00255D"
    } else if (percent_from_neutral >= 1.0){
        /* Positive Difference */
        color = "#00255D"
    } else if (percent_from_neutral == 1.0){
        color = "#00255D"
    }
    return color;
};

function color_for_score(score){
    let colors = ['#CB4064', '#E36F3D', '#ad5e3a', '#3b7f55', '#092659'];
    let bgcolor;
    if (score >= 80){
        bgcolor = colors[4];
    } else if ((score >= 60) && (score <= 80)){
        bgcolor = colors[3];
    } else if ((score >= 40) && (score <= 60)){
        bgcolor = colors[2];
    } else if ((score >= 20) && (score <= 40)){
        bgcolor = colors[1];
    } else if (score <= 20){
        bgcolor = colors[0];
    }
    return bgcolor;
}


function percentage_to_grade(percentage){
    let rank = (percentage * 100).toFixed(0)
    let grade;
    if (rank >= 94){
        grade = "A+";
    } else if ((rank >= 86 ) && (rank <= 94)){
        grade = "A";
    } else if ((rank >= 80 ) && (rank <= 86)){
        grade = "A-";
    } else if ((rank >= 74 ) && (rank <= 80)){
        grade = "B+";
    } else if ((rank >= 66 ) && (rank <= 74)){
        grade = "B";
    } else if ((rank >= 60 ) && (rank <= 66)){
        grade = "B-";
    } else if ((rank >= 54 ) && (rank <= 60)){
        grade = "C+";
    } else if ((rank >= 46) && (rank <= 54)){
        grade = "C";
    } else if ((rank >= 40 ) && (rank <= 46)){
        grade = "C-";
    } else if ((rank >= 34 ) && (rank <= 40)){
        grade = "D+";
    } else if ((rank >= 26 ) && (rank <= 34)){
        grade = "D";
    } else if ((rank >= 20 ) && (rank <= 26)){
        grade = "D-";
    } else if (rank <= 20 ){
        grade = "F"
    } else {
        grade = "N/A"
    }
    console.log(grade);
    return grade;

};

function printMatrix(myArray){

    sortResults(elo, list);
    
    let eloMax = Math.max(...elo);
    let eloMin = Math.min(...elo)

    let result = "";
    result += '<div class="results-item" id="results-listing-header"><p class="result-item">Place</p><p class="result-item">Item</p><p class="result-item" id="result-header-score">Score</p></div>';

    for (let i=0; i<myArray.length; i++) {
        let score_percent = elo_to_percentage(elo[i], eloMin, eloMax);
        result += '<div class="results-item"><p class="result-placement">' + (i+1) + '. </p><p class="result-item">' + list[i] + '</p><p class="result-percentage" style="background-color:' + colorscale[((elo_to_percentage(elo[i], eloMin, eloMax)*100).toFixed(0))] + ';">' + (elo_to_percentage(elo[i], eloMin, eloMax)*100).toFixed(1) + '%</p></div>';
        

    };

    return result;
}




function createNewList(){
    /* newListValues = itemList.toString();
    console.log(newListValues)*/
    if (itemList.length >= 3){

    
    list = itemList;

    

        window.localStorage.setItem('list', JSON.stringify(list));

        fifoRow = Array((list.length) - 2);
        fifoColumn = Array((list.length) - 2);

        totalRounds = ((list.length) * (list.length)) - (list.length);
        idealAverage = 1 / totalRounds;


        console.log(totalRounds);
        console.log((idealAverage)*100 + "%");


        document.getElementById("exercise").style.display = "block";
        document.getElementById("new-vote").style.display = "none";


        //Create table rows, 1 for each list item + 1 for the labels
        if (!window.localStorage.getItem('matrix')){
            for (let i=0; i<list.length; i++) {
                matrix[i] = [];
                booleanMatrix[i] = []
                totalVotes[i] = []
                elo[i] = 1000;
                for (let j=0; j < list.length; j++){
                    matrix[i][j] = list[i] + " v. " + list[j];
                    booleanMatrix[i][j] = 50;
                    totalVotes[i][j] = 0;
                };
            };
        
            //Create an equal amount of columns.
            //Black out the corners
            
            giveChoice();
        };
    };
};

function giveChoice(){
    percentageRemainingVotes = sumTotalVotes / ( (list.length - 1)*(list.length/2));

    if (percentageRemainingVotes <= .999){
/*         document.getElementById("votes-needed").innerHTML = '<p class="not-ready">Votes Needed: ' + sumTotalVotes + '/' +  (list.length - 1)*(list.length/2) + '</p>'; */
        document.getElementById("progress-bar").innerHTML = '<progress id="vote-progress" value="' + sumTotalVotes + '" max="' + (list.length - 1)*(list.length/2) + '"></progress> <div class="progress-bar-text"><p>' + (((list.length - 1)*(list.length/2)) - sumTotalVotes) + ' Votes Needed</p><p>' + Math.round(percentageRemainingVotes * 100) + '% Complete</p></div>';
    } else if (percentageRemainingVotes >= .999){
        document.getElementById("progress-bar").innerHTML = '<progress id="vote-progress" value="' + sumTotalVotes + '" max="' + (list.length - 1)*(list.length/2) + '"></progress> <div class="progress-bar-text"><p>' + (sumTotalVotes) + ' Total Votes</p><p>100% Complete</p></div>';
        document.getElementById("show-results-null").style.display = 'none';
        document.getElementById("show-results").style.display = 'flex';
    }

    console.log(totalVotes)


    // Drawing criteria:
    // 1. The two choices have to be unique (x cannot be compared to x)
    // 2. Of the two choices, one must not have been drawn in the prior round. (if the last round was between x & y, then this round cannot have both x or y as choices. It must be one or the other. )
    // 3. The pair must have been chosen less than frequently.

    do{
        do {
            chooseRow = Math.floor(Math.random() * list.length);
        } while (/* fifoRow.includes(chooseRow) */ chooseRow == lastRowChoice);


        do {
            chooseColumn =  Math.floor(Math.random() * list.length);
        } while (/* fifoRow.includes(chooseColumn) */ (chooseColumn == lastColumnChoice) || (chooseColumn == chooseRow));

    } while ((totalVotes[chooseColumn][chooseRow])/(sumTotalVotes*2) > idealAverage);


    lastRowChoice = chooseRow;
    lastColumnChoice = chooseColumn;

/* 
    fifoRow.shift();
    fifoRow.push(chooseRow);

    fifoRow.shift();
    fifoRow.push(chooseColumn); */

    console.log(fifoRow);

    document.getElementById("option1").blur
    document.getElementById("option2").blur
    document.getElementById("choices").innerHTML = '<div class="buttons-to-press"><input type="button" class="choice-button" onclick="option(' + chooseRow +', ' + chooseColumn +')" name="option1" id="option1" value="' + list[chooseRow] + '">' + '<input type="button" class="choice-button" onclick="option(' + chooseColumn +', ' + chooseRow +')"" name="option2" id="option2" value="' + list[chooseColumn] + '"></div>';


    choiceA_Rating = elo[chooseRow];
    choiceB_Rating = elo[chooseColumn];

/*     let x = choiceA_Rating - choiceB_Rating;
    let y = choiceB_Rating - choiceA_Rating; */

    choiceA_TotalVotes = sumArrays(totalVotes[chooseRow]);
    choiceB_TotalVotes = sumArrays(totalVotes[chooseColumn]);

    //Expected Score

  /*   choiceA_ExpectedScore = 1/(1+10**((y)/1000));
    choiceB_ExpectedScore = 1/(1+10**((x)/1000)); */


    choiceA_ExpectedScore = getExpectedScore(choiceA_Rating, choiceB_Rating);
    choiceB_ExpectedScore = getExpectedScore(choiceB_Rating, choiceA_Rating);



    choiceA_K = findK(choiceA_TotalVotes, choiceA_Rating);
    choiceB_K = findK(choiceB_TotalVotes, choiceB_Rating);

}




function option(chosen, rejected){


    



    //Calculating ELO: 
    // Step 1: Find the Expected Score
    // E(a) = 1 / 1 + 10 ^ ((Rating(b) - Rating(a))/400)
    // E(b) = 1 / 1 + 10 ^ ((Rating(a) - Rating(b))/400)

    // Step 2: Determine K-Factor
    // if ((totalVotes < 30) || (rating < 2400){ K = 40 };
    // if ((totalVotes > 30) || (rating < 2400){ K = 20 };
    // if ((totalVotes > 30) || (rating > 2400){ K = 10 };

    // Step 3: Play the game and get an outcome

    // Step 4: Based on the outcome (if "a" wins and "b" loses):
    // Rating(a) + K(1-E(a))
    // Rating(b) + K(0-E(b))


    if (elo[chooseRow] == elo[chosen]){
        elo[chosen] = choiceA_Rating + choiceA_K * (1 - choiceA_ExpectedScore);
        elo[rejected] = choiceB_Rating + choiceB_K * (0 - choiceB_ExpectedScore);
        if (elo[rejected]<= 100){
            elo[rejected] = 100;
        }
    }; 

    if (elo[chooseColumn] == elo[chosen]){
        elo[chosen] = choiceB_Rating + choiceB_K * (1 - choiceB_ExpectedScore);
        elo[rejected] = choiceA_Rating + choiceA_K * (0 - choiceA_ExpectedScore);
        if (elo[rejected]<= 100){
            elo[rejected] = 100;
        }
    }; 

   /*  let x = elo[chosen] - elo[rejected];
    let y = elo[rejected] - elo[chosen];

    let chosenChance = 1/(1+10**((y)/1000));
    let rejectedChance = 1/(1+10**((x)/1000));

    booleanMatrix[chosen][rejected] = (chosenChance * 100).toFixed(2); //Updated Changed
    booleanMatrix[rejected][chosen] = (rejectedChance * 100).toFixed(2); //Updated Chances */


    for (let i=0; i<matrix.length; i++){
        for (let j=0; j<matrix.length; j++){
            booleanMatrix[i][j] = (getExpectedScore(elo[i], elo[j])*100);
        }
    }



    totalVotes[chosen][rejected] += 1;
    totalVotes[rejected][chosen] += 1;

    sumTotalVotes += 1;

    window.localStorage.setItem('sum-total-votes', sumTotalVotes);

    giveChoice();
    // document.getElementById("list-item-matrix").innerHTML = printMatrix(matrix);

    window.localStorage.setItem('elo', JSON.stringify(elo));
    window.localStorage.setItem('votes', JSON.stringify(totalVotes));
    window.localStorage.setItem('matrix', JSON.stringify(matrix));
    window.localStorage.setItem('boolean-matrix', JSON.stringify(booleanMatrix));


/* 
    document.getElementById("results-list").innerHTML = " "

    for (let i=0; i<list.length; i++) {
        document.getElementById("results-list").innerHTML += '<li><b>' + list[i] + ': </b>' + Math.round(elo[i]) +'</li>';
    }; */

};


function showResults(){
    document.getElementById("exercise").style.display = "none";
    document.getElementById("results").style.display = "flex";

    document.getElementById("list-item-matrix").innerHTML = printMatrix(matrix);
    document.getElementById("winner-result").innerHTML = list[0];
}

function keepVoting(){
    document.getElementById("exercise").style.display = "block";
    document.getElementById("results").style.display = "none";  
}


function restart(){
    window.localStorage.removeItem('elo');
    window.localStorage.removeItem('votes');
    window.localStorage.removeItem('matrix');
    window.localStorage.removeItem('boolean-matrix');
    window.localStorage.removeItem('sum-total-votes');
    window.localStorage.removeItem('list');

    matrix = [];
    booleanMatrix = [];
    totalVotes = [];
    list = [];
    elo = [];
    sumTotalVotes = 0;

    itemList=[];
    itemListHTMLPreview.innerHTML = '';

    document.getElementById("exercise").style.display = "none";
    document.getElementById("new-vote").style.display = "flex";

    document.getElementById("results").style.display = "none";


    document.getElementById("submit").style.display = 'none';
    document.getElementById("disable-submit").style.display = 'flex';

    document.getElementById("welcome-message").style.display = 'flex';

    document.getElementById("show-results-null").style.display = 'flex';
    document.getElementById("show-results").style.display = 'none';


}