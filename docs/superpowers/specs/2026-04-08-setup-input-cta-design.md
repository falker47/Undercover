# Setup Screen — Input CTA prominente per i nomi giocatori

## Problema

L'inserimento dei nomi è l'azione più importante del SetupScreen, ma attualmente la griglia 3 colonne con input piccoli non ha sufficiente prominenza visiva. Non c'è un chiaro invito all'azione — l'utente deve capire da solo dove iniziare.

## Soluzione

Aggiungere un **campo input grande e prominente in cima** alla sezione giocatori, separato dalla griglia. L'input è il punto d'ingresso per i nomi; la griglia sotto diventa una visualizzazione read-only dei nomi già inseriti.

## Comportamento

### Input principale (nuovo)

- Posizionato subito dopo l'header "Nuova Partita", prima della griglia
- Stile: bordo indigo semi-trasparente (2px, `rgba(129,140,248,0.45)`), sfondo `rgba(129,140,248,0.08)`, border-radius 16px, padding generoso (16px 18px)
- Glow sottile: `box-shadow: 0 0 30px rgba(99,102,241,0.12)`
- Icona `+` indigo a sinistra
- Placeholder: "Aggiungi giocatore..."
- Badge `⏎` a destra per indicare Enter
- Hint sotto: "Scrivi un nome e premi Invio"
- Flusso: l'utente digita un nome → preme Invio → il nome appare nella griglia sotto → l'input si svuota e resta focalizzato per il prossimo nome
- Validazione: se il nome è duplicato, mostrare errore inline. Se il nome è vuoto, ignorare l'invio
- L'input si disabilita quando si raggiungono 12 giocatori (MAX_PLAYERS)

### Griglia nomi (modificata)

- Mantiene il layout attuale: griglia 3 colonne con animazioni Framer Motion
- Diventa **read-only**: le celle non sono più input editabili, ma display del nome + bottone ✕ per rimuovere
- Mostra solo i nomi già inseriti (nessuno slot vuoto)
- Label "Giocatori (N)" a sinistra, hint "min 3 · max 12" a destra
- Ogni cella mostra: numero progressivo indigo + nome bianco + ✕ per rimuovere
- La rimozione è permessa solo se ci sono più di 0 giocatori (non c'è più il minimo di 3 slot)

### Resto del SetupScreen

- Nessuna modifica a sezione Ruoli, info box, e bottone "Inizia Partita"
- La validazione `canStart` resta invariata (min 3 giocatori validi, almeno 1 impostore, no duplicati)

## Dettagli tecnici

### File da modificare

- `src/screens/SetupScreen.tsx` — unico file coinvolto

### Cambiamenti allo state

- `slots` (`Slot[]` con id+name) viene sostituito da `players` (`string[]`) — lista semplice di nomi inseriti
- Nuovo state: `inputValue` (`string`) per il valore corrente dell'input
- Rimuovere `inputRefs`, `pendingFocus` — non servono più (un solo input)
- La logica di auto-suggest ruoli, clamp, e validazione duplicati resta identica, opera su `players` invece di `slots`

### Interazioni

- **Enter** nell'input: aggiunge il nome (se valido e non duplicato) a `players`, svuota `inputValue`
- **✕** su una cella: rimuove quel nome da `players`
- **Focus**: l'input principale ha auto-focus al mount

## Verifiche

1. Aprire il setup, verificare che l'input grande sia la prima cosa visibile
2. Digitare nomi e premere Invio — verificare che appaiano nella griglia
3. Rimuovere nomi con ✕ — verificare che spariscano con animazione
4. Inserire un nome duplicato — verificare errore inline
5. Raggiungere 12 giocatori — verificare che l'input si disabiliti
6. Verificare che ruoli e "Inizia Partita" funzionino come prima
7. Testare su mobile (touch, tastiera virtuale)
