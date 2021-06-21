var { execSync } = require('child_process');
var process = require('process');

var flags = getFlags();

execSync('g++ sol.cpp -o a.exe', {stdio: 'inherit'});

if(flags.s){
  execSync('type inp.txt | a.exe > out.txt',  {stdio: 'inherit'});
}
else{
  execSync('type inp.txt | a.exe',  {stdio: 'inherit'});
}

function getFlags () {
  const flags = {};
  process.argv
      .slice(2, process.argv.length)
      .forEach( arg => {
        if (arg[0] === '-') {
          var arr = arg.slice(1,arg.length).split('');
          arr.forEach(flag => {
            flag = flag.toLowerCase();
            flags[flag] = true;
          });
      }
  });
  return flags;
}