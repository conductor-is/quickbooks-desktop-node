// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import util from 'node:util';

import Fuse from 'fuse.js';
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

const fuse = new Fuse(
  [
    'conductor.authSessions.create',
    'conductor.endUsers.create',
    'conductor.endUsers.delete',
    'conductor.endUsers.list',
    'conductor.endUsers.passthrough',
    'conductor.endUsers.retrieve',
    'conductor.qbd.healthCheck',
    'conductor.qbd.accountTaxLines.list',
    'conductor.qbd.accounts.create',
    'conductor.qbd.accounts.list',
    'conductor.qbd.accounts.retrieve',
    'conductor.qbd.accounts.update',
    'conductor.qbd.billCheckPayments.create',
    'conductor.qbd.billCheckPayments.delete',
    'conductor.qbd.billCheckPayments.list',
    'conductor.qbd.billCheckPayments.retrieve',
    'conductor.qbd.billCheckPayments.update',
    'conductor.qbd.billCreditCardPayments.create',
    'conductor.qbd.billCreditCardPayments.delete',
    'conductor.qbd.billCreditCardPayments.list',
    'conductor.qbd.billCreditCardPayments.retrieve',
    'conductor.qbd.bills.create',
    'conductor.qbd.bills.delete',
    'conductor.qbd.bills.list',
    'conductor.qbd.bills.retrieve',
    'conductor.qbd.bills.update',
    'conductor.qbd.buildAssemblies.create',
    'conductor.qbd.buildAssemblies.delete',
    'conductor.qbd.buildAssemblies.list',
    'conductor.qbd.buildAssemblies.retrieve',
    'conductor.qbd.buildAssemblies.update',
    'conductor.qbd.checks.create',
    'conductor.qbd.checks.delete',
    'conductor.qbd.checks.list',
    'conductor.qbd.checks.retrieve',
    'conductor.qbd.checks.update',
    'conductor.qbd.classes.create',
    'conductor.qbd.classes.list',
    'conductor.qbd.classes.retrieve',
    'conductor.qbd.classes.update',
    'conductor.qbd.company.retrieve',
    'conductor.qbd.creditCardCharges.create',
    'conductor.qbd.creditCardCharges.delete',
    'conductor.qbd.creditCardCharges.list',
    'conductor.qbd.creditCardCharges.retrieve',
    'conductor.qbd.creditCardCharges.update',
    'conductor.qbd.creditCardCredits.create',
    'conductor.qbd.creditCardCredits.delete',
    'conductor.qbd.creditCardCredits.list',
    'conductor.qbd.creditCardCredits.retrieve',
    'conductor.qbd.creditCardCredits.update',
    'conductor.qbd.creditCardRefunds.create',
    'conductor.qbd.creditCardRefunds.delete',
    'conductor.qbd.creditCardRefunds.list',
    'conductor.qbd.creditCardRefunds.retrieve',
    'conductor.qbd.creditMemos.create',
    'conductor.qbd.creditMemos.delete',
    'conductor.qbd.creditMemos.list',
    'conductor.qbd.creditMemos.retrieve',
    'conductor.qbd.creditMemos.update',
    'conductor.qbd.currencies.create',
    'conductor.qbd.currencies.list',
    'conductor.qbd.currencies.retrieve',
    'conductor.qbd.currencies.update',
    'conductor.qbd.customerTypes.create',
    'conductor.qbd.customerTypes.list',
    'conductor.qbd.customerTypes.retrieve',
    'conductor.qbd.customers.create',
    'conductor.qbd.customers.list',
    'conductor.qbd.customers.retrieve',
    'conductor.qbd.customers.update',
    'conductor.qbd.dateDrivenTerms.create',
    'conductor.qbd.dateDrivenTerms.list',
    'conductor.qbd.dateDrivenTerms.retrieve',
    'conductor.qbd.deletedListObjects.list',
    'conductor.qbd.deletedTransactions.list',
    'conductor.qbd.discountItems.create',
    'conductor.qbd.discountItems.list',
    'conductor.qbd.discountItems.retrieve',
    'conductor.qbd.discountItems.update',
    'conductor.qbd.employees.create',
    'conductor.qbd.employees.list',
    'conductor.qbd.employees.retrieve',
    'conductor.qbd.employees.update',
    'conductor.qbd.estimates.create',
    'conductor.qbd.estimates.delete',
    'conductor.qbd.estimates.list',
    'conductor.qbd.estimates.retrieve',
    'conductor.qbd.estimates.update',
    'conductor.qbd.inventoryAdjustments.create',
    'conductor.qbd.inventoryAdjustments.delete',
    'conductor.qbd.inventoryAdjustments.list',
    'conductor.qbd.inventoryAdjustments.retrieve',
    'conductor.qbd.inventoryAdjustments.update',
    'conductor.qbd.inventoryAssemblyItems.create',
    'conductor.qbd.inventoryAssemblyItems.list',
    'conductor.qbd.inventoryAssemblyItems.retrieve',
    'conductor.qbd.inventoryAssemblyItems.update',
    'conductor.qbd.inventoryItems.create',
    'conductor.qbd.inventoryItems.list',
    'conductor.qbd.inventoryItems.retrieve',
    'conductor.qbd.inventoryItems.update',
    'conductor.qbd.inventorySites.create',
    'conductor.qbd.inventorySites.list',
    'conductor.qbd.inventorySites.retrieve',
    'conductor.qbd.inventorySites.update',
    'conductor.qbd.invoices.create',
    'conductor.qbd.invoices.delete',
    'conductor.qbd.invoices.list',
    'conductor.qbd.invoices.retrieve',
    'conductor.qbd.invoices.update',
    'conductor.qbd.itemGroups.create',
    'conductor.qbd.itemGroups.list',
    'conductor.qbd.itemGroups.retrieve',
    'conductor.qbd.itemGroups.update',
    'conductor.qbd.itemReceipts.create',
    'conductor.qbd.itemReceipts.delete',
    'conductor.qbd.itemReceipts.list',
    'conductor.qbd.itemReceipts.retrieve',
    'conductor.qbd.itemReceipts.update',
    'conductor.qbd.itemSites.list',
    'conductor.qbd.itemSites.retrieve',
    'conductor.qbd.journalEntries.create',
    'conductor.qbd.journalEntries.delete',
    'conductor.qbd.journalEntries.list',
    'conductor.qbd.journalEntries.retrieve',
    'conductor.qbd.journalEntries.update',
    'conductor.qbd.nonInventoryItems.create',
    'conductor.qbd.nonInventoryItems.list',
    'conductor.qbd.nonInventoryItems.retrieve',
    'conductor.qbd.nonInventoryItems.update',
    'conductor.qbd.otherChargeItems.create',
    'conductor.qbd.otherChargeItems.list',
    'conductor.qbd.otherChargeItems.retrieve',
    'conductor.qbd.otherChargeItems.update',
    'conductor.qbd.otherNames.create',
    'conductor.qbd.otherNames.list',
    'conductor.qbd.otherNames.retrieve',
    'conductor.qbd.otherNames.update',
    'conductor.qbd.paymentMethods.create',
    'conductor.qbd.paymentMethods.list',
    'conductor.qbd.paymentMethods.retrieve',
    'conductor.qbd.payrollWageItems.create',
    'conductor.qbd.payrollWageItems.list',
    'conductor.qbd.payrollWageItems.retrieve',
    'conductor.qbd.preferences.retrieve',
    'conductor.qbd.priceLevels.create',
    'conductor.qbd.priceLevels.list',
    'conductor.qbd.priceLevels.retrieve',
    'conductor.qbd.priceLevels.update',
    'conductor.qbd.purchaseOrders.create',
    'conductor.qbd.purchaseOrders.delete',
    'conductor.qbd.purchaseOrders.list',
    'conductor.qbd.purchaseOrders.retrieve',
    'conductor.qbd.purchaseOrders.update',
    'conductor.qbd.receivePayments.create',
    'conductor.qbd.receivePayments.delete',
    'conductor.qbd.receivePayments.list',
    'conductor.qbd.receivePayments.retrieve',
    'conductor.qbd.receivePayments.update',
    'conductor.qbd.salesOrders.create',
    'conductor.qbd.salesOrders.delete',
    'conductor.qbd.salesOrders.list',
    'conductor.qbd.salesOrders.retrieve',
    'conductor.qbd.salesOrders.update',
    'conductor.qbd.salesReceipts.create',
    'conductor.qbd.salesReceipts.delete',
    'conductor.qbd.salesReceipts.list',
    'conductor.qbd.salesReceipts.retrieve',
    'conductor.qbd.salesReceipts.update',
    'conductor.qbd.salesRepresentatives.create',
    'conductor.qbd.salesRepresentatives.list',
    'conductor.qbd.salesRepresentatives.retrieve',
    'conductor.qbd.salesRepresentatives.update',
    'conductor.qbd.salesTaxCodes.create',
    'conductor.qbd.salesTaxCodes.list',
    'conductor.qbd.salesTaxCodes.retrieve',
    'conductor.qbd.salesTaxCodes.update',
    'conductor.qbd.salesTaxItems.create',
    'conductor.qbd.salesTaxItems.list',
    'conductor.qbd.salesTaxItems.retrieve',
    'conductor.qbd.salesTaxItems.update',
    'conductor.qbd.serviceItems.create',
    'conductor.qbd.serviceItems.list',
    'conductor.qbd.serviceItems.retrieve',
    'conductor.qbd.serviceItems.update',
    'conductor.qbd.standardTerms.create',
    'conductor.qbd.standardTerms.list',
    'conductor.qbd.standardTerms.retrieve',
    'conductor.qbd.subtotalItems.create',
    'conductor.qbd.subtotalItems.list',
    'conductor.qbd.subtotalItems.retrieve',
    'conductor.qbd.subtotalItems.update',
    'conductor.qbd.templates.list',
    'conductor.qbd.timeTrackingActivities.create',
    'conductor.qbd.timeTrackingActivities.delete',
    'conductor.qbd.timeTrackingActivities.list',
    'conductor.qbd.timeTrackingActivities.retrieve',
    'conductor.qbd.timeTrackingActivities.update',
    'conductor.qbd.transactions.list',
    'conductor.qbd.transactions.retrieve',
    'conductor.qbd.transfers.create',
    'conductor.qbd.transfers.list',
    'conductor.qbd.transfers.retrieve',
    'conductor.qbd.transfers.update',
    'conductor.qbd.unitOfMeasureSets.create',
    'conductor.qbd.unitOfMeasureSets.list',
    'conductor.qbd.unitOfMeasureSets.retrieve',
    'conductor.qbd.vendorCredits.create',
    'conductor.qbd.vendorCredits.delete',
    'conductor.qbd.vendorCredits.list',
    'conductor.qbd.vendorCredits.retrieve',
    'conductor.qbd.vendorCredits.update',
    'conductor.qbd.vendors.create',
    'conductor.qbd.vendors.list',
    'conductor.qbd.vendors.retrieve',
    'conductor.qbd.vendors.update',
  ],
  { threshold: 1, shouldSort: true },
);

