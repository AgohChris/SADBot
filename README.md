# SAD (Smart Assistant Dashboard)

Bienvenue sur SAD, le prototype d’assistant intelligent pour la gestion de vos ventes et dépenses !

## 🚀 Tester l’application

### 1. Prérequis
- Node.js >= 16
- Expo CLI :
  ```sh
  npm install -g expo-cli
  ```
- (Facultatif) Expo Go sur votre smartphone (Android/iOS)

### 2. Installation
Clonez le repo 
```
git clone https://github.com/AgohChris/SADBot.git
```

et installez les dépendances :
```sh
npm install
```

### 3. Lancer l’application
```sh
expo start
```
- Scannez le QR code avec Expo Go (Android/iOS)
- Ou appuyez sur `w` pour ouvrir dans le navigateur (mode web)

### 4. Fonctionnalités principales
- **SplashScreen** : logo et nom SAD à l’ouverture
- **Accueil** : résumé, conversation vocale (simulation), synthèse vocale IA
- **Assistant** : chat textuel/vocal avec IA (simulation intelligente si backend indisponible)
- **Bilan** : cartes de performance, export PDF, partage image
- **Historique** : liste des transactions
- **Ajout** : formulaire de nouvelle transaction
- **Navigation personnalisée** : barre fixe en bas, bouton + flottant

### 5. Configuration API IA
- L’URL de l’API IA est déjà configurée :
  `https://us-central1-sad-466423.cloudfunctions.net/api/sendMessage`
- Si besoin, modifiez-la dans `app/(tabs)/index.tsx` et `app/(tabs)/accueil.tsx`

### 6. Limitations (mode prototype)
- La reconnaissance vocale est simulée (appui long micro) sauf si vous compilez avec EAS Build et ajoutez react-native-voice.
- Les réponses IA sont simulées si l’API ne répond pas.
- Certaines fonctionnalités sont en mode démo (pas de base de données réelle).

### 7. Pour aller plus loin
- Pour la vraie reconnaissance vocale, voir les commentaires dans le code (`react-native-voice` + EAS Build).
- Pour brancher un backend IA différent, modifiez l’URL API.

---

**Bon test !**