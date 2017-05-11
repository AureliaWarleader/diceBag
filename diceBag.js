/* I'm aware that there are a gajillion dice rolling libraries out there.
Still going to build my own. Because I can. */
/*I decided to rewrite this to give it a go somewhat on my own and add additional
functionality, specifically the ability to roll multiple sets of dice at once.*/

function diceBag(diceRolls){
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

  //Array to stash our rolls
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

  //Let's get us some numbers
    rolls.map(function(element){
      element.total = element.results.reduce(function(a, b){ return a + b });
      element.average = Math.round((element.total / element.numDice));
      element.total += element.modifier;
      element.highest = Math.max.apply(null, element.results);
      element.lowest = Math.min.apply(null, element.results);
    });

  //Lastly, lets create a nice, human-readable equation for this
    rolls.map(function(element){
      element.equation = element.results.join(' + ');
      element.equation = element.modifier >= 0 ? element.equation + ' + ' + element.modifier + ' = ' + element.total : element.equation + ' ' + element.modifier + ' = ' + element.total;
    })

    return rolls;
};
