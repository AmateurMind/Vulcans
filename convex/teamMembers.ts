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
        email: v.optional(v.string()),
        linkedIn: v.optional(v.string()),
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

// Bulk import team members (authenticated)
export const bulkImport = mutation({
    args: {
        members: v.array(v.object({
            name: v.string(),
            email: v.optional(v.string()),
            linkedIn: v.optional(v.string()),
            role: v.string(),
            department: v.string(),
        })),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) throw new Error("Not authenticated");

        const results = [];
        for (const member of args.members) {
            const id = await ctx.db.insert("teamMembers", {
                ...member,
                createdAt: Date.now(),
            });
            results.push({ id, name: member.name });
        }
        return results;
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

// Remove test members by name pattern (public - for cleanup)
export const removeTestMembers = mutation({
    args: {},
    handler: async (ctx) => {
        const testPatterns = ["AI Tester", "Test Person", "TP", "Automator"];
        const allMembers = await ctx.db.query("teamMembers").collect();
        const removed = [];

        for (const member of allMembers) {
            const isTestMember = testPatterns.some(pattern =>
                member.name?.toLowerCase().includes(pattern.toLowerCase()) ||
                member.email?.toLowerCase().includes(pattern.toLowerCase())
            );

            if (isTestMember) {
                await ctx.db.delete(member._id);
                removed.push({ id: member._id, name: member.name });
            }
        }
        return removed;
    },
});

// Clear all team members (authenticated)
export const clearAll = mutation({
    args: {},
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) throw new Error("Not authenticated");

        const members = await ctx.db.query("teamMembers").collect();
        let count = 0;
        for (const member of members) {
            if (member.imageId) {
                await ctx.storage.delete(member.imageId);
            }
            await ctx.db.delete(member._id);
            count++;
        }
        return count;
    },
});
