<script setup>
import { ref } from 'vue'
import LoginForm from './LoginForm.vue'

defineProps({
  image: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['verified', 'close'])
const form = ref(null)

function focusInitial() {
  form.value?.focusInitial()
}

defineExpose({ focusInitial })
</script>

<template>
  <section
    class="login-view"
    role="dialog"
    aria-modal="true"
    aria-labelledby="login-title"
    tabindex="-1"
  >
    <div class="login-view__form-panel">
      <button class="login-view__back" type="button" @click="emit('close')">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m14 5-7 7 7 7M7 12h14" />
        </svg>
        <span>Volver</span>
      </button>

      <LoginForm ref="form" @verified="emit('verified')" />
    </div>

    <div class="login-view__image-panel" aria-hidden="true">
      <img :src="image" alt="" class="login-view__image" />
    </div>
  </section>
</template>

<style scoped>
.login-view {
  position: fixed;
  z-index: 40;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  min-width: 0;
  background: #fff;
  color: var(--color-black);
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
}

.login-view:focus {
  outline: none;
}

.login-view__form-panel {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  min-height: 100%;
  padding: 6rem clamp(1.5rem, 5vw, 6rem);
  background: #fff;
}

.login-view__back {
  position: absolute;
  top: 1.5rem;
  left: clamp(1.5rem, 3.5vw, 4rem);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 40px;
  padding: 0.25rem 0;
  border: 0;
  background: transparent;
  color: #4a4a4a;
  font: inherit;
  font-size: 0.8rem;
  line-height: 1.3;
  cursor: pointer;
  transition: color var(--transition-duration) ease;
}

.login-view__back svg {
  width: 19px;
  height: 19px;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.login-view__image-panel {
  position: relative;
  min-width: 0;
  min-height: 100%;
  overflow: hidden;
  background: #272727;
}

.login-view__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: grayscale(1);
}

@media (hover: hover) and (pointer: fine) {
  .login-view__back:hover {
    color: var(--color-black);
  }
}

@media (max-width: 1000px) {
  .login-view__form-panel {
    padding-right: 2rem;
    padding-left: 2rem;
  }
}

@media (max-width: 640px) {
  .login-view {
    grid-template-columns: minmax(0, 1fr);
  }

  .login-view__form-panel {
    padding: 5.5rem 1.5rem 3rem;
  }

  .login-view__image-panel {
    display: none;
  }

  .login-view__back {
    top: 1rem;
    left: 1.5rem;
  }
}
</style>
