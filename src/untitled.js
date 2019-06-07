(params) => {
  var x = params.input;
  var y = params.original;

  x=x.split(' ');
  y=y.split(' ');

  var diffs = [];
  var i=0,j=0;
  while (1) {
    if (!x[i] || !y[j]) break;

    if (x[i] == y[j]) {
      i++;
      j++;
      continue;
    }

    if (x[i] == y[j+1]) {
      diffs.push('Extra word : ' + y[j])
      i++;
      j+=2;
      continue;
    }

    if (x[i+1] == y[j]) {
      diffs.push('Skip word: ' + x[i])
      i+=2;
      j++;
      continue;
    }

    if (x[i+1] == y[j+1]) {
      diffs.push('Wrong word: ' + y[j])
      i++;
      j++;
      continue;
    }
  }
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */