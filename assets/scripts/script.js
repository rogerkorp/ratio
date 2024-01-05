let booleanMatrix = [];
let choiceA_ExpectedScore;
let choiceA_K;
let choiceA_minus_choiceB;
let choiceA_Rating;
let choiceA_TotalVotes;
let choiceB_ExpectedScore;
let choiceB_K;
let choiceB_minus_choiceA;
let choiceB_Rating;
let choiceB_TotalVotes;
let chooseColumn;
let chooseRow;
let colorscale = ['#00255d', '#02265e', '#052660', '#082761', '#0b2863', '#0e2964', '#112965', '#132a67', '#162b68', '#182b69', '#1b2c6b', '#1d2d6c', '#1f2d6d', '#222e6e', '#242e6f', '#262f70', '#283072', '#2a3073', '#2d3174', '#2f3175', '#313276', '#333277', '#353378', '#383378', '#3a3479', '#3c357a', '#3e357b', '#40357c', '#42367c', '#45367d', '#47377e', '#49377f', '#4b387f', '#4d3880', '#4f3980', '#523981', '#543981', '#563a82', '#583a82', '#5a3a83', '#5c3b83', '#5f3b84', '#613b84', '#633c84', '#653c84', '#673c85', '#6a3d85', '#6c3d85', '#6e3d85', '#703d85', '#723d86', '#743e86', '#773e86', '#793e86', '#7b3e86', '#7d3e86', '#7f3e85', '#813e85', '#843f85', '#863f85', '#883f85', '#8a3f85', '#8c3f84', '#8f3f84', '#913f84', '#933f83', '#953f83', '#973f82', '#993e82', '#9b3e81', '#9e3e81', '#a03e80', '#a23e80', '#a43e7f', '#a63e7f', '#a83d7e', '#aa3d7d', '#ad3d7c', '#af3c7c', '#b13c7b', '#b33c7a', '#b53b79', '#b73b78', '#b93b77', '#bb3a76', '#bd3a75', '#bf3974', '#c23973', '#c43872', '#c63771', '#c83770', '#ca366f', '#cc356e', '#ce356c', '#d0346b', '#d2336a', '#d43269', '#d63167', '#d83066', '#da2f64', '#dc2e63'];
let elo = [];
let fifoColumn;
let fifoRow;
let idealAverage;
let itemList = []; 
let itemListHTMLPreview =  document.getElementById('create_list_preview_items'); 
let itemListHTMLText = ''; 
let lastColumnChoice = 0;
let lastRowChoice = 0;
let list = [];
let matrix = [];
let newItem; 
let newListValues;
let percentageRemainingVotes;
let sum = 0;
let sumTotalVotes = 0;
let text = "<th></th>";
let totalRounds;
let totalVotes = [];

function readData() { // Gets variables from local storage 

// Step 1: Check to see if local storage is avialable
    if (typeof (Storage) !== "undefined") { 

    // Step 2: Check to see if there are any variables currently saved inside of local storage
        if (window.localStorage.getItem('matrix')){ 
            itemList = JSON.parse(window.localStorage.getItem('list'));
            matrix = JSON.parse(window.localStorage.getItem('matrix'));
            booleanMatrix = JSON.parse(window.localStorage.getItem('boolean-matrix'));
            elo = JSON.parse(window.localStorage.getItem('elo'));
            totalVotes = JSON.parse(window.localStorage.getItem('votes'));
            sumTotalVotes = JSON.parse(window.localStorage.getItem('sum-total-votes'));

            if (window.localStorage.getItem('sum-total-votes') == null){
                sumTotalVotes = 0; 
            };  
    
            create_list_start_vote(); // If YES, then it triggers the start of the vote.
        }

    } else {
      // Sorry! No Web Storage support..
      alert('This browser does NOT support local storage');
    }
};

