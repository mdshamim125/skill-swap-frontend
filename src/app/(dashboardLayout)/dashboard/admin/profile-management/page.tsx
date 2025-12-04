/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import type { Resolver } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/ui/multi-select";

// SHADCN SELECT
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  getMyProfile,
  updateMyProfile,
} from "@/services/profile/profileManagement";
import { getSkills } from "@/services/admin/skillsManagement";

/* -------------------------
   Zod schema
   ------------------------- */
const ProfileSchema = z.object({
  bio: z.string().min(1, "Bio is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),

  phone: z.string().optional(),

  hourlyRate: z.coerce.number().min(1, "Hourly rate is required").nonnegative(),

  interests: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),

  skills: z.array(z.string()).optional(),

  expertise: z.enum(
    ["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"] as const,
    { message: "Expertise is required" }
  ),

  experience: z.coerce
    .number()
    .int()
    .nonnegative()
    .min(1, "Experience is required"),
});

type ProfileFormValues = z.infer<typeof ProfileSchema>;

interface SkillOption {
  id: string;
  title: string;
}

/* -------------------------
   Page Component
   ------------------------- */
export default function ProfileManagementPage() {
  const [loading, setLoading] = useState(true);
  const [skillsOptions, setSkillsOptions] = useState<SkillOption[]>([]);

  // For comma-separated fields
  const [interestsText, setInterestsText] = useState("");
  const [languagesText, setLanguagesText] = useState("");

  // then initialize useForm like this:
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileSchema) as unknown as Resolver<
      ProfileFormValues,
      any
    >,
    defaultValues: {
      bio: "",
      country: "",
      city: "",
      phone: "",
      hourlyRate: undefined,
      interests: [],
      languages: [],
      skills: [],
      expertise: "BEGINNER",
      experience: undefined,
    },
  });

  /* -------------------------
     Load profile + skills
     ------------------------- */
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [profileRes, skillsRes] = await Promise.all([
          getMyProfile(),
          getSkills(),
        ]);

        /* --- Profile --- */
        const profileData = profileRes.data ?? profileRes;

        // console.log("profile data:", profileData?.data);

        const normalized = {
          bio: profileData?.bio ?? "",
          country: profileData?.country ?? "",
          city: profileData?.city ?? "",
          phone: profileData?.phone ?? "",
          hourlyRate: profileData?.hourlyRate ?? undefined,

          interests: profileData?.interests ?? [],
          languages: profileData?.languages ?? [],
          skills: profileData?.skills ?? [],

          expertise: profileData?.expertise ?? "BEGINNER",
          experience:
            profileData?.experience === null
              ? undefined
              : profileData?.experience ?? undefined,
        };

        form.reset(normalized);

        setInterestsText(normalized.interests.join(", "));
        setLanguagesText(normalized.languages.join(", "));

        /* --- Skills List --- */
        const mappedSkills = (skillsRes.data ?? skillsRes).map((s: any) => ({
          id: s.id,
          title: s.title,
        }));
        setSkillsOptions(mappedSkills);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [form]);

  /* -------------------------
     Submit Handler
     ------------------------- */
  const onSubmit = async (values: ProfileFormValues) => {
    try {
      const payload = {
        bio: values.bio,
        country: values.country,
        city: values.city,
        phone: values.phone,
        hourlyRate: values.hourlyRate,
        interests: values.interests,
        languages: values.languages,
        skills: values.skills,
        expertise: values.expertise,
        experience: values.experience,
      };

      const res = await updateMyProfile(payload);
      if (res.success) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error(res.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return <div className="flex justify-center py-20">Loading profile…</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 border rounded-xl bg-white shadow-sm">
      <h1 className="text-2xl font-semibold mb-6">Update Your Profile</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Bio */}
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Tell something about yourself..."
                    value={field.value ?? ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Country + City */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Country" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="City" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Phone + Hourly Rate */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="+8801XXXXXXXXX" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hourlyRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hourly Rate ($)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="10"
                      value={
                        field.value === undefined ? "" : String(field.value)
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Interests */}
          <FormField
            control={form.control}
            name="interests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interests (comma separated)</FormLabel>
                <FormControl>
                  <Input
                    value={interestsText}
                    onChange={(e) => {
                      const val = e.target.value;
                      setInterestsText(val);
                      field.onChange(
                        val
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean)
                      );
                    }}
                    placeholder="e.g. hiking, painting"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Languages */}
          <FormField
            control={form.control}
            name="languages"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Languages (comma separated)</FormLabel>
                <FormControl>
                  <Input
                    value={languagesText}
                    onChange={(e) => {
                      const val = e.target.value;
                      setLanguagesText(val);
                      field.onChange(
                        val
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean)
                      );
                    }}
                    placeholder="e.g. English, Bengali"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Expertise (Select) */}
          <FormField
            control={form.control}
            name="expertise"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expertise Level</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="BEGINNER">Beginner</SelectItem>
                    <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                    <SelectItem value="ADVANCED">Advanced</SelectItem>
                    <SelectItem value="EXPERT">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* Experience */}
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Years of Experience</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="e.g. 3"
                    value={field.value === undefined ? "" : String(field.value)}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Skills multiselect */}
          <FormField
          
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skills</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={skillsOptions.map((s) => ({
                      label: s.title,
                      value: s.id,
                    }))}
                    selected={field.value ?? []}
                    onChange={(v) => field.onChange(v)}
                    placeholder="Select skills"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </Form>
    </div>
  );
}
