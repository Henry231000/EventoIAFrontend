<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

defineProps({
  event: { type: Object, required: true },
})

const video = ref(null)
const videoFailed = ref(false)
const soundMuted = ref(false)
const reducedMotion = ref(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
let motionPreference
let playbackRequest = 0

function syncSoundState() {
  const player = video.value
  if (player) soundMuted.value = player.muted || player.volume === 0
}

async function syncPlayback() {
  const player = video.value
  const request = ++playbackRequest
  if (!player) return
  if (reducedMotion.value) {
    player.pause()
    syncSoundState()
    return
  }

  try {
    await player.play()
  } catch (error) {
    // Una respuesta tardía no debe sustituir una elección posterior del usuario.
    if (
      error.name !== 'NotAllowedError' ||
      request !== playbackRequest ||
      player !== video.value ||
      reducedMotion.value
    ) return

    player.muted = true
    syncSoundState()
    // Si también se restringe el autoplay silenciado, el botón permite reintentar.
    try {
      await player.play()
    } catch {
      // El navegador puede exigir una interacción incluso sin audio.
    }
  } finally {
    if (player === video.value) syncSoundState()
  }
}

function toggleSound() {
  const player = video.value
  if (!player) return
  const enableSound = player.muted || player.volume === 0
  if (enableSound && player.volume === 0) player.volume = 1
  player.muted = !enableSound
  syncSoundState()
  // play() se solicita dentro del clic, sin cambiar src, currentTime ni el elemento.
  syncPlayback()
}

function onMotionPreferenceChange(event) {
  reducedMotion.value = event.matches
  syncPlayback()
}

onMounted(() => {
  motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  motionPreference.addEventListener('change', onMotionPreferenceChange)
  syncSoundState()
  syncPlayback()
})

onBeforeUnmount(() => {
  playbackRequest += 1
  motionPreference?.removeEventListener('change', onMotionPreferenceChange)
})
</script>

<template>
  <section class="hero" aria-labelledby="featured-event-title">
    <img class="hero__poster" :src="event.poster" alt="" fetchpriority="high" />
    <video
      v-if="!videoFailed"
      ref="video"
      class="hero__video"
      :class="{ 'hero__video--still': reducedMotion }"
      :src="event.video"
      :poster="event.poster"
      :autoplay="!reducedMotion"
      :preload="reducedMotion ? 'none' : 'auto'"
      loop
      playsinline
      disablepictureinpicture
      disableremoteplayback
      aria-hidden="true"
      @volumechange="syncSoundState"
      @error="videoFailed = true"
    />
    <div class="hero__shade" aria-hidden="true"></div>

    <div class="hero__content">
      <span class="hero__category">{{ event.category }}</span>
      <h1 id="featured-event-title" class="hero__title">
        <strong>{{ event.title }}</strong> <span>{{ event.subtitle }}</span>
      </h1>
      <p class="hero__description">{{ event.description }}</p>
      <div class="hero__actions">
        <button
          class="hero__button hero__button--list"
          type="button"
          aria-disabled="true"
          title="Mi lista estará disponible en una próxima etapa"
        >
          <span class="hero__plus" aria-hidden="true">+</span>
          Añadir a mi lista
        </button>
        <button
          class="hero__button hero__button--information"
          type="button"
          aria-disabled="true"
          title="Información del evento disponible en una próxima etapa"
        >
          Más información
        </button>
      </div>
    </div>

    <button
      v-if="!videoFailed && !reducedMotion"
      class="hero__sound-toggle"
      type="button"
      :aria-label="soundMuted ? 'Activar sonido del video' : 'Silenciar video'"
      :aria-pressed="!soundMuted"
      :title="soundMuted ? 'Activar sonido' : 'Silenciar'"
      @click="toggleSound"
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M11 4 6 8H3v8h3l5 4V4Z" />
        <path v-if="soundMuted" d="m16 9 6 6m0-6-6 6" />
        <template v-else>
          <path d="M15 8a6 6 0 0 1 0 8" />
          <path d="M18 5a10 10 0 0 1 0 14" />
        </template>
      </svg>
    </button>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  height: clamp(660px, 59.2vw, 1160px);
  color: var(--color-white);
  background: var(--color-black);
}

.hero__sound-toggle {
  position: absolute;
  z-index: 3;
  right: 2.4vw;
  bottom: calc(10.5vw + 24px);
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  padding: 10px;
  border: 0;
  border-radius: 4px;
  background: rgb(0 0 0 / 58%);
  color: var(--color-white);
  cursor: pointer;
  transition: color 200ms ease, background-color 200ms ease;
}

