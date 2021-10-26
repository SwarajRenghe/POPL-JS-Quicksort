var numberOfNodes = 0;
var createArray = 1;
var selectedIndex = -1;
var currentlySelectedNode = -1;
var currentArray = [];

var canconcatenate = false;
var partitionNode = 0;
var swappartiotionNode1 = 0;
var swappartiotionNode2 = 0;
var partitionArray = 0;
var concatenateArray1 = 0;
var concatenateArray2 = 0;

/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */

// Converts html code into a viewable element in UI
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

//Creates nodes when inputted
function createNodeForInputArray(newNodeValue) {
	nodeID = "node" + numberOfNodes.toString();
	node_html_main_div = '<div name="node" class="w-16 text-2xl py-4 my-2 mx-2 text-center bg-green-200 border-solid border-2 border-green-400">';
	node_html_closing_tags = "</div>"
	return htmlToElement(node_html_main_div + newNodeValue.toString() + node_html_closing_tags);
}

//Creates nodes for the pivot array. This is where all machines such as break, swap, partition and concatonate work on.
function createNodeForPivotArray(newNodeValue) {
	nodeID = "node" + numberOfNodes.toString() + "_pivot";
	node_html_main_div = '<div name="node" onclick="selectNode(\'' + nodeID + '\')" class="w-16 text-2xl py-4 my-2 mx-2 text-center bg-green-200 border-solid border-2 border-green-400" id="' + nodeID + '">';
	node_html_closing_tags = "</div>"
	return htmlToElement(node_html_main_div + newNodeValue.toString() + node_html_closing_tags);
}

//Reset all UI for all nodes
function unselectAllNodes() {
	allNodes = document.getElementsByName("node");
	for (node of allNodes) {
		if (node.classList.contains('bg-red-200')) {
			console.log("yes it contains")
			node.classList.add('bg-green-200');
			node.classList.remove('bg-red-200');
		}
		if (node.classList.contains('bg-grey-200')) {
			console.log("yes it contains")
			node.classList.add('bg-green-200');
			node.classList.remove('bg-grey-200');
		}
	}
}

//Reset all positions
function pivot_resetAllNodePositions() {
	for (i = 0; i < numberOfNodes; i++) {
		$("#node" + i.toString() + "_pivot").animate({ marginTop: '0' });
	}
}

//Setting of varibales to be used for the machines such as partitionnode, partitionArray and so forth
function selectNode(nodeID) {
	console.log("in selectNode")
	
	console.log(nodeID)
	currentlySelectedNode = parseInt(String(nodeID).match(/\d+/)[0]);
	console.log(currentlySelectedNode)
	pivot_resetAllNodePositions();
	if (![3].includes(selectedCard)) {
		return;
	}

	if(!canconcatenate)
	{
		//When swap, break and partition machine is used, the UI of the nodes change accordingly
		if (partitionNode == 0)
		{
			partitionNode = document.getElementById(nodeID);
			unselectAllNodes();
			document.getElementById(nodeID).classList.remove('bg-green-200');
			document.getElementById(nodeID).classList.add('bg-red-200');
		}
		else if(swappartiotionNode1 == 0 && partitionNode != document.getElementById(nodeID))
		{
			swappartiotionNode1 = document.getElementById(nodeID);
			document.getElementById(nodeID).classList.remove('bg-green-200');
			document.getElementById(nodeID).classList.add('bg-grey-200');
		}
		
		else if(swappartiotionNode2 == 0 && document.getElementById(nodeID) != swappartiotionNode1)
		{
			swappartiotionNode2 = document.getElementById(nodeID);
			document.getElementById(nodeID).classList.remove('bg-green-200');
			document.getElementById(nodeID).classList.add('bg-grey-200');
		}
		else
		{
			unselectAllNodes();
			document.getElementById(nodeID).classList.remove('bg-green-200');
			document.getElementById(nodeID).classList.add('bg-red-200');
		}
	} 
	else 
	{
		//When the concatonate machine is used, the UI of the nodes change accordingly
		if (partitionNode == 0)
		{
			partitionNode = document.getElementById(nodeID);
			unselectAllNodes();
			document.getElementById(nodeID).classList.remove('bg-green-200');
			document.getElementById(nodeID).classList.add('bg-red-200');
		}
		else 
		{
			document.getElementById(nodeID).classList.remove('bg-green-200');
			document.getElementById(nodeID).classList.add('bg-red-200');			
		}		
	}
}

