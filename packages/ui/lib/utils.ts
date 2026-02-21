import { type ClassValue, clsx } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["10", "12", "14", "16", "18", "20", "24", "30"] },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
