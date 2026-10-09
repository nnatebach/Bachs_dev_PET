import { describe, it, expect } from 'vitest';
import { createEvent, createUser } from './compileMe.js';

describe('Create', () => {
    const amina = createUser('amina', 'Amina Khan');
    const liam = createUser("liam", "Liam O'Connor", "liam.oconnor@example.com");
    const sofia = createUser("sofia", "Sofia Garcia", "sofia.garcia@example.com");

    const potluck = createEvent(amina, {
        title: "Thanksgiving Potluck",
        date: "2025-11-29",
        image_url: "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?w=500",
    });

    const expo = createEvent(sofia, {
        title: "EventExpo 2026",
        date: '2026-04-01',
        description: "Discover the future of event planning at EventExpo 2026. Network with industry leaders, explore cutting-edge technologies, and attend inspiring workshops.",
    });

    describe('Users', () => {
        it('should have correct username', () => expect(amina.username).toBe('amina'));
        it('should allow undefined email', () => expect(amina.email).toBeUndefined());
        it('should have correct email', () => expect(liam.email).toBe("liam.oconnor@example.com"));
        it('should assign sequential IDs', () => expect(sofia.id).toBe(3));
    });

    describe('Events', () => {
        it('should set correct host_id', () => expect(potluck.host_id).toBe(amina.id));
        it('should parse date correctly', () => expect(potluck.date.getMonth()).toBe(10));
        it('should allow undefined description', () => expect(potluck.description).toBeUndefined());
        it('should have correct description', () => expect(expo.description).toMatch(/^Discover/));
        it('should set correct host_id', () => expect(expo.host_id).toBe(sofia.id));
        it('should parse year correctly', () => expect(expo.date.getFullYear()).toBe(2026));
    });
});
