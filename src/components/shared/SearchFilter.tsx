"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/useDebounce";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface MentorSearchFiltersProps {
  categories: string[];
  skills: Array<{ id: string; title: string }>;
}

export default function MentorSearchFilters({
  categories,
  skills,
}: MentorSearchFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        new URLSearchParams(window.location.search).get("searchTerm") || ""
      );
    }
    return "";
  });

  const debouncedSearch = useDebounce(searchTerm, 500);

  const updateFilters = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(window.location.search);

      if (value && value !== "all") {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      params.delete("page");

      router.push(`/mentors?${params.toString()}`);
    },
    [router]
  );

  useEffect(() => {
    const current =
      new URLSearchParams(window.location.search).get("searchTerm") || "";
    if (debouncedSearch !== current) {
      updateFilters("searchTerm", debouncedSearch);
    }
  }, [debouncedSearch, updateFilters]);

  const handleClear = () => {
    setSearchTerm("");
    router.push("/mentors");
  };

  const hasActiveFilters =
    searchParams.get("searchTerm") ||
    searchParams.get("category") ||
    searchParams.get("skills");

  return (
    <div className="space-y-4 mt-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full mx-auto justify-center flex flex-col md:flex-row items-center gap-4 md:gap-6">
          {/* Search */}
          {/* <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search mentors or expertise..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div> */}

          {/* Category */}
          <Select
            value={searchParams.get("category") || "all"}
            onValueChange={(v) => updateFilters("category", v)}
          >
            <SelectTrigger className="w-full md:w-[220px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Skills */}
          <Select
            value={searchParams.get("skills") || "all"}
            onValueChange={(v) => updateFilters("skills", v)}
          >
            <SelectTrigger className="w-full md:w-[220px]">
              <SelectValue placeholder="Skills" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Skills</SelectItem>
              {skills.map((s) => (
                <SelectItem key={s.id} value={s.title}>
                  {s.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={handleClear}
            className="w-full md:w-auto"
          >
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
}
