import { describe, expect, test } from "vitest";
import Spell, { type FirstAppearance } from "../domain/Spell";

const MAX_DESCRIPTION_LENGTH = 120;

describe("Spell", () => {
  test("creates a spell and trims its name", () => {
    const spell = new Spell(
      "  Lumos  ",
      "Ilumina la punta de la varita",
      "book",
    );

    expect(spell.Name).toBe("Lumos");
    expect(spell.descripcion).toBe("Ilumina la punta de la varita");
    expect(spell.firstAppearance).toBe("book");
    expect(spell.isOriginal()).toBe(true);
    expect(spell.getOriginLabel()).toBe("Libro");
    expect(spell.describe()).toBe(
      "Lumos (Libro): Ilumina la punta de la varita",
    );
  });

  test("accepts every valid first appearance, including series", () => {
    const appearances: Array<[FirstAppearance, string]> = [
      ["book", "Libro"],
      ["movie", "Película"],
      ["videogame", "Videojuego"],
      ["series", "Serie"],
    ];

    for (const [appearance, label] of appearances) {
      const spell = new Spell("Lumos", "Ilumina", appearance);

      expect(spell.getOriginLabel()).toBe(label);
    }
  });

  test("a non-book spell is not original", () => {
    const spell = new Spell("Lumos", "Ilumina", "series");

    expect(spell.isOriginal()).toBe(false);
  });

  test("rejects an empty name", () => {
    expect(() => new Spell("   ", "Ilumina", "book")).toThrow(
      "El nombre del hechizo no puede ser vacío",
    );
  });

  test("rejects an empty description", () => {
    expect(() => new Spell("Lumos", "   ", "book")).toThrow(
      "La descripción del hechizo no puede ser vacía",
    );
  });

  test("accepts a description at the maximum length", () => {
    const description = "a".repeat(MAX_DESCRIPTION_LENGTH);
    const spell = new Spell("Lumos", description, "book");

    expect(spell.descripcion).toBe(description);
  });

  test("rejects a description longer than the maximum", () => {
    const description = "a".repeat(MAX_DESCRIPTION_LENGTH + 1);

    expect(() => new Spell("Lumos", description, "book")).toThrow(
      "La descripción no puede superar los 120 caracteres",
    );
  });

  test("rejects an invalid first appearance", () => {
    const invalidAppearance = "podcast" as FirstAppearance;

    expect(() => new Spell("Lumos", "Ilumina", invalidAppearance)).toThrow(
      "Debe indicar la primera aparición del hechizo",
    );
  });
});
