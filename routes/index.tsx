/// <reference lib="deno.unstable" />

import { defineRoute } from "$fresh/server.ts";

async function getUpdateViews() {
  const kv = await Deno.openKv();
  const views = await kv.get<number>(["views"]);
  if (views.value !== null) {
    await kv.set(["views"], views.value + 1);
  } else {
    await kv.set(["views"], 0);
  }

  return views;
}

export default defineRoute(async (req, ctx) => {
  const views = await getUpdateViews();
  const random = Math.floor(Math.random() * 100);
  return (
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold mb-2">Hi 👋</h1>
          <h2>Trabajo en una empresa</h2>
          <h3>Y soy un esclavo de las 🍑🍑</h3>
          <div class="stat mt-5">
            <div class="stat-title">Han visto esta pagina</div>
            <div class="stat-value">{views.value}</div>
            <div class="stat-desc">{random}% mas que el mes pasado</div>
          </div>
          <a href="https://github.com/MonsignorEduardo">
            <button class="btn btn-primary">
              <image
                src="/github-mark.svg"
                width={25}
                height={25}
                alt="github-mark"
              />
              Github
            </button>
          </a>
        </div>
      </div>
    </div>
  );
});
