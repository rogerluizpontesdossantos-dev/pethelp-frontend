
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, Heart, MapPin, ShieldCheck } from "lucide-react";
import { animals } from "@/data/animals";

export const metadata: Metadata = {
  title: "Conheça o animal",
};

export function generateStaticParams() {
  return animals.map((animal) => ({
    id: animal.id,
  }));
}

type AnimalDetailsPageProps = {
  params: Promise<{ id: string }>;
};

function AnimalDetailsSkeleton() {
  return (
    <section className="min-h-screen py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="h-5 w-48 animate-pulse rounded bg-[#e9f1e8]" />
        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div className="min-h-[350px] animate-pulse rounded-3xl bg-[#e9f1e8] md:min-h-[540px]" />
          <div className="space-y-5 py-3">
            <div className="h-7 w-24 animate-pulse rounded-full bg-[#e9f1e8]" />
            <div className="h-12 w-3/4 animate-pulse rounded bg-[#e9f1e8]" />
            <div className="h-5 w-1/2 animate-pulse rounded bg-[#e9f1e8]" />
            <div className="h-32 animate-pulse rounded-xl bg-[#e9f1e8]" />
            <div className="h-40 animate-pulse rounded-2xl bg-[#e9f1e8]" />
          </div>
        </div>
      </div>
    </section>
  );
}

async function AnimalDetails({ params }: AnimalDetailsPageProps) {
  const { id } = await params;
  const animal = animals.find((item) => item.id === id);

  if (!animal) {
    notFound();
  }

  return (
    <section className="min-h-screen py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Link
          href="/animals"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#245c46]"
        >
          <ArrowLeft size={17} />
          Voltar para os animais
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div className="relative min-h-[350px] overflow-hidden rounded-3xl bg-[#e9f1e8] md:min-h-[540px]">
            <Image
              src={animal.image}
              alt={`Foto de ${animal.name}`}
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="py-3">
            <span className="rounded-full bg-[#e9f1e8] px-4 py-2 text-xs font-semibold text-[#245c46]">
              {animal.species}
            </span>

            <h1 className="mt-6 text-4xl font-bold text-[#293b2f] md:text-5xl">
              Conheça {animal.name}
            </h1>

            <p className="mt-3 text-sm text-[#858d85]">{animal.breed}</p>

            <div className="mt-7 flex items-center gap-2 text-sm text-[#69736a]">
              <MapPin size={17} />
              {animal.location}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                ["Idade", animal.age],
                ["Porte", animal.size],
                ["Sexo", animal.gender],
                ["Espécie", animal.species],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl border border-[#e7eae3] bg-white p-4"
                >
                  <p className="text-xs text-[#858d85]">{label}</p>
                  <p className="mt-2 text-sm font-bold text-[#293b2f]">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-9">
              <h2 className="text-lg font-bold text-[#293b2f]">
                Sobre {animal.name}
              </h2>
              <p className="mt-3 text-sm leading-8 text-[#737d73]">
                {animal.description}
              </p>
            </div>

            <div className="mt-8 rounded-2xl bg-[#edf4eb] p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-[#245c46]">
                <ShieldCheck size={19} />
                Sobre o responsável
              </div>
              <p className="mt-2 text-sm text-[#647568]">
                {animal.responsible}
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-[#dce8dc] bg-[#edf4eb] p-5">
              <h2 className="text-sm font-bold text-[#245c46]">
                Antes de demonstrar interesse
              </h2>
              <p className="mt-2 text-sm leading-7 text-[#4f6759]">
                A adoção responsável considera rotina, tempo disponível, custos e
                adaptação do animal. No PetHelp, a adoção é só o começo — o
                acompanhamento após a adoção faz parte da proposta.
              </p>
              <p className="mt-3 text-xs leading-6 text-[#647568]">
                O envio da solicitação será integrado ao backend em uma etapa
                futura. Por enquanto, você pode entrar na sua conta para
                acompanhar as próximas etapas.
              </p>
            </div>

            <Link
              href="/login"
              className="mt-6 flex items-center justify-center gap-2 rounded-full bg-[#245c46] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#194532]"
            >
              <Heart size={18} />
              Tenho interesse em adotar
            </Link>

            <p className="mt-3 text-center text-xs text-[#929991]">
              Você precisará entrar na sua conta quando a solicitação estiver
              disponível.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AnimalDetailsPage({
  params,
}: AnimalDetailsPageProps) {
  return (
    <Suspense fallback={<AnimalDetailsSkeleton />}>
      <AnimalDetails params={params} />
    </Suspense>
  );
}
