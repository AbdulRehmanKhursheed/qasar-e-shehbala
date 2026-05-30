interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

// Server Component by design — JSON-LD must be in the initial HTML, never client-injected.
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
