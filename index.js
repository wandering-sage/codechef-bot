var axios = require("axios");
var fs = require("fs");
var process = require("process");
var config = require("./config");

var contestName = "";

async function main() {
	var contestUrl = config.contestBaseUrl + config.contestCode;
	var problems = await getAllProlems(contestUrl);
	var contestDir = `${config.codedir}\\${contestName}`;

	if (fs.existsSync(contestDir)) {
		console.error(`Folder ${contestName} already exists.`);
		process.exit();
	}

	if(problems.length<1){
		console.log("Please provide your division in contest code (add A or B or C at the end of contest code)");
		return;
	}

	fs.mkdirSync(contestDir);
	problems.forEach(createFiles);

	async function createFiles(p) {
    var curDir = `${contestDir}\\${p}`;
		var problemUrl = `${contestUrl}/problems/${p}`;
		var { input, expected } = await getTestCase(problemUrl);

    if(input){
      console.log(`Creating files for ${p}`);
    }
    
		fs.mkdirSync(curDir);
		fs.copyFileSync(`./template.cpp`, `${curDir}\\sol.cpp`);
		fs.copyFileSync(`./test.js`, `${curDir}\\test.js`);
    
		fs.writeFileSync(`${curDir}\\input.txt`, input);
		fs.writeFileSync(`${curDir}\\expected.txt`, expected);
	}
}

main();

async function getAllProlems(url) {
  console.log("Fetching Contest Info..");

	var res = await axios.get(url);
	if (res.data.status != "success") {
		handleError(res.data);
		return;
	}
  if(res.data.status == "success"){
    console.log("Success");
  }
	contestName = res.data.name;
	var ret = [];
	for (p in res.data.problems) {
		ret.push(p);
	}
	return ret;
}

async function getTestCase(url) {
	var res = await axios.get(url);
	if (res.data.status != "success") {
		handleError(res.data);
		return;
	}
	var data = res.data.body;
	var arr = data.split("```");
	var input = arr[1].trim();
	var expected = arr[3].trim();
	return { input, expected };
}

function handleError(data) {
	process.stdout.write(data.message);
	process.exit();
}