function appendVotingList(){ // Adds items to itemList, and displays it on the list preview 
    
    // Step 1: Get the value of the new item
        newItem = document.getElementById('create_list_textbox_form_input_id').value;

    // Step 2: Check to see if the value is not blank
        if (newItem == ''){
            alert('Please enter a valid item name');
            return false;

    // Step 3: If the first check clears, check to see if the item already exists in the array
        } else if (itemList.includes(newItem)){
            alert('Please do not enter duplicate list items');
            return false;

    // Step 4: If THAT check clears, add the list item to the array
        } else {
            itemList.push(newItem);
            itemListHTMLText = "";
        };

    // Step 5: Update the HTML to reflect the current list
        for (let i=0; i<itemList.length; i++){
            itemListHTMLText += '<li class="create_list_preview_items_data_unit"><div class="create_list_preview_items_data_unit_text">' + itemList[i] + '</div><button type="button" class="create_list_preview_items_data_unit_delete" onclick=spliceVotingList(' + i + ')><img type="svg" src="assets/icon/trash.svg"></button></li>'; //Button allows you to delete that specific list item.
        }

        itemListHTMLPreview.innerHTML = '<ul class="create_list_preview_items_data">' + itemListHTMLText + '<div id="create_list_preview_bottom"></div></ul>';
        clearCurrentValues();


    // Step 6: Checks to see if there are enough list items to start the vote. If there are 3+ then the button will be enabled.
        if (itemList.length >= 3){
            document.getElementById("create_list_start_vote_form_submit_enabled").style.display = 'flex';
            document.getElementById("create_list_start_vote_form_submit_disabled").style.display = 'none';
        }

    // Scrolls the list to the very bottom.
        document.getElementById('create_list_preview_bottom').scrollIntoView();

    // Checks to see if the list contains an item. If it does, then the welcome message will disappear.
        if (itemList.length > 0){
            document.getElementById("create_list_welcome_message").style.display = 'none';
        } else {
            document.getElementById("create_list_welcome_message").style.display = 'flex';
        }
};

function toggle_help(){ // Diplays the help section on the home screen
    help = document.getElementById("help");
    console.log("Help Toggle Triggered")
    
    if (help.style.display == 'flex'){
        help.style.display = 'none';
    } else if (help.style.display == 'none'){
        help.style.display = 'flex';
    };
};

function clearCurrentValues(){ // Removes values textbox. Used when a value is submitted in the list creation textbox page
    document.getElementById('create_list_textbox_form_input_id').value = '';
};

function spliceVotingList(listItemNumber){ // Removes items from itemList, and displays it on the list preview
    // Step 1: Clear the old list item text
        itemListHTMLText = '';

    // Step 2: Removes the list item specified by variable 'listItemNumber'
        itemList.splice(listItemNumber, 1);

    // Step 3: Rebuilds the HTML Text to reflect the current list
        for (let i=0; i<itemList.length; i++){
            itemListHTMLText += '<li class="create_list_preview_items_data_unit"><div class="create_list_preview_items_data_unit_text">' + itemList[i] + '</div><button type="button" class="create_list_preview_items_data_unit_delete" onclick=spliceVotingList(' + i + ')><img type="svg" src="assets/icon/trash.svg"></button></li>';
        }
        itemListHTMLPreview.innerHTML = '<ul class="create_list_preview_items_data">' + itemListHTMLText +'<div id="create_list_preview_bottom"></div></ul>';

    // Step 4: Update Style Rules to Reflect Current System Status
        if (itemList.length == 0){
            document.getElementById("create_list_welcome_message").style.display = 'flex';
        } else {
            document.getElementById("create_list_welcome_message").style.display = 'none';
        };

    // Step 5: Checks to see if there are enough list items to start the vote. If there are less than 3, then the button will be disabled.

        if (itemList.length <= 2){
            document.getElementById("create_list_start_vote_form_submit_enabled").style.display = 'none';
            document.getElementById("create_list_start_vote_form_submit_disabled").style.display = 'flex';
        }
};

window.onkeyup = function(event) { // Submits textbox form when the enter key is pressed
    const el = document.querySelector('.create_list_textbox_form_input');
    if (el === document.activeElement){
        if (event.which == 13) {
            appendVotingList();

        }
    }
};



let form = document.getElementById("create_list_start_vote_form");
function handleForm(event) { 
    event.preventDefault(); 
};
form.addEventListener('submit', handleForm);


function sumArrays(array){ // Determines how many rounds a specific item has appeared in a vote, for the purpose of calculating an ELO. 
    sum = 0;
    for (let i = 0; i < array.length; i++){
        sum += array[i];
    }
    return sum;
};

function findK(votes, rating){ // For each item, it takes the total number of times it has appeared in a vote, its current score, and gives it a number that determines the minimum/maximum points that can be gained/lost.
    let k;

    // Three-tier K system

/*     if ((votes <= 10) & (rating <= 2000)){
        k = 32;
    } else if ((votes > 10) & (rating <= 2000)){
        k = 24;
    } else if ((votes > 10) & (rating > 2000)){
        k = 16;
    }; */


    // Progressive K system

    k = (800/(votes+1));

    console.log ("Rating: " + rating + " K-Factor: " + k);
    return k;
};

