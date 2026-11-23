# Site M42.guide : build Astro (contenu lu dans Directus) puis service statique par Caddy.
# Contexte de build : le dossier site/ (Coolify : « Base Directory » = /site).
#
# Variables de build (Coolify : cocher « Build Variable ») :
#   DIRECTUS_URL, DIRECTUS_TOKEN (jeton du compte « build », lecture seule),
#   PUBLIC_DIRECTUS_URL, PUBLIC_FLOW_CONFIRMATION, M42_ENV (production | preprod).
# Variables d'exécution : CMS_ORIGIN (CSP), et en préproduction PREPROD_USER, PREPROD_HASH.

FROM node:26.13.1-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
ARG M42_ENV=production
ARG DIRECTUS_URL
ARG DIRECTUS_TOKEN
ARG PUBLIC_DIRECTUS_URL
ARG PUBLIC_FLOW_CONFIRMATION
# Le contenu vient toujours de Directus : jamais du contenu initial de src/data.
ENV M42_CONTENU=cms \
    M42_ENV=${M42_ENV} \
    DIRECTUS_URL=${DIRECTUS_URL} \
    DIRECTUS_TOKEN=${DIRECTUS_TOKEN} \
    PUBLIC_DIRECTUS_URL=${PUBLIC_DIRECTUS_URL} \
    PUBLIC_FLOW_CONFIRMATION=${PUBLIC_FLOW_CONFIRMATION}
RUN npx astro build

FROM caddy:2.11.9-alpine
ARG M42_ENV=production
ENV CMS_ORIGIN=https://cms.m42.guide
COPY deploy/securite.caddy /etc/caddy/securite.caddy
COPY deploy/Caddyfile.${M42_ENV} /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
EXPOSE 80
