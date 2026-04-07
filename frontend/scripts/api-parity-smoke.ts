/**
 * Phase-2 parity smoke script.
 *
 * Usage:
 * OLD_API_BASE=http://localhost:5000 NEW_API_BASE=http://localhost:3000 bun run scripts/api-parity-smoke.ts
 */

type SmokeCase = {
  name: string;
  path: string;
  method: "GET" | "POST";
  body?: unknown;
};

const OLD_API_BASE = process.env.OLD_API_BASE;
const NEW_API_BASE = process.env.NEW_API_BASE;

if (OLD_API_BASE === undefined || NEW_API_BASE === undefined) {
  throw new Error("OLD_API_BASE and NEW_API_BASE are required");
}

const smokeCases: SmokeCase[] = [
  {
    name: "health",
    path: "/health",
    method: "GET",
  },
  {
    name: "chatbots-list",
    path: "/api/v1/chatbots",
    method: "GET",
  },
];

const run = async () => {
  for (const smokeCase of smokeCases) {
    const [oldResponse, newResponse] = await Promise.all([
      fetch(`${OLD_API_BASE}${smokeCase.path}`, {
        method: smokeCase.method,
        headers: {
          "content-type": "application/json",
        },
        body: smokeCase.body ? JSON.stringify(smokeCase.body) : undefined,
      }),
      fetch(`${NEW_API_BASE}${smokeCase.path}`, {
        method: smokeCase.method,
        headers: {
          "content-type": "application/json",
        },
        body: smokeCase.body ? JSON.stringify(smokeCase.body) : undefined,
      }),
    ]);

    const oldText = await oldResponse.text();
    const newText = await newResponse.text();

    let oldJson: unknown = null;
    let newJson: unknown = null;

    try {
      oldJson = JSON.parse(oldText);
    } catch {
      oldJson = oldText;
    }

    try {
      newJson = JSON.parse(newText);
    } catch {
      newJson = newText;
    }

    const oldKeys =
      oldJson && typeof oldJson === "object"
        ? Object.keys(oldJson as Record<string, unknown>).sort()
        : [];
    const newKeys =
      newJson && typeof newJson === "object"
        ? Object.keys(newJson as Record<string, unknown>).sort()
        : [];

    console.log(`\n[${smokeCase.name}]`);
    console.log(
      `old status=${oldResponse.status}, new status=${newResponse.status}`
    );
    console.log(
      `old keys=${JSON.stringify(oldKeys)}, new keys=${JSON.stringify(newKeys)}`
    );
  }
};

void run();
