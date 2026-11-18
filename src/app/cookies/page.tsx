import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookies e privacidade",
  description:
    "Saiba quais cookies o PetHelp utiliza, por que os utilizamos e como gerenciar suas preferências.",
};

export default function CookiesPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-14 md:py-20 lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight text-[#263b2e] md:text-3xl">
        Cookies e privacidade
      </h1>

      <p className="mt-4 text-lg leading-8 text-[#737d73]">
        Esta página explica como o PetHelp utiliza cookies e tecnologias
        similares, quais categorias existem e como você pode gerenciar suas
        preferências.
      </p>

      <section className="mt-12">
        <h2 className="text-lg font-bold text-[#293b2f]">
          O que são cookies
        </h2>
        <p className="mt-2 text-sm leading-7 text-[#778078]">
          Cookies são pequenos arquivos de texto armazenados no seu navegador
          quando você visita um site. Eles ajudam o site a lembrar de
          informações sobre sua visita, como preferências e estado de
          navegação.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-[#293b2f]">
          Por que o PetHelp utiliza cookies
        </h2>
        <p className="mt-2 text-sm leading-7 text-[#778078]">
          O PetHelp utiliza cookies próprios para garantir o funcionamento,
          a segurança e a experiência de navegação no site. Cookies
          necessários são sempre ativos e não podem ser desabilitados, pois
          são essenciais para a operação do site.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-[#293b2f]">
          Categorias de cookies
        </h2>

        <div className="mt-4 space-y-4">
          <div className="p-4 rounded-xl border border-[#e2e7df] bg-[#fbfcfa]">
            <h3 className="text-sm font-semibold text-[#245c46]">
              Cookies necessários (sempre ativos)
            </h3>
            <p className="mt-1 text-sm leading-6 text-[#778078]">
              Essenciais para segurança, autenticação e funcionamento do site.
              Não podem ser desabilitados pelo usuário.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#e2e7df] bg-[#fbfcfa]">
            <h3 className="text-sm font-semibold text-[#245c46]">
              Cookies funcionais
            </h3>
            <p className="mt-1 text-sm leading-6 text-[#778078]">
              Permitem funcionalidades e memórias de preferências de navegação.
              Atualmente não há ferramentas reais que utilizem essa categoria
              no PetHelp.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#e2e7df] bg-[#fbfcfa]">
            <h3 className="text-sm font-semibold text-[#245c46]">
              Cookies analíticos
            </h3>
            <p className="mt-1 text-sm leading-6 text-[#778078]">
              Ajudam a entender como os visitantes interagem com o site.
              Desativados por padrão. Não há ferramenta de analytics
              configurada no momento.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#e2e7df] bg-[#fbfcfa]">
            <h3 className="text-sm font-semibold text-[#245c46]">
              Cookies de publicidade
            </h3>
            <p className="mt-1 text-sm leading-6 text-[#778078]">
              Usados para exibir anúncios relevantes. Desativados por padrão.
              Não há pixels ou rastreadores de publicidade ativos no site.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-[#293b2f]">
          Como alterar suas preferências
        </h2>
        <p className="mt-2 text-sm leading-7 text-[#778078]">
          Você pode revisar e alterar suas escolhas de cookies a qualquer
          momento clicando no link Preferências de Cookies no rodapé do
          site. Suas escolhas são salvas em um cookie próprio do PetHelp e
          permanecem até que você as altere.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-[#293b2f]">
          Cookie de sessão de autenticação
        </h2>
        <p className="mt-2 text-sm leading-7 text-[#778078]">
          O cookie de preferências de cookies é separado do futuro cookie de
          sessão de autenticação do PetHelp. Ele não contém JWT, senha nem
          credenciais e não substitui o cookie de autenticação, que será
          gerenciado pelo backend em uma etapa futura.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-[#293b2f]">
          Tecnologias ativas no momento
        </h2>
        <p className="mt-2 text-sm leading-7 text-[#778078]">
          Atualmente não há ferramentas de analytics, pixels publicitários ou
          serviços externos de rastreamento ativos no frontend do PetHelp.
          Somente o cookie próprio de consentimento pethelp_cookie_consent
          é utilizado para registrar suas escolhas de categorias.
        </p>
      </section>

      <p className="mt-12 text-sm text-[#778078]">
        Esta página não declara conformidade jurídica integral. Para dúvidas
        sobre privacidade, entre em contato pelo e-mail
        contato@pethelp.com.br.
      </p>
    </main>
  );
}