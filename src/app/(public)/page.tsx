
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Search,
  ShieldCheck,
  HandHeart,
  Users,
  PawPrint,
} from "lucide-react";
import { animals } from "@/data/animals";
import AnimalCard from "@/components/animals/AnimalCard";
import SectionHeading from "@/components/home/SectionHeading";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Encontre seu novo amigo",
    description:
      "Explore os animais disponíveis e encontre aquele que combina com seu estilo de vida.",
  },
  {
    number: "02",
    icon: Heart,
    title: "Demonstre interesse",
    description:
      "Conheça a história do animal e envie uma solicitação de adoção ao responsável.",
  },
  {
    number: "03",
    icon: HandHeart,
    title: "Transforme uma vida",
    description:
      "Converse com o responsável, conheça as orientações e prepare-se para receber seu novo companheiro.",
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Adoção responsável",
    description:
      "Incentivamos decisões conscientes, considerando o bem-estar dos animais em cada etapa.",
  },
  {
    icon: Users,
    title: "Conexões de confiança",
    description:
      "Aproximamos pessoas interessadas em adotar de quem cuida dos animais.",
  },
  {
    icon: Heart,
    title: "Cuidado contínuo",
    description:
      "A adoção é só o começo. Queremos incentivar o acompanhamento e a adaptação.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 md:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#dce8dc] bg-[#edf4eb] px-4 py-2 text-xs font-semibold text-[#416c4d]">
              <PawPrint size={15} />
              Um novo começo começa aqui
            </div>

            <h1 className="max-w-xl text-5xl leading-[1.12] font-bold tracking-tight text-[#263b2e] md:text-6xl">
              Todo pet merece um{" "}
              <span className="text-[#5c8b68]">lar cheio de amor.</span>
            </h1>

            <p className="mt-7 max-w-lg text-base leading-8 text-[#737d73]">
              Conectamos animais que precisam de uma família a pessoas
              dispostas a oferecer cuidado, carinho e uma nova história.
            </p>

            <form
              action="/animals"
              method="get"
              className="mt-9 flex max-w-xl flex-col gap-3 rounded-2xl border border-[#e7e9e2] bg-white p-3 shadow-lg shadow-[#334b37]/5 sm:flex-row"
            >
              <label className="flex min-w-0 flex-1 items-center gap-3 px-3">
                <Search size={20} className="shrink-0 text-[#78917b]" />
                <input
                  name="q"
                  type="search"
                  placeholder="Qual animal você procura?"
                  className="w-full min-w-0 bg-transparent py-3 text-sm text-[#292f2b] outline-none placeholder:text-[#a1a79f]"
                />
              </label>
              <button
                type="submit"
                className="rounded-xl bg-[#245c46] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#194532]"
              >
                Encontrar um pet
              </button>
            </form>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-[#818981]">
              <span className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#5c8b68]" />
                Adoção responsável
              </span>
              <span className="flex items-center gap-2">
                <Heart size={16} className="text-[#5c8b68]" />
                Conexões com propósito
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full bg-[#e6eee0]" />
            <div className="absolute -bottom-8 -left-8 h-48 w-48 rounded-full bg-[#f3e7d8]" />

            <div className="relative aspect-[4/4.2] overflow-hidden rounded-[2rem]">
              <Image
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=90"
                alt="Dois cachorros juntos em um momento de carinho"
                fill
                priority
                unoptimized
                sizes="(max-width: 1024px) 90vw, 560px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c3023]/45 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/30 bg-white/90 p-5 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e9f1e8] text-[#245c46]">
                    <Heart size={21} fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#263b2e]">
                      Uma amizade para a vida toda
                    </p>
                    <p className="mt-1 text-xs text-[#788178]">
                      Cada adoção é uma nova história.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e9ebe5] bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#668b6f]">
                Encontros especiais
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#292f2b] md:text-4xl">
                Conheça quem está esperando por você.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#778078]">
                Cada animal tem sua própria história. Talvez o próximo capítulo
                comece com você.
              </p>
            </div>
            <Link
              href="/animals"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#245c46] transition hover:gap-3"
            >
              Ver todos os animais <ArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {animals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Simples e consciente"
            title="Como funciona a adoção?"
            description="Queremos tornar o caminho até uma adoção responsável mais simples, transparente e acolhedor."
          />

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className="rounded-2xl border border-[#e7eae3] bg-white p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#91a894]">
                      {step.number}
                    </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf4eb] text-[#245c46]">
                      <Icon size={23} />
                    </div>
                  </div>
                  <h3 className="mt-7 text-lg font-bold text-[#293b2f]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#7b847c]">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Nosso compromisso"
            title="Mais do que encontrar um lar."
            description="O PetHelp nasce para incentivar uma cultura de cuidado, responsabilidade e respeito aos animais."
          />

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article key={benefit.title} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#edf4eb] text-[#245c46]">
                    <Icon size={25} />
                  </div>
                  <h3 className="mt-5 font-bold text-[#293b2f]">
                    {benefit.title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-[#7b847c]">
                    {benefit.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 overflow-hidden rounded-[2rem] bg-[#245c46] px-8 py-12 text-white md:flex-row md:items-center md:px-14 md:py-14">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c3dec5]">
              Faça parte dessa transformação
            </p>
            <h2 className="mt-4 text-3xl leading-tight font-bold md:text-4xl">
              Você também pode ajudar um animal a encontrar um lar.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Cadastre-se para conhecer animais ou compartilhar aqueles que
              estão procurando uma família.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link
              href="/animals"
              className="rounded-full bg-white px-6 py-3.5 text-center text-sm font-bold text-[#245c46] transition hover:bg-[#e9f1e8]"
            >
              Encontrar um pet
            </Link>
            <Link
              href="/register"
              className="rounded-full border border-white/40 px-6 py-3.5 text-center text-sm font-bold text-white transition hover:bg-white/10"
            >
              Quero participar
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
