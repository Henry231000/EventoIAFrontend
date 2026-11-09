<script setup>
defineProps({
  groups: {
    type: Array,
    required: true,
  },
  socials: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__brand" aria-label="Eventos Perú IA">
      EVENTOSPERU<span>IA</span>
    </div>

    <section v-for="group in groups" :key="group.title" class="site-footer__group">
      <h2 class="site-footer__heading">{{ group.title }}</h2>
      <ul class="site-footer__links">
        <li v-for="link in group.links" :key="link">
          <span>{{ link }}</span>
        </li>
      </ul>
    </section>

    <section class="site-footer__group site-footer__social-group">
      <h2 class="site-footer__heading">CONVERSEMOS</h2>
      <ul class="site-footer__socials" aria-label="Redes sociales">
        <li v-for="social in socials" :key="social.name">
          <img
            class="site-footer__social-image"
            :src="social.image"
            :alt="social.name"
            width="44"
            height="44"
            loading="lazy"
            decoding="async"
          />
        </li>
      </ul>
    </section>
  </footer>
</template>

<style scoped>
.site-footer {
  display: grid;
  grid-template-columns: 1.6fr 0.7fr 0.9fr 1.5fr;
  align-items: start;
  column-gap: clamp(24px, 2.5vw, 48px);
  min-height: max(190px, 14vw);
  padding: clamp(45px, 3.7vw, 72px) 4.7vw;
  color: var(--color-white);
  background: var(--color-black);
}

.site-footer__brand {
  align-self: center;
  width: max-content;
  font-size: clamp(24px, 2vw, 30px);
  font-weight: 400;
  letter-spacing: -0.06em;
  white-space: nowrap;
}

.site-footer__brand span {
  color: var(--color-gold);
  font-weight: 700;
}

.site-footer__heading {
  margin: 0 0 12px;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.3;
  white-space: nowrap;
}

.site-footer__links,
.site-footer__socials {
  margin: 0;
  padding: 0;
  list-style: none;
}

.site-footer__links {
  font-size: 12px;
  line-height: 1.4;
}

.site-footer__links li {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.site-footer__links li::before {
  content: "-";
}

.site-footer__socials {
  display: flex;
  gap: 10px;
}

.site-footer__social-image {
  display: block;
  width: 44px;
  height: 44px;
  object-fit: contain;
}

@media (max-width: 1050px) {
  .site-footer {
    grid-template-columns: 1.2fr 1fr;
    gap: 32px 40px;
    padding: 44px 6vw;
  }

  .site-footer__brand {
    align-self: start;
  }
}

@media (max-width: 540px) {
  .site-footer {
    grid-template-columns: 1fr 1fr;
    gap: 30px 22px;
    padding: 36px 6vw 42px;
  }

  .site-footer__brand,
  .site-footer__social-group {
    grid-column: 1 / -1;
  }

  .site-footer__heading {
    font-size: 11px;
  }

  .site-footer__links {
    font-size: 11px;
    line-height: 1.6;
  }

  .site-footer__links li {
    gap: 6px;
  }
}

@media (max-width: 340px) {
  .site-footer {
    grid-template-columns: 1fr;
  }
}
</style>
