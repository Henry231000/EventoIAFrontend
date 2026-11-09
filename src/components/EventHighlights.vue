<script setup>
import EventHighlightCard from './EventHighlightCard.vue'

defineProps({
  events: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section class="event-highlights" aria-label="Próximos eventos">
    <div class="event-highlights__list">
      <EventHighlightCard v-for="event in events" :key="event.id" :event="event" />
    </div>

    <button class="event-highlights__calendar" type="button" aria-disabled="true">
      <strong>Calendario</strong> de eventos
    </button>
  </section>
</template>

<style scoped>
.event-highlights {
  position: relative;
  padding: 5.2vw 5.7vw 2.1vw;
  background: var(--color-cream);
}

.event-highlights__list {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
}

.event-highlights__calendar {
  display: block;
  margin: 5.6vw auto 0;
  padding: 1.35vw 3.85vw;
  border: 0;
  border-radius: 0;
  background: var(--color-black);
  color: var(--color-white);
  font: inherit;
  font-size: clamp(1.1rem, 1.8vw, 2.15rem);
  line-height: 1.2;
  text-align: center;
  cursor: pointer;
  transition: outline-color var(--transition-duration) ease;
}

.event-highlights__calendar strong {
  color: var(--color-gold);
  font-weight: 700;
}

.event-highlights__calendar:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 5px;
}

@media (hover: hover) and (pointer: fine) {
  .event-highlights__calendar:hover {
    outline: 1px solid var(--color-gold);
    outline-offset: 3px;
  }
}

@media (max-width: 640px) {
  .event-highlights {
    padding: 2.5rem 6vw 2rem;
  }

  .event-highlights__list {
    gap: 1.5rem;
  }

  .event-highlights__calendar {
    margin-top: 2.5rem;
    padding: 1.1rem 1.5rem;
    font-size: clamp(1.1rem, 5vw, 1.35rem);
  }
}
</style>
