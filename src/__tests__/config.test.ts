import { describe, expect, test } from "bun:test";
import { siteConfig } from "../config/site-config";

describe("Site Configuration", () => {
    test("has required basic info", () => {
        expect(siteConfig.name).toBeString();
        expect(siteConfig.description).toBeString();
        expect(siteConfig.url).toBeString();
    });

    test("projects have valid structure", () => {
        expect(siteConfig.projects.length).toBeGreaterThan(0);

        siteConfig.projects.forEach(project => {
            expect(project.id).toBeString();
            expect(project.title).toBeString();
            expect(project.description).toBeString();
            expect(project.tags).toBeArray();
            expect(project.tags.length).toBeGreaterThan(0);

            // Check for valid links or blog slugs
            if (!project.link && !project.blogSlug) {
                throw new Error(`Project ${project.title} must have either a link or a blogSlug`);
            }
        });
    });

    test("social icons are valid", () => {
        expect(siteConfig.socialIcons.length).toBeGreaterThan(0);
        siteConfig.socialIcons.forEach(social => {
            expect(social.url).toStartWith('http');
            expect(social.icon).toBeString();
        });
    });
});
