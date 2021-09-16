const childProcess = require('child_process');
const { promisify } = require('util');

const execPromisified = promisify(childProcess.exec);
const exec = async command => {
  const output = await execPromisified(command)
    .then(res => res.stdout.trim())
    .catch(err => err.stderr.trim());
  console.log(JSON.stringify(output, null, 2));
  return output;
};

(async () => {
  const fetchOutput = await exec('git fetch origin my-new-branch');

  console.log(fetchOutput);
  if (fetchOutput.indexOf("fatal: couldn't find remote")) {
    console.log('No remote');
    process.exit(0);
  }

  await exec('git checkout --track origin/my-new-branch');
  await exec('git branch -vv');
  await exec('git pull');
  await exec('git log');
})();
