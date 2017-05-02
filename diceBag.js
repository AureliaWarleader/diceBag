/* I'm aware that there are a gajillion dice rolling libraries out there.
Still going to build my own. Because I can. */
/*
* Create a function (diceBag) that can be called and fed standard dice notation
*ex diceBag(1d6+3)
*First, parse the given notation into number of dice, number of sides, and modifier
*Then, use these parameters to return the results of each roll and the total value.
*/

/*For now I'm just going through building the individual parts and testing
* them. I'll eventually package it all in a nice self-contained function
* Please ignore all the notes to myself. Just want to remember what I'm
* doing so maybe I can write about it later or some such thing.
*/

function diceBag(diceRoll){
  //Takes diceroll input and splits into parts
  var parse = function(diceRoll){
    var notation = diceRoll.match(/^(\d+)?d(\d+)([+-]\d+)?$/i);
    if (notation === null){
      console.log("Please enter valid dice notation");
      return null;
    };
    var rolls = (notation[1] !== undefined) ? Number(notation[1]) : 1;
    var sides = (notation[2] !== undefined) ? Number(notation[2]) : 0;
    var modifier = (notation[3] !== undefined) ? Number(notation[3]) : 0;
    //Number(blah) turns notation[#] into number rather than string
    return { rolls: rolls, sides: sides, modifier: modifier };
  };

  var parts = parse(diceRoll);

  //Create a way to store info about dice rolls
  var results = {
    rolls: [],
    modifier: 0,
    total: 0
  };

  //Now to actually roll dice
  for (var i = 0; i<parts.rolls; i++){
    results.rolls[i] = (1 + Math.floor(Math.random()* parts.sides));
  }
  
  console.log(results.rolls);
}

diceBag("3d6+5");
