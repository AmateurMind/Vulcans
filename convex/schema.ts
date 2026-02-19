import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
    ...authTables,

    events: defineTable({
        title: v.string(),
        description: v.string(),
        date: v.string(),
        imageId: v.optional(v.id("_storage")),
        createdAt: v.number(),
    }),

    certificates: defineTable({
        title: v.string(),
        recipientName: v.string(),
        year: v.string(),
        fileId: v.optional(v.id("_storage")),
        createdAt: v.number(),
    }),
});
