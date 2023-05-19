export default {
  required: "Dies ist ein Pflichtfeld!",
  cancel: "Abbrechen",
  confirm: "Bestätigen",
  loading: "Laden...",
  colorpicker_placeholder: "Farbe auswählen",
  min: (v?: string) =>
    v
      ? `Der minimale Wert ist ${v}.`
      : "Der minimale Wert ist nicht eingehalten.",
  max: (v?: string) =>
    v
      ? `Der maximale Wert ist ${v}.`
      : "Der maximale Wert ist nicht eingehalten.",
  invalidTime: "Dies ist keine korrekte Zeitangabe.",
  minLength: (v?: string) =>
    v
      ? `Die minimale Länge beträgt ${v}.`
      : "Die minimale Länge ist nicht eingehalten.",
  maxLength: (v?: string) =>
    v
      ? `Die maximale Länge beträgt ${v}.`
      : "Die maximale Länge ist nicht eingehalten.",
  pattern: "Das Feld ist nicht im korrekten Format.",
  validation: "Die validierung des Feldes ist nicht korrekt.",
};
