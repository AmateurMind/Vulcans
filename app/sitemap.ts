import type { MetadataRoute } from "next";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { getSiteUrl } from "@/lib/site-url";

const SITE_URL = getSiteUrl();

const STATIC_PUBLIC_ROUTES = [
  "",
  "/about",
  "/achievements",
  "/contact",
  "/events",
  "/gallery",
  "/team",
  "/obj-viewer",
];

type EventItem = {
  _creationTime: number;
  pathId?: string;
  slug?: string;
  _id?: string;
};

async function getEventUrls(): Promise<MetadataRoute.Sitemap> {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!convexUrl) return [];

  try {
    const client = new ConvexHttpClient(convexUrl);
    const events = await client.query(api.events.listWithImageUrls, {});

    const mapped: MetadataRoute.Sitemap = [];
    for (const event of events as EventItem[]) {
      const pathId = event.pathId ?? event.slug ?? event._id;
      if (!pathId) continue;
      mapped.push({
        url: `${SITE_URL}/events/${pathId}`,
        lastModified: new Date(event._creationTime || Date.now()),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
    return mapped;
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = STATIC_PUBLIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  const eventRoutes = await getEventUrls();
  return [...staticRoutes, ...eventRoutes];
}
