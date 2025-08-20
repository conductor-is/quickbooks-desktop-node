// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import util from 'node:util';
import { WorkerInput, WorkerSuccess, WorkerError } from './code-tool-types';
import { Conductor } from 'conductor-node';

const fetch = async (req: Request): Promise<Response> => {
  const { opts, code } = (await req.json()) as WorkerInput;
  const conductor = new Conductor({
    ...opts,
  });

  const logLines: string[] = [];
  const errLines: string[] = [];
  const console = {
    log: (...args: unknown[]) => {
      logLines.push(util.format(...args));
    },
    error: (...args: unknown[]) => {
      errLines.push(util.format(...args));
    },
  };
  try {
    let run_ = async (conductor: any) => {};
    eval(`
      ${code}
      run_ = run;
    `);
    const result = await run_(conductor);
    return Response.json({
      result,
      logLines,
      errLines,
    } satisfies WorkerSuccess);
  } catch (e) {
    const message = e instanceof Error ? e.message : undefined;
    return Response.json(
      {
        message,
      } satisfies WorkerError,
      { status: 400, statusText: 'Code execution error' },
    );
  }
};

export default { fetch };
