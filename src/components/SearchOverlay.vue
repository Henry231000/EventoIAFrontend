<script setup>
import { ref } from 'vue'

const emit = defineEmits(['close'])
const query = ref('')
// Espacios visuales sin resultados ni contenido simulado.
const popularSlots = [1, 2, 3]
</script>

<template>
  <section
    class="search-overlay"
    role="dialog"
    aria-modal="true"
    aria-labelledby="search-title"
    tabindex="-1"
  >
    <button
      class="search-overlay__close"
      type="button"
      aria-label="Cerrar búsqueda"
      @click="emit('close')"
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m5 5 14 14M19 5 5 19" />
      </svg>
    </button>

    <div class="search-overlay__content">
      <h1 id="search-title" class="search-overlay__title">¿Cuál será tu próximo plan?</h1>
      <form class="search-overlay__form" role="search" @submit.prevent>
        <label class="search-overlay__field">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m15.5 15.5 5 5" />
          </svg>
          <input
            v-model="query"
            type="search"
            name="query"
            aria-label="Buscar eventos"
            placeholder="Buscas un concierto, una conferencia, una competencia"
            autocomplete="off"
            spellcheck="false"
            data-autofocus
          />
        </label>
      </form>

      <section class="search-overlay__popular" aria-labelledby="popular-title">
        <h2 id="popular-title">Lo más buscado</h2>
        <div class="search-overlay__placeholders" aria-hidden="true">
          <div v-for="slot in popularSlots" :key="slot" class="search-overlay__placeholder"></div>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.search-overlay {
  --search-top-space: 12.2vw;
  position: absolute;
  z-index: 30;
  inset: 0 0 -3.3vw;
  padding: var(--search-top-space) 5.9vw 5vw;
  color: var(--color-white);
  background: rgb(0 0 0 / 96%);
  overscroll-behavior: contain;
}

.search-overlay__content {
  max-height: calc(100dvh - var(--search-top-space) - 32px);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--color-gold) transparent;
}

.search-overlay:focus {
  outline: none;
}

.search-overlay__close {
  position: absolute;
  top: 2.1vw;
  right: 2.4vw;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  padding: 7px;
  border: 0;
  background: transparent;
  color: var(--color-gold);
  cursor: pointer;
  transition: color var(--transition-duration) ease;
}

.search-overlay__close:hover {
  color: var(--color-white);
}

.search-overlay svg {
  width: 24px;
  height: 24px;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.search-overlay__title {
  margin: 0 0 2.3vw;
  font-size: clamp(24px, 2vw, 38px);
  font-weight: 600;
  line-height: 1.2;
  text-align: center;
}

.search-overlay__form {
  width: min(57vw, 1100px);
  margin-inline: auto;
}

.search-overlay__field {
  display: flex;
  align-items: center;
  gap: 20px;
  min-height: clamp(58px, 4.4vw, 84px);
  padding: 10px 24px;
  border: 1px solid var(--color-gold);
  border-radius: 5px;
  background: rgb(0 0 0 / 50%);
  color: var(--color-gold);
  transition: box-shadow var(--transition-duration) ease;
}

.search-overlay__field:focus-within {
  box-shadow: 0 0 0 1px var(--color-gold);
}

.search-overlay__field svg {
  flex: 0 0 22px;
  width: 22px;
  height: 22px;
}

.search-overlay__field input {
  width: 100%;
  min-width: 0;
  padding: 0;
  border: 0;
  border-radius: 0;
  outline: none;
  background: transparent;
  color: var(--color-white);
  font: inherit;
  font-size: clamp(15px, 1.35vw, 23px);
  line-height: 1.4;
  appearance: none;
}

.search-overlay__field input::placeholder {
  color: #84847e;
  opacity: 1;
}

.search-overlay__field input::-webkit-search-cancel-button {
  appearance: none;
}

.search-overlay__popular {
  margin-top: 5.2vw;
}

.search-overlay__popular h2 {
  margin: 0 0 16px;
  font-size: clamp(18px, 1.4vw, 26px);
  font-weight: 400;
  line-height: 1.3;
}

.search-overlay__placeholders {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 3.5vw;
}

.search-overlay__placeholder {
  aspect-ratio: 1.96 / 1;
  background: #ffbf00;
}

@media (max-width: 1000px) {
  .search-overlay {
    --search-top-space: 120px;
  }

  .search-overlay__form {
    width: min(90%, 760px);
  }
}

@media (max-width: 767px) {
  .search-overlay {
    position: fixed;
    inset: 0;
    height: 100dvh;
    padding: 112px 6vw 40px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .search-overlay__close {
    position: fixed;
    top: 24px;
    right: calc(6vw - 5px);
  }

  .search-overlay__content {
    max-height: none;
    overflow: visible;
  }

  .search-overlay__title {
    margin-bottom: 25px;
    font-size: clamp(22px, 5.5vw, 30px);
  }

  .search-overlay__form {
    width: 100%;
  }

  .search-overlay__field {
    gap: 12px;
    min-height: 58px;
    padding-inline: 15px;
  }

  .search-overlay__field input {
    font-size: 16px;
  }

  .search-overlay__popular {
    margin-top: 50px;
  }

  .search-overlay__placeholders {
    grid-template-columns: repeat(3, 72vw);
    gap: 20px;
    overflow-x: auto;
    padding-bottom: 16px;
    overscroll-behavior-x: contain;
    scrollbar-width: thin;
    scrollbar-color: var(--color-gold) transparent;
  }
}
</style>
