let itemList = []; //Stores all of the items you are voting on.

/* CREATE A NEW VOTE VARAIBLES */

let newItem; //Temporarily stores the new item you want to add to your list.
let itemListHTMLText = ''; //The variable that stores the full string for the HTML Preview on the New Vote Screen
let itemListHTMLPreview =  document.getElementById('preview-voting-item-list'); //This variable actually updates the inner HTML


let newListValues;
let sanitizedList;
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

let colorscale = ['#67001f', '#6c0521', '#700b23', '#751125', '#791627', '#7e1a29', '#821f2b', '#87232d', '#8c282f', '#902c31', '#953034', '#993436', '#9e3838', '#a23d3b', '#a6413d', '#ab453f', '#af4942', '#b34e45', '#b85247', '#bc564a', '#c05b4d', '#c45f4f', '#c86452', '#cc6855', '#d06d58', '#d4715b', '#d8765f', '#db7b62', '#df7f65', '#e28469', '#e5896c', '#e88e70', '#eb9374', '#ee9878', '#f19e7c', '#f3a380', '#f5a886', '#f6ae8d', '#f7b394', '#f8b99c', '#f9bfa3', '#fac4aa', '#fbcab2', '#fbcfba', '#fbd5c2', '#fbdaca', '#fbe0d2', '#fbe6db', '#faece4', '#f9f1ed', '#f7f7f7', '#eff3f5', '#e8eff4', '#e0ecf2', '#d8e8f0', '#d1e4ef', '#c9e0ed', '#c2dceb', '#bad9e9', '#b3d5e7', '#abd1e5', '#a3cde3', '#9bcae1', '#94c6de', '#8dc2dc', '#88bdda', '#83b9d7', '#7eb5d5', '#79b1d2', '#74accf', '#6fa8cc', '#6ba4c9', '#66a0c6', '#629bc3', '#5e97bf', '#5a93bc', '#568fb9', '#528bb5', '#4e86b2', '#4a82ae', '#467eab', '#437aa7', '#3f76a4', '#3c72a0', '#386e9d', '#356a99', '#326695', '#2e6292', '#2b5e8e', '#285a8a', '#255686', '#225283', '#1f4e7f', '#1c4a7b', '#194678', '#164374', '#133f70', '#0f3b6c', '#0c3768', '#083465', '#053061'];

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
            itemListHTMLText = '';
        };

    //Step 5: Update the HTML to reflect the current list
        for (let i=0; i<itemList.length; i++){
            itemListHTMLText += '<li class="itemListItem"><div class="listItemText">' + itemList[i] + '</div><button type="button" class="removeListItemButton" onclick=spliceVotingList(' + i + ')><img type="svg" src="assets/icon/trash.svg"></button></li>'; //Button allows you to delete that specific list item.
        }

        itemListHTMLPreview.innerHTML = '<ul class="itemList">' + itemListHTMLText +'</ul>';
        clearCurrentValues();

        document.getElementById('bottom').scrollIntoView();

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
    itemListHTMLPreview.innerHTML = '<ol class="itemList">' + itemListHTMLText +'</ol>'


}


window.onkeyup = function(event) {
    const el = document.querySelector('.new-vote-textbox');
    if (el === document.activeElement){
        if (event.which == 13) {
            appendVotingList();
           
  /*        let elem = document.getElementById('bottom');
        elem.scrollTop = elem.scrollHeight;  */

    /*         setTimeout(() => {
                window.scrollTo(0, document.body.scrollHeight);
            }, 0); */

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

            

            let lastList = window.localStorage.getItem('sanitized-list');
            document.getElementById("write-new-list").value = lastList;
            
            list = JSON.parse(window.localStorage.getItem('list'));
            matrix = JSON.parse(window.localStorage.getItem('matrix'));
            booleanMatrix = JSON.parse(window.localStorage.getItem('boolean-matrix'));
            elo = JSON.parse(window.localStorage.getItem('elo'));
            totalVotes = JSON.parse(window.localStorage.getItem('votes'));

            sumTotalVotes = JSON.parse(window.localStorage.getItem('sum-total-votes'));

            if (window.localStorage.getItem('sum-total-votes') == null){
                sumTotalVotes = 0;
            }

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
    result += '<div class="results-item"><p class="result-placement">Place</p><p class="result-item">Item</p><p class="result-item">Score</p></div>';

    for (let i=0; i<myArray.length; i++) {
        let score_percent = elo_to_percentage(elo[i], eloMin, eloMax);
        result += '<div class="results-item"><p class="result-placement">' + (i+1) + '.</p><p class="result-item">' + list[i] + '</p><p class="result-percentage" style="background-color:' + colorscale[((score_percent * 100).toFixed(0) - 1)] + '">' + (score_percent * 100).toFixed(0) + '% (' + percentage_to_grade(score_percent) + ')</p></div>';
        

    };

    return result;
}




function createNewList(){
    newListValues = itemList.toString();
    console.log(newListValues)
    sanitizedList = sanitizeInputs(newListValues);
    list = sanitizedList.split(",");

    if (list.length > 2){
        window.localStorage.setItem('sanitized-list', sanitizedList);

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
        };
        //Create an equal amount of columns.
        //Black out the corners
        
        giveChoice();
    };
};

function giveChoice(){
  

    percentageRemainingVotes = sumTotalVotes / ( (list.length - 1)*(list.length/2));


    if (percentageRemainingVotes <= .999){
/*         document.getElementById("votes-needed").innerHTML = '<p class="not-ready">Votes Needed: ' + sumTotalVotes + '/' +  (list.length - 1)*(list.length/2) + '</p>'; */
        document.getElementById("progress-bar").innerHTML = '<progress id="vote-progress" value="' + sumTotalVotes + '" max="' + (list.length - 1)*(list.length/2) + '"></progress> <div class="progress-bar-text"><p>' + (((list.length - 1)*(list.length/2)) - sumTotalVotes) + ' Votes Needed</p><p>' + Math.round(percentageRemainingVotes * 100) + '% Complete</p></div>';
    } else if (percentageRemainingVotes >= .999){
        document.getElementById("progress-bar").innerHTML = '<progress id="vote-progress" value="' + sumTotalVotes + '" max="' + (list.length - 1)*(list.length/2) + '"></progress> <div class="progress-bar-text"><p>' + (sumTotalVotes) + ' Total Votes</p><p>100% Complete</p></div>';
        document.getElementById("show-results").style.display = 'flex';
        document.getElementById("show-results-null").style.display = 'none';
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
        if (elo[rejected]<= 0){
            elo[rejected] = 0;
        }
    }; 

    if (elo[chooseColumn] == elo[chosen]){
        elo[chosen] = choiceB_Rating + choiceB_K * (1 - choiceB_ExpectedScore);
        elo[rejected] = choiceA_Rating + choiceA_K * (0 - choiceA_ExpectedScore);
        if (elo[rejected]<= 0){
            elo[rejected] = 0;
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
            console.log (booleanMatrix[i][j]);
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
    document.getElementById("list-item-matrix").innerHTML = printMatrix(matrix)
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


    matrix = [];
    booleanMatrix = [];
    totalVotes = [];
    list = [];
    elo = [];
    sumTotalVotes = 0;

    document.getElementById("exercise").style.display = "none";
    document.getElementById("new-vote").style.display = "flex";

    document.getElementById("show-results").style.display = 'none';
    document.getElementById("show-results-null").style.display = 'flex';
    document.getElementById("results").style.display = "none";
}