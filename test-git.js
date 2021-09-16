const childProcess = require('child_process');
const { promisify } = require('util');

const execPromisified = promisify(childProcess.exec);
const exec = async command => {
  try {
    const { stdout } = await execPromisified(command);
    console.log('ok');
    return stdout.trim();
  } catch ({ stdout }) {
    console.log('not ok');
    return stdout.trim();
  }
};

(async () => {
  const fetchOutput = await exec('git fetch origin my-new-branch');

  if (fetchOutput.indexOf("fatal: couldn't find remote")) {
    console.log('No remote');
  }

  console.log(fetchOutput);
})();
