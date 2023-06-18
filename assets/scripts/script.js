let itemList = []; //Stores all of the items you are voting on.

/* CREATE A NEW VOTE VARAIBLES */

let newItem; //Temporarily stores the new item you want to add to your list.
let itemListHTMLText = ''; //The variable that stores the full string for the HTML Preview on the New Vote Screen
let itemListHTMLPreview =  document.getElementById('preview-voting-item-list'); //This variable actually updates the inner HTML



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
            itemListHTMLText += '<li class="itemListItem">' + itemList[i] + '<button type="button" class="removeListItemButton" onclick=spliceVotingList(' + i + ')>-</button></li>'; //Button allows you to delete that specific list item.
        }

        itemListHTMLPreview.innerHTML = '<ol class="itemList">' + itemListHTMLText +'</ol>';
        clearCurrentValues();

}

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
        itemListHTMLText += '<li class="itemListItem">' + itemList[i] + '<button type="button" class="removeListItemButton" onclick=spliceVotingList(' + i + ')>-</button></li>';
    }
    itemListHTMLPreview.innerHTML = '<ol class="itemList">' + itemListHTMLText +'</ol>'


}


window.onkeyup = function(event) {
    const el = document.querySelector('.new-vote-textbox');
    if (el === document.activeElement){
        if (event.which == 13) {
            appendVotingList();
            window.scrollTo(0, document.body.scrollHeight);

        }
    }
}