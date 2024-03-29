import { exportVariable, getInput, info, notice, setOutput } from '@actions/core';
import { App } from 'cdktf';
import { Infrastructure } from './stack';

const { GITHUB_TOKEN, GITHUB_REPOSITORY, GITHUB_REF } = process.env;

export class Action {
  async run(): Promise<void> {
    if (!GITHUB_TOKEN) {
      throw new Error(`Missing GITHUB_TOKEN environment variable`);
    }

    if (!GITHUB_REPOSITORY) {
      throw new Error('Missing GITHUB_REPOSITORY environment variable');
    }

    if (!GITHUB_REF) {
      throw new Error('Missing GITHUB_REF environment variable');
    }

    if (!GITHUB_REF.startsWith('refs/heads/')) {
      throw new Error('GITHUB_REF must start with refs/heads/');
    }

    const [org, repo] = GITHUB_REPOSITORY.split('/');
    if (!org || !repo) {
      throw new Error(
        `Unable to parse owner and repo from GITHUB_REPOSITORY environment variable: ${GITHUB_REPOSITORY}`,
      );
    }

    const stage = GITHUB_REF.replace('refs/heads/', '').replace(/\//g, '-');

    info(`Running action with GITHUB_REPOSITORY: ${GITHUB_REPOSITORY}`);
    notice(`Running action with GITHUB_REPOSITORY: ${GITHUB_REPOSITORY}`);

    const todo = getInput('todo', { required: false });
    setOutput('todo', todo);
    exportVariable('TODO', todo);

    const app = new App();
    new Infrastructure(app, 'infrastructure', {
      repositoryName: repo,
      stage,
    });
    app.synth();
  }
}
