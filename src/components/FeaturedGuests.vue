<script setup>
defineProps({
  guests: { type: Array, required: true },
})
</script>

<template>
  <section class="featured-guests" aria-label="Personajes destacados">
    <div class="featured-guests__track" tabindex="0" aria-label="Fotografías de los personajes destacados">
      <figure v-for="guest in guests" :key="guest.id" class="featured-guests__portrait">
        <div class="featured-guests__photo">
          <img
            :src="guest.image"
            :alt="guest.alt"
            :style="{ objectPosition: guest.position }"
            width="738"
            height="738"
            decoding="async"
          />
        </div>
        <figcaption class="featured-guests__caption">
          <h2>{{ guest.name }}</h2>
          <p>{{ guest.description }}</p>
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.featured-guests {
  position: relative;
  z-index: 2;
  margin-top: -10.5vw;
  overflow-x: clip;
  overflow-y: visible;
}

.featured-guests__track {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  height: 34.8vw;
}

.featured-guests__portrait {
  position: relative;
  margin: 4.5vw 0 0;
  height: 30.3vw;
  transform-origin: center bottom;
  transition: transform var(--transition-duration) ease;
}

.featured-guests__portrait:nth-child(2) {
  margin-top: 2.25vw;
}

.featured-guests__portrait:nth-child(3) {
  margin-top: 0;
}

.featured-guests__photo {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  clip-path: polygon(0 20.45%, 100% 0, 100% 92.65%, 0 100%);
}

.featured-guests__photo::after {
  position: absolute;
  inset: 35% 0 0;
  background: linear-gradient(0deg, rgb(0 0 0 / 88%), transparent 90%);
  pointer-events: none;
  content: '';
}

.featured-guests__caption {
  position: absolute;
  z-index: 1;
  right: 7%;
  bottom: 12%;
  left: 7%;
  color: var(--color-white);
}

.featured-guests__caption h2 {
  margin: 0 0 7px;
  font-size: clamp(18px, 2vw, 36px);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.5px;
}

.featured-guests__caption p {
  margin: 0;
  font-size: clamp(12px, 1.08vw, 19px);
  line-height: 1.3;
}

.featured-guests__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (hover: hover) and (pointer: fine) {
  .featured-guests__portrait:hover {
    z-index: 1;
    transform: translateY(-10px) scale(1.012, 1.025);
  }
}

@media (max-width: 767px) {
  .featured-guests {
    margin-top: -84px;
  }

  .featured-guests__track {
    grid-template-columns: repeat(3, 62vw);
    height: calc(66vw + 48px);
    padding-top: 18px;
    overflow-x: auto;
    overflow-y: hidden;
    overscroll-behavior-x: contain;
    scroll-snap-type: x proximity;
    scrollbar-width: thin;
    scrollbar-color: #b5a38a var(--color-cream);
  }

  .featured-guests__portrait {
    height: 66vw;
    margin-top: 26px;
    scroll-snap-align: start;
  }

  .featured-guests__portrait:nth-child(2) {
    margin-top: 13px;
  }

  .featured-guests__photo {
    clip-path: polygon(0 10%, 100% 0, 100% 95%, 0 100%);
  }

  .featured-guests__caption {
    bottom: 11%;
  }

  .featured-guests__caption h2 {
    margin-bottom: 5px;
    font-size: clamp(18px, 4.3vw, 28px);
    letter-spacing: -0.3px;
  }

  .featured-guests__caption p {
    font-size: clamp(11px, 2.7vw, 16px);
  }
}
</style>
