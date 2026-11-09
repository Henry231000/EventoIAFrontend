<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import SiteHeader from './components/SiteHeader.vue'
import HeroVideo from './components/HeroVideo.vue'
import FeaturedGuests from './components/FeaturedGuests.vue'
import EventHighlights from './components/EventHighlights.vue'
import SiteFooter from './components/SiteFooter.vue'
import SearchOverlay from './components/SearchOverlay.vue'
import LoginView from './components/LoginView.vue'
import {
  featuredEvent,
  featuredGuests,
  highlightedEvents,
  footerGroups,
  socialLinks,
  eventCategories,
  loginImage,
} from './data/home'

const activePanel = ref('')
const overlayBusy = ref(false)
const isGuest = ref(false)
const loginView = ref(null)
let dialogElement = null
let returnFocus = null
let previousBodyStyles = null
let guestPending = false

function lockBackground() {
  previousBodyStyles = {
    overflow: document.body.style.overflow,
    paddingRight: document.body.style.paddingRight,
  }
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
  if (scrollbarWidth > 0) {
    const currentPadding = parseFloat(window.getComputedStyle(document.body).paddingRight) || 0
    document.body.style.paddingRight = `${currentPadding + scrollbarWidth}px`
  }
  document.body.style.overflow = 'hidden'
}

function unlockBackground() {
  if (!previousBodyStyles) return
  Object.assign(document.body.style, previousBodyStyles)
  previousBodyStyles = null
}

function openPanel(panel) {
  // Mantiene una única interfaz activa, también durante las transiciones.
  if (overlayBusy.value) return
  returnFocus = document.activeElement
  lockBackground()
  overlayBusy.value = true
  activePanel.value = panel
}

function closePanel() {
  if (!activePanel.value) return
  activePanel.value = ''
}

function completeDemoLogin() {
  if (activePanel.value !== 'login') return
  guestPending = true
  closePanel()
}

function captureDialog(element) {
  dialogElement = element
}

function focusDialog(element) {
  if (!activePanel.value) return
  if (activePanel.value === 'login') loginView.value?.focusInitial()
  else (element.querySelector('[data-autofocus]') ?? element).focus({ preventScroll: true })
}

async function finishPanelClose() {
  if (guestPending) {
    isGuest.value = true
    guestPending = false
  }
  overlayBusy.value = false
  dialogElement = null
  unlockBackground()
  await nextTick()
  if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true })
  returnFocus = null
}

function handleOverlayKeyboard(event) {
  if (!overlayBusy.value) return
  if (event.key === 'Escape') {
    event.preventDefault()
    closePanel()
    return
  }
  if (event.key !== 'Tab' || !dialogElement) return
  const controls = [...dialogElement.querySelectorAll(
    'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
  )].filter((control) => control.getClientRects().length > 0)
  const first = controls[0]
  const last = controls.at(-1)
  if (!first) {
    event.preventDefault()
    dialogElement.focus({ preventScroll: true })
  } else if (event.shiftKey && (document.activeElement === first || !dialogElement.contains(document.activeElement))) {
    event.preventDefault()
    last.focus({ preventScroll: true })
  } else if (!event.shiftKey && (document.activeElement === last || !dialogElement.contains(document.activeElement))) {
    event.preventDefault()
    first.focus({ preventScroll: true })
  }
}

onMounted(() => document.addEventListener('keydown', handleOverlayKeyboard))
onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleOverlayKeyboard)
  unlockBackground()
})
</script>

<template>
  <div class="page-shell">
    <SiteHeader
      :categories="eventCategories"
      :is-guest="isGuest"
      :overlay-open="overlayBusy"
      :inert="overlayBusy"
      @open-search="openPanel('search')"
      @open-login="openPanel('login')"
    />
    <main id="contenido-principal">
      <div class="home-intro">
        <HeroVideo :event="featuredEvent" :inert="overlayBusy" />
        <FeaturedGuests :guests="featuredGuests" :inert="overlayBusy" />
        <Transition
          name="search"
          @before-enter="captureDialog"
          @after-enter="focusDialog"
          @after-leave="finishPanelClose"
        >
          <SearchOverlay v-if="activePanel === 'search'" @close="closePanel" />
        </Transition>
      </div>
      <EventHighlights :events="highlightedEvents" :inert="overlayBusy" />
    </main>
    <SiteFooter :groups="footerGroups" :socials="socialLinks" :inert="overlayBusy" />
  </div>
  <Transition
    name="login"
    @before-enter="captureDialog"
    @after-enter="focusDialog"
    @after-leave="finishPanelClose"
  >
    <LoginView
      v-if="activePanel === 'login'"
      ref="loginView"
      :image="loginImage"
      @verified="completeDemoLogin"
      @close="closePanel"
    />
  </Transition>
</template>

<style scoped>
.page-shell,
.home-intro {
  position: relative;
}

.search-enter-active,
.search-leave-active {
  transition: transform 380ms cubic-bezier(0.22, 1, 0.36, 1);
}

.search-enter-from,
.search-leave-to {
  transform: translateY(-100%);
}

.login-enter-active {
  transition: opacity 300ms ease;
}

.login-enter-from {
  opacity: 0;
}

.login-leave-active {
  transition: transform 450ms cubic-bezier(0.4, 0, 0.2, 1);
}

.login-leave-to {
  transform: translateX(100%);
}

.search-leave-active,
.login-leave-active {
  pointer-events: none;
}
</style>
