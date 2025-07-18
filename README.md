# 🗣️ Text-to-Speech Web App (Rust + WebAssembly)

Converti istantaneamente file `.txt` in parlato direttamente dal browser.  
Questa app sfrutta **Rust** con **WebAssembly (WASM)** per la sintesi vocale client-side, combinata con **JavaScript/React** per l'interfaccia utente.

## 🚀 Funzionalità

- ✅ Caricamento file `.txt` drag & drop o via file picker
- ✅ Lettura automatica del contenuto tramite voce sintetica
- ✅ Controlli di riproduzione (Play / Pause)
- ✅ Voce italiana selezionata automaticamente
- ✅ 100% client-side: nessuna trasmissione dati, privacy garantita

---

## 📦 Tech Stack

| Tecnologia    | Utilizzo                              |
|---------------|----------------------------------------|
| Rust          | Logica core della sintesi vocale       |
| WebAssembly   | Bridge tra Rust e Web                  |
| wasm-bindgen  | Binding tra JS e Web APIs              |
| web-sys       | Accesso alle API Web Speech            |
| React + Vite  | Frontend moderno e veloce              |
| TypeScript    | Tipizzazione rigorosa lato client      |
| TailwindCSS   | (Opzionale) Styling modulare           |

---

## 🛠️ Setup locale

> Assicurati di avere `wasm-pack`, `cargo`, `node` e `npm` installati.

### 1. Build del modulo Rust

```bash
cd rust
wasm-pack build --target web --out-dir ../web/src/wasm

2. Avvio del frontend React

cd ../web
npm install
npm run dev

Apri il browser su http://localhost:5173

⸻

📁 Struttura del progetto

text-converter/
├── rust/                # Codice Rust per la sintesi vocale
│   └── lib.rs
├── web/                 # Frontend React + WASM bundle
│   ├── src/
│   │   ├── wasm/        # Output wasm-pack
│   │   └── App.tsx
├── README.md

```
⸻

🎙️ Come funziona

Il file Rust utilizza web-sys per accedere a SpeechSynthesis, creando un’istanza SpeechSynthesisUtterance. La voce italiana viene selezionata se disponibile. La comunicazione avviene via WebAssembly, esposta poi a React.

⸻

📤 Contribuisci!

Le PR sono benvenute! Se vuoi aggiungere:
	•	Supporto a più lingue
	•	Avanzamento della lettura
	•	Download audio sintetizzato
	•	Modalità accessibilità

Apri una Issue o una Pull Request 🤝

⸻

📄 Licenza

Questo progetto è rilasciato sotto licenza MIT.

⸻

✨ Autore

Creato con passione da fifogipo