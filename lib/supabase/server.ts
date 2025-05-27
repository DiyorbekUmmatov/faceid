export function createClient() {
  // Mock client qaytaramiz
  return {
    from: (table: string) => ({
      select: (columns?: string) => ({
        eq: (column: string, value: any) => ({
          single: () => Promise.resolve({ data: null, error: null }),
          maybeSingle: () => Promise.resolve({ data: null, error: null }),
          limit: (limit: number) => Promise.resolve({ data: [], error: null }),
          order: (column: string, { ascending }: { ascending: boolean }) => Promise.resolve({ data: [], error: null }),
        }),
        gte: (column: string, value: any) => ({
          lte: (column: string, value: any) => ({
            order: (column: string, { ascending }: { ascending: boolean }) =>
              Promise.resolve({ data: [], error: null }),
          }),
        }),
      }),
      insert: (data: any) => ({
        select: () => Promise.resolve({ data: null, error: null }),
        single: () => Promise.resolve({ data: null, error: null }),
      }),
      update: (data: any) => ({
        eq: (column: string, value: any) => ({
          select: () => Promise.resolve({ data: null, error: null }),
          single: () => Promise.resolve({ data: null, error: null }),
        }),
      }),
      delete: () => ({
        eq: (column: string, value: any) => Promise.resolve({ data: null, error: null }),
      }),
    }),
  }
}
