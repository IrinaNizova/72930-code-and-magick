function getMessage(a, b){
  if (typeof(a) == "boolean"){
    if (a === true){
      return "Я попал в " + b;
    }
    else{
      return "Я никуда не попал";
    }
  }
  else if (typeof(a) == "number"){
    return "Я прыгнул на " + (a * 100) + " сантиметров";
  }
  else if (typeof(a) == "object"){
    if (typeof(b) == "object"){
      return "Я прошёл " + sum2massive(a, b) + " метров";
    }
    else{
      return "Я прошёл " + sum1massive(a) +" шагов";
    }
  }
}

function sum1massive(args){
  var result = 0;

  for (var i = 0; i < args.length; i++) {
    result += args[i];
  }
  return result;
}


function sum2massive(args1, args2){
    var result = 0;

    for (var i = 0; i < args1.length; i++) {
        result += (args1[i] * args2[i]);
    }

    return result;
}