function getMethodSuggestions(fullyQualifiedMethodName: string): string[] {
  return fuse
    .search(fullyQualifiedMethodName)
    .map(({ item }) => item)
    .slice(0, 5);
}

const proxyToObj = new WeakMap<any, any>();
const objToProxy = new WeakMap<any, any>();

type ClientProxyConfig = {
  path: string[];
  isBelievedBad?: boolean;
};

function makeSdkProxy<T extends object>(obj: T, { path, isBelievedBad = false }: ClientProxyConfig): T {
  let proxy: T = objToProxy.get(obj);

  if (!proxy) {
    proxy = new Proxy(obj, {
      get(target, prop, receiver) {
        const propPath = [...path, String(prop)];
        const value = Reflect.get(target, prop, receiver);

        if (isBelievedBad || (!(prop in target) && value === undefined)) {
          // If we're accessing a path that doesn't exist, it will probably eventually error.
          // Let's proxy it and mark it bad so that we can control the error message.
          // We proxy an empty class so that an invocation or construction attempt is possible.
          return makeSdkProxy(class {}, { path: propPath, isBelievedBad: true });
        }

        if (value !== null && (typeof value === 'object' || typeof value === 'function')) {
          return makeSdkProxy(value, { path: propPath, isBelievedBad });
        }

        return value;
      },

      apply(target, thisArg, args) {
        if (isBelievedBad || typeof target !== 'function') {
          const fullyQualifiedMethodName = path.join('.');
          const suggestions = getMethodSuggestions(fullyQualifiedMethodName);
          throw new Error(
            `${fullyQualifiedMethodName} is not a function. Did you mean: ${suggestions.join(', ')}`,
          );
        }

        return Reflect.apply(target, proxyToObj.get(thisArg) ?? thisArg, args);
      },

      construct(target, args, newTarget) {
        if (isBelievedBad || typeof target !== 'function') {
          const fullyQualifiedMethodName = path.join('.');
          const suggestions = getMethodSuggestions(fullyQualifiedMethodName);
          throw new Error(
            `${fullyQualifiedMethodName} is not a constructor. Did you mean: ${suggestions.join(', ')}`,
          );
        }

        return Reflect.construct(target, args, newTarget);
      },
    });

    objToProxy.set(obj, proxy);
    proxyToObj.set(proxy, obj);
  }

  return proxy;
}

