function ChillerRand(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function ChillerFloat(min,max)
{
    return (Math.random()*(max-min+1)+min);
}

function ChillerMapNum(X, A, B, C, D) // If your number X falls between A and B, and you would like Y to fall between C and D
{
    // https://stackoverflow.com/a/345204
    var Y = (X-A)/(B-A) * (D-C) + C;
    return Y;
}