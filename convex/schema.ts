import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
    ...authTables,

    events: defineTable({
        title: v.string(),
        slug: v.optional(v.string()),
        description: v.string(),
        date: v.string(),
        status: v.optional(v.union(v.literal("past"), v.literal("upcoming"))),
        imageId: v.optional(v.id("_storage")),
        imageIds: v.optional(v.array(v.id("_storage"))),
        createdAt: v.number(),
    }).index("by_slug", ["slug"]),

    certificates: defineTable({
        title: v.string(),
        recipientName: v.string(),
        year: v.string(),
        fileId: v.optional(v.id("_storage")),
        createdAt: v.number(),
    }),

    teamMembers: defineTable({
        name: v.string(),
        email: v.optional(v.string()),
        linkedIn: v.optional(v.string()),
        role: v.string(),
        department: v.string(), // or Year
        imageId: v.optional(v.id("_storage")),
        createdAt: v.number(),
    }),
});
