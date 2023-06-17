import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { client } from "~/libs/kv";
import { Image } from "@unpic/qwik";

export const useGetPageViews = routeLoader$(async () => {
  const views = await client.get<number>("pageViews");
  return views ?? 0;
});

export default component$(() => {
  const views = useGetPageViews();
  const random = useSignal(Math.floor(Math.random() * 100));
  return (
    <>
      <div class="hero min-h-screen bg-base-200">
        <div class="hero-content text-center">
          <div class="max-w-md">
            <h1 class="text-5xl font-bold mb-2">Hi 👋</h1>
            <h2>Trabajo en una empresa</h2>
            <h3>Y soy un esclavo de las 🍑🍑</h3>
            <div class="stat mt-5">
              <div class="stat-title">Han visto esta pagina </div>
              <div class="stat-value">{views.value}</div>
              <div class="stat-desc">{random.value}% mas que el mes pasado</div>
            </div>
            <Link href="https://github.com/MonsignorEduardo">
              <button class="btn btn-primary">
                <Image
                  src="/github-mark.svg"
                  layout="constrained"
                  width={25}
                  height={25}
                  alt="github-mark"
                />
                Github
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to my main page",
  meta: [
    {
      name: "description",
      content: "My landing page no se porque la hice",
    },
  ],
};
