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

export const listWithImageUrls = query({
    args: {},
    handler: async (ctx) => {
        const events = await ctx.db.query("events").order("desc").collect();
        return await Promise.all(
            events.map(async (event) => {
                const ids =
                    event.imageIds && event.imageIds.length > 0
                        ? event.imageIds
                        : event.imageId
                            ? [event.imageId]
                            : [];
                const imageUrls = (
                    await Promise.all(ids.map((id) => ctx.storage.getUrl(id)))
                ).filter((url): url is string => Boolean(url));

                return { ...event, imageUrls, pathId: event.slug ?? event._id };
            }),
        );
    },
});

export const getByPathId = query({
    args: { pathId: v.string() },
    handler: async (ctx, { pathId }) => {
        const event = await ctx.db
            .query("events")
            .withIndex("by_slug", (q) => q.eq("slug", pathId))
            .first();
        let matchedEvent = event;
        if (!matchedEvent) {
            const allEvents = await ctx.db.query("events").collect();
            matchedEvent = allEvents.find((item) => item._id === pathId) ?? null;
        }
        if (!matchedEvent) return null;

        const ids =
            matchedEvent.imageIds && matchedEvent.imageIds.length > 0
                ? matchedEvent.imageIds
                : matchedEvent.imageId
                    ? [matchedEvent.imageId]
                    : [];
        const imageUrls = (
            await Promise.all(ids.map((id) => ctx.storage.getUrl(id)))
        ).filter((url): url is string => Boolean(url));

        return { ...matchedEvent, imageUrls, pathId: matchedEvent.slug ?? matchedEvent._id };
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
        slug: v.string(),
        description: v.string(),
        date: v.string(),
        status: v.optional(v.union(v.literal("past"), v.literal("upcoming"))),
        imageId: v.optional(v.id("_storage")),
        imageIds: v.optional(v.array(v.id("_storage"))),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) throw new Error("Not authenticated");

        const existing = await ctx.db
            .query("events")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .first();
        if (existing) {
            throw new Error("Event slug already exists. Use a different title/slug.");
        }

        return await ctx.db.insert("events", {
            ...args,
            status: args.status ?? "upcoming",
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
        const ids =
            event?.imageIds && event.imageIds.length > 0
                ? event.imageIds
                : event?.imageId
                    ? [event.imageId]
                    : [];
        for (const imageId of ids) {
            await ctx.storage.delete(imageId);
        }
        await ctx.db.delete(id);
    },
});

// Update event (authenticated)
export const update = mutation({
    args: {
        id: v.id("events"),
        title: v.string(),
        slug: v.string(),
        description: v.string(),
        date: v.string(),
        status: v.optional(v.union(v.literal("past"), v.literal("upcoming"))),
        imageId: v.optional(v.id("_storage")),
        imageIds: v.optional(v.array(v.id("_storage"))),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) throw new Error("Not authenticated");

        const existing = await ctx.db
            .query("events")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .first();
        if (existing && existing._id !== args.id) {
            throw new Error("Event slug already exists. Use a different title/slug.");
        }

        const { id, ...updateData } = args;
        
        // Remove undefined fields if we don't want to overwrite them entirely with undefined, wait patch replaces explicitly.
        // Actually, if we provide new image(s), we should keep the ones if they are not provided, or replace?
        // The frontend only resends files. If the user doesn't update files, the 'imageIds' / 'imageId' will come across as undefined.
        // With `patch`, if `imageId` is `undefined`, it will update the field to `undefined`! 
        // Oh wait, `v.optional` means if it's omitted, it won't be in `args`. If it's explicitly undefined, it might not be in `args` either.
        
        await ctx.db.patch(id, {
            title: updateData.title,
            slug: updateData.slug,
            description: updateData.description,
            date: updateData.date,
            status: updateData.status ?? "upcoming",
            ...(updateData.imageId !== undefined ? { imageId: updateData.imageId } : {}),
            ...(updateData.imageIds !== undefined ? { imageIds: updateData.imageIds } : {}),
        });
    },
});
