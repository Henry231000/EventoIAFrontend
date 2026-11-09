<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import NavigationMenu from './NavigationMenu.vue'

const props = defineProps({
  categories: { type: Array, required: true },
  isGuest: { type: Boolean, default: false },
  overlayOpen: { type: Boolean, default: false },
})

const emit = defineEmits(['open-search', 'open-login'])
const menuOpen = ref(false)
const menuRegion = ref(null)
const menuToggle = ref(null)
const navigationMenu = ref(null)

function closeMenu(restoreFocus = false) {
  if (!menuOpen.value) return
  menuOpen.value = false
  if (restoreFocus) menuToggle.value?.focus()
}

async function openMenu(lastItem = false) {
  if (props.overlayOpen) return
  menuOpen.value = true
  await nextTick()
  if (lastItem) navigationMenu.value?.focusLast()
  else navigationMenu.value?.focusFirst()
}

function toggleMenu() {
  if (menuOpen.value) closeMenu()
  else openMenu()
}

function openOverlay(name) {
  closeMenu()
  emit(name)
}

function onOutsidePointer(event) {
  if (menuOpen.value && !menuRegion.value?.contains(event.target)) closeMenu()
}

function onKeydown(event) {
  if (event.key === 'Escape' && menuOpen.value) {
    event.preventDefault()
    closeMenu(true)
  }
}

function onMenuFocusOut(event) {
  if (event.relatedTarget && !menuRegion.value?.contains(event.relatedTarget)) closeMenu()
}

watch(() => props.overlayOpen, (isOpen) => {
  if (isOpen) closeMenu()
})

onMounted(() => {
  document.addEventListener('pointerdown', onOutsidePointer)
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onOutsidePointer)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <header class="site-header">
    <div class="site-header__identity">
      <div ref="menuRegion" class="site-header__menu-region" @focusout="onMenuFocusOut">
        <button
          ref="menuToggle"
          class="site-header__icon-button site-header__menu-toggle"
          type="button"
          aria-label="Menú de categorías"
          aria-controls="event-categories"
          :aria-expanded="menuOpen"
          @click="toggleMenu"
          @keydown.down.prevent="openMenu()"
          @keydown.up.prevent="openMenu(true)"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
        <Transition name="navigation-menu">
          <NavigationMenu
            v-if="menuOpen"
            id="event-categories"
            ref="navigationMenu"
            :categories="categories"
            @select="closeMenu(true)"
          />
        </Transition>
      </div>
      <span class="site-header__brand" aria-label="EVENTOSPERUIA">
        EVENTOSPERU<span>IA</span>
      </span>
    </div>

    <nav class="site-header__navigation" aria-label="Búsqueda y cuenta">
      <button
        class="site-header__icon-button"
        type="button"
        aria-label="Abrir búsqueda"
        @click="openOverlay('open-search')"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m15.5 15.5 5 5" />
        </svg>
      </button>

      <div class="site-header__account">
        <button
          class="site-header__icon-button"
          type="button"
          aria-label="Abrir inicio de sesión"
          @click="openOverlay('open-login')"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="7.5" r="3.5" />
            <path d="M4.5 21v-2a7.5 7.5 0 0 1 15 0v2" />
          </svg>
        </button>
        <span v-if="isGuest" class="site-header__guest">INVITADO</span>
      </div>

      <button
        class="site-header__icon-button"
        type="button"
        aria-label="Carrito de compras, próximamente"
        aria-disabled="true"
        title="Carrito disponible en una próxima etapa"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M2 3h2l2.2 12h12.9l2.2-9H4.6M7 18h12" />
          <circle cx="8" cy="21" r="1" />
          <circle cx="18" cy="21" r="1" />
        </svg>
      </button>
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  position: absolute;
  z-index: 3;
  inset: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 2.1vw 2.4vw 0 3.55vw;
  color: var(--color-white);
}

.site-header__brand {
  font-size: clamp(16px, 1.2vw, 23px);
  font-weight: 400;
  letter-spacing: -0.6px;
  white-space: nowrap;
}

.site-header__identity,
.site-header__navigation,
.site-header__account {
  display: flex;
  align-items: center;
}

.site-header__identity {
  gap: 16px;
  min-width: 0;
}

.site-header__menu-region {
  position: relative;
  flex-shrink: 0;
}

.site-header__brand span {
  color: var(--color-gold);
  font-weight: 700;
}

.site-header__navigation {
  flex-shrink: 0;
  gap: 20px;
}

.site-header__account {
  gap: 8px;
}

.site-header__icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 36px;
  padding: 4px;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  transition: color var(--transition-duration) ease;
}

.site-header__icon-button svg {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.site-header__icon-button:hover {
  color: var(--color-gold);
}

.site-header__guest {
  font-size: clamp(10px, 0.76vw, 14px);
  line-height: 1;
  white-space: nowrap;
}

.navigation-menu-enter-active,
.navigation-menu-leave-active {
  transition:
    opacity var(--transition-duration) ease,
    transform var(--transition-duration) ease;
}

.navigation-menu-enter-from,
.navigation-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.navigation-menu-leave-active {
  pointer-events: none;
}

@media (max-width: 767px) {
  .site-header {
    padding: 24px 6vw 0;
    gap: 16px;
  }

  .site-header__identity,
  .site-header__navigation {
    gap: 12px;
  }

  .site-header__icon-button {
    width: 28px;
    height: 34px;
    padding: 3px;
  }

  .site-header__icon-button svg {
    width: 22px;
    height: 22px;
  }
}

@media (max-width: 440px) {
  .site-header {
    padding-inline: 4vw;
    gap: 8px;
  }

  .site-header__identity,
  .site-header__navigation {
    gap: 6px;
  }

  .site-header__brand {
    font-size: 14px;
    letter-spacing: -0.7px;
  }

  .site-header__account {
    gap: 4px;
  }

  .site-header__guest {
    font-size: 9px;
  }
}

@media (max-width: 359px) {
  .site-header__identity,
  .site-header__navigation {
    gap: 4px;
  }

  .site-header__icon-button {
    width: 25px;
    padding: 2px;
  }

  .site-header__icon-button svg {
    width: 21px;
    height: 21px;
  }
}
</style>
