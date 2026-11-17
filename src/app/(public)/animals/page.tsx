
import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import AnimalCard from "@/components/animals/AnimalCard";
import { animals } from "@/data/animals";

export const metadata: Metadata = {
  title: "Animais disponíveis | PetHelp",
};

type AnimalsPageProps = {
  searchParams: Promise<{ q?: string | string[]; species?: string | string[] }>;
};

const speciesFilters = [
  { label: "Todos", value: "todos" },
  { label: "Cachorros", value: "Cachorro" },
  { label: "Gatos", value: "Gato" },
] as const;

async function AnimalsResults({ searchParams }: AnimalsPageProps) {
  const resolvedSearchParams = await searchParams;
  const rawQuery = resolvedSearchParams.q;
  const query = Array.isArray(rawQuery) ? rawQuery[0] ?? "" : rawQuery ?? "";
  const normalizedQuery = query.trim().toLowerCase();

  const rawSpecies = resolvedSearchParams.species;
  const selectedSpecies = Array.isArray(rawSpecies)
    ? rawSpecies[0] ?? "todos"
    : rawSpecies ?? "todos";
  const activeSpecies = speciesFilters.some((item) => item.value === selectedSpecies)
    ? selectedSpecies
    : "todos";

  const filteredAnimals = animals.filter((animal) => {
    const matchesSpecies =
      activeSpecies === "todos" || animal.species === activeSpecies;
    if (!matchesSpecies) {
      return false;
    }
    if (!normalizedQuery) {
      return true;
    }
    const haystack = [animal.name, animal.species, animal.breed, animal.location]
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalizedQuery);
  });

  const hasActiveFilters = normalizedQuery.length > 0 || activeSpecies !== "todos";

  return (
    <>
      <form
        action="/animals"
        method="get"
        className="mt-8 flex max-w-2xl flex-col gap-3 rounded-2xl border border-[#e7e9e2] bg-white p-3 shadow-lg shadow-[#334b37]/5 sm:flex-row"
      >
        {activeSpecies !== "todos" ? (
          <input type="hidden" name="species" value={activeSpecies} />
        ) : null}
        <label className="flex min-w-0 flex-1 items-center gap-3 px-3">
          <Search size={20} className="shrink-0 text-[#78917b]" />
          <input
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Busque por nome, espécie, raça ou localização"
            className="w-full min-w-0 bg-transparent py-3 text-sm text-[#292f2b] outline-none placeholder:text-[#a1a79f]"
          />
        </label>
        <button
          type="submit"
          className="rounded-xl bg-[#245c46] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#194532]"
        >
          Buscar
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        {speciesFilters.map((filter) => {
          const isActive = activeSpecies === filter.value;
          const href =
            filter.value === "todos"
              ? query
                ? `/animals?q=${encodeURIComponent(query)}`
                : "/animals"
              : query
                ? `/animals?species=${encodeURIComponent(filter.value)}&q=${encodeURIComponent(query)}`
                : `/animals?species=${encodeURIComponent(filter.value)}`;

          return (
            <Link
              key={filter.value}
              href={href}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "border-[#245c46] bg-[#245c46] text-white"
                  : "border-[#dce6dc] bg-white text-[#245c46] hover:bg-[#edf4eb]"
              }`}
            >
              {filter.label}
            </Link>
          );
        })}
      </div>

      {hasActiveFilters ? (
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[#69736a]">
          <p>
            {filteredAnimals.length} resultado
            {filteredAnimals.length === 1 ? "" : "s"}
            {normalizedQuery ? (
              <>
                {" "}
                para{" "}
                <span className="font-semibold text-[#293b2f]">
                  &quot;{query.trim()}&quot;
                </span>
              </>
            ) : null}
            {activeSpecies !== "todos" ? (
              <>
                {normalizedQuery ? " em " : " em "}
                <span className="font-semibold text-[#293b2f]">
                  {activeSpecies === "Cachorro" ? "cachorros" : "gatos"}
                </span>
              </>
            ) : null}
          </p>
          <Link
            href="/animals"
            className="font-semibold text-[#245c46] underline-offset-4 hover:underline"
          >
            Limpar filtros
          </Link>
        </div>
      ) : null}

      {filteredAnimals.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredAnimals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-[#e7eae3] bg-white p-8 text-center">
          <h2 className="text-lg font-bold text-[#293b2f]">
            Nenhum animal encontrado
          </h2>
          <p className="mt-3 text-sm leading-7 text-[#778078]">
            {normalizedQuery
              ? `Não encontramos resultados para "${query.trim()}".`
              : "Não encontramos animais com os filtros selecionados."}{" "}
            Tente ajustar sua busca ou os filtros.
          </p>
          <Link
            href="/animals"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#245c46] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#194532]"
          >
            Limpar filtros
          </Link>
        </div>
      )}
    </>
  );
}

function AnimalsResultsFallback() {
  return (
    <>
      <div className="mt-8 flex max-w-2xl flex-col gap-3 rounded-2xl border border-[#e7e9e2] bg-white p-3 shadow-lg shadow-[#334b37]/5 sm:flex-row">
        <div className="h-[52px] min-w-0 flex-1 animate-pulse rounded-xl bg-[#edf4eb]" />
        <div className="h-[52px] w-full animate-pulse rounded-xl bg-[#245c46]/20 sm:w-[120px]" />
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-[360px] animate-pulse rounded-2xl border border-[#e9ebe5] bg-white"
          />
        ))}
      </div>
    </>
  );
}

export default function AnimalsPage({ searchParams }: AnimalsPageProps) {
  return (
    <section className="min-h-screen py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#668b6f]">
            Animais disponíveis
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#292f2b] md:text-4xl">
            Encontre um novo amigo para chamar de seu.
          </h1>
          <p className="mt-4 text-sm leading-7 text-[#778078]">
            Conheça os animais que estão esperando por uma família e encontre
            aquele que combina com você.
          </p>
        </div>

        <Suspense fallback={<AnimalsResultsFallback />}>
          <AnimalsResults searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
}
