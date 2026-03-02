"use client"

import { useActionState } from "react"

import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)
  const errorMessage = typeof message === "string" ? message : null

  return (
    <div
      className="max-w-sm flex flex-col items-center"
      data-testid="register-page"
    >
      <h1 className="text-2xl font-black italic uppercase tracking-tight mb-6 text-center">
        Rejoins Strikerz<span className="text-blue-600">.</span>
      </h1>
      <p className="text-center text-base-regular text-ui-fg-subtle mb-4">
        Crée ton compte pour suivre tes commandes, gérer tes adresses et
        accéder aux prochains drops premium.
      </p>
      <form className="w-full flex flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Prénom"
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
          />
          <Input
            label="Nom"
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
          />
          <Input
            label="E-mail"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label="Téléphone"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <Input
            label="Mot de passe"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={errorMessage} data-testid="register-error" />
        <span className="text-center text-ui-fg-base text-small-regular mt-6">
          En créant un compte, tu acceptes notre{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="underline"
          >
            Politique de confidentialité
          </LocalizedClientLink>{" "}
          et nos{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="underline"
          >
            Conditions d&apos;utilisation
          </LocalizedClientLink>
          .
        </span>
        <SubmitButton className="w-full mt-6" data-testid="register-button">
          Créer mon compte
        </SubmitButton>
      </form>
      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        Tu as déjà un compte ?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          Se connecter
        </button>
        .
      </span>
    </div>
  )
}

export default Register
