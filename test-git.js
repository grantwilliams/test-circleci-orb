const childProcess = require('child_process');
const { promisify } = require('util');

const execPromisified = promisify(childProcess.exec);
const exec = async command => {
  console.log('command::', command);
  try {
    const { stdout, stderr } = await execPromisified(command);
    console.log('stdout::try', stdout);
    console.log('stderr::try::', stderr);
    return stdout.trim() ? stdout.trim() : stderr.trim();
  } catch (stderr) {
    console.log('stderr::catch::', stderr);
    return stderr.trim();
  }
};

(async () => {
  const fetchOutput = await exec('git fetch origin my-new-branch');

  console.log('fetchOutput::', fetchOutput);
  if ("fatal: couldn't find remote".indexOf(fetchOutput)) {
    console.log('No remote');
  }

  await exec('git checkout --track origin/my-new-branch');
  await exec('git branch -vv');
  await exec('git pull');
  await exec('git log');
})();