//Select the partitionArray for the partition machine to work on
function selectPartitionArray(arrayID) {
	if(canconcatenate)
	{
		if(concatenateArray1 == 0)
			concatenateArray1 = document.getElementById(arrayID);
		else if(concatenateArray2 == 0 && concatenateArray1 != document.getElementById(arrayID))
			concatenateArray2 = document.getElementById(arrayID);
	}

	partitionArray = document.getElementById(arrayID);

	console.log("an array is being chosen");
	console.log("in c");
	console.log(concatenateArray1);
	console.log(concatenateArray2);
	console.log("in pasdfsd");
	console.log(partitionArray);
}

function getEnteredValue() {
	var saved = $("#input_array_field").val();
	$("#input_array_field").val("");
	return saved;
}

function addElement (elem) {
	currentArray.push (elem)
}

function addElementButtonPress() {
	newNodeValue = getEnteredValue();
	console.log(newNodeValue)
	addElement (newNodeValue)
	if (newNodeValue == '') {
		showInvalidInputError();
		return;
	}
	if (!isNumeric(newNodeValue)) {
		showInvalidInputError();
		return;
	}
	else {
		if (numberOfNodes == 0)
		{
			console.log("number of nodes 0")
			pivot_btn = document.createElement('div');
			pivot_btn.id = "pivot_array_container0";
			pivot_btn.addEventListener("click", function(){
				selectPartitionArray(pivot_btn.id);
			}, false);
			pivot_arrays = document.getElementById('array_container_pivot');
			pivot_arrays.appendChild(pivot_btn); // selectable components			
		}

		$("#array_container_input").append(createNodeForInputArray(newNodeValue)); // unselectable components
		let pivot_element = document.getElementById("pivot_array_container0");
		console.log(pivot_element)
		pivot_element.appendChild(createNodeForPivotArray(newNodeValue)); // selectable components
		numberOfNodes++;
	}
}

function renderArray() {
	return 0;
}

/**
 * Draws a line between the centers of the two elements
 * @param  {[string]}  idOfElement  [The ID of the element. It must be unique.]
 * @return {[bi-list]} center       [Pair of x and y coordinates of the geometric center of the AABB of the element]
 */

/**
 * Draws a line between the centers of the two elements
 * @param  {[string]} idOfFirstElement  [The ID of the first element. It must be unique.]
 * @param  {[string]} idOfFirstElement  [The ID of the second element. It must be unique.]
 * @return {[none]}                     [Returns nothing, draws directly on the HTML canvas]
 */

// Sections of the complete project, called as cards.
//	Card1  - Summarization of Quick Sort
// 	Card2 	- Input array
//	Card3	- Swap, Break, Partition, and Concatenate machine
//	Card4	- Example of choosing different logic for pivot (ie: first element of pivot array or random element of pivot array)

numberOfCards = 4;
selectedCard = 1;
showCard(selectedCard);

function hideAllCards() {
	for (i = 0; i < numberOfCards; i++) {
		document.getElementById("card_" + (i + 1).toString()).classList.add("hidden");
	}
}

function showCard(card_number) {
	hideAllCards();
	selectedCard = card_number;
	document.getElementById("card_" + (selectedCard).toString()).classList.remove("hidden");
}

leftPointer = 0;
if (currentlySelectedNode == currentArray.length - 1) {
	rightPointer = currentArray.length - 2
} else {
	rightPointer = currentArray.length - 1
}
currentState = 'first';

function showInvalidInputError() {
	document.getElementById("invalid_input_error_message").classList.remove("hidden");
	setTimeout(function () { document.getElementById("invalid_input_error_message").classList.add("hidden"); }, 2000);
}
function isNumeric(value) {
	return /^-?\d+$/.test(value);
}


/********
 * Break *
 *******/

 //Break machine is to check whether for the given pivot number, whether all elements have been swapped properly or not. If yes,
 //the array is split into 2 about the pivot element.Other tests and alerts have also been written.
document.getElementById("break").addEventListener ("click", breakArray, false);

