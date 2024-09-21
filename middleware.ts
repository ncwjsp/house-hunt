export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/home",
    "/for-sale",
    "/for-rent",
    "/listings",
    "/messages",
    "/profile",
  ],
};
