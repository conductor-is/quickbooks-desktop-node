// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import { CursorPage, type CursorPageParams } from '../../pagination';

export class CreditCardRefunds extends APIResource {
  /**
   * Creates a credit card refund linked to one or more existing credit transactions,
   * such as credit memos or overpayments. You must supply at least one entry in
   * `refundAppliedToTransactions`, and the refund amount cannot exceed the available
   * balance on the linked credits.
   *
   * @example
   * ```ts
   * const creditCardRefund =
   *   await conductor.qbd.creditCardRefunds.create({
   *     customerId: '80000001-1234567890',
   *     refundAppliedToTransactions: [
   *       {
   *         refundAmount: '15.00',
   *         transactionId: '123ABC-1234567890',
   *       },
   *     ],
   *     transactionDate: '2024-10-01',
   *     conductorEndUserId: 'end_usr_1234567abcdefg',
   *   });
   * ```
   */
  create(
    params: CreditCardRefundCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<CreditCardRefund> {
    const { conductorEndUserId, ...body } = params;
    return this._client.post('/quickbooks-desktop/credit-card-refunds', {
      body,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Retrieves a credit card refund by ID.
   *
   * @example
   * ```ts
   * const creditCardRefund =
   *   await conductor.qbd.creditCardRefunds.retrieve(
   *     '123ABC-1234567890',
   *     { conductorEndUserId: 'end_usr_1234567abcdefg' },
   *   );
   * ```
   */
  retrieve(
    id: string,
    params: CreditCardRefundRetrieveParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<CreditCardRefund> {
    const { conductorEndUserId } = params;
    return this._client.get(`/quickbooks-desktop/credit-card-refunds/${id}`, {
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Returns a list of credit card refunds. Use the `cursor` parameter to paginate
   * through the results.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const creditCardRefund of conductor.qbd.creditCardRefunds.list(
   *   { conductorEndUserId: 'end_usr_1234567abcdefg' },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    params: CreditCardRefundListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<CreditCardRefundsCursorPage, CreditCardRefund> {
    const { conductorEndUserId, ...query } = params;
    return this._client.getAPIList('/quickbooks-desktop/credit-card-refunds', CreditCardRefundsCursorPage, {
      query,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Permanently deletes a a credit card refund. The deletion will fail if the credit
   * card refund is currently in use or has any linked transactions that are in use.
   *
   * @example
   * ```ts
   * const creditCardRefund =
   *   await conductor.qbd.creditCardRefunds.delete(
   *     '123ABC-1234567890',
   *     { conductorEndUserId: 'end_usr_1234567abcdefg' },
   *   );
   * ```
   */
  delete(
    id: string,
    params: CreditCardRefundDeleteParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<CreditCardRefundDeleteResponse> {
    const { conductorEndUserId } = params;
    return this._client.delete(`/quickbooks-desktop/credit-card-refunds/${id}`, {
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }
}

export class CreditCardRefundsCursorPage extends CursorPage<CreditCardRefund> {}

export interface CreditCardRefund {
  /**
   * The unique identifier assigned by QuickBooks to this credit card refund. This ID
   * is unique across all transaction types.
   */
  id: string;

  /**
   * The address that is printed on the credit card refund.
   */
  address: CreditCardRefund.Address | null;

  /**
   * The date and time when this credit card refund was created, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the local
   * timezone of the end-user's computer.
   */
  createdAt: string;

  /**
   * The credit card transaction data for this credit card refund's payment when
   * using QuickBooks Merchant Services (QBMS).
   */
  creditCardTransaction: CreditCardRefund.CreditCardTransaction | null;

  /**
   * The credit card refund's currency. For built-in currencies, the name and code
   * are standard international values. For user-defined currencies, all values are
   * editable.
   */
  currency: CreditCardRefund.Currency | null;

  /**
   * The customer or customer-job associated with this credit card refund.
   */
  customer: CreditCardRefund.Customer;

  /**
   * The custom fields for the credit card refund object, added as user-defined data
   * extensions, not included in the standard QuickBooks object.
   */
  customFields: Array<CreditCardRefund.CustomField>;

  /**
   * The market exchange rate between this credit card refund's currency and the home
   * currency in QuickBooks at the time of this transaction. Represented as a decimal
   * value (e.g., 1.2345 for 1 EUR = 1.2345 USD if USD is the home currency).
   */
  exchangeRate: number | null;

  /**
   * A globally unique identifier (GUID) you, the developer, can provide for tracking
   * this object in your external system. This field is immutable and can only be set
   * during object creation.
   */
  externalId: string | null;

  /**
   * A memo or note for this credit card refund.
   */
  memo: string | null;

  /**
   * The type of object. This value is always `"qbd_credit_card_refund"`.
   */
  objectType: 'qbd_credit_card_refund';

  /**
   * The credit card refund's payment method (e.g., cash, check, credit card).
   */
  paymentMethod: CreditCardRefund.PaymentMethod | null;

  /**
   * The Accounts-Receivable (A/R) account to which this credit card refund is
   * assigned, used to track the amount owed. If not specified, QuickBooks Desktop
   * will use its default A/R account.
   *
   * **IMPORTANT**: If this credit card refund is linked to other transactions, this
   * A/R account must match the `receivablesAccount` used in all linked transactions.
   * For example, when refunding a credit card payment, the A/R account must match
   * the one used in each linked credit transaction being refunded.
   */
  receivablesAccount: CreditCardRefund.ReceivablesAccount | null;

  /**
   * The case-sensitive user-defined reference number for this credit card refund,
   * which can be used to identify the transaction in QuickBooks. This value is not
   * required to be unique and can be arbitrarily changed by the QuickBooks user.
   */
  refNumber: string | null;

  /**
   * The credit transactions refunded by this credit card refund.
   */
  refundAppliedToTransactions: Array<CreditCardRefund.RefundAppliedToTransaction>;

  /**
   * The account providing funds for this credit card refund. This is typically the
   * Undeposited Funds account used to hold customer payments.
   */
  refundFromAccount: CreditCardRefund.RefundFromAccount | null;

  /**
   * The current QuickBooks-assigned revision number of this credit card refund
   * object, which changes each time the object is modified. When updating this
   * object, you must provide the most recent `revisionNumber` to ensure you're
   * working with the latest data; otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * The total monetary amount of this credit card refund, represented as a decimal
   * string.
   */
  totalAmount: string;

  /**
   * The total monetary amount of this credit card refund converted to the home
   * currency of the QuickBooks company file. Represented as a decimal string.
   */
  totalAmountInHomeCurrency: string | null;

  /**
   * The date of this credit card refund, in ISO 8601 format (YYYY-MM-DD).
   */
  transactionDate: string;

  /**
   * The date and time when this credit card refund was last updated, in ISO 8601
   * format (YYYY-MM-DDThh:mm:ss±hh:mm), which QuickBooks Desktop interprets in the
   * local timezone of the end-user's computer.
   */
  updatedAt: string;
}

export namespace CreditCardRefund {
  /**
   * The address that is printed on the credit card refund.
   */
  export interface Address {
    /**
     * The city, district, suburb, town, or village name of the address.
     */
    city: string | null;

    /**
     * The country name of the address.
     */
    country: string | null;

    /**
     * The first line of the address (e.g., street, PO Box, or company name).
     */
    line1: string | null;

    /**
     * The second line of the address, if needed (e.g., apartment, suite, unit, or
     * building).
     */
    line2: string | null;

    /**
     * The third line of the address, if needed.
     */
    line3: string | null;

    /**
     * The fourth line of the address, if needed.
     */
    line4: string | null;

    /**
     * The fifth line of the address, if needed.
     */
    line5: string | null;

    /**
     * A note written at the bottom of the address in the form in which it appears,
     * such as the invoice form.
     */
    note: string | null;

    /**
     * The postal code or ZIP code of the address.
     */
    postalCode: string | null;

    /**
     * The state, county, province, or region name of the address.
     */
    state: string | null;
  }

  /**
   * The credit card transaction data for this credit card refund's payment when
   * using QuickBooks Merchant Services (QBMS).
   */
  export interface CreditCardTransaction {
    /**
     * The transaction request data originally supplied for this credit card
     * transaction when using QuickBooks Merchant Services (QBMS).
     */
    request: CreditCardTransaction.Request | null;

    /**
     * The transaction response data for this credit card transaction when using
     * QuickBooks Merchant Services (QBMS).
     */
    response: CreditCardTransaction.Response | null;
  }

  export namespace CreditCardTransaction {
    /**
     * The transaction request data originally supplied for this credit card
     * transaction when using QuickBooks Merchant Services (QBMS).
     */
    export interface Request {
      /**
       * The card's billing address.
       */
      address: string | null;

      /**
       * The commercial card code identifies the type of business credit card being used
       * (purchase, corporate, or business) for Visa and Mastercard transactions only.
       * When provided, this code may qualify the transaction for lower processing fees
       * compared to the standard rates that apply when no code is specified.
       */
      commercialCardCode: string | null;

      /**
       * The month when the credit card expires.
       */
      expirationMonth: number;

      /**
       * The year when the credit card expires.
       */
      expirationYear: number;

      /**
       * The cardholder's name on the card.
       */
      name: string | null;

      /**
       * The credit card number. Must be masked with lower case "x" and no dashes.
       */
      number: string;

      /**
       * The card's billing address ZIP or postal code.
       */
      postalCode: string | null;

      /**
       * Indicates whether this credit card transaction came from a card swipe
       * (`card_present`) or not (`card_not_present`).
       */
      transactionMode: 'card_not_present' | 'card_present' | null;

      /**
       * The QBMS transaction type from which the current transaction data originated.
       */
      transactionType: 'authorization' | 'capture' | 'charge' | 'refund' | 'voice_authorization' | null;
    }

    /**
     * The transaction response data for this credit card transaction when using
     * QuickBooks Merchant Services (QBMS).
     */
    export interface Response {
      /**
       * The authorization code returned from the credit card processor to indicate that
       * this charge will be paid by the card issuer.
       */
      authorizationCode: string | null;

      /**
       * Indicates whether the street address supplied in the transaction request matches
       * the customer's address on file at the card issuer.
       */
      avsStreetStatus: 'fail' | 'not_available' | 'pass' | null;

      /**
       * Indicates whether the customer postal ZIP code supplied in the transaction
       * request matches the customer's postal code recognized at the card issuer.
       */
      avsZipStatus: 'fail' | 'not_available' | 'pass' | null;

      /**
       * Indicates whether the card security code supplied in the transaction request
       * matches the card security code recognized for that credit card number at the
       * card issuer.
       */
      cardSecurityCodeMatch: 'fail' | 'not_available' | 'pass' | null;

      /**
       * A value returned from QBMS transactions for future use by the QuickBooks
       * Reconciliation feature.
       */
      clientTransactionId: string | null;

      /**
       * The ID returned from the credit card processor for this credit card transaction.
       */
      creditCardTransactionId: string;

      /**
       * The QBMS account number of the merchant who is running this transaction using
       * the customer's credit card.
       */
      merchantAccountNumber: string;

      /**
       * An internal code returned by QuickBooks Merchant Services (QBMS) from the
       * transaction request, needed for the QuickBooks reconciliation feature.
       */
      paymentGroupingCode: number | null;

      /**
       * Indicates whether this credit card transaction is known to have been
       * successfully processed by the card issuer.
       */
      paymentStatus: 'completed' | 'unknown';

      /**
       * An internal ID returned by QuickBooks Merchant Services (QBMS) from the
       * transaction request, needed for the QuickBooks reconciliation feature.
       */
      reconBatchId: string | null;

      /**
       * The status code returned in the original QBMS transaction response for this
       * credit card transaction.
       */
      statusCode: number;

      /**
       * The status message returned in the original QBMS transaction response for this
       * credit card transaction.
       */
      statusMessage: string;

      /**
       * An internal value for this credit card transaction, needed for the QuickBooks
       * reconciliation feature.
       */
      transactionAuthorizationStamp: number | null;

      /**
       * The date and time when the credit card processor authorized this credit card
       * transaction.
       */
      transactionAuthorizedAt: string;
    }
  }

  /**
   * The credit card refund's currency. For built-in currencies, the name and code
   * are standard international values. For user-defined currencies, all values are
   * editable.
   */
  export interface Currency {
    /**
     * The unique identifier assigned by QuickBooks to this object. This ID is unique
     * across all objects of the same type, but not across different QuickBooks object
     * types.
     */
    id: string | null;

    /**
     * The fully-qualified unique name for this object, formed by combining the names
     * of its parent objects with its own `name`, separated by colons. Not
     * case-sensitive.
     */
    fullName: string | null;
  }

  /**
   * The customer or customer-job associated with this credit card refund.
   */
  export interface Customer {
    /**
     * The unique identifier assigned by QuickBooks to this object. This ID is unique
     * across all objects of the same type, but not across different QuickBooks object
     * types.
     */
    id: string | null;

    /**
     * The fully-qualified unique name for this object, formed by combining the names
     * of its parent objects with its own `name`, separated by colons. Not
     * case-sensitive.
     */
    fullName: string | null;
  }

  export interface CustomField {
    /**
     * The name of the custom field, unique for the specified `ownerId`. For public
     * custom fields, this name is visible as a label in the QuickBooks UI.
     */
    name: string;

    /**
     * The identifier of the owner of the custom field, which QuickBooks internally
     * calls a "data extension". For public custom fields visible in the UI, such as
     * those added by the QuickBooks user, this is always "0". For private custom
     * fields that are only visible to the application that created them, this is a
     * valid GUID identifying the owning application. Internally, Conductor always
     * fetches all public custom fields (those with an `ownerId` of "0") for all
     * objects.
     */
    ownerId: string;

    /**
     * The data type of this custom field.
     */
    type:
      | 'amount_type'
      | 'date_time_type'
      | 'integer_type'
      | 'percent_type'
      | 'price_type'
      | 'quantity_type'
      | 'string_1024_type'
      | 'string_255_type';

    /**
     * The value of this custom field. The maximum length depends on the field's data
     * type.
     */
    value: string;
  }

  /**
   * The credit card refund's payment method (e.g., cash, check, credit card).
   */
  export interface PaymentMethod {
    /**
     * The unique identifier assigned by QuickBooks to this object. This ID is unique
     * across all objects of the same type, but not across different QuickBooks object
     * types.
     */
    id: string | null;

    /**
     * The fully-qualified unique name for this object, formed by combining the names
     * of its parent objects with its own `name`, separated by colons. Not
     * case-sensitive.
     */
    fullName: string | null;
  }

  /**
   * The Accounts-Receivable (A/R) account to which this credit card refund is
   * assigned, used to track the amount owed. If not specified, QuickBooks Desktop
   * will use its default A/R account.
   *
   * **IMPORTANT**: If this credit card refund is linked to other transactions, this
   * A/R account must match the `receivablesAccount` used in all linked transactions.
   * For example, when refunding a credit card payment, the A/R account must match
   * the one used in each linked credit transaction being refunded.
   */
  export interface ReceivablesAccount {
    /**
     * The unique identifier assigned by QuickBooks to this object. This ID is unique
     * across all objects of the same type, but not across different QuickBooks object
     * types.
     */
    id: string | null;

    /**
     * The fully-qualified unique name for this object, formed by combining the names
     * of its parent objects with its own `name`, separated by colons. Not
     * case-sensitive.
     */
    fullName: string | null;
  }

  export interface RefundAppliedToTransaction {
    /**
     * The remaining balance of this credit transaction that has not yet been applied
     * to other transactions or refunded to the customer. Represented as a decimal
     * string.
     */
    creditRemaining: string | null;

    /**
     * The remaining balance of this credit transaction converted to the home currency
     * of the QuickBooks company file. Represented as a decimal string.
     */
    creditRemainingInHomeCurrency: string | null;

    /**
     * The case-sensitive user-defined reference number for this credit transaction,
     * which can be used to identify the transaction in QuickBooks. This value is not
     * required to be unique and can be arbitrarily changed by the QuickBooks user.
     */
    refNumber: string | null;

    /**
     * The monetary amount to refund from the linked credit transaction within this
     * credit transaction, represented as a decimal string.
     */
    refundAmount: string;

    /**
     * The monetary amount to refund from the linked credit transaction in this credit
     * transaction, converted to the home currency of the QuickBooks company file.
     * Represented as a decimal string.
     */
    refundAmountInHomeCurrency: string | null;

    /**
     * The date of this credit transaction, in ISO 8601 format (YYYY-MM-DD).
     */
    transactionDate: string | null;

    /**
     * The ID of the credit transaction being refunded by this credit card refund.
     */
    transactionId: string;

    /**
     * The type of transaction for this credit transaction.
     */
    transactionType:
      | 'ar_refund_credit_card'
      | 'bill'
      | 'bill_payment_check'
      | 'bill_payment_credit_card'
      | 'build_assembly'
      | 'charge'
      | 'check'
      | 'credit_card_charge'
      | 'credit_card_credit'
      | 'credit_memo'
      | 'deposit'
      | 'estimate'
      | 'inventory_adjustment'
      | 'invoice'
      | 'item_receipt'
      | 'journal_entry'
      | 'liability_adjustment'
      | 'paycheck'
      | 'payroll_liability_check'
      | 'purchase_order'
      | 'receive_payment'
      | 'sales_order'
      | 'sales_receipt'
      | 'sales_tax_payment_check'
      | 'transfer'
      | 'vendor_credit'
      | 'ytd_adjustment';
  }

  /**
   * The account providing funds for this credit card refund. This is typically the
   * Undeposited Funds account used to hold customer payments.
   */
  export interface RefundFromAccount {
    /**
     * The unique identifier assigned by QuickBooks to this object. This ID is unique
     * across all objects of the same type, but not across different QuickBooks object
     * types.
     */
    id: string | null;

    /**
     * The fully-qualified unique name for this object, formed by combining the names
     * of its parent objects with its own `name`, separated by colons. Not
     * case-sensitive.
     */
    fullName: string | null;
  }
}

export interface CreditCardRefundDeleteResponse {
  /**
   * The QuickBooks-assigned unique identifier of the deleted credit card refund.
   */
  id: string;

  /**
   * Indicates whether the credit card refund was deleted.
   */
  deleted: boolean;

  /**
   * The type of object. This value is always `"qbd_credit_card_refund"`.
   */
  objectType: 'qbd_credit_card_refund';

  /**
   * The case-sensitive user-defined reference number of the deleted credit card
   * refund.
   */
  refNumber: string | null;
}

export interface CreditCardRefundCreateParams {
  /**
   * Body param: The customer or customer-job associated with this credit card
   * refund.
   */
  customerId: string;

  /**
   * Body param: The credit transactions to refund in this credit card refund. Each
   * entry links this credit card refund to an existing credit (for example, a credit
   * memo or unused receive-payment credit).
   *
   * **IMPORTANT**: The `refundAmount` for each linked credit cannot exceed that
   * credit's remaining balance, and the combined `refundAmount` across all links
   * cannot exceed this credit card refund's `totalAmount`.
   */
  refundAppliedToTransactions: Array<CreditCardRefundCreateParams.RefundAppliedToTransaction>;

  /**
   * Body param: The date of this credit card refund, in ISO 8601 format
   * (YYYY-MM-DD).
   */
  transactionDate: string;

  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;

  /**
   * Body param: The address that is printed on the credit card refund.
   */
  address?: CreditCardRefundCreateParams.Address;

  /**
   * Body param: The credit card transaction data for this credit card refund's
   * payment when using QuickBooks Merchant Services (QBMS). If specifying this
   * field, you must also specify the `paymentMethod` field.
   */
  creditCardTransaction?: CreditCardRefundCreateParams.CreditCardTransaction;

  /**
   * Body param: The market exchange rate between this credit card refund's currency
   * and the home currency in QuickBooks at the time of this transaction. Represented
   * as a decimal value (e.g., 1.2345 for 1 EUR = 1.2345 USD if USD is the home
   * currency).
   */
  exchangeRate?: number;

  /**
   * Body param: A globally unique identifier (GUID) you, the developer, can provide
   * for tracking this object in your external system. This field is immutable and
   * can only be set during object creation.
   *
   * **IMPORTANT**: This field must be formatted as a valid GUID; otherwise,
   * QuickBooks will return an error.
   */
  externalId?: string;

  /**
   * Body param: A memo or note for this credit card refund.
   */
  memo?: string;

  /**
   * Body param: The credit card refund's payment method (e.g., cash, check, credit
   * card).
   *
   * **NOTE**: If this credit card refund contains credit card transaction data
   * supplied from QuickBooks Merchant Services (QBMS) transaction responses, you
   * must specify a credit card payment method (e.g., "Visa", "MasterCard", etc.).
   */
  paymentMethodId?: string;

  /**
   * Body param: The Accounts-Receivable (A/R) account to which this credit card
   * refund is assigned, used to track the amount owed. If not specified, QuickBooks
   * Desktop will use its default A/R account.
   *
   * **IMPORTANT**: If this credit card refund is linked to other transactions, this
   * A/R account must match the `receivablesAccount` used in all linked transactions.
   * For example, when refunding a credit card payment, the A/R account must match
   * the one used in each linked credit transaction being refunded.
   */
  receivablesAccountId?: string;

  /**
   * Body param: The case-sensitive user-defined reference number for this credit
   * card refund, which can be used to identify the transaction in QuickBooks. This
   * value is not required to be unique and can be arbitrarily changed by the
   * QuickBooks user. When left blank in this create request, this field will be left
   * blank in QuickBooks (i.e., it does _not_ auto-increment).
   */
  refNumber?: string;

  /**
   * Body param: The account providing funds for this credit card refund. This is
   * typically the Undeposited Funds account used to hold customer payments. If
   * omitted, QuickBooks Desktop will use the default Undeposited Funds account.
   */
  refundFromAccountId?: string;
}

export namespace CreditCardRefundCreateParams {
  export interface RefundAppliedToTransaction {
    /**
     * The monetary amount to refund from the linked credit transaction within this
     * credit transaction, represented as a decimal string.
     */
    refundAmount: string;

    /**
     * The ID of the credit transaction being refunded by this credit card refund.
     */
    transactionId: string;
  }

  /**
   * The address that is printed on the credit card refund.
   */
  export interface Address {
    /**
     * The city, district, suburb, town, or village name of the address.
     *
     * Maximum length: 31 characters.
     */
    city?: string;

    /**
     * The country name of the address.
     */
    country?: string;

    /**
     * The first line of the address (e.g., street, PO Box, or company name).
     *
     * Maximum length: 41 characters.
     */
    line1?: string;

    /**
     * The second line of the address, if needed (e.g., apartment, suite, unit, or
     * building).
     *
     * Maximum length: 41 characters.
     */
    line2?: string;

    /**
     * The third line of the address, if needed.
     *
     * Maximum length: 41 characters.
     */
    line3?: string;

    /**
     * The fourth line of the address, if needed.
     *
     * Maximum length: 41 characters.
     */
    line4?: string;

    /**
     * The fifth line of the address, if needed.
     *
     * Maximum length: 41 characters.
     */
    line5?: string;

    /**
     * A note written at the bottom of the address in the form in which it appears,
     * such as the invoice form.
     */
    note?: string;

    /**
     * The postal code or ZIP code of the address.
     *
     * Maximum length: 13 characters.
     */
    postalCode?: string;

    /**
     * The state, county, province, or region name of the address.
     *
     * Maximum length: 21 characters.
     */
    state?: string;
  }

  /**
   * The credit card transaction data for this credit card refund's payment when
   * using QuickBooks Merchant Services (QBMS). If specifying this field, you must
   * also specify the `paymentMethod` field.
   */
  export interface CreditCardTransaction {
    /**
     * The transaction request data originally supplied for this credit card
     * transaction when using QuickBooks Merchant Services (QBMS).
     */
    request?: CreditCardTransaction.Request;

    /**
     * The transaction response data for this credit card transaction when using
     * QuickBooks Merchant Services (QBMS).
     */
    response?: CreditCardTransaction.Response;
  }

  export namespace CreditCardTransaction {
    /**
     * The transaction request data originally supplied for this credit card
     * transaction when using QuickBooks Merchant Services (QBMS).
     */
    export interface Request {
      /**
       * The month when the credit card expires.
       */
      expirationMonth: number;

      /**
       * The year when the credit card expires.
       */
      expirationYear: number;

      /**
       * The cardholder's name on the card.
       */
      name: string;

      /**
       * The credit card number. Must be masked with lower case "x" and no dashes.
       */
      number: string;

      /**
       * The card's billing address.
       */
      address?: string;

      /**
       * The commercial card code identifies the type of business credit card being used
       * (purchase, corporate, or business) for Visa and Mastercard transactions only.
       * When provided, this code may qualify the transaction for lower processing fees
       * compared to the standard rates that apply when no code is specified.
       */
      commercialCardCode?: string;

      /**
       * The card's billing address ZIP or postal code.
       */
      postalCode?: string;

      /**
       * Indicates whether this credit card transaction came from a card swipe
       * (`card_present`) or not (`card_not_present`).
       */
      transactionMode?: 'card_not_present' | 'card_present';

      /**
       * The QBMS transaction type from which the current transaction data originated.
       */
      transactionType?: 'authorization' | 'capture' | 'charge' | 'refund' | 'voice_authorization';
    }

    /**
     * The transaction response data for this credit card transaction when using
     * QuickBooks Merchant Services (QBMS).
     */
    export interface Response {
      /**
       * The ID returned from the credit card processor for this credit card transaction.
       */
      creditCardTransactionId: string;

      /**
       * The QBMS account number of the merchant who is running this transaction using
       * the customer's credit card.
       */
      merchantAccountNumber: string;

      /**
       * Indicates whether this credit card transaction is known to have been
       * successfully processed by the card issuer.
       */
      paymentStatus: 'completed' | 'unknown';

      /**
       * The status code returned in the original QBMS transaction response for this
       * credit card transaction.
       */
      statusCode: number;

      /**
       * The status message returned in the original QBMS transaction response for this
       * credit card transaction.
       */
      statusMessage: string;

      /**
       * The date and time when the credit card processor authorized this credit card
       * transaction.
       */
      transactionAuthorizedAt: string;

      /**
       * The authorization code returned from the credit card processor to indicate that
       * this charge will be paid by the card issuer.
       */
      authorizationCode?: string;

      /**
       * Indicates whether the street address supplied in the transaction request matches
       * the customer's address on file at the card issuer.
       */
      avsStreetStatus?: 'fail' | 'not_available' | 'pass';

      /**
       * Indicates whether the customer postal ZIP code supplied in the transaction
       * request matches the customer's postal code recognized at the card issuer.
       */
      avsZipStatus?: 'fail' | 'not_available' | 'pass';

      /**
       * Indicates whether the card security code supplied in the transaction request
       * matches the card security code recognized for that credit card number at the
       * card issuer.
       */
      cardSecurityCodeMatch?: 'fail' | 'not_available' | 'pass';

      /**
       * A value returned from QBMS transactions for future use by the QuickBooks
       * Reconciliation feature.
       */
      clientTransactionId?: string;

      /**
       * An internal code returned by QuickBooks Merchant Services (QBMS) from the
       * transaction request, needed for the QuickBooks reconciliation feature.
       */
      paymentGroupingCode?: number;

      /**
       * An internal ID returned by QuickBooks Merchant Services (QBMS) from the
       * transaction request, needed for the QuickBooks reconciliation feature.
       */
      reconBatchId?: string;

      /**
       * An internal value for this credit card transaction, needed for the QuickBooks
       * reconciliation feature.
       */
      transactionAuthorizationStamp?: number;
    }
  }
}

export interface CreditCardRefundRetrieveParams {
  /**
   * The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;
}

export interface CreditCardRefundListParams extends CursorPageParams {
  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;

  /**
   * Query param: Filter for credit card refunds associated with these accounts.
   */
  accountIds?: Array<string>;

  /**
   * Query param: Filter for credit card refunds in these currencies.
   */
  currencyIds?: Array<string>;

  /**
   * Query param: Filter for credit card refunds refunded to these customers.
   */
  customerIds?: Array<string>;

  /**
   * Query param: Filter for specific credit card refunds by their
   * QuickBooks-assigned unique identifier(s).
   *
   * **IMPORTANT**: If you include this parameter, QuickBooks will ignore all other
   * query parameters for this request.
   *
   * **NOTE**: If any of the values you specify in this parameter are not found, the
   * request will return an error.
   */
  ids?: Array<string>;

  /**
   * Query param: Whether to include line items in the response. Defaults to `true`.
   */
  includeLineItems?: boolean;

  /**
   * Query param: Filter for credit card refunds whose `refNumber` contains this
   * substring.
   *
   * **NOTE**: If you use this parameter, you cannot also use `refNumberStartsWith`
   * or `refNumberEndsWith`.
   */
  refNumberContains?: string;

  /**
   * Query param: Filter for credit card refunds whose `refNumber` ends with this
   * substring.
   *
   * **NOTE**: If you use this parameter, you cannot also use `refNumberContains` or
   * `refNumberStartsWith`.
   */
  refNumberEndsWith?: string;

  /**
   * Query param: Filter for credit card refunds whose `refNumber` is greater than or
   * equal to this value. If omitted, the range will begin with the first number of
   * the list. Uses a numerical comparison for values that contain only digits;
   * otherwise, uses a lexicographical comparison.
   */
  refNumberFrom?: string;

  /**
   * Query param: Filter for specific credit card refunds by their ref-number(s),
   * case-sensitive. In QuickBooks, ref-numbers are not required to be unique and can
   * be arbitrarily changed by the QuickBooks user.
   *
   * **IMPORTANT**: If you include this parameter, QuickBooks will ignore all other
   * query parameters for this request.
   *
   * **NOTE**: If any of the values you specify in this parameter are not found, the
   * request will return an error.
   */
  refNumbers?: Array<string>;

  /**
   * Query param: Filter for credit card refunds whose `refNumber` starts with this
   * substring.
   *
   * **NOTE**: If you use this parameter, you cannot also use `refNumberContains` or
   * `refNumberEndsWith`.
   */
  refNumberStartsWith?: string;

  /**
   * Query param: Filter for credit card refunds whose `refNumber` is less than or
   * equal to this value. If omitted, the range will end with the last number of the
   * list. Uses a numerical comparison for values that contain only digits;
   * otherwise, uses a lexicographical comparison.
   */
  refNumberTo?: string;

  /**
   * Query param: Filter for credit card refunds whose `date` field is on or after
   * this date, in ISO 8601 format (YYYY-MM-DD).
   *
   * **NOTE:** QuickBooks Desktop interprets this date as the **start of the
   * specified day** in the local timezone of the end-user's computer (e.g.,
   * `2025-01-01` → `2025-01-01T00:00:00`).
   */
  transactionDateFrom?: string;

  /**
   * Query param: Filter for credit card refunds whose `date` field is on or before
   * this date, in ISO 8601 format (YYYY-MM-DD).
   *
   * **NOTE:** QuickBooks Desktop interprets this date as the **end of the specified
   * day** in the local timezone of the end-user's computer (e.g., `2025-01-01` →
   * `2025-01-01T23:59:59`).
   */
  transactionDateTo?: string;

  /**
   * Query param: Filter for credit card refunds updated on or after this date/time.
   * Accepts the following ISO 8601 formats:
   *
   * - **date-only** (YYYY-MM-DD) - QuickBooks Desktop interprets the date as the
   *   **start of the specified day** in the local timezone of the end-user's
   *   computer (e.g., `2025-01-01` → `2025-01-01T00:00:00`).
   * - **datetime without timezone** (YYYY-MM-DDTHH:mm:ss) - QuickBooks Desktop
   *   interprets the timestamp in the local timezone of the end-user's computer.
   * - **datetime with timezone** (YYYY-MM-DDTHH:mm:ss±HH:mm) - QuickBooks Desktop
   *   interprets the timestamp using the specified timezone.
   */
  updatedAfter?: string;

  /**
   * Query param: Filter for credit card refunds updated on or before this date/time.
   * Accepts the following ISO 8601 formats:
   *
   * - **date-only** (YYYY-MM-DD) - QuickBooks Desktop interprets the date as the
   *   **end of the specified day** in the local timezone of the end-user's computer
   *   (e.g., `2025-01-01` → `2025-01-01T23:59:59`).
   * - **datetime without timezone** (YYYY-MM-DDTHH:mm:ss) - QuickBooks Desktop
   *   interprets the timestamp in the local timezone of the end-user's computer.
   * - **datetime with timezone** (YYYY-MM-DDTHH:mm:ss±HH:mm) - QuickBooks Desktop
   *   interprets the timestamp using the specified timezone.
   */
  updatedBefore?: string;
}

export interface CreditCardRefundDeleteParams {
  /**
   * The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;
}

CreditCardRefunds.CreditCardRefundsCursorPage = CreditCardRefundsCursorPage;

export declare namespace CreditCardRefunds {
  export {
    type CreditCardRefund as CreditCardRefund,
    type CreditCardRefundDeleteResponse as CreditCardRefundDeleteResponse,
    CreditCardRefundsCursorPage as CreditCardRefundsCursorPage,
    type CreditCardRefundCreateParams as CreditCardRefundCreateParams,
    type CreditCardRefundRetrieveParams as CreditCardRefundRetrieveParams,
    type CreditCardRefundListParams as CreditCardRefundListParams,
    type CreditCardRefundDeleteParams as CreditCardRefundDeleteParams,
  };
}
