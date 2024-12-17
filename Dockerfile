# Étape 1 : Utiliser une image de base Node.js
FROM node:22

# Étape 2 : Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Étape 3 : Copier le fichier package.json et installer les dépendances
COPY package*.json ./

RUN npm install

# Étape 4 : Copier tout le reste du projet dans le conteneur
COPY . .

# Étape 5 : Exposer le port 3030
EXPOSE 3030

# Étape 6 : Utiliser npm start pour démarrer l'application
CMD ["npm", "strat"]
