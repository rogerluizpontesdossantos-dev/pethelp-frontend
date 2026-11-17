
import Link from "next/link";
import { Heart } from "lucide-react";

type AuthPageProps = {
  title: string;
  description: string;
  mode: "login" | "register" | "forgot";
};

export default function AuthPage({
  title,
  description,
  mode,
}: AuthPageProps) {
  return (
    <main className="flex min-h-[calc(100vh-76px)] items-center justify-center px-5 py-14">
      <div className="w-full max-w-md rounded-3xl border border-[#e7eae3] bg-white p-7 shadow-xl shadow-[#245c46]/5 md:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e9f1e8] text-[#245c46]">
          <Heart size={27} fill="currentColor" />
        </div>

        <div className="mt-7 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#293b2f]">
            {title}
          </h1>
          <p className="mt-3 text-sm leading-7 text-[#778078]">
            {description}
          </p>
        </div>

        <form className="mt-8 space-y-5">
          {mode === "register" && (
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-[#465349]"
              >
                Nome completo
              </label>
              <input
                id="name"
                type="text"
                placeholder="Seu nome"
                autoComplete="name"
                className="w-full rounded-xl border border-[#e2e7df] bg-[#fbfcfa] px-4 py-3.5 text-sm outline-none transition focus:border-[#668b6f]"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-[#465349]"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="voce@email.com"
              autoComplete="email"
              className="w-full rounded-xl border border-[#e2e7df] bg-[#fbfcfa] px-4 py-3.5 text-sm outline-none transition focus:border-[#668b6f]"
            />
          </div>

          {mode !== "forgot" && (
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-[#465349]"
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                autoComplete={
                  mode === "register" ? "new-password" : "current-password"
                }
                className="w-full rounded-xl border border-[#e2e7df] bg-[#fbfcfa] px-4 py-3.5 text-sm outline-none transition focus:border-[#668b6f]"
              />
            </div>
          )}

          {mode === "login" && (
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-xs font-semibold text-[#245c46] hover:underline"
              >
                Esqueceu sua senha?
              </Link>
            </div>
          )}

          <button
            type="button"
            disabled
            className="w-full cursor-not-allowed rounded-xl bg-[#245c46] px-5 py-4 text-sm font-bold text-white opacity-70"
          >
            {mode === "forgot"
              ? "Enviar instruções"
              : "Continuar (em breve)"}
          </button>
          <p className="text-center text-xs leading-6 text-[#929991]">
            Esta área ainda não está integrada ao backend do PetHelp. A
            autenticação, cadastro e recuperação de acesso serão habilitados em
            uma etapa futura.
          </p>
        </form>

        <div className="mt-7 border-t border-[#edf0e9] pt-6 text-center text-sm text-[#778078]">
          {mode === "login" ? (
            <>
              Ainda não tem uma conta?{" "}
              <Link
                href="/register"
                className="font-bold text-[#245c46] hover:underline"
              >
                Cadastre-se
              </Link>
            </>
          ) : (
            <>
              Já tem uma conta?{" "}
              <Link
                href="/login"
                className="font-bold text-[#245c46] hover:underline"
              >
                Entrar
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
