// Cerchio con "+" usato negli accordion (fascia gialla e FAQ). Ruota di 45°
// quando l'elemento è aperto (vedi service.css).
export default function PlusIcon() {
  return (
    <span className="circ">
      <svg viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <circle cx="17" cy="17" r="15.5" />
        <path d="M17 8v18M8 17h18" />
      </svg>
    </span>
  );
}