.hero__sound-toggle:hover {
  color: var(--color-gold);
  background: rgb(0 0 0 / 78%);
}

.hero__sound-toggle svg {
  width: 24px;
  height: 24px;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.hero__poster,
.hero__video,
.hero__shade {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.hero__poster,
.hero__video {
  object-fit: cover;
  object-position: center;
}

.hero__video--still {
  visibility: hidden;
}

.hero__shade {
  background:
    linear-gradient(0deg, rgb(0 0 0 / 82%) 0%, transparent 65%),
    linear-gradient(90deg, rgb(0 0 0 / 49%) 0%, rgb(0 0 0 / 12%) 58%, rgb(0 0 0 / 6%) 100%);
}

.hero__content {
  position: absolute;
  z-index: 1;
  left: 6.9%;
  bottom: 10.5vw;
  width: min(44vw, 800px);
}

.hero__category {
  display: inline-block;
  margin-bottom: 13px;
  padding: 10px 13px;
  border: 1px solid var(--color-red);
  color: var(--color-red);
  background: rgb(0 0 0 / 18%);
  font-size: clamp(12px, 0.94vw, 18px);
  font-weight: 700;
  line-height: 1;
}

.hero__title {
  margin: 0 0 10px;
  font-size: clamp(30px, 2.8vw, 54px);
  line-height: 1.13;
  font-weight: 400;
  letter-spacing: -0.8px;
}

.hero__title strong {
  font-weight: 750;
}

.hero__title span {
  white-space: nowrap;
}

.hero__description {
  max-width: 34vw;
  margin: 0;
  color: #dfdfd9;
  font-size: clamp(12px, 0.89vw, 17px);
  line-height: 1.28;
  text-wrap: pretty;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 27px;
}

.hero__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 42px;
  padding: 9px 17px;
  border: 1px solid #aeaeaa;
  border-radius: 0;
  font-size: clamp(14px, 1.15vw, 21px);
  line-height: 1.2;
  transition:
    border-color var(--transition-duration) ease,
    background-color var(--transition-duration) ease;
}

.hero__button--list {
  color: var(--color-white);
  background: rgb(0 0 0 / 35%);
}

.hero__button--list:hover {
  background: rgb(255 255 255 / 10%);
  border-color: var(--color-white);
}

.hero__plus {
  font-size: 22px;
  font-weight: 300;
  line-height: 0.8;
}

.hero__button--information {
  border-color: var(--color-white);
  color: #161616;
  background: var(--color-white);
}

.hero__button--information:hover {
  background: #e4e4df;
}

@media (min-width: 1921px) {
  .hero__content {
    bottom: 200px;
  }
}

@media (max-width: 1100px) {
  .hero__content {
    width: 58%;
    bottom: max(110px, 10.5vw);
  }

  .hero__description {
    max-width: 440px;
    font-size: 13px;
  }
}

@media (max-width: 767px) {
  .hero__sound-toggle {
    right: 6vw;
    bottom: 44px;
  }

  .hero {
    height: clamp(620px, 88svh, 820px);
  }

  .hero__video,
  .hero__poster {
    object-position: 57% center;
  }

  .hero__shade {
    background:
      linear-gradient(0deg, rgb(0 0 0 / 94%) 2%, rgb(0 0 0 / 55%) 40%, transparent 76%),
      linear-gradient(90deg, rgb(0 0 0 / 30%), transparent);
  }

  .hero__content {
    left: 6vw;
    right: 6vw;
    bottom: 100px;
    width: auto;
  }

  .hero__category {
    padding: 9px 11px;
    margin-bottom: 14px;
    font-size: 11px;
  }

  .hero__title {
    max-width: 470px;
    font-size: clamp(28px, 5.2vw, 38px);
    line-height: 1.2;
    letter-spacing: -0.6px;
  }

  .hero__description {
    max-width: 430px;
    font-size: 13px;
    line-height: 1.45;
  }

  .hero__actions {
    margin-top: 23px;
    gap: 8px;
  }

  .hero__button {
    min-height: 43px;
    padding-inline: 13px;
    gap: 9px;
    font-size: 14px;
  }
}

@media (max-width: 359px) {
  .hero__title {
    max-width: 260px;
  }

  .hero__button {
    padding-inline: 10px;
    font-size: 12px;
  }
}
</style>
