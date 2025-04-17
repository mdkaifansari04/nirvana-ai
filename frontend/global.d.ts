interface Window {
  Clerk?: {
    session?: {
      getToken: (options: { template: string }) => Promise<string>;
    };
    addListener?: (event: string, callback: () => void) => void;
  };
}

// Ensure this file is included in the TypeScript compilation by adding it to the 'include' array in your tsconfig.json if necessary.
