import { revalidatePath } from "next/cache";

/** Invalidate cached pages that display the live menu after admin mutations. */
export function revalidateMenuPages(): void {
    revalidatePath("/food-menu");
    revalidatePath("/food-menu-2");
    revalidatePath("/food-menu-2-dark");
    revalidatePath("/");
    revalidatePath("/home-5");
    revalidatePath("/home-5-dark");
}
