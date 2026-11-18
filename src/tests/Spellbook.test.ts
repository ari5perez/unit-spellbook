import { describe, expect, test } from "vitest";
import Spell from "../domain/Spell";
import Spellbook from "../domain/Spellbook";

describe("Spellbook", () => {
  test("adds spells and returns them in insertion order", () => {
    const spellbook = new Spellbook();
    const lumos = new Spell("Lumos", "Ilumina", "book");
    const accio = new Spell("Accio", "Atrae objetos", "movie");

    spellbook.addspell(lumos);
    spellbook.addspell(accio);

    expect(spellbook.getSpells()).toEqual([lumos, accio]);
  });

  test("rejects repeated names regardless of capitalization", () => {
    const spellbook = new Spellbook();
    spellbook.addspell(new Spell("Lumos", "Ilumina", "book"));

    expect(() =>
      spellbook.addspell(new Spell("LUMOS", "Otra descripción", "series")),
    ).toThrow("LUMOS ya está en el libro de hechizos");
  });

  test("getSpells returns a copy of the collection", () => {
    const spellbook = new Spellbook();
    const lumos = new Spell("Lumos", "Ilumina", "book");
    spellbook.addspell(lumos);

    const returnedSpells = [...spellbook.getSpells()];
    returnedSpells.pop();

    expect(returnedSpells).toEqual([]);
    expect(spellbook.getSpells()).toEqual([lumos]);
  });

  test("finds spells by their first appearance", () => {
    const spellbook = new Spellbook();
    const bookSpell = new Spell("Lumos", "Ilumina", "book");
    const seriesSpell = new Spell("Alohomora", "Abre puertas", "series");
    spellbook.addspell(bookSpell);
    spellbook.addspell(seriesSpell);

    expect(spellbook.findByOrigin("series")).toEqual([seriesSpell]);
    expect(spellbook.findByOrigin("videogame")).toEqual([]);
  });

  test("counts spells for all four first appearances", () => {
    const spellbook = new Spellbook();
    spellbook.addspell(new Spell("Lumos", "Ilumina", "book"));
    spellbook.addspell(new Spell("Accio", "Atrae objetos", "movie"));
    spellbook.addspell(new Spell("Flipendo", "Empuja", "videogame"));
    spellbook.addspell(new Spell("Alohomora", "Abre puertas", "series"));

    expect(spellbook.countByOrigin()).toEqual({
      book: 1,
      movie: 1,
      videogame: 1,
      series: 1,
    });
  });
});