function breakArray(){
	console.log("in breakArray");
	console.log(partitionArray);
	console.log(partitionNode);

	if(!canconcatenate)
	{
		if(partitionArray != 0 && partitionNode != 0)
		{
			if(partitionArray.id == partitionNode.parentElement.id)
			{
				if(partitionArray.childElementCount<2)
					alert("only 1 element in the partitionarray")
				else 
				{
					var parentid = partitionArray.id;
					var pivotnum = parseInt(partitionNode.innerHTML);
					
					var left_array = document.createElement('div');
					left_array.id = parentid+"0";
					left_array.addEventListener("click", function(){
						selectPartitionArray(left_array.id);
					}, false);

					var right_array = document.createElement('div');
					right_array.id = parentid+"1";
					right_array.addEventListener("click", function(){
						selectPartitionArray(right_array.id);
					}, false); 

					var left = 0;
					var right = 0;
					console.log(partitionArray.children);
					var pchildren = partitionArray.children;
					var pclen = partitionArray.children.length;
					var j = 0;
					while(j<pclen)
					{
						if(parseInt(pchildren[j].innerHTML) < pivotnum)
							j++;
						else 
							break;
					}

					while(j<pclen)
					{
						if(parseInt(pchildren[j].innerHTML) >= pivotnum)
							j++;
						else 
						{
							alert("Not completely swapped, thus cannot be broken/parted");
							return;
						}	
					}

					for (var i = 0; i < pclen; i++) {
						console.log("breaking/parting ");
						console.log(pchildren.length);
						console.log(pchildren[0].innerHTML);
						if(parseInt(pchildren[0].innerHTML) < pivotnum)
						{
							left_array.appendChild(pchildren[0]);
							left++;
						}
						else 
						{
							right_array.appendChild(pchildren[0]);
							right++;
						}
					}

					pivot_arrays = document.getElementById('array_container_pivot');
					pivot_arrays.removeChild(partitionArray);
					if(left >0)
						pivot_arrays.appendChild(left_array);
					if(right>0)
						pivot_arrays.appendChild(right_array);
				}
			}
			else 
				alert("partionnode not in the partitionarray")
		}
		else 
			alert("partionarray or partitionnode not chosen")

		partitionArray = 0;
		partitionNode = 0;
	}
	else 
		console.log("in concatenation mode");
	unselectAllNodes();

}

/********
 * Swap *
 *******/

 //Swap machine swaps 2 elements about a given pivot element and array when the first swap element is greater than pivot and the second swap element is lesser than pivot. The machine checks for different conditions as the 
 //below alerts will show.
document.getElementById("swap").addEventListener ("click", swap, false);
 function swap(){
	console.log("in swap");
	console.log(partitionArray);
	console.log(partitionNode);
	console.log(swappartiotionNode1);
	console.log(swappartiotionNode2); 
	if(!canconcatenate)
	{
		if(partitionArray != 0 && partitionNode != 0 && swappartiotionNode1 != 0 && swappartiotionNode2 != 0)
		{
			if((partitionArray.id == partitionNode.parentElement.id) && (partitionArray.id == swappartiotionNode1.parentElement.id) && (partitionArray.id == swappartiotionNode2.parentElement.id))
			{
				if(partitionArray.childElementCount<3)
					alert("only 2 element in the partitionarray")
				else 
				{
					var indexp = Array.prototype.indexOf.call(partitionArray.children, partitionNode);
					var indexs1 = Array.prototype.indexOf.call(partitionArray.children, swappartiotionNode1);
					var indexs2 = Array.prototype.indexOf.call(partitionArray.children, swappartiotionNode2);

					console.log(indexp);
					console.log(indexs1);
					console.log(indexs2);
	
					if(indexs1<indexp && indexp<indexs2)
					{
						if(parseInt(swappartiotionNode1.innerHTML) >= parseInt(partitionNode.innerHTML) && parseInt(swappartiotionNode2.innerHTML) < parseInt(partitionNode.innerHTML))
						{
							var temp = swappartiotionNode1.innerHTML;
							swappartiotionNode1.innerHTML = swappartiotionNode2.innerHTML;
							swappartiotionNode2.innerHTML = temp;
							console.log("swap done");
						}
						else 
							alert("Swap not possible");
					}
					else 
						alert("Swap not possible - element not on either side of pivot element");				

				}
			}
			else 
				alert("partionnode and the chosen swap nodes are not in the same partitionarray")
		}
		else 
			alert("partionarray, partitionnode or swap nodes have not been chosen")

		partitionNode = 0;
		partitionArray = 0;
		swappartiotionNode1 = 0;
		swappartiotionNode2 = 0;
	}
	else 
		console.log("in concatenation mode");
	unselectAllNodes();

 }


/*************
 * Partition *
 *************/

//Partition machine divides a pivot array about a pivot element such that left array has all elements less than pivot number and right array has all elements greater than or equal to pivot number.
//Redundant partitions will not be visualized
document.getElementById("partition").addEventListener ("click", partition, false);

