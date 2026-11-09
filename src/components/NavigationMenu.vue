<script setup>
import { ref } from 'vue'

defineProps({
  categories: { type: Array, required: true },
})

const emit = defineEmits(['select'])
const menu = ref(null)

function getButtons() {
  return Array.from(menu.value?.querySelectorAll('button') ?? [])
}

function focusFirst() {
  getButtons()[0]?.focus()
}

function focusLast() {
  getButtons().at(-1)?.focus()
}

function onKeydown(event) {
  const buttons = getButtons()
  const current = buttons.indexOf(document.activeElement)
  let next
  if (event.key === 'ArrowDown') next = (current + 1) % buttons.length
  else if (event.key === 'ArrowUp') next = (current - 1 + buttons.length) % buttons.length
  else if (event.key === 'Home') next = 0
  else if (event.key === 'End') next = buttons.length - 1
  else return
  event.preventDefault()
  buttons[next]?.focus()
}

defineExpose({ focusFirst, focusLast })
</script>

<template>
  <nav ref="menu" class="category-menu" aria-label="Categorías de eventos" @keydown="onKeydown">
    <ul class="category-menu__list">
      <li v-for="category in categories" :key="category">
        <button class="category-menu__option" type="button" @click="emit('select', category)">
          {{ category }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.category-menu {
  position: absolute;
  z-index: 1;
  top: calc(100% + 14px);
  left: 0;
  width: 234px;
  max-width: calc(100vw - 8vw);
  max-height: calc(100svh - 110px);
  padding: 13px 0;
  overflow-y: auto;
  color: var(--color-white);
  background: rgb(5 5 5 / 97%);
}

.category-menu__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.category-menu__option {
  display: block;
  width: 100%;
  padding: 11px 24px;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 15px;
  line-height: 1.3;
  text-align: left;
  cursor: pointer;
  transition: color var(--transition-duration) ease;
}

.category-menu__option:hover,
.category-menu__option:focus-visible {
  color: var(--color-gold);
}

.category-menu__option:focus-visible {
  outline-offset: -4px;
}

@media (max-width: 440px) {
  .category-menu {
    width: 218px;
  }

  .category-menu__option {
    padding: 11px 20px;
    font-size: 14px;
  }
}
</style>
