type ClassValue = string | number | null | undefined | false | ClassValue[] | { [className: string]: boolean | null | undefined };

function flatten(values: ClassValue[]): (string | number)[] {
  const result: (string | number)[] = [];
  for (const value of values) {
    if (!value) continue;
    if (Array.isArray(value)) {
      result.push(...flatten(value));
    } else if (typeof value === "object") {
      for (const key of Object.keys(value)) {
        const enabled = (value as Record<string, unknown>)[key];
        if (enabled) result.push(key);
      }
    } else {
      result.push(value);
    }
  }
  return result;
}

export function cn(...inputs: ClassValue[]): string {
  return flatten(inputs)
    .filter((v) => typeof v === "string" || typeof v === "number")
    .map((v) => String(v))
    .join(" ")
    .trim()
    .replace(/\s+/g, " ");
}


