import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

// List all events
export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("events").order("desc").collect();
    },
});

// Get storage URL for an image
export const getImageUrl = query({
    args: { imageId: v.id("_storage") },
    handler: async (ctx, { imageId }) => {
        return await ctx.storage.getUrl(imageId);
    },
});

// Generate upload URL (authenticated)
export const generateUploadUrl = mutation({
    args: {},
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) throw new Error("Not authenticated");
        return await ctx.storage.generateUploadUrl();
    },
});

// Create event (authenticated)
export const create = mutation({
    args: {
        title: v.string(),
        description: v.string(),
        date: v.string(),
        status: v.union(v.literal("past"), v.literal("upcoming")),
        imageId: v.optional(v.id("_storage")),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) throw new Error("Not authenticated");
        return await ctx.db.insert("events", {
            ...args,
            createdAt: Date.now(),
        });
    },
});

// Delete event (authenticated)
export const remove = mutation({
    args: { id: v.id("events") },
    handler: async (ctx, { id }) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) throw new Error("Not authenticated");
        const event = await ctx.db.get(id);
        if (event?.imageId) {
            await ctx.storage.delete(event.imageId);
        }
        await ctx.db.delete(id);
    },
});
