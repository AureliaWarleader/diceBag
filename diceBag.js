/* I'm aware that there are a gajillion dice rolling libraries out there.
Still going to build my own. Because I can. */

/* Commenting out the original code while I rewrite it to make it a little prettier
Or, y'know, to completely rewrite everything in a whole new way because I can think of a million
ways to do this but can't decide which method is best...yay for being a noob*/

function diceBag(diceRolls){
  //This is meant to be a log of past rolls. May or may not get used
    let log = [];

  //The results of the current set of rolls
    const roll = {
      notation: '',
      numDice: 0,
      sides: 0,
      modifier: 0,
      results: [],
      total: 0,
      highest: 0,
      lowest: 0,
      average: 0,
      equation: ''
    }
    const rolls = [];

  //First turn arguments into array for later use
    const notations = Array.prototype.slice.call(arguments);

  //Then we'll use that to make roll objects
    notations.forEach(function(element){
      let newRoll = Object.create(roll);
      newRoll.notation = element;
      rolls.push(newRoll);
    });

  //then let's parse the raw notation into more usable bits.
    const parse = rolls.forEach(function(element){
      element.notation = element.notation.replace(/\s/g, '');
      const notation = element.notation.match(/^(\d+)?d(\d+)([+-]\d+)?$/i);
      if (notation === null){
        console.log("Please enter valid dice notation");
        return null;
      };
      notation[1] = (notation[1] !== undefined) ? Number(notation[1]) : 1;
      notation[2] = (notation[2] !== undefined) ? Number(notation[2]) : 0;
      notation[3] = (notation[3] !== undefined) ? Number(notation[3]) : 0;
      element.numDice = notation[1];
      element.sides = notation[2];
      element.modifier = notation[3];
    });

  //Now, we actually roll some dice
    rolls.map(function(element){
      let theseRolls = [];
      for (var i = 0; i < element.numDice; i++) {
        theseRolls.push((Math.floor(Math.random() * element.sides) + 1));
      }
      element.results = theseRolls;
    });

  //Let's get us a total
  rolls.map(function(element){
    element.total = element.results.reduce(function(a, b){ return a + b });
    element.total += element.modifier;
    console.log(element.results+' + '+element.modifier+' + '+element.total);
  })
};

diceBag("2d6", "3d10-5", "d4+2");

/*
(function(){
  function diceBag(diceRoll){
  //Takes diceroll input and splits into parts
  var parse = function(diceRoll){
    //Remove spaces to make notation valid
    diceRoll = diceRoll.replace(/\s/g, '');
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
    total: 0,
    highest: 0,
    lowest: 0,
    average: 0
  };

  //Now to actually roll dice
  for (var i = 0; i<parts.rolls; i++){
    results.rolls[i] = (Math.floor(Math.random() * parts.sides) + 1);
  }

  //Set results.modifier so it can be used in output
  results.modifier = parts.modifier;

  //Add up rolls to get total
  for (var i = 0; i < results.rolls.length; i++){
    results.total += results.rolls[i];
  }
  //Find average before modifier is added
  results.avg = (results.total / rolls.length);

  //then add modifier
  results.total += results.modifier;

  //Lastly, output in a human readable way
  results.rolls = results.rolls.join("+");
  if(results.modifier >= 0){
    results.rolls = results.rolls += "+" + results.modifier + " = " + results.total;
  } else {
    results.rolls = results.rolls += " " + results.modifier + " = " + results.total;
  }
  return results;
}
})();
*/
