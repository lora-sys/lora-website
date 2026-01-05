import { describe, expect, test } from "bun:test";
import { ContactForm } from "../components/bento/ContactForm";

describe("ContactForm", () => {
    test("exists", () => {
        expect(ContactForm).toBeDefined();
    });

    // Note: Full component testing requires DOM environment (React Testing Library).
    // basic logic or utility testing is preferred with Bun's test runner for now.
});

import { useDebounce } from "../hooks/use-debounce";

describe("useDebounce", () => {
    test("is defined", () => {
        expect(useDebounce).toBeDefined();
    });
});
