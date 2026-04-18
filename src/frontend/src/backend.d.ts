import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MenuItem {
    id: bigint;
    name: string;
    description: string;
    spiceLevel?: string;
    category: Category;
    price?: string;
}
export interface RestaurantInfo {
    hours: string;
    ratingCount: bigint;
    tagline: string;
    name: string;
    address: string;
    rating: number;
    phone: string;
    services: Array<string>;
}
export enum Category {
    bbq = "bbq",
    naan_roti = "naan_roti",
    fish = "fish",
    drinks = "drinks",
    karahi = "karahi"
}
export interface backendInterface {
    getMenuItems(): Promise<Array<MenuItem>>;
    getRestaurantInfo(): Promise<RestaurantInfo>;
}