function parseError(code: string, error: unknown): string | undefined {
  if (!(error instanceof Error)) return;
  const message = error.name ? `${error.name}: ${error.message}` : error.message;
  try {
    // Deno uses V8; the first "<anonymous>:LINE:COLUMN" is the top of stack.
    const lineNumber = error.stack?.match(/<anonymous>:([0-9]+):[0-9]+/)?.[1];
    // -1 for the zero-based indexing
    const line =
      lineNumber &&
      code
        .split('\n')
        .at(parseInt(lineNumber, 10) - 1)
        ?.trim();
    return line ? `${message}\n  at line ${lineNumber}\n    ${line}` : message;
  } catch {
    return message;
  }
}

const fetch = async (req: Request): Promise<Response> => {
  const { opts, code } = (await req.json()) as WorkerInput;
  if (code == null) {
    return Response.json(
      {
        message:
          'The code param is missing. Provide one containing a top-level `run` function. Write code within this template:\n\n```\nasync function run(conductor) {\n  // Fill this out\n}\n```',
        logLines: [],
        errLines: [],
      } satisfies WorkerError,
      { status: 400, statusText: 'Code execution error' },
    );
  }

  const runFunctionNode = getRunFunctionNode(code);
  if (!runFunctionNode) {
    return Response.json(
      {
        message:
          'The code is missing a top-level `run` function. Write code within this template:\n\n```\nasync function run(conductor) {\n  // Fill this out\n}\n```',
        logLines: [],
        errLines: [],
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
    eval(`${code}\nrun_ = run;`);
    const result = await run_(makeSdkProxy(conductor, { path: ['conductor'] }));
    return Response.json({
      result,
      logLines,
      errLines,
    } satisfies WorkerSuccess);
  } catch (e) {
    return Response.json(
      {
        message: parseError(code, e),
        logLines,
        errLines,
      } satisfies WorkerError,
      { status: 400, statusText: 'Code execution error' },
    );
  }
};

export default { fetch };
