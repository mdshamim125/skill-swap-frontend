"use client";

import Link from "next/link";
import { AlertTriangle, Home, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-linear-to-b from-background to-muted/30 px-4">
      <Card className="w-full max-w-xl border-destructive/40 shadow-xl animate-in fade-in slide-in-from-bottom-4">
        <CardContent className="pt-8">
          <div className="flex flex-col items-center text-center gap-6">
            {/* Icon */}
            <div className="relative">
              <span className="absolute inset-0 rounded-full bg-destructive/10 blur-xl animate-pulse" />
              <div className="relative rounded-full bg-destructive/10 p-5">
                <AlertTriangle className="h-14 w-14 text-destructive" />
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">
                Something went wrong
              </h1>
              <p className="text-sm text-muted-foreground max-w-md">
                An unexpected error occurred while processing your request.
                Please try again or return to the homepage.
              </p>
            </div>

            {/* Dev Error Info */}
            {process.env.NODE_ENV === "development" && (
              <div className="w-full rounded-md bg-muted p-4 text-left">
                <p className="text-xs font-mono text-muted-foreground break-all">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="mt-2 text-xs font-mono text-muted-foreground">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button onClick={reset} size="lg" className="gap-2">
                <RefreshCcw className="h-4 w-4" />
                Retry
              </Button>

              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link href="/">
                  <Home className="h-4 w-4" />
                  Go Home
                </Link>
              </Button>
            </div>

            {/* Footer */}
            <p className="text-xs text-muted-foreground">
              If the issue persists, please contact support.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Decorative Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-destructive/10 blur-3xl" />
      </div>
    </div>
  );
}
