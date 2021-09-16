const childProcess = require('child_process');
const { promisify } = require('util');

const execPromisified = promisify(childProcess.exec);
const exec = async command => {
  console.log('command::', command);
  try {
    const output = await execPromisified(command);
    console.log('stdout::try', JSON.stringify(output, null, 2));
    return {
      stdout: output.stdout.trim(),
      stderr: output.stderr.trim(),
    };
  } catch (stderr) {
    console.log('stderr::catch::', stderr.message);
    return stderr.message.trim();
  }
};

(async () => {
  const { stdout, stderr } = await exec(
    'git fetch origin my-new-branch-does-not-exist'
  );

  console.log('fetchOutput::', stdout);
  if (stderr.includes("fatal: couldn't find remote")) {
    console.log('No remote');
  }

  await exec('git checkout --track origin/my-new-branch');
  await exec('git branch -vv');
  await exec('git pull');
  await exec('git log');
})();
