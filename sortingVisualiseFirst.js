'use strict';


/************************
 * Visualization Canvas *
 ************************/
function SortingVisualizationFirst(canvasID, size) {
  this.pivotElement = -1;
  this.timeout = 150;
  this.arraySize = size;
  this.canvasID = canvasID;
  this.setupCanvas();
  this.populateNumbers();
  this.shuffleArray();
  this.enableEventHandlers();
  this.visualizeArray();
  this.setRandomSelectedElementAsPivot();
}

SortingVisualizationFirst.prototype.setupCanvas = function() {
  this.canvas = document.getElementById(this.canvasID);
  this.ctx = this.canvas.getContext('2d');
  this.ctx.imageSmoothingEnabled = false;
};

SortingVisualizationFirst.prototype.getWidth = function() {
  return this.canvas.width;
};

SortingVisualizationFirst.prototype.getHeight = function() {
  return this.canvas.height;
};

SortingVisualizationFirst.prototype.clearCanvas = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

SortingVisualizationFirst.prototype.visualizeArray = function() {
  // [TODO] Move computations out
  var size = this.array.length;
  var width = this.getWidth();
  var height = this.getHeight();
  var wRatio = width / size;
  var hRatio = height / size;
  this.clearCanvas();

  // Fill the canvas with bars
  for (var i=0; i<size; i++) {
    var value = this.array[i];
    var barHeight = value * hRatio;
    var color = 135 + value + 10 + i*2;
    if (this.pivotElement != value) { 
        this.ctx.fillStyle = 'rgb(' + 0 + ',' + 0 + ',' + 180 + ')' 
    } else { 
        this.ctx.fillStyle = 'rgb(' + 0 + ',' + 250 + ',' + 180 + ')'
    }
    this.ctx.fillRect(i*wRatio, height-barHeight, wRatio-10, barHeight);
    this.ctx.font = "12px Comic Sans MS";
    this.ctx.fillStyle = "red";
    this.ctx.textAlign = "center";
    this.ctx.fillText(value.toString(), i*wRatio, height);
  }
  
  this.ctx.save();
};


SortingVisualizationFirst.prototype.setRandomSelectedElementAsPivot = function (elemen) {
    this.pivotElement = elemen || -1;
    document.getElementById('first_element_message').innerHTML = 'Selecting ' + this.pivotElement.toString() + ' as pivot';
};
/**********************
 * Sorting Algorithms *
 **********************/
SortingVisualizationFirst.prototype.enableEventHandlers = function() {
//   document.getElementById('sort-shuffle').onclick = this.shuffleArray.bind(this);
//   document.getElementById('sort-insertion').onclick = this.insertionSort.bind(this);
//   document.getElementById('sort-bubble').onclick = this.bubbleSort.bind(this);
  document.getElementById('sort-quick-first').onclick = this.quickSort.bind(this);
};

SortingVisualizationFirst.prototype.populateNumbers = function() {
//   this.array = [1,2,3,4,5,6,7,8,9];
  this.array = [];
  for (var i=1, len=this.arraySize; i<=len; i++) {
    this.array.push(i);
  }
  this.visualizeArray();
};

SortingVisualizationFirst.prototype.shuffleArray = function() {
  var a = this.array;
  for (var j, x, i = a.length; i; j = Math.floor(Math.random() * i), x = a[--i], a[i] = a[j], a[j] = x) {}
  this.visualizeArray();
};

SortingVisualizationFirst.prototype.clearArray = function() {
  while (this.array.length) {
    this.array.pop();
  }
};

SortingVisualizationFirst.prototype.randomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};


SortingVisualizationFirst.prototype.quickSort = function() {
  var a = this.array;
  var ref = this;


  var qsort = function(left, right) {
    if (left < right) {
      // Partition left and right
      var pivotIndex = left;
      // var pivotIndex = ref.randomInt(left, right);
      ref.setRandomSelectedElementAsPivot (pivotIndex);  
      var pivotValue = a[pivotIndex];
      var current = left;
      var i = left;
      a[pivotIndex] = a[right];
      a[right] = pivotValue;

      var partitionLoop = function() {
        if (i < right) {
          if (a[i] < pivotValue) {
            ref.visualizeArray();
            var temp = a[i];
            a[i] = a[current];
            a[current] = temp;
            current++;
          }
          ref.visualizeArray();
          window.setTimeout(partitionLoop, ref.timeout);
        }
        else {
          a[right] = a[current];
          a[current] = pivotValue;
          qsort(left, current-1);
          qsort(current+1, right);
        }
        ref.visualizeArray();
        i++;
      };
      partitionLoop();
    }
  };
  qsort(0, a.length-1);
};

(function() {
  new SortingVisualizationFirst('first_element_pivot_canvas', 50);
})();