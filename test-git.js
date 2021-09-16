const childProcess = require('child_process');
const { promisify } = require('util');

const execPromisified = promisify(childProcess.exec);
const exec = async command => {
  try {
    const { stdout } = await execPromisified(command);
    console.log('stdout::', stdout);
    return stdout.trim();
  } catch ({ stderr }) {
    console.log('stderr::', stderr);
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
