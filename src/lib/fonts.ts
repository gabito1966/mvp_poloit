import {Inter} from "next/font/google"
import {Roboto} from "next/font/google"

export const inter = Inter({
    subsets: ['latin'],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    style: ["normal"],
  });
export const roboto = Roboto({
    subsets: ['latin'],
    weight: ["100", "300", "400", "500", "700", "900"],
    style: ["normal", "italic"],
  });