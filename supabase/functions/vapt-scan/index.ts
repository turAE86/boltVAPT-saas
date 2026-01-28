import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ScanRequest {
  url: string;
}

interface Vulnerability {
  title: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
  description: string;
  recommendation: string;
  cveId?: string;
}

async function simulateScan(url: string): Promise<Vulnerability[]> {
  const vulnerabilities: Vulnerability[] = [];

  const checks = [
    {
      name: url.startsWith("https://") ? null : "Unencrypted Connection",
      severity: "high" as const,
      description: "URL does not use HTTPS encryption",
      recommendation: "Implement SSL/TLS certificate and enforce HTTPS",
    },
    {
      name: "Missing Security Headers",
      severity: "medium" as const,
      description: "Common security headers are not present",
      recommendation: "Add X-Frame-Options, X-Content-Type-Options, CSP headers",
    },
    {
      name: "Outdated Dependencies",
      severity: "medium" as const,
      description: "Potential outdated libraries detected",
      recommendation: "Update all dependencies to latest secure versions",
    },
    {
      name: "CORS Configuration",
      severity: "low" as const,
      description: "CORS may be overly permissive",
      recommendation: "Restrict CORS to specific trusted domains",
    },
  ];

  checks.forEach((check) => {
    if (check.name && Math.random() > 0.3) {
      vulnerabilities.push({
        title: check.name,
        severity: check.severity,
        description: check.description,
        recommendation: check.recommendation,
      });
    }
  });

  return vulnerabilities;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { url }: ScanRequest = await req.json();

    if (!url) {
      return new Response(
        JSON.stringify({ error: "URL is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const vulnerabilities = await simulateScan(url);

    const severityCounts = {
      critical: vulnerabilities.filter((v) => v.severity === "critical").length,
      high: vulnerabilities.filter((v) => v.severity === "high").length,
      medium: vulnerabilities.filter((v) => v.severity === "medium").length,
      low: vulnerabilities.filter((v) => v.severity === "low").length,
      info: vulnerabilities.filter((v) => v.severity === "info").length,
    };

    const response = {
      url,
      vulnerabilities,
      severityCounts,
      totalVulnerabilities: vulnerabilities.length,
      scanTime: new Date().toISOString(),
    };

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Scan failed",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
