var HashTable = function(){
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
  this._count = 0;
};

HashTable.prototype.insert = function(k, v){

  var i = getIndexBelowMaxForKey(k, this._limit);
  //create a tuple with [k, v]
  var tup = [k, v];
  //retrieve the bucket at index i
  //if no bucket
  if(this._storage.get(i) === undefined){
    //make bucket
    this._storage.set(i, []);
  }

  this._storage.get(i).push(tup);

  this._count++;

  if (this._count >= (this._limit * .75)){
    // console.log(this._limit);
    var newLimit = (this._limit * 2);
    // this._limit = this._limit * 2;
    this.resize(newLimit);
  }
};

HashTable.prototype.retrieve = function(k){

  var i = getIndexBelowMaxForKey(k, this._limit);
  //get bucket
  var bucket = this._storage.get(i);
  //iterate inside bucket
  console.log(bucket);
  debugger;
  for(var key = 0;key < bucket.length;key++){
    if (bucket[key][0] === k){
      return bucket[key][1];
    }
  }
  return null;
};

HashTable.prototype.remove = function(k){
  var i = getIndexBelowMaxForKey(k, this._limit);
  //get bucket
  var bucket = this._storage.get(i);
  //iterate bucket


  for(var key = 0; key < bucket.length;key++){
    //if tuple[0] === k
    if(bucket[key][0] === k){
      //splice bucket[tuple key, 1]
      bucket.splice(key, 1)
    }
  }
  if(this._count > 0){this._count};
  if(this._count < (.25 * this._limit)){
    var newLimit = (this._limit / 2);

    this.resize(newLimit);
  }
};
HashTable.prototype.resize = function(limit){

  // console.log(this._storage);
  var pairCopies = [];
  //push tupples into new pairCopies
  this._storage.each(function(buck,index,storage){
    if (buck === undefined){return null};
    for(var k = 0;k <buck.length;k++){
      pairCopies.push((buck[k]));
    }
  });

  console.log(this._limit);

  this._limit = limit;
  this._storage = LimitedArray(limit);

  this._count = 0;

  for (var l = 0;l < pairCopies.length;l++){
     var key = pairCopies[l][0];
     var val = pairCopies[l][1];
     this.insert(key, val);
    }
  // console.log(this._storage.get(0));

  // _.each(this._storage,function(bucket){
    // console.log(this._storage(bucket));
    // for(var cnt = 0; tup < bucket.length;cnt++){
      // console.log(bucket(cnt)[0]);
    // }

      // console.log(bucket);
    // }, pairCopies);




  // });


}


/*
 * Complexity: What is the time complexity of the above functions?
 */
