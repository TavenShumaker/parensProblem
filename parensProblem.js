//isBalanced(‘((a)}’) false
//isBalanced(‘2()’) false
//isBalanced(‘[(123hgds)212]’) true
//isBalanced(‘{12(12[]))}’)false
//isBalanced(‘(()[222+,2{}[]12])’)true


//iterative soulution
const iterative = (str) => {
  //ensure non-parens characters are not outside of parens
  if(str[0] !== '(' && str[0] !== '{' && str[0] !== '[') return false;
  if(str[str.length - 1] !== ')' && str[str.length - 1] !== '}' && str[str.length - 1] !== ']')return false;

  //create auxillary array and object
  const auxArr = [];
  const auxObj = {
    '}': '{',
    ']': '[',
    ')': '('
  }

  //iterate over string
  for(let i = 0; i < str.length; i++){
    //if opening add to stack
    if(str[i] === '(' || str[i] === '{' || str[i] === '[') auxArr.push(str[i]);
    //if closing must match last opening
    else if(str[i] === ')' || str[i] === '}' || str[i] === ']'){
      if(auxObj[str[i]] === auxArr[auxArr.length - 1])auxArr.pop();
      else return false;
    }
  }

  return true;
};

const recursive = (str, pointer = 0, first = true, auxObj = {
  '}': '{',
  ']': '[',
  ')': '('
}) => {
  //ensure non-parens characters are not outside of parens
  if(first){
    if(str[0] !== '(' && str[0] !== '{' && str[0] !== '[') return false;
    if(str[str.length - 1] !== ')' && str[str.length - 1] !== '}' && str[str.length - 1] !== ']')return false;
  }

  //initialize target to undefined
  let target;

  //iterate over characters of string
  while(pointer < str.length){
    //if pointer is at opening parens
    if(str[pointer] === '(' || str[pointer] === '{' || str[pointer] === '['){
      //set target if not set
      if(target === undefined){
        target = str[pointer];
        pointer++;
      }
      //recuse call if target is set
      else{
        let result = recursive(str, pointer, false, auxObj);
        //if false was returned bubble false all the way out
        if(result === false) return false;
        //if a pointer was returned, update our pointer
        else pointer = result;
      }
    }
    //if pointer is at closing parens
    else if(str[pointer] === ')' || str[pointer] === '}' || str[pointer] === ']'){

      //AND it matches target, return pointer if not first level, update pointer if first level
      if(auxObj[str[pointer]] === target){
        if(first){
          pointer++;
          target = undefined;
        }
        else return pointer + 1;
      }
      //if it doesn't match return false
      else return false;
    }
    //if it isn't a parens skip
    else pointer++;
  }

  return true;

};

console.log(iterative("((a)}"))//false
console.log(iterative("2()")) //false
console.log(iterative("[(123hgds)212]")) //true
console.log(iterative("{12(12[]))}")) //false
console.log(iterative("(()[222+,2{}[]12])")) //true

console.log(recursive("((a)}"))//false
console.log(recursive("2()")) //false
console.log(recursive("[(123hgds)212]")) //true
console.log(recursive("{12(12[]))}")) //false
console.log(recursive("(()[222+,2{}[]12])")) //true