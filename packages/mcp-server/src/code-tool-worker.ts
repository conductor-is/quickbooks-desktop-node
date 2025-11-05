// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import util from 'node:util';

import ts from 'typescript';

import { WorkerInput, WorkerSuccess, WorkerError } from './code-tool-types';
import { Conductor } from 'conductor-node';

function getRunFunctionNode(
  code: string,
): ts.FunctionDeclaration | ts.FunctionExpression | ts.ArrowFunction | null {
  const sourceFile = ts.createSourceFile('code.ts', code, ts.ScriptTarget.Latest, true);

  for (const statement of sourceFile.statements) {
    // Check for top-level function declarations
    if (ts.isFunctionDeclaration(statement)) {
      if (statement.name?.text === 'run') {
        return statement;
      }
    }

    // Check for variable declarations: const run = () => {} or const run = function() {}
    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (ts.isIdentifier(declaration.name) && declaration.name.text === 'run') {
          // Check if it's initialized with a function
          if (
            declaration.initializer &&
            (ts.isFunctionExpression(declaration.initializer) || ts.isArrowFunction(declaration.initializer))
          ) {
            return declaration.initializer;
          }
        }
      }
    }
  }

  return null;
}

const fetch = async (req: Request): Promise<Response> => {
  const { opts, code } = (await req.json()) as WorkerInput;

  const runFunctionNode = getRunFunctionNode(code);
  if (!runFunctionNode) {
    return Response.json(
      {
        message:
          'The code is missing a top-level `run` function. Write code within this template:\n\n```\nasync function run(client) {\n  // Fill this out\n}\n```',
      } satisfies WorkerError,
      { status: 400, statusText: 'Code execution error' },
    );
  }

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
