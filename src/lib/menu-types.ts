/**
 * Shared menu domain types.
 *
 * Extends the existing FoodCartV4Data.json shape with optional admin fields
 * (description, ingredients, sizes, tags, availability, sort order, etc.)
 * so the public menu and QR menu keep working without changes while the
 * admin panel can manage richer product/category data.
 */

export interface ProductSize {
    label: string;
    price: number;
}

export interface ProductAddon {
    label: string;
    price: number;
}

export interface Product {
    /** Numeric id unique within the parent category. */
    id: number;
    /** Filename inside /public/assets/img/food OR a full URL (e.g. /assets/img/food/uploads/xxx.jpg). */
    thumb: string;
    name: string;
    /** Legacy price (kept for backward compatibility with existing components). */
    price: number;
    /** Legacy "full" price (kept for backward compatibility). */
    priceFull: number;
    leftInfo: string;
    rightInfo: string;

    // ---- Admin-managed extensions (all optional, safe to omit) ----
    description?: string;
    ingredients?: string;
    /** Optional sale price displayed alongside the main price. */
    discountPrice?: number;
    /** Optional preparation time label, e.g. "5 min". */
    prepTime?: string;
    /** Optional list of size variants with their own prices. */
    sizes?: ProductSize[];
    /** Optional list of add-ons / extras. */
    addons?: ProductAddon[];
    /** Free-form tags like "hot", "cold", "new", "best-seller". */
    tags?: string[];
    /** Sort order inside the category (lower = first). */
    order?: number;
    /** Whether the product is available/visible on the public menu. */
    available?: boolean;
    /** Featured / popular flag for highlighting. */
    featured?: boolean;
    /** Creation timestamp (ISO string). */
    createdAt?: string;
    /** Last update timestamp (ISO string). */
    updatedAt?: string;
}

/**
 * The existing JSON uses a wrapper level (tabContent -> [{ id, tabData: Product[] }]).
 * We keep that exact shape so existing FoodMenuV* components keep working.
 */
export interface CategoryGroup {
    id: number;
    tabData: Product[];
}

export interface Category {
    id: number;
    tabTitle: string;
    /** Legacy class used by the public menu ("show active" for the default tab). */
    tabClass: string;
    /** Background image filename inside /public/assets/img/thumb (e.g. "coffe.png"). */
    tabThumb: string;
    discount: number;
    /** Bootstrap tab pane id, e.g. "tab1". */
    tabId: string;
    tabContent: CategoryGroup[];

    // ---- Admin-managed extensions (all optional) ----
    nameAr?: string;
    description?: string;
    /** Icon filename or URL (optional, currently unused by the public menu). */
    icon?: string;
    /** Sort order. */
    order?: number;
    /** Hidden categories are skipped in the public menu. */
    hidden?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export type Menu = Category[];

/** Convenience flat row used by the admin products table. */
export interface ProductRow extends Product {
    categoryId: number;
    categoryTitle: string;
}
