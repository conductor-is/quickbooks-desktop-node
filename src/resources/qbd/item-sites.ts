// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import { CursorPage, type CursorPageParams } from '../../pagination';

export class ItemSites extends APIResource {
  /**
   * Retrieves an item site by ID.
   *
   * @example
   * ```ts
   * const itemSite = await conductor.qbd.itemSites.retrieve(
   *   '80000001-1234567890',
   *   { conductorEndUserId: 'end_usr_1234567abcdefg' },
   * );
   * ```
   */
  retrieve(
    id: string,
    params: ItemSiteRetrieveParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ItemSite> {
    const { conductorEndUserId } = params;
    return this._client.get(`/quickbooks-desktop/item-sites/${id}`, {
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }

  /**
   * Returns a list of item sites. Use the `cursor` parameter to paginate through the
   * results.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const itemSite of conductor.qbd.itemSites.list({
   *   conductorEndUserId: 'end_usr_1234567abcdefg',
   * })) {
   *   // ...
   * }
   * ```
   */
  list(
    params: ItemSiteListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<ItemSitesCursorPage, ItemSite> {
    const { conductorEndUserId, ...query } = params;
    return this._client.getAPIList('/quickbooks-desktop/item-sites', ItemSitesCursorPage, {
      query,
      ...options,
      headers: { 'Conductor-End-User-Id': conductorEndUserId, ...options?.headers },
    });
  }
}

export class ItemSitesCursorPage extends CursorPage<ItemSite> {}

export interface ItemSite {
  /**
   * The unique identifier assigned by QuickBooks to this item site. This ID is
   * unique across all item sites but not across different QuickBooks object types.
   */
  id: string;

  /**
   * The inventory level of this item site at which a new build assembly should
   * begin. When the combined `quantityOnHand` and `quantityOnPurchaseOrders` drops
   * below this point, QuickBooks flags the need to build additional units.
   */
  assemblyBuildPoint: number | null;

  /**
   * The date and time when this item site was created, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm). The time zone is the same as the user's time zone
   * in QuickBooks.
   */
  createdAt: string;

  /**
   * The inventory assembly item associated with this item site. An inventory
   * assembly item is assembled or manufactured from other inventory items, and the
   * items and/or assemblies that make up the assembly are called components.
   */
  inventoryAssemblyItem: ItemSite.InventoryAssemblyItem | null;

  /**
   * The inventory item associated with this item site.
   */
  inventoryItem: ItemSite.InventoryItem | null;

  /**
   * The site location where inventory for the item associated with this item site is
   * stored.
   */
  inventorySite: ItemSite.InventorySite | null;

  /**
   * The specific location (e.g., bin or shelf) within the inventory site where the
   * item associated with this item site is stored.
   */
  inventorySiteLocation: ItemSite.InventorySiteLocation | null;

  /**
   * The type of object. This value is always `"qbd_item_site"`.
   */
  objectType: 'qbd_item_site';

  /**
   * The number of units of this item site currently in inventory.
   */
  quantityOnHand: number | null;

  /**
   * The number of units of this item site that are currently on pending inventory
   * transfer transactions.
   */
  quantityOnPendingTransfers: number | null;

  /**
   * The number of units of this item site that are currently listed on outstanding
   * purchase orders and have not yet been received.
   */
  quantityOnPurchaseOrders: number | null;

  /**
   * The number of units of this item site that are currently listed on outstanding
   * sales orders and have not yet been fulfilled or delivered to customers.
   */
  quantityOnSalesOrders: number | null;

  /**
   * The number of units of this item site required by pending build transactions.
   */
  quantityRequiredByPendingBuildTransactions: number | null;

  /**
   * The number of units of this item site that are scheduled to be built on pending
   * build transactions.
   */
  quantityToBeBuiltByPendingBuildTransactions: number | null;

  /**
   * The inventory level at which QuickBooks prompts you to reorder this item site.
   */
  reorderLevel: number | null;

  /**
   * The current QuickBooks-assigned revision number of this item site object, which
   * changes each time the object is modified. When updating this object, you must
   * provide the most recent `revisionNumber` to ensure you're working with the
   * latest data; otherwise, the update will return an error.
   */
  revisionNumber: string;

  /**
   * The date and time when this item site was last updated, in ISO 8601 format
   * (YYYY-MM-DDThh:mm:ss±hh:mm). The time zone is the same as the user's time zone
   * in QuickBooks.
   */
  updatedAt: string;
}

export namespace ItemSite {
  /**
   * The inventory assembly item associated with this item site. An inventory
   * assembly item is assembled or manufactured from other inventory items, and the
   * items and/or assemblies that make up the assembly are called components.
   */
  export interface InventoryAssemblyItem {
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
   * The inventory item associated with this item site.
   */
  export interface InventoryItem {
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
   * The site location where inventory for the item associated with this item site is
   * stored.
   */
  export interface InventorySite {
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
   * The specific location (e.g., bin or shelf) within the inventory site where the
   * item associated with this item site is stored.
   */
  export interface InventorySiteLocation {
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

export interface ItemSiteRetrieveParams {
  /**
   * The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;
}

export interface ItemSiteListParams extends CursorPageParams {
  /**
   * Header param: The ID of the EndUser to receive this request (e.g.,
   * `"Conductor-End-User-Id: {{END_USER_ID}}"`).
   */
  conductorEndUserId: string;

  /**
   * Query param: Filter for specific item sites by their QuickBooks-assigned unique
   * identifier(s).
   *
   * **IMPORTANT**: If you include this parameter, QuickBooks will ignore all other
   * query parameters for this request.
   *
   * **NOTE**: If any of the values you specify in this parameter are not found, the
   * request will return an error.
   */
  ids?: Array<string>;

  /**
   * Query param: Filter for item sites for these items.
   */
  itemIds?: Array<string>;

  /**
   * Query param: Filter for item sites that match this item type.
   */
  itemType?:
    | 'all_except_fixed_asset'
    | 'assembly'
    | 'discount'
    | 'fixed_asset'
    | 'inventory'
    | 'inventory_and_assembly'
    | 'non_inventory'
    | 'other_charge'
    | 'payment'
    | 'sales'
    | 'sales_tax'
    | 'service';

  /**
   * Query param: Filter for item sites at these sites. A site represents a physical
   * location, such as a warehouse or store.
   */
  siteIds?: Array<string>;

  /**
   * Query param: Filter for item sites that are active, inactive, or both.
   */
  status?: 'active' | 'all' | 'inactive';
}

ItemSites.ItemSitesCursorPage = ItemSitesCursorPage;

export declare namespace ItemSites {
  export {
    type ItemSite as ItemSite,
    ItemSitesCursorPage as ItemSitesCursorPage,
    type ItemSiteRetrieveParams as ItemSiteRetrieveParams,
    type ItemSiteListParams as ItemSiteListParams,
  };
}
