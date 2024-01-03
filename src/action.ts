import { exportVariable, getInput, info, notice, setOutput } from '@actions/core';
import { exec } from './exec';

const { GITHUB_TOKEN, GITHUB_REPOSITORY } = process.env;

export class Action {
  async run(): Promise<void> {
    if (!GITHUB_TOKEN) {
      throw new Error(`Missing GITHUB_TOKEN environment variable`);
    }

    if (!GITHUB_REPOSITORY) {
      throw new Error('Missing GITHUB_REPOSITORY environment variable');
    }

    const [org, repo] = GITHUB_REPOSITORY.split('/');
    if (!org || !repo) {
      throw new Error(
        `Unable to parse owner and repo from GITHUB_REPOSITORY environment variable: ${GITHUB_REPOSITORY}`,
      );
    }

    info(`Running action with GITHUB_REPOSITORY: ${GITHUB_REPOSITORY}`);
    notice(`Running action with GITHUB_REPOSITORY: ${GITHUB_REPOSITORY}`);

    const todo = getInput('todo', { required: false });
    setOutput('todo', todo);
    exportVariable('TODO', todo);

    exec(['ls', '-al']);
  }
}