function  partition() {
	console.log("in partition")
	console.log(partitionNode)
	console.log(partitionArray)
	console.log(canconcatenate);

	if(!canconcatenate)
	{
		if(partitionArray != 0 && partitionNode != 0)
		{
			if(partitionArray.id == partitionNode.parentElement.id)
			{
				if(partitionArray.childElementCount<2)
					alert("only 1 element in the partitionarray")
				else 
				{
					var parentid = partitionArray.id;
					var pivotnum = parseInt(partitionNode.innerHTML);
					
					var left_array = document.createElement('div');
					left_array.id = parentid+"0";
					left_array.addEventListener("click", function(){
						selectPartitionArray(left_array.id);
					}, false);

					var right_array = document.createElement('div');
					right_array.id = parentid+"1";
					right_array.addEventListener("click", function(){
						selectPartitionArray(right_array.id);
					}, false);

					var left = 0;
					var right = 0;
					console.log(partitionArray.children);
					var pchildren = partitionArray.children;
					var pclen = partitionArray.children.length;
					for (var i = 0; i < pclen; i++) {
						console.log("partitioning");
						console.log(pchildren.length);
						console.log(pchildren[0].innerHTML);
						if(parseInt(pchildren[0].innerHTML) < pivotnum)
						{
							left_array.appendChild(pchildren[0]);
							left++;
						}
						else 
						{
							right_array.appendChild(pchildren[0]);
							right++;
						}
					}

					pivot_arrays = document.getElementById('array_container_pivot');
					pivot_arrays.removeChild(partitionArray);
					if(left >0)
						pivot_arrays.appendChild(left_array);
					if(right>0)
						pivot_arrays.appendChild(right_array);				

				}
			}
			else 
				alert("partionnode not in the partitionarray")
		}
		else 
			alert("partionarray or partitionnode not chosen")

		partitionArray = 0;
		partitionNode = 0;
	}
	else 
		console.log("in concatenation mode");

	//Concatenation mode is checked
	if(!canconcatenate)
	{
		console.log("finding if it can concatenate");
		pivot_arrays = document.getElementById('array_container_pivot');
		console.log(pivot_arrays.children.length);
		var i = 0;
		for(i=0;i<pivot_arrays.children.length;i++)
		{
			console.log(i);
			console.log(pivot_arrays.children[i].childElementCount);
			if(pivot_arrays.children[i].childElementCount>1)
				break;
		}

		if(i>=pivot_arrays.children.length)
		{
			alert("concatenation should work now")
			canconcatenate = true;
			document.getElementById("concatenate").addEventListener ("click", concatenate, false);
		}
	}
	console.log(canconcatenate);
	unselectAllNodes();

}

/****************
 * Concatenation *
 ****************/

//Concatenation machine/mode will only be achieved when all elements are broken down until a they form single element arrays.
//In concatenation mode, the machine allows for 2 sorted arrays to be chosen to be concatenated.
function concatenate() {

	var mergeList =[];
	if(concatenateArray1 != 0 && concatenateArray2 != 0)
	{
		var i = 0;
		var j = 0;
		var array1len = JSON.parse(JSON.stringify(concatenateArray1.children.length));
		var array2len = JSON.parse(JSON.stringify(concatenateArray2.children.length));
		console.log(array1len);
		console.log(array2len);
		console.log("in merging");

		while(i<array1len && j<array2len)
		{
			console.log("both");
			console.log(mergeList);
			console.log(i);
			console.log(concatenateArray1.children.length);
			console.log(array1len);
			console.log(j);
			console.log(concatenateArray2.children.length);
			console.log(array2len);

			if(parseInt(concatenateArray1.children[i].innerHTML) <= parseInt(concatenateArray2.children[j].innerHTML))
			{
				mergeList.push(concatenateArray1.children[i]);
				i++;
			}
			else 
			{
				mergeList.push(concatenateArray2.children[j]);
				j++;
			}
		}

		while(i<array1len)
		{
			mergeList.push(concatenateArray1.children[i]);
			i++;			
		}

		while(j<array2len)
		{
			mergeList.push(concatenateArray2.children[j]);
			j++;			
		}

		var concatenateArrayid = concatenateArray1.id;
		pivot_arrays = document.getElementById('array_container_pivot');
		pivot_arrays.removeChild(concatenateArray1);
		pivot_arrays.removeChild(concatenateArray2);

		var concatenateArray = document.createElement('div');
		concatenateArray.id = concatenateArrayid
		concatenateArray.addEventListener("click", function(){
			selectPartitionArray(concatenateArray.id);
		}, false);

		console.log(mergeList);
		for(var i=0;i<mergeList.length;i++)
			concatenateArray.appendChild(mergeList[i])
		pivot_arrays.appendChild(concatenateArray);
	}
	else 
		alert("concatenate arrays not chosen")

	partitionNode = 0;
	concatenateArray1 = 0;
	concatenateArray2 = 0;
	unselectAllNodes();
}