<script setup>
import { nextTick, ref } from 'vue'

const emit = defineEmits(['verified'])

const step = ref('email')
const email = ref('')
const code = ref('')
const emailError = ref('')
const codeError = ref('')
const verified = ref(false)
const emailInput = ref(null)
const codeInput = ref(null)

function focusInitial() {
  const input = step.value === 'email' ? emailInput.value : codeInput.value
  input?.focus({ preventScroll: true })
}

async function continueWithEmail() {
  email.value = email.value.trim()

  if (!email.value) {
    emailError.value = 'Ingresa tu dirección de correo electrónico.'
    focusInitial()
    return
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailError.value = 'Ingresa una dirección de correo electrónico válida.'
    focusInitial()
    return
  }

  emailError.value = ''
  codeError.value = ''
  code.value = '262626'
  step.value = 'verification'
  await nextTick()
  focusInitial()
}

function updateCode(event) {
  const digits = event.target.value.replace(/\D/g, '').slice(0, 6)
  event.target.value = digits
  code.value = digits
  codeError.value = ''
}

function verifyCode() {
  if (code.value.length !== 6) {
    codeError.value = 'Ingresa los seis dígitos del código de demostración.'
    focusInitial()
    return
  }

  if (code.value !== '262626') {
    codeError.value = 'Código incorrecto. Para esta demostración utiliza 262626.'
    focusInitial()
    return
  }

  codeError.value = ''
  verified.value = true
  emit('verified')
}

function submit() {
  if (verified.value) return

  if (step.value === 'email') {
    continueWithEmail()
  } else {
    verifyCode()
  }
}

async function correctEmail() {
  if (verified.value) return

  step.value = 'email'
  emailError.value = ''
  codeError.value = ''
  await nextTick()
  focusInitial()
}

defineExpose({ focusInitial })
</script>

<template>
  <div class="login-form">
    <div class="login-form__brand" aria-label="EVENTOSPERUIA">
      EVENTOSPERU<span>IA</span>
    </div>

    <form novalidate aria-labelledby="login-title" @submit.prevent="submit">
      <template v-if="step === 'email'">
        <h1 id="login-title" class="login-form__title">INICIA SESIÓN</h1>

        <div class="login-form__field">
          <label for="login-email">Dirección de correo electrónico</label>
          <input
            id="login-email"
            ref="emailInput"
            v-model="email"
            class="login-form__input"
            type="email"
            name="email"
            autocomplete="email"
            autocapitalize="none"
            spellcheck="false"
            required
            data-autofocus
            :aria-invalid="emailError ? 'true' : 'false'"
            :aria-describedby="emailError ? 'login-email-error' : undefined"
            @input="emailError = ''"
          />
          <p v-if="emailError" id="login-email-error" class="login-form__error" role="alert">
            {{ emailError }}
          </p>
        </div>

        <button class="login-form__continue" type="submit">CONTINUAR</button>

        <div class="login-form__information">
          <p>Te enviaremos un código de 6 dígitos a tu correo electrónico</p>
          <p>NO necesitas contraseña</p>
        </div>
      </template>

      <template v-else>
        <h1 id="login-title" class="login-form__title">VERIFICA TU CORREO</h1>
        <p id="login-code-instructions" class="login-form__instructions">
          Ingresa el código de verificación de 6 dígitos.
        </p>

        <div class="login-form__field">
          <label for="login-code">Código de verificación</label>
          <input
            id="login-code"
            ref="codeInput"
            class="login-form__input login-form__input--code"
            type="text"
            name="verification-code"
            inputmode="numeric"
            autocomplete="one-time-code"
            pattern="[0-9]{6}"
            maxlength="6"
            required
            data-autofocus
            :value="code"
            :disabled="verified"
            :aria-invalid="codeError ? 'true' : 'false'"
            :aria-describedby="`login-code-instructions login-demo-note${codeError ? ' login-code-error' : ''}`"
            @input="updateCode"
          />
          <p v-if="codeError" id="login-code-error" class="login-form__error" role="alert">
            {{ codeError }}
          </p>
        </div>

        <button class="login-form__continue" type="submit" :disabled="verified">
          CONTINUAR
        </button>
        <p id="login-demo-note" class="login-form__demo">
          Demostración frontend. No se envían correos.
        </p>
        <button
          class="login-form__correct-email"
          type="button"
          :disabled="verified"
          @click="correctEmail"
        >
          Corregir correo electrónico
        </button>
      </template>
    </form>
  </div>
</template>

<style scoped>
.login-form {
  width: min(100%, 350px);
  color: var(--color-black);
}

.login-form__brand {
  margin-bottom: 6px;
  font-size: clamp(1.4rem, 2.1vw, 1.85rem);
  font-weight: 400;
  line-height: 1.1;
  text-align: center;
  white-space: nowrap;
}

.login-form__brand span {
  color: var(--color-gold);
  font-weight: 700;
}

.login-form__title {
  margin: 0 0 28px;
  font-size: clamp(1.45rem, 2vw, 1.75rem);
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
}

.login-form__field label {
  display: block;
  margin-bottom: 0.65rem;
  font-size: 0.875rem;
  line-height: 1.4;
}

.login-form__input {
  display: block;
  width: 100%;
  min-height: 48px;
  padding: 0.75rem 0.875rem;
  border: 1px solid #626262;
  border-radius: 4px;
  background: #fff;
  color: var(--color-black);
  font: inherit;
  font-size: 1rem;
  line-height: 1.4;
  transition: border-color var(--transition-duration) ease;
}

.login-form__input:focus-visible {
  border-color: var(--color-gold);
  outline: 2px solid var(--color-gold);
  outline-offset: 2px;
}

.login-form__input--code {
  padding-left: 1.25rem;
  font-size: 1.4rem;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.4em;
  text-align: center;
}

.login-form__continue {
  display: block;
  width: 100%;
  min-height: 48px;
  margin-top: 1.1rem;
  padding: 0.875rem 1rem;
  border: 1px solid var(--color-black);
  border-radius: 4px;
  background: var(--color-black);
  color: #fff;
  font: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.3;
  cursor: pointer;
  transition: background-color var(--transition-duration) ease;
}

.login-form__continue:disabled {
  cursor: default;
}

.login-form__information {
  margin-top: 10px;
  color: #404040;
  font-size: 13px;
  line-height: 1.5;
  text-align: left;
}

.login-form__information p {
  margin: 0;
}

.login-form__information p + p {
  margin-top: 4px;
}

.login-form__instructions {
  margin: -0.75rem 0 1.5rem;
  color: #404040;
  font-size: 0.875rem;
  line-height: 1.5;
}

.login-form__error {
  margin: 0.625rem 0 0;
  color: #404040;
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 1.4;
}

.login-form__demo {
  margin: 1.25rem 0 0;
  color: #575757;
  font-size: 0.8rem;
  line-height: 1.5;
  text-align: center;
}

.login-form__correct-email {
  display: block;
  margin: 1rem auto 0;
  padding: 0.35rem 0;
  border: 0;
  background: transparent;
  color: #404040;
  font: inherit;
  font-size: 0.8rem;
  line-height: 1.4;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}

.login-form__correct-email:disabled {
  cursor: default;
}

@media (hover: hover) and (pointer: fine) {
  .login-form__continue:not(:disabled):hover {
    background: #292929;
  }

  .login-form__correct-email:not(:disabled):hover {
    color: var(--color-black);
  }
}

@media (max-width: 640px) {
  .login-form__brand {
    margin-bottom: 6px;
    font-size: 1.65rem;
  }

  .login-form__title {
    font-size: 1.5rem;
  }
}
</style>