function getExpectedScore(primary, secondary){ // Determines the odds of one item winning
    let difference = secondary - primary;
    let chances = 1/(1+10**((difference)/1000));
    return chances;
};

function sortResults(elo, name){ // Sorts the results from highest to lowest.
        // Create a map to store the relationships between elements in arr1 and arr2
        const mapping = new Map(name.map((element, index) => [element, elo[index]]));
        // Sort the second array (arr2) in ascending order
        elo.sort((a, b) => b - a);
        // Sort the first array (arr1) based on the order of elements in the sorted arr2
        name.sort((a, b) => mapping.get(b) - mapping.get(a));
        return [elo, name]; // Return both sorted arrays
};

function elo_to_percentage(elo, min, max){ // Creates a score out of 100% based on the highest and lowest scoring items.
    let elo_difference = max - min;
    let percentage = (elo - min) / elo_difference;
    return percentage;
};

function elo_percent_from_neutral(elo){ // Translates the score into a margin based on what a completely neutral item would be.
    let neutral_elo = 1200;
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

function percentage_to_grade(percentage){ // Optional function to convert score into a letter grade based on percentage.
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

function printMatrix(myArray){ // Puts results into HTML & CSS.

    // Step 1: Sort existing array in order of highest scoring to lowest scoring
    sortResults(elo, list);
    
    // Step 2: Find the highest and lowest valued items on the list.
    let eloMax = Math.max(...elo);
    let eloMin = Math.min(...elo)

    // Step 3: Build HTML text in order of results..
    let result = "";
    result += '<div class="results_main_data_list_item" id="results_main_data_list_header"><p class="results_main_data_list_item_name">Place</p><p class="results_main_data_list_item_name">Item</p><p class="results_main_data_list_item_name" id="results_main_data_list_header_score">Score</p></div>';

    for (let i=0; i<myArray.length; i++) {
        let score_percent = elo_to_percentage(elo[i], eloMin, eloMax);
        result += '<div class="results_main_data_list_item"><p class="results_main_data_list_item_place">' + (i+1) + '. </p><p class="results_main_data_list_item_name">' + list[i] + '</p><p class="results_main_data_list_item_score" style="background-color:' + colorscale[((elo_to_percentage(elo[i], eloMin, eloMax)*100).toFixed(0))] + ';">' + (elo_to_percentage(elo[i], eloMin, eloMax)*100).toFixed(1) + '%</p></div>';
    };

    return result;
};

function create_list_start_vote(){ // Starts the vote

    if (itemList.length >= 3){ // Checks to see if there is at least three items in the itemList
        list = itemList;
        window.localStorage.setItem('list', JSON.stringify(list)); // Puts item list in local storage

        totalRounds = ((list.length) * (list.length)) - (list.length); // Determines the minimal number of rounds that need to take place for all unique pairs to be voted on.
        idealAverage = 1 / totalRounds; // Determines the ideal chances of one pair being voted over another. Helps ensure that only the unique ones are chosen.
        // For an ELO to be considered stable, at least 25 rounds with each item must be voted on.
        // Possible idea for a "high accuracy" mode

        document.getElementById("vote").style.display = "block"; 
        document.getElementById("create_list").style.display = "none";

        if (!window.localStorage.getItem('matrix')){
            for (let i=0; i<list.length; i++) {
                matrix[i] = [];
                booleanMatrix[i] = []
                totalVotes[i] = []
                elo[i] = 1200;
                for (let j=0; j < list.length; j++){
                    matrix[i][j] = list[i] + " v. " + list[j];
                    booleanMatrix[i][j] = 50;
                    totalVotes[i][j] = 0;
                };
            };

        };
        giveChoice();
    };
};

function giveChoice(){ // Draws two random items on the list, and calculates the odds of them winning.

    percentageRemainingVotes = sumTotalVotes / ( (list.length - 1)*(list.length/2));

    if (percentageRemainingVotes <= .999){
/*         document.getElementById("votes-needed").innerHTML = '<p class="not-ready">Votes Needed: ' + sumTotalVotes + '/' +  (list.length - 1)*(list.length/2) + '</p>'; */
        document.getElementById("vote_main_progress").innerHTML = '<progress id="vote_main_progress_bar" value="' + sumTotalVotes + '" max="' + (list.length - 1)*(list.length/2) + '"></progress> <div class="vote_main_progress_status"><p>' + (((list.length - 1)*(list.length/2)) - sumTotalVotes) + ' Votes Needed</p><p>' + Math.round(percentageRemainingVotes * 100) + '% Complete</p></div>';
    } else if (percentageRemainingVotes >= .999){
        showResults();
        // document.getElementById("vote_main_progress").innerHTML = '<progress id="vote_main_progress_bar" value="' + sumTotalVotes + '" max="' + (list.length - 1)*(list.length/2) + '"></progress> <div class="vote_main_progress_status"><p>' + (sumTotalVotes) + ' Total Votes</p><p>100% Complete</p></div>';
    }

    // Drawing criteria:
    // 1. The two choices have to be unique (x cannot be compared to x)
    // 2. Of the two choices, one must not have been drawn in the prior round. (if the last round was between x & y, then this round cannot have both x or y as choices. It must be one or the other. )
    // 3. The pair must have been chosen less than frequently.

    do{
        do {
            chooseRow = Math.floor(Math.random() * list.length);
        } while ( chooseRow == lastRowChoice);

        do {
            chooseColumn =  Math.floor(Math.random() * list.length);
        } while ( (chooseColumn == lastColumnChoice) || (chooseColumn == chooseRow));

    } while ((totalVotes[chooseColumn][chooseRow])/(sumTotalVotes*2) > idealAverage);


    lastRowChoice = chooseRow;
    lastColumnChoice = chooseColumn;

    document.getElementById("vote_main_inputs_dynamic_button_option1").blur
    document.getElementById("vote_main_inputs_dynamic_button_option2").blur
    document.getElementById("vote_main_inputs").innerHTML = '<div class="vote_main_inputs_dynamic"><input type="button" class="vote_main_inputs_dynamic_button" onclick="option(' + chooseRow +', ' + chooseColumn +')" name="vote_main_inputs_dynamic_button_option1" id="vote_main_inputs_dynamic_button_option1" value="' + list[chooseRow] + '">' + '<input type="button" class="vote_main_inputs_dynamic_button" onclick="option(' + chooseColumn +', ' + chooseRow +')"" name="vote_main_inputs_dynamic_button_option2" id="vote_main_inputs_dynamic_button_option2" value="' + list[chooseColumn] + '"></div>';

    choiceA_Rating = elo[chooseRow];
    choiceB_Rating = elo[chooseColumn];

    choiceA_TotalVotes = sumArrays(totalVotes[chooseRow]);
    choiceB_TotalVotes = sumArrays(totalVotes[chooseColumn]);

    choiceA_ExpectedScore = getExpectedScore(choiceA_Rating, choiceB_Rating);
    choiceB_ExpectedScore = getExpectedScore(choiceB_Rating, choiceA_Rating);

    choiceA_K = findK(choiceA_TotalVotes, choiceA_Rating);
    choiceB_K = findK(choiceB_TotalVotes, choiceB_Rating);

};

function option(chosen, rejected){ // Changes the ELO score for each item after voting.

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

    window.localStorage.setItem('elo', JSON.stringify(elo));
    window.localStorage.setItem('votes', JSON.stringify(totalVotes));
    window.localStorage.setItem('matrix', JSON.stringify(matrix));
    window.localStorage.setItem('boolean-matrix', JSON.stringify(booleanMatrix));

};

function showResults(){ // Displays results screen
    document.getElementById("vote").style.display = "none";
    document.getElementById("results").style.display = "flex";
    document.getElementById("results_main_data_list").innerHTML = printMatrix(matrix);
    document.getElementById("results_main_favorite_name").innerHTML = list[0];
};

function restart(){ // Resets all functions back to the beginning.
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

    document.getElementById("vote").style.display = "none";
    document.getElementById("create_list").style.display = "flex";
    document.getElementById("results").style.display = "none";
    document.getElementById("create_list_start_vote_form_submit_enabled").style.display = 'none';
    document.getElementById("create_list_start_vote_form_submit_disabled").style.display = 'flex';
    document.getElementById("create_list_welcome_message").style.display = 'flex';
    document.getElementById("vote_results_disabled").style.display = 'flex';
    document.getElementById("vote_results_enabled").style.display = 'none';


};