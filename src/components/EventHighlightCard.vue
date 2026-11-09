<script setup>
defineProps({
  event: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <button
    class="event-highlight"
    type="button"
    aria-disabled="true"
    :aria-labelledby="`event-title-${event.id}`"
    :aria-describedby="`event-description-${event.id} event-schedule-${event.id}`"
  >
    <img
      class="event-highlight__image"
      :src="event.image"
      :alt="event.alt"
      loading="lazy"
      decoding="async"
    />

    <span class="event-highlight__content">
      <span class="event-highlight__summary">
        <span :id="`event-title-${event.id}`" class="event-highlight__title">
          {{ event.title }}
        </span>
        <span :id="`event-description-${event.id}`" class="event-highlight__description">
          {{ event.description }}
        </span>
      </span>

      <span :id="`event-schedule-${event.id}`" class="event-highlight__schedule">
        <span class="event-highlight__city">{{ event.city }}</span>
        <span class="event-highlight__dates">
          <span v-for="date in event.dates" :key="`${date.day}-${date.date}`" class="event-highlight__date">
            <span>{{ date.day }}</span>
            <span>{{ date.date }}</span>
          </span>
        </span>
      </span>
    </span>
  </button>
</template>

<style scoped>
.event-highlight {
  position: relative;
  isolation: isolate;
  display: grid;
  grid-template-columns: 28% minmax(0, 1fr);
  width: 100%;
  min-height: clamp(165px, 12.3vw, 236px);
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: var(--color-white);
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.event-highlight::before {
  position: absolute;
  z-index: 0;
  inset: 0 0 0 28%;
  background: var(--color-black);
  clip-path: polygon(0 0, 95% 0, 100% 100%, 0 100%);
  transform-origin: left center;
  transition: transform var(--transition-duration) ease;
  content: '';
}

.event-highlight:focus-visible {
  z-index: 2;
  outline: 2px solid var(--color-gold);
  outline-offset: 5px;
}

.event-highlight:focus-visible::before {
  transform: scaleX(1.018);
}

.event-highlight__image {
  position: relative;
  z-index: 1;
  align-self: stretch;
  width: 100%;
  height: 100%;
  min-height: 0;
  object-fit: cover;
  object-position: center;
}

.event-highlight__content {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 20%;
  align-items: center;
  gap: 2.4vw;
  padding: 1.8vw 4.5vw 1.8vw 3.9vw;
}

.event-highlight__summary,
.event-highlight__schedule,
.event-highlight__dates {
  display: block;
}

.event-highlight__title {
  display: block;
  margin-bottom: 1.1vw;
  font-size: clamp(1.3rem, 2.25vw, 2.7rem);
  font-weight: 400;
  line-height: 1.15;
}

.event-highlight__description {
  display: block;
  max-width: 48em;
  font-size: clamp(0.75rem, 0.92vw, 1.1rem);
  line-height: 1.25;
}

.event-highlight__city {
  display: block;
  margin-bottom: 0.8vw;
  font-size: clamp(0.9rem, 1.2vw, 1.45rem);
  line-height: 1.2;
}

.event-highlight__dates {
  font-size: clamp(0.68rem, 0.8vw, 0.95rem);
  line-height: 1.25;
}

.event-highlight__date {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 0.5em;
  white-space: nowrap;
}

@media (hover: hover) and (pointer: fine) {
  .event-highlight:hover::before {
    transform: scaleX(1.018);
  }
}

@media (max-width: 1000px) {
  .event-highlight__content {
    grid-template-columns: minmax(0, 1fr) 24%;
    gap: 1.5vw;
    padding-left: 3vw;
  }

  .event-highlight__title {
    font-size: clamp(1.15rem, 2.25vw, 1.5rem);
  }
}

@media (max-width: 640px) {
  .event-highlight {
    grid-template-columns: 1fr;
    min-height: 0;
  }

  .event-highlight::before {
    inset: 0;
    clip-path: polygon(0 0, 94% 0, 100% 100%, 0 100%);
  }

  .event-highlight__image {
    aspect-ratio: 16 / 8;
    height: auto;
  }

  .event-highlight__content {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.25rem;
    padding: 1.5rem 1.75rem 1.75rem 1.25rem;
  }

  .event-highlight__title {
    margin-bottom: 0.75rem;
    font-size: clamp(1.35rem, 6vw, 1.75rem);
  }

  .event-highlight__description {
    font-size: 0.85rem;
    line-height: 1.45;
  }

  .event-highlight__schedule {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    align-items: start;
    gap: 1.5rem;
  }

  .event-highlight__city {
    margin-bottom: 0;
    font-size: 1rem;
  }

  .event-highlight__dates {
    width: fit-content;
    font-size: 0.8rem;
    line-height: 1.45;
  }

  .event-highlight__date {
    gap: 0.75rem;
  }
}
</style>
