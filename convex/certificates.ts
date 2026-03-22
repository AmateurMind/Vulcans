import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

// List all certificates
export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("certificates").order("desc").collect();
    },
});

// Get storage URL for a file
export const getFileUrl = query({
    args: { fileId: v.id("_storage") },
    handler: async (ctx, { fileId }) => {
        return await ctx.storage.getUrl(fileId);
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

// Create certificate (authenticated)
export const create = mutation({
    args: {
        title: v.string(),
        recipientName: v.string(),
        year: v.string(),
        fileId: v.optional(v.id("_storage")),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) throw new Error("Not authenticated");
        return await ctx.db.insert("certificates", {
            ...args,
            createdAt: Date.now(),
        });
    },
});

// Delete certificate (authenticated)
export const remove = mutation({
    args: { id: v.id("certificates") },
    handler: async (ctx, { id }) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) throw new Error("Not authenticated");
        const cert = await ctx.db.get(id);
        if (cert?.fileId) {
            await ctx.storage.delete(cert.fileId);
        }
        await ctx.db.delete(id);
    },
});
