import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

// List all team members
export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("teamMembers").order("desc").collect();
    },
});

// Create team member (authenticated)
export const create = mutation({
    args: {
        name: v.string(),
        role: v.string(),
        department: v.string(),
        imageId: v.optional(v.id("_storage")),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) throw new Error("Not authenticated");
        return await ctx.db.insert("teamMembers", {
            ...args,
            createdAt: Date.now(),
        });
    },
});

// Delete team member (authenticated)
export const remove = mutation({
    args: { id: v.id("teamMembers") },
    handler: async (ctx, { id }) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) throw new Error("Not authenticated");
        const teamMember = await ctx.db.get(id);
        if (teamMember?.imageId) {
            await ctx.storage.delete(teamMember.imageId);
        }
        await ctx.db.delete(id);
    },
});
